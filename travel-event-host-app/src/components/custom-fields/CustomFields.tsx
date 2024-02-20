import { Box, TextField, styled } from '@mui/material';

export const CustomTextField = styled(TextField)(({ theme }) => ({
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
