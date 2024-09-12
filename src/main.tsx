import { I18nProvider } from '@cloudscape-design/components/i18n';
import messages from '@cloudscape-design/components/i18n/messages/all.en';
import '@cloudscape-design/global-styles/index.css';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { routeTree } from './routeTree.gen';

import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../amplify/data/resource';
import outputs from '../amplify_outputs.json';

Amplify.configure(outputs);

const client = generateClient<Schema>({
  authMode: 'userPool',
});

// export the type of our client for use in the root route Context
export type Client = typeof client;

// Create a new router instance
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultStaleTime: 5000,
  context: { client: client },
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// Render the app
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider locale={'en'} messages={[messages]}>
      <RouterProvider router={router} />
    </I18nProvider>
  </StrictMode>
);
