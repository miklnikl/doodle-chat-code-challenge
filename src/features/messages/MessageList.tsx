import { MessageItem } from './MessageItem';
import type { Message } from './types';

interface MessageListProps {
  messages: Message[];
  currentUser: string;
}

export const MessageList = ({ messages, currentUser }: MessageListProps) => {
  if (messages.length === 0) {
    return <p>No messages yet.</p>;
  }

  return (
    <ul>
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
