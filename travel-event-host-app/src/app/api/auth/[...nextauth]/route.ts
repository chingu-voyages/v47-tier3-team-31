import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectMongoDB } from '@/lib/mongodb';
import User from '@/schemas/user';
import { compare } from 'bcrypt';

/* this type is declared for typescript requirements, this is used on the callbacks jwt and session of handler.
you can notice it have a syntax similar to the interface of User, but it don't have sensitive data like password*/
type SessionUser = {
  name?: string | null | undefined;
  _id: string;
  firstName?: string;
  imageUrl?: string;
  lastName?: string;
  email: string;
  location: {
    country: string;
    state: string;
    city: string;
    coords: {
      lat: number;
      long: number;
    };
  };
  eventIds: string[];
  admin?: boolean;
};

const handler = NextAuth({
  callbacks: {
    async signIn({ user, account }) {
      return true;
    },
    /* jwt= json web token, this is a way to save the user session when logged on the cache, 
    Nextauth manage it for default,
    you can save data of the user here, this callback run before of session callback,
    this callback is called on getSession(), getServerSession(), useSession().

    The arguments user, account, profile and isNewUser are only passed the first time this callback 
    is called on a new session, after the user signs in. In subsequent calls, only token will be available. 
    
    The token data it only visible on backend so the data we set here is not visible on the session object 
    we get from useSession(), to get data to that object we use the callback session below*/
    async jwt({ token, account, profile }) {
      // connect to MongoDB
      await connectMongoDB();
      // token have the data of the signIn(see authorize async function below)
      // search the user data on the db with the email on the token
      const userSession = await User.findOne({
        email: token.email,
      }).select('-password');

      // destructuring token to add the data from MongoDB
      token = {
        ...token,
        /* the data returned from MongoDB can be destructured because you will get others things like the metadata,
         the property "_doc" have the "useful data"(I mean without the metadata) it can be destructured */
        ...userSession._doc,
        // use the SessionUser type
      } as SessionUser;
      return token;
    },
    /* session is called every time we call the session() function from NextAuth on the frontend
     */
    async session({ session, user, token }) {
      // destructuring session user data to add the data from MongoDB
      session.user = {
        ...session.user,
        /* because the callback session is called after of the jwt callback, this get the data returned
        on callback jwt in the argument token so we don't need call to MongoDB twice*/
        ...token,
        // use the SessionUser type
      } as SessionUser;

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

        const user = await User.findOne({
          email: credentials?.email.toUpperCase(),
        });

        if (!user) {
          console.log('Invalid Email');
          throw new Error('Wrong credentials');
        }

        if (await compare(credentials!.password, user.password)) {
          console.log('User logged');
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
