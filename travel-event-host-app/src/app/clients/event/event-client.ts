import { Category } from '@/lib/category';
import { UserEvent } from '@/models/user-event';
import { EventTimeLine } from '@/types/event-timeline';

export interface GetAllEventsAPIResponse {
  events: UserEvent[];
  totalCount: number;
}

export interface EventSearchQueryArgs {
  keyword?: string;
  categories?: Category[];
  eventCreatorId?: string;
  page?: number;
  pageSize?: number;
  timeline?: EventTimeLine;
}

export const EventClient = {
  getEventById: async (id: string): Promise<UserEvent | undefined> => {
    try {
      const endPoint = `/api/events/${id}`;
      const response = await fetch(endPoint);
      return response.json();
    } catch (error) {
      throw new Error('Error: Cannot fetch event');
    }
  },
  getEventsBySearchQuery: async ({
    keyword,
    categories,
    eventCreatorId,
    page,
    pageSize,
    timeline = EventTimeLine.All,
  }: EventSearchQueryArgs): Promise<UserEvent[]> => {
    try {
      const searchParams = new URLSearchParams();

      if (categories && categories.length > 0) {
        categories.forEach((category) => {
          searchParams.append('category', category);
        });
      }

      if (keyword) {
        searchParams.append('keyword', keyword);
      }

      if (eventCreatorId) {
        searchParams.append('eventCreatorId', eventCreatorId);
      }

      if (page) searchParams.append('page', page.toString());
      if (pageSize) searchParams.append('pageSize', pageSize.toString());

      if (timeline) searchParams.append('timeline', timeline);

      const endPoint = `/api/events/search?${searchParams.toString()}`;

      const response = await fetch(endPoint);
      if (response.ok) {
        const data = await response.json();
        return data.events;
      } else {
        return [];
      }
    } catch (error) {
      throw new Error("Error: Cannot fetch user's events");
    }
  },
  getEventsByUserId: async (
    userId: string,
    timeline: EventTimeLine = EventTimeLine.All,
    page?: number,
    pageSize?: number,
  ): Promise<UserEvent[] | undefined> => {
    const searchParams = new URLSearchParams();
    if (page) searchParams.append('page', page.toString());
    if (pageSize) searchParams.append('pageSize', pageSize.toString());
    const endPoint = `/api/users/${userId}/events?&timeline=${timeline}&${searchParams.toString()}`;
    const response = await fetch(endPoint);

    if (response.ok) return response.json();

    throw new Error("Error: Cannot fetch user's events");
  },
  getAllEvents: async (
    timeline: EventTimeLine = EventTimeLine.All,
    pageNumber?: number,
    pageSize?: number,
  ): Promise<GetAllEventsAPIResponse> => {
    const searchParams = new URLSearchParams();
    if (pageNumber) searchParams.append('page', pageNumber.toString());
    if (pageSize) searchParams.append('pageSize', pageSize.toString());

    const endPoint = `/api/events?timeline=${timeline}&${searchParams.toString()}`;
    const response = await fetch(endPoint);

    const data = await response.json();

    if (response.ok) {
      return data as GetAllEventsAPIResponse;
    }
    throw new Error(data?.message || 'Error: Cannot fetch events');
  },
  registerUserForEvent: async (eventId: string, userId: string): Promise<void> => {
    const endPoint = `/api/events/${eventId}/register`;

    const response = await fetch(endPoint, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error('Error: Cannot register user for event');
    }
  },
  unregisterUserForEvent: async (eventId: string, userId: string): Promise<void> => {
    const endPoint = `/api/events/${eventId}/unregister`;

    const response = await fetch(endPoint, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error('Error: Cannot unregister user for event');
    }
  },
  getEventParticipants: async (
    eventId: string,
  ): Promise<{
    eventId: string;
    users: { _id: string; firstName: string; lastName: string; imageUrl: string }[];
  }> => {
    const endPoint = `/api/events/${eventId}/participants`;

    const response = await fetch(endPoint);
    if (response.ok) {
      const data: {
        eventId: string;
        users: { _id: string; firstName: string; lastName: string; imageUrl: string }[];
      } = await response.json();
      return data;
    }
    throw new Error('Error: Cannot fetch event participants');
  },
  postCreateEvent: async ({
    title,
    description,
    imageUrl,
    location,
    categories,
    startDate,
    endDate,
  }: Partial<UserEvent>): Promise<{ _id: string }> => {
    const endPoint = `/api/events`;
    const response = await fetch(endPoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        location,
        categories,
        startDate,
        endDate,
      }),
    });
    if (!response.ok) {
      throw new Error('Error: Cannot create event');
    }
    const res = await response.json();
    console.log('res', res);
    return res;
  },
};
