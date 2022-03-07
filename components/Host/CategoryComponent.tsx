import styles from './Category.module.css';

export default function CategoryComponent ({category}: {category: string}) {
  return (
    <div className={styles.category}>
      { category.toLocaleUpperCase() }
    </div>
  );
}