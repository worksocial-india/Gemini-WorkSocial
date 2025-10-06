import React, { useState, useEffect } from 'react';
import { SubscriberContext } from './contexts/SubscriberContext';

export const SubscriberProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [subscriber, setSubscriber] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if subscriber is already logged in
  useEffect(() => {
    const checkSubscriberAuth = () => {
      const subscriberData = localStorage.getItem('subscriberAuth');
      const subscriberSession = sessionStorage.getItem('subscriberSession');
      
      if (subscriberData && subscriberSession) {
        try {
          const parsedSubscriber = JSON.parse(subscriberData);
          const parsedSession = JSON.parse(subscriberSession);
          
          // Check if session is still valid (30 days for subscribers)
          const now = new Date().getTime();
          const sessionTime = parsedSession.timestamp;
          const sessionDuration = 30 * 24 * 60 * 60 * 1000; // 30 days
          
          if (now - sessionTime < sessionDuration) {
            setIsLoggedIn(true);
            setSubscriber(parsedSubscriber.subscriber);
          } else {
            // Session expired
            localStorage.removeItem('subscriberAuth');
            sessionStorage.removeItem('subscriberSession');
          }
        } catch (error) {
          console.error('Error parsing subscriber data:', error);
          localStorage.removeItem('subscriberAuth');
          sessionStorage.removeItem('subscriberSession');
        }
      }
      setIsLoading(false);
    };

    checkSubscriberAuth();
  }, []);

  const login = async (email, password) => {
    // Demo subscriber accounts - in production, this would be a secure API call
    const validSubscribers = [
      {
        id: 1,
        email: 'subscriber@worksocial.in',
        password: 'sub123',
        name: 'Vikash Singh',
        subscriptionType: 'free',
        phone: '+91 99999 00001',
        joinDate: '2024-02-15',
        profileImage: '/Logo-worksocialindia.png',
        contentAccess: ['exclusive-articles', 'video-content', 'webinars', 'expert-consultation'],
        subscriptionExpiry: 'N/A',
        preferences: {
          notifications: true,
          newsletter: true,
          smsUpdates: true,
          contentAlerts: true
        },
        stats: {
          articlesRead: 45,
          videosWatched: 12,
          webinarsAttended: 8,
          consultationsUsed: 3
        }
      }
    ];

    const foundSubscriber = validSubscribers.find(
      subscriber => subscriber.email === email && subscriber.password === password
    );

    if (foundSubscriber) {
      const subscriberData = { subscriber: foundSubscriber, timestamp: new Date().getTime() };
      const sessionData = { timestamp: new Date().getTime(), sessionId: Math.random().toString(36) };
      
      localStorage.setItem('subscriberAuth', JSON.stringify(subscriberData));
      sessionStorage.setItem('subscriberSession', JSON.stringify(sessionData));
      
      setIsLoggedIn(true);
      setSubscriber(foundSubscriber);
      return { success: true };
    } else {
      return { success: false, message: 'Invalid email or password' };
    }
  };

  const register = async (userData) => {
    // In production, this would make an API call
    const newSubscriber = {
      id: Date.now(),
      email: userData.email,
      name: userData.name,
      phone: userData.phone,
      subscriptionType: 'free',
      joinDate: new Date().toISOString().split('T')[0],
      profileImage: '/Logo-worksocialindia.png',
      contentAccess: ['exclusive-articles', 'video-content', 'webinars', 'expert-consultation'],
      subscriptionExpiry: 'N/A',
      preferences: {
        notifications: true,
        newsletter: true,
        smsUpdates: false,
        contentAlerts: true
      },
      stats: {
        articlesRead: 0,
        videosWatched: 0,
        webinarsAttended: 0,
        consultationsUsed: 0
      }
    };

    const subscriberData = { subscriber: newSubscriber, timestamp: new Date().getTime() };
    const sessionData = { timestamp: new Date().getTime(), sessionId: Math.random().toString(36) };
    
    localStorage.setItem('subscriberAuth', JSON.stringify(subscriberData));
    sessionStorage.setItem('subscriberSession', JSON.stringify(sessionData));
    
    setIsLoggedIn(true);
    setSubscriber(newSubscriber);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('subscriberAuth');
    sessionStorage.removeItem('subscriberSession');
    setIsLoggedIn(false);
    setSubscriber(null);
  };

  const updateSubscriber = (updatedData) => {
    const updatedSubscriber = { ...subscriber, ...updatedData };
    const subscriberData = { subscriber: updatedSubscriber, timestamp: new Date().getTime() };
    
    localStorage.setItem('subscriberAuth', JSON.stringify(subscriberData));
    setSubscriber(updatedSubscriber);
  };

  const hasContentAccess = () => {
    return true;
  };

  const getSubscriptionFeatures = () => {
    return {
      name: 'Free Access',
      price: '$0/month',
      features: [
        'Access to exclusive articles',
        'Video content library',
        'Live webinars access',
        'Expert consultation calls',
        'Monthly newsletter',
        'Basic financial insights',
        'Community access'
      ],
      color: 'bg-green-500',
      popular: false
    };
  };

  const value = {
    isLoggedIn,
    subscriber,
    isLoading,
    login,
    register,
    logout,
    updateSubscriber,
    hasContentAccess,
    getSubscriptionFeatures
  };

  return (
    <SubscriberContext.Provider value={value}>
      {children}
    </SubscriberContext.Provider>
  );
};
