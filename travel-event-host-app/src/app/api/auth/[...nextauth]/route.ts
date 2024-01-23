import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectMongoDB } from '@/lib/mongodb';
import User from '@/schemas/user';
import { compare } from 'bcrypt';

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

        const user = await User.findOne({
          email: credentials?.email.toUpperCase(),
        });

        if (!user) {
          console.log('Invalid Email');
          throw new Error('Wrong credentials');
        }

        if (await compare(credentials!.password, user.password)) {
          console.log('user logged');
          return user;
        } else {
          console.log('Invalid Password');
          throw new Error('Wrong credentials');
        }
      },
    }),
  ],

  pages: {
    signIn: '/auth/login',
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
