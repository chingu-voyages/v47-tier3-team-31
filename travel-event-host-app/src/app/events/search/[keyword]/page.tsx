import { EventSearchSection } from '@/components/event-search/EventSearchSection';

interface EventSearchByKeywordPageProps {
  params: {
    keyword: string;
  };
}
export default function EventSearchByKeywordPage({
  params: { keyword },
}: EventSearchByKeywordPageProps) {
  return <EventSearchSection keyword={keyword} />;
}
