// src/components/FormSelector/hooks/useNotification.ts
import { useState } from 'react';
import { NotificationProps } from '../types';

/**
 * Custom hook để quản lý các thông báo
 * @returns Các phương thức và state để quản lý thông báo
 */
const useNotification = () => {
  const [notifications, setNotifications] = useState<NotificationProps[]>([]);
  const [notificationCounter, setNotificationCounter] = useState<number>(0);

  /**
   * Hiển thị thông báo mới
   * @param type Loại thông báo (success, error, warning)
   * @param message Nội dung thông báo
   */
  const showNotification = (type: 'success' | 'error' | 'warning', message: string) => {
    const id = notificationCounter;
    setNotificationCounter(prev => prev + 1);
    
    // Thêm notification mới
    setNotifications(prev => [...prev, { type, message, id }]);
    
    // Tự động xóa notification sau 5 giây
    setTimeout(() => {
      setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, 5000);
  };

  /**
   * Xóa một thông báo cụ thể
   * @param id ID của thông báo cần xóa
   */
  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  /**
   * Xóa tất cả thông báo
   */
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  return {
    notifications,
    showNotification,
    removeNotification,
    clearAllNotifications
  };
};

export default useNotification;