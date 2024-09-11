import { Box, Button, Header, Link, SpaceBetween, Table } from '@cloudscape-design/components';
import { createFileRoute, useLoaderData, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
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
  const navigate = useNavigate();
  const { client, campaigns } = useLoaderData({ from: Route.id });
  const [campaignList, setCampaignList] = useState(campaigns.data);

  useEffect(() => {
    client.models.Campaign.observeQuery().subscribe({
      next: ({ items, isSynced }) => {
        if (isSynced) {
          setCampaignList(items);
        }
      },
    });
  }, []);

  async function deleteCampaign(campaign: Schema['Campaign']['type']) {
    await client.models.Campaign.delete({ id: campaign.id });
  }

  return (
    <Table
      variant='full-page'
      renderAriaLive={({ firstIndex, lastIndex, totalItemsCount }) =>
        `Displaying items ${firstIndex} to ${lastIndex} of ${totalItemsCount}`
      }
      columnDefinitions={[
        {
          id: 'friendly-name',
          header: 'Friendly name',
          cell: (campaign) => (
            <Link
              onFollow={() => {
                navigate({
                  to: '/$campaign/notes',
                  params: { campaign: campaign.name },
                });
              }}
            >
              {campaign.friendlyName || '-'}
            </Link>
          ),
          sortingField: 'name',
          isRowHeader: true,
        },
        {
          id: 'notes',
          header: 'Notes',
          cell: (campaign) => campaign.notes.length || '-',
        },
        {
          id: 'name',
          header: 'Name',
          cell: (campaign) => campaign.name || '-',
        },
        {
          id: 'id',
          header: 'ID',
          cell: (campaign) => campaign.id || '-',
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
            <b>No campaigns</b>
            <Button
              onClick={() =>
                navigate({
                  to: '/campaigns/create',
                })
              }
            >
              Create campaign
            </Button>
          </SpaceBetween>
        </Box>
      }
      header={
        <Header
          variant='h1'
          actions={
            <Button
              onClick={() =>
                navigate({
                  to: '/campaigns/create',
                })
              }
            >
              Create campaign
            </Button>
          }
        >
          Campaigns
        </Header>
      }
    />
  );
}
