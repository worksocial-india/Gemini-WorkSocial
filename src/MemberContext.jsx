import React, { useState, useEffect } from 'react';
import { MemberContext } from './contexts/FirebaseContext';



export const MemberProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [member, setMember] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if member is already logged in
  useEffect(() => {
    const checkMemberAuth = () => {
      const memberData = localStorage.getItem('memberAuth');
      const memberSession = sessionStorage.getItem('memberSession');
      
      if (memberData && memberSession) {
        try {
          const parsedMember = JSON.parse(memberData);
          const parsedSession = JSON.parse(memberSession);
          
          // Check if session is still valid (7 days for members)
          const now = new Date().getTime();
          const sessionTime = parsedSession.timestamp;
          const sessionDuration = 7 * 24 * 60 * 60 * 1000; // 7 days
          
          if (now - sessionTime < sessionDuration) {
            setIsLoggedIn(true);
            setMember(parsedMember.member);
          } else {
            // Session expired
            localStorage.removeItem('memberAuth');
            sessionStorage.removeItem('memberSession');
          }
        } catch (error) {
          console.error('Error parsing member data:', error);
          localStorage.removeItem('memberAuth');
          sessionStorage.removeItem('memberSession');
        }
      }
      setIsLoading(false);
    };

    checkMemberAuth();
  }, []);

  const login = async (email, password) => {
    // Demo member accounts - in production, this would be a secure API call
    const validMembers = [
      {
        id: 1,
        email: 'premium@worksocial.in',
        password: 'premium123',
        name: 'Rajesh Kumar',
        membership: 'premium',
        phone: '+91 98765 43210',
        joinDate: '2024-01-15',
        profileImage: '/Logo-worksocialindia.png',
        preferences: {
          notifications: true,
          newsletter: true,
          smsUpdates: false
        }
      },
      {
        id: 2,
        email: 'gold@worksocial.in',
        password: 'gold123',
        name: 'Priya Sharma',
        membership: 'gold',
        phone: '+91 87654 32109',
        joinDate: '2024-03-20',
        profileImage: '/Logo-worksocialindia.png',
        preferences: {
          notifications: true,
          newsletter: true,
          smsUpdates: true
        }
      },
      {
        id: 3,
        email: 'basic@worksocial.in',
        password: 'basic123',
        name: 'Amit Verma',
        membership: 'basic',
        phone: '+91 76543 21098',
        joinDate: '2024-06-10',
        profileImage: '/Logo-worksocialindia.png',
        preferences: {
          notifications: false,
          newsletter: true,
          smsUpdates: false
        }
      }
    ];

    const foundMember = validMembers.find(
      member => member.email === email && member.password === password
    );

    if (foundMember) {
      const memberData = { member: foundMember, timestamp: new Date().getTime() };
      const sessionData = { timestamp: new Date().getTime(), sessionId: Math.random().toString(36) };
      
      localStorage.setItem('memberAuth', JSON.stringify(memberData));
      sessionStorage.setItem('memberSession', JSON.stringify(sessionData));
      
      setIsLoggedIn(true);
      setMember(foundMember);
      return { success: true };
    } else {
      return { success: false, message: 'Invalid email or password' };
    }
  };

  const register = async (memberData) => {
    // Simulate registration process
    const newMember = {
      id: Date.now(),
      ...memberData,
      membership: 'basic', // Default membership
      joinDate: new Date().toISOString().split('T')[0],
      profileImage: '/Logo-worksocialindia.png',
      preferences: {
        notifications: true,
        newsletter: true,
        smsUpdates: false
      }
    };

    // In production, this would save to database
    const authData = { member: newMember, timestamp: new Date().getTime() };
    const sessionData = { timestamp: new Date().getTime(), sessionId: Math.random().toString(36) };
    
    localStorage.setItem('memberAuth', JSON.stringify(authData));
    sessionStorage.setItem('memberSession', JSON.stringify(sessionData));
    
    setIsLoggedIn(true);
    setMember(newMember);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('memberAuth');
    sessionStorage.removeItem('memberSession');
    setIsLoggedIn(false);
    setMember(null);
  };

  const updateMember = (updatedData) => {
    const updatedMember = { ...member, ...updatedData };
    const memberData = { member: updatedMember, timestamp: new Date().getTime() };
    
    localStorage.setItem('memberAuth', JSON.stringify(memberData));
    setMember(updatedMember);
  };

  const getMembershipFeatures = (membershipType) => {
    const features = {
      basic: {
        name: 'Basic Member',
        price: 'Free',
        color: 'gray',
        features: [
          'Access to basic calculators',
          'Monthly newsletter',
          'Basic financial tips',
          'Community forum access'
        ],
        limits: {
          calculatorUses: 10,
          consultations: 0,
          premiumContent: false
        }
      },
      gold: {
        name: 'Gold Member',
        price: '₹999/month',
        color: 'yellow',
        features: [
          'All basic features',
          'Advanced calculators',
          'Weekly market insights',
          'Priority customer support',
          'Personalized recommendations',
          '2 free consultations/month'
        ],
        limits: {
          calculatorUses: 100,
          consultations: 2,
          premiumContent: true
        }
      },
      premium: {
        name: 'Premium Member',
        price: '₹1999/month',
        color: 'purple',
        features: [
          'All gold features',
          'Unlimited calculator access',
          'Daily market analysis',
          'Dedicated relationship manager',
          'Investment portfolio tracking',
          'Unlimited consultations',
          'Exclusive webinars',
          'Tax planning assistance'
        ],
        limits: {
          calculatorUses: 'unlimited',
          consultations: 'unlimited',
          premiumContent: true
        }
      }
    };
    return features[membershipType] || features.basic;
  };

  const value = {
    isLoggedIn,
    member,
    isLoading,
    login,
    register,
    logout,
    updateMember,
    getMembershipFeatures
  };

  return (
    <MemberContext.Provider value={value}>
      {children}
    </MemberContext.Provider>
  );
};
