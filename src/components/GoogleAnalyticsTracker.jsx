import React from 'react';
import { useGoogleAnalytics } from '../hooks/useGoogleAnalytics';

const GoogleAnalyticsTracker = () => {
  useGoogleAnalytics();
  return null; // This component doesn't render anything
};

export default GoogleAnalyticsTracker;