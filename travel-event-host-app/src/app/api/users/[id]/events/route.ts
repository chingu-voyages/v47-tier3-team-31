import { connectMongoDB } from '@/lib/mongodb';
import { UserRepository } from '@/schemas/user';
import { EventRepository } from '@/schemas/user-event';

import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

// This route will return all the events for a user.
// Search query can specify 'timeline' ('upcoming'| 'past' | 'all') and 'pageSize' and 'page'
export async function GET(req: Request, { params }: any) {
  const { id } = params;
  const { searchParams } = new URL(req.url);

  const page: number = parseInt(searchParams.get('page') || '1', 10);
  const pageSize: number = parseInt(searchParams.get('pageSize') || '50', 10);

  const timeline: string = searchParams.get('timeline') || 'all';

  if (!mongoose.Types.ObjectId.isValid(id))
    return NextResponse.json({ message: 'Invalid ObjectId format' }, { status: 400 });

  await connectMongoDB();
  const user = await UserRepository.findById(id);
  if (user) {
    const baseQuery: any = {
      'participants.userId': user._id, // Base query defaults to all
    };

    if (timeline === 'upcoming') {
      baseQuery['startDate'] = { $gte: new Date() };
    } else if (timeline === 'past') {
      baseQuery['startDate'] = { $lt: new Date() };
    }
    const userEvents = await EventRepository.find(baseQuery)
      .limit(pageSize)
      .skip((page - 1) * pageSize);
    return NextResponse.json(userEvents, { status: 200 });
  }
  return NextResponse.json({ message: 'User not found' }, { status: 404 });
}
