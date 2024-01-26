import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import User from '@/schemas/user';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  let { email, password, firstName, lastName, location } = await req.json();
  console.log({ email, password });
  email = email.toUpperCase();

  let hashedPassword = '';

  await connectMongoDB();

  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }
  const userExist1 = await User.findOne({
    email: email,
  }).select('email');

  if (userExist1) {
    console.log('user existed');

    return NextResponse.json({ message: 'Email already in use' }, { status: 403 });
  } else {
    const newUser = await User.create({
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
