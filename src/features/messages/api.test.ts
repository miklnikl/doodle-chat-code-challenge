import { beforeEach, describe, expect, it, vi } from 'vitest';
import { apiRequest } from '../../shared/api/client';
import { createMessage, getMessages } from './api';
import type { Message } from './types';

vi.mock('../../shared/api/client', () => ({
  apiRequest: vi.fn(),
}));

const apiRequestMock = vi.mocked(apiRequest);

describe('messages api', () => {
  beforeEach(() => {
    apiRequestMock.mockReset();
  });

  it('getMessages returns all messages from the endpoint', async () => {
    const messages: Message[] = [
      {
        _id: '1',
        message: 'Hey team!',
        author: 'Luka',
        createdAt: '2026-06-25T10:00:00.000Z',
      },
    ];
    apiRequestMock.mockResolvedValue(messages);

    const result = await getMessages();

    expect(apiRequestMock).toHaveBeenCalledWith('/messages', expect.anything());
    expect(result).toEqual(messages);
  });

  it('createMessage posts the payload to the endpoint', async () => {
    const payload = { message: 'Hello', author: 'You' };
    apiRequestMock.mockResolvedValue({
      _id: '2',
      createdAt: '2026-06-25T11:00:00.000Z',
      ...payload,
    });

    await createMessage(payload);

    expect(apiRequestMock).toHaveBeenCalledWith('/messages', {
      method: 'POST',
      body: payload,
    });
  });
});
