'use client';
import { getEventsByUserId, getUserById } from '@/app/clients/user/user-client';
import theme from '@/app/theme';
import UserAvatar from '@/components/avatar/user-avatar/UserAvatar';
import EventsSection from '@/components/events-section/Events-section';
import Event from '@/models/event';
import { SecureUser } from '@/types/secureUser';
import { Alert, Avatar, Box, CircularProgress, Theme, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';

interface UserPortalPageProps {
  params: {
    id: string;
  };
}

export default function UserPortalPage({ params: { id } }: UserPortalPageProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<SecureUser | undefined>(undefined);

  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);

  const [error, setError] = useState<string | undefined>(undefined);
  // Fetch the user by their id when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true);
        const fetchedUser = await getUserById(id);
        const fetchedEvents = await getEventsByUserId(id);
        setUser(fetchedUser);
        setUpcomingEvents(fetchedEvents!);
        setPastEvents(fetchedEvents!);
        setIsLoading(false);
      } catch (e: any) {
        setError(e.message);
      }
    };

    // Load the user's events
    fetchUser();
  }, [id]);

  return (
    <Box>
      {error && <Alert severity='error'>{error}</Alert>}
      <Box
        className={'userProfileHeaderSection'}
        pt={3}
        pb={4}
        bgcolor={theme.palette.primary.lightIndigo}
        sx={{
          border: '1px solid black',
        }}
      >
        <Box display='flex' justifyContent={'center'}>
          {isLoading ? (
            <CircularProgress />
          ) : (
            <UserAvatar
              showName
              user={user}
              imageClassName={styles.userAvatar}
              MuiAvatarComponent={<CustomGenericMuiAvatar />}
              nameStyles={{
                color: theme.palette.primary.thirdColorIceLight,
                fontWeight: 'bold',
              }}
            />
          )}
        </Box>
      </Box>
      <Box
        mt={3}
        sx={{
          [theme.breakpoints.up(600)]: {
            marginLeft: 4,
          },
          [theme.breakpoints.up(960)]: {
            marginLeft: 6,
          },
        }}
      >
        <Box>
          <EventsSection
            title='Upcoming events'
            hostedEvents={upcomingEvents}
            onLoadMoreEventsButtonClicked={() => {}}
            isLoading={isLoading}
          />
        </Box>
        <Box mt={3}>
          <EventsSection
            title='Past events'
            hostedEvents={pastEvents}
            onLoadMoreEventsButtonClicked={() => {}}
            isLoading={isLoading}
          />
        </Box>
      </Box>
    </Box>
  );
}

const CustomGenericMuiAvatar = styled(Avatar)(({ theme }: { theme: Theme }) => ({
  width: '80px',
  height: '80px',
  [theme.breakpoints.up(600)]: {
    width: '100px',
    height: '100px',
  },
  [theme.breakpoints.up(960)]: {
    width: '140px',
    height: '140px',
  },
  [theme.breakpoints.up(1440)]: {
    width: '240px',
    height: '240px',
  },
}));
