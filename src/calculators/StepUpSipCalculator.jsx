import React, { useState, useCallback, useEffect } from 'react';
import CalculatorSidebar from './CalculatorSidebar';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const StepUpSipCalculator = () => {
  // Input states
  const [initialSipAmount, setInitialSipAmount] = useState(5000);
  const [stepUpPercentage, setStepUpPercentage] = useState(10);
  const [stepUpFrequency, setStepUpFrequency] = useState('yearly');
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);

  // Result states
  const [maturityAmount, setMaturityAmount] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [wealthGained, setWealthGained] = useState(0);
  const [regularSipComparison, setRegularSipComparison] = useState(0);
  const [yearWiseData, setYearWiseData] = useState([]);

  // Calculate Step-up SIP
  const calculateStepUpSip = useCallback(() => {
    const principal = Number(initialSipAmount) || 0;
    const stepUp = Number(stepUpPercentage) / 100 || 0;
    const years = Number(timePeriod) || 0;
    const annualReturn = Number(expectedReturn) / 100 || 0;
    const monthlyReturn = annualReturn / 12;

    if (principal <= 0 || years <= 0) {
      setMaturityAmount(0);
      setTotalInvestment(0);
      setWealthGained(0);
      setRegularSipComparison(0);
      setYearWiseData([]);
      return;
    }

    let currentSipAmount = principal;
    let totalInvested = 0;
    let currentValue = 0;
    const yearlyData = [];

    // Calculate step-up frequency
    // const stepUpMonths = stepUpFrequency === 'yearly' ? 12 : 6; // yearly or half-yearly

    for (let year = 1; year <= years; year++) {
      let yearStartValue = currentValue;
      let yearInvestment = 0;
      let yearStartSip = currentSipAmount;

      for (let month = 1; month <= 12; month++) {
        // Apply step-up if it's time
        if (year > 1 && month === 1 && stepUpFrequency === 'yearly') {
          currentSipAmount = currentSipAmount * (1 + stepUp);
        } else if (stepUpFrequency === 'half-yearly' && ((month === 1 && year > 1) || month === 7)) {
          if (!(year === 1 && month === 7)) { // Don't step up in the first 6 months
            currentSipAmount = currentSipAmount * (1 + stepUp);
          }
        }

        // Add monthly investment
        currentValue += currentSipAmount;
        yearInvestment += currentSipAmount;
        totalInvested += currentSipAmount;

        // Apply monthly return
        currentValue = currentValue * (1 + monthlyReturn);
      }

      yearlyData.push({
        year,
        startValue: yearStartValue,
        investment: yearInvestment,
        endValue: currentValue,
        totalInvested: totalInvested,
        gains: currentValue - totalInvested,
        averageSip: yearInvestment / 12,
        yearStartSip: yearStartSip,
        yearEndSip: currentSipAmount
      });
    }

    // Calculate regular SIP comparison (without step-up)
    let regularSipValue = 0;
    // let regularTotalInvested = years * 12 * principal;
    for (let month = 1; month <= years * 12; month++) {
      regularSipValue += principal;
      regularSipValue = regularSipValue * (1 + monthlyReturn);
    }

    setMaturityAmount(currentValue);
    setTotalInvestment(totalInvested);
    setWealthGained(currentValue - totalInvested);
    setRegularSipComparison(regularSipValue);
    setYearWiseData(yearlyData);
  }, [initialSipAmount, stepUpPercentage, stepUpFrequency, expectedReturn, timePeriod]);

  useEffect(() => {
    calculateStepUpSip();
  }, [calculateStepUpSip]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStepUpFrequencyText = () => {
    return stepUpFrequency === 'yearly' ? 'Annually' : 'Half-yearly';
  };

  // Chart data preparation
  const getGrowthComparisonData = () => {
    if (yearWiseData.length === 0) return null;

    const labels = yearWiseData.map(data => `Year ${data.year}`);
    
    // Calculate regular SIP progression for comparison
    const regularSipProgression = [];
    let regularValue = 0;
    const monthlyReturn = (Number(expectedReturn) / 100) / 12;
    const principal = Number(initialSipAmount);

    for (let year = 1; year <= yearWiseData.length; year++) {
      for (let month = 1; month <= 12; month++) {
        regularValue += principal;
        regularValue = regularValue * (1 + monthlyReturn);
      }
      regularSipProgression.push(regularValue);
    }
    
    return {
      labels,
      datasets: [
        {
          label: 'Step-up SIP Value',
          data: yearWiseData.map(data => data.endValue),
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          tension: 0.3,
        },
        {
          label: 'Regular SIP Value',
          data: regularSipProgression,
          borderColor: 'rgb(34, 197, 94)',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          fill: false,
          tension: 0.3,
          borderDash: [5, 5],
        },
        {
          label: 'Total Investment',
          data: yearWiseData.map(data => data.totalInvested),
          borderColor: 'rgb(168, 85, 247)',
          backgroundColor: 'rgba(168, 85, 247, 0.1)',
          fill: false,
          tension: 0.3,
        }
      ]
    };
  };

  const getInvestmentBreakdownData = () => {
    const extraGains = maturityAmount - regularSipComparison;
    return {
      labels: ['Regular SIP Returns', 'Step-up Advantage', 'Total Investment'],
      datasets: [
        {
          data: [regularSipComparison - (yearWiseData.length * 12 * Number(initialSipAmount)), extraGains, totalInvestment],
          backgroundColor: [
            'rgba(34, 197, 94, 0.8)',
            'rgba(59, 130, 246, 0.8)',
            'rgba(168, 85, 247, 0.8)',
          ],
          borderColor: [
            'rgb(34, 197, 94)',
            'rgb(59, 130, 246)',
            'rgb(168, 85, 247)',
          ],
          borderWidth: 2,
        },
      ],
    };
  };

  const getSipProgressionData = () => {
    if (yearWiseData.length === 0) return null;

    const labels = yearWiseData.map(data => `Year ${data.year}`);
    
    return {
      labels,
      datasets: [
        {
          label: 'SIP Amount (Start of Year)',
          data: yearWiseData.map(data => data.yearStartSip),
          backgroundColor: 'rgba(245, 101, 101, 0.8)',
          borderColor: 'rgb(245, 101, 101)',
          borderWidth: 1,
        },
        {
          label: 'SIP Amount (End of Year)',
          data: yearWiseData.map(data => data.yearEndSip),
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          borderColor: 'rgb(59, 130, 246)',
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

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((sum, value) => sum + value, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return context.label + ': ' + formatCurrency(context.parsed) + ' (' + percentage + '%)';
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
            return '₹' + (value / 1000).toFixed(0) + 'K';
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
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 mb-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Step-up SIP Calculator</h1>
            <p className="opacity-90">Calculate the power of increasing your SIP investments over time</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Investment Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Initial SIP Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={initialSipAmount}
                    onChange={(e) => setInitialSipAmount(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Step-up Percentage (%)
                  </label>
                  <input
                    type="number"
                    value={stepUpPercentage}
                    onChange={(e) => setStepUpPercentage(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    step="0.1"
                    min="0"
                    max="50"
                  />
                  <p className="text-xs text-gray-500 mt-1">Annual increase in SIP amount</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Step-up Frequency
                  </label>
                  <select
                    value={stepUpFrequency}
                    onChange={(e) => setStepUpFrequency(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="yearly">Yearly</option>
                    <option value="half-yearly">Half-yearly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expected Annual Return (%)
                  </label>
                  <input
                    type="number"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    step="0.1"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Investment Period (Years)
                  </label>
                  <input
                    type="number"
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    min="1"
                  />
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
                  <h3 className="text-sm font-medium opacity-90">Maturity Amount</h3>
                  <p className="text-2xl font-bold">{formatCurrency(maturityAmount)}</p>
                  <p className="text-sm opacity-75">with step-up SIP</p>
                </div>

                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
                  <h3 className="text-sm font-medium opacity-90">Total Investment</h3>
                  <p className="text-2xl font-bold">{formatCurrency(totalInvestment)}</p>
                  <p className="text-sm opacity-75">over {timePeriod} years</p>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
                  <h3 className="text-sm font-medium opacity-90">Wealth Gained</h3>
                  <p className="text-2xl font-bold">{formatCurrency(wealthGained)}</p>
                  <p className="text-sm opacity-75">
                    {totalInvestment > 0 ? `${((wealthGained / totalInvestment) * 100).toFixed(1)}% returns` : '0% returns'}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg p-4 text-white">
                  <h3 className="text-sm font-medium opacity-90">Step-up Advantage</h3>
                  <p className="text-2xl font-bold">{formatCurrency(maturityAmount - regularSipComparison)}</p>
                  <p className="text-sm opacity-75">vs regular SIP</p>
                </div>
              </div>

              {/* Charts Section */}
              {yearWiseData.length > 0 && (
                <div className="space-y-6">
                  {/* Investment Breakdown */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Investment Breakdown</h3>
                    <div className="h-64">
                      <Doughnut data={getInvestmentBreakdownData()} options={doughnutOptions} />
                    </div>
                  </div>

                  {/* Growth Comparison Chart */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Step-up vs Regular SIP Growth</h3>
                    <div className="h-64">
                      <Line data={getGrowthComparisonData()} options={chartOptions} />
                    </div>
                  </div>
                </div>
              )}

              {/* Step-up Benefits */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-100">
                <h3 className="text-lg font-semibold mb-3 text-indigo-900">Step-up Benefits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <div>
                      <p className="text-sm font-medium text-indigo-800">Extra Wealth</p>
                      <p className="text-lg font-bold text-indigo-900">
                        {formatCurrency(maturityAmount - regularSipComparison)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <div>
                      <p className="text-sm font-medium text-indigo-800">Step-up Frequency</p>
                      <p className="text-lg font-bold text-indigo-900">
                        {getStepUpFrequencyText()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SIP Progression Chart */}
          {yearWiseData.length > 0 && getSipProgressionData() && (
            <div className="mt-8">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">SIP Amount Progression</h3>
                <div className="h-64">
                  <Bar data={getSipProgressionData()} options={barChartOptions} />
                </div>
              </div>
            </div>
          )}

          {/* Year-wise Breakdown Table */}
          {yearWiseData.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Year-wise Step-up SIP Breakdown</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Year
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Starting SIP
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ending SIP
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Annual Investment
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Investment Value
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Gains
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
                          {formatCurrency(data.yearStartSip)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600 font-medium">
                          {formatCurrency(data.yearEndSip)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(data.investment)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                          {formatCurrency(data.endValue)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                          {formatCurrency(data.gains)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Key Features */}
          <div className="mt-8 bg-purple-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-purple-900">Benefits of Step-up SIP</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-purple-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-purple-900">Higher Wealth Creation</h4>
                  <p className="text-sm text-purple-700">Significantly more corpus than regular SIP</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-purple-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-purple-900">Inflation Hedge</h4>
                  <p className="text-sm text-purple-700">Increasing investments counter inflation</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-purple-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-purple-900">Income Growth Alignment</h4>
                  <p className="text-sm text-purple-700">Matches growing income with increasing investments</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-purple-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-purple-900">Disciplined Investing</h4>
                  <p className="text-sm text-purple-700">Automated step-up ensures consistent growth</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepUpSipCalculator;
