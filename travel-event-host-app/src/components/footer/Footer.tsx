import Link from 'next/link';
import styles from './footer.module.css';

export function Footer() {
  return (
    <div className={styles.footer}>
      <Link href='/about'>About us</Link>
      <a href='https://chingu.io/'>Chingu</a>
      <Link href='/team'>Team</Link>
    </div>
  );
}
