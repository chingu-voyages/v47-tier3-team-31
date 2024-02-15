import { registerUserToEventValidationSchema } from '@/app/api/endpoint-validation/schemas/register-user-to-event-validation.schema';
import { connectMongoDB } from '@/lib/mongodb';
import { EventRepository } from '@/schemas/user-event';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request, { params }: any) {
  const { id } = params;
  const requestBody = await req.json();

  const isValidObjectId = mongoose.Types.ObjectId.isValid(id);
  if (!isValidObjectId) {
    return NextResponse.json({ message: `Invalid ObjectId format ${id}` }, { status: 400 });
  }

  // Validate
  try {
    await registerUserToEventValidationSchema.validate(requestBody, { abortEarly: false });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
  const { userId } = requestBody;

  await connectMongoDB();
  const eventFound = await EventRepository.findById(id);

  if (eventFound) {
    const isUserIdAlreadyPresent = eventFound.participants.some(
      (participant: { userId: string; timeStamp: Date }) => participant.userId === userId,
    );
    if (!isUserIdAlreadyPresent) {
      eventFound.participants.push({ userId, timeStamp: new Date() });
      await eventFound.save();
      return NextResponse.json({ message: 'User registered' }, { status: 200 });
    } else return NextResponse.json({ message: 'User already present' }, { status: 409 });
  } else {
    return NextResponse.json({ message: 'Event does not exist' }, { status: 400 });
  }
}
