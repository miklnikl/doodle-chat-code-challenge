import { useState } from 'react';
import type { FormEvent } from 'react';
import { Button } from '../../shared/ui/Button';
import { Textarea } from '../../shared/ui/Textarea';

interface MessageComposerProps {
  onSend: (message: string) => void;
  isSending: boolean;
}

export const MessageComposer = ({ onSend, isSending }: MessageComposerProps) => {
  const [text, setText] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = text.trim();

    if (!trimmed) {
      return;
    }

    onSend(trimmed);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <Textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Type a message"
        rows={3}
        disabled={isSending}
      />
      <Button type="submit" disabled={isSending}>
        Send
      </Button>
    </form>
  );
};
