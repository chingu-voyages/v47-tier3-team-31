import { Category } from '@/lib/category';
import { LocationData } from './location';

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
  location: LocationData;
  startDate: Date;
  endDate: Date;
  categories: Category[];
}
