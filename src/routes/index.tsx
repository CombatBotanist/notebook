import { Container, ContentLayout, Header } from '@cloudscape-design/components';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <ContentLayout defaultPadding header={<Header variant='h1'>Welcome!</Header>}>
      <Container>To get started, select a campaign using the dropdown at the top of the page or create a new campaign.</Container>
    </ContentLayout>
  );
}
