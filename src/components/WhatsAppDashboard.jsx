import React, { useState, useEffect } from 'react';
import { Search, Phone, Video, MoreVertical, Send, Smile, Paperclip, Mic, ChevronLeft } from 'lucide-react';
import WhatsAppBusinessAPI from '../services/WhatsAppBusinessAPI';

const WhatsAppDashboard = () => {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Customer 1', phone: '9198765432', lastMessage: 'How can I invest with WorkSocial?', unread: 2, timestamp: '10:30 AM', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Customer 2', phone: '9187654321', lastMessage: 'I need help with EMI calculation', unread: 0, timestamp: '9:45 AM', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'Customer 3', phone: '9176543210', lastMessage: 'Can you help with tax planning?', unread: 3, timestamp: 'Yesterday', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, name: 'Customer 4', phone: '9165432109', lastMessage: 'Thanks for your help!', unread: 0, timestamp: 'Yesterday', avatar: 'https://i.pravatar.cc/150?img=4' },
    { id: 5, name: 'Customer 5', phone: '9154321098', lastMessage: 'I\'ll check your website', unread: 0, timestamp: 'Oct 7', avatar: 'https://i.pravatar.cc/150?img=5' },
  ]);

  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showContacts, setShowContacts] = useState(true);
  
  const whatsappAPI = new WhatsAppBusinessAPI();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowContacts(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Generate dummy messages for each contact
    const dummyMessages = {};
    contacts.forEach(contact => {
      dummyMessages[contact.id] = [
        { id: 1, text: 'Hello! How can WorkSocial help you today?', sent: true, timestamp: '10:30 AM' },
        { id: 2, text: contact.lastMessage, sent: false, timestamp: contact.timestamp },
      ];
    });
    setMessages(dummyMessages);
  }, [contacts]);

  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
    
    // Mark messages as read
    const updatedContacts = contacts.map(c => 
      c.id === contact.id ? { ...c, unread: 0 } : c
    );
    setContacts(updatedContacts);
    
    if (isMobile) {
      setShowContacts(false);
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return;

    // Add message to state
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const messageId = messages[selectedContact.id].length + 1;
    
    setMessages(prev => ({
      ...prev,
      [selectedContact.id]: [
        ...prev[selectedContact.id],
        { id: messageId, text: newMessage, sent: true, timestamp }
      ]
    }));

    // Try to send via API
    try {
      whatsappAPI.sendTextMessage(selectedContact.phone, newMessage);
    } catch (error) {
      console.error("Failed to send message via API:", error);
    }

    setNewMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)
  );

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-100">
      {/* Contact List */}
      {(showContacts || !isMobile) && (
        <div className={`${isMobile ? 'w-full' : 'w-1/3'} bg-white border-r border-gray-300 flex flex-col`}>
          <div className="bg-green-700 text-white p-4">
            <h1 className="text-xl font-bold">WorkSocial WhatsApp</h1>
          </div>
          
          {/* Search */}
          <div className="p-3 bg-white">
            <div className="bg-gray-100 rounded-lg flex items-center px-3 py-2">
              <Search size={20} className="text-gray-500" />
              <input 
                type="text" 
                placeholder="Search contacts" 
                className="bg-gray-100 outline-none ml-2 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Contacts */}
          <div className="overflow-y-auto flex-1">
            {filteredContacts.map(contact => (
              <div 
                key={contact.id}
                onClick={() => handleSelectContact(contact)}
                className={`flex items-center p-3 border-b border-gray-200 cursor-pointer hover:bg-gray-100 ${selectedContact?.id === contact.id ? 'bg-gray-200' : ''}`}
              >
                <img 
                  src={contact.avatar} 
                  alt={contact.name} 
                  className="h-12 w-12 rounded-full mr-3" 
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{contact.name}</h3>
                    <span className="text-xs text-gray-500">{contact.timestamp}</span>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-500 truncate w-36">
                      {contact.lastMessage}
                    </p>
                    {contact.unread > 0 && (
                      <span className="bg-green-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Chat Area */}
      <div className={`${isMobile ? (showContacts ? 'hidden' : 'w-full') : 'w-2/3'} flex flex-col`}>
        {selectedContact ? (
          <>
            {/* Header */}
            <div className="bg-green-700 text-white p-3 flex items-center">
              {isMobile && (
                <button 
                  onClick={() => setShowContacts(true)}
                  className="mr-2"
                >
                  <ChevronLeft size={24} />
                </button>
              )}
              <img 
                src={selectedContact.avatar} 
                alt={selectedContact.name} 
                className="h-10 w-10 rounded-full mr-3" 
              />
              <div className="flex-1">
                <h2 className="font-medium">{selectedContact.name}</h2>
                <p className="text-xs">+{selectedContact.phone} • Online</p>
              </div>
              <div className="flex space-x-4">
                <Phone size={20} className="cursor-pointer" />
                <Video size={20} className="cursor-pointer" />
                <MoreVertical size={20} className="cursor-pointer" />
              </div>
            </div>
            
            {/* Messages */}
            <div 
              className="flex-1 overflow-y-auto p-4 bg-[#e5ded8]"
              style={{ 
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                backgroundSize: '80px'
              }}
            >
              {selectedContact && messages[selectedContact.id]?.map(message => (
                <div 
                  key={message.id}
                  className={`max-w-xs md:max-w-md mb-4 ${message.sent ? 'ml-auto' : 'mr-auto'}`}
                >
                  <div 
                    className={`p-3 rounded-lg ${
                      message.sent ? 'bg-green-100 rounded-tr-none' : 'bg-white rounded-tl-none'
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className="text-xs text-gray-500 text-right mt-1">{message.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Input Area */}
            <div className="bg-white p-3 flex items-center">
              <div className="flex space-x-2 text-gray-500">
                <Smile size={24} className="cursor-pointer" />
                <Paperclip size={24} className="cursor-pointer" />
              </div>
              <input 
                type="text" 
                placeholder="Type a message" 
                className="flex-1 border rounded-full px-4 py-2 mx-3 focus:outline-none focus:border-green-500"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              {newMessage.trim() ? (
                <Send 
                  size={24} 
                  className="text-green-600 cursor-pointer"
                  onClick={handleSendMessage}
                />
              ) : (
                <Mic size={24} className="text-gray-500 cursor-pointer" />
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-gray-100">
            <img 
              src="/Logo.png" 
              alt="WorkSocial Logo" 
              className="w-32 h-32 mb-4 opacity-20" 
            />
            <h2 className="text-xl font-semibold text-gray-500">WorkSocial WhatsApp</h2>
            <p className="text-gray-400 mt-2">Select a contact to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatsAppDashboard;