import mongoose from 'mongoose';
import { object, string } from 'yup';

export const registerUserToEventValidationSchema = object({
  userId: string()
    .required('userId is required')
    .test('is-valid-object-id', 'Invalid ObjectId format', (value) => {
      return mongoose.Types.ObjectId.isValid(value);
    }),
});
