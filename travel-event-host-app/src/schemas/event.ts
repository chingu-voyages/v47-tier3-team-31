import Category from '@/lib/category';
import mongoose, { Schema, models } from 'mongoose';
import Event from '@/models/event';
const eventSchema = new Schema<Event>(
  {
    description: {
      type: String,
      required: false,
    },
    imageUrl: String,
    eventCreatorId: String,

    participantIds: [
      {
        userId: String,
        timeStamp: Date,
      },
    ],

    location: {
      country: String,
      state: String,
      city: String,
      coords: { lat: Number, long: Number },
    },
    startDate: Date,
    endDate: Date,
    category: Category,
  },

  { timestamps: true },
);

export default models.Event || mongoose.model('Event', eventSchema);
