import { useMessages, useSendMessage } from '../features/messages/hooks';
import { MessageList } from '../features/messages/MessageList';
import { MessageComposer } from '../features/messages/MessageComposer';
import { Spinner } from '../shared/ui/Spinner';
import { ErrorMessage } from '../shared/ui/ErrorMessage';

const CURRENT_USER = 'You';

export const App = () => {
  const { data: messages, isLoading, isError, error } = useMessages();
  const { mutate: sendMessage, isPending } = useSendMessage();

  const handleSend = (message: string) => {
    sendMessage({ message, author: CURRENT_USER });
  };

  return (
    <div>
      <header>
        <h1>Doodle Chat</h1>
      </header>

      <main>
        {isLoading && <Spinner />}
        {isError && <ErrorMessage>{error.message}</ErrorMessage>}
        {messages && (
          <MessageList messages={messages} currentUser={CURRENT_USER} />
        )}
      </main>

      <MessageComposer onSend={handleSend} isSending={isPending} />
    </div>
  );
};
