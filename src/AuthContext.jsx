import React, { useState, useContext, createContext, useEffect } from 'react';
import { generateTOTP } from './TwoFactorAuth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [requiresTwoFactor, setRequiresTwoFactor] = useState(false);
  const [pendingAuth, setPendingAuth] = useState(null);

  // Check if user is already logged in on app start
  useEffect(() => {
    const checkAuth = () => {
      const authData = localStorage.getItem('blogAuth');
      const sessionData = sessionStorage.getItem('blogSession');
      
      if (authData && sessionData) {
        try {
          const parsedAuth = JSON.parse(authData);
          const parsedSession = JSON.parse(sessionData);
          
          // Check if session is still valid (24 hours)
          const now = new Date().getTime();
          const sessionTime = parsedSession.timestamp;
          const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours
          
          if (now - sessionTime < sessionDuration) {
            setIsAuthenticated(true);
            setUser(parsedAuth.user);
          } else {
            // Session expired, clear storage
            localStorage.removeItem('blogAuth');
            sessionStorage.removeItem('blogSession');
          }
        } catch (error) {
          console.error('Error parsing auth data:', error);
          localStorage.removeItem('blogAuth');
          sessionStorage.removeItem('blogSession');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (username, password) => {
    // Demo credentials - in production, this would be a secure API call
    const validCredentials = [
      { username: 'admin', password: 'worksocial@2025', role: 'admin', name: 'WorkSocial Admin', requires2FA: true },
      { username: 'editor', password: 'editor@2025', role: 'editor', name: 'Content Editor', requires2FA: true }
    ];

    const user = validCredentials.find(
      cred => cred.username === username && cred.password === password
    );

    if (user) {
      if (user.requires2FA) {
        // Check if user has 2FA set up
        const totpSecret = localStorage.getItem('totpSecret');
        if (!totpSecret) {
          // User needs to set up 2FA
          setRequiresTwoFactor(true);
          setPendingAuth(user);
          return { success: true, requiresSetup: true };
        } else {
          // User needs to provide 2FA code
          setRequiresTwoFactor(true);
          setPendingAuth(user);
          return { success: true, requires2FA: true };
        }
      } else {
        // Complete login without 2FA
        const userData = { username: user.username, role: user.role, name: user.name };
        const authData = { user: userData, timestamp: new Date().getTime() };
        const sessionData = { timestamp: new Date().getTime(), sessionId: Math.random().toString(36) };
        
        localStorage.setItem('blogAuth', JSON.stringify(authData));
        sessionStorage.setItem('blogSession', JSON.stringify(sessionData));
        
        setIsAuthenticated(true);
        setUser(userData);
        return { success: true };
      }
    } else {
      return { success: false, message: 'Invalid username or password' };
    }
  };

  const completeTwoFactorSetup = () => {
    if (pendingAuth) {
      const userData = { 
        username: pendingAuth.username, 
        role: pendingAuth.role, 
        name: pendingAuth.name,
        twoFactorEnabled: true 
      };
      const authData = { user: userData, timestamp: new Date().getTime() };
      const sessionData = { timestamp: new Date().getTime(), sessionId: Math.random().toString(36) };
      
      localStorage.setItem('blogAuth', JSON.stringify(authData));
      sessionStorage.setItem('blogSession', JSON.stringify(sessionData));
      
      setIsAuthenticated(true);
      setUser(userData);
      setRequiresTwoFactor(false);
      setPendingAuth(null);
    }
  };

  const verifyTwoFactorCode = (code) => {
    const totpSecret = localStorage.getItem('totpSecret');
    if (!totpSecret || !pendingAuth) {
      return false;
    }

    // Generate expected TOTP code
    const expectedCode = generateTOTP(totpSecret);
    
    // Generate code for previous 30-second window (to allow for time drift)
    // Simple previous code generation (simplified)
    const previousCode = generateTOTP(totpSecret, 30);
    
    if (code === expectedCode || code === previousCode) {
      // Complete authentication
      const userData = { 
        username: pendingAuth.username, 
        role: pendingAuth.role, 
        name: pendingAuth.name,
        twoFactorEnabled: true 
      };
      const authData = { user: userData, timestamp: new Date().getTime() };
      const sessionData = { timestamp: new Date().getTime(), sessionId: Math.random().toString(36) };
      
      localStorage.setItem('blogAuth', JSON.stringify(authData));
      sessionStorage.setItem('blogSession', JSON.stringify(sessionData));
      
      setIsAuthenticated(true);
      setUser(userData);
      setRequiresTwoFactor(false);
      setPendingAuth(null);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    localStorage.removeItem('blogAuth');
    sessionStorage.removeItem('blogSession');
    setIsAuthenticated(false);
    setUser(null);
    setRequiresTwoFactor(false);
    setPendingAuth(null);
  };

  const cancelAuth = () => {
    setRequiresTwoFactor(false);
    setPendingAuth(null);
  };

  const value = {
    isAuthenticated,
    isLoading,
    user,
    requiresTwoFactor,
    pendingAuth,
    login,
    logout,
    completeTwoFactorSetup,
    verifyTwoFactorCode,
    cancelAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;