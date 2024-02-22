import SearchSection from '@/components/searchSection/searchSection';
export default function Page({ params }: { params: { keyword: string } }) {
  return <SearchSection keyword={params.keyword} />;
}
