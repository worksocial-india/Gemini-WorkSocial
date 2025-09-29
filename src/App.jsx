import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import { AuthProvider } from './AuthContext';
import { MemberProvider } from './MemberContext';
import { SubscriberProvider } from './SubscriberContext';
import FirebaseProvider from './FirebaseContext';
import ProtectedRoute from './ProtectedRoute';
import FirebaseLogin from './FirebaseLogin';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Dashboard from './Dashboard';
import About from './About';
import Services from './Services';
import Calculators from './Calculators';
import Contact from './Contact';
import EmiCalculator from './calculators/EmiCalculator';
import PartPaymentCalculator from './calculators/PartPaymentCalculator';
import KnowledgeHub from './KnowledgeHub';
import Blog from './Blog';
import BlogAdmin from './BlogAdmin';
import EmailIntegrationGuide from './EmailIntegrationGuide';
import MemberPortal from './MemberPortal';
import SubscriberPortal from './SubscriberPortal';
import Travel from './Travel';
import Property from './Property';
import Loans from './Loans';
import Insurance from './Insurance';
import Tax from './Tax';
import Credit from './Credit';
import Learn from './Learn';
import Deals from './Deals';
import Partners from './Partners';
import Community from './Community';
import Privacy from './Privacy';
import UnderConstruction from './UnderConstruction';


function App() {
  return (
    <FirebaseProvider>
      <AuthProvider>
        <MemberProvider>
          <SubscriberProvider>
          <Router>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/calculators" element={<Calculators />} />
                  <Route path="/calculators/emi" element={<EmiCalculator />} />
                  <Route path="/emi-calculator" element={<EmiCalculator />} />
                  <Route path="/calculators/part-payment" element={<PartPaymentCalculator />} />
                  <Route path="/part-payment-calculator" element={<PartPaymentCalculator />} />
                  <Route path="/knowledge" element={<KnowledgeHub />} />
                  <Route path="/blog" element={<Blog />} />
                  {/* Blog admin temporarily disabled
                  <Route path="/blog-admin" element={
                    <ProtectedRoute>
                      <BlogAdmin />
                    </ProtectedRoute>
                  } />
                  <Route path="/email-guide" element={
                    <ProtectedRoute>
                      <EmailIntegrationGuide />
                    </ProtectedRoute>
                  } />
                  */}
                  <Route path="/dashboard" element={<Dashboard />} />
                  {/* Members page temporarily disabled
                  <Route path="/members" element={<MemberPortal />} />
                  */}
                  <Route path="/subscribers" element={<SubscriberPortal />} />
                  <Route path="/travel" element={<Travel />} />
                  <Route path="/property" element={<Property />} />
                  <Route path="/loans" element={<Loans />} />
                  <Route path="/insurance" element={<Insurance />} />
                  <Route path="/tax" element={<Tax />} />
                  <Route path="/credit" element={<Credit />} />
                  <Route path="/learn" element={<Learn />} />
                  <Route path="/deals" element={<Deals />} />
                  <Route path="/partners" element={<Partners />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/firebase-login" element={<FirebaseLogin />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
            </div>
            <SpeedInsights />
            <Analytics />
          </Router>
        </SubscriberProvider>
      </MemberProvider>
    </AuthProvider>
    </FirebaseProvider>
  );
}

export default App;