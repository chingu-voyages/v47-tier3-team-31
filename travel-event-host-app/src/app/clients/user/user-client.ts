import { SecureUser } from '@/types/secureUser';

/**
 *
 * @param userId the id of the user to get
 * @param scopes the properties to get from the user object
 * @returns {Promise<SecureUser | undefined>} a user object or undefined
 */
export async function getUserById(
  userId: string,
  scopes?: string[],
): Promise<SecureUser | undefined> {
  let endPoint: string = `/api/user/${userId}`;

  if (scopes && scopes.length > 0) {
    endPoint = endPoint.concat('?');
    appendSearchParams(endPoint, 'scope', scopes);
  }

  try {
    const response = await fetch(endPoint);
    return response.json();
  } catch (error) {
    throw new Error('Error: Cannot fetch user');
  }
}

// Compute the endpoint with the search params. Remember to pre-append the '?'
function appendSearchParams(endPoint: string, key: string, values: string[]) {
  const searchParams = new URLSearchParams();
  values.forEach((value) => searchParams.append(key, value));
  endPoint = endPoint.concat(`${searchParams.toString()}`);
}
