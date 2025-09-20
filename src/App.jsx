import React from 'react';
import './App.css';

// --- Navbar Component ---
function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">WorkSocial</a>
        <ul className="nav-menu">
          <li className="nav-item"><a href="/about" className="nav-link">About</a></li>
          <li className="nav-item"><a href="/services" className="nav-link">Services</a></li>
          <li className="nav-item"><a href="/contact" className="nav-link">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}

// --- Hero Section Component ---
function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <h1 className="hero-headline">Build Your Future, Smarter.</h1>
        <p className="hero-subheadline">Complex challenges require modern solutions. Let's create something amazing together.</p>
        <button className="hero-button">Get Started</button>
      </div>
    </section>
  );
}

// --- Footer Component ---
function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2025 WorkSocial. All Rights Reserved.</p>
    </footer>
  );
}

// --- Main App Component ---
// This brings all the other components together.
function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Hero />
      <Footer />
    </div>
  );
}

export default App;