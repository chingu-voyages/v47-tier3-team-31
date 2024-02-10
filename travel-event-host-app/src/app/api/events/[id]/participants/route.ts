import { connectMongoDB } from '@/lib/mongodb';
import { UserEvent } from '@/models/user-event';

import { UserModel } from '@/schemas/user';
import { UserEventModel } from '@/schemas/user-event';
import { SecureUser } from '@/types/secureUser';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

// Fetch the users associated with the event
export async function GET(req: Request, { params }: any) {
  const { id } = params; // This is the eventId
  const { searchParams } = new URL(req.url);
  const isValidObjectId = mongoose.Types.ObjectId.isValid(id);

  // Possible query params are scope (to specify which properties to send back to the client)
  const scope: string[] = searchParams.getAll('scope');

  if (!isValidObjectId) {
    return NextResponse.json({ message: 'Invalid ObjectId format' }, { status: 400 });
  }

  await connectMongoDB();

  const event: UserEvent | null = await UserEventModel.findById(id);
  console.log(event);
  if (!event) return NextResponse.json({ message: 'Event not found' }, { status: 404 });

  const { participants } = event;
  if (!participants || participants.length === 0) return NextResponse.json([], { status: 200 });

  let selectedUserProperties: string = '-password -admin -email';
  if (scope.length > 0) {
    // If there's a scope, change the selected properties to the ones in the scope
    selectedUserProperties = scope.join(' ').concat(' _id');
  }

  const users: Partial<SecureUser>[] = await UserModel.find({
    _id: { $in: participants.map(({ userId }) => userId) },
  }).select(selectedUserProperties);

  return NextResponse.json({ eventId: id, users }, { status: 200 });
}
