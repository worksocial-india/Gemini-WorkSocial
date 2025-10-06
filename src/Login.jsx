import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { TwoFactorSetup, TwoFactorPrompt } from './TwoFactorAuth';
import { Lock, User, Eye, EyeOff, Shield, AlertCircle, LogIn } from 'lucide-react';

const Login = () => {
  const { login, requiresTwoFactor, completeTwoFactorSetup, verifyTwoFactorCode, cancelAuth } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);
  const [twoFactorError, setTwoFactorError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(formData.username, formData.password);
    
    if (result.success) {
      if (result.requiresSetup) {
        setShowTwoFactorSetup(true);
      } else if (result.requires2FA) {
        // 2FA prompt will be shown by checking requiresTwoFactor in render
      }
      // If neither, user is logged in automatically
    } else {
      setError(result.message);
    }
    
    setIsLoading(false);
  };

  const handleTwoFactorSetupComplete = () => {
    completeTwoFactorSetup();
    setShowTwoFactorSetup(false);
  };

  const handleTwoFactorVerify = async (code) => {
    const success = verifyTwoFactorCode(code);
    if (!success) {
      setTwoFactorError('Invalid authentication code. Please try again.');
      return false;
    }
    setTwoFactorError('');
    return true;
  };

  const handleTwoFactorCancel = () => {
    cancelAuth();
    setShowTwoFactorSetup(false);
    setTwoFactorError('');
  };

  // Show 2FA setup modal
  if (showTwoFactorSetup) {
    return (
      <TwoFactorSetup
        onComplete={handleTwoFactorSetupComplete}
        onCancel={handleTwoFactorCancel}
      />
    );
  }

  // Show 2FA verification prompt
  if (requiresTwoFactor) {
    return (
      <TwoFactorPrompt
        onVerify={handleTwoFactorVerify}
        onCancel={handleTwoFactorCancel}
        error={twoFactorError}
      />
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const demoCredentials = [
    { label: 'Admin Access', username: 'admin', password: 'worksocial@2025', role: 'Full access to all features' },
    { label: 'Editor Access', username: 'editor', password: 'editor@2025', role: 'Content management access' }
  ];

  const fillDemoCredentials = (username, password) => {
    setFormData({ username, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="bg-white p-4 rounded-full w-20 h-20 mx-auto mb-4 shadow-lg flex items-center justify-center">
            <Shield className="text-blue-600" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Blog Admin Login</h1>
          <p className="text-gray-600">Access the WorkSocial India content management system</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 pr-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
                <AlertCircle size={20} />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-medium"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Signing In...
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials Section */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-4">Demo Credentials (Click to use):</h3>
            <div className="space-y-3">
              {demoCredentials.map((cred, index) => (
                <button
                  key={index}
                  onClick={() => fillDemoCredentials(cred.username, cred.password)}
                  className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{cred.label}</div>
                      <div className="text-sm text-gray-600">{cred.role}</div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {cred.username} / {cred.password}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start gap-2">
              <Shield className="text-blue-600 mt-0.5" size={16} />
              <div className="text-sm text-blue-800">
                <strong>Security Notice:</strong> This is a demo system. In production, implement proper authentication with secure password hashing and HTTPS.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <p>© 2025 WorkSocial India. All rights reserved.</p>
          <p className="mt-1">Secure admin access for content management</p>
        </div>
      </div>
    </div>
  );
};

export default Login;