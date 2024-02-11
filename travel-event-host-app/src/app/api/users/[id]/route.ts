import { connectMongoDB } from '@/lib/mongodb';
import { UserRepository } from '@/schemas/user';
import { SecureUser } from '@/types/secure-user';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: any) {
  //to get query use this, here you get query1 for example

  await connectMongoDB();

  const id = params.id;
  const isValidObjectId = mongoose.Types.ObjectId.isValid(id);
  if (!isValidObjectId) {
    return NextResponse.json({ message: 'Invalid ObjectId format' }, { status: 400 });
  }

  const userFound = await UserRepository.findById(id).select('-password -admin -email');
  const secureUser: Partial<SecureUser> = userFound;
  if (userFound) return NextResponse.json(secureUser, { status: 200 });
  else return NextResponse.json({ message: 'user no exist' }, { status: 404 });
}
