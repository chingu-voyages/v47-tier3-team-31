import Categories from '../categories/categories';
import { CreateEventSection } from '../create-event-section/Create-event-section';
import EventsSection from '../events-section/Events-section';
import { HeroSection } from '../hero/Hero-Section';

export default function Landing() {
  return (
    <main>
      <HeroSection />
      <section id="#Upcoming-Events">
        <EventsSection />
      </section>
      <Categories />
      <section id="Create-Event-Section">
        <CreateEventSection />
      </section>
    </main>
  );
}
