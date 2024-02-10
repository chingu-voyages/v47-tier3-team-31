import Category from '@/lib/category';

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
    coords: {
      lat: number;
      long: number;
    };
  };
  startDate: Date;
  endDate: Date;
  categories: Category[];
}
