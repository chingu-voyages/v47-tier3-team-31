import { Category } from '@/lib/category';

export interface UserEvent {
  _id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  eventCreatorId: string;
  participants: {
    userId: string;
    timeStamp: Date;
  }[];
  location: {
    country: string;
    state: string;
    city: string;
    formattedAddress: string;
    coords: {
      lat: number;
      lng: number;
    };
    place_id: string;
  };
  startDate: Date;
  endDate: Date;
  categories: Category[];
}
