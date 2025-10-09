import React, { useState } from 'react';

function FDCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [tenure, setTenure] = useState(12);
  const [tenureType, setTenureType] = useState('months');
  const [compoundingFrequency, setCompoundingFrequency] = useState('quarterly');
  const [results, setResults] = useState(null);

  const calculateFD = () => {
    let years = tenure;
    if (tenureType === 'months') {
      years = tenure / 12;
    } else if (tenureType === 'days') {
      years = tenure / 365;
    }

    // Compounding frequency mapping
    const frequency = {
      'monthly': 12,
      'quarterly': 4,
      'half-yearly': 2,
      'yearly': 1,
      'daily': 365
    };

    const n = frequency[compoundingFrequency];
    const r = interestRate / 100;

    // Compound Interest Formula: A = P(1 + r/n)^(nt)
    const maturityAmount = principal * Math.pow(1 + r/n, n * years);
    const interestEarned = maturityAmount - principal;

    // TDS calculation (if applicable)
    const tdsApplicable = interestEarned > 40000;
    const tdsAmount = tdsApplicable ? interestEarned * 0.10 : 0;
    const netInterest = interestEarned - tdsAmount;
    const netMaturityAmount = principal + netInterest;

    // Monthly interest (for display)
    const monthlyInterest = interestEarned / (years * 12);

    setResults({
      principal,
      interestRate,
      tenure: years,
      maturityAmount,
      interestEarned,
      monthlyInterest,
      tdsApplicable,
      tdsAmount,
      netInterest,
      netMaturityAmount,
      effectiveRate: (interestEarned / principal / years) * 100
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Fixed Deposit Calculator</h1>
        <p className="text-gray-600">Calculate your FD maturity amount and interest earnings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">FD Details</h2>
          
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
                min="1000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Annual Interest Rate (%)
              </label>
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
                max="15"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tenure
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                />
                <select
                  value={tenureType}
                  onChange={(e) => setTenureType(e.target.value)}
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
                onChange={(e) => setCompoundingFrequency(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="half-yearly">Half-yearly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            <button
              onClick={calculateFD}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Calculate FD Returns
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">FD Calculation Results</h2>
          
          {results ? (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Principal Amount</p>
                <p className="text-2xl font-bold text-blue-600">₹{results.principal.toLocaleString()}</p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Interest Earned</p>
                <p className="text-2xl font-bold text-green-600">₹{Math.round(results.interestEarned).toLocaleString()}</p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600">Maturity Amount (Gross)</p>
                <p className="text-2xl font-bold text-purple-600">₹{Math.round(results.maturityAmount).toLocaleString()}</p>
              </div>

              {results.tdsApplicable && (
                <>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <p className="text-sm text-gray-600">TDS Deducted (10%)</p>
                    <p className="text-2xl font-bold text-red-600">₹{Math.round(results.tdsAmount).toLocaleString()}</p>
                  </div>

                  <div className="p-4 bg-orange-50 rounded-lg">
                    <p className="text-sm text-gray-600">Net Maturity Amount</p>
                    <p className="text-2xl font-bold text-orange-600">₹{Math.round(results.netMaturityAmount).toLocaleString()}</p>
                  </div>
                </>
              )}

              <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-600">Monthly Interest</p>
                <p className="text-2xl font-bold text-yellow-600">₹{Math.round(results.monthlyInterest).toLocaleString()}</p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Effective Annual Rate</p>
                <p className="text-2xl font-bold text-gray-600">{results.effectiveRate.toFixed(2)}%</p>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p>Enter your FD details and click "Calculate FD Returns" to see the results.</p>
            </div>
          )}
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-8 bg-yellow-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-3 text-yellow-800">FD Important Points</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ul className="text-sm text-yellow-700 space-y-2">
            <li>• Interest rates vary by bank and tenure</li>
            <li>• Senior citizens get additional 0.5% interest</li>
            <li>• TDS of 10% applicable if interest &gt; ₹40,000</li>
            <li>• Premature withdrawal penalties apply</li>
          </ul>
          <ul className="text-sm text-yellow-700 space-y-2">
            <li>• FDs are covered under deposit insurance up to ₹5 lakh</li>
            <li>• Interest is taxable as per your income tax slab</li>
            <li>• Auto-renewal facility available</li>
            <li>• Nomination facility mandatory</li>
          </ul>
        </div>
      </div>
      
      {/* Share Buttons */}
      {results && (
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => {
                const text = `💰 Fixed Deposit Results!\n\n📊 Principal: ₹${results.principal.toLocaleString('en-IN')}\n📈 Interest Rate: ${results.interestRate}% p.a.\n⏰ Tenure: ${results.tenure} years\n💵 Maturity Amount: ₹${results.maturityAmount.toLocaleString('en-IN', {maximumFractionDigits: 0})}\n🎯 Interest Earned: ₹${results.interestEarned.toLocaleString('en-IN', {maximumFractionDigits: 0})}\n\nCalculate yours: https://www.worksocial.in/calculators/fd`;
                const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
                window.open(url, '_blank');
              }}
              className="flex items-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors shadow-lg"
            >
              Share on WhatsApp
            </button>
            <button 
              onClick={async () => {
                if (navigator.share) {
                  try {
                    await navigator.share({
                      title: 'FD Calculator Results',
                      text: `My FD of ₹${results.principal.toLocaleString('en-IN')} @ ${results.interestRate}% will mature to ₹${results.maturityAmount.toLocaleString('en-IN', {maximumFractionDigits: 0})}!`,
                      url: window.location.href,
                    });
                  } catch {
                    console.log('Share cancelled');
                  }
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }
              }}
              className="flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors shadow-lg"
            >
              Share
            </button>
            <button 
              onClick={() => {
                window.print();
              }}
              className="flex items-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors shadow-lg"
            >
              Download as PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FDCalculator;