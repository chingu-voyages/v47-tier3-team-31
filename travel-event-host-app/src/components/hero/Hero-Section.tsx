import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import styles from './hero-section.module.css';

const heroHeaderResponsiveText = ['1rem', '1.2rem', '1.2rem', '1.4rem', '2.9rem'];
const heroResponsiveText = ['0.8rem', '1rem', '1.1rem', '1.5rem', '1.8rem'];
export const HeroSection = () => {
  return (
    <div>
      <div className={styles.crowdImageContainer}>
        <Image src='/images/hero/crowd.svg' alt='crowd' className={styles.crowdImage} fill />
        <div className={styles.overlayArea}>
          <Box
            display='flex'
            flexDirection={'column'}
            justifyContent='center'
            alignItems='center'
            className={styles.heroContentContainer}
            pt={['5%', '15%', '15%', '5%']}
          >
            <div className='headerContainer'>
              <Typography fontWeight={'bold'} fontSize={heroHeaderResponsiveText}>
                Explore, Host, and Connect
              </Typography>
            </div>
            <div className={`${styles.bodyContentContainer} flex`}>
              <div className={styles.passportImageContainer}>
                {/* Image of passport goes here */}
                <Image
                  src='/images/hero/passport.svg'
                  alt='passport'
                  className={styles.passportImage}
                  fill
                />
              </div>
              <div className='bodyTextContainer ml-5 mr-3 sm:mt-2'>
                <Typography fontSize={heroResponsiveText}>
                  Transform your travel experience with our Travel Event Host App.
                </Typography>
                <br></br>
                <Typography fontSize={heroResponsiveText}>
                  Whether you're a local looking to showcase your city or a traveller seeking unique
                  experiences, we've got you covered.
                </Typography>
              </div>
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
};
