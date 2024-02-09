'use client';
import { getEventById } from '@/app/clients/event/event-client';
import { getUserById } from '@/app/clients/user/user-client';
import theme from '@/app/theme';
import Event from '@/models/event';
import { Box, CircularProgress, Typography, styled } from '@mui/material';
import dayjs from 'dayjs';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from './styles.module.css';

interface EventDetailsPageProps {
  params: {
    id: string;
  };
}

export default function EventDetailsPage({ params: { id } }: EventDetailsPageProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [userEvent, setUserEvent] = useState<Event | undefined>(undefined); // This is the event context for this page

  // This is the event host user context.
  const [eventHostName, setEventHostName] = useState<string | undefined>(undefined);
  const [hasImageError, setHasImageError] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setIsLoading(true);
        const fetchedEventData = await getEventById(id);
        setUserEvent(fetchedEventData);
        const eventHostInfo = await getUserById(fetchedEventData?.eventCreatorId!, [
          'firstName',
          'lastName',
        ]);
        console.log('37', eventHostInfo);
        setEventHostName(`${eventHostInfo?.firstName} ${eventHostInfo?.lastName}`);
        setIsLoading(false);
      } catch (e: any) {
        setFetchError(e.message);
      }
    };

    fetchEvent();
  }, []);

  return (
    <Box p={'5%'}>
      <StyledContentContainer
        className='uper'
        bgcolor={
          'linear-gradient(118.98deg, rgba(0, 62, 220, 0.3) -2.11%, rgba(39, 52, 105, 0.282) 63.58%)'
        }
      >
        {/* If there is no imageUrl for the event the image section will not render */}
        {!hasImageError && getEventImage(isLoading, setHasImageError, userEvent?.imageUrl)}
        <Box className='eventTitle'>
          <Typography
            fontSize={'1.2rem'}
            fontWeight={'bold'}
            color={theme.palette.primary.navyBlue}
          >
            {userEvent?.title}
          </Typography>
        </Box>
        <Box className='hostedBy' mt={2} mb={2}>
          <Typography
            fontWeight={'medium'}
            fontSize={'1rem'}
            color={theme.palette.primary.charcoal}
          >
            Hosted by
          </Typography>
          <Typography color={theme.palette.primary.charcoal}>{eventHostName || ''}</Typography>
        </Box>
        <Box
          className='dateTimeBlock'
          display={'flex'}
          sx={{
            '&.dateTimeBlock': {
              background: '#1D275F',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            },
            [theme.breakpoints.down('md')]: {
              flexDirection: 'column',
            },
          }}
        >
          <Box sx={{ borderRight: `1px solid white` }}>
            <Typography
              p={2}
              className='someClass'
              fontWeight={'semibold'}
              sx={{
                [theme.breakpoints.down('md')]: {
                  textAlign: 'center',
                },
              }}
            >
              Date and Hour
            </Typography>
          </Box>
          <Box>
            {userEvent ? (
              <Typography p={2} className='someClass' fontWeight={'semibold'}>
                {`${formatDate(userEvent.startDate)} to ${formatDate(userEvent.endDate)} - ${userEvent.location.city}, ${userEvent.location.state?.toUpperCase()} ${userEvent.location.country}`}
              </Typography>
            ) : (
              <Spinner />
            )}
          </Box>
        </Box>
        <Box className='eventDetailsContainer' mt={2}>
          <Box className='eventDetailsHeader'>
            <Typography
              fontSize={'1.1rem'}
              fontWeight={'bold'}
              color={theme.palette.primary.navyBlue}
            >
              Event Details
            </Typography>
          </Box>
          {userEvent && (
            <Box className='eventDetailsContent'>
              <Typography
                fontSize={'1rem'}
                color={theme.palette.primary.charcoal}
                sx={{ whiteSpace: 'pre-line' }}
              >
                {userEvent?.description}
              </Typography>
            </Box>
          )}
        </Box>
      </StyledContentContainer>
    </Box>
  );
}

// Separated out loading the image just to make the code more readable
const getEventImage = (
  isLoading: boolean,
  setHasImageError: Dispatch<SetStateAction<boolean>>,
  imageUrl?: string,
) => {
  if (!imageUrl || imageUrl.trim() === '') return null;
  if (isLoading) return <Spinner />;
  return (
    <Box>
      <Image
        src={imageUrl || ''}
        alt='user-event-image'
        fill
        className={styles.userEventImage}
        onError={() => setHasImageError(true)}
      />
    </Box>
  );
};
const StyledContentContainer = styled(Box)(({ theme }) => ({}));

function formatDate(date: Date): string {
  if (!date) return '';
  return dayjs(date).format('D MMM, YYYY HH:mm A');
}

function Spinner() {
  return (
    <Box display='flex' justifyContent={'center'} pt={2} pb={2}>
      <CircularProgress sx={{ color: theme.palette.primary.thirdColorIceLight }} />
    </Box>
  );
}
