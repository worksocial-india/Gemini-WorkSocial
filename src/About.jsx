import React from 'react';
import ZohoForm from './components/ZohoForm';
import { 
  Users, 
  Target, 
  Award, 
  TrendingUp, 
  Shield, 
  Calculator,
  PieChart,
  FileText,
  Heart,
  Lightbulb,
  CheckCircle,
  Star
} from 'lucide-react';

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-white text-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <img 
              src="/Logo-worksocialindia.png" 
              alt="WorkSocial India" 
              className="h-20 w-auto"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">About WorkSocial India</h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Empowering Financial Literacy Through Technology and Expertise
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full border border-blue-200">
              <span>🏦 Backed by Bankers</span>
            </div>
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full border border-green-200">
              <span>📊 Advanced Calculators</span>
            </div>
            <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full border border-purple-200">
              <span>📱 Mobile-First Design</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-blue-100">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Our Mission</h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                To democratize financial literacy by providing accessible, accurate, and comprehensive financial 
                tools that empower individuals to make informed decisions about their financial future. We bridge 
                the gap between complex financial concepts and everyday understanding.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-purple-100">
              <div className="flex items-center mb-6">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <Lightbulb className="h-8 w-8 text-purple-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Our Vision</h2>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                To become India's most trusted platform for financial education and tools, where every individual 
                has the knowledge and resources to achieve their financial goals with confidence and clarity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">Our Story</h2>
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              WorkSocial India was born from a simple observation: despite India's growing economy and increasing 
              financial opportunities, many individuals lack access to reliable, easy-to-understand financial tools 
              and education.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Founded by experienced banking professionals and technology experts, we recognized the need for a 
              platform that combines financial expertise with modern technology to create tools that are both 
              sophisticated and user-friendly.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Today, WorkSocial India serves thousands of users across the country, helping them calculate EMIs, 
              plan investments, understand loan eligibility, and make informed financial decisions with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Transparency</h3>
              <p className="text-gray-600">
                We believe in clear, honest communication about financial products and services, with no hidden 
                complexities or misleading information.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Accuracy</h3>
              <p className="text-gray-600">
                Our calculations and financial advice are backed by banking professionals and tested rigorously 
                to ensure precision and reliability.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Accessibility</h3>
              <p className="text-gray-600">
                Financial literacy should be available to everyone, regardless of their background or technical 
                expertise. We design for simplicity and inclusivity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">What We Offer</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Calculator className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">EMI Calculator</h3>
              <p className="text-gray-600 text-sm">
                Calculate monthly EMIs for home loans, personal loans, and more with detailed amortization schedules.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <PieChart className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Investment Planning</h3>
              <p className="text-gray-600 text-sm">
                Plan your investments with our comprehensive tools and visualize your financial growth.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Loan Eligibility</h3>
              <p className="text-gray-600 text-sm">
                Check your loan eligibility across different banks and financial institutions.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Financial Insights</h3>
              <p className="text-gray-600 text-sm">
                Get personalized insights and recommendations based on your financial profile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">Why Choose WorkSocial India?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start text-left">
              <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1">
                <Award className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Expert-Backed</h3>
                <p className="text-gray-600">
                  Our tools and advice are developed by banking professionals with years of industry experience.
                </p>
              </div>
            </div>
            
            <div className="flex items-start text-left">
              <div className="bg-green-100 p-2 rounded-full mr-4 mt-1">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">User-Friendly</h3>
                <p className="text-gray-600">
                  Designed with simplicity in mind, making complex financial calculations accessible to everyone.
                </p>
              </div>
            </div>
            
            <div className="flex items-start text-left">
              <div className="bg-purple-100 p-2 rounded-full mr-4 mt-1">
                <Shield className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Secure & Private</h3>
                <p className="text-gray-600">
                  Your financial data is processed securely with no personal information stored on our servers.
                </p>
              </div>
            </div>
            
            <div className="flex items-start text-left">
              <div className="bg-orange-100 p-2 rounded-full mr-4 mt-1">
                <Star className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Always Free</h3>
                <p className="text-gray-600">
                  Our core financial calculators and tools will always remain free for everyone to use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Take Control of Your Finances?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who trust WorkSocial India for their financial planning needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/calculators/emi" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Try EMI Calculator
            </a>
            <a 
              href="/contact" 
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Support</h4>
              <p className="text-gray-600">support@worksocial.in</p>
            </div>
            <div>
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Partnerships</h4>
              <p className="text-gray-600">partnerships@worksocial.in</p>
            </div>
            <div>
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Location</h4>
              <p className="text-gray-600">Mumbai, India</p>
            </div>
          </div>
        </div>
      </section>
      <ZohoForm />
    </div>
  );
}

export default About;
