'use client';
import { Box, Card, CardContent, Typography, styled, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import Image from 'next/image';

import { UserEvent } from '@/models/user-event';
import styles from './event-card.module.css';

interface EventCardProps {
  hostedEvent: UserEvent;
  onCardClick?: (eventId: string) => void;
}

export function EventCard({ hostedEvent, onCardClick }: EventCardProps) {
  const handleCardClick = (eventId: string) => {
    onCardClick && onCardClick(eventId);
  };
  const theme = useTheme();
  return (
    <Box
      onClick={() => handleCardClick(hostedEvent._id)}
      sx={{
        '&:hover': {
          cursor: 'pointer',
        },
      }}
    >
      <Card
        sx={{
          maxWidth: '280px', // Change this value to change the width of the card
          margin: '1%',
          [theme.breakpoints.down(720)]: {
            maxWidth: '100%',
            boxShadow: 'none',
            borderRadius: '0px',
            marginRight: 0,
          },
          '&:hover': {
            boxShadow: '0px 0px 10px 10px rgba(0,0,0,0.2)',
          },
        }}
      >
        <Box
          className='responsiveCard'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            [theme.breakpoints.down(720)]: {
              flexDirection: 'row-reverse',
              justifyContent: 'space-between',
              padding: '5px',
            },
          }}
        >
          <Box>
            <Image
              src={getEventImage(hostedEvent.imageUrl)}
              fill
              alt='event image'
              className={styles.eventImage}
            />
          </Box>
          <CardContent
            sx={{
              padding: '16px',
              [theme.breakpoints.down(719)]: {
                '&.MuiCardContent-root:last-child': {
                  padding: 0,
                },
              },
            }}
          >
            <Box
              className='dateTitleContentContainer'
              sx={{
                display: 'flex',
                [theme.breakpoints.down(719)]: {
                  paddingTop: '10px',
                  paddingLeft: '10px',
                },
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <CalendarDateComponent date={hostedEvent.startDate} />
              </Box>
              <Box ml={3}>
                <CustomResponsiveTypoGraphy style={{ lineHeight: 1, fontWeight: 'bold' }}>
                  {hostedEvent.title || 'Mock event title'}
                </CustomResponsiveTypoGraphy>
                <CustomResponsiveTypoGraphy
                  mt={2}
                  sx={{
                    lineHeight: 1,
                    color: '#6A6A6A',
                    display: '-webkit-box',
                    WebkitLineClamp: 6,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    [theme.breakpoints.down(420)]: {
                      marginTop: '10px',
                      paddingBottom: '10px',
                    },
                    [theme.breakpoints.down(380)]: {
                      WebkitLineClamp: 3,
                    },
                  }}
                >
                  {hostedEvent.description}
                </CustomResponsiveTypoGraphy>
              </Box>
            </Box>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}

/* 
  This will render the event image. 
  If imageUrl is undefined, it will return one of the random mock images.
*/
function getEventImage(imageUrl?: string): string {
  if (imageUrl) return imageUrl;

  const mockImageCount = 3; // number of mock event images in the mock-images folder
  const randomImageNumber = Math.floor(Math.random() * mockImageCount) + 1; // random number between 1 and however many mock images there are
  return `/images/event/mock-images/mock-image-0${randomImageNumber}.svg`; // returns the path to the random mock event image
}

/**
 * Returns the month and date element as part of the event card
 * @param {Date} date
 * @return
 */
function CalendarDateComponent({ date }: { date: Date }) {
  const theme = useTheme();
  return (
    <Box>
      <Box>
        <Typography
          sx={{
            textTransform: 'uppercase',
            color: '#3D37F1',
            textAlign: 'left',
            fontWeight: 'bold',
            fontSize: '11.37px',
            lineHeight: 1,
            [theme.breakpoints.down(719)]: {
              fontWeight: 'lighter',
            },
          }}
        >
          {dayjs(date).format('MMM')}
        </Typography>
      </Box>
      <Box>
        <Typography
          sx={{
            color: 'black',
            fontWeight: 'bold',
            lineHeight: 1,
            fontSize: '28.43px',
            [theme.breakpoints.down(560)]: {
              '&.MuiTypography-root': {
                fontSize: '20px',
              },
            },
            [theme.breakpoints.between(561, 719)]: {
              '&.MuiTypography-root': {
                fontSize: '24px',
              },
            },
          }}
        >
          {dayjs(date).format('D')}
        </Typography>
      </Box>
      <Box>
        {/* Event's time section */}
        <Box className='eventStartTime' mt={1}>
          <Typography fontSize={'10px'} sx={{ textWrap: 'wrap' }}>
            {dayjs(date).format('h:mm A')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

// This will handle the responsive typography for the event card title and description
const CustomResponsiveTypoGraphy = styled(Typography)(({ theme }) => ({
  fontSize: '0.7rem',
  [theme.breakpoints.up(380)]: {
    fontSize: '0.9rem',
  },
}));
