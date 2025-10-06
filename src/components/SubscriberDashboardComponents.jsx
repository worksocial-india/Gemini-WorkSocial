import React from 'react';

export const ContentAccessCard = ({ title, description, icon: Icon }) => {
  const hasAccess = true;
  
  return (
    <div className={`p-6 rounded-lg border-2 transition-all ${
      hasAccess 
        ? 'border-green-200 bg-green-50 hover:shadow-lg' 
        : 'border-gray-200 bg-gray-50 opacity-60'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <Icon className={`w-8 h-8 mr-3 ${hasAccess ? 'text-green-600' : 'text-gray-400'}`} />
          <div>
            <h3 className={`text-lg font-semibold ${hasAccess ? 'text-gray-900' : 'text-gray-500'}`}>
              {title}
            </h3>
          </div>
        </div>
        {hasAccess ? (
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            Available
          </span>
        ) : (
          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
            Upgrade Required
          </span>
        )}
      </div>
      <p className={`text-sm ${hasAccess ? 'text-gray-600' : 'text-gray-400'}`}>
        {description}
      </p>
    </div>
  );
};

export const StatCard = ({ title, value, color = 'blue' }) => (
  <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className={`text-2xl font-bold text-${color}-600 mt-1`}>{value}</p>
      </div>
      
    </div>
  </div>
);
