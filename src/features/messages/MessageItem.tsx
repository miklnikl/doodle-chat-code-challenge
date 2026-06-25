import { formatTime } from '../../shared/lib/date';
import type { Message } from './types';

const decodeHtml = (value: string): string => {
  const element = document.createElement('textarea');
  element.innerHTML = value;
  return element.value;
};

interface MessageItemProps {
  message: Message;
  isOwn: boolean;
}

export const MessageItem = ({ message, isOwn }: MessageItemProps) => (
  <li data-own={isOwn}>
    <span>{message.author}</span>
    <p>{decodeHtml(message.message)}</p>
    <time dateTime={message.createdAt}>{formatTime(message.createdAt)}</time>
  </li>
);
