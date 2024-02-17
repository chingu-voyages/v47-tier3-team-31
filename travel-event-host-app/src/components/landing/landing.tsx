import Categories from '../categories/categories';
import { CreateEventSection } from '../create-event-section/Create-event-section';
import EventsSection from '../events-section/Events-section';
import { HeroSection } from '../hero/Hero-Section';

export default function Landing() {
  return (
    <main>
      <HeroSection />
      <EventsSection />
      <Categories />
      <CreateEventSection />
    </main>
  );
}
