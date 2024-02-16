import styled from '@emotion/styled';
import { Avatar, Theme } from '@mui/material';

export const CustomGenericMuiAvatar = styled(Avatar)(({ theme }: { theme: Theme }) => ({
  width: '80px',
  height: '80px',
  [theme.breakpoints.up(600)]: {
    width: '100px',
    height: '100px',
  },
  [theme.breakpoints.up(960)]: {
    width: '140px',
    height: '140px',
  },
  [theme.breakpoints.up(1440)]: {
    width: '240px',
    height: '240px',
  },
}));
