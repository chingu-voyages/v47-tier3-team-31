import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import Event from '@/schemas/event';
import mongoose from 'mongoose';

export async function PATCH(req: Request, params: any) {
  let { userId } = await req.json();

  const id = params.id;
  await connectMongoDB();
  const isValidObjectId = mongoose.Types.ObjectId.isValid(id);
  if (!isValidObjectId) {
    return NextResponse.json({ message: 'Invalid ObjectId format' }, { status: 400 });
  }

  const eventFound = await Event.findById(id);

  if (eventFound) {
    eventFound.participantIds = eventFound.participantIds.filter(
      (participant: { userId: string; timeStamp: Date }) => participant.userId !== userId,
    );

    await eventFound.save();

    return NextResponse.json({ message: 'User unregistered' }, { status: 200 });
  } else {
    return NextResponse.json({ message: 'Event does not exist' }, { status: 500 });
  }
}
