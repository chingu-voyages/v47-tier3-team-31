import { User as BakPakUser } from '@/models/user';
import 'next-auth';

// Overriding the User and Session types from next-auth so we have custom types
declare module 'next-auth' {
  interface User extends Partial<BakPakUser> {
    id?: string;
  }
  interface Session {
    user?: Partial<User>;
  }
}
