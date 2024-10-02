import { Form, FormField, Header, Input, SegmentedControl, SpaceBetween, Textarea } from '@cloudscape-design/components';
import { createFileRoute, useLoaderData, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { router } from '../main';
import { NoteType } from '../types';

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
      campaign: campaign.data[0],
    };
  },
});

function Note() {
  const navigate = useNavigate();
  const { client, notes, note, campaign } = useLoaderData({ from: Route.id });
  const noteFriendlyNames = notes.map((n) => n.friendlyName);

  const [name, setName] = useState(note.name);
  const [friendlyName, setFriendlyName] = useState(note.friendlyName);
  const [nameError, setNameError] = useState('');
  const [description, setDescription] = useState(note.description || '');
  const [type, setType] = useState(note.type);
  const [changed, setChanged] = useState(false);

  useHotkeys('alt+x', () => {
    navigate({
      to: '/$campaign/notes',
      params: {
        campaign: campaign.name,
      },
    });
  });

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

    if (changed) {
      updateNote();
      setChanged(false);
    }
  }, [friendlyName, description, type]);

  async function updateNote() {
    const res = await client.models.Note.update({
      id: note.id,
      name,
      type,
      friendlyName,
      description,
    });
    console.debug('Updated note:', res);
    router.invalidate();
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Form
        header={
          <Header variant='h1' description={name}>
            {friendlyName}
          </Header>
        }
      >
        <SpaceBetween size='l'>
          <FormField label='Name' errorText={nameError}>
            <Input
              onChange={({ detail }) => {
                setFriendlyName(detail.value);
                setChanged(true);
              }}
              value={friendlyName}
              placeholder='A powerful name'
            />
          </FormField>
          <SegmentedControl
            selectedId={type}
            onChange={({ detail }) => {
              setType(NoteType[detail.selectedId as keyof typeof NoteType]);
              setChanged(true);
            }}
            options={Object.values(NoteType).map((t) => ({ id: t, text: t }))}
          />
          <FormField label='Description'>
            <Textarea
              onChange={({ detail }) => {
                setDescription(detail.value);
                setChanged(true);
              }}
              value={description}
              placeholder='A beautiful description'
            />
          </FormField>
        </SpaceBetween>
      </Form>
    </form>
  );
}
