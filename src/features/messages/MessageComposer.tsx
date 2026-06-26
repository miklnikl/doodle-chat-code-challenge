import { useLayoutEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Button } from "../../shared/ui/button/Button";
import { Textarea } from "../../shared/ui/textarea/Textarea";
import styles from "./MessageComposer.module.css";

interface MessageComposerProps {
  onSend: (message: string) => void;
  isSending: boolean;
}

export const MessageComposer = ({
  onSend,
  isSending,
}: MessageComposerProps) => {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const element = inputRef.current;

    if (!element) {
      return;
    }

    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  }, [text]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = text.trim();

    if (!trimmed) {
      return;
    }

    onSend(trimmed);
    setText("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Textarea
        ref={inputRef}
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Type a message"
        rows={1}
        disabled={isSending}
      />
      <Button type="submit" disabled={isSending}>
        Send
      </Button>
    </form>
  );
};
