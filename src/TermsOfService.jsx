import React from 'react';
import { Shield, Book, FileCheck, AlertCircle, CheckCircle, Users, Globe, Scale } from 'lucide-react';
import { usePageTitle } from './hooks/usePageTitle';

function TermsOfService() {
  usePageTitle('Terms of Service | WorkSocial India');

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <FileCheck size={64} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl md:text-2xl opacity-90">
              Please read these terms carefully before using our services
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-10">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-8">
              These Terms of Service ("Terms") govern your access to and use of WorkSocial India's website, applications, APIs, calculators, and other services (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Services.
            </p>

            {/* Acceptance of Terms */}
            <div className="mb-10">
              <div className="flex items-center mb-4">
                <CheckCircle className="text-green-600 mr-3 flex-shrink-0" />
                <h2 className="text-3xl font-bold text-gray-800">Acceptance of Terms</h2>
              </div>
              <div className="ml-10">
                <p className="mb-4">
                  By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you are using our Services on behalf of an organization, you are agreeing to these Terms on behalf of that organization.
                </p>
                <p>
                  We may modify these Terms at any time. Your continued use of the Services after any such changes constitutes your acceptance of the new Terms.
                </p>
              </div>
            </div>

            {/* Use of Services */}
            <div className="mb-10">
              <div className="flex items-center mb-4">
                <Globe className="text-blue-600 mr-3 flex-shrink-0" />
                <h2 className="text-3xl font-bold text-gray-800">Use of Services</h2>
              </div>
              <div className="ml-10">
                <p className="mb-4">
                  You agree to use our Services only for lawful purposes and in accordance with these Terms. You agree not to use our Services:
                </p>
                <ul className="list-disc ml-6 mb-4 space-y-2">
                  <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
                  <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation.</li>
                  <li>To impersonate or attempt to impersonate WorkSocial India, a WorkSocial India employee, another user, or any other person or entity.</li>
                  <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Services, or which may harm WorkSocial India or users of the Services.</li>
                </ul>
              </div>
            </div>

            {/* Account Creation and Security */}
            <div className="mb-10">
              <div className="flex items-center mb-4">
                <Shield className="text-indigo-600 mr-3 flex-shrink-0" />
                <h2 className="text-3xl font-bold text-gray-800">Account Creation and Security</h2>
              </div>
              <div className="ml-10">
                <p className="mb-4">
                  Some of our Services require you to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
                </p>
                <p className="mb-4">
                  You are responsible for safeguarding your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized access to or use of your account.
                </p>
                <p>
                  We reserve the right to disable any user account at any time if, in our opinion, you have violated any provision of these Terms.
                </p>
              </div>
            </div>

            {/* Financial Information and Calculators */}
            <div className="mb-10">
              <div className="flex items-center mb-4">
                <AlertCircle className="text-yellow-600 mr-3 flex-shrink-0" />
                <h2 className="text-3xl font-bold text-gray-800">Financial Information and Calculators</h2>
              </div>
              <div className="ml-10">
                <p className="mb-4">
                  Our Services may include calculators, financial information, and other tools that provide estimates or simulations. These tools:
                </p>
                <ul className="list-disc ml-6 mb-4 space-y-2">
                  <li>Are for informational and educational purposes only.</li>
                  <li>Do not constitute financial advice.</li>
                  <li>Are based on assumptions and may not be accurate for your specific situation.</li>
                  <li>Should not be relied upon for making financial decisions.</li>
                </ul>
                <p className="mb-4">
                  You acknowledge that the results provided by these tools are estimates only and may vary from actual results. We recommend consulting with a qualified financial professional before making any financial decisions.
                </p>
                <p>
                  We are not responsible for any decisions you make based on the information or calculations provided through our Services.
                </p>
              </div>
            </div>

            {/* Intellectual Property */}
            <div className="mb-10">
              <div className="flex items-center mb-4">
                <Book className="text-purple-600 mr-3 flex-shrink-0" />
                <h2 className="text-3xl font-bold text-gray-800">Intellectual Property</h2>
              </div>
              <div className="ml-10">
                <p className="mb-4">
                  The Services and all content, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by WorkSocial India, its licensors, or other providers of such material and are protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                </p>
                <p className="mb-4">
                  These Terms permit you to use the Services for your personal, non-commercial use only. You must not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Services, except as follows:
                </p>
                <ul className="list-disc ml-6 mb-4 space-y-2">
                  <li>Your computer may temporarily store copies of such materials incidental to your accessing and viewing those materials.</li>
                  <li>You may store files that are automatically cached by your Web browser for display enhancement purposes.</li>
                  <li>You may print or download one copy of a reasonable number of pages of the Services for your own personal, non-commercial use and not for further reproduction, publication, or distribution.</li>
                </ul>
              </div>
            </div>

            {/* API Usage */}
            <div className="mb-10">
              <div className="flex items-center mb-4">
                <Globe className="text-cyan-600 mr-3 flex-shrink-0" />
                <h2 className="text-3xl font-bold text-gray-800">API Usage</h2>
              </div>
              <div className="ml-10">
                <p className="mb-4">
                  If you access our API:
                </p>
                <ul className="list-disc ml-6 mb-4 space-y-2">
                  <li>You agree to comply with any API documentation or requirements we provide.</li>
                  <li>You must register and obtain an API key or authentication credentials.</li>
                  <li>You may not exceed rate limits or other usage restrictions we impose.</li>
                  <li>You must implement reasonable security measures to protect API keys and user data.</li>
                  <li>You must clearly attribute WorkSocial India as the source of data when displaying it to users.</li>
                  <li>We reserve the right to modify or discontinue the API at any time.</li>
                </ul>
                <p>
                  We may suspend or terminate your API access if we determine, in our sole discretion, that you have violated these Terms or are using our API in a manner that may impose a burden or risk on our infrastructure.
                </p>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div className="mb-10">
              <div className="flex items-center mb-4">
                <Scale className="text-red-600 mr-3 flex-shrink-0" />
                <h2 className="text-3xl font-bold text-gray-800">Limitation of Liability</h2>
              </div>
              <div className="ml-10">
                <p className="mb-4">
                  TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO EVENT WILL WORKSOCIAL INDIA, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE SERVICES, ANY WEBSITES LINKED TO IT, ANY CONTENT ON THE SERVICES OR SUCH OTHER WEBSITES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO, PERSONAL INJURY, PAIN AND SUFFERING, EMOTIONAL DISTRESS, LOSS OF REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS OR ANTICIPATED SAVINGS, LOSS OF USE, LOSS OF GOODWILL, LOSS OF DATA, AND WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE), BREACH OF CONTRACT, OR OTHERWISE, EVEN IF FORESEEABLE.
                </p>
                <p>
                  THE FOREGOING DOES NOT AFFECT ANY LIABILITY WHICH CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.
                </p>
              </div>
            </div>

            {/* Indemnification */}
            <div className="mb-10">
              <div className="flex items-center mb-4">
                <Shield className="text-green-600 mr-3 flex-shrink-0" />
                <h2 className="text-3xl font-bold text-gray-800">Indemnification</h2>
              </div>
              <div className="ml-10">
                <p>
                  You agree to defend, indemnify, and hold harmless WorkSocial India, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of the Services, including, but not limited to, any use of the Services' content, services, and products other than as expressly authorized in these Terms.
                </p>
              </div>
            </div>

            {/* Governing Law */}
            <div className="mb-10">
              <div className="flex items-center mb-4">
                <Globe className="text-gray-600 mr-3 flex-shrink-0" />
                <h2 className="text-3xl font-bold text-gray-800">Governing Law</h2>
              </div>
              <div className="ml-10">
                <p>
                  These Terms and any dispute or claim arising out of or in connection with them or their subject matter or formation shall be governed by and construed in accordance with the laws of India, without giving effect to any choice or conflict of law provision or rule.
                </p>
              </div>
            </div>

            {/* Contact Us */}
            <div className="mb-10">
              <div className="flex items-center mb-4">
                <Users className="text-blue-600 mr-3 flex-shrink-0" />
                <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
              </div>
              <div className="ml-10">
                <p className="mb-4">
                  If you have any questions about these Terms, please contact us at <a href="mailto:support@worksocial.in" className="text-blue-600 hover:text-blue-800">support@worksocial.in</a>.
                </p>
                
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Grievance Officer</h3>
                  <p className="mb-2">If you have any concerns or grievances regarding these Terms or our Services, you may contact our designated Grievance Officer:</p>
                  <div className="flex items-start mt-4">
                    <div className="bg-blue-100 p-2 rounded-full mr-4">
                      <Users className="text-blue-600 w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Arun Singh</p>
                      <p className="text-gray-600 flex items-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href="mailto:arun.singh@worksocial.in" className="text-blue-600 hover:text-blue-800">arun.singh@worksocial.in</a>
                      </p>
                      
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="font-semibold text-gray-800">Postal Address:</p>
                        <address className="text-gray-600 mt-1 not-italic">
                          WorkSocial India<br />
                          C-1-2 STREET 7<br />
                          WEST VINOD NAGAR<br />
                          DELHI 110092
                        </address>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Last Updated */}
            <div className="mt-12 pt-6 border-t border-gray-200">
              <p className="text-gray-500 text-sm">
                Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsOfService;