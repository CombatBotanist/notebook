import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { AppLayout, Select, SideNavigation, TopNavigation } from '@cloudscape-design/components';
import type { SelectProps } from '@cloudscape-design/components/select';
import * as awsui from '@cloudscape-design/design-tokens';
import { applyMode, Mode } from '@cloudscape-design/global-styles';
import { createRootRouteWithContext, Outlet, useLoaderData, useNavigate } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { useEffect, useState } from 'react';
import CenteredSpinner from '../components/CenteredSpinner';
import type { Client } from '../main';

interface RouterContext {
  client: Client;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Layout />
      <TanStackRouterDevtools />
    </>
  ),
  loader: ({ context }) => context.client.models.Campaign.list(),
  pendingComponent: CenteredSpinner,
});

function Layout() {
  const navigate = useNavigate();
  const { data: campaigns } = useLoaderData({ from: Route.id });
  const campaignOptions = campaigns.map((campaign) => ({ label: campaign.name, value: campaign.id }));
  const [selectedCampaign, setSelectedCampaign] = useState<SelectProps.Option | null>(() => {
    const selectedCampaign = localStorage.getItem('Notebook.selectedCampaign');
    return selectedCampaign ? JSON.parse(selectedCampaign) : null;
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('Notebook.darkMode') === 'true' ? true : false;
  });
  useEffect(() => {
    localStorage.setItem('Notebook.darkMode', JSON.stringify(darkMode));
    applyMode(darkMode ? Mode.Dark : Mode.Light);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('Notebook.selectedCampaign', JSON.stringify(selectedCampaign));
  }, [selectedCampaign]);

  function onFollowHandler(href: string) {
    const query = href.split('?')[1];
    if (query) {
      const searchParams = Object.fromEntries(new URLSearchParams(query));
      navigate({
        to: href.split('?')[0],
        search: searchParams,
      });
    } else {
      navigate({
        to: href,
      });
    }
  }

  return (
    <Authenticator variation='default' loginMechanism='email'>
      {({ signOut, user }) => (
        <>
          <div
            id='h'
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 1002,
              borderBottom: `1px solid ${awsui.colorBorderDividerDefault}`,
            }}
          >
            <TopNavigation
              identity={{
                href: '/',
                title: 'Notebook',
                onFollow: (e) => {
                  e.preventDefault();
                  onFollowHandler('/');
                },
              }}
              utilities={[
                {
                  type: 'menu-dropdown',
                  text: user?.signInDetails?.loginId,
                  items: [
                    {
                      itemType: 'group',
                      text: 'Theme',
                      items: [
                        {
                          itemType: 'action',
                          text: 'Light',
                          id: 'light-mode',
                        },
                        {
                          itemType: 'action',
                          text: 'Dark',
                          id: 'dark-mode',
                        },
                      ],
                    },
                    {
                      itemType: 'action',
                      text: 'Sign out',
                      id: 'sign-out',
                      disabled: !user,
                    },
                  ],
                  onItemClick: ({ detail }) => {
                    switch (detail.id) {
                      case 'sign-out':
                        signOut ? signOut() : null;
                        break;
                      case 'light-mode':
                        setDarkMode(false);
                        break;
                      case 'dark-mode':
                        setDarkMode(true);
                        break;
                    }
                  },
                },
              ]}
              search={
                <Select
                  selectedOption={selectedCampaign}
                  onChange={({ detail }) => setSelectedCampaign(detail.selectedOption)}
                  options={campaignOptions}
                  placeholder='Choose a campaign'
                  empty='No campaigns found'
                />
              }
            />
          </div>
          <AppLayout
            headerSelector='#h'
            navigation={
              <SideNavigation
                items={[
                  {
                    type: 'section-group',
                    title: 'Notes',
                    items: [
                      { type: 'link', text: 'All', href: '/notes' },
                      { type: 'link', text: 'Person', href: '/notes?type=person' },
                      { type: 'link', text: 'Place', href: '/notes?type=place' },
                      { type: 'link', text: 'Thing', href: '/notes?type=thing' },
                      { type: 'link', text: 'Idea', href: '/notes?type=idea' },
                    ],
                  },
                  {
                    type: 'divider',
                  },
                  {
                    type: 'link',
                    text: 'Campaigns',
                    href: '/campaigns',
                  },
                ]}
                onFollow={(event) => {
                  event.preventDefault();
                  onFollowHandler(event.detail.href);
                }}
              />
            }
            toolsHide={true}
            content={<Outlet />}
          />
        </>
      )}
    </Authenticator>
  );
}
