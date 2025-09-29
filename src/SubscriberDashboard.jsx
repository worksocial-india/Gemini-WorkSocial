import React, { useState } from 'react';
import { useSubscriber } from './useSubscriber';
import { 
  Calendar, 
  TrendingUp, 
  BookOpen, 
  PlayCircle, 
  Users, 
  Phone,
  Bell,
  Settings,
  User,
  Star,
  Award,
  Target,
  Clock
} from 'lucide-react';

const SubscriberDashboard = () => {
  const { subscriber, logout, updateSubscriber, hasContentAccess, getSubscriptionFeatures } = useSubscriber();
  const [activeTab, setActiveTab] = useState('overview');

  if (!subscriber) return null;

  const subscriptionFeatures = { name: 'Free Access', price: '$0/month' };

  const ContentAccessCard = ({ title, description, icon: Icon, accessType, premium = false }) => {
    const hasAccess = true;
    
    return (
      <div className={`p-6 rounded-lg border-2 transition-all ${
        hasAccess 
          ? 'border-green-200 bg-green-50 hover:shadow-lg' 
          : 'border-gray-200 bg-gray-50 opacity-60'
      }`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <Icon className={`w-8 h-8 mr-3 ${hasAccess ? 'text-green-600' : 'text-gray-400'}`} />
            <div>
              <h3 className={`text-lg font-semibold ${hasAccess ? 'text-gray-900' : 'text-gray-500'}`}>
                {title}
              </h3>
            </div>
          </div>
          {hasAccess ? (
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Available
            </span>
          ) : (
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
              Upgrade Required
            </span>
          )}
        </div>
        <p className={`text-sm ${hasAccess ? 'text-gray-600' : 'text-gray-400'}`}>
          {description}
        </p>
      </div>
    );
  };

  const StatCard = ({ title, value, icon: Icon, color = 'blue' }) => (
    <div className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold text-${color}-600 mt-1`}>{value}</p>
        </div>
        <Icon className={`w-8 h-8 text-${color}-500`} />
      </div>
    </div>
  );

  const OverviewTab = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-8">
        <div className="flex items-center mb-4">
          <img
            src={subscriber.profileImage}
            alt={subscriber.name}
            className="w-16 h-16 rounded-full bg-white/20 p-2 mr-4"
          />
          <div>
            <h2 className="text-2xl font-bold">Welcome back, {subscriber.name}!</h2>
            <p className="text-blue-100 mt-1">
              Joined {new Date(subscriber.joinDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="text-center">
            <p className="text-3xl font-bold">{subscriber.stats.articlesRead}</p>
            <p className="text-blue-100 text-sm">Articles Read</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">{subscriber.stats.videosWatched}</p>
            <p className="text-blue-100 text-sm">Videos Watched</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">{subscriber.stats.webinarsAttended}</p>
            <p className="text-blue-100 text-sm">Webinars Attended</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">{subscriber.stats.consultationsUsed}</p>
            <p className="text-blue-100 text-sm">Consultations</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Days Active" 
          value={Math.floor((new Date() - new Date(subscriber.joinDate)) / (1000 * 60 * 60 * 24))} 
          icon={Calendar} 
          color="green" 
        />
        <StatCard 
          title="Subscription Status" 
          value="Active" 
          icon={Award} 
          color="blue" 
        />
        <StatCard 
          title="Content Access" 
          value="All" 
          icon={BookOpen} 
          color="purple" 
        />
        <StatCard 
          title="Next Billing" 
          value="N/A" 
          icon={Clock} 
          color="orange" 
        />
      </div>

      {/* Content Access Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ContentAccessCard
          title="Exclusive Articles"
          description="Access premium financial articles and insights from industry experts"
          icon={BookOpen}
          accessType="exclusive-articles"
        />
        <ContentAccessCard
          title="Video Content"
          description="Watch educational videos, tutorials, and market analysis"
          icon={PlayCircle}
          accessType="video-content"
        />
        <ContentAccessCard
          title="Live Webinars"
          description="Join live sessions with financial experts and ask questions"
          icon={Users}
          accessType="webinars"
        />
        <ContentAccessCard
          title="Expert Consultation"
          description="One-on-one consultation calls with certified financial advisors"
          icon={Phone}
          accessType="expert-consultation"
        />
      </div>
    </div>
  );

  const ContentTab = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Content Library</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Access all premium content.
        </p>
      </div>

      {/* Recent Articles */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Recent Articles</h3>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            {subscriber.stats.articlesRead} Read
          </span>
        </div>
        
        <div className="space-y-4">
          {[
            {
              title: "Understanding Mutual Fund SIPs in 2024",
              date: "2 days ago",
              readTime: "8 min read",
              category: "Investment"
            },
            {
              title: "Tax-Saving Strategies for Salaried Professionals",
              date: "1 week ago",
              readTime: "12 min read",
              category: "Tax Planning"
            },
            {
              title: "Home Loan Interest Rates: Current Trends",
              date: "2 weeks ago",
              readTime: "6 min read",
              category: "Real Estate"
            }
          ].map((article, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-semibold text-gray-900">{article.title}</h4>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <span>{article.date}</span>
                  <span className="mx-2">•</span>
                  <span>{article.readTime}</span>
                  <span className="mx-2">•</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                    {article.category}
                  </span>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                Read →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Video Content */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Video Library</h3>
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
            {subscriber.stats.videosWatched} Watched
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Portfolio Diversification Strategies",
              duration: "25 min",
              thumbnail: "/dashboard-hero-desktop.jpg"
            },
            {
              title: "Understanding Stock Market Basics",
              duration: "18 min",
              thumbnail: "/dashboard-hero-desktop.jpg"
            }
          ].map((video, index) => (
            <div key={index} className="relative group cursor-pointer">
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <PlayCircle className="w-16 h-16 text-white" />
                </div>
              </div>
              <div className="mt-3">
                <h4 className="font-semibold text-gray-900">{video.title}</h4>
                <p className="text-sm text-gray-500">{video.duration}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ProfileTab = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-lg p-8 border border-gray-200">
        <div className="flex items-center mb-8">
          <img
            src={subscriber.profileImage}
            alt={subscriber.name}
            className="w-20 h-20 rounded-full bg-gray-100 p-2 mr-6"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{subscriber.name}</h2>
            <p className="text-gray-600">{subscriber.email}</p>
            <p className="text-sm text-gray-500 mt-1">
              Member since {new Date(subscriber.joinDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={subscriber.email}
                  disabled
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  value={subscriber.phone}
                  onChange={(e) => updateSubscriber({ phone: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Subscription Details</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-blue-900">Free Access</h4>
                    <p className="text-blue-700">All content is available for free.</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Preferences</h3>
          <div className="space-y-4">
            {Object.entries(subscriber.preferences).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </label>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => 
                    updateSubscriber({
                      preferences: { ...subscriber.preferences, [key]: e.target.checked }
                    })
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img
                src="/Logo-worksocialindia.png"
                alt="WorkSocial India"
                className="h-8 w-auto mr-4"
              />
              <h1 className="text-xl font-semibold text-gray-900">Subscriber Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {subscriber.name}
              </span>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-8 max-w-md">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'content', label: 'Content', icon: BookOpen },
            { id: 'profile', label: 'Profile', icon: User }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center px-4 py-2 rounded-md font-medium transition-colors ${
                activeTab === id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'content' && <ContentTab />}
        {activeTab === 'profile' && <ProfileTab />}
      </div>
    </div>
  );
};

export default SubscriberDashboard;
