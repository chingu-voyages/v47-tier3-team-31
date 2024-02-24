import {
  textInputFieldFontSizes,
  textInputFieldHeights,
  textInputPaddings,
} from '@/app/common-styles/form-field-sizes';
import { useState } from 'react';
import { usePlacesWidget } from 'react-google-autocomplete';
import { CustomTextField } from '../custom-fields/CustomFields';

interface AddressAutocompleteProps {
  textFieldStyles?: any;
  onLocationSelected?: (place: google.maps.places.PlaceResult) => void;
  componentName: string;
}

export function AddressAutocomplete({
  textFieldStyles,
  onLocationSelected,
  componentName,
}: AddressAutocompleteProps) {
  const { ref: materialRef } = usePlacesWidget({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    inputAutocompleteValue: 'Start typing your location',
    options: {
      types: ['geocode', 'establishment'],
    },
    onPlaceSelected: (place: google.maps.places.PlaceResult) => {
      setTextFieldValue(place?.formatted_address!);
      onLocationSelected && onLocationSelected(place);
    },
  });

  const [textFieldValue, setTextFieldValue] = useState<string>('');

  return (
    <CustomTextField
      placeholder='Start typing your location'
      required
      id={componentName}
      name={componentName}
      type='text'
      autoComplete='location'
      fullWidth
      inputRef={materialRef}
      value={textFieldValue}
      onChange={(e) => {
        setTextFieldValue(e.target.value);
      }}
      onKeyDown={(e) => {
        // This logic is to clear the location field when the user presses these keys
        // It will also set the geolocation to null
        if (e.key === 'Backspace' || e.key === 'Delete' || e.key === 'Escape') {
          e.preventDefault();
          setTextFieldValue('');
          onLocationSelected && onLocationSelected(null as any);
        }
      }}
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
