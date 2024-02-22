import { connectMongoDB } from '@/lib/mongodb';
import { EventRepository } from '@/schemas/user-event';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  await connectMongoDB();
  const isValidObjectId = mongoose.Types.ObjectId.isValid(id);

  if (!isValidObjectId) {
    return NextResponse.json({ message: 'Invalid ObjectId format' }, { status: 400 });
  }

  const eventFound = await EventRepository.findById(id);
  if (eventFound) return NextResponse.json(eventFound, { status: 200 });
  return NextResponse.json({ message: `Event with id ${id} not found` }, { status: 404 });
}
