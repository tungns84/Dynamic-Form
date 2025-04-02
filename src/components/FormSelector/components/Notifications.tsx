// src/components/FormSelector/components/Notifications.tsx
import React from 'react';
import { NotificationsProps } from '../types';

/**
 * Component hiển thị các thông báo
 */
const Notifications: React.FC<NotificationsProps> = ({ notifications }) => {
  if (notifications.length === 0) return null;

  return (
    <div className="notifications-container position-fixed top-0 end-0 p-3" style={{ zIndex: 1060 }}>
      {notifications.map(notification => {
        // Xác định class dựa trên loại thông báo
        const alertClass = notification.type === 'success'
          ? 'alert-success'
          : notification.type === 'error'
            ? 'alert-danger'
            : 'alert-warning';
        
        // Icon cho từng loại thông báo
        const iconClass = notification.type === 'success'
          ? 'bi-check-circle-fill'
          : notification.type === 'error'
            ? 'bi-x-circle-fill'
            : 'bi-exclamation-triangle-fill';
        
        return (
          <div 
            key={notification.id} 
            className={`alert ${alertClass} d-flex align-items-center`}
            role="alert"
            style={{ 
              maxWidth: '350px', 
              boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
              animation: 'fadeInRight 0.3s ease-out'
            }}
          >
            <i className={`bi ${iconClass} me-2`}></i>
            <div>{notification.message}</div>
          </div>
        );
      })}
      
      {/* Thêm animation cho notifications */}
      <style>
        {`
          @keyframes fadeInRight {
            from { opacity: 0; transform: translateX(20px); }
            to { opacity: 1; transform: translateX(0); }
          }
        `}
      </style>
    </div>
  );
};

export default Notifications;