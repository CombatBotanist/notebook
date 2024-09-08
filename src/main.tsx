import { createRoot } from 'react-dom/client';
import '@cloudscape-design/global-styles/index.css';
import { I18nProvider } from '@cloudscape-design/components/i18n';
import messages from '@cloudscape-design/components/i18n/messages/all.en';
import { StrictMode } from 'react';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

// Create a new router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultStaleTime: 5000,
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
