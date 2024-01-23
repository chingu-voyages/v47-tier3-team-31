import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import Event from '@/schemas/event';
import mongoose from 'mongoose';

export async function GET(req: Request, params: any) {
  const id = params.id;
  await connectMongoDB();
  const isValidObjectId = mongoose.Types.ObjectId.isValid(id);
  if (!isValidObjectId) {
    return NextResponse.json({ message: 'Invalid ObjectId format' }, { status: 400 });
  }

  const eventFound = await Event.findById(id);
  if (eventFound) return NextResponse.json({ eventFound }, { status: 201 });
  else return NextResponse.json({ message: 'event no exist' }, { status: 500 });
}
