import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Icon } from 'lucide-react';
import './App.css';

// --- Hero Section Component ---
function Hero() {
  return (
    // The main container with the background image
    <section className="hero-section-tailwind h-screen -mt-16 relative overflow-hidden">
      {/* Semi-transparent overlay for better visibility on mobile */}
      <div className="absolute inset-0 bg-black/10 md:bg-transparent z-10"></div>
      
      {/* Flexbox container to create columns */}
      <div className="flex flex-col md:flex-row h-full relative z-20">
        
        {/* Left Column (empty spacer) - hidden on mobile */}
        <div className="hidden md:block md:w-1/2">
          {/* This side is intentionally left empty */}
        </div>

        {/* Right Column (for text and button) - full width on mobile */}
  <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center p-4 md:p-8 bg-white/30 backdrop-blur-sm md:bg-transparent pt-32 md:pt-8">
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
            className="space-x-4"
          >
            <Link 
              to="/dashboard"
              className="inline-block bg-black text-white font-semibold py-3 px-10 rounded-md uppercase hover:bg-gray-800 transition-colors text-lg"
            >
              Let's Go
            </Link>
            <a
              href="https://forms.zoho.in/worksocial1/form/SubscriberForm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white font-semibold py-3 px-10 rounded-md uppercase hover:bg-blue-700 transition-colors text-lg"
            >
              Join Now
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

// --- Main App Component ---
function Home() {
  // Subscriber personalization temporarily disabled - showing normal site view for all users
  return (
    <div>
      <Hero />
      {/* New 4-column block below hero section */}
      <section className="w-full py-12 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <img src="/Financial-Services.png" alt="Financial Services" className="h-64 w-64 mb-4 object-contain rounded-full bg-blue-100" />
            <h3 className="font-bold text-lg mb-2">Banking & Financial Services Suite</h3>
            <p className="text-gray-600 text-sm text-center">All-in-one access to banking, loans, insurance, and investment tools for your financial growth.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <img src="/school-essensials.webp" alt="School Essentials" className="h-64 w-64 mb-4 object-contain rounded-full bg-green-100" />
            <h3 className="font-bold text-lg mb-2">School Essentials & Ed-Tech Tools</h3>
            <p className="text-gray-600 text-sm text-center">Smart resources for students, parents, and educators—stationery, books, and digital learning solutions.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <img src="/work-balalnce.png" alt="Work-Life Balance" className="h-64 w-64 mb-4 object-contain rounded-full bg-purple-100" />
            <h3 className="font-bold text-lg mb-2">Work-Life Balance Programs</h3>
            <p className="text-gray-600 text-sm text-center">Wellness, productivity, and lifestyle programs to help you thrive at work and at home.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <img src="/shopping-hub.png" alt="Shopping Hub" className="h-64 w-64 mb-4 object-contain rounded-full bg-orange-100" />
            <h3 className="font-bold text-lg mb-2">Shopping Hub</h3>
            <p className="text-gray-600 text-sm text-center">Curated deals and products for every need—fashion, electronics, home, and more.</p>
          </div>
        </div>
      </section>

      {/* Updated 2-column block below the 4-column block */}
      <section className="w-full py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div className="bg-slate-100 rounded-xl shadow p-8 flex flex-col items-center">
            <img src="/bankers.jpg" alt="Bankers Corner" className="h-128 w-128 max-h-[512px] max-w-[512px] mb-6 object-contain rounded-xl bg-blue-50" />
            <h3 className="font-bold text-2xl mb-4 text-center text-blue-700">Bankers Corner</h3>
            <Link to="/calculators" className="mt-4 inline-block px-8 py-3 bg-blue-700 text-white font-semibold rounded-lg shadow hover:bg-blue-800 transition-colors text-lg">Explore Bankers</Link>
          </div>
          <div className="bg-slate-100 rounded-xl shadow p-8 flex flex-col items-center">
            <img src="/customers.png" alt="Customer Corner" className="h-128 w-128 max-h-[512px] max-w-[512px] mb-6 object-contain rounded-xl bg-green-50" />
            <h3 className="font-bold text-2xl mb-4 text-center text-green-700">Customer Corner</h3>
            <Link to="/coming-soon" className="mt-4 inline-block px-8 py-3 bg-green-700 text-white font-semibold rounded-lg shadow hover:bg-green-800 transition-colors text-lg">Explore Customers</Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
