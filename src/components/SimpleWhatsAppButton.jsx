import React from 'react';
import { MessageCircle } from 'lucide-react';

const SimpleWhatsAppButton = ({ 
  phoneNumber = "918882371688", 
  message = "Hi! I'm interested in WorkSocial services. Can you help me?",
  className = "" 
}) => {
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className={`fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 z-50 group ${className}`}
      title="Chat with us on WhatsApp"
    >
      <MessageCircle size={24} />
      
      {/* Online indicator */}
      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap">
        Need help? Chat with us!
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
      </div>
    </button>
  );
};

export default SimpleWhatsAppButton;