'use client';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Image from 'next/image';
import { useState } from 'react';
import styles from '../styles.module.css';
export function SearchInput({
  handleSearch,
  keyword,
}: {
  handleSearch: (searchInput: string) => void;
  keyword: string;
}) {
  const [searchInput, setSearchInput] = useState<string>(keyword);

  return (
    <TextField
      onKeyDown={(e) => (e.key === 'Enter' ? handleSearch(searchInput) : null)}
      inputProps={{
        style: {
          paddingRight: 0,
        },
      }}
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value as string)}
      sx={{ fontSize: '2em', flexGrow: 1 }}
      InputProps={{
        endAdornment: (
          <div onClick={() => handleSearch(searchInput)} className={styles.searchBtn}>
            <Divider
              sx={{ borderRightWidth: '2px', margin: '.5em 1em', marginLeft: 0 }}
              orientation='vertical'
              flexItem
            />
            <Image
              alt='search'
              src='/images/search event/search-svgrepo-com.svg'
              width={19}
              height={19}
            />
          </div>
        ),
      }}
      id='input-with-icon-adornment'
    ></TextField>
  );
}
