import { object, ref, string } from 'yup';

export const signUpValidationSchema = object({
  email: string().required('Email is required').email('Email is invalid'),
  password1: string()
    .required('This field is required')
    .min(8, 'Password must be at least 8 characters, contain letters and numbers and a symbol')
    .test((value) => {
      return /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{8,30})/.test(value);
    }),
  password2: string()
    .required('This field is required')
    .oneOf([ref('password1')], 'Passwords must match'),
  firstName: string()
    .required('This field is required')
    .test((value) => {
      return /[\p{Letter}\s]+/gu.test(value);
    })
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be at most 50 characters'),
  lastName: string()
    .required('This field is required')
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be at most 50 characters')
    .test((value) => {
      return /[\p{Letter}\s]+/gu.test(value);
    }),
});
