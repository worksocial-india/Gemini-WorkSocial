import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator, 
  PieChart, 
  FileText, 
  TrendingUp, 
  CreditCard,
  Home,
  Car,
  Briefcase,
  Shield,
  DollarSign,
  Target,
  BarChart3,
  Smartphone,
  Clock,
  CheckCircle,
  ArrowRight,
  Download,
  Share2,
  Users,
  Award,
  Zap
} from 'lucide-react';

const services = [
  {
    id: 'emi-calculator',
    title: 'EMI Calculator',
    description: 'Calculate monthly EMIs for home loans, personal loans, car loans, and more with detailed amortization schedules.',
    icon: Calculator,
    color: 'blue',
    features: ['Instant EMI Calculation', 'Amortization Schedule', 'PDF & Excel Export', 'Part Payment Analysis'],
    link: '/calculators/emi',
    popular: true
  },
  {
    id: 'loan-eligibility',
    title: 'Loan Eligibility Calculator',
    description: 'Check your loan eligibility across different banks and get instant approval estimates.',
    icon: FileText,
    color: 'green',
    features: ['Multi-Bank Comparison', 'Income Assessment', 'Credit Score Impact', 'Instant Results'],
    link: '/calculators/eligibility',
    popular: false
  },
  {
    id: 'investment-planner',
    title: 'Investment Planning',
    description: 'Plan your investments with SIP calculators, mutual fund analysis, and portfolio optimization.',
    icon: PieChart,
    color: 'purple',
    features: ['SIP Calculator', 'Goal-Based Planning', 'Risk Assessment', 'Portfolio Tracking'],
    link: '/calculators/investment',
    popular: true
  },
  {
    id: 'home-loan-tools',
    title: 'Home Loan Tools',
    description: 'Comprehensive home loan calculators including affordability, comparison, and refinancing options.',
    icon: Home,
    color: 'orange',
    features: ['Affordability Calculator', 'Comparison Tool', 'Refinancing Analysis', 'Tax Benefits'],
    link: '/calculators/home-loan',
    popular: false
  },
  {
    id: 'personal-finance',
    title: 'Personal Finance Manager',
    description: 'Track your expenses, create budgets, and manage your personal finances effectively.',
    icon: Briefcase,
    color: 'indigo',
    features: ['Expense Tracking', 'Budget Planning', 'Financial Goals', 'Reports & Analytics'],
    link: '/finance/personal',
    popular: false
  },
  {
    id: 'insurance-calculator',
    title: 'Insurance Calculator',
    description: 'Calculate life insurance needs, term insurance premiums, and coverage requirements.',
    icon: Shield,
    color: 'red',
    features: ['Life Insurance Needs', 'Premium Calculator', 'Coverage Analysis', 'Policy Comparison'],
    link: '/calculators/insurance',
    popular: false
  }
];

const businessServices = [
  {
    title: 'Corporate Financial Training',
    description: 'Comprehensive financial literacy programs for your employees.',
    icon: Users,
    features: ['Custom Workshops', 'Online Training Modules', 'Progress Tracking', 'Certification']
  },
  {
    title: 'API Integration',
    description: 'Integrate our calculators into your website or application.',
    icon: Zap,
    features: ['RESTful APIs', 'Easy Integration', 'Custom Branding', 'Technical Support']
  },
  {
    title: 'White Label Solutions',
    description: 'Custom-branded financial calculators for your business.',
    icon: Award,
    features: ['Your Branding', 'Custom Features', 'Dedicated Support', 'Analytics Dashboard']
  }
];

function Services() {
  const getColorClasses = (color) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-600 border-blue-200',
      green: 'bg-green-100 text-green-600 border-green-200',
      purple: 'bg-purple-100 text-purple-600 border-purple-200',
      orange: 'bg-orange-100 text-orange-600 border-orange-200',
      indigo: 'bg-indigo-100 text-indigo-600 border-indigo-200',
      red: 'bg-red-100 text-red-600 border-red-200'
    };
    return colorMap[color] || colorMap.blue;
  };

  const getHoverClasses = (color) => {
    const hoverMap = {
      blue: 'hover:border-blue-300 hover:shadow-blue-100',
      green: 'hover:border-green-300 hover:shadow-green-100',
      purple: 'hover:border-purple-300 hover:shadow-purple-100',
      orange: 'hover:border-orange-300 hover:shadow-orange-100',
      indigo: 'hover:border-indigo-300 hover:shadow-indigo-100',
      red: 'hover:border-red-300 hover:shadow-red-100'
    };
    return hoverMap[color] || hoverMap.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl">
              <Briefcase className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">Our Services</h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Comprehensive Financial Tools & Solutions for Every Need
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full border border-blue-200 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              <span>Always Free</span>
            </div>
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full border border-green-200 flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              <span>Mobile Optimized</span>
            </div>
            <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full border border-purple-200 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Instant Results</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Financial Calculators & Tools</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional-grade financial tools designed by banking experts for accurate calculations and insights.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <div key={service.id} className={`relative bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 transition-all duration-300 hover:shadow-xl ${getHoverClasses(service.color)}`}>
                  {service.popular && (
                    <div className="absolute -top-3 -right-3">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        POPULAR
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-xl mr-4 ${getColorClasses(service.color)}`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{service.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex gap-3">
                    <Link 
                      to={service.link}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-center flex items-center justify-center gap-2"
                    >
                      Try Now <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Choose Our Tools?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built by banking professionals with years of experience in financial planning and analysis.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Accurate Calculations</h3>
              <p className="text-gray-600 text-sm">Bank-grade formulas ensure precise results every time</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Export Options</h3>
              <p className="text-gray-600 text-sm">Download results as PDF or Excel for your records</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Share2 className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Easy Sharing</h3>
              <p className="text-gray-600 text-sm">Share calculations via WhatsApp, email, or social media</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Smartphone className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Mobile Friendly</h3>
              <p className="text-gray-600 text-sm">Optimized for seamless use on all devices</p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Services */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Business Solutions</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Custom financial solutions for businesses, institutions, and organizations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {businessServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link 
                    to="/contact"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Learn More <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Thousands</h2>
            <p className="text-xl text-blue-100">
              Join the growing community of smart financial planners
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">EMI Calculations</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">15K+</div>
              <div className="text-blue-100">Active Users</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">₹500Cr+</div>
              <div className="text-blue-100">Loans Planned</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">99.9%</div>
              <div className="text-blue-100">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Choose the calculator that fits your needs and start planning your financial future today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/calculators/emi" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors flex items-center justify-center gap-2"
            >
              <Calculator className="h-5 w-5" />
              Try EMI Calculator
            </Link>
            <Link 
              to="/calculators" 
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <BarChart3 className="h-5 w-5" />
              View All Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Need Custom Solutions?</h3>
          <p className="text-gray-600 mb-6">
            Get in touch with our team to discuss custom financial tools and business solutions.
          </p>
          <Link 
            to="/contact"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Contact Our Team <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Services;
