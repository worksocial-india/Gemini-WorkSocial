import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-30">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/Logo-worksocialindia.png" alt="WorkSocial India Logo" className="h-10 object-contain" />
        </Link>
        <nav className="hidden md:flex gap-6 text-sm">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/services" className="hover:underline">Services</Link>
          <Link to="/calculators" className="hover:underline">Calculators</Link>
          <Link to="/knowledge-hub" className="hover:underline">Knowledge Hub</Link>
          <Link to="/about" className="hover:underline">About Us</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
