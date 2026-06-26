import { MessageItem } from '../messageItem/MessageItem';
import type { Message } from '../types';
import styles from './MessageList.module.css';

interface MessageListProps {
  messages: Message[];
  currentUser: string;
}

export const MessageList = ({ messages, currentUser }: MessageListProps) => {
  if (messages.length === 0) {
    return <p>No messages yet.</p>;
  }

  return (
    <ul className={styles.list}>
      {messages.map((message) => (
        <MessageItem
          key={message._id}
          message={message}
          isOwn={message.author === currentUser}
        />
      ))}
    </ul>
  );
};
