import React, { useState } from 'react';

function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [annualRate, setAnnualRate] = useState(8);
  const [timePeriod, setTimePeriod] = useState(5);
  const [timeUnit, setTimeUnit] = useState('years');
  const [compoundingFrequency, setCompoundingFrequency] = useState(1);
  const [additionalContribution, setAdditionalContribution] = useState(0);
  const [contributionFrequency, setContributionFrequency] = useState('yearly');
  const [results, setResults] = useState(null);

  const calculateCompoundInterest = () => {
    let timeInYears = timePeriod;
    if (timeUnit === 'months') {
      timeInYears = timePeriod / 12;
    } else if (timeUnit === 'days') {
      timeInYears = timePeriod / 365;
    }

    const rate = annualRate / 100;
    const n = compoundingFrequency;
    const t = timeInYears;

    // Basic compound interest calculation
    const compoundAmount = principal * Math.pow(1 + rate/n, n * t);
    const compoundInterest = compoundAmount - principal;

    // Calculate with additional contributions
    let totalWithContributions = compoundAmount;
    let totalContributions = 0;

    if (additionalContribution > 0) {
      // Convert contribution frequency to annual
      let contributionsPerYear = 1;
      switch(contributionFrequency) {
        case 'monthly': contributionsPerYear = 12; break;
        case 'quarterly': contributionsPerYear = 4; break;
        case 'half-yearly': contributionsPerYear = 2; break;
        case 'yearly': contributionsPerYear = 1; break;
      }

      // Future value of annuity formula
      const periodicRate = rate / contributionsPerYear;
      const periods = contributionsPerYear * t;
      
      if (periodicRate > 0) {
        const annuityFV = additionalContribution * 
          ((Math.pow(1 + periodicRate, periods) - 1) / periodicRate);
        totalWithContributions = compoundAmount + annuityFV;
        totalContributions = additionalContribution * periods;
      } else {
        totalContributions = additionalContribution * periods;
        totalWithContributions = compoundAmount + totalContributions;
      }
    }

    // Simple interest comparison
    const simpleInterest = principal * rate * t;
    const simpleAmount = principal + simpleInterest;

    // Calculate effective annual rate
    const effectiveRate = (Math.pow(compoundAmount / principal, 1/t) - 1) * 100;

    setResults({
      principal,
      rate: annualRate,
      timeInYears: t,
      timePeriod,
      timeUnit,
      compoundingFrequency: n,
      compoundAmount,
      compoundInterest,
      simpleInterest,
      simpleAmount,
      interestDifference: compoundInterest - simpleInterest,
      effectiveRate,
      totalContributions,
      totalWithContributions,
      totalInvestment: principal + totalContributions,
      totalReturns: totalWithContributions - principal - totalContributions
    });
  };

  const frequencyOptions = [
    { value: 365, label: 'Daily' },
    { value: 12, label: 'Monthly' },
    { value: 4, label: 'Quarterly' },
    { value: 2, label: 'Half-yearly' },
    { value: 1, label: 'Yearly' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Compound Interest Calculator</h1>
        <p className="text-gray-600">Calculate compound interest with various compounding frequencies</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Investment Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Principal Amount (₹)
              </label>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Interest Rate (%)
              </label>
              <input
                type="number"
                value={annualRate}
                onChange={(e) => setAnnualRate(Number(e.target.value))}
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0.1"
                max="30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time Period
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(Number(e.target.value))}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                />
                <select
                  value={timeUnit}
                  onChange={(e) => setTimeUnit(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="days">Days</option>
                  <option value="months">Months</option>
                  <option value="years">Years</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Compounding Frequency
              </label>
              <select
                value={compoundingFrequency}
                onChange={(e) => setCompoundingFrequency(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {frequencyOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label} ({option.value} times/year)
                  </option>
                ))}
              </select>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3 text-gray-700">Additional Contributions (Optional)</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Contribution Amount (₹)
                </label>
                <input
                  type="number"
                  value={additionalContribution}
                  onChange={(e) => setAdditionalContribution(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>

              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contribution Frequency
                </label>
                <select
                  value={contributionFrequency}
                  onChange={(e) => setContributionFrequency(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="half-yearly">Half-yearly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>

            <button
              onClick={calculateCompoundInterest}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Calculate Compound Interest
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Calculation Results</h2>
          
          {results ? (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Principal Amount</p>
                <p className="text-2xl font-bold text-blue-600">₹{results.principal.toLocaleString()}</p>
              </div>

              {results.totalContributions > 0 && (
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Additional Contributions</p>
                  <p className="text-2xl font-bold text-purple-600">₹{results.totalContributions.toLocaleString()}</p>
                </div>
              )}

              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Compound Interest Earned</p>
                <p className="text-2xl font-bold text-green-600">₹{Math.round(results.compoundInterest).toLocaleString()}</p>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-600">Final Amount</p>
                <p className="text-2xl font-bold text-yellow-600">₹{Math.round(results.totalWithContributions).toLocaleString()}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Effective Annual Rate</p>
                <p className="text-2xl font-bold text-gray-600">{results.effectiveRate.toFixed(2)}%</p>
              </div>

              {/* Comparison with Simple Interest */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3 text-gray-700">Compound vs Simple Interest:</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-red-50 rounded">
                    <p className="text-xs text-gray-600">Simple Interest</p>
                    <p className="text-lg font-bold text-red-600">₹{Math.round(results.simpleInterest).toLocaleString()}</p>
                  </div>

                  <div className="p-3 bg-green-50 rounded">
                    <p className="text-xs text-gray-600">Compound Interest</p>
                    <p className="text-lg font-bold text-green-600">₹{Math.round(results.compoundInterest).toLocaleString()}</p>
                  </div>
                </div>

                <div className="mt-3 p-3 bg-orange-50 rounded">
                  <p className="text-sm text-gray-600">Extra Earnings from Compounding</p>
                  <p className="text-lg font-bold text-orange-600">₹{Math.round(results.interestDifference).toLocaleString()}</p>
                </div>
              </div>

              <div className="mt-4 p-3 bg-indigo-50 rounded">
                <p className="text-sm text-gray-600">Time Period</p>
                <p className="text-lg font-bold text-indigo-600">
                  {results.timeInYears.toFixed(2)} years
                  {results.compoundingFrequency > 1 && (
                    <span className="text-sm ml-2">
                      (Compounded {results.compoundingFrequency} times/year)
                    </span>
                  )}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p>Enter your investment details and click "Calculate Compound Interest" to see the results.</p>
            </div>
          )}
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-8 bg-yellow-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-3 text-yellow-800">Compound Interest Formula & Concepts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-yellow-800 mb-2">Formula:</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• A = P(1 + r/n)^(nt)</li>
              <li>• A = Final amount</li>
              <li>• P = Principal amount</li>
              <li>• r = Annual interest rate</li>
              <li>• n = Compounding frequency</li>
              <li>• t = Time in years</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-yellow-800 mb-2">Key Benefits:</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Earnings generate their own earnings</li>
              <li>• Higher frequency = higher returns</li>
              <li>• Time is your biggest advantage</li>
              <li>• Small increases in rate have big impact</li>
              <li>• Start early for maximum benefit</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompoundInterestCalculator;