import { locationUpdateValidationSchema } from '@/lib/yup-validators/profile-update/location-update/location-update-validator';
import { UserRepository } from '@/schemas/user';
import mongoose from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return NextResponse.json({ message: 'Invalid ObjectId format' }, { status: 400 });

  // Validate the request body
  const requestBody = await req.json();
  try {
    await locationUpdateValidationSchema.validate(requestBody, { abortEarly: false });
  } catch (validationError: any) {
    return NextResponse.json(validationError, { status: 400 });
  }

  // We expect country, state, city, place_id, formattedAddress, coords from the request body and they shall be patched 😏
  const user = await UserRepository.findById(id);
  if (user) {
    const { country, state, city, place_id, formattedAddress, coords } = requestBody;
    user.location = {
      country,
      state,
      city,
      place_id,
      formattedAddress,
      coords,
    };
    await user.save();
    return NextResponse.json({ message: `User ${id} updated.` }, { status: 200 });
  }
  return NextResponse.json({ message: `User ${id} not found.` }, { status: 404 });
}
