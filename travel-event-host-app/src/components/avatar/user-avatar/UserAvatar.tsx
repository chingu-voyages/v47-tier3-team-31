'use client';
import theme from '@/app/theme';
import { SecureUser } from '@/types/secureUser';
import { Box, ButtonBase, Typography, styled } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';

/**
 * Avatar is used on the event page and the user profile page.
 * The styling might be different for each, so pass in customMUI and customCss in props
 */
interface UserAvatarProps {
  showName?: boolean;
  user?: Partial<SecureUser>;
  onAvatarClicked?: () => void;
  MuiAvatarComponent: JSX.Element;
  imageClassName?: any;
  nameStyles?: any;
}

export default function UserAvatar({
  user,
  onAvatarClicked,
  showName,
  MuiAvatarComponent,
  imageClassName,
  nameStyles,
}: UserAvatarProps) {
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
          {loadAvatarImage(isErrorImage, setIsErrorImage, MuiAvatarComponent, imageClassName, user)}
        </Box>
        {showName && (
          <CustomResponsiveTypoGraphy
            style={{
              padding: 0,
              color: theme.palette.primary.secondaryColorDarkBlack,
              marginTop: 2,
              ...nameStyles,
            }}
          >
            {user?.firstName || 'unknown user'}
          </CustomResponsiveTypoGraphy>
        )}
      </ButtonBase>
    </Box>
  );
}

function loadAvatarImage(
  isErrorImage: boolean,
  setIsErrorImage: (isError: boolean) => void,
  MuiAvatarComponent: any,
  imageClassName?: any,
  user?: Partial<SecureUser>,
) {
  if (user?.imageUrl === undefined || user.imageUrl === null || user.imageUrl === '') {
    return MuiAvatarComponent;
  }

  // If there is an error loading, return the MUI avatar icon
  if (isErrorImage) {
    return MuiAvatarComponent;
  }

  return (
    <Image
      src={user.imageUrl}
      fill
      objectFit='cover'
      alt={user.firstName || 'Participant'}
      onError={() => setIsErrorImage(true)}
      className={imageClassName}
    />
  );
}

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
