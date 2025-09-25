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


function App() {
  return (
    <Router>
      <Header />
      <main className="pt-16"> {/* Add padding to main content to avoid overlap with fixed header */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/calculators" element={<Calculators />}>
            <Route path="emi" element={<EmiCalculator />} />
            <Route path="part-payment" element={<PartPaymentCalculator />} />
          </Route>
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;