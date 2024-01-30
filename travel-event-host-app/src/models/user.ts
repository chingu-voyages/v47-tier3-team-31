import mongoose from 'mongoose';

interface User {
  firstName?: string;
  imageUrl?: string;
  lastName?: string;
  email: string;
  password: string;
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
}
export default User;
