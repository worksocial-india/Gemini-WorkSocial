import React from 'react';
import { NavLink } from 'react-router-dom';

const calculatorLinks = [
  { name: 'SIP Calculator', path: '/calculators/sip' },
  { name: 'SWP Calculator', path: '/calculators/swp' },
  { name: 'Mutual Fund Calculator', path: '/calculators/mutual-fund' },
  { name: 'Step-up SIP Calculator', path: '/calculators/step-up-sip' },
  { name: 'Lump Sum Calculator', path: '/calculators/lump-sum' },
  { name: 'Retirement Calculator', path: '/calculators/retirement' },
  { name: 'Home Loan EMI Calculator', path: '/calculators/emi' },
  { name: 'Loan Part Payment Calculator', path: '/calculators/part-payment' },
  { name: 'Loan Eligibility Calculator', path: '/calculators/eligibility' },
  { name: 'Car Loan Calculator', path: '/calculators/car-loan' },
  { name: 'Pro-Rata Calculator', path: '/calculators/pro-rata' },
];

const CalculatorSidebar = () => {
  return (
    <div className="w-64 bg-gray-100 p-4">
      <h2 className="text-xl font-bold mb-4">Calculators</h2>
      <nav>
        <ul>
          {calculatorLinks.map((link) => (
            <li key={link.name} className="mb-2">
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `block p-2 rounded-md ${isActive ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default CalculatorSidebar;
