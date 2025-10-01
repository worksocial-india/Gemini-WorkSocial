import React from 'react';
import { Outlet } from 'react-router-dom';
import ProductCard from './ProductCard';

// Financial calculator list
const products = [
  {
    id: 1,
    name: 'Home Loan EMI Calculator',
    description: 'Calculate your monthly home loan EMI with our easy-to-use calculator.',
    image: '/images/homeloan-calculator.jpg',
    status: 'active',
    link: '/calculators/emi',
  },
  {
    id: 2,
    name: 'Loan Part Payment Calculator',
    description: 'Calculate the impact of part payments on your loan.',
    image: '/images/Part-payment-calculator.jpg',
    status: 'active',
    link: '/calculators/part-payment',
  },
  {
    id: 3,
    name: 'Loan Eligibility Calculator',
    description: 'Check your loan eligibility for various types of loans.',
    image: '/images/loan-eligibility-calculator.jpg',
    status: 'active',
    link: '/calculators/eligibility',
  },
  {
    id: 4,
    name: 'SIP Calculator',
    description: 'Plan your investments with our Systematic Investment Plan (SIP) calculator.',
    image: '/images/sip-calculator.jpg',
    status: 'coming-soon',
  },
  {
    id: 5,
    name: 'Pro-Rata Calculator',
    description: 'Split expenses or income fairly across partial periods with pro-rata math.',
    image: '/images/pro-rata-calculator.jpg',
    status: 'coming-soon',
  },
];

function Calculators() {
  return (
    <div className="container mx-auto">
      <main className="p-6">
        <div className="mb-8">
          <Outlet />
        </div>

        <h2 className="text-2xl font-bold mb-6">Financial Calculators</h2>

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
