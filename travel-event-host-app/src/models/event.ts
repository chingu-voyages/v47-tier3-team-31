import Category from '@/lib/category';
import mongoose from 'mongoose';

interface Event {
  _id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  eventCreatorId: string;
  participantIds: {
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
  categories: String[];
}
export default Event;
