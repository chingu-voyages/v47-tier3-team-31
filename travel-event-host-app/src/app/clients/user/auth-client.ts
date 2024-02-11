import { signIn } from 'next-auth/react';

export async function clientSignUp(
  name: string,
  email: string,
  password: string,
): Promise<string | true | undefined | Record<string, string[]>> {
  try {
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      return true;
    } else {
      const data = await res.json();
      return data.error as Record<string, string[]>;
    }
  } catch (error) {
    return 'Error on signup';
  }
}

export async function clientSignIn(
  email: string,
  password: string,
): Promise<string | true | undefined | Record<string, string[]>> {
  const res = await signIn('credentials', {
    password,
    email,
    redirect: false,
  });
  if (res) {
    if (res.ok) {
      return true;
    } else {
      return {
        email: ['Email or password was entered incorrectly'],
        password1: ['Email or password was entered incorrectly'],
      };
    }
  } else {
    return {
      email: ['Error on signin'],
      password1: ['Error on signin'],
    };
  }
}
