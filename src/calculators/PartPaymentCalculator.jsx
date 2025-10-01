import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import AmortizationTable from './AmortizationTable';
Chart.register(...registerables);

function PartPaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(10);
  const [loanTenure, setLoanTenure] = useState(10);
  const [partPayments, setPartPayments] = useState([{ month: 12, amount: 100000 }]);
  const [result, setResult] = useState(null);
  const chartRef = useRef(null);

  const handlePartPaymentChange = (index, field, value) => {
    const newPartPayments = [...partPayments];
    newPartPayments[index][field] = value;
    setPartPayments(newPartPayments);
  };

  const addPartPayment = () => {
    setPartPayments([...partPayments, { month: 0, amount: 0 }]);
  };

  const removePartPayment = (index) => {
    const newPartPayments = [...partPayments];
    newPartPayments.splice(index, 1);
    setPartPayments(newPartPayments);
  };

  const calculate = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 100 / 12;
    const tenureInMonths = parseInt(loanTenure) * 12;

    const emi = (principal * rate * Math.pow(1 + rate, tenureInMonths)) / (Math.pow(1 + rate, tenureInMonths) - 1);
    const originalTotalInterest = (emi * tenureInMonths) - principal;

    let originalAmortization = [];
    let remainingPrincipal = principal;
    for (let i = 1; i <= tenureInMonths; i++) {
      const interestPaid = remainingPrincipal * rate;
      const principalPaid = emi - interestPaid;
      remainingPrincipal -= principalPaid;
      originalAmortization.push({ month: i, balance: remainingPrincipal });
    }

    let newTenureInMonths = 0;
    let totalInterestSaved = 0;
    let newAmortization = [];
    let newPrincipal = principal;
    const partPaymentsMap = new Map(partPayments.map(p => [parseInt(p.month), parseFloat(p.amount)]));

    for (let i = 1; i <= tenureInMonths; i++) {
      const interestPaid = newPrincipal * rate;
      const principalPaid = emi - interestPaid;
      newPrincipal -= principalPaid;

      let partPaymentMade = 0;
      if (partPaymentsMap.has(i)) {
        partPaymentMade = partPaymentsMap.get(i);
        newPrincipal -= partPaymentMade;
      }

      if (newPrincipal > 0) {
        newAmortization.push({ month: i, principal: principalPaid, interest: interestPaid, partPayment: partPaymentMade, balance: newPrincipal });
      } else {
        newTenureInMonths = i;
        break;
      }
    }

    const newTotalInterest = newAmortization.reduce((acc, curr) => acc + curr.interest, 0);
    totalInterestSaved = originalTotalInterest - newTotalInterest;

    setResult({
      newTenure: newTenureInMonths,
      interestSaved: totalInterestSaved,
      originalAmortization,
      newAmortization,
      emi,
    });
  };

  const data = {
    labels: result?.originalAmortization.map(a => a.month),
    datasets: [
      {
        label: 'Original Loan Balance',
        data: result?.originalAmortization.map(a => a.balance),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'New Loan Balance',
        data: result?.newAmortization.map(a => a.balance),
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
                <div className="text-center mt-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 mb-2">Loan Part Payment Calculator</h1>
          <p className="text-lg text-gray-600">Visualize the impact of prepayments on your loan</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Loan Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Loan Amount (₹)</label>
                <input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Interest Rate (%)</label>
                <input type="number" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Loan Tenure (Years)</label>
                <input type="number" value={loanTenure} onChange={(e) => setLoanTenure(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              </div>
              <hr />
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Part Payment Details</h2>
              {partPayments.map((payment, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div>
                    <input
                      type="number"
                      placeholder="EMI Number"
                      value={payment.month || ''}
                      onChange={(e) => handlePartPaymentChange(index, 'month', e.target.value)}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-1">EMI number when you make part-payment</p>
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Part-payment amount"
                      value={payment.amount || ''}
                      onChange={(e) => handlePartPaymentChange(index, 'amount', e.target.value)}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-1">Part Payment Amount</p>
                  </div>
                  <button onClick={() => removePartPayment(index)} className="text-red-500">X</button>
                </div>
              ))}
              <button onClick={addPartPayment} className="mt-2 text-indigo-600 hover:underline">+ Add Part Payment</button>


              <div className="text-center pt-4">
                <button onClick={calculate} className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Calculate
                </button>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Results</h2>
            {result ? (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center mb-8">
                  <div className="bg-green-100 p-4 rounded-lg">
                    <p className="text-lg font-medium text-green-800">New Loan Tenure</p>
                    <p className="text-3xl font-bold text-green-600">{Math.floor(result.newTenure / 12)} Years, {result.newTenure % 12} Months</p>
                  </div>
                  <div className="bg-blue-100 p-4 rounded-lg">
                    <p className="text-lg font-medium text-blue-800">Total Interest Saved</p>
                    <p className="text-3xl font-bold text-blue-600">₹ {result.interestSaved.toFixed(2)}</p>
                  </div>
                </div>
                <div className="h-96">
                  <Line ref={chartRef} data={data} />
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <p>Enter your loan details and click calculate to see the results.</p>
              </div>
            )}
          </div>
        </div>
        {result && <AmortizationTable amortization={result.newAmortization} emi={result.emi} />}
      </div>
    </div>
  );
}

export default PartPaymentCalculator;
