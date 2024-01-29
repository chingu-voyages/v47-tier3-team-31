'use client';
import { Box, Button, Typography, useTheme } from '@mui/material';
import HostedEvent from '../../models/event';
import EventCard from '../event/event-card/Event-card';

/**
 * This component is responsible for rendering the events section on the home page.
 * It can be used for recommended events or upcoming events.
 */
interface EventsSectionProps {
  title: string;
  hostedEvents: HostedEvent[];
  onLoadMoreEventsButtonClicked: () => void;
}

export default function EventsSection({
  title,
  hostedEvents,
  onLoadMoreEventsButtonClicked,
}: EventsSectionProps) {
  const theme = useTheme(); // This is a MaterialUI hook that allows us to access the MUI theme

  const handleOnLoadMoreButtonClick = () => {
    onLoadMoreEventsButtonClicked();
  };

  return (
    <Box>
      <Box>
        {/* Header of the events section*/}
        <Typography
          variant='h5'
          fontWeight={'bold'}
          color={theme.palette.primary.primaryColorDarkerBlue}
        >
          {title}
        </Typography>
      </Box>
      {/* This will be where the event cards are rendered */}
      <Box
        className='eventCardsContainer'
        sx={{
          marginTop: '0.8rem',
          [theme.breakpoints.up(720)]: {
            flexWrap: 'wrap',
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '3rem',
          },
          [theme.breakpoints.down(719)]: {
            flexDirection: 'column',
          },
        }}
      >
        {renderEventCards(hostedEvents, handleOnLoadMoreButtonClick)}
      </Box>
      {/* This will be the button to load more events */}
      <Box display='flex' justifyContent={'center'} mt={3}>
        {/* TODO: This button could be extracted as a shared component */}
        <Button
          variant='outlined'
          onClick={handleOnLoadMoreButtonClick}
          sx={{
            '&.MuiButtonBase-root': {
              borderRadius: '50px',
              borderWidth: '2px',
              color: theme.palette.primary.LightNightBlue,
              borderColor: theme.palette.primary.LightNightBlue,
              fontWeight: 'bold',
              textTransform: 'none',
            },
            [theme.breakpoints.down(720)]: {
              maxWidth: '100px',
              maxHeight: '40px',
              padding: '2px',
              fontSize: '0.6rem',
              '&.MuiButtonBase-root': {
                borderWidth: '1px',
              },
            },
          }}
        >
          Load More
        </Button>
      </Box>
    </Box>
  );
}

// This function will render the event cards or display a message if there are no events to show
const renderEventCards = (
  hostedEvents: HostedEvent[],
  onEventClickAction: (eventId: string) => void,
) => {
  if (hostedEvents.length === 0) return <Typography variant='h5'>No events to show</Typography>;
  return hostedEvents.map((hostedEvent) => (
    <EventCard
      hostedEvent={hostedEvent}
      key={hostedEvent.id}
      onCardClick={() => onEventClickAction(hostedEvent.id)}
    />
  ));
};
