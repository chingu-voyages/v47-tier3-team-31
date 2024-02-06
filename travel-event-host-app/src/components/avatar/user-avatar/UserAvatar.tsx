import theme from '@/app/theme';
import { SecureUser } from '@/types/secureUser';
import { Avatar, Box, ButtonBase, Typography, styled } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';

/**
 * Avatar is used on the event page and the user profile page.
 * The styling might be different for each, so pass in customMUI and customCss in props
 */
interface UserAvatarProps {
  showName?: boolean;
  user: Partial<SecureUser>;
  onAvatarClicked?: () => void;
  customMuiStyles?: any;
  imageClassName?: any;
}

export default function UserAvatar({
  user,
  onAvatarClicked,
  showName,
  customMuiStyles,
  imageClassName,
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
          {loadAvatarImage(isErrorImage, setIsErrorImage, user, customMuiStyles, imageClassName)}
        </Box>
        {showName && (
          <CustomResponsiveTypoGraphy
            style={{
              padding: 0,
              color: theme.palette.primary.secondaryColorDarkBlack,
              marginTop: 2,
            }}
          >
            {user.firstName}
          </CustomResponsiveTypoGraphy>
        )}
      </ButtonBase>
    </Box>
  );
}

function loadAvatarImage(
  isErrorImage: boolean,
  setIsErrorImage: (isError: boolean) => void,
  user: Partial<SecureUser>,
  muiStyles?: Record<string, string>,
  imageClassName?: any,
) {
  if (user.imageUrl === undefined || user.imageUrl === null || user.imageUrl === '') {
    return <Avatar sx={{ ...muiStyles }} />;
  }

  // If there is an error loading, return the MUI avatar icon
  if (isErrorImage) {
    return <Avatar sx={{ ...muiStyles }} />;
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
