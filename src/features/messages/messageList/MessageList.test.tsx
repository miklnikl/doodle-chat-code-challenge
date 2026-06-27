import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { MessageList } from './MessageList';
import { formatDateTime } from '../../../shared/lib/date';
import type { Message } from '../types';

vi.mock('../../../shared/lib/date', () => ({
  formatDateTime: vi.fn(() => '10 Mar 2018 10:10'),
}));

const formatDateTimeMock = vi.mocked(formatDateTime);

const messages: Message[] = [
  {
    _id: '1',
    message: 'Hello',
    author: 'Luka',
    createdAt: '2026-06-25T10:00:00.000Z',
  },
  {
    _id: '2',
    message: 'Hi',
    author: 'Nina',
    createdAt: '2026-06-25T10:01:00.000Z',
  },
];

describe('MessageItem memoization', () => {
  beforeEach(() => {
    formatDateTimeMock.mockClear();
  });

  it('does not re-render items when the list re-renders with the same messages', () => {
    const { rerender } = render(
      <MessageList messages={messages} currentUser="You" />,
    );

    expect(formatDateTimeMock).toHaveBeenCalledTimes(messages.length);
    formatDateTimeMock.mockClear();

    rerender(<MessageList messages={messages} currentUser="You" />);

    expect(formatDateTimeMock).not.toHaveBeenCalled();
  });

  it('re-renders only the item whose message reference changed', () => {
    const { rerender } = render(
      <MessageList messages={messages} currentUser="You" />,
    );
    formatDateTimeMock.mockClear();

    const updated: Message[] = [
      { ...messages[0], message: 'Hello!' },
      messages[1],
    ];
    rerender(<MessageList messages={updated} currentUser="You" />);

    expect(formatDateTimeMock).toHaveBeenCalledTimes(1);
  });
});
