import React, { useEffect } from 'react';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import './NotificationBanner.css';

const NotificationBanner = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;
  return (
    <div className={`notification-banner ${type} animate__animated animate__fadeInDown`}>
      {type === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />} {message}
    </div>
  );
};

export default NotificationBanner;
