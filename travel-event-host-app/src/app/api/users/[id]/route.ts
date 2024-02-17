import { connectMongoDB } from '@/lib/mongodb';
import { profileUpdateValidationSchema } from '@/lib/yup-validators/profile-update/profile-update-validator';
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

export async function PATCH(req: Request, { params }: any) {
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return NextResponse.json({ message: 'Invalid ObjectId format' }, { status: 400 });

  const requestBody = await req.json();
  try {
    await profileUpdateValidationSchema.validate(requestBody, { abortEarly: false });
  } catch (validationError: any) {
    return NextResponse.json(validationError, { status: 400 });
  }

  // We expect firstName, lastName and bio from the request body and they shall be patched 😏
  // Bio can be an empty string
  const { firstName, lastName, bio } = requestBody;

  const user = await UserRepository.findById(id);
  if (!user) return NextResponse.json({ message: `User ${id} not found.` }, { status: 404 });

  user.firstName = firstName;
  user.lastName = lastName;
  user.bio = bio;
  await user.save();
  return NextResponse.json({ message: `User ${id} updated.` }, { status: 200 });
}
