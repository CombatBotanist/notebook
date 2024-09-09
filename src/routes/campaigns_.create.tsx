import { Button, Form, FormField, Header, Input, SpaceBetween } from '@cloudscape-design/components';
import { createFileRoute, useLoaderData, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import type { AppContext } from './__root';

export const Route = createFileRoute('/campaigns/create')({
  component: CreateCampaign,
  loader: ({ context }: { context: AppContext }) => {
    return {
      client: context.client,
    };
  },
});

function CreateCampaign() {
  const navigate = useNavigate();
  const { client } = useLoaderData({ from: Route.id });
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  async function createCampaign() {
    await client.models.Campaign.create({
      name,
    });
    navigate({ to: '/campaigns' });
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Form
        actions={
          <SpaceBetween direction='horizontal' size='xs'>
            <Button formAction='none' variant='link' onClick={() => navigate({ to: '/campaigns' })}>
              Cancel
            </Button>
            <Button variant='primary' onClick={createCampaign} disabled={name.length === 0}>
              Create
            </Button>
          </SpaceBetween>
        }
        header={<Header variant='h1'>Create campaign</Header>}
      >
        <FormField label='Name' errorText={nameError}>
          <Input
            onChange={({ detail }) => {
              const value = detail.value.trim();
              if (value.length === 0) {
                setNameError('Name is required');
              } else if (value === 'campaigns') {
                setNameError('Campaigns is a reserved name');
              } else if (/[^a-zA-Z0-9 ]/.test(value)) {
                setNameError('Name can only contain alphanumeric characters and spaces');
              } else {
                setNameError('');
              }
              setName(detail.value);
            }}
            value={name}
          />
        </FormField>
      </Form>
    </form>
  );
}
