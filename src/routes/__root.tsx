import { Authenticator } from '@aws-amplify/ui-react';
import AppLayout from '@cloudscape-design/components/app-layout';
import SideNavigation from '@cloudscape-design/components/side-navigation';
import TopNavigation from '@cloudscape-design/components/top-navigation';
import { createRootRoute, Outlet, useNavigate } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';

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
            />
          </div>
          <AppLayout
            headerSelector='#top-navigation'
            navigation={
              <SideNavigation
                items={[{ type: 'link', text: 'Notes', href: '/notes' }]}
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
