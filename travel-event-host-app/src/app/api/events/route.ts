import { connectMongoDB } from '@/lib/mongodb';
import { UserEvent } from '@/models/user-event';
import { EventRepository } from '@/schemas/user-event';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  let {
    title,
    description = '',
    eventCreatorId, // This should come from the session
    location,
    startDate,
    endDate,
    categories,
  } = (await req.json()) as Partial<UserEvent>;

  await connectMongoDB();

  const newEvent = await EventRepository.create({
    title,
    description,
    eventCreatorId,
    location,
    startDate,
    endDate,
    categories,
  });

  return NextResponse.json({ message: 'event created the id is ' + newEvent.id }, { status: 201 });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  let page: number = parseInt(searchParams.get('page') || '1', 10);
  let pageSize: number = parseInt(searchParams.get('pageSize') || '50', 10);

  const allEvents = await EventRepository.aggregate([
    {
      $facet: {
        metadata: [{ $count: 'totalCount' }],
        data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
      },
    },
  ]);

  await connectMongoDB();

  return NextResponse.json(
    { totalCount: allEvents[0].metadata[0].totalCount, events: allEvents[0].data },
    { status: 200 },
  );
}
