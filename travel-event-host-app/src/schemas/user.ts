import { User } from '@/models/user';
import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema<User>(
  {
    firstName: {
      type: String,
    },
    imageUrl: String,
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    location: {
      country: String,
      state: String,
      city: String,
      coords: { lat: Number, long: Number },
    },
    eventIds: [String],

    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const UserModel = mongoose.models.User || mongoose.model<User>('User', userSchema);
