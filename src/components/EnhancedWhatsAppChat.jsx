import React, { useState } from 'react';
import { MessageCircle, X, Send, Download, Share } from 'lucide-react';
import WhatsAppBusinessAPI from '../services/WhatsAppBusinessAPI';

const EnhancedWhatsAppChat = ({ phoneNumber = "918882371688" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [apiMode, setApiMode] = useState(true); // Using API mode by default
  
  const whatsappAPI = new WhatsAppBusinessAPI();

  const predefinedMessages = [
    "Hi! I need help with financial planning",
    "Can you tell me about your calculator tools?", 
    "I want to know about subscription plans",
    "Need assistance with loan calculations",
    "How can WorkSocial help me with investments?",
    "I want to speak to a financial advisor"
  ];

  // Direct WhatsApp link (current method)
  const handleDirectMessage = (customMessage = null) => {
    const messageToSend = customMessage || message;
    if (!messageToSend.trim()) return;
    
    const encodedMessage = encodeURIComponent(messageToSend);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    
    setMessage('');
    setIsOpen(false);
  };

  // API message (requires WhatsApp Business API setup)
  const handleAPIMessage = async (customMessage = null) => {
    const messageToSend = customMessage || message;
    if (!messageToSend.trim()) return;
    
    try {
      await whatsappAPI.sendTextMessage(phoneNumber, messageToSend);
      setMessage('');
      setIsOpen(false);
      alert('Message sent successfully!');
    } catch (error) {
      console.error('Error sending message:', error);
      // Fallback to direct method
      handleDirectMessage(messageToSend);
    }
  };

  const handleSendMessage = apiMode ? handleAPIMessage : handleDirectMessage;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-green-500 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle size={20} />
              </div>
              <div>
                <h3 className="font-semibold">WorkSocial Support</h3>
                <p className="text-xs opacity-90">
                  {apiMode ? 'API Mode' : 'Direct Chat'} • Online
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* API Mode Toggle */}
              <button
                onClick={() => setApiMode(!apiMode)}
                className={`text-xs px-2 py-1 rounded transition-colors ${
                  apiMode ? 'bg-white/20' : 'bg-white/10'
                }`}
                title={apiMode ? 'Switch to Direct Mode' : 'Switch to API Mode'}
              >
                {apiMode ? 'API' : 'Direct'}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-1 rounded transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border-b border-gray-100">
            <p className="text-sm text-gray-700">
              👋 Hello! How can we help you today? 
              {apiMode && (
                <span className="block text-xs text-green-600 mt-1">
                  ✨ Enhanced API mode active
                </span>
              )}
            </p>
          </div>

          {/* Quick Messages */}
          <div className="p-4 border-b border-gray-100 max-h-60 overflow-y-auto">
            <p className="text-sm text-gray-600 mb-3 font-medium">Quick messages:</p>
            <div className="space-y-2">
              {predefinedMessages.map((msg, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(msg)}
                  className="w-full text-left p-3 text-sm bg-gray-50 hover:bg-green-50 hover:border-green-200 rounded-lg transition-all duration-200 border border-gray-200 hover:shadow-sm"
                >
                  {msg}
                </button>
              ))}
              
              {/* Special Calculator Button */}
              <button
                onClick={() => handleSendMessage("I want to share my calculator results with you")}
                className="w-full text-left p-3 text-sm bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-all duration-200 flex items-center gap-2"
              >
                <Share size={16} className="text-blue-600" />
                Share Calculator Results
              </button>
            </div>
          </div>

          {/* Custom Message */}
          <div className="p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={apiMode ? "Type message (API will send)..." : "Type your message..."}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none text-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!message.trim()}
                className="bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
                title={apiMode ? 'Send via API' : 'Open WhatsApp'}
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {apiMode 
                ? '📡 Messages sent directly via WhatsApp Business API' 
                : '🔗 Opens WhatsApp with pre-filled message'
              }
            </p>
          </div>
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group relative"
        title="Chat with us on WhatsApp"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
        
        {/* Online indicator */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
        
        {/* API Mode Indicator */}
        {apiMode && (
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 rounded-full border border-white"></div>
        )}
        
        {/* Tooltip when closed */}
        {!isOpen && (
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap">
            Need help? Chat with us!
            {apiMode && <span className="block text-xs text-blue-300">API Mode</span>}
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
          </div>
        )}
      </button>
    </div>
  );
};

export default EnhancedWhatsAppChat;