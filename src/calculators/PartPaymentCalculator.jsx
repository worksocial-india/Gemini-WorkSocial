import React, { useState, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { Calculator, TrendingDown, DollarSign, Calendar, Plus, X, ArrowLeft, Download, Share2 } from 'lucide-react';
import AmortizationTable from './AmortizationTable';
import CalculatorSidebar from './CalculatorSidebar';
import { Link } from 'react-router-dom';
Chart.register(...registerables);

function PartPaymentCalculator() {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(10);
  const [loanTenure, setLoanTenure] = useState(10);
  const [partPayments, setPartPayments] = useState([{ month: 12, amount: 100000 }]);
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const chartRef = useRef(null);

  // Add some example scenarios
  const exampleScenarios = [
    {
      name: "Conservative",
      amount: 500000,
      rate: 8.5,
      tenure: 15,
      partPayments: [{ month: 12, amount: 50000 }]
    },
    {
      name: "Moderate",
      amount: 1000000,
      rate: 10,
      tenure: 10,
      partPayments: [{ month: 12, amount: 100000 }, { month: 24, amount: 50000 }]
    },
    {
      name: "Aggressive",
      amount: 2000000,
      rate: 11,
      tenure: 20,
      partPayments: [{ month: 6, amount: 200000 }, { month: 18, amount: 150000 }, { month: 30, amount: 100000 }]
    }
  ];

  const loadScenario = (scenario) => {
    setLoanAmount(scenario.amount);
    setInterestRate(scenario.rate);
    setLoanTenure(scenario.tenure);
    setPartPayments(scenario.partPayments);
    setResult(null);
  };

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
    setIsCalculating(true);
    
    // Add small delay for better UX
    setTimeout(() => {
      // Validation
      if (!loanAmount || !interestRate || !loanTenure) {
        alert('Please fill in all loan details');
        setIsCalculating(false);
        return;
      }

      if (parseFloat(loanAmount) <= 0 || parseFloat(interestRate) <= 0 || parseFloat(loanTenure) <= 0) {
        alert('Please enter valid positive values for all fields');
        setIsCalculating(false);
        return;
      }

      // Check if part payments are valid
      for (let payment of partPayments) {
        if (payment.month && payment.amount) {
          if (parseFloat(payment.month) <= 0 || parseFloat(payment.amount) <= 0) {
            alert('Please enter valid positive values for part payments');
            setIsCalculating(false);
            return;
          }
          if (parseFloat(payment.month) > parseFloat(loanTenure) * 12) {
            alert('Part payment month cannot exceed loan tenure');
            setIsCalculating(false);
            return;
          }
        }
      }

      const principal = parseFloat(loanAmount);
      const rate = parseFloat(interestRate) / 100 / 12;
      const tenureInMonths = parseInt(loanTenure) * 12;

      // Check for valid EMI calculation
      if (rate === 0) {
        alert('Interest rate cannot be zero');
        setIsCalculating(false);
        return;
      }

      const emi = (principal * rate * Math.pow(1 + rate, tenureInMonths)) / (Math.pow(1 + rate, tenureInMonths) - 1);
      
      if (!isFinite(emi) || emi <= 0) {
        alert('Unable to calculate EMI with given values');
        setIsCalculating(false);
        return;
      }

      const originalTotalInterest = (emi * tenureInMonths) - principal;

      let originalAmortization = [];
      let remainingPrincipal = principal;
      for (let i = 1; i <= tenureInMonths; i++) {
        const interestPaid = remainingPrincipal * rate;
        const principalPaid = emi - interestPaid;
        remainingPrincipal -= principalPaid;
        originalAmortization.push({ month: i, balance: Math.max(remainingPrincipal, 0) });
      }

      let newTenureInMonths = 0;
      let totalInterestSaved = 0;
      let newAmortization = [];
      let newPrincipal = principal;
      
      // Filter valid part payments
      const validPartPayments = partPayments.filter(p => p.month && p.amount && parseFloat(p.month) > 0 && parseFloat(p.amount) > 0);
      const partPaymentsMap = new Map(validPartPayments.map(p => [parseInt(p.month), parseFloat(p.amount)]));

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
          newAmortization.push({ 
            month: i, 
            principal: principalPaid, 
            interest: interestPaid, 
            partPayment: partPaymentMade, 
            balance: Math.max(newPrincipal, 0) 
          });
        } else {
          newTenureInMonths = i;
          // Add final entry with zero balance
          newAmortization.push({ 
            month: i, 
            principal: principalPaid, 
            interest: interestPaid, 
            partPayment: partPaymentMade, 
            balance: 0 
          });
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
      
      setIsCalculating(false);
    }, 500);
  };

  const data = {
    labels: result?.originalAmortization?.map(a => a.month) || [],
    datasets: [
      {
        label: 'Original Loan Balance',
        data: result?.originalAmortization?.map(a => a.balance) || [],
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 3,
        fill: false,
        tension: 0.4,
        pointBackgroundColor: '#ef4444',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 8,
      },
      {
        label: 'New Loan Balance (with part payments)',
        data: result?.newAmortization?.map(a => a.balance) || [],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        fill: false,
        tension: 0.4,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        cornerRadius: 12,
        displayColors: true,
        callbacks: {
          title: function(context) {
            return `Month ${context[0].label}`;
          },
          label: function(context) {
            const value = context.raw;
            return `${context.dataset.label}: ₹${value.toLocaleString('en-IN', {maximumFractionDigits: 0})}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Outstanding Loan Balance (₹)',
          font: {
            size: 14,
            weight: 'bold'
          },
          color: '#374151'
        },
        ticks: {
          callback: function(value) {
            if (value >= 10000000) {
              return '₹' + (value/10000000).toFixed(1) + 'Cr';
            } else if (value >= 100000) {
              return '₹' + (value/100000).toFixed(1) + 'L';
            } else if (value >= 1000) {
              return '₹' + (value/1000).toFixed(1) + 'K';
            }
            return '₹' + value.toLocaleString('en-IN');
          },
          color: '#6b7280',
          font: {
            size: 12
          }
        },
        grid: {
          color: 'rgba(229, 231, 235, 0.5)',
          drawBorder: false,
        }
      },
      x: {
        title: {
          display: true,
          text: 'Loan Duration (Months)',
          font: {
            size: 14,
            weight: 'bold'
          },
          color: '#374151'
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12
          }
        },
        grid: {
          color: 'rgba(229, 231, 235, 0.5)',
          drawBorder: false,
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    hover: {
      animationDuration: 200,
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart',
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="flex">
        <div className="hidden lg:block">
          <CalculatorSidebar />
        </div>
        <div className="flex-grow">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white">
            <div className="container mx-auto px-4 py-8">
              {/* Back Button */}
              <div className="mb-4">
                <Link to="/calculators" className="inline-flex items-center text-blue-100 hover:text-white transition-colors">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Back to Calculators
                </Link>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-3 flex items-center">
                    <Calculator className="w-10 h-10 mr-4 text-yellow-300" />
                    Part Payment Calculator
                  </h1>
                  <p className="text-xl text-blue-100 max-w-2xl">
                    See how part payments can save you thousands in interest and reduce your loan tenure significantly
                  </p>
                </div>
                <div className="hidden md:block">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <TrendingDown className="w-16 h-16 text-green-300 mx-auto mb-2" />
                    <p className="text-center text-sm">Reduce Interest</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 py-8 space-y-8">
            
            {/* Block 1: Loan Details - Single Column */}
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <DollarSign className="w-6 h-6 mr-3" />
                  Loan Details
                </h2>
                <p className="text-indigo-100 mt-2">Enter your loan information and part payment schedule</p>
              </div>
              
              <div className="p-8">
                {/* Quick Scenarios */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200 mb-8">
                  <h4 className="font-semibold text-amber-800 mb-3 flex items-center">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                    Quick Start Examples
                  </h4>
                  <div className="grid grid-cols-3 gap-2">
                    {exampleScenarios.map((scenario, index) => (
                      <button
                        key={index}
                        onClick={() => loadScenario(scenario)}
                        className="px-3 py-2 bg-white border border-amber-200 rounded-lg text-xs font-medium text-amber-700 hover:bg-amber-50 transition-colors"
                      >
                        {scenario.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {/* Loan Amount */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Loan Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₹</span>
                      <input 
                        type="number" 
                        value={loanAmount} 
                        onChange={(e) => setLoanAmount(e.target.value)} 
                        className="w-full pl-8 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-lg font-medium"
                        placeholder="1000000"
                      />
                    </div>
                  </div>

                  {/* Interest Rate */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Interest Rate
                    </label>
                    <div className="relative">
                      <input 
                        type="number" 
                        value={interestRate} 
                        onChange={(e) => setInterestRate(e.target.value)} 
                        className="w-full pr-8 pl-4 py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-lg font-medium"
                        placeholder="10"
                      />
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">%</span>
                    </div>
                  </div>

                  {/* Loan Tenure */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Loan Tenure
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input 
                        type="number" 
                        value={loanTenure} 
                        onChange={(e) => setLoanTenure(e.target.value)} 
                        className="w-full pl-12 pr-16 py-4 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-200 text-lg font-medium"
                        placeholder="10"
                      />
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">Years</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                    <Plus className="w-5 h-5 mr-2 text-green-500" />
                    Part Payment Schedule
                  </h3>
                  
                  <div className="space-y-4 mb-6">
                    {partPayments.map((payment, index) => (
                      <div key={index} className="bg-gray-50 rounded-xl p-4 border-2 border-dashed border-gray-200 hover:border-indigo-300 transition-colors">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">EMI Month</label>
                            <input
                              type="number"
                              placeholder="12"
                              value={payment.month || ''}
                              onChange={(e) => handlePartPaymentChange(index, 'month', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Amount (₹)</label>
                            <input
                              type="number"
                              placeholder="100000"
                              value={payment.amount || ''}
                              onChange={(e) => handlePartPaymentChange(index, 'amount', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                            />
                          </div>
                          <div className="flex justify-end">
                            <button 
                              onClick={() => removePartPayment(index)} 
                              className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <button 
                    onClick={addPartPayment} 
                    className="w-full py-3 border-2 border-dashed border-indigo-300 rounded-xl text-indigo-600 hover:bg-indigo-50 transition-colors flex items-center justify-center font-medium mb-6"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Another Part Payment
                  </button>

                  <button 
                    onClick={calculate} 
                    disabled={isCalculating}
                    className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isCalculating ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        Calculating...
                      </>
                    ) : (
                      <>
                        <Calculator className="w-6 h-6 mr-3" />
                        Calculate Savings
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {result && (
              <>
                {/* Block 2: Tenure Comparison - 3 Columns */}
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6">
                    <h3 className="text-2xl font-bold text-white flex items-center">
                      <Calendar className="w-6 h-6 mr-3" />
                      Loan Tenure Comparison
                    </h3>
                    <p className="text-green-100 mt-2">See the impact of part payments on your loan duration</p>
                  </div>
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center bg-orange-50 rounded-2xl p-6 border border-orange-200">
                        <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="text-lg font-semibold text-orange-800 mb-2">Existing Tenure</h4>
                        <p className="text-3xl font-bold text-orange-600">
                          {Math.floor(parseInt(loanTenure))} Years
                        </p>
                        <p className="text-orange-500 text-sm mt-1">{parseInt(loanTenure) * 12} Months</p>
                      </div>
                      
                      <div className="text-center bg-green-50 rounded-2xl p-6 border border-green-200">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <TrendingDown className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="text-lg font-semibold text-green-800 mb-2">New Tenure</h4>
                        <p className="text-3xl font-bold text-green-600">
                          {Math.floor(result.newTenure / 12)}y {result.newTenure % 12}m
                        </p>
                        <p className="text-green-500 text-sm mt-1">{result.newTenure} Months</p>
                      </div>
                      
                      <div className="text-center bg-blue-50 rounded-2xl p-6 border border-blue-200">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <DollarSign className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="text-lg font-semibold text-blue-800 mb-2">Interest Saved</h4>
                        <p className="text-3xl font-bold text-blue-600">
                          ₹{(result.interestSaved/100000).toFixed(1)}L
                        </p>
                        <p className="text-blue-500 text-sm mt-1">
                          ₹{result.interestSaved.toLocaleString('en-IN', {maximumFractionDigits: 0})}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Block 3: Loan Balance Comparison Chart */}
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
                    <h3 className="text-2xl font-bold text-white flex items-center">
                      <TrendingDown className="w-6 h-6 mr-3" />
                      Loan Balance Comparison
                    </h3>
                    <p className="text-purple-100 mt-2">Visualize how part payments reduce your outstanding balance over time</p>
                  </div>
                  <div className="p-8">
                    <div className="h-96">
                      <Line ref={chartRef} data={data} options={chartOptions} />
                    </div>
                  </div>
                </div>

                {/* Block 4: Financial Summary - 3 Columns */}
                <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6">
                    <h3 className="text-2xl font-bold text-white flex items-center">
                      <Calculator className="w-6 h-6 mr-3" />
                      Financial Summary
                    </h3>
                    <p className="text-indigo-100 mt-2">Key financial metrics for your loan</p>
                  </div>
                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center bg-indigo-50 rounded-2xl p-6 border border-indigo-200">
                        <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Calendar className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="text-lg font-semibold text-indigo-800 mb-2">Monthly EMI</h4>
                        <p className="text-3xl font-bold text-indigo-600">
                          ₹{(result.emi/1000).toFixed(0)}K
                        </p>
                        <p className="text-indigo-500 text-sm mt-1">
                          ₹{result.emi.toLocaleString('en-IN', {maximumFractionDigits: 0})}
                        </p>
                      </div>
                      
                      <div className="text-center bg-green-50 rounded-2xl p-6 border border-green-200">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Plus className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="text-lg font-semibold text-green-800 mb-2">Total Part Payments</h4>
                        <p className="text-3xl font-bold text-green-600">
                          ₹{(partPayments.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0)/100000).toFixed(1)}L
                        </p>
                        <p className="text-green-500 text-sm mt-1">
                          ₹{partPayments.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0).toLocaleString('en-IN')}
                        </p>
                      </div>
                      
                      <div className="text-center bg-purple-50 rounded-2xl p-6 border border-purple-200">
                        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <TrendingDown className="w-6 h-6 text-white" />
                        </div>
                        <h4 className="text-lg font-semibold text-purple-800 mb-2">Months Reduced</h4>
                        <p className="text-3xl font-bold text-purple-600">
                          {(parseInt(loanTenure) * 12) - result.newTenure}
                        </p>
                        <p className="text-purple-500 text-sm mt-1">
                          {Math.floor(((parseInt(loanTenure) * 12) - result.newTenure)/12)}y {((parseInt(loanTenure) * 12) - result.newTenure)%12}m saved
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {!result && (
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12 text-center">
                <Calculator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Ready to Calculate?</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Enter your loan details and part payment schedule to see how much you can save on interest and reduce your loan tenure.
                </p>
              </div>
            )}

            {/* Block 5: Part-payment Schedule */}
            {result && (
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6">
                  <h3 className="text-2xl font-bold text-white flex items-center">
                    <Calendar className="w-6 h-6 mr-3" />
                    Part-payment Schedule
                  </h3>
                  <p className="text-emerald-100 mt-2">Detailed month-wise breakdown of your loan payments</p>
                </div>
                <div className="p-0">
                  <AmortizationTable amortization={result.newAmortization} emi={result.emi} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PartPaymentCalculator;
