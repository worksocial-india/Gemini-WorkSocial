// Example of how to integrate WhatsApp sharing in your calculators

import React from 'react';
import { Share, MessageCircle } from 'lucide-react';
import { shareCalculatorResults, shareToWhatsApp } from '../utils/whatsappUtils';

const CalculatorShareButton = ({ calculatorType, results, disabled = false }) => {
  const handleShare = async () => {
    try {
      const shareResult = await shareCalculatorResults(calculatorType, results);
      if (shareResult.success) {
        console.log(`Shared via ${shareResult.method}`);
      }
    } catch (error) {
      console.error('Failed to share:', error);
    }
  };

  return (
    <button
      onClick={handleShare}
      disabled={disabled}
      className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white rounded-lg transition-colors"
    >
      <MessageCircle size={16} />
      Share via WhatsApp
    </button>
  );
};

// Quick share button component
const QuickShareButton = ({ message, label = "Share", className = "" }) => {
  return (
    <button
      onClick={() => shareToWhatsApp(message)}
      className={`inline-flex items-center gap-2 px-3 py-1 text-sm bg-green-100 hover:bg-green-200 text-green-700 rounded-md transition-colors ${className}`}
    >
      <Share size={14} />
      {label}
    </button>
  );
};

export { CalculatorShareButton, QuickShareButton };