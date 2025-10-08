import React, { useState } from 'react';

function IncomeTaxCalculator() {
  const [annualIncome, setAnnualIncome] = useState(500000);
  const [regime, setRegime] = useState('new');
  const [section80C, setSection80C] = useState(0);
  const [section80D, setSection80D] = useState(0);
  const [otherDeductions, setOtherDeductions] = useState(0);
  const [results, setResults] = useState(null);

  const calculateTax = () => {
    let taxableIncome = annualIncome;
    let totalDeductions = 0;

    if (regime === 'old') {
      // Old regime deductions
      totalDeductions = Math.min(section80C, 150000) + 
                       Math.min(section80D, 25000) + 
                       otherDeductions;
      taxableIncome = Math.max(0, annualIncome - totalDeductions);
    }

    let tax = 0;
    let cess = 0;

    if (regime === 'new') {
      // New Tax Regime (FY 2025-26)
      if (taxableIncome <= 300000) {
        tax = 0;
      } else if (taxableIncome <= 700000) {
        tax = (taxableIncome - 300000) * 0.05;
      } else if (taxableIncome <= 1000000) {
        tax = 400000 * 0.05 + (taxableIncome - 700000) * 0.10;
      } else if (taxableIncome <= 1200000) {
        tax = 400000 * 0.05 + 300000 * 0.10 + (taxableIncome - 1000000) * 0.15;
      } else if (taxableIncome <= 1500000) {
        tax = 400000 * 0.05 + 300000 * 0.10 + 200000 * 0.15 + (taxableIncome - 1200000) * 0.20;
      } else {
        tax = 400000 * 0.05 + 300000 * 0.10 + 200000 * 0.15 + 300000 * 0.20 + (taxableIncome - 1500000) * 0.30;
      }
    } else {
      // Old Tax Regime
      if (taxableIncome <= 250000) {
        tax = 0;
      } else if (taxableIncome <= 500000) {
        tax = (taxableIncome - 250000) * 0.05;
      } else if (taxableIncome <= 1000000) {
        tax = 250000 * 0.05 + (taxableIncome - 500000) * 0.20;
      } else {
        tax = 250000 * 0.05 + 500000 * 0.20 + (taxableIncome - 1000000) * 0.30;
      }
    }

    // Health and Education Cess (4%)
    cess = tax * 0.04;
    const totalTax = tax + cess;

    // Standard Deduction (₹50,000 for salaried)
    const standardDeduction = regime === 'new' ? 75000 : 50000;

    setResults({
      grossIncome: annualIncome,
      standardDeduction,
      totalDeductions,
      taxableIncome,
      incomeTax: tax,
      cess,
      totalTax,
      netIncome: annualIncome - totalTax,
      effectiveRate: (totalTax / annualIncome) * 100
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Income Tax Calculator (FY 2025-26)</h1>
        <p className="text-gray-600">Calculate your income tax liability for Assessment Year 2026-27</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Income & Deduction Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Gross Income (₹)
              </label>
              <input
                type="number"
                value={annualIncome}
                onChange={(e) => setAnnualIncome(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tax Regime
              </label>
              <select
                value={regime}
                onChange={(e) => setRegime(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="new">New Tax Regime</option>
                <option value="old">Old Tax Regime</option>
              </select>
            </div>

            {regime === 'old' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section 80C Deductions (₹)
                  </label>
                  <input
                    type="number"
                    value={section80C}
                    onChange={(e) => setSection80C(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    max="150000"
                  />
                  <p className="text-xs text-gray-500 mt-1">Maximum: ₹1.5 lakh</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section 80D (Health Insurance) (₹)
                  </label>
                  <input
                    type="number"
                    value={section80D}
                    onChange={(e) => setSection80D(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    max="25000"
                  />
                  <p className="text-xs text-gray-500 mt-1">Maximum: ₹25,000</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Other Deductions (₹)
                  </label>
                  <input
                    type="number"
                    value={otherDeductions}
                    onChange={(e) => setOtherDeductions(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}

            <button
              onClick={calculateTax}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Calculate Tax
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Tax Calculation Results</h2>
          
          {results ? (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Gross Income</p>
                <p className="text-xl font-bold text-blue-600">₹{results.grossIncome.toLocaleString()}</p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Standard Deduction</p>
                <p className="text-xl font-bold text-green-600">₹{results.standardDeduction.toLocaleString()}</p>
              </div>

              {regime === 'old' && (
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Deductions</p>
                  <p className="text-xl font-bold text-purple-600">₹{results.totalDeductions.toLocaleString()}</p>
                </div>
              )}

              <div className="p-4 bg-orange-50 rounded-lg">
                <p className="text-sm text-gray-600">Taxable Income</p>
                <p className="text-xl font-bold text-orange-600">₹{results.taxableIncome.toLocaleString()}</p>
              </div>

              <div className="p-4 bg-red-50 rounded-lg">
                <p className="text-sm text-gray-600">Income Tax</p>
                <p className="text-xl font-bold text-red-600">₹{Math.round(results.incomeTax).toLocaleString()}</p>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-600">Health & Education Cess</p>
                <p className="text-xl font-bold text-yellow-600">₹{Math.round(results.cess).toLocaleString()}</p>
              </div>

              <div className="p-4 bg-gray-800 text-white rounded-lg">
                <p className="text-sm">Total Tax Liability</p>
                <p className="text-2xl font-bold">₹{Math.round(results.totalTax).toLocaleString()}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Net Income (After Tax)</p>
                <p className="text-xl font-bold text-gray-600">₹{Math.round(results.netIncome).toLocaleString()}</p>
              </div>

              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-sm text-gray-600">Effective Tax Rate</p>
                <p className="text-xl font-bold text-indigo-600">{results.effectiveRate.toFixed(2)}%</p>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p>Enter your income details and click "Calculate Tax" to see the results.</p>
            </div>
          )}
        </div>
      </div>

      {/* Tax Slabs Information */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-blue-800">New Tax Regime (FY 2025-26)</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Up to ₹3 lakh: 0%</li>
            <li>• ₹3-7 lakh: 5%</li>
            <li>• ₹7-10 lakh: 10%</li>
            <li>• ₹10-12 lakh: 15%</li>
            <li>• ₹12-15 lakh: 20%</li>
            <li>• Above ₹15 lakh: 30%</li>
          </ul>
        </div>

        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-green-800">Old Tax Regime</h3>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Up to ₹2.5 lakh: 0%</li>
            <li>• ₹2.5-5 lakh: 5%</li>
            <li>• ₹5-10 lakh: 20%</li>
            <li>• Above ₹10 lakh: 30%</li>
            <li>• Plus: Various deductions available</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default IncomeTaxCalculator;