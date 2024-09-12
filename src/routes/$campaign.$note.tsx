import { Form, FormField, Input, SpaceBetween, Textarea } from '@cloudscape-design/components';
import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/$campaign/$note')({
  component: Note,
  loader: async ({ context, params }) => {
    const campaign = await context.client.models.Campaign.list({
      filter: {
        name: { eq: params.campaign },
      },
    });
    const note = await context.client.models.Note.list({
      filter: {
        name: { eq: params.note },
        campaignId: { eq: campaign.data[0].id },
      },
    });
    const notes = await context.client.models.Note.list({
      filter: {
        campaignId: { eq: campaign.data[0].id },
      },
    });
    return {
      client: context.client,
      notes: notes.data,
      note: note.data[0],
    };
  },
});

function Note() {
  const { client, notes, note } = useLoaderData({ from: Route.id });
  const noteFriendlyNames = notes.map((n) => n.friendlyName);

  const [name, setName] = useState(note.name);
  const [friendlyName, setFriendlyName] = useState(note.friendlyName);
  const [nameError, setNameError] = useState('');
  const [description, setDescription] = useState(note.description || '');

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

    updateNote();
  }, [friendlyName, description]);

  async function updateNote() {
    const res = await client.models.Note.update({
      id: note.id,
      name,
      friendlyName,
      description,
    });
    console.debug(res);
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Form>
        <SpaceBetween size='l'>
          <FormField label='Name' description={name} errorText={nameError}>
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
