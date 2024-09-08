import AppLayout from '@cloudscape-design/components/app-layout';
import SideNavigation from '@cloudscape-design/components/side-navigation';
import { Outlet } from '@tanstack/react-router';

export default function Layout() {
  return (
    <AppLayout
      navigationOpen={true}
      // navigation={
      //   <SideNavigation
      //     header={{
      //       href: '#',
      //       text: 'Service name',
      //     }}
      //     items={[{ type: 'link', text: `Page #1`, href: `#` }]}
      //   />
      // }
      toolsHide={true}
      content={<Outlet />}
    />
  );
}
