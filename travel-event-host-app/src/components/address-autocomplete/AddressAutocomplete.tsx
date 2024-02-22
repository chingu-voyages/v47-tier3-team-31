import {
  textInputFieldFontSizes,
  textInputFieldHeights,
  textInputPaddings,
} from '@/app/common-styles/form-field-sizes';
import { usePlacesWidget } from 'react-google-autocomplete';
import { CustomTextField } from '../custom-fields/CustomFields';

interface AddressAutocompleteProps {
  textFieldStyles?: any;
  onLocationSelected?: (place: google.maps.places.PlaceResult) => void;
}

export function AddressAutocomplete({
  textFieldStyles,
  onLocationSelected,
}: AddressAutocompleteProps) {
  const { ref: materialRef } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    inputAutocompleteValue: 'Search for a location',
    options: {
      types: ['geocode', 'establishment'],
    },
    onPlaceSelected: (place: google.maps.places.PlaceResult) => {
      onLocationSelected && onLocationSelected(place);
    },
  });

  return (
    <CustomTextField
      placeholder='Search for a location'
      required
      id='location'
      name='location'
      type='text'
      autoComplete='location'
      fullWidth
      inputRef={materialRef}
      sx={{
        '& .MuiInputBase-root': {},
        '&&& input': {
          height: textInputFieldHeights,
          padding: textInputPaddings,
        },
        fontSize: textInputFieldFontSizes,
        ...textFieldStyles,
      }}
    />
  );
}
