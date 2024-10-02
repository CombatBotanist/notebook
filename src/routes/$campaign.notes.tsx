import { Box, Button, Cards, Header, Link, SpaceBetween, TextFilter, type TextFilterProps } from '@cloudscape-design/components';
import { createFileRoute, useLoaderData, useNavigate } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

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
  const filterRef = useRef<TextFilterProps.Ref>(null);
  const { client, campaign, notes } = useLoaderData({ from: Route.id });
  const [noteList, setNoteList] = useState(notes.data);
  const [filter, setFilter] = useState('');

  useHotkeys('alt+c', () => {
    navigate({
      to: '/$campaign/notes/create',
      params: { campaign: campaign.name },
    });
  });
  useHotkeys('alt+S', () => {
    if (filterRef.current) {
      filterRef.current.focus();
    }
  });

  useEffect(() => {
    if (filterRef.current) {
      filterRef.current.focus();
    }

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

  useEffect(() => {
    if (filter === '') {
      setNoteList(notes.data);
    } else {
      setNoteList(notes.data.filter((n) => n.friendlyName.toLowerCase().includes(filter.toLowerCase())));
    }
  }, [filter]);

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
              {' - '}
              <Box color='text-body-secondary' variant='span'>
                {note.type}
              </Box>
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
        filter={
          <TextFilter
            ref={filterRef}
            filteringPlaceholder='Find note'
            filteringText={filter}
            onChange={({ detail }) => {
              setFilter(detail.filteringText);
            }}
          />
        }
      />
    </>
  );
}
