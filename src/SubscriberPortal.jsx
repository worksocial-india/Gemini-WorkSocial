import React from 'react';
import { useSubscriber } from './useSubscriber';
import SubscriberAuth from './SubscriberAuth';
import SubscriberDashboard from './SubscriberDashboard';

const ContentAccessCard = ({ title, description }) => {
  return (
    <div className="p-6 rounded-lg border-2 border-green-200 bg-green-50 hover:shadow-lg transition-all">
      <div className="flex items-start mb-4">
        <Icon className="w-8 h-8 mr-3 text-green-600" />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        </div>
      </div>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};

const SubscriberPortal = () => {
  const { isLoggedIn, isLoading } = useSubscriber();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading subscriber portal...</p>
        </div>
      </div>
    );
  }

  return isLoggedIn ? <SubscriberDashboard /> : <SubscriberAuth />;
};

export default SubscriberPortal;