import type { PropsWithChildren } from 'react';

export const ErrorMessage = ({ children }: PropsWithChildren) => (
  <p role="alert">{children}</p>
);
