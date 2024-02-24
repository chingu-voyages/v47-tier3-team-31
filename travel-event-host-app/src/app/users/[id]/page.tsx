'use client';
import { EventClient } from '@/app/clients/event/event-client';
import { UserClient } from '@/app/clients/user/user-client';
import theme from '@/app/theme';
import { EventsSection } from '@/components/events-section/Events-section';
import { ProfileEditor } from '@/components/profile-editor/ProfileEditor';
import { Spinner } from '@/components/spinner/Spinner';
import { useAuthContext } from '@/lib/auth-context';
import { AuthStatus } from '@/lib/auth-status';
import { UserEvent } from '@/models/user-event';
import { EventTimeLine } from '@/types/event-timeline';
import { SecureUser } from '@/types/secure-user';
import { Alert, Box } from '@mui/material';
import { useEffect, useState } from 'react';

interface UserPortalPageProps {
  params: {
    id: string;
  };
}

export default function UserPortalPage({ params: { id } }: UserPortalPageProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<SecureUser | undefined>(undefined);

  const [upcomingEvents, setUpcomingEvents] = useState<UserEvent[]>([]);
  const [hostedEvents, setHostedEvents] = useState<UserEvent[]>([]);
  const [pastEvents, setPastEvents] = useState<UserEvent[]>([]);

  const [error, setError] = useState<string | undefined>(undefined);
  const { status, session, update } = useAuthContext();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async (showLoading: boolean = true) => {
    try {
      showLoading && setIsLoading(true);
      const fetchedUser = await UserClient.getUserById(id);
      const upcomingEvents = await EventClient.getEventsByUserId(id, EventTimeLine.Upcoming);
      const userPastEvents = await EventClient.getEventsByUserId(id, EventTimeLine.Past);
      // Get the events hosted by the user
      const hostedEvents = await EventClient.getEventsBySearchQuery(undefined, undefined, id);

      setUser(fetchedUser);
      setUpcomingEvents(upcomingEvents!);
      setPastEvents(userPastEvents!);
      setHostedEvents(hostedEvents!);
      showLoading && setIsLoading(false);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleProfileUpdate = async (
    formValues: Record<string, string | null | undefined>,
    deleteImageUrl?: boolean,
  ) => {
    // Send patch request to update the user's profile
    if (status === AuthStatus.Authenticated) {
      try {
        const { firstName, lastName, bio, imageUrl } = formValues;

        await UserClient.patchUserProfileById(session?.user?._id!, {
          firstName: firstName!,
          lastName: lastName!,
          bio: bio!,
          imageUrl: imageUrl!,
          deleteImageUrl,
        });
        await fetchUser(false);
        // Update the session
        if (update) {
          await update();
        }
      } catch (e: any) {
        setError(e.message);
      }
    }
  };

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
            <Spinner />
          ) : (
            <ProfileEditor
              user={user}
              editDisabled={session?.user?._id !== id}
              isLoading={isLoading}
              onProfileUpdate={handleProfileUpdate}
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
        {/* Do we want just any user to see some user's upcoming events? */}
        {hostedEvents && hostedEvents.length > 0 && (
          <Box>
            <EventsSection
              title="Events I'm hosting"
              hostedEvents={hostedEvents}
              onLoadMoreEventsButtonClicked={() => {}}
              isLoading={isLoading}
            />
          </Box>
        )}
        <Box>
          <EventsSection
            title='Upcoming events'
            hostedEvents={upcomingEvents}
            onLoadMoreEventsButtonClicked={() => {}}
            isLoading={isLoading}
          />
        </Box>
        <Box mt={3} mb={5}>
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
