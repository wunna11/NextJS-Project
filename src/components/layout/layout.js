import { Fragment, useContext } from 'react';
import Notification from '../notification/notification';
import MainHeader from './main-header';
import NotificationContext from '../../hooks/store/notification-context';

function Layout(props) {
  const notificationCtx = useContext(NotificationContext);
  const activeNotification = notificationCtx.notification;
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {/* <Notification title="Hello" message="Pending" status="error" /> */}
      {activeNotification && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </Fragment>
  );
}

export default Layout;
