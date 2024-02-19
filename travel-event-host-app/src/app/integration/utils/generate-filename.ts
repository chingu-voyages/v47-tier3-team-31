import mongoose from 'mongoose';

export function generateFilename(userId: string): string {
  const randomMongoId = new mongoose.Types.ObjectId();
  return `${userId}-${randomMongoId.toString()}`;
}
