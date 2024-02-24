import { User } from '@/models/user';
import { ObjectSchema, number, object, string } from 'yup';

interface RegistrationUser extends Omit<User, 'id' | '_id' | 'isAdmin' | 'imageUrl' | 'bio'> {}

export const registrationValidationSchema: ObjectSchema<RegistrationUser> = object({
  firstName: string()
    .required('firstName is required')
    .min(2, 'firstName is too short')
    .max(50, 'firstName is too long'),
  lastName: string()
    .required('lastName is required')
    .min(2, 'lastName is too short')
    .max(50, 'lastName is too long'),
  email: string().email('Invalid email address').required('email is required'),
  location: object({
    country: string().required(),
    state: string().required(),
    city: string().required(),
    place_id: string().required(),
    coords: object({
      lat: number().required(),
      lng: number().required(),
    }).required(),
  }).required(),
  password: string()
    .required('password is required')
    .min(8, 'password is too short')
    .max(50, 'password is too long'),
});
