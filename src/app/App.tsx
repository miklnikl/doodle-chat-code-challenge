import { useMessages, useSendMessage } from '../features/messages/hooks';
import { MessageList } from '../features/messages/MessageList';
import { MessageComposer } from '../features/messages/MessageComposer';
import { Spinner } from '../shared/ui/Spinner';
import { ErrorMessage } from '../shared/ui/ErrorMessage';
import styles from './App.module.css';

const CURRENT_USER = 'You';

export const App = () => {
  const { data: messages, isLoading, isError, error } = useMessages();
  const { mutate: sendMessage, isPending } = useSendMessage();

  const handleSend = (message: string) => {
    sendMessage({ message, author: CURRENT_USER });
  };

  return (
    <div className={styles.app}>
      <main className={styles.messages}>
        <div className={styles.container}>
          {isLoading && <Spinner />}
          {isError && <ErrorMessage>{error.message}</ErrorMessage>}
          {messages && (
            <MessageList messages={messages} currentUser={CURRENT_USER} />
          )}
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <MessageComposer onSend={handleSend} isSending={isPending} />
        </div>
      </footer>
    </div>
  );
};
