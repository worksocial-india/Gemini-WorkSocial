import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import ProductCard from './ProductCard';

// Financial calculator list
const products = [
  {
    id: 1,
    name: 'Home Loan EMI Calculator',
    description: 'Calculate your monthly home loan EMI with our easy-to-use calculator.',
    image: '/images/homeloan-calculator.jpg',
    status: 'coming-soon'
  },
  {
    id: 2,
    name: 'Personal Loan Calculator',
    description: 'Estimate your personal loan EMIs and plan your finances better.',
    image: 'https://via.placeholder.com/300x200.png?text=Personal+Loan',
    status: 'coming-soon'
  },
  {
    id: 3,
    name: 'Loan Eligibility Calculator',
    description: 'Check your loan eligibility for various types of loans.',
    image: 'https://via.placeholder.com/300x200.png?text=Eligibility',
    status: 'coming-soon'
  },
  {
    id: 4,
    name: 'SIP Calculator',
    description: 'Plan your investments with our Systematic Investment Plan (SIP) calculator.',
    image: 'https://via.placeholder.com/300x200.png?text=SIP',
    status: 'coming-soon'
  }
];

function Calculators() {
  return (
    <div className="container mx-auto">
      <main className="p-6">
        <div className="mb-8">
          <Outlet />
        </div>
        
        <h2 className="text-2xl font-bold mb-6">Financial Calculators</h2>
        <div className="bg-blue-50 p-4 rounded-lg mb-8">
          <p className="text-blue-800">
            Our calculators are currently being updated with new features. Check back soon!
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Calculators;
