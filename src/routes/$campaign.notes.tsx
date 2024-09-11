import {
  Box,
  Button,
  Cards,
  Form,
  FormField,
  Header,
  Input,
  Modal,
  SpaceBetween,
  Textarea,
  TextFilter,
} from '@cloudscape-design/components';
import { createFileRoute, useLoaderData, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/$campaign/notes')({
  component: Notes,
  async loader({ context, params }) {
    const campaign = await context.client.models.Campaign.list({
      filter: {
        name: { eq: params.campaign },
      },
    });
    const campaignId = campaign.data[0].id;
    console.debug(campaign);
    return {
      client: context.client,
      campaign: campaign.data[0],
      notes: await context.client.models.Note.list({
        filter: {
          campaignId: { eq: campaignId },
        },
      }),
    };
  },
});

function Notes() {
  const navigate = useNavigate();
  const { client, campaign, notes } = useLoaderData({ from: Route.id });
  const [noteList, setNoteList] = useState(notes.data);
  const [createOpen, setCreateOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    client.models.Note.observeQuery({
      filter: {
        campaignId: { eq: campaign.id },
      },
    }).subscribe({
      next: ({ items, isSynced }) => {
        if (isSynced) {
          setNoteList(items);
        }
      },
    });
  }, []);

  function deleteNote(id: string) {
    client.models.Note.delete({ id });
  }

  return (
    <>
      <CreateNoteModal visible={createOpen} setVisible={setCreateOpen} />
      <EditNoteModal visible={editOpen} setVisible={setEditOpen} note={selectedNote} />
      <Cards
        header={
          <Header variant='awsui-h1-sticky' actions={<Button onClick={() => setCreateOpen(true)}>Create note</Button>}>
            {campaign.name} notes
          </Header>
        }
        ariaLabels={{
          itemSelectionLabel: (_e, t) => `select ${t.name}`,
          selectionGroupLabel: 'Item selection',
        }}
        cardDefinition={{
          header: (item) => (
            <Header
              variant='h3'
              actions={
                <SpaceBetween direction='horizontal' size='xs'>
                  <Button
                    variant='icon'
                    iconName='edit'
                    onClick={() => {
                      setEditOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant='icon'
                    iconName='delete-marker'
                    onClick={() => {
                      deleteNote(item.id);
                    }}
                  >
                    Delete
                  </Button>
                </SpaceBetween>
              }
            >
              {item.name}
            </Header>
          ),
          sections: [
            {
              id: 'description',
              content: (item) => item.description,
            },
          ],
        }}
        cardsPerRow={[{ cards: 1 }]}
        items={noteList}
        loadingText='Loading resources'
        stickyHeader
        variant='full-page'
        empty={
          <Box margin={{ vertical: 'xs' }} textAlign='center' color='inherit'>
            <SpaceBetween size='m'>
              <b>No resources</b>
              <Button>Create resource</Button>
            </SpaceBetween>
          </Box>
        }
        filter={<TextFilter filteringPlaceholder='Find note' filteringText={''} />}
      />
    </>
  );
}

type CreateNoteModalProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

function CreateNoteModal({ visible, setVisible }: CreateNoteModalProps) {
  const { client, campaign, notes } = useLoaderData({ from: Route.id });
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function addNote() {
    client.models.Note.create({
      name,
      description,
      campaignId: campaign.id,
    });
  }

  function clear() {
    setName('');
    setDescription('');
  }

  return (
    <Modal
      onDismiss={() => setVisible(false)}
      visible={visible}
      footer={
        <Box float='right'>
          <SpaceBetween direction='horizontal' size='xs'>
            <Button
              variant='link'
              onClick={() => {
                clear();
                setVisible(false);
              }}
            >
              Cancel
            </Button>
            <Button variant='primary' onClick={addNote}>
              Ok
            </Button>
          </SpaceBetween>
        </Box>
      }
      header='Create note'
    >
      <form onSubmit={(e) => e.preventDefault()}>
        <Form header={<Header variant='h2'>Add note</Header>}>
          <SpaceBetween size='l'>
            <FormField label='Name'>
              <Input
                onChange={({ detail }) => {
                  setName(detail.value);
                }}
                value={name}
                placeholder='A powerful name'
              />
            </FormField>
            <FormField label='Generated ID'>
              <Textarea onChange={({ detail }) => setDescription(detail.value)} value={description} placeholder='A beautiful description' />
            </FormField>
          </SpaceBetween>
        </Form>
      </form>
    </Modal>
  );
}

type EditNoteModalProps = {
  note: any;
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

function EditNoteModal({ note, visible, setVisible }: EditNoteModalProps) {
  const { client } = useLoaderData({ from: Route.id });

  const [name, setName] = useState(note?.name || '');
  const [description, setDescription] = useState(note?.description || '');

  function editNote() {
    client.models.Note.update({
      id: note.id,
      name,
      description,
    });
  }

  return (
    <Modal
      onDismiss={() => {
        setVisible(false);
      }}
      visible={visible}
      footer={
        <Box float='right'>
          <SpaceBetween direction='horizontal' size='xs'>
            <Button
              variant='link'
              onClick={() => {
                setVisible(false);
              }}
            >
              Cancel
            </Button>
            <Button variant='primary' onClick={editNote}>
              Save
            </Button>
          </SpaceBetween>
        </Box>
      }
      header='Edit note'
    >
      <form onSubmit={(e) => e.preventDefault()}>
        <Form header={<Header variant='h2'>Edit note</Header>}>
          <SpaceBetween size='l'>
            <FormField label='Name'>
              <Input
                onChange={({ detail }) => {
                  setName(detail.value);
                }}
                value={name}
                placeholder='A powerful name'
              />
            </FormField>
            <FormField label='Generated ID'>
              <Textarea onChange={({ detail }) => setDescription(detail.value)} value={description} placeholder='A beautiful description' />
            </FormField>
          </SpaceBetween>
        </Form>
      </form>
    </Modal>
  );
}
