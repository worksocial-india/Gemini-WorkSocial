import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';
import GoogleAnalyticsTracker from './components/GoogleAnalyticsTracker';
import { AuthProvider } from './AuthContext';
import { MemberProvider } from './MemberContext';
import { SubscriberProvider } from './SubscriberContext';
import FirebaseProvider from './FirebaseContext';
import ProtectedRoute from './ProtectedRoute';
import FirebaseLogin from './FirebaseLogin';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Game from './Game';
import NumberGuess from './NumberGuess';
import BalloonGame from './BalloonGame';
import Sudoku from './components/sudoku';
import Dashboard from './Dashboard';
import About from './About';
import Services from './Services';
import Calculators from './Calculators';
import Contact from './Contact';
import EmiCalculator from './calculators/EmiCalculator';
import PartPaymentCalculator from './calculators/PartPaymentCalculator';
import LoanEligibilityCalculator from './calculators/LoanEligibilityCalculator';
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
import TermsOfService from './TermsOfService';
import Banks from './pages/banks/Banks';
import CompanyDetail from './pages/banks/CompanyDetail';
import UnderConstruction from './UnderConstruction';
import CarLoanCalculator from './calculators/CarLoanCalculator';
import SipCalculator from './calculators/SipCalculator';
import SWPCalculator from './calculators/SWPCalculator';
import MutualFundCalculator from './calculators/MutualFundCalculator';
import StepUpSipCalculator from './calculators/StepUpSipCalculator';
import LumpSumCalculator from './calculators/LumpSumCalculator';
import RetirementCalculator from './calculators/RetirementCalculator';
import ProRataCalculator from './calculators/ProRataCalculator';
import SukanyaSamriddhiCalculator from './calculators/SukanyaSamriddhiCalculator';
import AtalPensionCalculator from './calculators/AtalPensionCalculator';
import IncomeTaxCalculator from './calculators/IncomeTaxCalculator';
import PPFCalculator from './calculators/PPFCalculator';
import FDCalculator from './calculators/FDCalculator';
import XIRRCalculator from './calculators/XIRRCalculator';
import GSTCalculator from './calculators/GSTCalculator';
import HRACalculator from './calculators/HRACalculator';
import CompoundInterestCalculator from './calculators/CompoundInterestCalculator';
import RDCalculator from './calculators/RDCalculator';


function App() {
  return (
    <FirebaseProvider>
      <AuthProvider>
        <MemberProvider>
          <SubscriberProvider>
          <Router>
            <GoogleAnalyticsTracker />
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
                  <Route path="/calculators/eligibility" element={<LoanEligibilityCalculator />} />
                  <Route path="/calculators/car-loan" element={<CarLoanCalculator />} />
                  <Route path="/calculators/sip" element={<SipCalculator />} />
                  <Route path="/calculators/swp" element={<SWPCalculator />} />
                  <Route path="/calculators/mutual-fund" element={<MutualFundCalculator />} />
                  <Route path="/calculators/step-up-sip" element={<StepUpSipCalculator />} />
                  <Route path="/calculators/lump-sum" element={<LumpSumCalculator />} />
                  <Route path="/calculators/retirement" element={<RetirementCalculator />} />
                  <Route path="/calculators/pro-rata" element={<ProRataCalculator />} />
                  <Route path="/calculators/sukanya-samriddhi" element={<SukanyaSamriddhiCalculator />} />
                  <Route path="/calculators/atal-pension" element={<AtalPensionCalculator />} />
                  <Route path="/calculators/income-tax" element={<IncomeTaxCalculator />} />
                  <Route path="/calculators/ppf" element={<PPFCalculator />} />
                  <Route path="/calculators/fd" element={<FDCalculator />} />
                  <Route path="/calculators/xirr" element={<XIRRCalculator />} />
                  <Route path="/calculators/gst" element={<GSTCalculator />} />
                  <Route path="/calculators/hra" element={<HRACalculator />} />
                  <Route path="/calculators/compound-interest" element={<CompoundInterestCalculator />} />
                  <Route path="/calculators/rd" element={<RDCalculator />} />
                  <Route path="/knowledge" element={<KnowledgeHub />} />
                  <Route path="/game" element={<Game />} />
                  <Route path="/game/number-guess" element={<NumberGuess />} />
                  <Route path="/game/sudoku" element={<Sudoku difficulty="medium" />} />
                  <Route path="/game/balloon" element={<BalloonGame />} />
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
                  <Route path="/banks" element={<Banks />} />
                  <Route path="/banks/:slug" element={<CompanyDetail />} />
                  <Route path="/coming-soon" element={<UnderConstruction />} />
                  <Route path="/firebase-login" element={<FirebaseLogin />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<TermsOfService />} />
                  <Route path="/under-construction" element={<UnderConstruction />} />
                </Routes>
              </main>
              <Footer />
            </div>
            <Analytics />
          </Router>
          </SubscriberProvider>
        </MemberProvider>
    </AuthProvider>
    </FirebaseProvider>
  );
}

export default App;





