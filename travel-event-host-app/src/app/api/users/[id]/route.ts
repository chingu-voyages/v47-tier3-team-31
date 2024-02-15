import { connectMongoDB } from '@/lib/mongodb';
import { UserRepository } from '@/schemas/user';
import { SecureUser } from '@/types/secure-user';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: any) {
  await connectMongoDB();

  const { id } = params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return NextResponse.json({ message: 'Invalid ObjectId format' }, { status: 400 });

  const userFound: SecureUser = await UserRepository.findById(id).select('-password -admin -email');

  if (userFound) return NextResponse.json(userFound, { status: 200 });
  return NextResponse.json({ message: `User ${id} not found.` }, { status: 404 });
}
