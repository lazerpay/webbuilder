import { useState } from 'react';

export interface NotificationState {
  show: boolean;
  message: string;
  title?: string;
  color?: string;
  icon?: React.ReactNode;
}

/**
 * Custom hook for managing notification state with auto-hide functionality
 */
export function useNotification(defaultDuration: number = 3000) {
  const [notification, setNotification] = useState<NotificationState>({
    show: false,
    message: '',
  });

  const showNotification = (
    message: string,
    options?: {
      title?: string;
      color?: string;
      icon?: React.ReactNode;
      duration?: number;
    }
  ) => {
    setNotification({
      show: true,
      message,
      title: options?.title,
      color: options?.color || 'green',
      icon: options?.icon,
    });

    const duration = options?.duration ?? defaultDuration;
    if (duration > 0) {
      setTimeout(() => {
        hideNotification();
      }, duration);
    }
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, show: false }));
  };

  return {
    notification,
    showNotification,
    hideNotification,
  };
}