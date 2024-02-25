import { LocationData } from './location';

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  imageUrl?: string;
  email: string;
  password: string;
  bio?: string;
  location?: LocationData;
  isAdmin?: boolean;
}
