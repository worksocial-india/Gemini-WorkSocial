import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="border-b border-slate-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-30">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/Logo-worksocialindia.png" alt="WorkSocial India Logo" className="h-10 object-contain" />
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 text-sm">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/services" className="hover:underline">Services</Link>
          <Link to="/calculators" className="hover:underline">Calculators</Link>
          <Link to="/knowledge" className="hover:underline">Knowledge Hub</Link>
          <Link to="/blog" className="hover:underline">Blog</Link>
          <Link to="/about" className="hover:underline">About Us</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
          <Link to="/game" className="hover:underline">Game</Link>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>
      
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg animate-fade-in-down">
          <div className="px-4 py-2 space-y-1">
            <Link to="/" className="block py-2 hover:bg-gray-50 rounded px-3" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/services" className="block py-2 hover:bg-gray-50 rounded px-3" onClick={() => setMobileMenuOpen(false)}>Services</Link>
            <Link to="/calculators" className="block py-2 hover:bg-gray-50 rounded px-3" onClick={() => setMobileMenuOpen(false)}>Calculators</Link>
            <Link to="/knowledge" className="block py-2 hover:bg-gray-50 rounded px-3" onClick={() => setMobileMenuOpen(false)}>Knowledge Hub</Link>
            <Link to="/blog" className="block py-2 hover:bg-gray-50 rounded px-3" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
            <Link to="/about" className="block py-2 hover:bg-gray-50 rounded px-3" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
            <Link to="/contact" className="block py-2 hover:bg-gray-50 rounded px-3" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            <Link to="/game" className="block py-2 hover:bg-gray-50 rounded px-3" onClick={() => setMobileMenuOpen(false)}>Game</Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
