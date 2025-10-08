import React from 'react';
import { Outlet } from 'react-router-dom';
import ProductCard from './ProductCard';
import ZohoForm from './components/ZohoForm';
import { usePageTitle } from './hooks/usePageTitle';

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
    status: 'active',
    link: '/calculators/sip',
  },
  {
    id: 5,
    name: 'Pro-Rata Calculator',
    description: 'Split expenses or income fairly across partial periods with pro-rata math.',
    image: '/images/pro-rata-calculator.jpg',
    status: 'active',
    link: '/calculators/pro-rata',
  },
  {
    id: 6,
    name: 'Car Loan Calculator',
    description: 'Calculate your monthly car loan EMI and plan your purchase.',
    image: '/images/Car-loan-calculator.jpg',
    status: 'active',
    link: '/calculators/car-loan',
  },
  {
    id: 7,
    name: 'SWP Calculator',
    description: 'Plan regular withdrawals from your investments.',
    image: '/images/SWP-Calculator.jpg',
    status: 'active',
    link: '/calculators/swp',
  },
  {
    id: 8,
    name: 'Mutual Fund Calculator',
    description: 'Estimate returns on your mutual fund investments.',
    image: '/images/Mutual Fund-Calculator.jpg',
    status: 'active',
    link: '/calculators/mutual-fund',
  },
  {
    id: 9,
    name: 'Step-up SIP Calculator',
    description: 'Calculate returns with increasing SIP contributions.',
    image: '/images/StepupSIP-Calculator.jpg',
    status: 'active',
    link: '/calculators/step-up-sip',
  },
  {
    id: 10,
    name: 'Lump Sum Calculator',
    description: 'Calculate the future value of a one-time investment.',
    image: '/images/LumpSum-Calculator.jpg',
    status: 'active',
    link: '/calculators/lump-sum',
  },
  {
    id: 11,
    name: 'Retirement Calculator',
    description: 'Plan your retirement with our comprehensive calculator.',
    image: '/images/Retirement-Calculator.jpg',
    status: 'active',
    link: '/calculators/retirement',
  },
  {
    id: 12,
    name: 'Sukanya Samriddhi Yojana Calculator',
    description: 'Calculate returns for your daughter\'s SSY investment.',
    image: '/images/coming-soon.jpg',
    status: 'coming-soon',
    link: '/calculators/sukanya-samriddhi',
  },
  {
    id: 13,
    name: 'Atal Pension Yojana Calculator',
    description: 'Calculate your APY contributions and pension benefits.',
    image: '/images/coming-soon.jpg',
    status: 'coming-soon',
    link: '/calculators/atal-pension',
  },
  {
    id: 14,
    name: 'Income Tax Calculator (FY 2025-26)',
    description: 'Calculate your income tax liability for AY 2026-27.',
    image: '/images/coming-soon.jpg',
    status: 'coming-soon',
    link: '/calculators/income-tax',
  },
  {
    id: 15,
    name: 'PPF Calculator',
    description: 'Calculate your Public Provident Fund returns and tax benefits.',
    image: '/images/coming-soon.jpg',
    status: 'coming-soon',
    link: '/calculators/ppf',
  },
  {
    id: 16,
    name: 'FD Calculator',
    description: 'Calculate your Fixed Deposit maturity amount and interest.',
    image: '/images/coming-soon.jpg',
    status: 'coming-soon',
    link: '/calculators/fd',
  },
  {
    id: 17,
    name: 'XIRR Calculator',
    description: 'Calculate Extended Internal Rate of Return for irregular cash flows.',
    image: '/images/coming-soon.jpg',
    status: 'coming-soon',
    link: '/calculators/xirr',
  },
  {
    id: 18,
    name: 'GST Calculator',
    description: 'Calculate GST amount for goods and services.',
    image: '/images/coming-soon.jpg',
    status: 'coming-soon',
    link: '/calculators/gst',
  },
  {
    id: 19,
    name: 'HRA Calculator',
    description: 'Calculate HRA exemption and tax savings.',
    image: '/images/coming-soon.jpg',
    status: 'coming-soon',
    link: '/calculators/hra',
  },
  {
    id: 20,
    name: 'Compound Interest Calculator',
    description: 'Calculate compound interest with various compounding frequencies.',
    image: '/images/coming-soon.jpg',
    status: 'coming-soon',
    link: '/calculators/compound-interest',
  },
  {
    id: 21,
    name: 'RD Calculator',
    description: 'Calculate your Recurring Deposit maturity amount and returns.',
    image: '/images/coming-soon.jpg',
    status: 'coming-soon',
    link: '/calculators/rd',
  },
];

function Calculators() {
  usePageTitle('Financial Calculators');
  
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
      <ZohoForm />
    </div>
  );
}

export default Calculators;
