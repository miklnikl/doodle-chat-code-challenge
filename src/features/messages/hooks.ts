import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createMessage, getMessages } from './api';
import type { CreateMessagePayload } from './types';

export const messagesQueryKey = ['messages'] as const;

const MESSAGES_POLL_INTERVAL = 5000;

export const useMessages = () =>
  useQuery({
    queryKey: messagesQueryKey,
    queryFn: ({ signal }) => getMessages(signal),
    refetchInterval: MESSAGES_POLL_INTERVAL,
  });

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateMessagePayload) => createMessage(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: messagesQueryKey });
    },
  });
};
