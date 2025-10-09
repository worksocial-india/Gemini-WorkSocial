import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, Server, FileText, Users, AlertCircle, Database, Code, Settings } from 'lucide-react';
import { usePageTitle } from './hooks/usePageTitle';

function Privacy() {
  usePageTitle('Privacy Policy | WorkSocial India');

  return (
    <div className="bg-gradient-to-br from-white to-blue-50/30 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
              <p className="text-xl text-blue-100">Your trust is our priority. Learn how we protect your data.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl">
              <Shield className="w-20 h-20 text-blue-200" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto py-12 px-4">
        {/* Last Updated Banner */}
        <div className="flex items-center justify-between bg-blue-50 rounded-xl p-4 border border-blue-100 mb-10">
          <div className="flex items-center">
            <FileText className="text-blue-600 w-5 h-5 mr-2" />
            <span className="text-blue-800 font-medium">Last Updated: October 9, 2025</span>
          </div>
          <button onClick={() => window.print()} className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Policy
          </button>
        </div>

        {/* Introduction */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-blue-100 rounded-full mr-4">
              <Eye className="text-blue-700 w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Introduction</h2>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600">
              This Privacy Policy explains how WorkSocial India ("we", "us", or "our") collects, uses, shares, and protects personal information when you use our website, mobile applications, APIs, and other services (collectively, the "Services"). We value your privacy and are committed to protecting your personal information.
            </p>
            <p className="text-gray-600">
              By accessing or using our Services, you agree to this Privacy Policy. If you do not agree with our policies and practices, please do not use our Services.
            </p>
          </div>
        </section>

        {/* Information We Collect */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-green-100 rounded-full mr-4">
              <Database className="text-green-700 w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Information We Collect</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Information You Provide</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Account information (name, email, phone number)</li>
                <li>Financial information for calculations</li>
                <li>Profile data and preferences</li>
                <li>Communication with us (support queries, feedback)</li>
                <li>Survey responses and testimonials</li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Information Collected Automatically</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-600">
                <li>Device information (IP address, browser type)</li>
                <li>Usage data and interactions</li>
                <li>Cookies and similar technologies</li>
                <li>Location information</li>
                <li>Log data and analytics information</li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Important Note:</strong> We do not collect or store sensitive financial information such as bank account details, credit card numbers, or passwords without explicit consent and proper security measures.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How We Use Your Information */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-purple-100 rounded-full mr-4">
              <Settings className="text-purple-700 w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">How We Use Your Information</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Core Services</h3>
              <ul className="list-none space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Provide financial calculators and tools
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Process and respond to your requests
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Maintain and service your account
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Improvements</h3>
              <ul className="list-none space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Enhance and improve our Services
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Research and analytics purposes
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Detect and prevent errors
                </li>
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Communication</h3>
              <ul className="list-none space-y-2 text-gray-600">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Send service-related notifications
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Marketing and promotional offers
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Respond to your inquiries
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* API Usage and Integration */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-indigo-100 rounded-full mr-4">
              <Code className="text-indigo-700 w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">API Usage and Integration</h2>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 mb-6">
            <div className="prose prose-lg max-w-none text-gray-600">
              <p>
                Our Services may include APIs (Application Programming Interfaces) that allow third-party applications to interact with our platform. When you use these APIs or authorize third-party applications to access your account:
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-3">Data Access</h4>
                <p className="text-gray-600">
                  Third-party applications may access your information according to the permissions you grant. You can review and revoke these permissions at any time in your account settings.
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-3">Developer Requirements</h4>
                <p className="text-gray-600">
                  We require all developers using our APIs to comply with our API Terms of Service and this Privacy Policy to ensure your information is properly protected.
                </p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-5 border border-blue-100 mt-6">
              <h4 className="font-semibold text-blue-800 flex items-center">
                <Server className="w-5 h-5 mr-2" />
                API Security Measures
              </h4>
              <ul className="mt-3 space-y-2 text-blue-700">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  API authentication using secure tokens
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Rate limiting to prevent abuse
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Encryption of data in transit and at rest
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Regular security audits and monitoring
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Data Sharing and Disclosure */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-red-100 rounded-full mr-4">
              <Users className="text-red-700 w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Data Sharing and Disclosure</h2>
          </div>

          <div className="prose prose-lg max-w-none mb-6 text-gray-600">
            <p>
              We may share your personal information in the following circumstances:
            </p>
          </div>
          
          <div className="overflow-hidden bg-white shadow-md border border-gray-200 sm:rounded-lg mb-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recipients
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Purpose
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data Category
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Service Providers</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">Assist in operating our business and providing services</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">Account information, usage data</div>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Business Partners</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">Offer joint products and services</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">Contact information, preferences</div>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Legal Requirements</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">Comply with applicable laws, regulations, legal process</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">Any information required by law</div>
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">Corporate Transactions</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">In connection with a merger, acquisition, or sale of assets</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">All collected information</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Third-Party Services</h3>
            <p className="text-gray-600 mb-4">
              Our Services may contain links to third-party websites, plugins, and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy practices.
            </p>
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-2">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">
                    We encourage you to read the privacy policy of every website you visit or third-party service you use when you leave our Services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Your Rights and Choices */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-teal-100 rounded-full mr-4">
              <Users className="text-teal-700 w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Your Rights and Choices</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Account Information</h3>
              <p className="text-gray-600 mb-4">
                You can review, update, or delete your account information by logging into your account settings. You may also contact us directly to request access to your personal information or to make corrections.
              </p>
              <Link to="/coming-soon" className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors inline-block">
                Manage Account Settings
              </Link>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Communications Preferences</h3>
              <p className="text-gray-600 mb-4">
                You can opt out of receiving promotional emails by following the instructions in those emails or by adjusting your notification preferences in your account settings.
              </p>
              <Link to="/coming-soon" className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors inline-block">
                Update Email Preferences
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Data Protection Rights</h3>
            <p className="text-gray-600 mb-4">
              Depending on your location, you may have the following rights:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="font-semibold text-gray-800">Access</p>
                <p className="text-sm text-gray-600">Request access to your personal data</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="font-semibold text-gray-800">Rectification</p>
                <p className="text-sm text-gray-600">Correct your personal data</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="font-semibold text-gray-800">Erasure</p>
                <p className="text-sm text-gray-600">Request deletion of your data</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="font-semibold text-gray-800">Restriction</p>
                <p className="text-sm text-gray-600">Request restriction of processing</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="font-semibold text-gray-800">Data Portability</p>
                <p className="text-sm text-gray-600">Request transfer of your data</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="font-semibold text-gray-800">Object</p>
                <p className="text-sm text-gray-600">Object to processing of your data</p>
              </div>
            </div>
          </div>
        </section>

        {/* Data Security */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-orange-100 rounded-full mr-4">
              <Lock className="text-orange-700 w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Data Security</h2>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <p className="text-gray-600 mb-6">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, loss, or alteration:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-4 bg-orange-50 rounded-lg border border-orange-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <h4 className="text-lg font-bold text-gray-800 mb-2">Encryption</h4>
                <p className="text-center text-gray-600 text-sm">All data transmitted to and from our services is encrypted using industry-standard protocols</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-orange-50 rounded-lg border border-orange-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <h4 className="text-lg font-bold text-gray-800 mb-2">Access Controls</h4>
                <p className="text-center text-gray-600 text-sm">Strict access controls limit who can access your data within our organization</p>
              </div>
              <div className="flex flex-col items-center p-4 bg-orange-50 rounded-lg border border-orange-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h4 className="text-lg font-bold text-gray-800 mb-2">Monitoring</h4>
                <p className="text-center text-gray-600 text-sm">Continuous monitoring for unauthorized access attempts and security threats</p>
              </div>
            </div>
            
            <div className="mt-6 text-gray-600">
              <p>
                While we strive to use commercially acceptable means to protect your personal information, no method of transmission over the Internet or electronic storage is 100% secure. We cannot guarantee absolute security.
              </p>
            </div>
          </div>
        </section>

        {/* Children's Privacy */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-pink-100 rounded-full mr-4">
              <Users className="text-pink-700 w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Children's Privacy</h2>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <p className="text-gray-600 mb-4">
              Our Services are not directed to individuals under the age of 18 ("Children"). We do not knowingly collect personal information from Children. If you are a parent or guardian and you are aware that your Child has provided us with personal information, please contact us. If we become aware that we have collected personal information from Children without verification of parental consent, we will take steps to remove that information from our servers.
            </p>
          </div>
        </section>

        {/* Changes to This Privacy Policy */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-gray-100 rounded-full mr-4">
              <FileText className="text-gray-700 w-6 h-6" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Changes to This Privacy Policy</h2>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <p className="text-gray-600 mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-blue-700">
                    For significant changes, we will provide more prominent notice, including email notifications to registered users about material changes to this Privacy Policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Us */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <div className="p-3 bg-green-100 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
            <p className="text-gray-600 mb-6">
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-3">Email</h4>
                <p className="text-gray-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  privacy@worksocial.in
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-3">Grievance Officer</h4>
                <p className="text-gray-600">
                  <strong>Arun Singh</strong><br />
                  <span className="flex items-center mt-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    arun.singh@worksocial.in
                  </span>
                </p>
              </div>
              <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-3">Postal Address</h4>
                <p className="text-gray-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  WorkSocial India<br />C-1-2 STREET 7<br />WEST VINOD NAGAR<br />DELHI 110092
                </p>
              </div>
            </div>
            <div className="mt-6">
              <Link to="/coming-soon" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors shadow-lg inline-flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Contact Data Protection Officer
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Privacy;
