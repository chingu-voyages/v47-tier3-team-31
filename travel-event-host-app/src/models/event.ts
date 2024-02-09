import Category from '@/lib/category';

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
  categories: string[];
}
export default Event;
