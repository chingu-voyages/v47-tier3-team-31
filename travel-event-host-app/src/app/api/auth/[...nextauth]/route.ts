import { connectMongoDB } from '@/lib/mongodb';
import { UserRepository } from '@/schemas/user';
import { compare } from 'bcrypt';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  callbacks: {
    async signIn({ user, account }) {
      return true;
    },
    async jwt({ token, account, profile }) {
      token = {
        ...token,
      };

      return token;
    },
  },

  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        password: {
          label: 'Password',
          type: 'password',
        },
        email: {
          label: 'Email',
          type: 'text',
        },
      },

      async authorize(credentials) {
        await connectMongoDB();

        const user = await UserRepository.findOne({
          email: credentials?.email,
        });

        if (!user) {
          return null;
        }

        if (await compare(credentials!.password, user.password)) {
          console.log('user logged in successful');
          // Right now, let's use this info for the JWT token
          return {
            id: user._id,
            _id: user._id,
            email: user.email,
          };
        } else {
          console.log('Invalid Password');
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: '/auth/signin',
  },

  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
