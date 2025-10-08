import React, { useState } from 'react';

function PPFCalculator() {
  const [annualDeposit, setAnnualDeposit] = useState(150000);
  const [currentAge, setCurrentAge] = useState(30);
  const [results, setResults] = useState(null);

  const calculatePPF = () => {
    const interestRate = 7.1 / 100; // Current PPF interest rate
    const lockInPeriod = 15; // PPF lock-in period in years
    const retirementAge = 60;
    const yearsToRetirement = retirementAge - currentAge;
    
    // Calculate PPF maturity after 15 years
    let ppfMaturityAmount = 0;
    for (let year = 1; year <= lockInPeriod; year++) {
      ppfMaturityAmount += annualDeposit * Math.pow(1 + interestRate, lockInPeriod - year + 1);
    }
    
    const totalDeposits = annualDeposit * lockInPeriod;
    const totalInterest = ppfMaturityAmount - totalDeposits;
    
    // If retirement is after PPF maturity, calculate extension benefits
    let extendedAmount = ppfMaturityAmount;
    let extensionYears = 0;
    
    if (yearsToRetirement > lockInPeriod) {
      extensionYears = Math.min(yearsToRetirement - lockInPeriod, 50); // Max 50 years extension
      // Option 1: Extend without further deposits
      const extendedWithoutDeposits = ppfMaturityAmount * Math.pow(1 + interestRate, extensionYears);
      
      // Option 2: Extend with continued deposits
      let extendedWithDeposits = ppfMaturityAmount;
      for (let year = 1; year <= extensionYears; year++) {
        extendedWithDeposits = (extendedWithDeposits + annualDeposit) * (1 + interestRate);
      }
      
      extendedAmount = Math.max(extendedWithoutDeposits, extendedWithDeposits);
    }
    
    // Tax benefits calculation
    const annualTaxSaving = annualDeposit * 0.3; // Assuming 30% tax bracket
    const totalTaxSaving = annualTaxSaving * lockInPeriod;
    
    setResults({
      totalDeposits,
      totalInterest,
      ppfMaturityAmount,
      lockInPeriod,
      extensionYears,
      extendedAmount,
      annualTaxSaving,
      totalTaxSaving,
      effectiveReturn: ((ppfMaturityAmount / totalDeposits - 1) / lockInPeriod) * 100
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">PPF Calculator</h1>
        <p className="text-gray-600">Calculate your Public Provident Fund returns and tax benefits</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Investment Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Deposit Amount (₹)
              </label>
              <input
                type="number"
                value={annualDeposit}
                onChange={(e) => setAnnualDeposit(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="500"
                max="150000"
              />
              <p className="text-xs text-gray-500 mt-1">Minimum: ₹500, Maximum: ₹1.5 lakh per year</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Age
              </label>
              <input
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="18"
                max="50"
              />
              <p className="text-xs text-gray-500 mt-1">PPF can be opened from age 18</p>
            </div>

            <button
              onClick={calculatePPF}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Calculate PPF Returns
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">PPF Calculation Results</h2>
          
          {results ? (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Total Deposits (15 years)</p>
                <p className="text-2xl font-bold text-blue-600">₹{results.totalDeposits.toLocaleString()}</p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Total Interest Earned</p>
                <p className="text-2xl font-bold text-green-600">₹{Math.round(results.totalInterest).toLocaleString()}</p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600">Maturity Amount (15 years)</p>
                <p className="text-2xl font-bold text-purple-600">₹{Math.round(results.ppfMaturityAmount).toLocaleString()}</p>
              </div>

              {results.extensionYears > 0 && (
                <div className="p-4 bg-orange-50 rounded-lg">
                  <p className="text-sm text-gray-600">Amount at Retirement (with extension)</p>
                  <p className="text-2xl font-bold text-orange-600">₹{Math.round(results.extendedAmount).toLocaleString()}</p>
                </div>
              )}

              <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-600">Annual Tax Saving (30% bracket)</p>
                <p className="text-2xl font-bold text-yellow-600">₹{results.annualTaxSaving.toLocaleString()}</p>
              </div>

              <div className="p-4 bg-red-50 rounded-lg">
                <p className="text-sm text-gray-600">Total Tax Saved (15 years)</p>
                <p className="text-2xl font-bold text-red-600">₹{results.totalTaxSaving.toLocaleString()}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Effective Annual Return</p>
                <p className="text-2xl font-bold text-gray-600">{results.effectiveReturn.toFixed(2)}%</p>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p>Enter your investment details and click "Calculate PPF Returns" to see the results.</p>
            </div>
          )}
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-8 bg-yellow-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-3 text-yellow-800">PPF Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ul className="text-sm text-yellow-700 space-y-2">
            <li>• Current interest rate: 7.1% per annum</li>
            <li>• Minimum deposit: ₹500 per year</li>
            <li>• Maximum deposit: ₹1.5 lakh per year</li>
            <li>• Lock-in period: 15 years</li>
            <li>• Extension: Up to 50 years in blocks of 5 years</li>
          </ul>
          <ul className="text-sm text-yellow-700 space-y-2">
            <li>• Tax deduction under Section 80C</li>
            <li>• Tax-free interest and maturity amount</li>
            <li>• Partial withdrawal allowed from 7th year</li>
            <li>• Loan facility from 3rd to 6th year</li>
            <li>• Nomination facility available</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PPFCalculator;