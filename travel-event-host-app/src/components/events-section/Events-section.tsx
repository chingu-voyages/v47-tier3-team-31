'use client';
import theme from '@/app/theme';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';

import { UserEvent } from '@/models/user-event';
import { CommonButton } from '../common-button/Common-Button';
import { EventCard } from '../event/event-card/Event-card';

/**
 * This component is responsible for rendering the events section on the home page.
 * It can be used for recommended events or upcoming events.
 */
interface EventsSectionProps {
  title: string;
  hostedEvents: UserEvent[];
  onLoadMoreEventsButtonClicked: () => void;
  isLoading?: boolean;
}

export function EventsSection({
  title,
  hostedEvents,
  onLoadMoreEventsButtonClicked,
  isLoading,
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
          fontSize={['0.8rem', '1rem', '1.2rem', '1.5rem', '1.6rem']}
          fontWeight={'bold'}
          color={theme.palette.primary.primaryColorDarkerBlue}
          sx={{
            [theme.breakpoints.down(610)]: {
              textAlign: 'center',
            },
          }}
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
  hostedEvents: UserEvent[],
  onEventClickAction: (eventId: string) => void,
) => {
  if (hostedEvents.length === 0)
    return (
      <Typography
        fontSize={['0.8rem', '1rem', '1.2rem', '1.3rem', '1.4rem']}
        color={theme.palette.primary.primaryColorDarkerBlue}
        sx={{
          [theme.breakpoints.down(610)]: {
            textAlign: 'center',
          },
        }}
      >
        Nothing to show
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
