import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Home, 
  TrendingUp, 
  CreditCard, 
  PieChart, 
  Shield, 
  Calculator, 
  FileText, 
  Award, 
  Users, 
  Target, 
  DollarSign,
  Briefcase,
  Car,
  GraduationCap,
  Building2,
  Banknote,
  Search,
  Clock,
  Star,
  ArrowRight,
  ChevronRight,
  Download,
  Share2,
  BookmarkPlus,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  IndianRupee
} from 'lucide-react';

// Knowledge categories with comprehensive Indian financial content
const knowledgeCategories = [
  {
    id: 'home-loans',
    title: 'Home Loans & Property',
    icon: Home,
    color: 'blue',
    description: 'Complete guide to home loans, property investment, and real estate financing in India',
    articleCount: 25,
    popular: true
  },
  {
    id: 'investments',
    title: 'Investment & Wealth Building',
    icon: TrendingUp,
    color: 'green',
    description: 'Mutual funds, stocks, SIPs, and wealth creation strategies for Indians',
    articleCount: 30,
    popular: true
  },
  {
    id: 'debt-consolidation',
    title: 'Debt Management',
    icon: CreditCard,
    color: 'red',
    description: 'Debt consolidation, credit management, and strategies to become debt-free',
    articleCount: 15,
    popular: false
  },
  {
    id: 'personal-loans',
    title: 'Personal Loans',
    icon: Banknote,
    color: 'purple',
    description: 'Personal loan options, eligibility, and smart borrowing strategies',
    articleCount: 18,
    popular: false
  },
  {
    id: 'insurance',
    title: 'Insurance & Protection',
    icon: Shield,
    color: 'orange',
    description: 'Life, health, and general insurance products for comprehensive protection',
    articleCount: 20,
    popular: false
  },
  {
    id: 'tax-planning',
    title: 'Tax Planning & Savings',
    icon: FileText,
    color: 'indigo',
    description: 'Income tax planning, deductions, and tax-saving investment options',
    articleCount: 22,
    popular: true
  }
];

// Featured articles with Indian financial focus
const featuredArticles = [
  {
    id: 1,
    title: 'Complete Guide to Home Loan Types in India 2025',
    category: 'Home Loans',
    readTime: '8 min',
    summary: 'Understanding fixed vs floating rates, loan tenure options, and choosing the right home loan product.',
    tags: ['Home Loan', 'Interest Rates', 'EMI'],
    popular: true,
    image: '/images/homeloan-calculator.jpg'
  },
  {
    id: 2,
    title: 'SIP vs Lump Sum: Which Investment Strategy Works Best?',
    category: 'Investments',
    readTime: '6 min',
    summary: 'Detailed comparison of systematic investment plans versus lump sum investments with examples.',
    tags: ['SIP', 'Mutual Funds', 'Investment Strategy'],
    popular: true
  },
  {
    id: 3,
    title: 'Debt Consolidation Loan: Pros, Cons & Eligibility',
    category: 'Debt Management',
    readTime: '5 min',
    summary: 'How to consolidate multiple debts into a single loan and reduce your financial burden.',
    tags: ['Debt Consolidation', 'Personal Loan', 'Credit Score']
  },
  {
    id: 4,
    title: 'Section 80C Tax Deductions: Complete List for 2025',
    category: 'Tax Planning',
    readTime: '7 min',
    summary: 'Maximize your tax savings with these Section 80C investment options and deductions.',
    tags: ['Tax Planning', '80C', 'Tax Savings']
  }
];

// Home loan products specific to Indian market
const homeLoanProducts = [
  {
    name: 'Regular Home Loan',
    description: 'Standard home loan for purchasing residential property',
    features: ['Up to 90% funding', 'Tenure up to 30 years', 'Fixed & floating rates'],
    bestFor: 'First-time home buyers'
  },
  {
    name: 'Home Construction Loan',
    description: 'Loan for constructing house on owned land',
    features: ['Stage-wise disbursement', 'Interest on utilized amount', 'Convert to regular loan'],
    bestFor: 'Building on own plot'
  },
  {
    name: 'Home Improvement Loan',
    description: 'Renovate, repair, or improve your existing home',
    features: ['Quick approval', 'No collateral needed', 'Flexible tenure'],
    bestFor: 'Home renovation projects'
  },
  {
    name: 'Balance Transfer Loan',
    description: 'Transfer existing home loan to get better rates',
    features: ['Lower interest rates', 'Top-up facility', 'Reduced EMI'],
    bestFor: 'Existing loan holders'
  },
  {
    name: 'Plot Purchase Loan',
    description: 'Finance for buying residential or commercial plots',
    features: ['Up to 80% funding', 'Competitive rates', 'Flexible repayment'],
    bestFor: 'Land investment'
  },
  {
    name: 'Home Extension Loan',
    description: 'Expand your existing home or add new floors',
    features: ['Based on property value', 'Quick processing', 'Tax benefits'],
    bestFor: 'Property expansion'
  }
];

// Investment opportunities in Indian market
const investmentOpportunities = [
  {
    category: 'Mutual Funds',
    products: ['Equity Funds', 'Debt Funds', 'Hybrid Funds', 'ELSS Funds', 'Index Funds'],
    riskLevel: 'Medium to High',
    expectedReturns: '10-15% p.a.',
    liquidity: 'High',
    taxBenefit: 'ELSS offers 80C benefits'
  },
  {
    category: 'Direct Equity',
    products: ['Large Cap Stocks', 'Mid Cap Stocks', 'Small Cap Stocks', 'Dividend Stocks'],
    riskLevel: 'High',
    expectedReturns: '12-18% p.a.',
    liquidity: 'High',
    taxBenefit: 'LTCG tax at 10%'
  },
  {
    category: 'Fixed Deposits & Bonds',
    products: ['Bank FDs', 'Corporate FDs', 'Government Bonds', 'Tax-Free Bonds'],
    riskLevel: 'Low to Medium',
    expectedReturns: '6-9% p.a.',
    liquidity: 'Medium',
    taxBenefit: 'Tax-free bonds available'
  },
  {
    category: 'Real Estate',
    products: ['Residential Property', 'Commercial Property', 'REITs', 'Land Investment'],
    riskLevel: 'Medium',
    expectedReturns: '8-12% p.a.',
    liquidity: 'Low',
    taxBenefit: 'Multiple deductions available'
  }
];

function KnowledgeHub() {
  const [searchTerm, setSearchTerm] = useState('');
  
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

  const getRiskColor = (risk) => {
    const riskColors = {
      'Low': 'text-green-600 bg-green-100',
      'Low to Medium': 'text-yellow-600 bg-yellow-100',
      'Medium': 'text-orange-600 bg-orange-100',
      'Medium to High': 'text-red-500 bg-red-100',
      'High': 'text-red-600 bg-red-100'
    };
    return riskColors[risk] || 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-2xl">
              <BookOpen className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">Knowledge Hub</h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Your Complete Guide to Indian Financial Products & Smart Money Management
          </p>
          
          {/* Search Bar */}
          <div className="mt-8 max-w-2xl mx-auto relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search financial topics, products, or strategies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl text-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full border border-blue-200 flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span>100+ Articles</span>
            </div>
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full border border-green-200 flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Expert Authors</span>
            </div>
            <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full border border-purple-200 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Updated Weekly</span>
            </div>
          </div>
        </div>
      </section>

      {/* Knowledge Categories */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Financial Knowledge Categories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore comprehensive guides on Indian financial products and investment strategies.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {knowledgeCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div key={category.id} className="relative bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-blue-200">
                  {category.popular && (
                    <div className="absolute -top-3 -right-3">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        POPULAR
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-xl mr-4 ${getColorClasses(category.color)}`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{category.title}</h3>
                      <p className="text-sm text-gray-500">{category.articleCount} articles</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">{category.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <button className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2">
                      Explore <ArrowRight className="h-4 w-4" />
                    </button>
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <BookmarkPlus className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 px-4 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Featured Articles</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Latest insights and guides from our financial experts.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {featuredArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                {article.image && (
                  <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                    <Home className="h-16 w-16 text-white opacity-50" />
                  </div>
                )}
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {article.category}
                    </span>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {article.readTime}
                      </div>
                      {article.popular && (
                        <div className="flex items-center gap-1 text-orange-500">
                          <Star className="h-4 w-4 fill-current" />
                          Popular
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{article.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{article.summary}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <button className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2">
                      Read More <ChevronRight className="h-4 w-4" />
                    </button>
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <BookmarkPlus className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Home Loan Products Guide */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Home Loan Products in India</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Understanding different types of home loans available in the Indian market.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {homeLoanProducts.map((product, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-lg mr-3">
                    <Home className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                </div>
                
                <p className="text-gray-600 mb-4 text-sm">{product.description}</p>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2 text-sm">Key Features:</h4>
                  <ul className="space-y-1">
                    {product.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle2 className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm">
                    <span className="font-semibold text-blue-800">Best for:</span>
                    <span className="text-blue-600 ml-1">{product.bestFor}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link 
              to="/calculators/emi"
              className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors gap-2"
            >
              <Calculator className="h-5 w-5" />
              Calculate Home Loan EMI
            </Link>
          </div>
        </div>
      </section>

      {/* Investment Opportunities */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Investment Opportunities in India</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore various investment options available for Indian investors.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {investmentOpportunities.map((investment, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-3 rounded-lg mr-4">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{investment.category}</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Expected Returns</p>
                    <p className="font-semibold text-green-600">{investment.expectedReturns}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Liquidity</p>
                    <p className="font-semibold text-blue-600">{investment.liquidity}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-gray-500">Risk Level:</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(investment.riskLevel)}`}>
                      {investment.riskLevel}
                    </span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Investment Options:</h4>
                  <div className="flex flex-wrap gap-2">
                    {investment.products.map((product, productIndex) => (
                      <span key={productIndex} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-yellow-800">
                      <span className="font-semibold">Tax Benefit: </span>
                      {investment.taxBenefit}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Tools Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Quick Financial Tools</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Use our calculators to make informed financial decisions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/calculators/emi" className="group bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-blue-200">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <Calculator className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">EMI Calculator</h3>
              <p className="text-gray-600 text-sm">Calculate loan EMIs instantly</p>
            </Link>
            
            <Link to="/calculators/investment" className="group bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-green-200">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                <PieChart className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">SIP Calculator</h3>
              <p className="text-gray-600 text-sm">Plan your systematic investments</p>
            </Link>
            
            <Link to="/calculators/eligibility" className="group bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-purple-200">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Loan Eligibility</h3>
              <p className="text-gray-600 text-sm">Check your loan eligibility</p>
            </Link>
            
            <Link to="/calculators/tax" className="group bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-orange-200">
              <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                <IndianRupee className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Tax Calculator</h3>
              <p className="text-gray-600 text-sm">Calculate income tax liability</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Stay Updated</h2>
          <p className="text-xl text-blue-100 mb-8">
            Get the latest financial insights, tips, and market updates delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
              Subscribe
            </button>
          </div>
          <p className="text-blue-100 text-sm mt-4">No spam, unsubscribe anytime.</p>
        </div>
      </section>
    </div>
  );
}

export default KnowledgeHub;
