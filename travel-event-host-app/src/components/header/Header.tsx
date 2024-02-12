'use client';
import theme from '@/app/theme';
import { Language } from '@/lib/language';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  Typography,
  styled,
} from '@mui/material';
import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import HeaderBarAvatar from '../avatar/header-bar-avatar/HeaderBarAvatar';
import { CommonButton } from '../common-button/Common-Button';
import styles from './styles.module.css';

export default function Header() {
  const [lang, setLang] = useState<Language>(Language.En);
  const [status, setStatus] = useState('unauthenticated');
  const [navMenuIsOpen, setnavMenuIsOpen] = useState<boolean>(false);
  const userName = 'Angelo';

  return (
    <header className={styles.header}>
      <div>
        <div className={styles.logoBox}>
          <div
            onClick={() => setnavMenuIsOpen(true)}
            className={`${styles.mobile} ${styles.burgerMenu}`}
          >
            <MenuIcon />
          </div>
          <Typography variant='h4' color={theme.palette.primary.thirdColorIceLight}>
            Bakpak
          </Typography>
        </div>
        <div className={styles.authBox}>
          <Box>
            <FormControl
              variant='filled'
              sx={{
                m: 1,
                maxWidth: 90,
                '& .MuiInputBase-root': {
                  fontWeight: '400',
                  fontSize: '1.25rem',
                  color: theme.palette.primary.thirdColorIceLight,
                  backgroundColor: theme.palette.primary.secondaryColorDarkBlack,
                  '&:before': {
                    borderBottom: 'none',
                    transition: 'none',
                  },
                  '&:after': {
                    borderBottom: 'none',
                  },
                  '&:hover:before': {
                    borderBottom: 'none',
                  },
                },
                '& .MuiSvgIcon-root': {
                  color: theme.palette.primary.thirdColorIceLight,
                },
                [theme.breakpoints.down(700)]: {
                  '& .MuiInputBase-root': {
                    fontSize: '1rem',
                  },
                },
                [theme.breakpoints.down(610)]: {
                  '& .MuiInputBase-root': {
                    fontSize: '11px',
                  },
                },
              }}
            >
              <Select
                labelId='selectLanguageDropdown'
                id='selectLanguageDropdown'
                value={lang}
                onChange={(event) => setLang(event.target.value as Language)}
                sx={{
                  '& .MuiInputBase-input': {
                    paddingBottom: '25px',
                  },
                }}
                inputProps={{
                  paddingTop: 0,
                  MenuProps: {
                    sx: {
                      '& .MuiPaper-root': {
                        borderRadius: '0',
                      },
                    },
                    MenuListProps: {
                      sx: {
                        backgroundColor: theme.palette.primary.secondaryColorDarkBlack,
                        color: theme.palette.primary.thirdColorIceLight,
                        borderTop: 'none',
                        '& .MuiButtonBase-root:hover': {
                          backgroundColor: theme.palette.primary.primaryColorDarkBlue,
                        },
                      },
                    },
                  },
                }}
              >
                {/* This will render languages as needed */}
                {Object.entries(Language).map(([key, value]) => (
                  <MenuItem key={key} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {status === 'loading' ? (
            <div className={styles.spinnerBox}>
              <CircularProgress
                variant='indeterminate'
                disableShrink
                sx={{
                  color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
                  animationDuration: '550ms',
                  position: 'absolute',
                  left: 0,
                  [`& .${circularProgressClasses.circle}`]: {
                    strokeLinecap: 'round',
                  },
                }}
                className='static'
                size={40}
                thickness={4}
              />
            </div>
          ) : status === 'authenticated' ? (
            <>
              <div className={styles.avatarBox}>
                <HeaderBarAvatar userName={userName} />
              </div>
            </>
          ) : (
            <Box
              sx={{
                [theme.breakpoints.down(410)]: {
                  display: 'none',
                },
              }}
            >
              <AuthBox />
            </Box>
          )}
        </div>
      </div>
      <Box
        display='none'
        sx={{
          [theme.breakpoints.down(410)]: {
            display: 'block',
          },
        }}
      >
        <AuthBox />
      </Box>
      <div className={`${styles.overlay} ${navMenuIsOpen ? styles.open : ''}`}></div>
      <nav className={`${navMenuIsOpen ? styles.open : ''}`}>
        <Box
          display='flex'
          justifyContent={'flex-end'}
          sx={{
            [theme.breakpoints.up(610)]: {
              display: 'none',
            },
          }}
        >
          <IconButton
            onClick={() => setnavMenuIsOpen(false)}
            sx={{ color: theme.palette.primary.thirdColorIceLight }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          display='flex'
          justifyContent={'space-evenly'}
          sx={{
            [theme.breakpoints.down(610)]: {
              flexDirection: 'column',
              gap: '1em',
              alignItems: 'center',
            },
          }}
        >
          <Box>
            <NavButton variant='text' color='inherit'>
              <Link href='/'>Home</Link>
            </NavButton>
          </Box>
          <Box>
            <NavButton variant='text' color='inherit'>
              <Link href='/'>Upcoming Events</Link>
            </NavButton>
          </Box>
          <Box>
            <NavButton variant='text' color='inherit'>
              <Link href='/events/search'>Search Events</Link>
            </NavButton>
          </Box>
          <Box>
            <NavButton variant='text' color='inherit'>
              <Link href='/'>Create Event</Link>
            </NavButton>
          </Box>
          <Box>
            <NavButton variant='text' color='inherit'>
              <Link href='/'>About Us</Link>
            </NavButton>
          </Box>
        </Box>
      </nav>
    </header>
  );
}

const NavButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  [theme.breakpoints.up(610)]: {
    fontSize: '1rem',
  },
}));

const AuthBox = () => {
  const router = useRouter();
  return (
    <Box
      display='flex'
      alignContent={'center'}
      sx={{
        [theme.breakpoints.down(410)]: {
          justifyContent: 'space-around',
        },
      }}
    >
      <Button
        sx={{
          color: theme.palette.primary.thirdColorIceLight,
          marginRight: '10px',

          [theme.breakpoints.up(610)]: {
            marginRight: '1.5rem',
          },
        }}
      >
        <Typography
          sx={{
            [theme.breakpoints.down(610)]: {
              fontSize: '0.8rem',
            },
          }}
        >
          LOG IN
        </Typography>
      </Button>

      <CommonButton
        onButtonClick={() => router.push('/auth/signup')}
        label='SIGN UP'
        textColor={theme.palette.primary.thirdColorIceLight}
        backgroundColor={theme.palette.primary.primaryColorDarkBlue}
        borderColor={theme.palette.primary.primaryColorDarkBlue}
        borderRadius={'5px'}
        fontWeight='400'
        additionalStyles={{
          minWidth: '150px',
          minHeight: '40px',
          paddingLeft: '1.5em',
          paddingRight: '1.5em',
          [theme.breakpoints.down(610)]: {
            minWidth: '100px',
            minHeight: '30px',
            paddingLeft: '1em',
            paddingRight: '1em',
          },
        }}
      />
    </Box>
  );
};
