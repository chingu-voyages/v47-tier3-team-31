'use client';

import { Box, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { CommonButton } from '../common-button/Common-Button';
import styles from './create-event.module.css';

export function CreateEventSection() {
  const theme = useTheme();
  return (
    <Box
      id='createEventSectionComponent'
      bgcolor={theme.palette.primary.thirdColorIceLight}
      width={'100%'}
      display='flex'
      sx={{
        [theme.breakpoints.down(540)]: {
          flexDirection: 'column',
        },
      }}
    >
      <Box
        maxHeight={'252px'}
        mt={'-17px'}
        sx={{
          [theme.breakpoints.down(540)]: {
            justifyContent: 'center',
          },
        }}
        display={'flex'}
      >
        <Image
          src={'/images/event/create-event/create-event.svg'}
          fill
          alt='create event'
          className={styles.createEventImage}
        />
      </Box>
      <Box
        className='createEventCtaContainer'
        p={1}
        sx={{
          [theme.breakpoints.down(540)]: {
            textAlign: 'center',
            marginTop: '20px',
          },
        }}
      >
        <Box>
          <Typography
            variant='h3'
            sx={{
              fontWeight: 'bold',
              [theme.breakpoints.down(1045)]: { fontSize: '2rem' },
              [theme.breakpoints.down(880)]: { fontSize: '1.6rem' },
              [theme.breakpoints.down(680)]: { fontSize: '1.2rem' },
            }}
            color={theme.palette.primary.primaryColorDarkBlue}
          >
            Make your own event
          </Typography>
        </Box>
        <Box mt={3}>
          <Typography
            color={theme.palette.primary.charcoal}
            sx={{
              [theme.breakpoints.down(680)]: {
                fontSize: '0.8rem',
              },
            }}
          >
            It's quick and easy to create your own event.
          </Typography>
        </Box>
        <Box
          mt={2}
          sx={{
            [theme.breakpoints.down(720)]: { marginTop: '0px' },
          }}
        >
          <CommonButton
            label='Create Event'
            textColor={theme.palette.primary.thirdColorIceLight}
            backgroundColor={theme.palette.primary.primaryColorDarkBlue}
            borderColor={theme.palette.primary.thirdColorIceLight}
            additionalStyles={{
              margin: '20px 0',
              padding: '15px 30px',
              minWidth: '302px',
              fontSize: '1rem',
              [theme.breakpoints.down(880)]: { minWidth: 0, padding: '5px 20px' },
              [theme.breakpoints.down(720)]: {
                '&.MuiButtonBase-root': {
                  fontWeight: '400',
                },
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
