import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, AlertCircle, ArrowRight, Home } from 'lucide-react';

function UnderConstruction() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section - Two Column Layout */}
      <div className="relative min-h-[80vh] overflow-hidden">
        <div className="container mx-auto h-full">
          <div className="flex flex-col md:flex-row h-full items-center">
            {/* Left Column - Image */}
            <div className="w-full md:w-1/2 h-[50vh] md:h-[80vh] relative flex items-center justify-center bg-slate-50">
              {/* Background overlay with semi-transparent color */}
              <div className="absolute inset-0 bg-blue-900/10 z-10"></div>
              
              {/* Background construction image */}
              <img 
                src="/underconstruction-2.png" 
                alt="Under Construction Background"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            
            {/* Right Column - Text Content */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl max-w-lg">
                <div className="flex items-center mb-4">
                  <AlertCircle className="text-yellow-500 w-8 h-8 mr-2" />
                  <h1 className="text-3xl md:text-4xl font-bold text-blue-900">Under Construction</h1>
                </div>
                
                <p className="text-lg text-gray-700 mb-6">
                  We're working hard to bring you an amazing experience. This page will be live soon!
                </p>
                
                <div className="flex items-center mb-6">
                  <Clock className="text-blue-600 animate-pulse w-6 h-6 mr-2" />
                  <span className="font-medium text-blue-800">Coming Soon</span>
                </div>
                
                <Link 
                  to="/"
                  className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  <Home className="mr-2 w-5 h-5" />
                  Return to Homepage
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information Section - Two Column Layout */}
      <div className="container mx-auto py-16 px-6">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Left Column - Features List */}
          <div className="w-full md:w-1/2">
            <div className="bg-gradient-to-br from-blue-100 to-white p-8 rounded-xl shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">What to Expect</h2>
              <p className="text-gray-600 mb-6">
                We're building something special for you. Our team is working diligently to create a seamless 
                experience that will help you with your financial journey.
              </p>
              <ul className="space-y-3">
                {[
                  "Comprehensive financial calculators",
                  "Personalized recommendations",
                  "Expert insights and guidance",
                  "User-friendly interface",
                  "Real-time financial updates",
                  "Customized financial planning tools"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <ArrowRight className="text-green-500 w-5 h-5 mr-2 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Right Column - Stay Connected */}
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Stay Connected</h2>
            <p className="text-gray-600 mb-6">
              Want to be the first to know when we launch? Connect with us on social media or explore
              other sections of our site that are already available.
            </p>
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-3">Explore Available Sections:</h3>
              <div className="grid grid-cols-2 gap-4">
                <Link to="/" className="block text-blue-600 hover:underline hover:text-blue-800 transition-colors">Home</Link>
                <Link to="/dashboard" className="block text-blue-600 hover:underline hover:text-blue-800 transition-colors">Dashboard</Link>
                <Link to="/calculators" className="block text-blue-600 hover:underline hover:text-blue-800 transition-colors">Calculators</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup - Two Column Layout */}
      <div className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-10">
            {/* Left Column - Heading and Description */}
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Get Notified When We Launch</h2>
              <p className="text-blue-100 mb-6 max-w-lg">
                Be the first to know when our new features go live. Subscribe to our newsletter and 
                stay updated with the latest developments in financial tools and services.
              </p>
              <div className="hidden md:block">
                <div className="flex items-center space-x-2 text-sm text-blue-200">
                  <Clock className="w-4 h-4" />
                  <span>Anticipated launch: Q4 2025</span>
                </div>
              </div>
            </div>
            
            {/* Right Column - Form */}
            <div className="w-full md:w-1/2">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <div className="flex flex-col sm:flex-row gap-2 mb-4">
                  <input 
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-medium px-6 py-3 rounded-lg transition-colors">
                    Notify Me
                  </button>
                </div>
                <p className="text-sm text-blue-200">
                  We respect your privacy. Your email will only be used to notify you about our launch.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UnderConstruction;