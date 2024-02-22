import NextAuth from 'next-auth';
import { authOptions } from '../auth-options';

const exportedOptions = NextAuth(authOptions);
export { exportedOptions as GET, exportedOptions as POST };
