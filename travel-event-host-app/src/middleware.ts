import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
const blockedPagesWithoutLogin = ['/dashboard', '/create-event'];

export default async function middleware(req: NextRequest) {
  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: !(process.env.SECURE_COOKIE === 'false'),
  });

  const auth = req.nextUrl.clone();
  auth.pathname = '/auth/login';
  const afterAuth = req.nextUrl.clone();
  const home = req.nextUrl.clone();
  home.pathname = '/';
  afterAuth.pathname = '/';

  const currentUrl = req.nextUrl.pathname;
  // Store current request url in a custom header, which you can read later
  if (blockedPagesWithoutLogin.includes(currentUrl) && !session) {
    return NextResponse.redirect(home);
  }
  // If user is unauthenticated, continue.

  return NextResponse.next();
}
export const config = {
  matcher: [
    '/dashboard',
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
