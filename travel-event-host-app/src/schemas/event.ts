import Event from '@/models/event';
import mongoose, { Schema, models } from 'mongoose';
const eventSchema = new Schema<Event>(
  {
    title: {
      type: String,
      required: true,
    },
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
    category: String,
  },

  { timestamps: true },
);

export default models.Event || mongoose.model('Event', eventSchema);
