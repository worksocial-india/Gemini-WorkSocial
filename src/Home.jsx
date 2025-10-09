import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Sparkles, TrendingUp, Shield, Zap, 
  Calculator, CreditCard, Home as HomeIcon, Landmark, 
  Briefcase, LineChart, Phone, Users, Globe
} from 'lucide-react';
import ZohoForm from './components/ZohoForm';
import EnhancedWhatsAppChat from './components/EnhancedWhatsAppChat';
import { trackButtonClick } from './hooks/useGoogleAnalytics';
import { usePageTitle } from './hooks/usePageTitle';

// Feature Card Component for Hero Grid
function FeatureCard({ icon: Icon, title, description, bgColor, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 + delay * 0.1, duration: 0.5 }}
      whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
      className={`${bgColor} rounded-2xl p-5 shadow-lg border border-white/20 backdrop-blur-sm h-full flex flex-col justify-between transition-all duration-300`}
    >
      <div>
        <div className="bg-white/20 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
          <Icon className="text-white w-6 h-6" />
        </div>
        <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
        <p className="text-white/80 text-sm">{description}</p>
      </div>
    </motion.div>
  );
}

// --- Hero Section Component with 3x3 Grid ---
function Hero() {
  // Background colors for each card
  const bgColors = [
    'bg-gradient-to-br from-blue-600 to-blue-800',    // 1
    'bg-gradient-to-br from-purple-600 to-indigo-800', // 2
    'bg-gradient-to-br from-emerald-600 to-teal-800',  // 3
    'bg-gradient-to-br from-pink-600 to-rose-800',     // 4
    'bg-gradient-to-br from-gray-700 to-gray-900',     // 5 (Center)
    'bg-gradient-to-br from-amber-600 to-orange-800',  // 6
    'bg-gradient-to-br from-cyan-600 to-blue-800',     // 7
    'bg-gradient-to-br from-violet-600 to-purple-800', // 8
    'bg-gradient-to-br from-green-600 to-emerald-800'  // 9
  ];

  // Feature cards data
  const features = [
    {
      icon: Calculator,
      title: "EMI Calculators",
      description: "Advanced tools for loan EMI calculation and financial planning",
      bgColor: bgColors[0]
    },
    {
      icon: CreditCard,
      title: "Credit Cards",
      description: "Compare credit cards and apply with simplified processes",
      bgColor: bgColors[1]
    },
    {
      icon: HomeIcon,
      title: "Home Loans",
      description: "Explore options for home financing with best rates",
      bgColor: bgColors[2]
    },
    {
      icon: LineChart,
      title: "Investments",
      description: "Investment options with detailed performance analysis",
      bgColor: bgColors[3]
    },
    {
      icon: Landmark,
      title: "WorkSocial",
      description: "Your complete financial ecosystem powered by banking experts",
      bgColor: bgColors[4]
    },
    {
      icon: Shield,
      title: "Insurance",
      description: "Protect what matters with comprehensive coverage options",
      bgColor: bgColors[5]
    },
    {
      icon: Briefcase,
      title: "Business Loans",
      description: "Funding solutions to grow and scale your business",
      bgColor: bgColors[6]
    },
    {
      icon: Users,
      title: "Community",
      description: "Connect with financial experts and like-minded individuals",
      bgColor: bgColors[7]
    },
    {
      icon: Phone,
      title: "Customer Support",
      description: "Expert assistance for all your financial queries",
      bgColor: bgColors[8]
    }
  ];

  return (
    <section className="hero-section-tailwind min-h-screen -mt-16 relative overflow-hidden py-20">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-yellow-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Enhanced overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-purple-900/20 z-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pt-16 md:pt-24">
        {/* Hero Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500/30 to-purple-600/30 backdrop-blur-sm border border-white/30 rounded-full text-sm font-medium text-white shadow-lg mb-4">
            <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
            <span>Backed By Bankers</span>
            <motion.div 
              className="ml-2 w-2 h-2 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          
          {/* Main Headline */}
          <motion.h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight md:leading-none mb-4 main-heading-gradient"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            One Platform
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-600 bg-clip-text text-transparent mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Endless Possibilities
          </motion.p>
        </motion.div>

        {/* 3x3 Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {/* First Row */}
          {features.slice(0, 3).map((feature, index) => (
            <FeatureCard 
              key={`row1-${index}`} 
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description} 
              bgColor={feature.bgColor} 
              delay={index} 
            />
          ))}
          
          {/* Second Row */}
          {features.slice(3, 6).map((feature, index) => (
            <FeatureCard 
              key={`row2-${index}`} 
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description} 
              bgColor={feature.bgColor} 
              delay={index + 3} 
            />
          ))}
          
          {/* Third Row */}
          {features.slice(6, 9).map((feature, index) => (
            <FeatureCard 
              key={`row3-${index}`} 
              icon={feature.icon} 
              title={feature.title} 
              description={feature.description} 
              bgColor={feature.bgColor} 
              delay={index + 6} 
            />
          ))}
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto"
          >
            <Link 
              to="/calculators"
              onClick={() => trackButtonClick('explore_platform', 'home_hero')}
              className="inline-flex items-center justify-center w-full sm:w-auto bg-gradient-to-r from-black via-gray-900 to-black text-white font-bold py-3 px-8 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 text-lg border border-white/20"
            >
              <span>Explore Platform</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto"
          >
            <a
              href="https://forms.worksocial.in/WorkSocialIndia/form/SubscriberForm/formperma/e3gJZqZ66wGw1tzNbgvwiH3C5vv6r9noYo9aVXgZjD0"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackButtonClick('subscribe', 'home_hero')}
              className="inline-flex items-center justify-center w-full sm:w-auto bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white font-bold py-3 px-8 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 text-lg border border-blue-300/30"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              <span>Subscribe</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/70 z-30"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.p 
          className="text-sm font-medium mb-2"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          Scroll to explore
        </motion.p>
        <motion.svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
        >
          <polyline points="7 13 12 18 17 13"></polyline>
          <polyline points="7 6 12 11 17 6"></polyline>
        </motion.svg>
      </motion.div>
    </section>
  );
}

// --- Main App Component ---
function Home() {
  usePageTitle(''); // This will use the default title from usePageTitle hook
  
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