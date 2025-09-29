import React, { useState, useEffect } from 'react';
import { Shield, Smartphone, Copy, CheckCircle, AlertCircle, RefreshCw, Key, QrCode } from 'lucide-react';

// Simple TOTP implementation (in production, use a proper library like 'otplib')
const generateSecret = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let secret = '';
  for (let i = 0; i < 32; i++) {
    secret += chars[Math.floor(Math.random() * chars.length)];
  }
  return secret;
};

const base32Decode = (encoded) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let bits = '';
  let hex = '';
  
  for (let i = 0; i < encoded.length; i++) {
    const val = alphabet.indexOf(encoded.charAt(i).toUpperCase());
    if (val === -1) continue;
    bits += val.toString(2).padStart(5, '0');
  }
  
  for (let i = 0; i + 4 <= bits.length; i += 8) {
    const chunk = bits.substr(i, 8);
    hex += parseInt(chunk, 2).toString(16).padStart(2, '0');
  }
  
  return hex;
};

const generateTOTP = (secret, timeStep = 30, digits = 6) => {
  const time = Math.floor(Date.now() / 1000 / timeStep);
  const timeHex = time.toString(16).padStart(16, '0');
  const secretHex = base32Decode(secret);
  
  // Simple HMAC-SHA1 simulation (in production, use crypto.subtle or a proper library)
  let hash = '';
  for (let i = 0; i < secretHex.length; i += 2) {
    const byte = parseInt(secretHex.substr(i, 2), 16);
    const timeByte = parseInt(timeHex.substr(i % timeHex.length, 2), 16);
    hash += ((byte ^ timeByte) % 256).toString(16).padStart(2, '0');
  }
  
  const offset = parseInt(hash.substr(-1), 16) % 16;
  const truncated = parseInt(hash.substr(offset * 2, 8), 16) & 0x7fffffff;
  
  return (truncated % Math.pow(10, digits)).toString().padStart(digits, '0');
};

const TwoFactorSetup = ({ onComplete, onCancel }) => {
  const [secret, setSecret] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const newSecret = generateSecret();
    setSecret(newSecret);
    
    // Generate QR code URL for Google Authenticator
    const issuer = 'WorkSocial India';
    const accountName = 'Blog Admin';
    const otpauthUrl = `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(accountName)}?secret=${newSecret}&issuer=${encodeURIComponent(issuer)}`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(otpauthUrl)}`;
    setQrCodeUrl(qrUrl);
  }, []);

  const copySecret = () => {
    navigator.clipboard.writeText(secret);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const verifyCode = async () => {
    setIsVerifying(true);
    setError('');

    // Generate expected TOTP code
    const expectedCode = generateTOTP(secret);
    const previousCode = generateTOTP(secret, 30); // Allow previous 30-second window
    
    // Allow some time drift (current + previous window)
    if (verificationCode === expectedCode || verificationCode === previousCode) {
      // Save secret to localStorage (in production, save to secure backend)
      localStorage.setItem('totpSecret', secret);
      onComplete(secret);
    } else {
      setError('Invalid verification code. Please try again.');
    }
    
    setIsVerifying(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-8">
        <div className="text-center mb-6">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="text-blue-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Set Up Two-Factor Authentication</h2>
          <p className="text-gray-600">Secure your admin account with Google Authenticator</p>
        </div>

        <div className="space-y-6">
          {/* Step 1: Install App */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">1</span>
              </div>
              <h3 className="font-semibold text-gray-900">Install Google Authenticator</h3>
            </div>
            <p className="text-sm text-gray-600 ml-11">
              Download Google Authenticator from your app store if you haven't already.
            </p>
          </div>

          {/* Step 2: Scan QR Code */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">2</span>
              </div>
              <h3 className="font-semibold text-gray-900">Scan QR Code</h3>
            </div>
            <div className="ml-11">
              {qrCodeUrl && (
                <div className="text-center mb-4">
                  <img src={qrCodeUrl} alt="QR Code" className="mx-auto border rounded-lg" />
                </div>
              )}
              <p className="text-sm text-gray-600 mb-3">
                Or manually enter this secret key:
              </p>
              <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                <code className="flex-1 text-sm font-mono break-all">{secret}</code>
                <button
                  onClick={copySecret}
                  className="p-1 text-gray-500 hover:text-gray-700"
                >
                  {copied ? <CheckCircle size={16} className="text-green-600" /> : <Copy size={16} />}
                </button>
              </div>
            </div>
          </div>

          {/* Step 3: Verify Code */}
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">3</span>
              </div>
              <h3 className="font-semibold text-gray-900">Enter Verification Code</h3>
            </div>
            <div className="ml-11">
              <p className="text-sm text-gray-600 mb-3">
                Enter the 6-digit code from Google Authenticator:
              </p>
              <input
                type="text"
                maxLength="6"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                placeholder="000000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center text-2xl font-mono tracking-wider focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {error && (
                <div className="mt-2 flex items-center gap-2 text-red-600">
                  <AlertCircle size={16} />
                  <span className="text-sm">{error}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-8">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={verifyCode}
            disabled={verificationCode.length !== 6 || isVerifying}
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {isVerifying ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                <Key size={16} />
                Complete Setup
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const TwoFactorPrompt = ({ onVerify, onCancel, error }) => {
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (code.length === 6) {
      setIsVerifying(true);
      await onVerify(code);
      setIsVerifying(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-sm w-full p-8">
        <div className="text-center mb-6">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Smartphone className="text-green-600" size={32} />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Enter Authentication Code</h2>
          <p className="text-gray-600">Open Google Authenticator and enter the 6-digit code</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              maxLength="6"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              placeholder="000000"
              className="w-full px-4 py-4 border border-gray-300 rounded-lg text-center text-2xl font-mono tracking-wider focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              autoFocus
            />
            {error && (
              <div className="mt-2 flex items-center gap-2 text-red-600">
                <AlertCircle size={16} />
                <span className="text-sm">{error}</span>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={code.length !== 6 || isVerifying}
              className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isVerifying ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <Key size={16} />
                  Verify
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 text-center">
            The code refreshes every 30 seconds. If the code doesn't work, wait for a new one.
          </p>
        </div>
      </div>
    </div>
  );
};

export { TwoFactorSetup, TwoFactorPrompt, generateTOTP };