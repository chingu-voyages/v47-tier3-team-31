export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  imageUrl?: string;
  email: string;
  password: string;
  bio?: string;
  location?: {
    country?: string;
    state?: string;
    city?: string;
    coords?: {
      lat?: number;
      lng?: number;
    };
    place_id: string;
  };
  isAdmin?: boolean;
}
