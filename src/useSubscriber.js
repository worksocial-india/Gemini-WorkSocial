import { useContext } from 'react';
import { SubscriberContext } from './contexts/SubscriberContext';

export const useSubscriber = () => {
  const context = useContext(SubscriberContext);
  if (!context) {
    throw new Error('useSubscriber must be used within a SubscriberProvider');
  }
  return context;
};