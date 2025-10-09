import React from 'react';
import { Mail } from 'lucide-react';

const ZohoFormTrigger = ({ 
  className = "", 
  children = "Subscribe Now", 
  variant = "primary",
  size = "md" 
}) => {
  const handleClick = () => {
    // Open Zoho form in a new tab instead of popup
    window.open('https://forms.worksocial.in/WorkSocialIndia/form/SubscriberForm/formperma/e3gJZqZ66wGw1tzNbgvwiH3C5vv6r9noYo9aVXgZjD0', '_blank', 'noopener,noreferrer');
  };

  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
    warning: "bg-yellow-600 hover:bg-yellow-700 text-white"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl"
  };

  return (
    <button
      onClick={handleClick}
      className={`
        inline-flex items-center justify-center
        ${variants[variant]}
        ${sizes[size]}
        font-semibold rounded-lg
        transition-all duration-200
        hover:scale-105 hover:shadow-lg
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        ${className}
      `}
    >
      <Mail className="w-4 h-4 mr-2" />
      {children}
    </button>
  );
};

export default ZohoFormTrigger;