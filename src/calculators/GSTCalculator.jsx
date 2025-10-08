import React, { useState } from 'react';

function GSTCalculator() {
  const [amount, setAmount] = useState(10000);
  const [gstRate, setGstRate] = useState(18);
  const [calculationType, setCalculationType] = useState('exclusive'); // exclusive or inclusive
  const [results, setResults] = useState(null);

  const calculateGST = () => {
    let baseAmount, gstAmount, totalAmount;

    if (calculationType === 'exclusive') {
      // Amount is excluding GST
      baseAmount = amount;
      gstAmount = (baseAmount * gstRate) / 100;
      totalAmount = baseAmount + gstAmount;
    } else {
      // Amount is including GST
      totalAmount = amount;
      baseAmount = totalAmount / (1 + gstRate / 100);
      gstAmount = totalAmount - baseAmount;
    }

    // GST breakdown (CGST + SGST or IGST)
    let cgst = 0, sgst = 0, igst = 0;
    
    if (gstRate <= 28) {
      // For inter-state: IGST
      igst = gstAmount;
      // For intra-state: CGST + SGST
      cgst = gstAmount / 2;
      sgst = gstAmount / 2;
    }

    setResults({
      baseAmount,
      gstAmount,
      totalAmount,
      gstRate,
      cgst,
      sgst,
      igst,
      calculationType
    });
  };

  const gstRates = [
    { value: 0, label: '0% (Essential items)' },
    { value: 5, label: '5% (Daily necessities)' },
    { value: 12, label: '12% (Processed foods)' },
    { value: 18, label: '18% (Most goods/services)' },
    { value: 28, label: '28% (Luxury items)' }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">GST Calculator</h1>
        <p className="text-gray-600">Calculate GST amount for goods and services</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">GST Calculation</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount (₹)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Calculation Type
              </label>
              <select
                value={calculationType}
                onChange={(e) => setCalculationType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="exclusive">Amount Excluding GST</option>
                <option value="inclusive">Amount Including GST</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GST Rate (%)
              </label>
              <select
                value={gstRate}
                onChange={(e) => setGstRate(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {gstRates.map(rate => (
                  <option key={rate.value} value={rate.value}>
                    {rate.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom GST Rate (%)
              </label>
              <input
                type="number"
                value={gstRate}
                onChange={(e) => setGstRate(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                max="28"
                step="0.1"
              />
            </div>

            <button
              onClick={calculateGST}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Calculate GST
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">GST Breakdown</h2>
          
          {results ? (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600">Base Amount (Excluding GST)</p>
                <p className="text-2xl font-bold text-blue-600">₹{results.baseAmount.toFixed(2)}</p>
              </div>

              <div className="p-4 bg-red-50 rounded-lg">
                <p className="text-sm text-gray-600">GST Amount ({results.gstRate}%)</p>
                <p className="text-2xl font-bold text-red-600">₹{results.gstAmount.toFixed(2)}</p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Total Amount (Including GST)</p>
                <p className="text-2xl font-bold text-green-600">₹{results.totalAmount.toFixed(2)}</p>
              </div>

              {/* GST Components */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3 text-gray-700">GST Components:</h3>
                
                <div className="grid grid-cols-1 gap-3">
                  <div className="p-3 bg-yellow-50 rounded">
                    <p className="text-sm text-gray-600">For Inter-State Supply (IGST)</p>
                    <p className="text-lg font-bold text-yellow-600">₹{results.igst.toFixed(2)}</p>
                  </div>
                  
                  <div className="text-center text-gray-500 text-sm">OR</div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 bg-purple-50 rounded">
                      <p className="text-xs text-gray-600">CGST ({results.gstRate/2}%)</p>
                      <p className="text-lg font-bold text-purple-600">₹{results.cgst.toFixed(2)}</p>
                    </div>
                    <div className="p-3 bg-orange-50 rounded">
                      <p className="text-xs text-gray-600">SGST ({results.gstRate/2}%)</p>
                      <p className="text-lg font-bold text-orange-600">₹{results.sgst.toFixed(2)}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 text-center">For Intra-State Supply</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p>Enter amount and GST rate, then click "Calculate GST" to see the breakdown.</p>
            </div>
          )}
        </div>
      </div>

      {/* GST Information */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-blue-800">GST Rates in India</h3>
          <ul className="text-sm text-blue-700 space-y-2">
            <li>• <strong>0%:</strong> Essential items (milk, bread, vegetables)</li>
            <li>• <strong>5%:</strong> Daily necessities (sugar, tea, coffee)</li>
            <li>• <strong>12%:</strong> Processed foods, pharmaceuticals</li>
            <li>• <strong>18%:</strong> Most goods and services</li>
            <li>• <strong>28%:</strong> Luxury items (cars, tobacco)</li>
          </ul>
        </div>

        <div className="bg-green-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 text-green-800">GST Components</h3>
          <ul className="text-sm text-green-700 space-y-2">
            <li>• <strong>CGST:</strong> Central GST (to Central Government)</li>
            <li>• <strong>SGST:</strong> State GST (to State Government)</li>
            <li>• <strong>IGST:</strong> Integrated GST (for inter-state)</li>
            <li>• <strong>UTGST:</strong> Union Territory GST</li>
            <li>• CGST + SGST = Total GST for intra-state</li>
          </ul>
        </div>
      </div>

      {/* Calculator Tips */}
      <div className="mt-6 bg-yellow-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-3 text-yellow-800">Calculator Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Use "Excluding GST" to add GST to base price</li>
            <li>• Use "Including GST" to extract GST from total price</li>
            <li>• GST registration mandatory for turnover > ₹40 lakh</li>
          </ul>
          <ul className="text-sm text-yellow-700 space-y-1">
            <li>• Input tax credit available for registered businesses</li>
            <li>• File monthly/quarterly returns as per registration</li>
            <li>• Keep proper invoices for compliance</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default GSTCalculator;