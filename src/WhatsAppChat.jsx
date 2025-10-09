import React from 'react';
import WhatsAppDashboard from './components/WhatsAppDashboard';
import ProtectedRoute from './ProtectedRoute';
import { usePageTitle } from './hooks/usePageTitle';

function WhatsAppChat() {
  usePageTitle('WhatsApp Dashboard | WorkSocial');
  
  return (
    <ProtectedRoute>
      <div className="bg-white w-full">
        <WhatsAppDashboard />
      </div>
    </ProtectedRoute>
  );
}

export default WhatsAppChat;