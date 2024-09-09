import { Button, Container, ContentLayout, Form, FormField, Header, Input, SpaceBetween } from '@cloudscape-design/components';
import { createFileRoute } from '@tanstack/react-router';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';

import { useState } from 'react';

export const Route = createFileRoute('/')({
  component: Index,
});

const client = generateClient<Schema>({
  authMode: 'userPool',
});

function Index() {
  const [campaignName, setCampaignName] = useState('');

  async function createCampaign() {
    const res = await client.models.Campaign.create({
      name: campaignName,
    });
    console.debug(res);
    setCampaignName('');
  }

  return (
    <ContentLayout defaultPadding header={<Header variant='h1'>Welcome!</Header>}>
      <SpaceBetween direction='vertical' size='m'>
        <Container>
          To get started, select a campaign using the dropdown at the top of the page or create a new campaign with the form below.
        </Container>
        <Container header={<Header>New campaign</Header>}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createCampaign();
            }}
          >
            <Form
              actions={
                <Button variant='primary' formAction='submit' disabled={campaignName.length < 1}>
                  Create
                </Button>
              }
            >
              <FormField label='Name'>
                <Input value={campaignName} onChange={(event) => setCampaignName(event.detail.value)} placeholder='The holy crusade' />
              </FormField>
            </Form>
          </form>
        </Container>
      </SpaceBetween>
    </ContentLayout>
  );
}
