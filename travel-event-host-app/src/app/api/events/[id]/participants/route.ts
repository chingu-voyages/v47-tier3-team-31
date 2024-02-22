import { connectMongoDB } from '@/lib/mongodb';
import { UserEvent } from '@/models/user-event';

import { UserRepository } from '@/schemas/user';
import { EventRepository } from '@/schemas/user-event';
import { SecureUser } from '@/types/secure-user';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

// Fetch the users associated with the event
export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params; // This is the eventId
  if (!mongoose.Types.ObjectId.isValid(id))
    return NextResponse.json({ message: 'Invalid ObjectId format' }, { status: 400 });

  await connectMongoDB();
  const event: UserEvent | null = await EventRepository.findById(id);

  if (!event) return NextResponse.json({ message: 'Event not found' }, { status: 404 });

  const { participants } = event;
  if (!participants || participants.length === 0) return NextResponse.json([], { status: 200 });

  let selectedUserProperties: string = '_id firstName lastName imageUrl';

  const users: Partial<SecureUser>[] = await UserRepository.find({
    _id: { $in: participants.map(({ userId }) => userId) },
  }).select(selectedUserProperties);

  return NextResponse.json({ eventId: id, users }, { status: 200 });
}
