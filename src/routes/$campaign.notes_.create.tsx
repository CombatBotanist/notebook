import { Button, Form, FormField, Header, Input, SpaceBetween, Textarea } from '@cloudscape-design/components';
import { createFileRoute, useLoaderData, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/$campaign/notes/create')({
  component: CreateNote,
  loader: async ({ context, params }) => {
    const campaign = await context.client.models.Campaign.list({
      filter: {
        name: { eq: params.campaign },
      },
    });
    const notes = await context.client.models.Note.list({
      filter: {
        campaignId: { eq: campaign.data[0].id },
      },
    });
    return {
      client: context.client,
      campaign: campaign.data[0],
      notes: notes.data,
    };
  },
});

function CreateNote() {
  const navigate = useNavigate();
  const { client, campaign, notes } = useLoaderData({ from: Route.id });
  const noteFriendlyNames = notes.map((n) => n.friendlyName);
  const [name, setName] = useState('');
  const [friendlyName, setFriendlyName] = useState('');
  const [nameError, setNameError] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const newName = friendlyName
      .trim()
      .replaceAll(' ', '_')
      .toLowerCase()
      .replaceAll(/[^a-z0-9_]/g, '');
    setName(newName);

    if (newName.length === 0) {
      setNameError('Name is required');
    } else if (newName === 'notes') {
      setNameError('Notes is a reserved name');
    } else if (noteFriendlyNames.includes(newName)) {
      setNameError('Name must be unique');
    } else {
      setNameError('');
    }
  }, [friendlyName]);

  function createNote() {
    client.models.Note.create({
      name,
      friendlyName,
      description,
      campaignId: campaign.id,
    });
    navigate({ to: '/$campaign/$note', params: { campaign: campaign.name, note: name } });
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Form
        actions={
          <SpaceBetween direction='horizontal' size='xs'>
            <Button formAction='none' variant='link' onClick={() => navigate({ to: '/campaigns' })}>
              Cancel
            </Button>
            <Button variant='primary' onClick={createNote} disabled={friendlyName.length < 3 || nameError !== ''}>
              Create
            </Button>
          </SpaceBetween>
        }
        header={<Header variant='h1'>Create new note</Header>}
      >
        <SpaceBetween size='l'>
          <FormField label='Name' description={name}>
            <Input
              onChange={({ detail }) => {
                setFriendlyName(detail.value);
              }}
              value={friendlyName}
              placeholder='A powerful name'
            />
          </FormField>
          <FormField label='Description'>
            <Textarea onChange={({ detail }) => setDescription(detail.value)} value={description} placeholder='A beautiful description' />
          </FormField>
        </SpaceBetween>
      </Form>
    </form>
  );
}
