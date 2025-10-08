import React, { useState } from 'react';

function AtalPensionCalculator() {
  const [currentAge, setCurrentAge] = useState(25);
  const [pensionAmount, setPensionAmount] = useState(1000);
  const [results, setResults] = useState(null);

  const calculateAPY = () => {
    // APY contribution matrix based on age and pension amount
    const contributionMatrix = {
      1000: { 18: 42, 20: 50, 25: 76, 30: 116, 35: 181, 40: 291 },
      2000: { 18: 84, 20: 100, 25: 151, 30: 231, 35: 362, 40: 582 },
      3000: { 18: 126, 20: 150, 25: 226, 30: 347, 35: 543, 40: 873 },
      4000: { 18: 168, 20: 198, 25: 301, 30: 462, 35: 724, 40: 1164 },
      5000: { 18: 210, 20: 248, 25: 376, 30: 577, 35: 905, 40: 1454 }
    };

    // Find the appropriate monthly contribution
    let monthlyContribution = 0;
    const matrix = contributionMatrix[pensionAmount];
    
    if (matrix) {
      // Find the closest age or interpolate
      const ages = Object.keys(matrix).map(Number).sort((a, b) => a - b);
      
      if (currentAge <= 18) {
        monthlyContribution = matrix[18];
      } else if (currentAge >= 40) {
        monthlyContribution = matrix[40];
      } else {
        // Find the two closest ages for interpolation
        let lowerAge = 18;
        let upperAge = 40;
        
        for (let i = 0; i < ages.length - 1; i++) {
          if (currentAge >= ages[i] && currentAge <= ages[i + 1]) {
            lowerAge = ages[i];
            upperAge = ages[i + 1];
            break;
          }
        }
        
        // Linear interpolation
        const ratio = (currentAge - lowerAge) / (upperAge - lowerAge);
        monthlyContribution = Math.round(
          matrix[lowerAge] + (matrix[upperAge] - matrix[lowerAge]) * ratio
        );
      }
    }

    // Calculate total contributions
    const retirementAge = 60;
    const contributionYears = retirementAge - currentAge;
    const totalMonths = contributionYears * 12;
    const totalContribution = monthlyContribution * totalMonths;
    
    // Government co-contribution (equal to subscriber contribution, max ₹1000 per year)
    const annualContribution = monthlyContribution * 12;
    const govtCoContribution = Math.min(annualContribution, 1000) * contributionYears;
    
    // Total fund value at retirement (estimated at 8% return)
    const annualReturn = 0.08;
    const monthlyReturn = annualReturn / 12;
    let fundValue = 0;
    
    for (let month = 1; month <= totalMonths; month++) {
      const monthsToRetirement = totalMonths - month + 1;
      fundValue += (monthlyContribution * 2) * Math.pow(1 + monthlyReturn, monthsToRetirement);
    }
    
    setResults({
      monthlyContribution,
      contributionYears,
      totalContribution,
      govtCoContribution,
      totalWithGovt: totalContribution + govtCoContribution,
      fundValue,
      monthlyPension: pensionAmount,
      totalPensionReceived: pensionAmount * 12 * 20 // Assuming 20 years of pension
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Atal Pension Yojana Calculator</h1>
        <p className="text-gray-600">Calculate your APY contributions and pension benefits</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Pension Details</h2>
          
          <div className="space-y-4">
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
                max="40"
              />
              <p className="text-xs text-gray-500 mt-1">Age should be between 18-40 years</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Desired Monthly Pension (₹)
              </label>
              <select
                value={pensionAmount}
                onChange={(e) => setPensionAmount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={1000}>₹1,000</option>
                <option value={2000}>₹2,000</option>
                <option value={3000}>₹3,000</option>
                <option value={4000}>₹4,000</option>
                <option value={5000}>₹5,000</option>
              </select>
            </div>

            <button
              onClick={calculateAPY}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Calculate APY
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Pension Plan Results</h2>
          
          {results ? (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Monthly Contribution Required</p>
                <p className="text-2xl font-bold text-blue-600">₹{results.monthlyContribution}</p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Contribution Period</p>
                <p className="text-2xl font-bold text-green-600">{results.contributionYears} years</p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600">Your Total Contribution</p>
                <p className="text-2xl font-bold text-purple-600">₹{results.totalContribution.toLocaleString()}</p>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg">
                <p className="text-sm text-gray-600">Government Co-contribution</p>
                <p className="text-2xl font-bold text-orange-600">₹{results.govtCoContribution.toLocaleString()}</p>
              </div>

              <div className="p-4 bg-red-50 rounded-lg">
                <p className="text-sm text-gray-600">Monthly Pension at 60</p>
                <p className="text-2xl font-bold text-red-600">₹{results.monthlyPension.toLocaleString()}</p>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p>Enter your details and click "Calculate APY" to see the results.</p>
            </div>
          )}
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-8 bg-yellow-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-3 text-yellow-800">Key Features of APY</h3>
        <ul className="text-sm text-yellow-700 space-y-2">
          <li>• Government co-contribution for eligible subscribers (income up to ₹2 lakh)</li>
          <li>• Guaranteed pension amount</li>
          <li>• Entry age: 18-40 years</li>
          <li>• Pension starts from age 60</li>
          <li>• Spouse pension and return of corpus on death</li>
          <li>• Tax benefits under Section 80CCD</li>
        </ul>
      </div>
    </div>
  );
}

export default AtalPensionCalculator;