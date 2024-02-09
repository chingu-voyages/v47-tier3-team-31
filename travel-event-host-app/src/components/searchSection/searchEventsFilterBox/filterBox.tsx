'use client';
import { useEffect, useState } from 'react';
import {
  Box,
  MenuItem,
  Select,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
  IconButton,
} from '@mui/material';
import categoriesArr from '@/lib/categoryArray';
import CategoriesType from '@/components/searchSection/types';
import styles from '../styles.module.css';
import CloseIcon from '@mui/icons-material/Close';

const updateCategories = () => {
  let updateCategories: { [key: string]: boolean } = {};

  Object.values(categoriesArr).map((category) => (updateCategories[category] = false));
  return updateCategories;
};

const FilterBox = ({
  setCategories,
  categories,
  filterBoxIsOpen,
  setFilterBoxIsOpen,
}: {
  setCategories: React.Dispatch<React.SetStateAction<CategoriesType>>;
  categories: CategoriesType;
  filterBoxIsOpen: boolean;
  setFilterBoxIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [day, setDay] = useState('Any day');
  const [distance, setDistance] = useState('Any distance');
  useEffect(() => {
    setCategories(updateCategories());
  }, []);

  const handleDayChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setDay(event.target.value);
  };

  const handleDistanceChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setDistance(event.target.value);
  };

  const handleCategoryChange = (event: { target: { name: any; checked: any } }) => {
    setCategories({ ...categories, [event.target.name]: event.target.checked });
  };

  return (
    <div className={`${styles.filterBox} ${filterBoxIsOpen ? styles.open : ''}`}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          borderRadius: 2,
          backgroundColor: 'white',
          padding: 4,
          color: 'black',
          position: 'sticky',
          minWidth: '274px',
          height: 'min-content',
          top: 0,
        }}
      >
        <IconButton
          className={styles.closeIcon}
          onClick={() => setFilterBoxIsOpen(false)}
          sx={{ alignSelf: 'flex-end' }}
        >
          <CloseIcon />
        </IconButton>
        <Select value={day} onChange={handleDayChange}>
          <MenuItem value='Any day'>Any day</MenuItem>
          <MenuItem value='Today'>Today</MenuItem>
          <MenuItem value='Tomorrow'>Tomorrow</MenuItem>
          <MenuItem value='This week'>This week</MenuItem>
          <MenuItem value='Next week'>Next week</MenuItem>
          <MenuItem value='Custom'>Custom</MenuItem>
        </Select>
        <Select value={distance} onChange={handleDistanceChange}>
          <MenuItem value='Any distance'>Any distance</MenuItem>
          <MenuItem value='100km'>100km</MenuItem>
          <MenuItem value='500km'>500km</MenuItem>
          <MenuItem value='1000km'>1000km</MenuItem>
        </Select>
        <Typography variant='h6'>Categories</Typography>
        <FormGroup
          className={styles.filterContainer}
          sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
        >
          {Object.entries(categories).map(([category, checked]) => (
            <FormControlLabel
              key={category}
              control={
                <Checkbox checked={checked} onChange={handleCategoryChange} name={category} />
              }
              label={category}
            />
          ))}
        </FormGroup>
      </Box>
    </div>
  );
};

export default FilterBox;
