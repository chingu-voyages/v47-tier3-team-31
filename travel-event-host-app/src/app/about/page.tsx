'use client';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { textInputFieldFontSizes } from '../common-styles/form-field-sizes';
import theme from '../theme';
import styles from './styles.module.css';

export default function AboutUsPage() {
  return (
    <Box className={styles.mainContentBody}>
      <Box
        bgcolor={theme.palette.primary.lightIndigo}
        id='left'
        className={`${styles.leftSection}`}
      >
        <Box className='aboutUsHeaderContainer'>
          <Typography
            sx={{
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: ['30px'],
              textAlign: 'center',
            }}
          >
            About us
          </Typography>
        </Box>
        <Box display='flex' justifyContent={'space-evenly'} gap={1} flexWrap={'wrap'}>
          {/* The four picture frames go here */}
          <Box>
            <Image
              src='/images/about/img01.svg'
              alt='placeholder'
              fill
              className={styles.aboutUsImage}
            />
          </Box>
          <Box className={styles.aboutUsImageContainer}>
            <Image
              src='/images/about/img02.svg'
              alt='placeholder'
              fill
              className={styles.aboutUsImage}
            />
          </Box>
          <Box className={styles.aboutUsImageContainer}>
            <Image
              src='/images/about/img03.svg'
              alt='placeholder'
              fill
              className={`${styles.aboutUsImage} ${styles.img03}`}
            />
          </Box>
          <Box className={`${styles.aboutUsImageContainer} ${styles.img04}`}>
            <Image
              src='/images/about/img04.svg'
              alt='placeholder'
              fill
              className={styles.aboutUsImage}
            />
          </Box>
        </Box>
      </Box>
      <Box className={`mainTextContentContainer ${styles.textContainer}`}>
        <Box>
          <Typography fontSize={textInputFieldFontSizes}>
            BakPak brings you unparalleled opportunities to engage with events globally. Whether you
            wish to host your own event or join exciting gatherings around the world, BakPak
            provides the platform for seamless participation. Discover local meetups in your city or
            explore events to uncover the finest activities in a new destination you're visiting.
          </Typography>
        </Box>
        <br></br>
        <Box>
          <Typography fontSize={textInputFieldFontSizes}>
            See our repository for more details.
          </Typography>
        </Box>
        <br></br>
        <Box>
          <Typography fontSize={textInputFieldFontSizes}>
            See our <Link href={'/team'}>Team Page.</Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
