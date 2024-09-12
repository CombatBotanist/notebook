import { Box, Button, Header, Input, Link, Modal, SpaceBetween, Spinner, Table } from '@cloudscape-design/components';
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

  const [selectedCampaign, setSelectedCampaign] = useState<Schema['Campaign']['type'] | null>(null);
  const [selectedNotes, setSelectedNotes] = useState<Schema['Note']['type'][] | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [confirmationText, setConfirmationText] = useState('');

  useEffect(() => {
    client.models.Campaign.observeQuery().subscribe({
      next: ({ items, isSynced }) => {
        if (isSynced) {
          setCampaignList(items);
        }
      },
    });
  }, []);

  useEffect(() => {
    if (selectedCampaign) {
      const notes = client.models.Note.list({
        filter: {
          campaignId: { eq: selectedCampaign.id },
        },
      });
      notes.then((res) => {
        setSelectedNotes(res.data);
      });
    }
  }, [selectedCampaign]);

  async function deleteCampaign(campaign: Schema['Campaign']['type']) {
    const campaignNotes = await client.models.Note.list({
      filter: {
        campaignId: { eq: campaign.id },
      },
    });
    const res = await Promise.all(campaignNotes.data.map((note) => client.models.Note.delete({ id: note.id })));
    console.debug('Deleted notes:', res);
    const res2 = await client.models.Campaign.delete({ id: campaign.id });
    console.debug('Deleted campaign:', res2);
  }

  return (
    <>
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
              <Button
                variant='inline-link'
                onClick={() => {
                  setSelectedCampaign(item);
                  setDeleteModalVisible(true);
                }}
              >
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
      <Modal
        onDismiss={() => setDeleteModalVisible(false)}
        visible={deleteModalVisible}
        header='Confirm delete'
        footer={
          <Box float='right'>
            <SpaceBetween direction='horizontal' size='xs'>
              <Button
                variant='link'
                onClick={() => {
                  setDeleteModalVisible(false);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (selectedCampaign) {
                    deleteCampaign(selectedCampaign);
                  }
                  setDeleteModalVisible(false);
                }}
                disabled={confirmationText !== selectedCampaign?.friendlyName}
              >
                Delete
              </Button>
            </SpaceBetween>
          </Box>
        }
      >
        <SpaceBetween size='xs'>
          <Box variant='strong'>
            Are you sure you want to delete the {selectedCampaign?.friendlyName} campaign? This will also delete{' '}
            {selectedNotes ? selectedNotes?.length : <Spinner size='normal' />} notes.
          </Box>
          <Box variant='div'>
            Type{' '}
            <span
              style={{
                fontStyle: 'italic',
              }}
            >
              {selectedCampaign?.friendlyName}
            </span>{' '}
            in the box below to confirm deletion.
          </Box>
          <Input onChange={({ detail }) => setConfirmationText(detail.value)} value={confirmationText} />
        </SpaceBetween>
      </Modal>
    </>
  );
}
