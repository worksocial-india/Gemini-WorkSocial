import React, { useState, useCallback, useEffect } from 'react';
import CalculatorSidebar from './CalculatorSidebar';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const SWPCalculator = () => {
  // Input states
  const [initialInvestment, setInitialInvestment] = useState(1000000);
  const [withdrawalAmount, setWithdrawalAmount] = useState(5000);
  const [withdrawalFrequency, setWithdrawalFrequency] = useState('monthly');
  const [annualReturn, setAnnualReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  const [inflationRate, setInflationRate] = useState(6);

  // Result states
  const [totalWithdrawals, setTotalWithdrawals] = useState(0);
  const [remainingCorpus, setRemainingCorpus] = useState(0);
  const [numberOfWithdrawals, setNumberOfWithdrawals] = useState(0);
  const [yearWiseData, setYearWiseData] = useState([]);
  const [corpusDepletion, setCorpusDepletion] = useState(null);

  // Calculate SWP
  const calculateSWP = useCallback(() => {
    const principal = Number(initialInvestment) || 0;
    const withdrawal = Number(withdrawalAmount) || 0;
    const years = Number(timePeriod) || 0;
    const returnRate = Number(annualReturn) / 100 || 0;
    const inflation = Number(inflationRate) / 100 || 0;

    if (principal <= 0 || withdrawal <= 0 || years <= 0) {
      setTotalWithdrawals(0);
      setRemainingCorpus(0);
      setNumberOfWithdrawals(0);
      setYearWiseData([]);
      setCorpusDepletion(null);
      return;
    }

    // Calculate frequency multiplier
    const frequencyMap = {
      'monthly': 12,
      'quarterly': 4,
      'half-yearly': 2,
      'yearly': 1
    };
    
    const frequency = frequencyMap[withdrawalFrequency];
    // Correct compound return calculation: (1 + annual_rate)^(1/frequency) - 1
    const periodicReturn = (Math.pow(1 + returnRate, 1 / frequency) - 1) * 100;
    
    let currentCorpus = principal;
    let totalWithdrawn = 0;
    let withdrawalCount = 0;
    const yearlyData = [];
    let corpusDepletionTime = null;

    for (let year = 1; year <= years; year++) {
      let yearStartCorpus = currentCorpus;
      let yearWithdrawals = 0;
      let yearEndCorpus = currentCorpus;
      let yearReturns = 0;

      for (let period = 1; period <= frequency; period++) {
        if (currentCorpus <= 0) {
          if (!corpusDepletionTime) {
            const yearsCompleted = year - 1 + (period - 1) / frequency;
            corpusDepletionTime = yearsCompleted;
          }
          break;
        }

        // Apply return first
        const returnAmount = currentCorpus * (periodicReturn / 100);
        currentCorpus = currentCorpus * (1 + periodicReturn / 100);
        yearReturns += returnAmount;
        
        // Then withdraw
        if (currentCorpus >= withdrawal) {
          currentCorpus -= withdrawal;
          totalWithdrawn += withdrawal;
          yearWithdrawals += withdrawal;
          withdrawalCount++;
        } else {
          // Partial withdrawal if corpus is less than withdrawal amount
          if (currentCorpus > 0) {
            totalWithdrawn += currentCorpus;
            yearWithdrawals += currentCorpus;
            withdrawalCount++;
            currentCorpus = 0;
          }
        }
        
        yearEndCorpus = currentCorpus;
      }

      // Adjust withdrawal for inflation (for display purposes)
      const inflationAdjustedWithdrawal = withdrawal * Math.pow(1 + inflation, year - 1);
      
      yearlyData.push({
        year,
        startCorpus: yearStartCorpus,
        withdrawals: yearWithdrawals,
        returns: yearReturns,
        endCorpus: yearEndCorpus,
        inflationAdjustedWithdrawal
      });

      if (currentCorpus <= 0 && !corpusDepletionTime) {
        corpusDepletionTime = year;
        break;
      }
    }

    setTotalWithdrawals(totalWithdrawn);
    setRemainingCorpus(Math.max(0, currentCorpus));
    setNumberOfWithdrawals(withdrawalCount);
    setYearWiseData(yearlyData);
    setCorpusDepletion(corpusDepletionTime);
  }, [initialInvestment, withdrawalAmount, withdrawalFrequency, annualReturn, timePeriod, inflationRate]);

  useEffect(() => {
    calculateSWP();
  }, [calculateSWP]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getFrequencyText = () => {
    const frequencyMap = {
      'monthly': 'per month',
      'quarterly': 'per quarter',
      'half-yearly': 'per half year',
      'yearly': 'per year'
    };
    return frequencyMap[withdrawalFrequency];
  };

  // Prepare chart data
  const getChartData = () => {
    if (yearWiseData.length === 0) return null;

    const labels = yearWiseData.map(data => `Year ${data.year}`);
    
    return {
      labels,
      datasets: [
        {
          label: 'Corpus Value',
          data: yearWiseData.map(data => data.endCorpus),
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          tension: 0.3,
        },
        {
          label: 'Cumulative Withdrawals',
          data: yearWiseData.map((data, index) => {
            return yearWiseData.slice(0, index + 1).reduce((sum, item) => sum + item.withdrawals, 0);
          }),
          borderColor: 'rgb(34, 197, 94)',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          fill: false,
          tension: 0.3,
        }
      ]
    };
  };

  const getReturnsChartData = () => {
    if (yearWiseData.length === 0) return null;

    const labels = yearWiseData.map(data => `Year ${data.year}`);
    
    return {
      labels,
      datasets: [
        {
          label: 'Annual Returns',
          data: yearWiseData.map(data => data.returns),
          backgroundColor: 'rgba(168, 85, 247, 0.8)',
          borderColor: 'rgb(168, 85, 247)',
          borderWidth: 1,
        },
        {
          label: 'Annual Withdrawals',
          data: yearWiseData.map(data => data.withdrawals),
          backgroundColor: 'rgba(245, 101, 101, 0.8)',
          borderColor: 'rgb(245, 101, 101)',
          borderWidth: 1,
        }
      ]
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return context.dataset.label + ': ' + formatCurrency(context.parsed.y);
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '₹' + (value / 100000).toFixed(0) + 'L';
          }
        }
      }
    }
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return context.dataset.label + ': ' + formatCurrency(context.parsed.y);
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '₹' + (value / 100000).toFixed(0) + 'L';
          }
        }
      }
    }
  };

  return (
    <div className="flex">
      <div className="hidden lg:block">
        <CalculatorSidebar />
      </div>
      <div className="flex-grow">
        <div className="max-w-6xl mx-auto p-4 md:p-8 bg-white shadow-lg rounded-lg mt-10">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 mb-8 text-white">
            <h1 className="text-3xl font-bold mb-2">SWP (Systematic Withdrawal Plan) Calculator</h1>
            <p className="opacity-90">Calculate your systematic withdrawals and track corpus depletion</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Investment Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Initial Investment (₹)
                  </label>
                  <input
                    type="number"
                    value={initialInvestment}
                    onChange={(e) => setInitialInvestment(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Withdrawal Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={withdrawalAmount}
                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Withdrawal Frequency
                  </label>
                  <select
                    value={withdrawalFrequency}
                    onChange={(e) => setWithdrawalFrequency(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="half-yearly">Half Yearly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expected Annual Return (%)
                  </label>
                  <input
                    type="number"
                    value={annualReturn}
                    onChange={(e) => setAnnualReturn(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    step="0.1"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time Period (Years)
                  </label>
                  <input
                    type="number"
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Inflation Rate (%)
                  </label>
                  <input
                    type="number"
                    value={inflationRate}
                    onChange={(e) => setInflationRate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    step="0.1"
                    min="0"
                  />
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
                  <h3 className="text-sm font-medium opacity-90">Total Withdrawals</h3>
                  <p className="text-2xl font-bold">{formatCurrency(totalWithdrawals)}</p>
                  <p className="text-sm opacity-75">in {numberOfWithdrawals} installments</p>
                </div>

                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
                  <h3 className="text-sm font-medium opacity-90">Remaining Corpus</h3>
                  <p className="text-2xl font-bold">{formatCurrency(remainingCorpus)}</p>
                  <p className="text-sm opacity-75">after {timePeriod} years</p>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
                  <h3 className="text-sm font-medium opacity-90">Withdrawal Amount</h3>
                  <p className="text-2xl font-bold">{formatCurrency(withdrawalAmount)}</p>
                  <p className="text-sm opacity-75">{getFrequencyText()}</p>
                </div>

                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white">
                  <h3 className="text-sm font-medium opacity-90">Expected Return</h3>
                  <p className="text-2xl font-bold">{annualReturn}%</p>
                  <p className="text-sm opacity-75">per annum</p>
                </div>
              </div>

              {/* Charts Section */}
              {yearWiseData.length > 0 && getChartData() && (
                <div className="space-y-6">
                  {/* Corpus Progression Chart */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Corpus & Withdrawals Progression</h3>
                    <div className="h-64">
                      <Line data={getChartData()} options={chartOptions} />
                    </div>
                  </div>

                  {/* Returns vs Withdrawals Chart */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Annual Returns vs Withdrawals</h3>
                    <div className="h-64">
                      <Bar data={getReturnsChartData()} options={barChartOptions} />
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-100">
                    <h3 className="text-lg font-semibold mb-3 text-indigo-900">Key Insights</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                        <div>
                          <p className="text-sm font-medium text-indigo-800">Total Returns Earned</p>
                          <p className="text-lg font-bold text-indigo-900">
                            {formatCurrency(yearWiseData.reduce((sum, data) => sum + data.returns, 0))}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                        <div>
                          <p className="text-sm font-medium text-indigo-800">Average Annual Return</p>
                          <p className="text-lg font-bold text-indigo-900">
                            {yearWiseData.length > 0 ? 
                              formatCurrency(yearWiseData.reduce((sum, data) => sum + data.returns, 0) / yearWiseData.length) 
                              : '₹0'
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Corpus Depletion Warning */}
              {corpusDepletion && corpusDepletion < timePeriod && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">Corpus Depletion Alert</h3>
                      <p className="text-sm text-red-700 mt-1">
                        Your corpus will be depleted in approximately {corpusDepletion.toFixed(1)} years. 
                        Consider reducing withdrawal amount or increasing expected returns.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Year-wise Breakdown Table */}
          {yearWiseData.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Year-wise Breakdown</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Year
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Starting Corpus
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Returns Earned
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Withdrawals
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ending Corpus
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Inflation Adj. Withdrawal
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {yearWiseData.map((data, index) => (
                      <tr key={data.year} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {data.year}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(data.startCorpus)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                          {formatCurrency(data.returns)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(data.withdrawals)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(data.endCorpus)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(data.inflationAdjustedWithdrawal)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Key Features */}
          <div className="mt-8 bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-blue-900">Key Features of SWP</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-blue-900">Regular Income</h4>
                  <p className="text-sm text-blue-700">Provides steady cash flow from your investments</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-blue-900">Flexibility</h4>
                  <p className="text-sm text-blue-700">Can modify or stop withdrawals anytime</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-blue-900">Tax Efficiency</h4>
                  <p className="text-sm text-blue-700">Capital gains taxation instead of regular income tax</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-blue-900">Rupee Cost Averaging</h4>
                  <p className="text-sm text-blue-700">Benefits from market fluctuations over time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SWPCalculator;
