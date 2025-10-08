import React, { useState } from 'react';

function XIRRCalculator() {
  const [cashFlows, setCashFlows] = useState([
    { date: '2024-01-01', amount: -10000, description: 'Initial Investment' },
    { date: '2024-06-01', amount: -5000, description: 'Additional Investment' },
    { date: '2024-12-01', amount: 18000, description: 'Final Value' }
  ]);
  const [results, setResults] = useState(null);

  const addCashFlow = () => {
    setCashFlows([...cashFlows, { date: '', amount: 0, description: '' }]);
  };

  const removeCashFlow = (index) => {
    if (cashFlows.length > 2) {
      setCashFlows(cashFlows.filter((_, i) => i !== index));
    }
  };

  const updateCashFlow = (index, field, value) => {
    const updated = [...cashFlows];
    updated[index][field] = field === 'amount' ? Number(value) : value;
    setCashFlows(updated);
  };

  // XIRR calculation using Newton-Raphson method
  const calculateXIRR = () => {
    const sortedFlows = [...cashFlows]
      .filter(flow => flow.date && flow.amount !== 0)
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    if (sortedFlows.length < 2) {
      alert('Please enter at least 2 cash flows with dates');
      return;
    }

    const firstDate = new Date(sortedFlows[0].date);
    const flows = sortedFlows.map(flow => ({
      ...flow,
      days: Math.round((new Date(flow.date) - firstDate) / (1000 * 60 * 60 * 24))
    }));

    // Newton-Raphson method for XIRR calculation
    let rate = 0.1; // Initial guess
    let maxIterations = 100;
    let tolerance = 1e-6;

    for (let i = 0; i < maxIterations; i++) {
      let npv = 0;
      let dnpv = 0;

      flows.forEach(flow => {
        const factor = Math.pow(1 + rate, flow.days / 365);
        npv += flow.amount / factor;
        dnpv -= (flow.days / 365) * flow.amount / (factor * (1 + rate));
      });

      if (Math.abs(npv) < tolerance) break;
      
      const newRate = rate - npv / dnpv;
      if (Math.abs(newRate - rate) < tolerance) break;
      
      rate = newRate;
    }

    const xirrPercent = rate * 100;

    // Calculate total invested and received
    const totalInvested = flows
      .filter(flow => flow.amount < 0)
      .reduce((sum, flow) => sum + Math.abs(flow.amount), 0);
    
    const totalReceived = flows
      .filter(flow => flow.amount > 0)
      .reduce((sum, flow) => sum + flow.amount, 0);

    const absoluteReturns = totalReceived - totalInvested;
    const totalDays = flows[flows.length - 1].days;
    const totalYears = totalDays / 365;

    setResults({
      xirr: xirrPercent,
      totalInvested,
      totalReceived,
      absoluteReturns,
      totalDays,
      totalYears,
      flows: flows
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">XIRR Calculator</h1>
        <p className="text-gray-600">Calculate Extended Internal Rate of Return for irregular cash flows</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Cash Flows Input Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Cash Flows</h2>
            <button
              onClick={addCashFlow}
              className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
            >
              Add Flow
            </button>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {cashFlows.map((flow, index) => (
              <div key={index} className="border rounded-lg p-3 bg-gray-50">
                <div className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-3">
                    <label className="block text-xs text-gray-600 mb-1">Date</label>
                    <input
                      type="date"
                      value={flow.date}
                      onChange={(e) => updateCashFlow(index, 'date', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div className="col-span-3">
                    <label className="block text-xs text-gray-600 mb-1">Amount (₹)</label>
                    <input
                      type="number"
                      value={flow.amount}
                      onChange={(e) => updateCashFlow(index, 'amount', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Use negative for investments"
                    />
                  </div>
                  
                  <div className="col-span-5">
                    <label className="block text-xs text-gray-600 mb-1">Description</label>
                    <input
                      type="text"
                      value={flow.description}
                      onChange={(e) => updateCashFlow(index, 'description', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Description"
                    />
                  </div>
                  
                  <div className="col-span-1">
                    {cashFlows.length > 2 && (
                      <button
                        onClick={() => removeCashFlow(index)}
                        className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 mt-4"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={calculateXIRR}
            className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Calculate XIRR
          </button>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">How to use:</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Use negative amounts for investments/outflows</li>
              <li>• Use positive amounts for returns/inflows</li>
              <li>• Enter dates in chronological order</li>
              <li>• XIRR requires at least one positive and one negative cash flow</li>
            </ul>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">XIRR Results</h2>
          
          {results ? (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <p className="text-sm text-gray-600">XIRR (Annualized Return)</p>
                <p className="text-3xl font-bold text-green-600">
                  {results.xirr > 0 ? '+' : ''}{results.xirr.toFixed(2)}%
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Invested</p>
                  <p className="text-xl font-bold text-red-600">₹{results.totalInvested.toLocaleString()}</p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600">Total Received</p>
                  <p className="text-xl font-bold text-blue-600">₹{results.totalReceived.toLocaleString()}</p>
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600">Absolute Returns</p>
                <p className="text-2xl font-bold text-purple-600">
                  ₹{results.absoluteReturns.toLocaleString()}
                  <span className="text-sm ml-2">
                    ({((results.absoluteReturns / results.totalInvested) * 100).toFixed(2)}%)
                  </span>
                </p>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Investment Period</p>
                <p className="text-xl font-bold text-gray-600">
                  {results.totalYears.toFixed(2)} years ({results.totalDays} days)
                </p>
              </div>

              {/* Cash Flow Summary */}
              <div className="mt-6">
                <h3 className="font-semibold mb-3">Cash Flow Summary:</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {results.flows.map((flow, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded text-sm">
                      <span>{flow.date}</span>
                      <span className={flow.amount > 0 ? 'text-green-600' : 'text-red-600'}>
                        ₹{flow.amount.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p>Enter your cash flows and click "Calculate XIRR" to see the results.</p>
            </div>
          )}
        </div>
      </div>

      {/* Information Section */}
      <div className="mt-8 bg-yellow-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-3 text-yellow-800">About XIRR</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-yellow-800 mb-2">What is XIRR?</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Extended Internal Rate of Return</li>
              <li>• Calculates annualized returns for irregular cash flows</li>
              <li>• Considers the timing of each cash flow</li>
              <li>• More accurate than simple CAGR for SIPs</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-yellow-800 mb-2">When to use XIRR?</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• SIP investments with irregular amounts</li>
              <li>• Portfolio analysis with multiple entries/exits</li>
              <li>• Real estate investments with periodic inputs</li>
              <li>• Any investment with irregular cash flows</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default XIRRCalculator;