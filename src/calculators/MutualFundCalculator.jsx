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

const MutualFundCalculator = () => {
  // Input states
  const [investmentType, setInvestmentType] = useState('sip'); // sip or lumpsum
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [lumpSumAmount, setLumpSumAmount] = useState(100000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  const [stepUpPercentage, setStepUpPercentage] = useState(0);

  // Result states
  const [maturityAmount, setMaturityAmount] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [wealthGained, setWealthGained] = useState(0);
  const [yearWiseData, setYearWiseData] = useState([]);

  // Calculate returns
  const calculateReturns = useCallback(() => {
    const years = Number(timePeriod) || 0;
    const annualReturn = Number(expectedReturn) / 100 || 0;
    const stepUp = Number(stepUpPercentage) / 100 || 0;

    if (years <= 0) {
      setMaturityAmount(0);
      setTotalInvestment(0);
      setWealthGained(0);
      setYearWiseData([]);
      return;
    }

    let totalInvested = 0;
    let maturityValue = 0;
    const yearlyData = [];

    if (investmentType === 'sip') {
      const monthlyAmount = Number(monthlyInvestment) || 0;
      if (monthlyAmount <= 0) {
        setMaturityAmount(0);
        setTotalInvestment(0);
        setWealthGained(0);
        setYearWiseData([]);
        return;
      }

      let currentMonthlyAmount = monthlyAmount;
      let currentValue = 0;

      for (let year = 1; year <= years; year++) {
        let yearStartValue = currentValue;
        let yearInvestment = 0;

        // Calculate for 12 months
        for (let month = 1; month <= 12; month++) {
          currentValue += currentMonthlyAmount;
          yearInvestment += currentMonthlyAmount;
          totalInvested += currentMonthlyAmount;
          
          // Apply monthly return
          currentValue = currentValue * (1 + annualReturn / 12);
        }

        yearlyData.push({
          year,
          startValue: yearStartValue,
          investment: yearInvestment,
          endValue: currentValue,
          totalInvested: totalInvested,
          gains: currentValue - totalInvested
        });

        // Apply step-up for next year
        if (stepUp > 0 && year < years) {
          currentMonthlyAmount = currentMonthlyAmount * (1 + stepUp);
        }
      }

      maturityValue = currentValue;
    } else {
      // Lump sum calculation
      const principal = Number(lumpSumAmount) || 0;
      if (principal <= 0) {
        setMaturityAmount(0);
        setTotalInvestment(0);
        setWealthGained(0);
        setYearWiseData([]);
        return;
      }

      totalInvested = principal;
      let currentValue = principal;

      for (let year = 1; year <= years; year++) {
        const yearStartValue = currentValue;
        currentValue = currentValue * (1 + annualReturn);

        yearlyData.push({
          year,
          startValue: yearStartValue,
          investment: year === 1 ? principal : 0,
          endValue: currentValue,
          totalInvested: totalInvested,
          gains: currentValue - totalInvested
        });
      }

      maturityValue = currentValue;
    }

    setMaturityAmount(maturityValue);
    setTotalInvestment(totalInvested);
    setWealthGained(maturityValue - totalInvested);
    setYearWiseData(yearlyData);
  }, [investmentType, monthlyInvestment, lumpSumAmount, expectedReturn, timePeriod, stepUpPercentage]);

  useEffect(() => {
    calculateReturns();
  }, [calculateReturns]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
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
          label: 'Total Investment',
          data: yearWiseData.map(data => data.totalInvested),
          borderColor: 'rgb(34, 197, 94)',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          fill: false,
          tension: 0.3,
        }
      ]
    };
  };

  const getInvestmentBreakdownData = () => {
    return {
      labels: ['Total Investment', 'Wealth Gained'],
      datasets: [
        {
          data: [totalInvestment, wealthGained],
          backgroundColor: [
            'rgba(34, 197, 94, 0.8)',
            'rgba(59, 130, 246, 0.8)',
          ],
          borderColor: [
            'rgb(34, 197, 94)',
            'rgb(59, 130, 246)',
          ],
          borderWidth: 2,
        },
      ],
    };
  };

  const getYearlyContributionData = () => {
    if (yearWiseData.length === 0) return null;

    const labels = yearWiseData.map(data => `Year ${data.year}`);
    
    return {
      labels,
      datasets: [
        {
          label: 'Annual Investment',
          data: yearWiseData.map(data => data.investment),
          backgroundColor: 'rgba(168, 85, 247, 0.8)',
          borderColor: 'rgb(168, 85, 247)',
          borderWidth: 1,
        },
        {
          label: 'Annual Gains',
          data: yearWiseData.map((data, index) => {
            if (index === 0) return data.gains;
            return data.gains - yearWiseData[index - 1].gains;
          }),
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
            const percentage = ((context.parsed / (totalInvestment + wealthGained)) * 100).toFixed(1);
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
            return '₹' + (value / 100000).toFixed(0) + 'L';
          }
        }
      }
    }
  };

  return (
    <div className="flex">
      <CalculatorSidebar />
      <div className="flex-grow">
        <div className="max-w-6xl mx-auto p-4 md:p-8 bg-white shadow-lg rounded-lg mt-10">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 mb-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Mutual Fund Return Calculator</h1>
            <p className="opacity-90">Calculate your mutual fund returns for SIP and lump sum investments</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Investment Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Investment Type
                  </label>
                  <select
                    value={investmentType}
                    onChange={(e) => setInvestmentType(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="sip">SIP (Systematic Investment Plan)</option>
                    <option value="lumpsum">Lump Sum Investment</option>
                  </select>
                </div>

                {investmentType === 'sip' ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Monthly Investment (Rs.)
                      </label>
                      <input
                        type="number"
                        value={monthlyInvestment}
                        onChange={(e) => setMonthlyInvestment(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        min="0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Annual Step-up (%)
                      </label>
                      <input
                        type="number"
                        value={stepUpPercentage}
                        onChange={(e) => setStepUpPercentage(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        step="0.1"
                        min="0"
                        max="50"
                      />
                      <p className="text-xs text-gray-500 mt-1">Increase investment amount annually</p>
                    </div>
                  </>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Lump Sum Amount (Rs.)
                    </label>
                    <input
                      type="number"
                      value={lumpSumAmount}
                      onChange={(e) => setLumpSumAmount(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expected Annual Return (%)
                  </label>
                  <input
                    type="number"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                  <p className="text-sm opacity-75">after {timePeriod} years</p>
                </div>

                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
                  <h3 className="text-sm font-medium opacity-90">Total Investment</h3>
                  <p className="text-2xl font-bold">{formatCurrency(totalInvestment)}</p>
                  <p className="text-sm opacity-75">principal amount</p>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
                  <h3 className="text-sm font-medium opacity-90">Wealth Gained</h3>
                  <p className="text-2xl font-bold">{formatCurrency(wealthGained)}</p>
                  <p className="text-sm opacity-75">
                    {totalInvestment > 0 ? `${((wealthGained / totalInvestment) * 100).toFixed(1)}% returns` : '0% returns'}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-4 text-white">
                  <h3 className="text-sm font-medium opacity-90">Investment Type</h3>
                  <p className="text-2xl font-bold">{investmentType.toUpperCase()}</p>
                  <p className="text-sm opacity-75">{expectedReturn}% expected return</p>
                </div>
              </div>

              {/* Charts Section */}
              {yearWiseData.length > 0 && (
                <div className="space-y-6">
                  {/* Investment vs Returns Breakdown */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Investment Breakdown</h3>
                    <div className="h-64">
                      <Doughnut data={getInvestmentBreakdownData()} options={doughnutOptions} />
                    </div>
                  </div>

                  {/* Growth Chart */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Investment Growth</h3>
                    <div className="h-64">
                      <Line data={getGrowthChartData()} options={chartOptions} />
                    </div>
                  </div>
                </div>
              )}
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
                        Annual Investment
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Invested
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
                          {formatCurrency(data.investment)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrency(data.totalInvested)}
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

          {/* Additional Chart - Annual Contributions vs Gains */}
          {yearWiseData.length > 0 && getYearlyContributionData() && (
            <div className="mt-8">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Annual Investment vs Gains</h3>
                <div className="h-64">
                  <Bar data={getYearlyContributionData()} options={barChartOptions} />
                </div>
              </div>
            </div>
          )}

          {/* Key Features */}
          <div className="mt-8 bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-blue-900">Key Features of Mutual Fund Investment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-blue-900">Professional Management</h4>
                  <p className="text-sm text-blue-700">Expert fund managers handle your investments</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-blue-900">Diversification</h4>
                  <p className="text-sm text-blue-700">Risk spread across multiple securities</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-blue-900">SIP Benefits</h4>
                  <p className="text-sm text-blue-700">Rupee cost averaging and compounding power</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-blue-900">Liquidity</h4>
                  <p className="text-sm text-blue-700">Easy to buy and sell units anytime</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MutualFundCalculator;
