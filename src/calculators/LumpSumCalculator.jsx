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

const LumpSumCalculator = () => {
  // Input states
  const [investmentAmount, setInvestmentAmount] = useState(100000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  const [inflationRate, setInflationRate] = useState(6);
  const [taxRate, setTaxRate] = useState(10);

  // Result states
  const [maturityAmount, setMaturityAmount] = useState(0);
  const [totalReturns, setTotalReturns] = useState(0);
  const [realValue, setRealValue] = useState(0);
  const [postTaxReturns, setPostTaxReturns] = useState(0);
  const [yearWiseData, setYearWiseData] = useState([]);

  // Calculate Lump Sum Returns
  const calculateLumpSum = useCallback(() => {
    const principal = Number(investmentAmount) || 0;
    const annualReturn = Number(expectedReturn) / 100 || 0;
    const years = Number(timePeriod) || 0;
    const inflation = Number(inflationRate) / 100 || 0;
    const tax = Number(taxRate) / 100 || 0;

    if (principal <= 0 || years <= 0) {
      setMaturityAmount(0);
      setTotalReturns(0);
      setRealValue(0);
      setPostTaxReturns(0);
      setYearWiseData([]);
      return;
    }

    const yearlyData = [];
    let currentValue = principal;

    for (let year = 1; year <= years; year++) {
      const yearStartValue = currentValue;
      currentValue = currentValue * (1 + annualReturn);
      const yearReturns = currentValue - yearStartValue;
      const cumulativeReturns = currentValue - principal;
      const inflationAdjustedValue = currentValue / Math.pow(1 + inflation, year);
      
      yearlyData.push({
        year,
        startValue: yearStartValue,
        endValue: currentValue,
        yearReturns: yearReturns,
        cumulativeReturns: cumulativeReturns,
        inflationAdjustedValue: inflationAdjustedValue,
        realGrowthRate: ((currentValue / principal) / Math.pow(1 + inflation, year) - 1) * 100
      });
    }

    const finalMaturity = currentValue;
    const totalGains = finalMaturity - principal;
    const taxOnGains = totalGains * tax;
    const postTaxMaturity = finalMaturity - taxOnGains;
    const realValueFinal = finalMaturity / Math.pow(1 + inflation, years);

    setMaturityAmount(finalMaturity);
    setTotalReturns(totalGains);
    setRealValue(realValueFinal);
    setPostTaxReturns(postTaxMaturity);
    setYearWiseData(yearlyData);
  }, [investmentAmount, expectedReturn, timePeriod, inflationRate, taxRate]);

  useEffect(() => {
    calculateLumpSum();
  }, [calculateLumpSum]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return value.toFixed(2) + '%';
  };

  // Chart data preparation
  const getGrowthChartData = () => {
    if (yearWiseData.length === 0) return null;

    const labels = yearWiseData.map(data => `Year ${data.year}`);
    
    return {
      labels,
      datasets: [
        {
          label: 'Investment Value',
          data: yearWiseData.map(data => data.endValue),
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          tension: 0.3,
        },
        {
          label: 'Inflation Adjusted Value',
          data: yearWiseData.map(data => data.inflationAdjustedValue),
          borderColor: 'rgb(239, 68, 68)',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          fill: false,
          tension: 0.3,
          borderDash: [5, 5],
        },
        {
          label: 'Principal Amount',
          data: Array(yearWiseData.length).fill(Number(investmentAmount)),
          borderColor: 'rgb(34, 197, 94)',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          fill: false,
          tension: 0,
        }
      ]
    };
  };

  const getReturnsBreakdownData = () => {
    const taxOnGains = totalReturns * (Number(taxRate) / 100);
    return {
      labels: ['Principal Investment', 'Returns (Pre-tax)', 'Tax on Gains'],
      datasets: [
        {
          data: [Number(investmentAmount), totalReturns - taxOnGains, taxOnGains],
          backgroundColor: [
            'rgba(34, 197, 94, 0.8)',
            'rgba(59, 130, 246, 0.8)',
            'rgba(239, 68, 68, 0.8)',
          ],
          borderColor: [
            'rgb(34, 197, 94)',
            'rgb(59, 130, 246)',
            'rgb(239, 68, 68)',
          ],
          borderWidth: 2,
        },
      ],
    };
  };

  const getYearlyReturnsData = () => {
    if (yearWiseData.length === 0) return null;

    const labels = yearWiseData.map(data => `Year ${data.year}`);
    
    return {
      labels,
      datasets: [
        {
          label: 'Annual Returns',
          data: yearWiseData.map(data => data.yearReturns),
          backgroundColor: 'rgba(168, 85, 247, 0.8)',
          borderColor: 'rgb(168, 85, 247)',
          borderWidth: 1,
        },
        {
          label: 'Real Growth Rate (%)',
          data: yearWiseData.map(data => data.realGrowthRate * 1000), // Scale for visibility
          type: 'line',
          borderColor: 'rgb(245, 101, 101)',
          backgroundColor: 'rgba(245, 101, 101, 0.1)',
          yAxisID: 'y1',
          tension: 0.3,
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
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            if (context.dataset.label === 'Real Growth Rate (%)') {
              return context.dataset.label + ': ' + (context.parsed.y / 1000).toFixed(2) + '%';
            }
            return context.dataset.label + ': ' + formatCurrency(context.parsed.y);
          }
        }
      }
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return '₹' + (value / 100000).toFixed(0) + 'L';
          }
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        beginAtZero: true,
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function(value) {
            return (value / 1000).toFixed(1) + '%';
          }
        }
      },
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
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg p-6 mb-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Lump Sum Investment Calculator</h1>
            <p className="opacity-90">Calculate the future value of your one-time investment with inflation and tax considerations</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Investment Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Investment Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expected Annual Return (%)
                  </label>
                  <input
                    type="number"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
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
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    step="0.1"
                    min="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">For real value calculation</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tax Rate on Gains (%)
                  </label>
                  <input
                    type="number"
                    value={taxRate}
                    onChange={(e) => setTaxRate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    step="0.1"
                    min="0"
                    max="50"
                  />
                  <p className="text-xs text-gray-500 mt-1">Capital gains tax rate</p>
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
                  <p className="text-sm opacity-75">after {timePeriod} years</p>
                </div>

                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
                  <h3 className="text-sm font-medium opacity-90">Total Returns</h3>
                  <p className="text-2xl font-bold">{formatCurrency(totalReturns)}</p>
                  <p className="text-sm opacity-75">
                    {Number(investmentAmount) > 0 ? formatPercentage((totalReturns / Number(investmentAmount)) * 100) : '0%'} growth
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
                  <h3 className="text-sm font-medium opacity-90">Real Value</h3>
                  <p className="text-2xl font-bold">{formatCurrency(realValue)}</p>
                  <p className="text-sm opacity-75">inflation adjusted</p>
                </div>

                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white">
                  <h3 className="text-sm font-medium opacity-90">Post-tax Returns</h3>
                  <p className="text-2xl font-bold">{formatCurrency(postTaxReturns)}</p>
                  <p className="text-sm opacity-75">after {taxRate}% tax</p>
                </div>
              </div>

              {/* Charts Section */}
              {yearWiseData.length > 0 && (
                <div className="space-y-6">
                  {/* Returns Breakdown */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Investment Breakdown</h3>
                    <div className="h-64">
                      <Doughnut data={getReturnsBreakdownData()} options={doughnutOptions} />
                    </div>
                  </div>

                  {/* Growth Chart */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Investment Growth Over Time</h3>
                    <div className="h-64">
                      <Line data={getGrowthChartData()} options={chartOptions} />
                    </div>
                  </div>
                </div>
              )}

              {/* Key Metrics */}
              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-4 border border-emerald-100">
                <h3 className="text-lg font-semibold mb-3 text-emerald-900">Key Investment Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                    <div>
                      <p className="text-sm font-medium text-emerald-800">CAGR</p>
                      <p className="text-lg font-bold text-emerald-900">
                        {formatPercentage(expectedReturn)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <div>
                      <p className="text-sm font-medium text-emerald-800">Real CAGR</p>
                      <p className="text-lg font-bold text-emerald-900">
                        {formatPercentage(expectedReturn - inflationRate)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Year-wise Breakdown Table */}
          {yearWiseData.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Year-wise Investment Growth</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Year
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Start Value
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        End Value
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Annual Returns
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Real Value
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Real Growth Rate
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
                          {formatCurrency(data.startValue)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                          {formatCurrency(data.endValue)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                          {formatCurrency(data.yearReturns)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600 font-medium">
                          {formatCurrency(data.inflationAdjustedValue)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-600 font-medium">
                          {formatPercentage(data.realGrowthRate)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Annual Returns Chart */}
          {yearWiseData.length > 0 && getYearlyReturnsData() && (
            <div className="mt-8">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Annual Returns & Real Growth Rate</h3>
                <div className="h-64">
                  <Bar data={getYearlyReturnsData()} options={barChartOptions} />
                </div>
              </div>
            </div>
          )}

          {/* Key Features */}
          <div className="mt-8 bg-emerald-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-emerald-900">Benefits of Lump Sum Investment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-emerald-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-emerald-900">Immediate Full Exposure</h4>
                  <p className="text-sm text-emerald-700">Entire amount starts earning returns immediately</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-emerald-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-emerald-900">Compounding Power</h4>
                  <p className="text-sm text-emerald-700">Maximum benefit from compound interest</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-emerald-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-emerald-900">Market Timing Potential</h4>
                  <p className="text-sm text-emerald-700">Can invest during market dips for better returns</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-emerald-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-emerald-900">Simple & Convenient</h4>
                  <p className="text-sm text-emerald-700">One-time investment with no periodic commitments</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LumpSumCalculator;
