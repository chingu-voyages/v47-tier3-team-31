'use client';
import { CategoriesSection } from '@/components/categories-section/CategoriesSection';
import { CreateEventSection } from '@/components/create-event-section/Create-event-section';
import { EventsSection } from '@/components/events-section/Events-section';
import { HeroSection } from '@/components/hero/Hero-Section';
import { Box } from '@mui/material';

export default function Home() {
  return (
    <Box>
      <Box id='enclosure' marginLeft={[0, 0, '10%', '20%']} marginRight={[0, 0, '10%', '20%']}>
        <HeroSection />
        <Box mb={5} mt={5}>
          <EventsSection
            title='Upcoming Events'
            hostedEvents={[]}
            onLoadMoreEventsButtonClicked={() => {}}
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
