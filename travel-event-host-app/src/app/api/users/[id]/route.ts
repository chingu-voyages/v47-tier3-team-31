import { connectMongoDB } from '@/lib/mongodb';
import { UserRepository } from '@/schemas/user';
import { SecureUser } from '@/types/secure-user';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: any) {
  //to get query use this, here you get query1 for example

  await connectMongoDB();

  const { id } = params;
  const isValidObjectId = mongoose.Types.ObjectId.isValid(id);
  if (!isValidObjectId) {
    return NextResponse.json({ message: 'Invalid ObjectId format' }, { status: 400 });
  }

  const userFound: SecureUser = await UserRepository.findById(id).select('-password -admin -email');

  if (userFound) return NextResponse.json(userFound, { status: 200 });
  else return NextResponse.json({ message: `User with id ${id} not found.` }, { status: 404 });
}
