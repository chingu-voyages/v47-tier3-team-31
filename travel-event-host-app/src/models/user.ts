export interface User {
  _id: string;
  id: string;
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
