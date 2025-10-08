import React, { useState } from 'react';

function HRACalculator() {
  const [basicSalary, setBasicSalary] = useState(50000);
  const [hraReceived, setHraReceived] = useState(20000);
  const [rentPaid, setRentPaid] = useState(15000);
  const [city, setCity] = useState('metro');
  const [results, setResults] = useState(null);

  const calculateHRA = () => {
    // HRA exemption calculation as per Income Tax rules
    
    // 1. Actual HRA received
    const actualHRA = hraReceived;
    
    // 2. 50% of basic salary for metro cities, 40% for non-metro
    const cityPercentage = city === 'metro' ? 0.50 : 0.40;
    const hraPercentageOfBasic = basicSalary * cityPercentage;
    
    // 3. Rent paid minus 10% of basic salary (if positive)
    const tenPercentOfBasic = basicSalary * 0.10;
    const rentMinusTenPercent = Math.max(0, rentPaid - tenPercentOfBasic);
    
    // HRA exemption is minimum of the three
    const hraExemption = Math.min(actualHRA, hraPercentageOfBasic, rentMinusTenPercent);
    
    // Taxable HRA
    const taxableHRA = actualHRA - hraExemption;
    
    // Annual calculations
    const annualBasicSalary = basicSalary * 12;
    const annualHRAReceived = hraReceived * 12;
    const annualRentPaid = rentPaid * 12;
    const annualHRAExemption = hraExemption * 12;
    const annualTaxableHRA = taxableHRA * 12;
    
    // Tax savings (assuming 30% tax bracket)
    const taxSavings = annualHRAExemption * 0.30;

    setResults({
      actualHRA,
      hraPercentageOfBasic,
      rentMinusTenPercent,
      hraExemption,
      taxableHRA,
      annualBasicSalary,
      annualHRAReceived,
      annualRentPaid,
      annualHRAExemption,
      annualTaxableHRA,
      taxSavings,
      city,
      cityPercentage: cityPercentage * 100
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">HRA Calculator</h1>
        <p className="text-gray-600">Calculate HRA exemption and tax savings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Salary & HRA Details</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Basic Salary (₹)
              </label>
              <input
                type="number"
                value={basicSalary}
                onChange={(e) => setBasicSalary(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
              />
              <p className="text-xs text-gray-500 mt-1">Basic salary excluding allowances</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly HRA Received (₹)
              </label>
              <input
                type="number"
                value={hraReceived}
                onChange={(e) => setHraReceived(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
              />
              <p className="text-xs text-gray-500 mt-1">HRA component in your salary</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Rent Paid (₹)
              </label>
              <input
                type="number"
                value={rentPaid}
                onChange={(e) => setRentPaid(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
              />
              <p className="text-xs text-gray-500 mt-1">Actual rent paid for accommodation</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City Type
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="metro">Metro City (Delhi, Mumbai, Chennai, Kolkata)</option>
                <option value="non-metro">Non-Metro City</option>
              </select>
            </div>

            <button
              onClick={calculateHRA}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Calculate HRA Exemption
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">HRA Calculation Results</h2>
          
          {results ? (
            <div className="space-y-4">
              {/* Monthly Calculations */}
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-3 text-gray-700">Monthly Calculation:</h3>
                
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">1. Actual HRA Received</p>
                    <p className="text-lg font-bold text-blue-600">₹{results.actualHRA.toLocaleString()}</p>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">2. {results.cityPercentage}% of Basic Salary</p>
                    <p className="text-lg font-bold text-green-600">₹{results.hraPercentageOfBasic.toFixed(0).toLocaleString()}</p>
                  </div>

                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm text-gray-600">3. Rent - 10% of Basic</p>
                    <p className="text-lg font-bold text-purple-600">₹{results.rentMinusTenPercent.toFixed(0).toLocaleString()}</p>
                  </div>

                  <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                    <p className="text-sm text-gray-600">HRA Exemption (Minimum of above 3)</p>
                    <p className="text-2xl font-bold text-yellow-600">₹{results.hraExemption.toFixed(0).toLocaleString()}</p>
                  </div>

                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="text-sm text-gray-600">Taxable HRA</p>
                    <p className="text-lg font-bold text-red-600">₹{results.taxableHRA.toFixed(0).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Annual Summary */}
              <div>
                <h3 className="font-semibold mb-3 text-gray-700">Annual Summary:</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-gray-50 rounded">
                    <p className="text-xs text-gray-600">Annual HRA Received</p>
                    <p className="text-lg font-bold text-gray-600">₹{results.annualHRAReceived.toLocaleString()}</p>
                  </div>

                  <div className="p-3 bg-gray-50 rounded">
                    <p className="text-xs text-gray-600">Annual HRA Exemption</p>
                    <p className="text-lg font-bold text-gray-600">₹{results.annualHRAExemption.toFixed(0).toLocaleString()}</p>
                  </div>

                  <div className="p-3 bg-gray-50 rounded">
                    <p className="text-xs text-gray-600">Annual Taxable HRA</p>
                    <p className="text-lg font-bold text-gray-600">₹{results.annualTaxableHRA.toFixed(0).toLocaleString()}</p>
                  </div>

                  <div className="p-3 bg-green-100 rounded">
                    <p className="text-xs text-gray-600">Tax Savings (30% bracket)</p>
                    <p className="text-lg font-bold text-green-600">₹{results.taxSavings.toFixed(0).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <p>Enter your salary and HRA details, then click "Calculate HRA Exemption" to see the results.</p>
            </div>
          )}
        </div>
      </div>

      {/* HRA Rules Information */}
      <div className="mt-8 bg-yellow-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-3 text-yellow-800">HRA Exemption Rules</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-yellow-800 mb-2">Calculation Method:</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• HRA exemption = Minimum of:</li>
              <li>&nbsp;&nbsp;- Actual HRA received</li>
              <li>&nbsp;&nbsp;- 50%/40% of basic salary</li>
              <li>&nbsp;&nbsp;- Rent paid - 10% of basic salary</li>
              <li>• Metro cities: 50% of basic salary</li>
              <li>• Non-metro cities: 40% of basic salary</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-yellow-800 mb-2">Important Points:</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Rent receipts required for claims > ₹1 lakh/year</li>
              <li>• PAN of landlord needed for rent > ₹1 lakh/year</li>
              <li>• HRA not available if living in own house</li>
              <li>• Basic salary = Basic + DA (if forms part of retirement benefits)</li>
              <li>• Can claim HRA even if living with parents (paying rent)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Metro Cities List */}
      <div className="mt-6 bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-3 text-blue-800">Metro Cities (50% of Basic Salary)</h3>
        <p className="text-sm text-blue-700">
          <strong>Metro Cities:</strong> Delhi, Mumbai, Chennai, and Kolkata
        </p>
        <p className="text-sm text-blue-700 mt-2">
          <strong>Non-Metro Cities:</strong> All other cities (40% of Basic Salary)
        </p>
      </div>
    </div>
  );
}

export default HRACalculator;