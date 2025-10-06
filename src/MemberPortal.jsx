import React from 'react';
import { useMember } from './hooks/useMember';
import MemberAuth from './MemberAuth';
import MemberDashboard from './MemberDashboard';
import { Loader } from 'lucide-react';

const MemberPortal = () => {
  const { isLoggedIn, isLoading } = useMember();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white p-4 rounded-full w-16 h-16 mx-auto mb-4 shadow-lg flex items-center justify-center">
            <Loader className="text-blue-600 animate-spin" size={24} />
          </div>
          <p className="text-gray-600">Loading member portal...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <MemberAuth />;
  }

  return <MemberDashboard />;
};

export default MemberPortal;