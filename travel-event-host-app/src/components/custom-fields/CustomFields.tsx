import {
  profileFormHeaderSizes,
  textInputFieldFontSizes,
  textInputFieldHeights,
  textInputPaddings,
} from '@/app/common-styles/form-field-sizes';
import theme from '@/app/theme';
import {
  Box,
  TextField,
  TextFieldProps,
  Typography,
  TypographyOwnProps,
  styled,
} from '@mui/material';

export const CustomTextField = (props: TextFieldProps) => {
  return (
    <StyledTextField
      {...props}
      sx={{
        '& .MuiInputBase-root': {
          fontSize: textInputFieldFontSizes,
        },
        '&&& input': {
          height: textInputFieldHeights,
          padding: textInputPaddings,
        },
      }}
    />
  );
};

export const FormFieldLabel = (props: TypographyOwnProps) => {
  return (
    <StyledFormFieldLabel
      {...props}
      color={theme.palette.primary.thirdColorIceLight}
      sx={{
        fontSize: profileFormHeaderSizes,
      }}
    />
  );
};

const StyledFormFieldLabel = styled(Typography)(({ theme }) => ({}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '&&& input': {
    color: theme.palette.primary.charcoal,
    backgroundColor: theme.palette.primary.thirdColorIceLight,
    borderColor: theme.palette.primary.charcoal,
    width: '100%',
  },

  '&&& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: theme.palette.primary.charcoal,
    },
  },

  '&&& .MuiFormLabel-root': {
    display: 'none',
  },
}));

export const StyledFormFieldSection = styled(Box)(({ theme }) => ({
  marginBottom: '1.5rem',
}));
