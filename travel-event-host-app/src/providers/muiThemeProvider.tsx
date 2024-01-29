'use client';
import { ThemeProvider } from '@mui/material';
import theme from '../app/theme';

type Props = {
  children?: React.ReactNode;
};

export const MuiThemeProvider = ({ children }: Props) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
