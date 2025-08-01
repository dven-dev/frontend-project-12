import React from 'react';
import { Provider, ErrorBoundary } from '@rollbar/react';

export const rollbarConfig = {
  accessToken: '8bdbf244ccd34b56ae4fd42e8451f39f',
  environment: 'testenv',
};

function TestError() {
  const a = null;
  return a.hello();
}

export default function App() {
  return (
    <Provider config={rollbarConfig}>
      <ErrorBoundary>
        <TestError />
      </ErrorBoundary>
    </Provider>
  );
}
