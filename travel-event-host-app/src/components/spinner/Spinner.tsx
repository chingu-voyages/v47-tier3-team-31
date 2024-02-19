import { CircularProgress, styled } from '@mui/material';

export const Spinner = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.primary.thirdColorIceLight,
}));
