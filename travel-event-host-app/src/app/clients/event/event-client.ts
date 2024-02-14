import { Category } from '@/lib/category';
import { UserEvent } from '@/models/user-event';
import { GetAllEventsAPIResponse } from './models';

export async function getEventById(id: string): Promise<UserEvent | undefined> {
  try {
    const endPoint = `/api/events/${id}`;
    const response = await fetch(endPoint);
    return response.json();
  } catch (error) {
    throw new Error('Error: Cannot fetch event');
  }
}

export async function getEventsBySearchQuery(
  keyword: string,
  categories: Category[],
): Promise<UserEvent[]> {
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
}

/**
 * Gets the events for a user by their id. V2 will include pagination
 * @param userId the id of the user to get events for
 * @returns {Promise<Event[] | undefined>} an array of events
 */
export async function getEventsByUserId(userId: string): Promise<UserEvent[] | undefined> {
  try {
    const endPoint = `/api/users/${userId}/events`;
    const response = await fetch(endPoint);
    return response.json();
  } catch (error) {
    throw new Error("Error: Cannot fetch user's events");
  }
}

export async function getAllEvents(
  pageNumber: number = 1,
  pageSize: number = 3,
): Promise<GetAllEventsAPIResponse> {
  try {
    const endPoint = `/api/events?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    const response = await fetch(endPoint);

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || 'Error:[101] Cannot fetch events');
    }

    return data;
  } catch (error: any) {
    throw new Error(error?.message || 'Error:[102] Cannot fetch events');
  }
}
