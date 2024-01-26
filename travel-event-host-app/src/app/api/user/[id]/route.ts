import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import mongoose from 'mongoose';
import User from '@/schemas/user';
import { SecureUser } from '@/types/secureUser';

export async function GET(req: Request, { params }: any) {
  //to get query use this, here you get query1 for example
  const { searchParams } = new URL(req.url);
  const query1 = searchParams.get('query1');
  await connectMongoDB();

  const id = params.id;
  const isValidObjectId = mongoose.Types.ObjectId.isValid(id);
  if (!isValidObjectId) {
    return NextResponse.json({ message: 'Invalid ObjectId format' }, { status: 400 });
  }

  const userFound = await User.findById(id).select('-password -admin -email');
  const secureUser: SecureUser = userFound;
  if (userFound) return NextResponse.json({ secureUser }, { status: 200 });
  else return NextResponse.json({ message: 'user no exist' }, { status: 404 });
}
