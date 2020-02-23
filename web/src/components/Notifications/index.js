import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { MdNotifications } from 'react-icons/md';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import {
  Container,
  Badge,
  NotificationList,
  Notification,
  Scroll,
} from './styles';

function Notifications() {
  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const hasUnreadNotification = useMemo(
    () => !!notifications.find(n => !n.read),
    [notifications]
  );

  useEffect(() => {
    const componentDidMount = async () => {
      try {
        const res = await api.get('notifications');

        const data = res.data.map(notification => ({
          ...notification,
          timeDistance: formatDistance(
            parseISO(notification.createdAt),
            new Date(),
            { addSuffix: true, locale: pt }
          ),
        }));

        setNotifications(data);
      } catch (err) {
        toast.error('Error getting notifications!');
      }
    };
    componentDidMount();
  }, []);

  const handleMarkAsRead = async id => {
    const notification = notifications.find(n => n._id === id);
    if (notification.read) return;
    await api.put(`notifications/${id}`);

    setNotifications(
      notifications.map(n => (n._id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <Container>
      <Badge
        hasUnread={hasUnreadNotification}
        onClick={() => setVisible(!visible)}
      >
        <MdNotifications color="#7159c1" size={20} />
      </Badge>

      <NotificationList visible={visible}>
        <Scroll>
          {notifications.map(notification => (
            <Notification key={notification._id} unread={!notification.read}>
              <p>{notification.content}</p>
              <time>{notification.timeDistance}</time>
              {!notification.read && (
                <button
                  type="button"
                  onClick={() => handleMarkAsRead(notification._id)}
                >
                  Mark as read
                </button>
              )}
            </Notification>
          ))}
        </Scroll>
      </NotificationList>
    </Container>
  );
}

export default Notifications;
