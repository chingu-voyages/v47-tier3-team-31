import mongoose from 'mongoose';
import Category from '@/lib/category';

interface Event {
  title: string;
  description?: string;
  imageUrl?: string;
  eventCreatorId: mongoose.Types.ObjectId;
  participantIds: {
    userId: mongoose.Types.ObjectId;
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
  category: Category[];
}
export default Event;
