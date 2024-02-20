import { EventSearchSection } from '@/components/event-search/event-search-section';

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
