import { connectMongoDB } from '@/lib/mongodb';
import { UserEventModel } from '@/schemas/user-event';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request, params: any) {
  let { userId } = await req.json();

  const id = params.id;
  await connectMongoDB();
  const isValidObjectId = mongoose.Types.ObjectId.isValid(id);
  if (!isValidObjectId) {
    return NextResponse.json({ message: 'Invalid ObjectId format' }, { status: 400 });
  }

  const eventFound = await UserEventModel.findById(id);

  if (eventFound) {
    const isUserIdPresent = eventFound.participants.some(
      (participant: { userId: string; timeStamp: Date }) => participant.userId === userId,
    );

    if (isUserIdPresent) {
      eventFound.participants = eventFound.participants.filter(
        (participant: { userId: string; timeStamp: Date }) => participant.userId !== userId,
      );
      await eventFound.save();
      return NextResponse.json({ message: 'User unregistered' }, { status: 200 });
    }

    return NextResponse.json({ message: 'User no present on event' }, { status: 400 });
  } else {
    return NextResponse.json({ message: 'Event does not exist' }, { status: 404 });
  }
}
