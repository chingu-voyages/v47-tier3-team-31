import { SecureUser } from '@/types/secure-user';

export const UserClient = {
  getUserById: async (userId: string, scopes?: string[]): Promise<SecureUser | undefined> => {
    let endPoint: string = `/api/users/${userId}`;

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
  },

  patchUserProfileById: async (
    userId: string,
    patchInfo: {
      firstName: string;
      lastName: string;
      bio: string;
      imageUrl?: string | null;
      deleteImageUrl?: boolean;
    },
  ): Promise<void> => {
    const endPoint: string = `/api/users/${userId}`;
    const req = await fetch(endPoint, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(patchInfo),
    });

    if (!req.ok) {
      throw new Error('Error: Cannot patch user profile');
    }
  },
};

// Compute the endpoint with the search params. Remember to pre-append the '?'
function appendSearchParams(endPoint: string, key: string, values: string[]) {
  const searchParams = new URLSearchParams();
  values.forEach((value) => searchParams.append(key, value));
  endPoint = endPoint.concat(`${searchParams.toString()}`);
}
