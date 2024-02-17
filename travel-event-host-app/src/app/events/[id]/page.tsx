'use client';
import { EventClient } from '@/app/clients/event/event-client';

import theme from '@/app/theme';
import { CommonButton } from '@/components/common-button/Common-Button';

import { UserClient } from '@/app/clients/user/user-client';
import { ConfirmationDialog } from '@/components/confirmation-dialog/ConfirmationDialog';
import UserListContainer from '@/components/user-list-container/UserListContainer';
import { AuthStatus } from '@/lib/auth-status';
import { useAuthContext } from '@/lib/context';
import { UserEvent } from '@/models/user-event';
import CheckIcon from '@mui/icons-material/Check';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import { Alert, Box, CircularProgress, Typography, styled } from '@mui/material';
import dayjs from 'dayjs';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styles from './styles.module.css';
interface EventDetailsPageProps {
  params: {
    id: string;
  };
}

/* 
  - Event details page:
  - Authenticated users: we need to find out if the user is attending the event and render the appropriate button
  - Unauthenticated users: show the Attend button, but its link should redirect to the sign-in page
*/
export default function EventDetailsPage({ params: { id } }: EventDetailsPageProps) {
  const { session, status } = useAuthContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [userEvent, setUserEvent] = useState<UserEvent | undefined>(undefined); // This is the event context for this page

  // This is the event host user context.
  const [eventHostName, setEventHostName] = useState<string | undefined>(undefined);
  const [hasImageError, setHasImageError] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | undefined>(undefined);
  const [confirmUnregisterDialogOpen, setConfirmUnregisterDialogOpen] = useState<boolean>(false);
  const [eventParticipants, setEventParticipants] = useState<
    { _id: string; firstName: string; lastName: string }[]
  >([]);
  const router = useRouter();
  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      setIsLoading(true);
      const fetchedEventData = await EventClient.getEventById(id);
      setUserEvent(fetchedEventData);
      const eventHostInfo = await UserClient.getUserById(fetchedEventData?.eventCreatorId!, [
        'firstName',
        'lastName',
      ]);

      setEventHostName(`${eventHostInfo?.firstName} ${eventHostInfo?.lastName}`);

      const resEventParticipants = await EventClient.getEventParticipants(id);
      setEventParticipants(resEventParticipants.users);
      setIsLoading(false);
    } catch (e: any) {
      console.log(e.message);
    }
  };

  const handleAttendButtonClicked = async () => {
    setIsLoading(true);
    if (status === AuthStatus.Authenticated) {
      setApiError(undefined);
      try {
        await EventClient.registerUserForEvent(id, session?.user?._id!);
        // If ok, refetch the event to get the updated participants list

        setIsLoading(false);
        await fetchEvent();
      } catch (error: any) {
        setApiError(
          error.message ||
            'Sorry, we encountered an error and were unable to register you for this event.',
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      // Redirect user to sign in as they are not authenticated
      signIn();
    }
  };

  const handleUnregisterButtonClicked = () => {
    // This action will cause a confirmation dialog to appear
    setConfirmUnregisterDialogOpen(true);
  };

  const completeUnregistrationAction = async () => {
    // User has confirmed unregistration and we can proceed
    setIsLoading(true);
    try {
      await EventClient.unregisterUserForEvent(id, session?.user?._id!);
      await fetchEvent();
    } catch (error: any) {
      setApiError(
        error.message ||
          'Sorry, we encountered an error and were unable to unregister you from this event.',
      );
    }
  };

  const isSessionUserAttendingEvent = (): boolean => {
    return !!userEvent?.participants.find((p) => p.userId === session?.user?._id);
  };

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
              fontSize={['0.8rem', '1rem', '1.2rem', '1.4rem', '1.6rem']}
            >
              Date and Hour
            </Typography>
          </Box>
          <Box>
            {userEvent ? (
              <Typography
                p={2}
                className='someClass'
                fontWeight={'semibold'}
                fontSize={['0.8rem', '1rem', '1.2rem', '1.4rem', '1.6rem']}
              >
                {`${formatDate(userEvent.startDate)} to ${formatDate(userEvent.endDate)} - ${userEvent.location?.city}, ${userEvent.location?.state?.toUpperCase()} ${userEvent.location?.country}`}
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
        {apiError && (
          <Box className='apiErrorsContainer' mb={2}>
            <Typography color='error'>{apiError}</Typography>
          </Box>
        )}
        <Box className='userActionsContainer' mb={3}>
          <Box
            sx={{
              display: 'block',
              [theme.breakpoints.up('md')]: {
                display: 'flex',
              },
            }}
          >
            {status === AuthStatus.Authenticated && isSessionUserAttendingEvent() ? null : (
              <CommonButton
                label='Attend'
                textColor={theme.palette.primary.thirdColorIceLight}
                borderColor={theme.palette.primary.lightIndigo}
                backgroundColor={theme.palette.primary.lightIndigo}
                borderRadius={'10px'}
                baseButtonStyles={{
                  width: '100%',
                  fontSize: ['0.8rem', '0.8rem', '1rem', '1.2rem', '1.4rem'],
                }}
                onButtonClick={handleAttendButtonClicked}
                disabled={isLoading}
              />
            )}
            {status === AuthStatus.Authenticated && isSessionUserAttendingEvent() && (
              <>
                <Alert
                  icon={
                    <CheckIcon
                      fontSize='inherit'
                      sx={{
                        color: theme.palette.primary.thirdColorIceLight,
                        alignSelf: 'center',
                        fontWeight: 'heavy',
                      }}
                    />
                  }
                  severity='success'
                  sx={{
                    color: theme.palette.primary.thirdColorIceLight,
                    backgroundColor: theme.palette.primary.greenConfirmation,
                    fontWeight: 'bold',
                    fontSize: ['0.9rem', '1rem', '1.2rem', '1.3rem', '1.4rem'],
                    width: '100%',
                    marginBottom: '10px',
                    '&.MuiPaper-root': {
                      justifyContent: 'center',
                    },
                  }}
                >
                  I'm going
                </Alert>

                <CommonButton
                  label='Unregister from event'
                  variant='text'
                  textColor={theme.palette.primary.burntOrangeCancelError}
                  baseButtonStyles={{
                    width: '100%',
                    textDecoration: 'underline',
                    fontSize: ['0.8rem', '0.8rem', '1rem', '1.2rem', '1.4rem'],
                  }}
                  startIcon={<NotInterestedIcon />}
                  onButtonClick={handleUnregisterButtonClicked}
                  disabled={isLoading}
                />
              </>
            )}
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
          previewUsers={eventParticipants}
        />
      </StyledContentContainer>
      <ConfirmationDialog
        open={confirmUnregisterDialogOpen}
        title='Unregister from event'
        prompt={`Do you want to continue to unregister from ${userEvent?.title || 'this event'}?`}
        options={[
          {
            title: 'Yes',
            action: () => {
              setConfirmUnregisterDialogOpen(false);
              completeUnregistrationAction();
            },
          },
          {
            title: 'Cancel',
            action: () => setConfirmUnregisterDialogOpen(false),
            color: 'error',
          },
        ]}
      />
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
