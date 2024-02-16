import { signIn } from 'next-auth/react';
import { SignInAPIResponse } from './signin-api-response';

export async function registerUser({
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
}): Promise<void> {
  try {
    const req = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ firstName, email, password, lastName, location }),
    });

    const response = await req.json();
    if (!response.ok) {
      throw new Error(response.message);
    }
  } catch (error: any) {
    throw new Error(error?.message || 'Error: Cannot register user');
  }
}

export async function signInUser({
  email,
  password,
  callbackUrl,
  isRegistering = false,
}: {
  email: string;
  password: string;
  callbackUrl?: string;
  isRegistering?: boolean;
}): Promise<SignInAPIResponse> {
  const res = await signIn('credentials', {
    email,
    password,
    redirect: true,
    callbackUrl: callbackUrl,
  });

  if (!res) {
    // The error
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
}
