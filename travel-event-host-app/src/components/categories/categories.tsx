import { CategoryDict } from '@/lib/category-dictionary';
import styles from './styles.module.css';

export default function Categories() {
  return (
    <section className={styles.section}>
      <h2>Categories</h2>
      <ul className={styles.categoriesUl}>
        {Object.values(CategoryDict).map((category) => (
          <li key={category}>{category}</li>
        ))}
      </ul>
    </section>
  );
}
