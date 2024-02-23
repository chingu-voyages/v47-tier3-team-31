export const getAddressDataFromGeocoderResult = (geocoderResult: google.maps.GeocoderResult) => {
  const addressComponents = geocoderResult.address_components;
  const country = extractCountry(addressComponents);
  const state = extractState(addressComponents);
  const city = extractCity(addressComponents);
  const coords = extractCoords(geocoderResult.geometry);
  const formattedAddress = extractFormattedAddress(geocoderResult);

  return {
    country: country?.long_name,
    state: state?.long_name,
    city: city?.long_name,
    formattedAddress,
    coords,
    place_id: extractPlaceId(geocoderResult),
  };
};

function extractCountry(
  addressComponents: google.maps.GeocoderAddressComponent[],
): google.maps.GeocoderAddressComponent {
  return addressComponents.find((component) => component.types.includes('country'))!;
}

function extractState(
  addressComponents: google.maps.GeocoderAddressComponent[],
): google.maps.GeocoderAddressComponent {
  return addressComponents.find((component) =>
    component.types.includes('administrative_area_level_1'),
  )!;
}

function extractCity(
  addressComponents: google.maps.GeocoderAddressComponent[],
): google.maps.GeocoderAddressComponent {
  return addressComponents.find(
    (component) =>
      component.types.includes('locality') ||
      component.types.includes('sublocality_level_1') ||
      component.types.includes('sublocality'),
  )!;
}

function extractPlaceId(geocoderResult: google.maps.GeocoderResult): string {
  return geocoderResult.place_id;
}

function extractCoords(geometry: google.maps.GeocoderGeometry): { lat: number; lng: number } {
  return {
    lat: geometry.location.lat(),
    lng: geometry.location.lng(),
  };
}

function extractFormattedAddress(geeocoderResult: google.maps.GeocoderResult): string {
  return geeocoderResult.formatted_address;
}
