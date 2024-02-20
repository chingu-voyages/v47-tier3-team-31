import { bool, object, string } from 'yup';

export const profileUpdateValidationSchema = object({
  firstName: string()
    .required('First name is required')
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be at most 50 characters'),
  lastName: string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be at most 50 characters'),
  bio: string().max(255, 'Bio must be at most 255 characters'),
  imageUrl: string().url().nullable(),
  deleteImageUrl: bool().optional(),
});
