import { useState, useCallback } from 'react';

const useNotification = () => {
  const [notification, setNotification] = useState({
    isVisible: false,
    message: '',
    type: 'success',
    duration: 3000
  });

  const showNotification = useCallback((message, type = 'success', duration = 3000) => {
    setNotification({
      isVisible: true,
      message,
      type,
      duration
    });
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(prev => ({
      ...prev,
      isVisible: false
    }));
  }, []);

  const showSuccess = useCallback((message, type = 'success', duration = 3000) => {
    showNotification(message, type, duration);
  }, [showNotification]);

  const showError = useCallback((message, duration = 5000) => {
    showNotification(message, 'error', duration);
  }, [showNotification]);

  const showWarning = useCallback((message, duration = 4000) => {
    showNotification(message, 'warning', duration);
  }, [showNotification]);

  const showInfo = useCallback((message, duration = 3000) => {
    showNotification(message, 'info', duration);
  }, [showNotification]);

  const showDelete = useCallback((message, duration = 5000) => {
    showNotification(message, 'delete', duration);
  }, [showNotification]);

  return {
    notification,
    showNotification,
    hideNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showDelete
  };
};

export default useNotification;
