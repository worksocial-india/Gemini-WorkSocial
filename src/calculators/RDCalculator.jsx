import React, { useState } from 'react';

function RDCalculator() {
  const [monthlyDeposit, setMonthlyDeposit] = useState(5000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [tenure, setTenure] = useState(12);
  const [tenureUnit, setTenureUnit] = useState('months');
  const [results, setResults] = useState(null);

  const calculateRD = () => {
    let tenureInMonths = tenure;
    if (tenureUnit === 'years') {
      tenureInMonths = tenure * 12;
    }

    const monthlyRate = interestRate / 100 / 12;
    
    // RD maturity calculation using formula:
    // M = R * [((1 + i)^n - 1) / i] * (1 + i)
    // Where M = Maturity amount, R = Monthly deposit, i = monthly interest rate, n = number of months
    
    let maturityAmount;
    if (monthlyRate > 0) {
      const compoundFactor = Math.pow(1 + monthlyRate, tenureInMonths);
      maturityAmount = monthlyDeposit * ((compoundFactor - 1) / monthlyRate) * (1 + monthlyRate);
    } else {
      // If no interest
      maturityAmount = monthlyDeposit * tenureInMonths;
    }

    const totalDeposits = monthlyDeposit * tenureInMonths;
    const totalInterest = maturityAmount - totalDeposits;

    // TDS calculation (if applicable)
    const tdsApplicable = totalInterest > 40000;
    const tdsAmount = tdsApplicable ? totalInterest * 0.10 : 0;
    const netInterest = totalInterest - tdsAmount;
    const netMaturityAmount = totalDeposits + netInterest;

    // Calculate effective annual return
    const yearsInvested = tenureInMonths / 12;
    const effectiveAnnualReturn = yearsInvested > 0 ? 
      (Math.pow(maturityAmount / totalDeposits, 1 / yearsInvested) - 1) * 100 : 0;

    // Monthly breakdown for chart/display
    const monthlyBreakdown = [];
    let runningBalance = 0;
    
    for (let month = 1; month <= tenureInMonths; month++) {
      runningBalance = (runningBalance + monthlyDeposit) * (1 + monthlyRate);
      monthlyBreakdown.push({
        month,
        deposit: monthlyDeposit,
        totalDeposited: monthlyDeposit * month,
        balance: runningBalance,
        interest: runningBalance - (monthlyDeposit * month)
      });
    }

    setResults({
      monthlyDeposit,
      tenureInMonths,
      tenureInYears: yearsInvested,
      interestRate,
      totalDeposits,
      totalInterest,
      maturityAmount,
      tdsApplicable,
      tdsAmount,
      netInterest,
      netMaturityAmount,
      effectiveAnnualReturn,
      monthlyBreakdown: monthlyBreakdown.slice(-12) // Show last 12 months
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Recurring Deposit Calculator</h1>
        <p className="text-gray-600">Calculate your RD maturity amount and interest earnings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">RD Details</h2>
          
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
                min="100"
              />
              <p className="text-xs text-gray-500 mt-1">Minimum deposit varies by bank (usually ₹100-500)</p>
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
              <p className="text-xs text-gray-500 mt-1">Current RD rates range from 5.5% to 7.5%</p>
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
                  min="6"
                />
                <select
                  value={tenureUnit}
                  onChange={(e) => setTenureUnit(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="months">Months</option>
                  <option value="years">Years</option>
                </select>
              </div>
              <p className="text-xs text-gray-500 mt-1">Minimum tenure: 6 months, Maximum: 10 years</p>
            </div>

            <button
              onClick={calculateRD}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Calculate RD Returns
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">RD Calculation Results</h2>
          
          {results ? (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Monthly Deposit</p>
                <p className="text-2xl font-bold text-blue-600">₹{results.monthlyDeposit.toLocaleString()}</p>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600">Total Deposits ({results.tenureInMonths} months)</p>
                <p className="text-2xl font-bold text-purple-600">₹{results.totalDeposits.toLocaleString()}</p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Interest Earned</p>
                <p className="text-2xl font-bold text-green-600">₹{Math.round(results.totalInterest).toLocaleString()}</p>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <p className="text-sm text-gray-600">Maturity Amount (Gross)</p>
                <p className="text-2xl font-bold text-yellow-600">₹{Math.round(results.maturityAmount).toLocaleString()}</p>
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

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Effective Annual Return</p>
                <p className="text-2xl font-bold text-gray-600">{results.effectiveAnnualReturn.toFixed(2)}%</p>
              </div>

              <div className="p-4 bg-indigo-50 rounded-lg">
                <p className="text-sm text-gray-600">Investment Period</p>
                <p className="text-2xl font-bold text-indigo-600">
                  {results.tenureInYears.toFixed(1)} years
                  <span className="text-sm ml-2">({results.tenureInMonths} months)</span>
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p>Enter your RD details and click "Calculate RD Returns" to see the results.</p>
            </div>
          )}
        </div>
      </div>

      {/* Monthly Growth Chart */}
      {results && (
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Account Growth (Last 12 Months)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Month</th>
                  <th className="text-right p-2">Deposit</th>
                  <th className="text-right p-2">Total Deposited</th>
                  <th className="text-right p-2">Interest</th>
                  <th className="text-right p-2">Balance</th>
                </tr>
              </thead>
              <tbody>
                {results.monthlyBreakdown.map((month, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-2">{month.month}</td>
                    <td className="p-2 text-right">₹{month.deposit.toLocaleString()}</td>
                    <td className="p-2 text-right">₹{month.totalDeposited.toLocaleString()}</td>
                    <td className="p-2 text-right text-green-600">₹{Math.round(month.interest).toLocaleString()}</td>
                    <td className="p-2 text-right font-semibold">₹{Math.round(month.balance).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Information Section */}
      <div className="mt-8 bg-yellow-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-3 text-yellow-800">RD Important Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-yellow-800 mb-2">Key Benefits:</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Fixed monthly deposit amount</li>
              <li>• Guaranteed returns (fixed interest rate)</li>
              <li>• Disciplined saving habit</li>
              <li>• Flexible tenure (6 months to 10 years)</li>
              <li>• Safe investment (bank guarantee)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-yellow-800 mb-2">Important Points:</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Penalty for missed deposits (usually ₹1-5 per ₹100)</li>
              <li>• TDS of 10% if interest &gt; ₹40,000</li>
              <li>• Premature closure allowed with penalty</li>
              <li>• Auto-renewal facility available</li>
              <li>• Nomination facility mandatory</li>
            </ul>
          </div>
        </div>
      </div>

      {/* RD vs Other Investments */}
      <div className="mt-6 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-3 text-blue-800">RD vs Other Investments</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded">
            <h4 className="font-semibold text-blue-800 mb-2">RD vs FD</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• RD: Monthly deposits</li>
              <li>• FD: Lump sum deposit</li>
              <li>• Similar interest rates</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded">
            <h4 className="font-semibold text-blue-800 mb-2">RD vs SIP</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• RD: Fixed returns</li>
              <li>• SIP: Market-linked returns</li>
              <li>• RD: Lower risk, lower returns</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded">
            <h4 className="font-semibold text-blue-800 mb-2">RD vs PPF</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• RD: 6 months to 10 years</li>
              <li>• PPF: 15 years lock-in</li>
              <li>• PPF: Tax benefits available</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RDCalculator;