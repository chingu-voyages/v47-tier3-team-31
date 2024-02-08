import Event from '@/models/event';
import { SecureUser } from '@/types/secureUser';
import { getEventById } from '../event/event-client';

/**
 *
 * @param userId the id of the user to get
 * @returns {Promise<SecureUser | undefined>} a user object or undefined
 */
export async function getUserById(userId: string): Promise<SecureUser | undefined> {
  try {
    const response = await fetch(`/api/user/${userId}`);
    return response.json();
  } catch (error) {
    throw new Error('Error: Cannot fetch user');
  }
}

/**
 * @param userId the user to get events for
 * @returns {Promise<Event[]>} the events for the user
 */
export async function getEventsByUser(user: SecureUser): Promise<Event[] | undefined> {
  if (!user) return [];
  if (user?.eventIds?.length === 0) return [];

  try {
    // Fetch all of the events by id. Filter out the resolved promises and then map them to an array of Event objects
    const results = (
      await Promise.allSettled(user.eventIds.map((eventId) => getEventById(eventId)))
    ).filter((result) => result.status === 'fulfilled') as PromiseFulfilledResult<Event>[];

    return results.map((result) => result.value) as Event[];
  } catch (error) {
    throw new Error('Error: Cannot fetch events associated with the user.');
  }
}
