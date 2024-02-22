import { connectMongoDB } from '@/lib/mongodb';
import { UserEvent } from '@/models/user-event';
import { EventRepository } from '@/schemas/user-event';
import { EventTimeLine } from '@/types/event-timeline';

import { NextRequest, NextResponse } from 'next/server';
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
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const timeline: string = searchParams.get('timeline') || EventTimeLine.All;
  const page: number = parseInt(searchParams.get('page') || '1', 10);
  const pageSize: number = parseInt(searchParams.get('pageSize') || '50', 10);

  let pipeline: any[] = [];

  if (timeline === EventTimeLine.Upcoming) {
    pipeline = pipeline.concat({
      $match: { startDate: { $gte: new Date() } },
    });
  } else if (timeline === EventTimeLine.Past) {
    pipeline = pipeline.concat({ $match: { startDate: { $lt: new Date() } } });
  }

  pipeline = pipeline.concat({
    $facet: {
      metadata: [{ $count: 'totalCount' }],
      data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
    },
  });

  await connectMongoDB();
  const results = await EventRepository.aggregate(pipeline);

  return NextResponse.json(
    { totalCount: results[0].metadata[0].totalCount, events: results[0].data },
    { status: 200 },
  );
}
