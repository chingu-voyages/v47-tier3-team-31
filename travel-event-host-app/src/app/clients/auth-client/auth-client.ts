import { signIn } from 'next-auth/react';
import { SignInAPIResponse } from './signin-api-response';

export const AuthClient = {
  registerUser: async ({
    firstName,
    email,
    password,
    lastName,
    location,
  }: {
    firstName: string;
    email: string;
    password: string;
    lastName: string;
    location?: { country?: string; state?: string; city?: string };
  }): Promise<void> => {
    const req = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, email, password, lastName, location }),
    });

    if (!req.ok) {
      const response: any = await req.json();
      throw new Error(response?.message || 'Error: Cannot register user');
    }
  },
  signInUser: async ({
    email,
    password,
    callbackUrl,
    isRegistering = false,
  }: {
    email: string;
    password: string;
    callbackUrl?: string;
    isRegistering?: boolean;
  }): Promise<SignInAPIResponse> => {
    const res = await signIn('credentials', {
      email,
      password,
      redirect: true,
      callbackUrl: callbackUrl,
    });

    if (!res) {
      if (isRegistering) {
        throw new Error('We have experienced an error. Please contact support.');
      }
      return {
        success: false,
        errors: {
          apiError: ['An unknown error occured. Please try again.'],
        },
      };
    }

    // This is to handle basic sign in
    if (res.ok) return { success: true };
    return {
      success: false,
      errors: {
        email: ['Please check your credentials and try again'],
        password1: ['Please check your credentials and try again'],
      },
    };
  },
};
