import styles from './MessageSkeleton.module.css';

const placeholders = [false, false, true, false];

export const MessageSkeleton = () => (
  <div role="status" aria-label="Loading messages" className={styles.list}>
    {placeholders.map((isOwn, index) => (
      <div
        key={index}
        className={`${styles.item} ${isOwn ? styles.own : styles.other}`}
      >
        {!isOwn && <span className={`${styles.bar} ${styles.author}`} />}
        <span className={`${styles.bar} ${styles.text}`} />
        <span className={`${styles.bar} ${styles.date}`} />
      </div>
    ))}
  </div>
);
