export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  imageUrl?: string;
  email: string;
  password: string;
  location?: {
    country?: string;
    state?: string;
    city?: string;
    coords?: {
      lat?: number;
      long?: number;
    };
  };
  isAdmin?: boolean;
}
