import { memo } from 'react';
import { formatDateTime } from '../../../shared/lib/date';
import type { Message } from '../types';
import styles from './MessageItem.module.css';

const decodeHtml = (value: string): string => {
  const element = document.createElement('textarea');
  element.innerHTML = value;
  return element.value;
};

interface MessageItemProps {
  message: Message;
  isOwn: boolean;
}

export const MessageItem = memo(
  ({ message, isOwn }: MessageItemProps) => (
    <li className={`${styles.item} ${isOwn ? styles.own : styles.other}`}>
      {!isOwn && <span className={styles.author}>{message.author}</span>}
      <p className={styles.text}>{decodeHtml(message.message)}</p>
      <time className={styles.date} dateTime={message.createdAt}>
        {formatDateTime(message.createdAt)}
      </time>
    </li>
  ),
);

MessageItem.displayName = 'MessageItem';
