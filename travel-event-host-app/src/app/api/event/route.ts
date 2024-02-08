import { connectMongoDB } from '@/lib/mongodb';
import Event from '@/schemas/event';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  let {
    title = '',
    description = '',
    eventCreatorId,
    location /* {
        country: String,
        state: String,
        city: String,
        coords: { lat: Number, long: Number },
      } */,
    startDate,
    endDate,
    category,
  } = await req.json();

  await connectMongoDB();

  const newEvent = await Event.create({
    title,
    description,
    eventCreatorId,
    location,
    startDate,
    endDate,
    category,
  });

  return NextResponse.json({ message: 'event created the id is ' + newEvent.id }, { status: 201 });
}
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  let page: number = parseInt(searchParams.get('page') || '1', 10);
  let pageSize: number = parseInt(searchParams.get('pageSize') || '50', 10);

  const allEvents = await Event.aggregate([
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
