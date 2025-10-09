import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Icon, ArrowRight, Sparkles, TrendingUp, Shield, Zap } from 'lucide-react';
import ZohoForm from './components/ZohoForm';
import EnhancedWhatsAppChat from './components/EnhancedWhatsAppChat';
import { trackButtonClick } from './hooks/useGoogleAnalytics';
import { usePageTitle } from './hooks/usePageTitle';

// --- Hero Section Component ---
function Hero() {
  return (
    <section className="hero-section-tailwind h-screen -mt-16 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Enhanced overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-purple/10 z-10"></div>
      
      {/* Main content container */}
      <div className="flex flex-col md:flex-row h-full relative z-20">
        
        {/* Left Column - hidden on mobile, enhanced floating elements for desktop */}
        <div className="hidden md:block md:w-1/2 relative">
          {/* Floating elements for visual interest */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 180, 360] 
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="absolute bottom-1/3 left-1/3 w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full shadow-lg"
            animate={{ 
              y: [0, 15, 0],
              x: [0, 10, 0] 
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1 
            }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-600 rounded-lg shadow-lg"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1] 
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2 
            }}
          />
        </div>

        {/* Mobile floating elements - visible only on mobile */}
        <div className="absolute inset-0 md:hidden pointer-events-none z-10">
          <motion.div 
            className="absolute top-20 right-6 w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg shadow-lg opacity-60"
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 180, 360] 
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="absolute top-1/3 left-6 w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full shadow-lg opacity-70"
            animate={{ 
              y: [0, 10, 0],
              x: [0, 8, 0] 
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1 
            }}
          />
          <motion.div 
            className="absolute bottom-1/3 right-8 w-5 h-5 bg-gradient-to-r from-pink-400 to-rose-500 rounded-full shadow-lg opacity-50"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.3, 1] 
            }}
            transition={{ 
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2 
            }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg shadow-lg opacity-60"
            animate={{ 
              y: [0, -12, 0],
              x: [0, -8, 0],
              rotate: [0, 180, 0] 
            }}
            transition={{ 
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3 
            }}
          />
        </div>

        {/* Right Column - enhanced content with mobile optimization */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center p-6 md:p-8 bg-white/15 backdrop-blur-lg md:bg-transparent pt-24 pb-12 md:pt-8 md:pb-8 border-l border-white/10 relative z-20">
          
          {/* Mobile-optimized floating badge */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-6 inline-flex items-center px-3 py-2 md:px-4 md:py-2 bg-gradient-to-r from-blue-500/30 to-purple-600/30 backdrop-blur-sm border border-white/30 rounded-full text-xs md:text-sm font-medium text-white shadow-lg"
          >
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 mr-2 text-yellow-400" />
            <span className="hidden sm:inline">Backed By Bankers</span>
            <span className="sm:hidden">#1 Financial Platform</span>
            <motion.div 
              className="ml-2 w-2 h-2 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Mobile-optimized main heading */}
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black main-heading-gradient leading-tight md:leading-none mb-3 md:mb-4 px-2"
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            One Platform
          </motion.h1>

          {/* Mobile-optimized subtitle */}
          <motion.p 
            className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-600 bg-clip-text text-transparent tracking-wide mt-1 md:mt-2 mb-6 md:mb-10 px-2"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            Endless Possibilities
          </motion.p>

          {/* Mobile-optimized feature highlights */}
          <motion.div 
            className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-6 md:mb-8 w-full max-w-sm md:max-w-md px-2"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            <motion.div 
              className="flex items-center space-x-1 sm:space-x-2 bg-white/15 backdrop-blur-sm rounded-lg px-2 py-2 sm:px-3 sm:py-2 border border-white/20"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0" />
              <span className="text-white text-xs sm:text-sm font-medium">Smart Investments</span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-1 sm:space-x-2 bg-white/15 backdrop-blur-sm rounded-lg px-2 py-2 sm:px-3 sm:py-2 border border-white/20"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0" />
              <span className="text-white text-xs sm:text-sm font-medium">Secure Banking</span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-1 sm:space-x-2 bg-white/15 backdrop-blur-sm rounded-lg px-2 py-2 sm:px-3 sm:py-2 border border-white/20"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0" />
              <span className="text-white text-xs sm:text-sm font-medium">Instant Loans</span>
            </motion.div>
            <motion.div 
              className="flex items-center space-x-1 sm:space-x-2 bg-white/15 backdrop-blur-sm rounded-lg px-2 py-2 sm:px-3 sm:py-2 border border-white/20"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 flex-shrink-0" />
              <span className="text-white text-xs sm:text-sm font-medium">AI-Powered</span>
            </motion.div>
          </motion.div>
          
          {/* Mobile-optimized CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            className="flex flex-col gap-3 sm:gap-4 items-center w-full px-4 sm:px-0"
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group w-full sm:w-auto"
            >
              <Link 
                to="/calculators"
                onClick={() => trackButtonClick('explore_platform', 'home_hero')}
                className="inline-flex items-center justify-center w-full sm:w-auto bg-gradient-to-r from-black via-gray-900 to-black text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 text-base sm:text-lg group-hover:from-gray-800 group-hover:to-gray-700 border border-white/20"
              >
                <span>Explore Platform</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </motion.div>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group w-full sm:w-auto"
            >
              <a
                href="https://forms.worksocial.in/WorkSocialIndia/form/SubscriberForm/formperma/e3gJZqZ66wGw1tzNbgvwiH3C5vv6r9noYo9aVXgZjD0"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackButtonClick('subscribe', 'home_hero')}
                className="inline-flex items-center justify-center w-full sm:w-auto bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-xl sm:rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 text-base sm:text-lg group-hover:from-blue-500 group-hover:to-blue-600 border border-blue-300/30"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span>Subscribe</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Mobile-optimized trust indicators */}
          <motion.div 
            className="mt-6 sm:mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <p className="text-white/70 text-xs sm:text-sm mb-2">Trusted by 10,000+ users nationwide</p>
            <div className="flex items-center justify-center space-x-3 sm:space-x-4">
              <div className="flex -space-x-1 sm:-space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full border-2 border-white shadow-lg"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1 + i * 0.1 }}
                  />
                ))}
              </div>
              <div className="flex items-center space-x-0.5 sm:space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, rotate: 180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 1.5 + i * 0.1 }}
                  >
                    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile-optimized scroll indicator */}
      <motion.div 
        className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 z-30"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center">
          <span className="text-xs sm:text-sm mb-1 sm:mb-2">Scroll to explore</span>
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-2 sm:h-3 bg-white/50 rounded-full mt-1 sm:mt-2"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

// --- Main App Component ---
function Home() {
  usePageTitle(''); // This will use the default title from usePageTitle hook
  
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
            <Link 
              to="/calculators" 
              onClick={() => trackButtonClick('explore_bankers', 'home_bankers_section')}
              className="mt-4 inline-block px-8 py-3 bg-blue-700 text-white font-semibold rounded-lg shadow hover:bg-blue-800 transition-colors text-lg"
            >
              Explore Bankers
            </Link>
          </div>
          <div className="bg-slate-100 rounded-xl shadow p-8 flex flex-col items-center">
            <img src="/customers.png" alt="Customer Corner" className="h-128 w-128 max-h-[512px] max-w-[512px] mb-6 object-contain rounded-xl bg-green-50" />
            <h3 className="font-bold text-2xl mb-4 text-center text-green-700">Customer Corner</h3>
            <Link to="/coming-soon" className="mt-4 inline-block px-8 py-3 bg-green-700 text-white font-semibold rounded-lg shadow hover:bg-green-800 transition-colors text-lg">Explore Customers</Link>
          </div>
        </div>
      </section>
      <ZohoForm />
      
      {/* Enhanced WhatsApp Chat Widget */}
      <EnhancedWhatsAppChat phoneNumber="918882371688" />
    </div>
  );
}

export default Home;
