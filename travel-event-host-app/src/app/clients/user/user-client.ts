import Event from '@/models/event';
import { SecureUser } from '@/types/secureUser';

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
 * Gets the events for a user by their id. V2 will include pagination
 * @param userId the id of the user to get events for
 * @returns {Promise<Event[] | undefined>} an array of events
 */
export async function getEventsByUserId(userId: string): Promise<Event[] | undefined> {
  try {
    const response = await fetch(`/api/user/${userId}/events`);
    return response.json();
  } catch (error) {
    throw new Error("Error: Cannot fetch user's events");
  }
}
