'use client';
import { CategoriesSection } from '@/components/categories-section/CategoriesSection';
import { CreateEventSection } from '@/components/create-event-section/Create-event-section';
import { EventsSection } from '@/components/events-section/Events-section';
import { HeroSection } from '@/components/hero/Hero-Section';
import { UserEvent } from '@/models/user-event';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { getAllEvents } from './clients/event/event-client';

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userEvents, setUserEvents] = useState<UserEvent[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);

  useEffect(() => {
    fetchUserEvents();
  }, []); // Initial load of user events on the home page

  const fetchUserEvents = async () => {
    setIsLoading(true);
    // Fetch events
    try {
      const reponse = await getAllEvents(pageNumber);
      setUserEvents([...reponse.events]); // TODO: This may be a bug, we may need to append the events to the existing events
      setIsLoading(false);
    } catch (error: any) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Box id='enclosure' marginLeft={[0, 0, '10%', '20%']} marginRight={[0, 0, '10%', '20%']}>
        <HeroSection />
        <Box mb={5} mt={5}>
          <EventsSection
            title='Upcoming Events'
            hostedEvents={userEvents}
            onLoadMoreEventsButtonClicked={() => {}}
            isLoading={isLoading}
          />
        </Box>
        <Box mb={5}>
          <CategoriesSection />
        </Box>
        <Box>
          <CreateEventSection />
        </Box>
      </Box>
    </Box>
  );
}
