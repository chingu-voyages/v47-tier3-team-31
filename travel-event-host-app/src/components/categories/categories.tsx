import styles from './styles.module.css';
import categoriesArr from '@/lib/categoryArray';

export default function Categories() {
  return (
    <section className={styles.section}>
      <h2>Categories</h2>
      <ul className={styles.categoriesUl}>
        {Object.values(categoriesArr).map((category) => (
          <li key={category}>{category}</li>
        ))}
      </ul>
    </section>
  );
}
