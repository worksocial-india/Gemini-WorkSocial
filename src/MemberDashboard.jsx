import React, { useState } from 'react';
import { useMember } from './hooks/useMember';
import { 
  User, Settings, Calculator, TrendingUp, BookOpen, MessageSquare, 
  Calendar, Bell, LogOut, Crown, Star, Shield, ChevronRight,
  DollarSign, PieChart, Target, Award, Phone, Mail, Edit3,
  Download, Upload, Eye, BarChart3, Briefcase, Home
} from 'lucide-react';

const MemberDashboard = () => {
  const { member, logout, getMembershipFeatures } = useMember();
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications] = useState([
    {
      id: 1,
      title: 'New Market Analysis Available',
      message: 'Weekly market insights for premium members',
      time: '2 hours ago',
      read: false,
      type: 'info'
    },
    {
      id: 2,
      title: 'EMI Calculator Updated',
      message: 'New features added to the EMI calculator',
      time: '1 day ago',
      read: false,
      type: 'update'
    },
    {
      id: 3,
      title: 'Consultation Scheduled',
      message: 'Your consultation is scheduled for tomorrow at 3 PM',
      time: '2 days ago',
      read: true,
      type: 'appointment'
    }
  ]);

  const membershipInfo = getMembershipFeatures(member?.membership);

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <Home size={20} /> },
    { id: 'tools', label: 'Financial Tools', icon: <Calculator size={20} /> },
    { id: 'insights', label: 'Market Insights', icon: <TrendingUp size={20} /> },
    { id: 'learning', label: 'Learning Center', icon: <BookOpen size={20} /> },
    { id: 'consultations', label: 'Consultations', icon: <MessageSquare size={20} /> },
    { id: 'profile', label: 'Profile', icon: <User size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> }
  ];

  const quickStats = [
    {
      label: 'Calculator Uses',
      value: member?.membership === 'premium' ? 'Unlimited' : '23/100',
      icon: <Calculator className="text-blue-600" size={24} />,
      color: 'bg-blue-50'
    },
    {
      label: 'Consultations Left',
      value: member?.membership === 'premium' ? 'Unlimited' : member?.membership === 'gold' ? '1/2' : '0/0',
      icon: <MessageSquare className="text-green-600" size={24} />,
      color: 'bg-green-50'
    },
    {
      label: 'Days Active',
      value: Math.floor((new Date() - new Date(member?.joinDate)) / (1000 * 60 * 60 * 24)),
      icon: <Calendar className="text-purple-600" size={24} />,
      color: 'bg-purple-50'
    },
    {
      label: 'Saved Amount',
      value: '₹15,420',
      icon: <DollarSign className="text-orange-600" size={24} />,
      color: 'bg-orange-50'
    }
  ];

  const financialTools = [
    {
      name: 'EMI Calculator',
      description: 'Calculate your loan EMIs with detailed breakdown',
      icon: <Calculator className="text-blue-600" size={24} />,
      link: '/calculators/emi',
      premium: false
    },
    {
      name: 'Investment Planner',
      description: 'Plan your investments with goal-based approach',
      icon: <Target className="text-green-600" size={24} />,
      link: '#',
      premium: true
    },
    {
      name: 'Retirement Calculator',
      description: 'Calculate how much you need for retirement',
      icon: <PieChart className="text-purple-600" size={24} />,
      link: '#',
      premium: true
    },
    {
      name: 'Tax Optimizer',
      description: 'Optimize your tax planning strategies',
      icon: <Briefcase className="text-orange-600" size={24} />,
      link: '#',
      premium: true
    }
  ];

  const membershipIcons = {
    basic: <Shield className="text-gray-600" size={20} />,
    gold: <Star className="text-yellow-600" size={20} />,
    premium: <Crown className="text-purple-600" size={20} />
  };

  const membershipColors = {
    basic: 'bg-gray-100 text-gray-800 border-gray-300',
    gold: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    premium: 'bg-purple-100 text-purple-800 border-purple-300'
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Welcome back, {member?.name}!</h2>
            <p className="text-blue-100 mb-4">
              You're saving money and making smart financial decisions with WorkSocial India
            </p>
            <div className="flex items-center gap-2">
              {membershipIcons[member?.membership]}
              <span className="font-semibold">{membershipInfo.name}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{quickStats[3].value}</div>
            <div className="text-blue-200">Total Saved</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-gray-600 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Calculator className="text-blue-600" size={20} />
              <div className="flex-1">
                <div className="font-medium text-gray-900">Used EMI Calculator</div>
                <div className="text-sm text-gray-600">2 hours ago</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <BookOpen className="text-green-600" size={20} />
              <div className="flex-1">
                <div className="font-medium text-gray-900">Read Market Analysis</div>
                <div className="text-sm text-gray-600">1 day ago</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <Download className="text-purple-600" size={20} />
              <div className="flex-1">
                <div className="font-medium text-gray-900">Downloaded Report</div>
                <div className="text-sm text-gray-600">3 days ago</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
          <div className="space-y-3">
            {notifications.slice(0, 3).map((notification) => (
              <div key={notification.id} className={`p-3 rounded-lg ${notification.read ? 'bg-gray-50' : 'bg-blue-50'}`}>
                <div className="font-medium text-gray-900">{notification.title}</div>
                <div className="text-sm text-gray-600 mb-1">{notification.message}</div>
                <div className="text-xs text-gray-500">{notification.time}</div>
              </div>
            ))}
          </div>
          <button className="mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium">
            View all notifications →
          </button>
        </div>
      </div>
    </div>
  );

  const renderTools = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Financial Tools</h2>
        <p className="text-gray-600">Access powerful financial calculators and planning tools</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {financialTools.map((tool, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gray-50 w-12 h-12 rounded-lg flex items-center justify-center">
                {tool.icon}
              </div>
              {tool.premium && !membershipInfo.limits.premiumContent && (
                <Crown className="text-yellow-500" size={20} />
              )}
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{tool.name}</h3>
            <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
            <button 
              className={`w-full py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2 ${
                tool.premium && !membershipInfo.limits.premiumContent
                  ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              disabled={tool.premium && !membershipInfo.limits.premiumContent}
            >
              {tool.premium && !membershipInfo.limits.premiumContent ? (
                <>
                  <Crown size={16} />
                  Upgrade Required
                </>
              ) : (
                <>
                  <Eye size={16} />
                  Use Tool
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Profile Information</h2>
        <p className="text-gray-600">Manage your account details and preferences</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <div className="text-center mb-6">
            <img 
              src={member?.profileImage} 
              alt={member?.name}
              className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold text-gray-900">{member?.name}</h3>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border mt-2 ${membershipColors[member?.membership]}`}>
              {membershipIcons[member?.membership]}
              {membershipInfo.name}
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="text-gray-500" size={16} />
              <span className="text-gray-700 text-sm">{member?.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="text-gray-500" size={16} />
              <span className="text-gray-700 text-sm">{member?.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="text-gray-500" size={16} />
              <span className="text-gray-700 text-sm">Member since {new Date(member?.joinDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-md border border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Membership Benefits</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Current Plan Features</h5>
              <ul className="space-y-2">
                {membershipInfo.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Usage Limits</h5>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-gray-600">Calculator Uses: </span>
                  <span className="font-medium">{membershipInfo.limits.calculatorUses === 'unlimited' ? 'Unlimited' : `${membershipInfo.limits.calculatorUses} per month`}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Consultations: </span>
                  <span className="font-medium">{membershipInfo.limits.consultations === 'unlimited' ? 'Unlimited' : `${membershipInfo.limits.consultations} per month`}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Premium Content: </span>
                  <span className="font-medium">{membershipInfo.limits.premiumContent ? 'Included' : 'Not Available'}</span>
                </div>
              </div>
            </div>
          </div>
          
          {member?.membership !== 'premium' && (
            <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <h6 className="font-medium text-gray-900">Upgrade to Premium</h6>
                  <p className="text-sm text-gray-600">Get unlimited access to all tools and features</p>
                </div>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                  Upgrade Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/Logo-worksocialindia.png" alt="WorkSocial India" className="h-8" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Member Portal</h1>
                <p className="text-sm text-gray-600">Welcome back, {member?.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-500 hover:text-gray-700">
                <Bell size={20} />
                <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></div>
              </button>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded-xl shadow-md border border-gray-200 p-6">
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  {item.label}
                  <ChevronRight size={16} className={`ml-auto ${activeTab === item.id ? 'opacity-100' : 'opacity-0'}`} />
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'tools' && renderTools()}
            {activeTab === 'profile' && renderProfile()}
            {activeTab === 'insights' && (
              <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Market Insights</h2>
                <p className="text-gray-600">Premium market analysis and insights coming soon...</p>
              </div>
            )}
            {activeTab === 'learning' && (
              <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Learning Center</h2>
                <p className="text-gray-600">Educational content and courses coming soon...</p>
              </div>
            )}
            {activeTab === 'consultations' && (
              <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Consultations</h2>
                <p className="text-gray-600">Book and manage your financial consultations...</p>
              </div>
            )}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl p-8 shadow-md border border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Settings</h2>
                <p className="text-gray-600">Manage your account settings and preferences...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;