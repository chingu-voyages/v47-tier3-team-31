import { object, string } from 'yup';

export const signInValidationSchema = object({
  email: string().required('Email is required').email('Email is invalid'),
  password1: string().required('Password is required'),
});
