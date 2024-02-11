'use client';
import theme from '@/app/theme';
import Language from '@/lib/language';
import { Box, FormControl, MenuItem, Select } from '@mui/material';
import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress';
import Link from 'next/link';
import { useState } from 'react';
import AuthDialog from '../auth-dialog/AuthDialog';
import HeaderBarAvatar from '../avatar/header-bar-avatar/HeaderBarAvatar';
import styles from './styles.module.css';
import { signOut } from 'next-auth/react';
import { useOnboardingContext } from '@/lib/context';

export default function Header() {
  const { session, status } = useOnboardingContext();
  const [lang, setLang] = useState<Language>(Language.En);
  const [navMenuIsOpen, setnavMenuIsOpen] = useState<boolean>(false);
  const [signupDialogOpen, setSignupDialogOpen] = useState<boolean>(false);
  const [loginDialogOpen, setloginDialogOpen] = useState<boolean>(false);
  console.log(session);
  return (
    <header className={styles.header}>
      <div>
        <div className={styles.logoBox}>
          <div
            onClick={() => setnavMenuIsOpen(true)}
            className={`${styles.mobile} ${styles.burgerMenu}`}
          >
            <svg
              width='3em'
              height='3em'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M4 18L20 18' stroke='white' strokeWidth='2' strokeLinecap='round' />
              <path d='M4 12L20 12' stroke='white' strokeWidth='2' strokeLinecap='round' />
              <path d='M4 6L20 6' stroke='white' strokeWidth='2' strokeLinecap='round' />
            </svg>
          </div>
          <h1>Backpack</h1>
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
                  paddingtop: 0,
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
                <HeaderBarAvatar onLogoutClicked={signOut} userName={session.user.firstName} />
              </div>
            </>
          ) : (
            <>
              <p className='mx-[1.5em] cursor-pointer' onClick={() => setloginDialogOpen(true)}>
                LOGIN
              </p>
              <button className='button1' onClick={() => setSignupDialogOpen(true)}>
                SIGN UP
              </button>
            </>
          )}
        </div>
      </div>
      <div className={`${styles.overlay} ${navMenuIsOpen ? styles.open : ''}`}></div>
      <nav className={`${navMenuIsOpen ? styles.open : ''}`}>
        <svg
          onClick={() => setnavMenuIsOpen(false)}
          className={`${styles.closeIcon} ${styles.mobile}`}
          width='2em'
          height='2em'
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z'
            fill='white'
          />
        </svg>
        <ul>
          <li className={styles.navList}>
            <ul>
              <li>
                <Link href='/'>Home</Link>
              </li>
              <li>
                <Link href='/'>Upcoming Events</Link>
              </li>
              <li>
                <Link href='/'>Search Events</Link>
              </li>
              <li>
                <Link href='/'>Create Event</Link>
              </li>
              <li>
                <Link href='/'>About Us</Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <AuthDialog
        authDialogType={'signup'}
        open={signupDialogOpen}
        onDialogClose={() => setSignupDialogOpen(false)}
        onRegisterSuccess={() => setloginDialogOpen(true)}
      />
      <AuthDialog
        authDialogType={'login'}
        open={loginDialogOpen}
        onDialogClose={() => setloginDialogOpen(false)}
      />
    </header>
  );
}
