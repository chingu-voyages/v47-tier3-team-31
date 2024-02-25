export interface LocationData {
  country: string;
  state: string;
  city: string;
  formattedAddress: string;
  coords: {
    lat: number;
    lng: number;
  };
  place_id: string;
}
