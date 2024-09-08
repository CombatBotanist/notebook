import { Authenticator } from '@aws-amplify/ui-react';
import AppLayout from '@cloudscape-design/components/app-layout';
import SideNavigation from '@cloudscape-design/components/side-navigation';
import TopNavigation from '@cloudscape-design/components/top-navigation';
import { createRootRoute, Outlet, useNavigate } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';
import Select, { SelectProps } from '@cloudscape-design/components/select';
import { useState } from 'react';

export const Route = createRootRoute({
  component: () => (
    <>
      <Layout />
      <TanStackRouterDevtools />
    </>
  ),
});

Amplify.configure(outputs);

function Layout() {
  const navigate = useNavigate();
  const [campaign, setCampaign] = useState<SelectProps.Option>({ label: 'Option 1', value: '1' });

  function onFollowHandler(href: string) {
    navigate({
      to: href,
    });
  }

  return (
    <Authenticator variation='default' loginMechanism='email'>
      {({ signOut, user }) => (
        <>
          <div id='top-navigation'>
            <TopNavigation
              identity={{
                href: '/',
                title: 'Notebook',
                onFollow: () => {
                  onFollowHandler('/');
                },
              }}
              utilities={[
                {
                  type: 'menu-dropdown',
                  text: user?.signInDetails?.loginId,
                  items: [
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
                    }
                  },
                },
              ]}
              search={
                <Select
                  selectedOption={campaign}
                  onChange={({ detail }) => setCampaign(detail.selectedOption)}
                  options={[
                    { label: 'Option 1', value: '1' },
                    { label: 'Option 2', value: '2' },
                    { label: 'Option 3', value: '3' },
                    { label: 'Option 4', value: '4' },
                    { label: 'Option 5', value: '5' },
                  ]}
                />
              }
            />
          </div>
          <AppLayout
            headerSelector='#top-navigation'
            navigation={
              <SideNavigation
                items={[
                  {
                    type: 'section-group',
                    title: 'Notes',
                    items: [
                      { type: 'link', text: 'All', href: '/notes' },
                      { type: 'link', text: 'Person', href: '/notes' },
                      { type: 'link', text: 'Place', href: '/notes' },
                      { type: 'link', text: 'Thing', href: '/notes' },
                      { type: 'link', text: 'Idea', href: '/notes' },
                    ],
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
