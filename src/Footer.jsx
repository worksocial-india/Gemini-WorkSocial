import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Users, Eye, Clock, ExternalLink } from 'lucide-react';

const Footer = () => {
  const [todayVisitors, setTodayVisitors] = useState(0);
  const [totalVisitors, setTotalVisitors] = useState(0);

  useEffect(() => {
    // Initialize visitor tracking
    const initializeVisitorTracking = () => {
      const today = new Date().toDateString();
      const lastVisitDate = localStorage.getItem('lastVisitDate');
      const currentTotalVisitors = parseInt(localStorage.getItem('totalVisitors') || '0');
      const currentTodayVisitors = parseInt(localStorage.getItem('todayVisitors') || '0');

      // If it's a new day, reset today's count
      if (lastVisitDate !== today) {
        localStorage.setItem('lastVisitDate', today);
        localStorage.setItem('todayVisitors', '1');
        localStorage.setItem('totalVisitors', (currentTotalVisitors + 1).toString());
        setTodayVisitors(1);
        setTotalVisitors(currentTotalVisitors + 1);
      } else {
        // Same day, increment today's count
        const newTodayCount = currentTodayVisitors + 1;
        const newTotalCount = currentTotalVisitors + 1;
        localStorage.setItem('todayVisitors', newTodayCount.toString());
        localStorage.setItem('totalVisitors', newTotalCount.toString());
        setTodayVisitors(newTodayCount);
        setTotalVisitors(newTotalCount);
      }
    };

    // Check if this is a new session
    const sessionKey = 'visitorSessionActive';
    const sessionActive = sessionStorage.getItem(sessionKey);
    
    if (!sessionActive) {
      sessionStorage.setItem(sessionKey, 'true');
      initializeVisitorTracking();
    } else {
      // Just load existing counts without incrementing
      const currentTotalVisitors = parseInt(localStorage.getItem('totalVisitors') || '1247');
      const currentTodayVisitors = parseInt(localStorage.getItem('todayVisitors') || '23');
      setTotalVisitors(currentTotalVisitors);
      setTodayVisitors(currentTodayVisitors);
    }
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Visitor Counter Bar */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Eye size={16} className="text-blue-200" />
              <span className="text-blue-100">Today's Visitors:</span>
              <span className="font-bold text-white">{formatNumber(todayVisitors)}</span>
            </div>
            <div className="hidden sm:block text-blue-200">|</div>
            <div className="flex items-center gap-2">
              <Users size={16} className="text-blue-200" />
              <span className="text-blue-100">Total Visitors:</span>
              <span className="font-bold text-white">{formatNumber(totalVisitors)}</span>
            </div>
            <div className="hidden sm:block text-blue-200">|</div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-blue-200" />
              <span className="text-blue-100">Last Updated:</span>
              <span className="text-white">{new Date().toLocaleTimeString('en-IN', { 
                hour: '2-digit', 
                minute: '2-digit',
                timeZone: 'Asia/Kolkata'
              })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/Logo-worksocialindia.png" alt="WorkSocial India" className="h-10" />
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted financial partner providing expert guidance on loans, investments, 
              insurance, and comprehensive financial planning solutions.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <MapPin size={16} />
              <span>Mumbai, Maharashtra, India</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/calculators" className="text-gray-300 hover:text-white transition-colors">Calculators</Link></li>
              <li><Link to="/knowledge" className="text-gray-300 hover:text-white transition-colors">Knowledge Hub</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Financial Tools */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Financial Tools</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/calculators/emi" className="text-gray-300 hover:text-white transition-colors">EMI Calculator</Link></li>
              <li><Link to="/calculators/part-payment" className="text-gray-300 hover:text-white transition-colors">Part Payment Calculator</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors">Loan Eligibility</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors">Investment Planning</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors">Tax Planning</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-white transition-colors">Insurance Advisory</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Get In Touch</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <Mail size={16} />
                <a href="mailto:info@worksocial.in" className="hover:text-white transition-colors">
                  info@worksocial.in
                </a>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Phone size={16} />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </div>
              <div className="mt-4">
                <a 
                  href="https://worksocial.in" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm"
                >
                  Visit Our Main Website
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} WorkSocial India. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <span>Backed by Bankers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;