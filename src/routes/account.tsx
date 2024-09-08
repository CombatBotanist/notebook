import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import Header from '@cloudscape-design/components/header';
import KeyValuePairs from '@cloudscape-design/components/key-value-pairs';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/account')({
  component: () => <Account />,
});

function Account() {
  return (
    <SpaceBetween direction='vertical' size='l'>
      <Container header={<Header actions={<Button variant='primary'>Sign out</Button>}>User information</Header>}>
        <KeyValuePairs
          items={[
            {
              label: 'User ID',
              value: 'foo',
            },
            {
              label: 'Username',
              value: 'foo',
            },
            {
              label: 'Login ID',
              value: 'foo',
            },
          ]}
        />
      </Container>
      <Container header={<Header>Delete account</Header>}>
        <Button variant='primary' disabled>
          Delete
        </Button>
      </Container>
    </SpaceBetween>
  );
}
