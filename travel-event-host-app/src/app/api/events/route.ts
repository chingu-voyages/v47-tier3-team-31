import { connectMongoDB } from '@/lib/mongodb';
import { UserEvent } from '@/models/user-event';
import { EventRepository } from '@/schemas/user-event';
import { EventTimeLine } from '@/types/event-timeline';

import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import {
  eventCreateValidationSchema,
  eventCreationCategoriesSchema,
  eventLocationRouteValidationSchema,
} from '../../../lib/yup-validators/event/event-create-validation.schema';
import authOptions from '../auth/auth-options';
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  const requestBody = await req.json();

  // Validate
  try {
    await eventCreateValidationSchema.validate(requestBody, { abortEarly: false });
  } catch (e) {
    return NextResponse.json(e, { status: 400 });
  }

  try {
    await eventCreationCategoriesSchema.validate(requestBody, { abortEarly: false });
  } catch (e) {
    return NextResponse.json(e, { status: 400 });
  }

  try {
    await eventLocationRouteValidationSchema.validate(requestBody, { abortEarly: false });
  } catch (e) {
    return NextResponse.json(e, { status: 400 });
  }

  const { title, description, location, startDate, endDate, categories, imageUrl } =
    requestBody as Partial<UserEvent>;

  await connectMongoDB();

  const newEvent = await EventRepository.create({
    title,
    description,
    location,
    startDate,
    endDate,
    categories,
    imageUrl,
    eventCreatorId: session.user._id,
  });

  return NextResponse.json({ _id: newEvent.id }, { status: 201 });
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
