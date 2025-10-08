import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Google Analytics tracking hook
export const useGoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if gtag is available
    if (typeof window.gtag !== 'undefined') {
      // Track page view on route change
      window.gtag('config', 'G-QLZ6Y90X9D', {
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
    }
  }, [location]);
};

// Function to track custom events
export const trackEvent = (eventName, parameters = {}) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, parameters);
  }
};

// Function to track calculator usage
export const trackCalculatorUsage = (calculatorType, action = 'calculate') => {
  trackEvent('calculator_usage', {
    calculator_type: calculatorType,
    action: action,
  });
};

// Function to track form submissions
export const trackFormSubmission = (formType) => {
  trackEvent('form_submission', {
    form_type: formType,
  });
};

// Function to track button clicks
export const trackButtonClick = (buttonName, location) => {
  trackEvent('button_click', {
    button_name: buttonName,
    page_location: location,
  });
};