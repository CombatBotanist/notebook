import { Box, Button, Header, Link, SpaceBetween, Table } from '@cloudscape-design/components';
import { createFileRoute, useLoaderData } from '@tanstack/react-router';
import { useState } from 'react';
import type { Schema } from '../../amplify/data/resource';
import CenteredSpinner from '../components/CenteredSpinner';

export const Route = createFileRoute('/campaigns')({
  component: Campaigns,
  loader: async ({ context }) => {
    return {
      client: context.client,
      campaigns: await context.client.models.Campaign.list(),
    };
  },
  pendingComponent: CenteredSpinner,
});

function Campaigns() {
  const { client, campaigns } = useLoaderData({ from: Route.id });
  const [campaignList, setCampaignList] = useState(campaigns.data);

  async function deleteCampaign(campaign: Schema['Campaign']['type']) {
    const res = await client.models.Campaign.delete({ id: campaign.id });
    client.models.Campaign.list().then((res) => setCampaignList(res.data));
  }

  return (
    <Table
      renderAriaLive={({ firstIndex, lastIndex, totalItemsCount }) =>
        `Displaying items ${firstIndex} to ${lastIndex} of ${totalItemsCount}`
      }
      columnDefinitions={[
        {
          id: 'name',
          header: 'Name',
          cell: (item) => <Link href='#'>{item.name || '-'}</Link>,
          sortingField: 'name',
          isRowHeader: true,
        },
        {
          id: 'notes',
          header: 'Notes',
          cell: (item) => item.notes.length || '-',
        },
        {
          id: 'id',
          header: 'ID',
          cell: (item) => item.id || '-',
        },
        {
          id: 'actions',
          header: 'Actions',
          cell: (item) => (
            <Button variant='inline-link' onClick={() => deleteCampaign(item)}>
              Delete
            </Button>
          ),
        },
      ]}
      enableKeyboardNavigation
      items={campaignList}
      loadingText='Loading resources'
      sortingDisabled
      empty={
        <Box margin={{ vertical: 'xs' }} textAlign='center' color='inherit'>
          <SpaceBetween size='m'>
            <b>No resources</b>
            <Button>Create resource</Button>
          </SpaceBetween>
        </Box>
      }
      header={<Header> Simple table </Header>}
    />
  );
}
