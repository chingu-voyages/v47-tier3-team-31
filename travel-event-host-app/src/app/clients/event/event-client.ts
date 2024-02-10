import { Category } from '@/lib/category';
import { UserEvent } from '@/models/user-event';

export async function getEventById(id: string): Promise<UserEvent | undefined> {
  try {
    const response = await fetch(`/api/events/${id}`);
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

    const apiUrl = `/api/events/search?${searchParams.toString()}`;

    const response = await fetch(apiUrl);
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
    const response = await fetch(`/api/user/${userId}/events`);
    return response.json();
  } catch (error) {
    throw new Error("Error: Cannot fetch user's events");
  }
}
