import theme from '@/app/theme';
import { SecureUser } from '@/types/secureUser';
import { Avatar, Box, ButtonBase, Typography, styled } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import style from './style.module.css';
/**
 * This is the larger version of the user avatar, no dropdown menus
 */

interface UserAvatarProps {
  user: Partial<SecureUser>;
  onAvatarClicked?: () => void;
}

export default function UserAvatar({ user, onAvatarClicked }: UserAvatarProps) {
  const handleAvatarClicked = () => {
    onAvatarClicked && onAvatarClicked();
  };

  const [isErrorImage, setIsErrorImage] = useState<boolean>(false);

  return (
    <Box>
      <ButtonBase
        onClick={handleAvatarClicked}
        sx={{
          '&.MuiButtonBase-root': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          },
        }}
      >
        <Box
          borderRadius={'50%'}
          overflow={'hidden'}
          borderColor={theme.palette.primary.thirdColorIceLight}
          border={'2px solid'}
        >
          {loadAvatarImage(isErrorImage, setIsErrorImage, user)}
        </Box>
        <CustomResponsiveTypoGraphy
          style={{ padding: 0, color: theme.palette.primary.secondaryColorDarkBlack, marginTop: 2 }}
        >
          {user.firstName}
        </CustomResponsiveTypoGraphy>
      </ButtonBase>
    </Box>
  );
}

function loadAvatarImage(
  isErrorImage: boolean,
  setIsErrorImage: (isError: boolean) => void,
  user: Partial<SecureUser>,
) {
  if (user.imageUrl === undefined || user.imageUrl === null || user.imageUrl === '') {
    return <StyledAvatar />;
  }

  // If there is an error loading, return the MUI avatar icon
  if (isErrorImage) {
    return <StyledAvatar />;
  }

  if (isErrorImage) {
    return (
      <CustomResponsiveTypoGraphy sx={{ color: theme.palette.primary.secondaryColorDarkBlack }}>
        {user.firstName}
      </CustomResponsiveTypoGraphy>
    );
  }

  return (
    <Image
      src={user.imageUrl}
      fill
      objectFit='cover'
      alt={user.firstName || 'Participant'}
      onError={() => setIsErrorImage(true)}
      className={style.userAvatarImage}
    />
  );
}

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: '72px',
  height: '72px',
  [theme.breakpoints.up(600)]: {
    '&.MuiAvatar-root': {
      width: '96px',
      height: '96px',
    },
  },
  [theme.breakpoints.up(1000)]: {
    '&.MuiAvatar-root': {
      width: '150px',
      height: '150px',
    },
  },
  [theme.breakpoints.up(1400)]: {
    '&.MuiAvatar-root': {
      width: '180px',
      height: '180px',
    },
  },
}));

const CustomResponsiveTypoGraphy = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.secondaryColorDarkBlack,
  fontSize: '.875rem',
  [theme.breakpoints.up(600)]: {
    fontSize: '1rem',
  },
  [theme.breakpoints.up(1000)]: {
    fontSize: '1.2rem',
  },
  [theme.breakpoints.up(1400)]: {
    fontSize: '1.5rem',
  },
}));
