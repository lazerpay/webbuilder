import React from 'react';
import { Notification } from '@mantine/core';
import { NotificationState } from '../../hooks/useNotification';

interface NotificationToastProps {
  notification: NotificationState;
  onClose: () => void;
  position?: {
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
  };
}

export function NotificationToast({ 
  notification, 
  onClose, 
  position = { top: '20px', right: '20px' } 
}: NotificationToastProps) {
  if (!notification.show) return null;

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 10000,
        ...position,
      }}
    >
      <Notification
        icon={notification.icon}
        color={notification.color}
        title={notification.title}
        onClose={onClose}
        withCloseButton
        style={{
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15)',
          border: `1px solid rgba(34, 197, 94, 0.2)`,
        }}
      >
        {notification.message}
      </Notification>
    </div>
  );
}