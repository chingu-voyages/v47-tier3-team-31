import { NextResponse } from 'next/server';
import { connectMongoDB } from '@/lib/mongodb';
import User from '@/schemas/user';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  let { email, password, name } = await req.json();
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

    return NextResponse.json({ error: { email: ['Email already in use'] } }, { status: 403 });
  } else {
    const newUser = await User.create({
      email,
      password: hashedPassword,
      firstName: name,
    });
    console.log('user created');

    return NextResponse.json({ message: 'User Created' }, { status: 201 });
  }
}
