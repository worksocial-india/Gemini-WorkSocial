import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import ProductCard from './ProductCard';

const products = [
  {
    id: 1,
    name: 'Home Loan EMI Calculator',
    description: 'Calculate your monthly home loan EMI with our easy-to-use calculator.',
    image: '/images/homeloan-calculator.jpg',
  },
  {
    id: 2,
    name: 'Personal Loan Calculator',
    description: 'Estimate your personal loan EMIs and plan your finances better.',
    image: 'https://via.placeholder.com/300x200.png?text=Personal+Loan',
  },
  {
    id: 3,
    name: 'Car Loan Calculator',
    description: 'Find out your car loan EMIs and make an informed decision.',
    image: 'https://via.placeholder.com/300x200.png?text=Car+Loan',
  },
  {
    id: 4,
    name: 'SIP Calculator',
    description: 'Plan your investments with our Systematic Investment Plan (SIP) calculator.',
    image: 'https://via.placeholder.com/300x200.png?text=SIP',
  },
  {
    id: 5,
    name: 'Lumpsum Calculator',
    description: 'Calculate the returns on your lumpsum investment with our calculator.',
    image: 'https://via.placeholder.com/300x200.png?text=Lumpsum',
  },
  {
    id: 6,
    name: 'Income Tax Calculator',
    description: 'Calculate your income tax for the financial year with our simple tool.',
    image: 'https://via.placeholder.com/300x200.png?text=Income+Tax',
  },
  {
    id: 7,
    name: 'GST Calculator',
    description: 'Calculate the Goods and Services Tax (GST) on your products or services.',
    image: 'https://via.placeholder.com/300x200.png?text=GST',
  },
  {
    id: 8,
    name: 'PPF Calculator',
    description: 'Calculate the returns on your Public Provident Fund (PPF) investment.',
    image: 'https://via.placeholder.com/300x200.png?text=PPF',
  },
  {
    id: 9,
    name: 'FD Calculator',
    description: 'Calculate the maturity amount of your Fixed Deposit (FD) investment.',
    image: 'https://via.placeholder.com/300x200.png?text=FD',
  },
  {
    id: 10,
    name: 'RD Calculator',
    description: 'Calculate the maturity amount of your Recurring Deposit (RD) investment.',
    image: 'https://via.placeholder.com/300x200.png?text=RD',
  },
  {
    id: 11,
    name: 'HRA Calculator',
    description: 'Calculate your House Rent Allowance (HRA) exemption with our tool.',
    image: 'https://via.placeholder.com/300x200.png?text=HRA',
  },
  {
    id: 12,
    name: 'Retirement Calculator',
    description: 'Plan your retirement with our comprehensive retirement calculator.',
    image: 'https://via.placeholder.com/300x200.png?text=Retirement',
  },
  {
    id: 13,
    name: 'Loan Eligibility Calculator',
    description: 'Check your loan eligibility for various types of loans.',
    image: 'https://via.placeholder.com/300x200.png?text=Eligibility',
  },
  {
    id: 14,
    name: 'Loan Amortization Calculator',
    description: 'View your loan amortization schedule with our detailed calculator.',
    image: 'https://via.placeholder.com/300x200.png?text=Amortization',
  },
  {
    id: 15,
    name: 'Part Payment Calculator',
    description: 'Calculate the impact of part payments on your loan tenure and EMI.',
    image: 'https://via.placeholder.com/300x200.png?text=Part+Payment',
  },
  {
    id: 16,
    name: 'Business Loan Calculator',
    description: 'Estimate your business loan EMIs and plan your business finances.',
    image: 'https://via.placeholder.com/300x200.png?text=Business+Loan',
  },
  {
    id: 17,
    name: 'Education Loan Calculator',
    description: 'Plan your education loan with our easy-to-use EMI calculator.',
    image: 'https://via.placeholder.com/300x200.png?text=Education+Loan',
  },
  {
    id: 18,
    name: 'Loan Against Property Calculator',
    description: 'Calculate the EMI for your loan against property.',
    image: 'https://via.placeholder.com/300x200.png?text=LAP',
  },
  {
    id: 19,
    name: 'Credit Card EMI Calculator',
    description: 'Convert your credit card outstanding into EMIs and manage your payments.',
    image: 'https://via.placeholder.com/300x200.png?text=Credit+Card+EMI',
  },
  {
    id: 20,
    name: 'Insurance Premium Calculator',
    description: 'Estimate the premium for your life or health insurance policy.',
    image: 'https://via.placeholder.com/300x200.png?text=Insurance',
  },
];


function Calculators() {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-100 p-6">
        <h2 className="text-xl font-bold mb-4">Calculators</h2>
        <nav className="flex flex-col space-y-2">
          <Link to="emi" className="hover:underline">EMI Calculator</Link>
          <Link to="part-payment" className="hover:underline">Part Payment</Link>
          <Link to="amortization" className="hover:underline">Amortization</Link>
          <Link to="eligibility" className="hover:underline">Eligibility</Link>
          <Link to="for-bankers" className="hover:underline">For Bankers</Link>
          <Link to="for-clients" className="hover:underline">For Clients</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <Outlet />
      </main>
    </div>
  );
}

export default Calculators;
