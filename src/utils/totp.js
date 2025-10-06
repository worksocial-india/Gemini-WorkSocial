// Simple TOTP implementation (in production, use a proper library like 'otplib')
export const generateSecret = () => {
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

export const generateTOTP = (secret, timeStep = 30, digits = 6) => {
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
