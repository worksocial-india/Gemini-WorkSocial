import React, { useState } from 'react';
import { Calendar, User, Clock, ArrowRight, Search, Tag, TrendingUp, Mail, Edit3 } from 'lucide-react';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All', 'Home Loans', 'Investment', 'Insurance', 'Tax Planning', 
    'Personal Finance', 'Business Loans', 'Market Trends', 'Policy Updates'
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'Complete Guide to Home Loan Interest Rates in 2025',
      excerpt: 'Understanding the current home loan landscape in India, comparing fixed vs floating rates, and tips to get the best deals from leading banks.',
      content: 'Home loan interest rates have seen significant changes in 2025. With RBI\'s monetary policy shifts...',
      category: 'Home Loans',
      author: 'Rajesh Kumar',
      date: '2025-09-25',
      readTime: '8 min',
      image: '/images/homeloan-calculator.jpg',
      tags: ['Home Loans', 'Interest Rates', 'Banking', 'RBI Policy'],
      featured: true
    },
    {
      id: 2,
      title: 'Top 10 Investment Opportunities for Young Professionals',
      excerpt: 'Discover the best investment options for millennials and Gen-Z professionals to build wealth systematically.',
      content: 'Young professionals today have numerous investment avenues. From SIPs to digital gold...',
      category: 'Investment',
      author: 'Priya Sharma',
      date: '2025-09-22',
      readTime: '6 min',
      image: '/dashboard-hero-desktop.jpg',
      tags: ['Investment', 'SIP', 'Mutual Funds', 'Career'],
      featured: true
    },
    {
      id: 3,
      title: 'New Tax Benefits Under Section 80C for 2025-26',
      excerpt: 'Complete breakdown of tax-saving instruments and strategies to maximize your savings under current tax regime.',
      content: 'The Finance Ministry has introduced several changes to Section 80C benefits...',
      category: 'Tax Planning',
      author: 'CA Amit Verma',
      date: '2025-09-20',
      readTime: '10 min',
      image: '/hero-background-desktop.jpg',
      tags: ['Tax Planning', '80C', 'ELSS', 'PPF'],
      featured: false
    },
    {
      id: 4,
      title: 'Personal Loan vs Credit Card: Which is Better?',
      excerpt: 'Detailed comparison of personal loans and credit cards for different financial needs and situations.',
      content: 'When facing a financial crunch, choosing between personal loans and credit cards...',
      category: 'Personal Finance',
      author: 'Sneha Patel',
      date: '2025-09-18',
      readTime: '7 min',
      image: '/EMI-calculator.png',
      tags: ['Personal Loan', 'Credit Card', 'Debt Management'],
      featured: false
    },
    {
      id: 5,
      title: 'Insurance Planning: Term vs ULIP in 2025',
      excerpt: 'Understanding the differences between term insurance and ULIPs to make informed insurance decisions.',
      content: 'Insurance planning remains one of the most confusing aspects of financial planning...',
      category: 'Insurance',
      author: 'Dr. Arjun Singh',
      date: '2025-09-15',
      readTime: '9 min',
      image: '/hero-bg.jpg',
      tags: ['Insurance', 'Term Plan', 'ULIP', 'Life Insurance'],
      featured: false
    },
    {
      id: 6,
      title: 'Small Business Loan Schemes by Government of India',
      excerpt: 'Comprehensive guide to government-backed loan schemes for small and medium enterprises.',
      content: 'The Government of India offers various loan schemes to support SMEs...',
      category: 'Business Loans',
      author: 'Vikram Joshi',
      date: '2025-09-12',
      readTime: '12 min',
      image: '/dashboard-hero-desktop.jpg',
      tags: ['Business Loans', 'MSME', 'Government Schemes', 'Entrepreneurship'],
      featured: false
    },
    {
      id: 7,
      title: 'Market Volatility: How to Protect Your Investments',
      excerpt: 'Strategies to safeguard your investment portfolio during market uncertainties and economic downturns.',
      content: 'Market volatility is inevitable, but smart investors know how to navigate...',
      category: 'Market Trends',
      author: 'Rahul Gupta',
      date: '2025-09-10',
      readTime: '8 min',
      image: '/hero-background-desktop.jpg',
      tags: ['Market Trends', 'Risk Management', 'Portfolio', 'Volatility'],
      featured: false
    },
    {
      id: 8,
      title: 'Digital Banking Revolution: Impact on Personal Finance',
      excerpt: 'How digital banking is transforming personal finance management and what it means for consumers.',
      content: 'The digital banking revolution has fundamentally changed how we manage money...',
      category: 'Market Trends',
      author: 'Meera Krishnan',
      date: '2025-09-08',
      readTime: '6 min',
      image: '/EMI-calculator.png',
      tags: ['Digital Banking', 'Fintech', 'Technology', 'Personal Finance'],
      featured: false
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const BlogCard = ({ post, featured = false }) => (
    <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${featured ? 'lg:flex' : ''}`}>
      <div className={`${featured ? 'lg:w-1/2' : ''}`}>
        <img 
          src={post.image} 
          alt={post.title}
          className={`w-full object-cover ${featured ? 'h-64 lg:h-full' : 'h-48'}`}
        />
      </div>
      <div className={`p-6 ${featured ? 'lg:w-1/2' : ''}`}>
        <div className="flex items-center gap-4 mb-4">
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
            {post.category}
          </span>
          <div className="flex items-center text-gray-500 text-sm">
            <Calendar size={16} className="mr-1" />
            {formatDate(post.date)}
          </div>
          <div className="flex items-center text-gray-500 text-sm">
            <Clock size={16} className="mr-1" />
            {post.readTime}
          </div>
        </div>
        
        <h3 className={`font-bold text-gray-900 mb-3 ${featured ? 'text-xl lg:text-2xl' : 'text-lg'}`}>
          {post.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <User size={16} className="text-gray-500 mr-2" />
            <span className="text-sm text-gray-700">{post.author}</span>
          </div>
          <button className="flex items-center text-blue-600 hover:text-blue-800 font-medium">
            Read More <ArrowRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              WorkSocial India Blog
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Stay updated with the latest insights, trends, and expert advice on personal finance, 
              investments, loans, and financial planning in India.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search articles, topics, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Posts */}
        {selectedCategory === 'All' && (
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <TrendingUp className="text-yellow-500 mr-2" size={24} />
              <h2 className="text-2xl font-bold text-gray-900">Featured Articles</h2>
            </div>
            <div className="space-y-8">
              {featuredPosts.map((post) => (
                <BlogCard key={post.id} post={post} featured={true} />
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            {selectedCategory === 'All' ? 'Latest Articles' : `${selectedCategory} Articles`}
          </h2>
          
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">
                <Search size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg">No articles found matching your search.</p>
                <p className="text-sm">Try different keywords or browse all categories.</p>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(selectedCategory === 'All' ? regularPosts : filteredPosts).map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-blue-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Stay Updated with Financial Insights</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter and get the latest financial tips, market updates, and expert advice delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        {/* Admin Access Section */}
        <div className="mt-12 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Content Management</h3>
          <p className="text-gray-300 mb-6">
            Publish blog posts directly from your email or manage content through our secure admin dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.open('/email-guide', '_blank')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Mail size={20} />
              Email Publishing Guide
            </button>
            {/* Blog admin temporarily disabled
            <button
              onClick={() => window.open('/blog-admin', '_blank')}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Edit3 size={20} />
              Secure Admin Login
            </button>
            */}
          </div>
          <p className="text-xs text-gray-400 mt-4">
            🔒 Admin dashboard is protected with authentication
          </p>
        </div>

        {/* Blog Stats */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
            <div className="text-gray-600">Articles Published</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl font-bold text-green-600 mb-2">10K+</div>
            <div className="text-gray-600">Monthly Readers</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl font-bold text-purple-600 mb-2">25+</div>
            <div className="text-gray-600">Expert Authors</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-3xl font-bold text-orange-600 mb-2">9</div>
            <div className="text-gray-600">Categories</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;