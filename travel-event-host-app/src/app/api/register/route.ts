import { connectMongoDB } from '@/lib/mongodb';
import { UserModel } from '@/schemas/user';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  let { email, password, firstName, lastName, location } = await req.json();

  let hashedPassword = '';

  await connectMongoDB();

  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }
  const userExist1 = await UserModel.findOne({
    email: email,
  }).select('email');

  if (userExist1) {
    console.log('user existed');

    return NextResponse.json({ message: 'Email already in use' }, { status: 403 });
  } else {
    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      location,
    });
    console.log('user created');

    return NextResponse.json({ message: 'user created the id is ' + newUser.id }, { status: 201 });
  }
}
