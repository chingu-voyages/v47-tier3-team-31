import { number, object, string } from 'yup';

// This is used for signup and for update, coming into the API request body
export const locationUpdateValidationSchema = object({
  country: string().required(),
  state: string().required(),
  city: string().required(),
  place_id: string().required(),
  formattedAddress: string().required(),
  coords: object({
    lat: number().required(),
    lng: number().required(),
  }).required(),
}).required();
