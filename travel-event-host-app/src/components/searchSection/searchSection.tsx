import styles from './styles.module.css';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Image from 'next/image';
export default function SearchSection() {
  return (
    <section className={styles.section}>
      <Input
        id='input-with-icon-adornment'
        startAdornment={
          <InputAdornment position='start'>
            <Image alt='search' src='/images/search event/search.png' width={19} height={19} />
          </InputAdornment>
        }
      />
    </section>
  );
}
