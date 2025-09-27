import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './App.css';

// --- Hero Section Component ---
function Hero() {
  return (
    // The main container with the background image
    <section className="hero-section-tailwind h-screen -mt-16 relative">
      {/* Semi-transparent overlay for better visibility on mobile */}
      <div className="absolute inset-0 bg-black/10 md:bg-transparent"></div>
      
      {/* Flexbox container to create columns */}
      <div className="flex flex-col md:flex-row h-full relative z-10">
        
        {/* Left Column (empty spacer) - hidden on mobile */}
        <div className="hidden md:block md:w-1/2">
          {/* This side is intentionally left empty */}
        </div>

        {/* Right Column (for text and button) - full width on mobile */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center p-4 md:p-8 bg-white/30 backdrop-blur-sm md:bg-transparent">
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black main-heading-gradient leading-none"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            One Platform
          </motion.h1>
          <motion.p 
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-emerald-950 tracking-widest mt-2 mb-8 md:mb-10"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            Endless Possibilities
          </motion.p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
          >
            <Link 
              to="/dashboard"
              className="inline-block bg-black text-white font-semibold py-3 px-10 rounded-md uppercase hover:bg-gray-800 transition-colors text-lg"
            >
              Let's Go
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
}


// --- Main App Component ---
function Home() {
  return (
    <div>
      <Hero />
    </div>
  );
}

export default Home;
