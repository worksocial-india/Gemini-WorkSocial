import React, { useState } from 'react';
import { trackCalculatorUsage } from '../hooks/useGoogleAnalytics';
import { usePageTitle } from '../hooks/usePageTitle';

function SukanyaSamriddhiCalculator() {
  usePageTitle('Sukanya Samriddhi Yojana Calculator');
  
  const [monthlyDeposit, setMonthlyDeposit] = useState(1000);
  const [currentAge, setCurrentAge] = useState(5);
  const [results, setResults] = useState(null);

  const calculateSSY = () => {
    // SSY scheme details:
    // - Annual deposit for 15 years
    // - Interest rate: 8.2% (current rate)
    // - Maturity: 21 years from account opening
    const interestRate = 8.2 / 100;
    const annualDeposit = monthlyDeposit * 12;
    const depositYears = 15;
    const maturityYears = 21;
    
    // Calculate total deposits
    const totalDeposits = annualDeposit * depositYears;
    
    // Calculate maturity amount using compound interest
    let maturityAmount = 0;
    
    // For deposit years (1-15): compound interest on each year's deposit
    for (let year = 1; year <= depositYears; year++) {
      const yearsToMaturity = maturityYears - year + 1;
      maturityAmount += annualDeposit * Math.pow(1 + interestRate, yearsToMaturity);
    }
    
    const totalInterest = maturityAmount - totalDeposits;
    const maturityAge = currentAge + maturityYears;
    
    setResults({
      totalDeposits,
      totalInterest,
      maturityAmount,
      maturityAge
    });

    // Track calculator usage
    trackCalculatorUsage('sukanya_samriddhi', 'calculate');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Sukanya Samriddhi Yojana Calculator</h1>
        <p className="text-gray-600">Calculate returns for your daughter's Sukanya Samriddhi Yojana investment</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Investment Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Deposit Amount (₹)
              </label>
              <input
                type="number"
                value={monthlyDeposit}
                onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="250"
                max="12500"
              />
              <p className="text-xs text-gray-500 mt-1">Minimum: ₹250, Maximum: ₹1.5 lakh per year</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Age of Girl Child
              </label>
              <input
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                max="10"
              />
              <p className="text-xs text-gray-500 mt-1">Account can be opened till age 10</p>
            </div>

            <button
              onClick={calculateSSY}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Calculate SSY Returns
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Investment Results</h2>
          
          {results ? (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Total Deposits (15 years)</p>
                <p className="text-2xl font-bold text-blue-600">₹{results.totalDeposits.toLocaleString()}</p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Total Interest Earned</p>
                <p className="text-2xl font-bold text-green-600">₹{results.totalInterest.toLocaleString()}</p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600">Maturity Amount (21 years)</p>
                <p className="text-2xl font-bold text-purple-600">₹{results.maturityAmount.toLocaleString()}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Maturity Age</p>
                <p className="text-2xl font-bold text-gray-600">{results.maturityAge} years</p>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p>Enter your investment details and click "Calculate SSY Returns" to see the results.</p>
            </div>
          )}
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-8 bg-yellow-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-3 text-yellow-800">Important Information</h3>
        <ul className="text-sm text-yellow-700 space-y-2">
          <li>• Current interest rate: 8.2% per annum (subject to change)</li>
          <li>• Minimum deposit: ₹250 per year</li>
          <li>• Maximum deposit: ₹1.5 lakh per year</li>
          <li>• Deposit period: 15 years from account opening</li>
          <li>• Maturity period: 21 years from account opening</li>
          <li>• Tax benefits under Section 80C</li>
          <li>• Interest and maturity amount are tax-free</li>
        </ul>
      </div>
    </div>
  );
}

export default SukanyaSamriddhiCalculator;