import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$note')({
  component: () => <div>Hello /$note!</div>,
});
