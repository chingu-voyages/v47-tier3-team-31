import { connectMongoDB } from '@/lib/mongodb';
import Event from '@/schemas/event';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  let {
    title = '',
    description = '',
    eventCreatorId,
    imageUrl = '',
    participantIds = [],
    location = '' /* {
        country: String,
        state: String,
        city: String,
        coords: { lat: Number, long: Number },
      } */,
    startDate,
    endDate,
    categories,
  } = await req.json();

  await connectMongoDB();

  const newEvent = await Event.create({
    title,
    description,
    imageUrl,
    participantIds,
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
  let keyword = searchParams.get('keyword');
  const categories: string[] = Array.from(searchParams.getAll('Category') || []);

  await connectMongoDB();
  let aggregatePipeline: any[] = [
    {
      $match: {
        title: { $regex: keyword, $options: 'i' },
      },
    },
    {
      $facet: {
        metadata: [{ $count: 'totalCount' }],
        data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
      },
    },
  ];

  if (categories.length > 0) {
    aggregatePipeline[0].$match.$or = [{ categories: { $in: categories } }];
  }
  const allEvents = await Event.aggregate(aggregatePipeline);
  console.log(allEvents[0].data);
  if (allEvents[0].data.length > 0) {
    return NextResponse.json(
      { totalCount: allEvents[0].metadata[0].totalCount, events: allEvents[0].data },
      { status: 200 },
    );
  } else {
    return NextResponse.json(
      { totalCount: 0, events: [], message: 'Not found events' },
      { status: 404 },
    );
  }
}
