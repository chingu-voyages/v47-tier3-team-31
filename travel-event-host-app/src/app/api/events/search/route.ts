import { connectMongoDB } from '@/lib/mongodb';
import { EventRepository } from '@/schemas/user-event';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page: number = parseInt(searchParams.get('page') || '1', 10);
  const pageSize: number = parseInt(searchParams.get('pageSize') || '50', 10);
  const keyword = searchParams.get('keyword');
  const categories: string[] = searchParams.getAll('category');

  await connectMongoDB();

  let aggregatePipeline: any[] = [];

  if (keyword) {
    aggregatePipeline = aggregatePipeline.concat(
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
    );
  }

  if (categories.length > 0) {
    if (aggregatePipeline.length > 0) {
      aggregatePipeline[0].$match.$or = [{ categories: { $in: categories } }];
    } else {
      aggregatePipeline = aggregatePipeline.concat(
        {
          $match: {
            categories: { $in: categories },
          },
        },
        {
          $facet: {
            metadata: [{ $count: 'totalCount' }],
            data: [{ $skip: (page - 1) * pageSize }, { $limit: pageSize }],
          },
        },
      );
    }
  }

  if (aggregatePipeline.length === 0) {
    return NextResponse.json(
      { ...nullSearchResponse, message: 'No events found. Aggregation empty' },
      { status: 200 },
    );
  }

  const allEvents = await EventRepository.aggregate(aggregatePipeline);

  if (allEvents[0].data.length > 0) {
    return NextResponse.json(
      { totalCount: allEvents[0].metadata[0].totalCount, events: allEvents[0].data },
      { status: 200 },
    );
  }
  return NextResponse.json(nullSearchResponse, { status: 200 });
}

const nullSearchResponse = { totalCount: 0, events: [], message: 'No events found' };
