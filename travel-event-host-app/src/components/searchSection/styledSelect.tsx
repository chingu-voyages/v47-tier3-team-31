import Select from '@mui/material/Select';
import { styled } from '@mui/system';
const StyledSelect = styled(Select)(({ theme }) => ({
  '&': { outline: 'none' },
  '&:hover': {
    outline: `1px solid ${theme.palette.primary.primaryColorDarkBlue}`,
  },
  '&:focus': {
    outline: `1px solid ${theme.palette.primary.primaryColorDarkBlue}`,
  },
  '&.Mui-focused': {
    outline: `1px solid red`,
  },
}));
export default StyledSelect;
