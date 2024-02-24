import { array, mixed, object, string } from 'yup';

export const geocoderResultValidationSchema = object({
  geocoderResult: object({
    address_components: array().min(1).required('address components are missing'),
    formatted_address: string().required('formatted address info is missing'),
    geometry: object({
      location: object({
        // lat and lng are functions that return a number. There may be a better way of doing this.
        lat: mixed().test('validLat', 'received invalid value for latitutde', (value) => {
          try {
            const n = (value as any)();
            return !isNaN(n);
          } catch (e) {
            return false;
          }
        }),
        lng: mixed().test('validLng', 'received invalid value for longitude', (value) => {
          try {
            const n = (value as any)();
            return !isNaN(n);
          } catch (e) {
            return false;
          }
        }),
      }).required('Location information must be filled out'),
    }),
    place_id: string().required('place id is missing'),
  }).required('Please type in and select a valid location'),
});
