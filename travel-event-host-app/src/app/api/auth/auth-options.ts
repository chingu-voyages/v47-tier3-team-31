import { connectMongoDB } from '@/lib/mongodb';
import { UserRepository } from '@/schemas/user';
import { compare } from 'bcrypt';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  callbacks: {
    async signIn() {
      return true;
    },
    async jwt({ token, trigger }) {
      await connectMongoDB();

      const userSession = await UserRepository.findOne({ email: token.email }).select(
        '-password -bio -eventIds',
      );

      if (trigger === 'update') {
        token = {
          ...token,
          imageUrl: userSession?.imageUrl,
          firstName: userSession?.firstName,
          lastName: userSession?.lastName,
        };
      }
      // Token has the data from sign in (see below in authorize function)
      token = {
        ...token,
        _id: userSession?._id.toString(),
        firstName: userSession?.firstName,
        lastName: userSession?.lastName,
        imageUrl: userSession?.imageUrl,
      };

      return token;
    },

    async session({ session, user, token }) {
      session = {
        ...session,
        user: {
          firstName: token.firstName,
          lastName: token.lastName,
          _id: token._id?.toString(),
          imageUrl: token.imageUrl,
        },
      };

      return session;
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
          // Right now, let's use this info for the JWT token
          return {
            _id: user._id.toString(),
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
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
};

export default authOptions;
