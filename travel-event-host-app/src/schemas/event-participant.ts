import { EventParticipant } from '@/models/event-participant';
import { Schema } from 'mongoose';

export const EventParticipantSchema = new Schema<EventParticipant>({
  userId: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});
