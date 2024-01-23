import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import Event from '@/schemas/event';

export async function POST(req: Request) {
  let {
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

  const newEvent = await Event.create({
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
  //to get query use this, here you get query1 for example
  const { searchParams } = new URL(req.url);
  const query1 = searchParams.get('query1');
  await connectMongoDB();
  const allEvents = await Event.find({});

  return NextResponse.json({ allEvents }, { status: 200 });
}
