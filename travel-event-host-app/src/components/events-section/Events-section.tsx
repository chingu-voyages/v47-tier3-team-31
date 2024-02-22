'use client';
import theme from '@/app/theme';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import HostedEvent from '../../models/event';
import CommonButton from '../common-button/Common-Button';
import EventCard from '../event/event-card/Event-card';

/**
 * This component is responsible for rendering the events section on the home page.
 * It can be used for recommended events or upcoming events.
 */
interface EventsSectionProps {
  title?: string;
  hostedEvents?: HostedEvent[];
  onLoadMoreEventsButtonClicked?: () => void;
  isLoading?: boolean;
}

export default function EventsSection({
  title = 'Upcoming Events',
  hostedEvents = [],
  onLoadMoreEventsButtonClicked = () => {
    return false;
  },
  isLoading,
}: EventsSectionProps) {
  const theme = useTheme(); // This is a MaterialUI hook that allows us to access the MUI theme

  const handleOnLoadMoreButtonClick = () => {
    onLoadMoreEventsButtonClicked();
  };

  return (
    <Box
      sx={{
        padding: '5%',
        paddingTop: '3rem',
        display: 'flex',
        minHeight: '28rem',
        justifyContent: 'space-between',
        flexDirection: 'column',
        paddingBottom: 0,
      }}
    >
      <Box>
        {/* Header of the events section*/}
        <Typography
          sx={{ marginLeft: '44px', fontSize: '40px' }}
          variant='h4'
          fontWeight={600}
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
        {isLoading ? (
          <CircularProgress />
        ) : (
          renderEventCards(hostedEvents, handleOnLoadMoreButtonClick)
        )}
      </Box>
      {/* This will be the button to load more events */}
      <Box display='flex' justifyContent={'center'} mt={3}>
        <CommonButton
          disabled={isLoading}
          label='Load More'
          onButtonClick={handleOnLoadMoreButtonClick}
          additionalStyles={{
            '&&&.Mui-disabled': {
              borderColor: theme.palette.primary.greyDisabled,
              color: theme.palette.primary.greyDisabled,
              borderWidth: '0.5px',
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
        />
      </Box>
    </Box>
  );
}

// This function will render the event cards or display a message if there are no events to show
const renderEventCards = (
  hostedEvents: HostedEvent[],
  onEventClickAction: (eventId: string) => void,
) => {
  if (!hostedEvents || hostedEvents.length === 0)
    return (
      <Typography
        sx={{ margin: 'auto' }}
        variant='h3'
        color={theme.palette.primary.primaryColorDarkerBlue}
      >
        No events to show
      </Typography>
    );
  return hostedEvents.map((hostedEvent) => (
    <EventCard
      hostedEvent={hostedEvent}
      key={hostedEvent._id}
      onCardClick={() => onEventClickAction(hostedEvent._id)}
    />
  ));
};
