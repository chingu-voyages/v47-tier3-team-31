import { Category } from '@/lib/category';
import { UserEvent } from '@/models/user-event';
import dayjs from 'dayjs';

import { ObjectSchema, array, date, mixed, number, object, string } from 'yup';

interface UserEventCreation
  extends Omit<
    UserEvent,
    'id' | '_id' | 'participants' | 'eventCreatorId' | 'location' | 'categories'
  > {}
export const eventCreateValidationSchema: ObjectSchema<UserEventCreation> = object({
  title: string()
    .required('title is required')
    .min(2, 'title is too short')
    .max(50, 'title is too long'),
  description: string()
    .required('description is required')
    .min(2, 'description is too short')
    .max(500, 'description is too long'),
  startDate: date()
    .required('startDate is required')
    .test('validStartDate', 'Start date should be in the future.', (value) => {
      const incommingDate = dayjs(value);
      return incommingDate.isAfter(dayjs().startOf('day'));
    }),
  endDate: date()
    .required('endDate is required')
    .test(
      'validEndDate',
      'End date must be valid and occur after the start date',
      (value, context) => {
        const incommingDate = dayjs(value);
        const startDate = dayjs(context.parent.startDate);
        return incommingDate.isSame(startDate) || incommingDate.isAfter(startDate);
      },
    ),
  imageUrl: string().optional().url('imageUrl must be a valid URL').nullable() as any,
});

// Categories are optional or among the set list of categories
export const eventCreationCategoriesSchema = object({
  categories: array()
    .optional()
    .of(mixed().oneOf(Object.values(Category))),
});

export const eventLocationRouteValidationSchema = object({
  location: object({
    country: string().required('country is required'),
    state: string().required('state is required'),
    city: string().required('city is required'),
    formattedAddress: string().required('formattedAddress is required'),
    place_id: string().required('place_id is required'),
    coords: object({
      lat: number().required('lat is required').typeError('lat must be a number'),
      lng: number().required('lng is required').typeError('lng must be a number'),
    }),
  }),
});
