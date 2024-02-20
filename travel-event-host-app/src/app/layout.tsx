import { MuiThemeProvider } from '@/providers/muiThemeProvider';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import type { Metadata } from 'next';
import { Roboto_Flex } from 'next/font/google';

import Header from '@/components/header/Header';

import { Footer } from '@/components/footer/Footer';
import { AuthenticationSessionProvider } from '@/lib/auth-context';
import { NextAuthProvider } from '@/providers/nextAuthProvider';
import './globals.css';

const roboto = Roboto_Flex({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Bakpak',
  description: 'Social. Adventure. Travel.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className='scrollbar1' lang='en'>
      <body className={roboto.className}>
        <NextAuthProvider>
          <AuthenticationSessionProvider>
            <AppRouterCacheProvider>
              <MuiThemeProvider>
                <Header />
                {children}
                <Footer />
              </MuiThemeProvider>
            </AppRouterCacheProvider>
          </AuthenticationSessionProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
