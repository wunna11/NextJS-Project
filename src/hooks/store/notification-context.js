import React, { createContext, useEffect, useState } from 'react';

const NotificationContext = createContext({
  notification: null, // { title, message, status }
  showNotification: (notificationData) => {},
  hideNotification: () => {},
});

export function NotificationContextProvider(props) {
  const [activeNoti, setActiveNoti] = useState();

  console.log('activeNoti', activeNoti);

  useEffect(() => {
    if (
      activeNoti &&
      (activeNoti.status === 'success' || activeNoti.status === 'error')
    ) {
      const timer = setTimeout(() => {
        setActiveNoti(null);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNoti]);

  const showNotiHandler = (notificationData) => {
    setActiveNoti(notificationData);
  };

  const hideNotiHandler = () => {
    setActiveNoti(null);
  };

  const context = {
    notification: activeNoti,
    showNotification: showNotiHandler,
    hideNotification: hideNotiHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
