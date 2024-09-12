import { Box, Button, Cards, Header, Link, SpaceBetween, TextFilter } from '@cloudscape-design/components';
import { createFileRoute, useLoaderData, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/$campaign/notes')({
  component: Notes,
  loader: async ({ context, params }) => {
    const campaign = await context.client.models.Campaign.list({
      filter: {
        name: { eq: params.campaign },
      },
    });
    return {
      client: context.client,
      campaign: campaign.data[0],
      notes: await context.client.models.Note.list({
        filter: {
          campaignId: { eq: campaign.data[0].id },
        },
      }),
    };
  },
});

function Notes() {
  const navigate = useNavigate();
  const { client, campaign, notes } = useLoaderData({ from: Route.id });
  const [noteList, setNoteList] = useState(notes.data);

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
      {/* <CreateNoteModal visible={true} setVisible={() => {}} /> */}
      <Cards
        header={
          <Header
            variant='awsui-h1-sticky'
            actions={
              <Button
                onClick={() =>
                  navigate({
                    to: '/$campaign/notes/create',
                    params: { campaign: campaign.name },
                  })
                }
              >
                Create note
              </Button>
            }
          >
            {campaign.friendlyName} notes
          </Header>
        }
        ariaLabels={{
          itemSelectionLabel: (_e, t) => `select ${t.name}`,
          selectionGroupLabel: 'Item selection',
        }}
        cardDefinition={{
          header: (note) => (
            <Header
              actions={
                <Button
                  variant='icon'
                  iconName='remove'
                  onClick={() => {
                    deleteNote(note.id);
                  }}
                >
                  Delete
                </Button>
              }
            >
              <Link
                fontSize='heading-m'
                onFollow={(e) => {
                  e.preventDefault();
                  navigate({
                    to: '/$campaign/$note',
                    params: {
                      campaign: campaign.name,
                      note: note.name,
                    },
                  });
                }}
              >
                {note.friendlyName}
              </Link>
            </Header>
          ),
          sections: [
            {
              id: 'description',
              content: (note) => note.description,
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
              <Button
                onClick={() =>
                  navigate({
                    to: '/$campaign/notes/create',
                    params: { campaign: campaign.name },
                  })
                }
              >
                Create note
              </Button>
            </SpaceBetween>
          </Box>
        }
        filter={<TextFilter filteringPlaceholder='Find note' filteringText={''} />}
      />
    </>
  );
}

// type CreateNoteModalProps = {
//   visible: boolean;
//   setVisible: (visible: boolean) => void;
// };

// function CreateNoteModal({ visible, setVisible }: CreateNoteModalProps) {
//   const { client, campaign } = useLoaderData({ from: Route.id });
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');

//   function addNote() {
//     client.models.Note.create({
//       name,
//       friendlyName: name,
//       description,
//       campaignId: campaign.id,
//     });
//   }

//   function clear() {
//     setName('');
//     setDescription('');
//   }

//   return (
//     <Modal
//       onDismiss={() => setVisible(false)}
//       visible={visible}
//       footer={
//         <Box float='right'>
//           <SpaceBetween direction='horizontal' size='xs'>
//             <Button
//               variant='link'
//               onClick={() => {
//                 clear();
//                 setVisible(false);
//               }}
//             >
//               Cancel
//             </Button>
//             <Button variant='primary' onClick={addNote}>
//               Ok
//             </Button>
//           </SpaceBetween>
//         </Box>
//       }
//       header='Create note'
//     >
//       <form onSubmit={(e) => e.preventDefault()}>
//         <Form>
//           <SpaceBetween size='l'>
//             <FormField label='Name'>
//               <Input
//                 onChange={({ detail }) => {
//                   setName(detail.value);
//                 }}
//                 value={name}
//                 placeholder='A powerful name'
//               />
//             </FormField>
//             <FormField label='Generated ID'>
//               <Textarea onChange={({ detail }) => setDescription(detail.value)} value={description} placeholder='A beautiful description' />
//             </FormField>
//           </SpaceBetween>
//         </Form>
//       </form>
//     </Modal>
//   );
// }

// type EditNoteModalProps = {
//   note: any;
//   visible: boolean;
//   setVisible: (visible: boolean) => void;
// };

// function EditNoteModal({ note, visible, setVisible }: EditNoteModalProps) {
//   const { client } = useLoaderData({ from: Route.id });

//   const [name, setName] = useState(note?.name || '');
//   const [description, setDescription] = useState(note?.description || '');

//   function editNote() {
//     client.models.Note.update({
//       id: note.id,
//       name,
//       description,
//     });
//   }

//   return (
//     <Modal
//       onDismiss={() => {
//         setVisible(false);
//       }}
//       visible={visible}
//       footer={
//         <Box float='right'>
//           <SpaceBetween direction='horizontal' size='xs'>
//             <Button
//               variant='link'
//               onClick={() => {
//                 setVisible(false);
//               }}
//             >
//               Cancel
//             </Button>
//             <Button variant='primary' onClick={editNote}>
//               Save
//             </Button>
//           </SpaceBetween>
//         </Box>
//       }
//       header='Edit note'
//     >
//       <form onSubmit={(e) => e.preventDefault()}>
//         <Form>
//           <SpaceBetween size='l'>
//             <FormField label='Name'>
//               <Input
//                 onChange={({ detail }) => {
//                   setName(detail.value);
//                 }}
//                 value={name}
//                 placeholder='A powerful name'
//               />
//             </FormField>
//             <FormField label='Generated ID'>
//               <Textarea onChange={({ detail }) => setDescription(detail.value)} value={description} placeholder='A beautiful description' />
//             </FormField>
//           </SpaceBetween>
//         </Form>
//       </form>
//     </Modal>
//   );
// }
