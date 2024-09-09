import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$campaign')({
  component: () => <div>Hello /$campaign!</div>
})