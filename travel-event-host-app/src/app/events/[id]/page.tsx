'use client';
import { getEventById } from '@/app/clients/event/event-client';
import { getUserById } from '@/app/clients/user/user-client';
import theme from '@/app/theme';
import { CommonButton } from '@/components/common-button/Common-Button';

import UserListContainer from '@/components/user-list-container/UserListContainer';
import { UserEvent } from '@/models/user-event';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
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

  const [userEvent, setUserEvent] = useState<UserEvent | undefined>(undefined); // This is the event context for this page

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

        setEventHostName(`${eventHostInfo?.firstName} ${eventHostInfo?.lastName}`);
        setIsLoading(false);
      } catch (e: any) {
        setFetchError(e.message);
      }
    };

    fetchEvent();
  }, []);

  return (
    <Box>
      <StyledContentContainer
        p={'10%'}
        className='upperContent'
        sx={{
          background:
            'linear-gradient(118.98deg, rgba(0, 62, 220, 0.3) -2.11%, rgba(39, 52, 105, 0.282) 63.58%)',
        }}
      >
        {/* If there is no imageUrl for the event the image section will not render */}
        {!hasImageError && getEventImage(isLoading, setHasImageError, userEvent?.imageUrl)}
        <Box className='eventTitle'>
          <Typography
            fontSize={['1.2rem', '1.2rem', '1.5rem', '2rem', '2.5rem']}
            fontWeight={'bold'}
            color={theme.palette.primary.navyBlue}
          >
            {userEvent?.title}
          </Typography>
        </Box>
        <Box className='hostedBy' mt={2} mb={2}>
          <Typography
            fontWeight={'medium'}
            fontSize={['1rem', '1rem', '1.3rem', '1.6rem', '1.8rem']}
            color={theme.palette.primary.charcoal}
          >
            Hosted by
          </Typography>
          <Typography
            fontSize={['1rem', '1rem', '1.3rem', '1.6rem', '1.8rem']}
            color={theme.palette.primary.charcoal}
          >
            {eventHostName || ''}
          </Typography>
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
              fontSize={['1.1rem', '1.1rem', '1.5rem', '1.6rem', '1.8rem']}
              fontWeight={'bold'}
              color={theme.palette.primary.navyBlue}
            >
              Event Details
            </Typography>
          </Box>
          {userEvent && (
            <Box className='eventDetailsContent' mb={3}>
              <Typography
                fontSize={['0.8rem', '0.8rem', '1rem', '1.2rem', '1.4rem']}
                color={theme.palette.primary.charcoal}
                sx={{ whiteSpace: 'pre-line' }}
              >
                {userEvent?.description}
              </Typography>
            </Box>
          )}
        </Box>
        <Box className='userActionsContainer' mb={3}>
          <Box
            sx={{
              display: 'block',
              [theme.breakpoints.up('md')]: {
                display: 'flex',
              },
            }}
          >
            <CommonButton
              label='Attend'
              textColor={theme.palette.primary.thirdColorIceLight}
              borderColor={theme.palette.primary.lightIndigo}
              backgroundColor={theme.palette.primary.lightIndigo}
              borderRadius={'10px'}
              baseButtonStyles={{
                width: '100%',
              }}
            />
            <CommonButton
              label='I am going!'
              textColor={theme.palette.primary.thirdColorIceLight}
              borderColor={theme.palette.primary.greenConfirmation}
              backgroundColor={theme.palette.primary.greenConfirmation}
              borderRadius={'10px'}
              baseButtonStyles={{
                width: '100%',
              }}
              startIcon={<TravelExploreIcon />}
            />
            <CommonButton
              label='Unregister from event'
              variant='text'
              textColor={theme.palette.primary.burntOrangeCancelError}
              baseButtonStyles={{
                width: '100%',
                textDecoration: 'underline',
              }}
              startIcon={<NotInterestedIcon />}
            />
          </Box>
        </Box>
      </StyledContentContainer>
      <StyledContentContainer
        p={'10%'}
        className='lowerContent'
        bgcolor={theme.palette.primary.backgroundColorLightPurple}
      >
        {/* Here is where the UserListContainer goes */}
        <UserListContainer
          title={'Attendees'}
          totalUserCount={userEvent?.participants.length || 0}
          previewUsers={[
            { firstName: 'hello', lastName: 'world' },
            { firstName: 'hello', lastName: 'world' },
            { firstName: 'hello', lastName: 'world' },
            { firstName: 'hello', lastName: 'world' },
          ]}
        />
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
