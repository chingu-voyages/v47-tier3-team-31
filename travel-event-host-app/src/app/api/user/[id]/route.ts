import { connectMongoDB } from '@/lib/mongodb';
import User from '@/schemas/user';
import { SecureUser } from '@/types/secureUser';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: any) {
  //to get query use this, here you get query1 for example
  const { searchParams } = new URL(req.url);

  // Sometimes we want to send only certain properties of the user object to the client.
  // the scope will tell us which properties to send back. This is useful for security reasons.
  const scope: string[] = searchParams.getAll('scope');

  await connectMongoDB();

  const id = params.id;
  const isValidObjectId = mongoose.Types.ObjectId.isValid(id);
  if (!isValidObjectId) {
    return NextResponse.json({ message: 'Invalid ObjectId format' }, { status: 400 });
  }

  const userFound = await User.findById(id).select('-password -admin -email');

  const secureUser: SecureUser = userFound;

  if (userFound) {
    // if there's a scope, we only send back the properties that are in the scope
    if (scope && scope.length > 0) {
      return NextResponse.json(getScopedUserProperties(secureUser, scope), { status: 200 });
    }
    return NextResponse.json(secureUser, { status: 200 });
  }
  return NextResponse.json({ message: 'user no exist' }, { status: 404 });
}

// This returns a user object with only the properties that are in the scope
function getScopedUserProperties(user: any, scope: string[]): Partial<SecureUser> {
  const scopedUser: any = {};
  scope.forEach((property) => {
    if (property in user) {
      scopedUser[property] = user[property];
    }
  });
  return scopedUser as Partial<SecureUser>;
}
