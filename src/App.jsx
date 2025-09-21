import React from 'react';
import './App.css';
import <WorkSocialLogo from './assets/logo.png'; // WorkSocial logo image

// --- Navbar Component ---
function Navbar() {
  return (
    <nav className="bg-white p-4 border-b fixed w-full top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="navbar-logo-container">
          <img src={WorkSocialLogo} alt="WorkSocial Logo" className="h-8" />
        </a>
        <div className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-blue-600">About</a>
          <a href="#" className="text-gray-600 hover:text-blue-600">Services</a>
          <a href="#" className="text-gray-600 hover:text-blue-600">Contact</a>
        </div>
      </div>
    </nav>
  );
}

// --- Hero Section Component ---
function Hero() {
  return (
    // The main container with the background image
    <section className="hero-section-tailwind min-h-screen border-[10px] border-gray-800">
      {/* Flexbox container to create columns */}
      <div className="flex h-full min-h-screen">
        
        {/* Left Column (empty spacer) */}
        <div className="w-1/2">
          {/* This side is intentionally left empty */}
        </div>

        {/* Right Column (for text and button) */}
        <div className="w-1/2 flex flex-col items-center justify-center text-center p-8">
          <h1 className="text-6xl md:text-8xl font-black main-heading-gradient leading-none">
            One Platform
          </h1>
          <p className="text-3xl md:text-4xl text-white tracking-widest mt-2 mb-10">
            Endless Possibilities
          </p>
          {/* Inside the Hero component in App.jsx */}
<a 
  href="/dashboard" // <-- Change this line
  className="inline-block bg-black text-white font-semibold py-3 px-10 rounded-md uppercase hover:bg-gray-800 transition-colors text-lg"
>
  Let's Go
</a>
        </div>

      </div>
    </section>
  );
}


// --- Main App Component ---
function App() {
  return (
    <div>
      <Navbar />
      <Hero />
    </div>
  );
}


// --- The Missing Export Line ---
// This line fixes the error.
export default App;