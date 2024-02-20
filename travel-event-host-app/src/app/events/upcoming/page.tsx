// Upcoming events page
'use client';
import { EventClient } from '@/app/clients/event/event-client';
import { EventsSection } from '@/components/events-section/Events-section';
import { UserEvent } from '@/models/user-event';
import { EventTimeLine } from '@/types/event-timeline';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

export default function UpcomingEventsPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [upcomingEvents, setUpcomingEvents] = useState<UserEvent[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);

  useEffect(() => {
    fetchUpcomingUserEvents();
  }, [pageNumber]);

  const fetchUpcomingUserEvents = async () => {
    try {
      setIsLoading(true);
      const fetchedUpcomingEvents = await EventClient.getAllEvents(
        EventTimeLine.Upcoming,
        pageNumber,
        4,
      );

      setUpcomingEvents([...upcomingEvents, ...fetchedUpcomingEvents.events]);
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box padding='5%'>
      <EventsSection
        title='Upcoming events'
        hostedEvents={upcomingEvents}
        onLoadMoreEventsButtonClicked={() => setPageNumber(pageNumber + 1)}
        isLoading={isLoading}
      />
    </Box>
  );
}
