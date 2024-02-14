import { User } from '@/models/user';
import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema<User>(
  {
    firstName: {
      type: String,
      required: true,
    },
    imageUrl: String,
    lastName: {
      type: String,
      required: true,
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
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const UserRepository: mongoose.Model<User> =
  mongoose.models.User || mongoose.model<User>('User', userSchema);
