import React, { useState } from 'react';
import { Mail, Smartphone, Globe, Copy, CheckCircle, ArrowRight, Settings, Zap, Shield, Clock } from 'lucide-react';

const EmailIntegrationGuide = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const publishEmail = 'publish@worksocial.in';

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const steps = [
    {
      id: 1,
      title: 'Setup Email Publishing',
      description: 'Configure your email client to send to our publishing system',
      icon: <Settings className="text-blue-600" size={24} />
    },
    {
      id: 2,
      title: 'Compose Your Blog',
      description: 'Write your blog post in your favorite email client',
      icon: <Mail className="text-green-600" size={24} />
    },
    {
      id: 3,
      title: 'Send & Review',
      description: 'Send email and review the auto-generated draft',
      icon: <Zap className="text-purple-600" size={24} />
    },
    {
      id: 4,
      title: 'Publish Live',
      description: 'Approve and publish your post to the live blog',
      icon: <Globe className="text-orange-600" size={24} />
    }
  ];

  const emailFormats = [
    {
      subject: '[BLOG] Complete Guide to Home Loan Interest Rates in 2025',
      tags: '#HomeLoans #InterestRates #Banking',
      category: 'Home Loans',
      author: 'Your Name'
    },
    {
      subject: '[BLOG] Top Investment Strategies for Young Professionals',
      tags: '#Investment #SIP #MutualFunds',
      category: 'Investment',
      author: 'Your Name'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Email-to-Blog Publishing System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your email drafts into professional blog posts instantly. 
            Write in your favorite email client and publish with a single send.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Zap className="text-blue-600" size={24} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Instant Publishing</h3>
            <p className="text-gray-600 text-sm">Send an email and get a formatted blog post in seconds</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Smartphone className="text-green-600" size={24} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Mobile Friendly</h3>
            <p className="text-gray-600 text-sm">Compose and publish from any device, anywhere</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Shield className="text-purple-600" size={24} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Secure & Private</h3>
            <p className="text-gray-600 text-sm">End-to-end encryption with draft review before publishing</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Clock className="text-orange-600" size={24} />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Auto-Formatting</h3>
            <p className="text-gray-600 text-sm">Intelligent parsing with category and tag detection</p>
          </div>
        </div>

        {/* Step-by-Step Process */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How It Works</h2>
          
          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-12">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                    activeStep >= step.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                  onClick={() => setActiveStep(step.id)}
                >
                  {step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-4 ${
                    activeStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step Details */}
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Step {activeStep}: {steps[activeStep - 1].title}
            </h3>
            <p className="text-gray-600 mb-6">
              {steps[activeStep - 1].description}
            </p>

            {/* Step-specific content */}
            {activeStep === 1 && (
              <div className="bg-gray-50 rounded-lg p-6 text-left">
                <h4 className="font-semibold mb-4">Publishing Email Address:</h4>
                <div className="flex items-center gap-3 bg-white p-4 rounded-lg border">
                  <Mail className="text-gray-500" size={20} />
                  <code className="flex-1 text-blue-600 font-mono">{publishEmail}</code>
                  <button
                    onClick={() => copyToClipboard(publishEmail)}
                    className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    {copiedEmail ? <CheckCircle size={16} /> : <Copy size={16} />}
                    {copiedEmail ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  Add this email to your contacts for easy access when publishing blog posts.
                </p>
              </div>
            )}

            {activeStep === 2 && (
              <div className="bg-gray-50 rounded-lg p-6 text-left">
                <h4 className="font-semibold mb-4">Email Format Examples:</h4>
                <div className="space-y-4">
                  {emailFormats.map((format, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg border">
                      <div className="space-y-2">
                        <div><strong>Subject:</strong> <code className="text-blue-600">{format.subject}</code></div>
                        <div><strong>Tags:</strong> <span className="text-green-600">{format.tags}</span></div>
                        <div><strong>Category:</strong> <span className="text-purple-600">{format.category}</span></div>
                        <div><strong>Author:</strong> <span className="text-orange-600">{format.author}</span></div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Pro Tip:</strong> Start your subject with [BLOG] to trigger automatic processing. 
                    Include hashtags in your email body for automatic tag detection.
                  </p>
                </div>
              </div>
            )}

            {activeStep === 3 && (
              <div className="bg-gray-50 rounded-lg p-6 text-left">
                <h4 className="font-semibold mb-4">Automatic Processing Features:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-2">Smart Parsing</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Extract title from subject line</li>
                      <li>• Detect hashtags as tags</li>
                      <li>• Auto-generate excerpt</li>
                      <li>• Calculate reading time</li>
                    </ul>
                  </div>
                  <div className="bg-white p-4 rounded-lg">
                    <h5 className="font-medium text-gray-900 mb-2">Content Enhancement</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Format paragraphs properly</li>
                      <li>• Add featured image support</li>
                      <li>• Maintain original formatting</li>
                      <li>• Add publication metadata</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 4 && (
              <div className="bg-gray-50 rounded-lg p-6 text-left">
                <h4 className="font-semibold mb-4">Publishing Workflow:</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-yellow-600 font-semibold text-sm">1</span>
                    </div>
                    <div>
                      <div className="font-medium">Email Received</div>
                      <div className="text-sm text-gray-600">System processes your email automatically</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold text-sm">2</span>
                    </div>
                    <div>
                      <div className="font-medium">Draft Created</div>
                      <div className="text-sm text-gray-600">Review your post in the admin dashboard</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-semibold text-sm">3</span>
                    </div>
                    <div>
                      <div className="font-medium">Publish Live</div>
                      <div className="text-sm text-gray-600">One-click publish to your blog</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-center gap-4 mt-8">
              {activeStep > 1 && (
                <button
                  onClick={() => setActiveStep(activeStep - 1)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Previous
                </button>
              )}
              {activeStep < steps.length ? (
                <button
                  onClick={() => setActiveStep(activeStep + 1)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  Next <ArrowRight size={16} />
                </button>
              ) : (
                <div className="px-6 py-2 bg-gray-300 text-gray-600 rounded-lg cursor-not-allowed flex items-center gap-2">
                  Admin Access Disabled
                </div>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">How secure is email publishing?</h4>
                <p className="text-gray-600 text-sm">
                  All emails are processed securely and stored as drafts first. Nothing goes live without your approval.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Can I edit posts after email submission?</h4>
                <p className="text-gray-600 text-sm">
                  Yes! All email submissions become drafts that you can fully edit before publishing.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">What email clients are supported?</h4>
                <p className="text-gray-600 text-sm">
                  Any email client that can send to our publishing address - Gmail, Outlook, Apple Mail, mobile apps, etc.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">How long does processing take?</h4>
                <p className="text-gray-600 text-sm">
                  Email-to-blog conversion happens instantly. Your draft will be ready for review within seconds.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Can I include images in my emails?</h4>
                <p className="text-gray-600 text-sm">
                  Yes! Attached images will be processed and included in your blog post automatically.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">What about formatting?</h4>
                <p className="text-gray-600 text-sm">
                  Rich text formatting from your email (bold, italic, lists) will be preserved in the blog post.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Publishing?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Set up your email-to-blog publishing system today and streamline your content creation workflow.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => copyToClipboard(publishEmail)}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Mail size={20} />
              Copy Publishing Email
            </button>
            
            <div className="px-8 py-3 border border-gray-300 text-gray-400 rounded-lg cursor-not-allowed flex items-center justify-center gap-2">
              <Settings size={20} />
              Admin Access Disabled
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailIntegrationGuide;