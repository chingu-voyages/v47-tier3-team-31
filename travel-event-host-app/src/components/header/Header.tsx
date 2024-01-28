'use client';
import { useState } from 'react';
import styles from './styles.module.css';
import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import CircularProgress, { circularProgressClasses } from '@mui/material/CircularProgress';

export default function Header() {
  const [lang, setLang] = useState('EN');
  const [status, setStatus] = useState('loading');
  const [navMenuIsOpen, setnavMenuIsOpen] = useState(false);
  const userName = 'Angelo';
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
          <label htmlFor='lang' className={styles.langDropdown}>
            <div className={styles.selection}>
              {lang}
              <svg
                width='1.1em'
                height='0.8em'
                viewBox='0 0 18 10'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M0.479187 0.00915527L9.22919 9.36283L17.9792 0.00915527H0.479187Z'
                  fill='#FAFAFF'
                  stroke='#FAFAFF'
                  strokeWidth='0.008'
                />
              </svg>
            </div>
            <input className={styles.langInput} id='lang' type='checkbox' required />
            <div className={styles.langDropdownOptionBox}>
              <div className={styles.langDropdownOption}>EN</div>
              <div className={styles.langDropdownOption}>ES</div>
              <div className={styles.langDropdownOption}>FR</div>
              <div className={styles.langDropdownOption}>POR</div>
            </div>
          </label>
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
                <p>{userName}</p>
                <Avatar />
                <svg
                  width='1.1em'
                  height='0.8em'
                  viewBox='0 0 18 10'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M0.479187 0.00915527L9.22919 9.36283L17.9792 0.00915527H0.479187Z'
                    fill='#FAFAFF'
                    stroke='#FAFAFF'
                    strokeWidth='0.008'
                  />
                </svg>
              </div>
            </>
          ) : (
            <>
              <p className='mx-[1.5em] cursor-pointer'>LOGIN</p>
              <button className='button1'>SIGNUP</button>
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
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/'>Upcoming Events</Link>
          </li>
          <li>
            <Link href='/'>Categories</Link>
          </li>
          <li>
            <Link href='/'>Create Event</Link>
          </li>
          <li>
            <Link href='/'>About Us</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
