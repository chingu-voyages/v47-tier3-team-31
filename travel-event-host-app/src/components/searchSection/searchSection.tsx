'use client';
import styles from './styles.module.css';

import FilterBox from './searchEventsFilterBox/filterBox';
import { useState, useEffect } from 'react';
import { Box, MenuItem, Select, Typography } from '@mui/material';
import EventCard from '../event/event-card/Event-card';
import Event from '@/models/event';
import CategoriesType from '@/components/searchSection/types';
import { useRouter } from 'next/navigation';
import { SearchInput } from './searchInput/searchInput';
import { getEventsBySearchQuery } from '@/app/clients/event/event-client';

export default function SearchSection({ keyword }: { keyword: string }) {
  const [sortBy, setSortBy] = useState<string>('Date');
  const [resultEventList, setResultEventList] = useState<Event[]>([]);
  const [categories, setCategories] = useState<CategoriesType>({});
  const [filterBoxIsOpen, setFilterBoxIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleSearch = (searchInput: string) => {
    const url = `/searchevent/${searchInput}`; // Construct the URL
    router.push(url); // Navigate to the URL
  };

  useEffect(() => {
    const fetch = async () => {
      const eventsResultFetch = await getEventsBySearchQuery(keyword, categories);
      setResultEventList(eventsResultFetch);
    };
    fetch();
  }, [categories, keyword]);

  return (
    <section className={styles.section}>
      <div
        onClick={() => setFilterBoxIsOpen(false)}
        className={`${styles.overlay} ${filterBoxIsOpen ? styles.open : ''}`}
      ></div>

      <FilterBox
        filterBoxIsOpen={filterBoxIsOpen}
        setCategories={setCategories}
        categories={categories}
        setFilterBoxIsOpen={setFilterBoxIsOpen}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', gap: '2em' }}>
          <SearchInput handleSearch={handleSearch} keyword={keyword} />
          <Select
            sx={{
              backgroundColor: 'white',
              minWidth: '8em',
              height: 'min-content',
            }}
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as string)}
          >
            <MenuItem value='Relevance'>Revelance</MenuItem>
            <MenuItem value='Date'>Date</MenuItem>
          </Select>
        </Box>
        <p onClick={() => setFilterBoxIsOpen(true)} className={styles.filterBtn}>
          Filters
        </p>
        <ul className={styles.eventsGrid}>
          {resultEventList.length > 0 ? (
            resultEventList.map((event) => (
              <li key={event['_id']}>
                <EventCard hostedEvent={event} />
              </li>
            ))
          ) : (
            <p className={styles.eventNotFound}>Events Not Found</p>
          )}
        </ul>
      </Box>
    </section>
  );
}
