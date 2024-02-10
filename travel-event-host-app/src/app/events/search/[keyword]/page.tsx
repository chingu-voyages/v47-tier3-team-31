import { EventSearchSection } from '@/components/event-search/event-search-section';

export default function Page({ params }: { params: { keyword: string } }) {
  return <EventSearchSection keyword={params.keyword} />;
}
