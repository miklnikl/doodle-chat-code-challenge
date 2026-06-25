import { apiRequest } from '../../shared/api/client';
import type { CreateMessagePayload, Message } from './types';

export const getMessages = (signal?: AbortSignal) =>
  apiRequest<Message[]>('/messages', { signal });

export const createMessage = (payload: CreateMessagePayload) =>
  apiRequest<Message>('/messages', { method: 'POST', body: payload });
