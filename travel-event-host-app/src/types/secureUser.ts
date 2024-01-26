import User from '@/models/user';

export type SecureUser = Omit<User, 'email' | 'password' | 'admin'>;
