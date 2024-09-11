import { Box, Button, Cards, Header, Link, SpaceBetween, TextFilter } from '@cloudscape-design/components';
import { createFileRoute } from '@tanstack/react-router';

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
      notes: await context.client.models.Note.list({
        filter: {
          campaignId: { eq: campaignId },
        },
      }),
    };
  },
});

function Notes() {
  return (
    <Cards
      ariaLabels={{
        itemSelectionLabel: (_e, t) => `select ${t.name}`,
        selectionGroupLabel: 'Item selection',
      }}
      cardDefinition={{
        header: (item) => (
          <Link href='#' fontSize='heading-m'>
            {item.name}
          </Link>
        ),
        sections: [
          {
            id: 'description',
            content: (item) => item.description,
          },
        ],
      }}
      cardsPerRow={[{ cards: 1 }]}
      items={[
        {
          name: 'Item 1',
          alt: 'First',
          description: 'This is the first item',
          type: '1A',
          size: 'Small',
        },
        {
          name: 'Item 2',
          alt: 'Second',
          description: 'This is the second item',
          type: '1B',
          size: 'Large',
        },
        {
          name: 'Item 3',
          alt: 'Third',
          description: 'This is the third item',
          type: '1A',
          size: 'Large',
        },
        {
          name: 'Item 4',
          alt: 'Fourth',
          description: 'This is the fourth item',
          type: '2A',
          size: 'Small',
        },
        {
          name: 'Item 5',
          alt: 'Fifth',
          description: 'This is the fifth item',
          type: '2A',
          size: 'Large',
        },
        {
          name: 'Item 6',
          alt: 'Sixth',
          description: 'This is the sixth item',
          type: '1A',
          size: 'Small',
        },
      ]}
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
      header={<Header variant='awsui-h1-sticky'>All notes</Header>}
    />
  );
}
