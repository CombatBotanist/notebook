import { Button, Form, FormField, Header, Input, SpaceBetween } from '@cloudscape-design/components';
import { createFileRoute, useLoaderData, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import type { AppContext } from './__root';

export const Route = createFileRoute('/campaigns/create')({
  component: CreateCampaign,
  loader: async ({ context }: { context: AppContext }) => {
    return {
      client: context.client,
      campaigns: await context.client.models.Campaign.list(),
    };
  },
});

function CreateCampaign() {
  const navigate = useNavigate();
  const { client, campaigns } = useLoaderData({ from: Route.id });
  const campaignList = campaigns.data;
  const [friendlyName, setFriendlyName] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  async function createCampaign() {
    await client.models.Campaign.create({
      friendlyName,
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
            <Button variant='primary' onClick={createCampaign} disabled={friendlyName.length < 3 || nameError !== ''}>
              Create
            </Button>
          </SpaceBetween>
        }
        header={<Header variant='h1'>Create campaign</Header>}
      >
        <SpaceBetween size='l'>
          <FormField label='Name' errorText={nameError}>
            <Input
              onChange={({ detail }) => {
                const value = detail.value.trim();
                const newName = value.replaceAll(' ', '_').toLowerCase();
                const matchingCampaign = campaignList.find((c) => c.name === newName);
                console.debug(matchingCampaign);

                if (value.length === 0) {
                  setNameError('Name is required');
                } else if (value === 'campaigns') {
                  setNameError('Campaigns is a reserved name');
                } else if (/[^a-zA-Z0-9 -]/.test(value)) {
                  setNameError('Name can only contain alphanumeric characters and spaces');
                } else if (matchingCampaign !== undefined) {
                  setNameError('Name must be unique');
                } else {
                  setNameError('');
                }
                setName(value.replaceAll(' ', '_').toLowerCase());
                setFriendlyName(detail.value);
              }}
              value={friendlyName}
            />
          </FormField>
          <FormField label='Generated ID'>
            <Input value={name} disabled />
          </FormField>
        </SpaceBetween>
      </Form>
    </form>
  );
}
