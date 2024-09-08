import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/notes')({
  component: () => <div>Notes!</div>,
});
