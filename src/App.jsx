import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Dashboard from './Dashboard';
import About from './About';
import Services from './Services';
import Calculators from './Calculators';
import Contact from './Contact';
import EmiCalculator from './calculators/EmiCalculator';
import PartPaymentCalculator from './calculators/PartPaymentCalculator';
import KnowledgeHub from './KnowledgeHub';
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
    <Router>
      <Header />
      <main className="pt-16"> {/* Add padding to main content to avoid overlap with fixed header */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<UnderConstruction />} />
          <Route path="/services" element={<UnderConstruction />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="/calculators/emi" element={<EmiCalculator />} />
          <Route path="/calculators/part-payment" element={<PartPaymentCalculator />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/knowledge" element={<UnderConstruction />} />
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
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/coming-soon" element={<UnderConstruction />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;