import theme from '@/app/theme';
import { Avatar, Box, ButtonBase, Menu, MenuItem, Typography, styled } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import styles from './style.module.css';

/**
 * This header bar has the user's avatar and name, plus a dropdown menu with options like logout.
 */
interface HeaderBarAvatarProps {
  userName: string;
  imageUrl?: string;
  onLogoutClicked?: () => void;
}

export default function HeaderBarAvatar({
  userName,
  imageUrl,
  onLogoutClicked,
}: HeaderBarAvatarProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isErrorImage, setIsErrorImage] = useState<boolean>(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    onLogoutClicked && onLogoutClicked();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Box>
        <ButtonBase
          onClick={handleClick}
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
            sx={{
              [theme.breakpoints.down(700)]: {
                width: '36px',
              },
            }}
          >
            {loadAvatarImage(isErrorImage, userName, setIsErrorImage, imageUrl)}
          </Box>
          <Box
            // Hide the user name on mobile
            sx={{
              [theme.breakpoints.down(431)]: {
                display: 'none',
              },
            }}
          >
            <Typography style={{ padding: 0 }}>{userName}</Typography>
          </Box>
        </ButtonBase>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{
          '& .MuiMenu-list': {
            background: theme.palette.primary.thirdColorlightBlack,
            padding: 0,
          },
          '& .MuiPaper-root': {
            marginTop: '10px',
          },
        }}
      >
        {/* Add more menu options here as needed */}
        <MenuItem
          onClick={handleClose}
          sx={{
            '&.MuiList-root': {
              background: theme.palette.primary.thirdColorlightBlack,
            },
            '&.MuiButtonBase-root': {
              fontSize: '1.25rem',
              background: theme.palette.primary.thirdColorlightBlack,
              color: theme.palette.primary.thirdColorIceLight,
            },
            '&.MuiButtonBase-root:hover': {
              background: theme.palette.primary.secondaryColorDarkBlack,
            },
            [theme.breakpoints.down(700)]: {
              '&.MuiButtonBase-root': {
                fontSize: '1rem',
              },
            },
            [theme.breakpoints.down(610)]: {
              '&.MuiButtonBase-root': {
                fontSize: '11px',
              },
            },
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
}

function loadAvatarImage(
  hasError: boolean,
  userName: string,
  setIsErrorImage: (value: boolean) => void,
  imageUrl?: string,
) {
  // If there is no image url, return the MUI avatar icon
  if (imageUrl === undefined || imageUrl === null) {
    return <StyledAvatar />;
  }

  // If there is an error loading, return the MUI  avatar icon
  if (hasError) {
    return <StyledAvatar />;
  }

  return (
    <Image
      src={imageUrl}
      alt={userName}
      fill
      objectFit='cover'
      className={styles.headerBarAvatar}
      onError={() => setIsErrorImage(true)} // If there is an error loading the image return the MUI avatar icon
    />
  );
}

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: '47px',
  height: '47px',
  [theme.breakpoints.down(700)]: {
    '&.MuiAvatar-root': {
      width: '32px',
      height: '32px',
    },
  },
}));
