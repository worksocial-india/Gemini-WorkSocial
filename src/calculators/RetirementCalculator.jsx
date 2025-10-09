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

const RetirementCalculator = () => {
  // Input states
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);
  const [currentExpenses, setCurrentExpenses] = useState(50000);
  const [inflationRate, setInflationRate] = useState(6);
  const [preRetirementReturn, setPreRetirementReturn] = useState(12);
  const [postRetirementReturn, setPostRetirementReturn] = useState(8);
  const [currentSavings, setCurrentSavings] = useState(100000);
  const [monthlySip, setMonthlySip] = useState(10000);
  const [expenseReductionPercent, setExpenseReductionPercent] = useState(20);

  // Result states
  const [requiredCorpus, setRequiredCorpus] = useState(0);
  const [projectedCorpus, setProjectedCorpus] = useState(0);
  const [gap, setGap] = useState(0);
  const [requiredMonthlySip, setRequiredMonthlySip] = useState(0);
  const [yearWiseData, setYearWiseData] = useState([]);
  const [retirementData, setRetirementData] = useState([]);

  // Calculate Retirement Planning
  const calculateRetirement = useCallback(() => {
    const currentAgeNum = Number(currentAge) || 30;
    const retirementAgeNum = Number(retirementAge) || 60;
    const lifeExpectancyNum = Number(lifeExpectancy) || 85;
    const currentExpensesNum = Number(currentExpenses) || 50000;
    const inflationRateNum = Number(inflationRate) / 100 || 0.06;
    const preReturnNum = Number(preRetirementReturn) / 100 || 0.12;
    const postReturnNum = Number(postRetirementReturn) / 100 || 0.08;
    const currentSavingsNum = Number(currentSavings) || 0;
    const monthlySipNum = Number(monthlySip) || 10000;
    const expenseReductionNum = Number(expenseReductionPercent) / 100 || 0.2;

    if (currentAgeNum >= retirementAgeNum || retirementAgeNum >= lifeExpectancyNum) {
      setRequiredCorpus(0);
      setProjectedCorpus(0);
      setGap(0);
      setRequiredMonthlySip(0);
      setYearWiseData([]);
      setRetirementData([]);
      return;
    }

    const yearsToRetirement = retirementAgeNum - currentAgeNum;
    const retirementYears = lifeExpectancyNum - retirementAgeNum;

    // Calculate inflation-adjusted expenses at retirement
    const expensesAtRetirement = currentExpensesNum * Math.pow(1 + inflationRateNum, yearsToRetirement);
    const adjustedExpensesAtRetirement = expensesAtRetirement * (1 - expenseReductionNum);

    // Calculate required corpus using present value of annuity formula
    // Considering post-retirement returns and inflation
    const realPostReturnRate = (postReturnNum - inflationRateNum) / (1 + inflationRateNum);
    const requiredCorpusAmount = adjustedExpensesAtRetirement * 12 * 
      ((1 - Math.pow(1 + realPostReturnRate, -retirementYears)) / realPostReturnRate);

    // Calculate projected corpus from current savings and SIPs
    let projectedCorpusAmount = currentSavingsNum * Math.pow(1 + preReturnNum, yearsToRetirement);
    
    // Add SIP contribution using future value of annuity formula
    const monthlyReturnRate = preReturnNum / 12;
    const totalMonths = yearsToRetirement * 12;
    const sipContribution = monthlySipNum * 
      ((Math.pow(1 + monthlyReturnRate, totalMonths) - 1) / monthlyReturnRate);
    
    projectedCorpusAmount += sipContribution;

    // Calculate gap and required monthly SIP
    const corpusGap = Math.max(0, requiredCorpusAmount - projectedCorpusAmount);
    let requiredMonthlySipAmount = 0;
    
    if (corpusGap > 0) {
      requiredMonthlySipAmount = corpusGap / 
        ((Math.pow(1 + monthlyReturnRate, totalMonths) - 1) / monthlyReturnRate);
    }

    // Generate year-wise accumulation data
    const yearlyAccumulation = [];
    let currentCorpus = currentSavingsNum;
    
    for (let year = 1; year <= yearsToRetirement; year++) {
      const yearStartValue = currentCorpus;
      // Add annual returns on existing corpus
      currentCorpus = currentCorpus * (1 + preReturnNum);
      // Add annual SIP contribution
      const annualSip = monthlySipNum * 12;
      currentCorpus += annualSip * (1 + preReturnNum / 2); // Mid-year investment assumption
      
      yearlyAccumulation.push({
        year: currentAgeNum + year,
        startValue: yearStartValue,
        endValue: currentCorpus,
        annualSip: annualSip,
        returns: currentCorpus - yearStartValue - annualSip,
        cumulativeSip: annualSip * year,
        totalInvestment: currentSavingsNum + (annualSip * year)
      });
    }

    // Generate retirement years data
    const retirementYearsData = [];
    let retirementCorpus = projectedCorpusAmount;
    
    for (let year = 1; year <= retirementYears; year++) {
      const yearStartValue = retirementCorpus;
      const annualExpense = adjustedExpensesAtRetirement * 12 * Math.pow(1 + inflationRateNum, year - 1);
      
      // Apply post-retirement returns
      retirementCorpus = retirementCorpus * (1 + postReturnNum);
      // Deduct annual expenses
      retirementCorpus = Math.max(0, retirementCorpus - annualExpense);
      
      retirementYearsData.push({
        year: retirementAgeNum + year,
        startValue: yearStartValue,
        endValue: retirementCorpus,
        annualExpense: annualExpense,
        returns: yearStartValue * postReturnNum,
        inflationAdjustedExpense: currentExpensesNum * 12 * Math.pow(1 + inflationRateNum, yearsToRetirement + year - 1)
      });
    }

    setRequiredCorpus(requiredCorpusAmount);
    setProjectedCorpus(projectedCorpusAmount);
    setGap(corpusGap);
    setRequiredMonthlySip(requiredMonthlySipAmount);
    setYearWiseData(yearlyAccumulation);
    setRetirementData(retirementYearsData);
  }, [currentAge, retirementAge, lifeExpectancy, currentExpenses, inflationRate, 
      preRetirementReturn, postRetirementReturn, currentSavings, monthlySip, expenseReductionPercent]);

  useEffect(() => {
    calculateRetirement();
  }, [calculateRetirement]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatCurrencyShort = (amount) => {
    if (amount >= 10000000) return '₹' + (amount / 10000000).toFixed(1) + 'Cr';
    if (amount >= 100000) return '₹' + (amount / 100000).toFixed(1) + 'L';
    return formatCurrency(amount);
  };

  // Chart data preparation
  const getAccumulationChartData = () => {
    if (yearWiseData.length === 0) return null;

    const labels = yearWiseData.map(data => `Age ${data.year}`);
    
    return {
      labels,
      datasets: [
        {
          label: 'Portfolio Value',
          data: yearWiseData.map(data => data.endValue),
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          tension: 0.3,
        },
        {
          label: 'Total Investment',
          data: yearWiseData.map(data => data.totalInvestment),
          borderColor: 'rgb(34, 197, 94)',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          fill: false,
          tension: 0.3,
        },
        {
          label: 'Required Corpus',
          data: Array(yearWiseData.length).fill(requiredCorpus),
          borderColor: 'rgb(239, 68, 68)',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          fill: false,
          tension: 0,
          borderDash: [10, 5],
        }
      ]
    };
  };

  const getRetirementChartData = () => {
    if (retirementData.length === 0) return null;

    const labels = retirementData.map(data => `Age ${data.year}`);
    
    return {
      labels,
      datasets: [
        {
          label: 'Retirement Corpus',
          data: retirementData.map(data => data.endValue),
          borderColor: 'rgb(168, 85, 247)',
          backgroundColor: 'rgba(168, 85, 247, 0.1)',
          fill: true,
          tension: 0.3,
        },
        {
          label: 'Annual Expenses',
          data: retirementData.map(data => data.annualExpense),
          borderColor: 'rgb(245, 101, 101)',
          backgroundColor: 'rgba(245, 101, 101, 0.1)',
          fill: false,
          tension: 0.3,
        }
      ]
    };
  };

  const getCorpusBreakdownData = () => {
    const currentSavingsGrowth = Number(currentSavings) * Math.pow(1 + Number(preRetirementReturn) / 100, Number(retirementAge) - Number(currentAge));
    const sipContribution = projectedCorpus - currentSavingsGrowth;
    
    return {
      labels: ['Current Savings Growth', 'SIP Contributions', 'Corpus Gap'],
      datasets: [
        {
          data: [currentSavingsGrowth, sipContribution, Math.max(0, gap)],
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

  const getExpenseBreakdownData = () => {
    const currentExpensesValue = Number(currentExpenses) * 12;
    const inflationImpact = (Number(currentExpenses) * 12 * Math.pow(1 + Number(inflationRate) / 100, Number(retirementAge) - Number(currentAge))) - currentExpensesValue;
    const expenseReduction = inflationImpact * (Number(expenseReductionPercent) / 100);
    
    return {
      labels: ['Current Annual Expenses', 'Inflation Impact', 'Expense Reduction'],
      datasets: [
        {
          data: [currentExpensesValue, inflationImpact, -expenseReduction],
          backgroundColor: [
            'rgba(168, 85, 247, 0.8)',
            'rgba(245, 101, 101, 0.8)',
            'rgba(34, 197, 94, 0.8)',
          ],
          borderColor: [
            'rgb(168, 85, 247)',
            'rgb(245, 101, 101)',
            'rgb(34, 197, 94)',
          ],
          borderWidth: 2,
        },
      ],
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
            return context.dataset.label + ': ' + formatCurrencyShort(context.parsed.y);
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return formatCurrencyShort(value);
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
            const total = context.dataset.data.reduce((sum, value) => sum + Math.abs(value), 0);
            const percentage = ((Math.abs(context.parsed) / total) * 100).toFixed(1);
            return context.label + ': ' + formatCurrencyShort(Math.abs(context.parsed)) + ' (' + percentage + '%)';
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
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 mb-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Retirement Planning Calculator</h1>
            <p className="opacity-90">Plan your retirement with comprehensive analysis of your financial needs</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Personal & Financial Details</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Age
                    </label>
                    <input
                      type="number"
                      value={currentAge}
                      onChange={(e) => setCurrentAge(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      min="18"
                      max="80"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Retirement Age
                    </label>
                    <input
                      type="number"
                      value={retirementAge}
                      onChange={(e) => setRetirementAge(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      min="45"
                      max="85"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Life Expectancy
                  </label>
                  <input
                    type="number"
                    value={lifeExpectancy}
                    onChange={(e) => setLifeExpectancy(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    min="65"
                    max="100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Monthly Expenses (₹)
                  </label>
                  <input
                    type="number"
                    value={currentExpenses}
                    onChange={(e) => setCurrentExpenses(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expected Expense Reduction in Retirement (%)
                  </label>
                  <input
                    type="number"
                    value={expenseReductionPercent}
                    onChange={(e) => setExpenseReductionPercent(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    step="5"
                    min="0"
                    max="50"
                  />
                  <p className="text-xs text-gray-500 mt-1">Typical reduction: 20-30%</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Inflation Rate (%)
                    </label>
                    <input
                      type="number"
                      value={inflationRate}
                      onChange={(e) => setInflationRate(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      step="0.1"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Pre-retirement Return (%)
                    </label>
                    <input
                      type="number"
                      value={preRetirementReturn}
                      onChange={(e) => setPreRetirementReturn(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      step="0.1"
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Post-retirement Return (%)
                  </label>
                  <input
                    type="number"
                    value={postRetirementReturn}
                    onChange={(e) => setPostRetirementReturn(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    step="0.1"
                    min="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">Conservative returns after retirement</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Current Savings (₹)
                    </label>
                    <input
                      type="number"
                      value={currentSavings}
                      onChange={(e) => setCurrentSavings(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Monthly SIP (₹)
                    </label>
                    <input
                      type="number"
                      value={monthlySip}
                      onChange={(e) => setMonthlySip(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
                  <h3 className="text-sm font-medium opacity-90">Required Corpus</h3>
                  <p className="text-2xl font-bold">{formatCurrencyShort(requiredCorpus)}</p>
                  <p className="text-sm opacity-75">for retirement</p>
                </div>

                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
                  <h3 className="text-sm font-medium opacity-90">Projected Corpus</h3>
                  <p className="text-2xl font-bold">{formatCurrencyShort(projectedCorpus)}</p>
                  <p className="text-sm opacity-75">with current plan</p>
                </div>

                <div className={`bg-gradient-to-r ${gap > 0 ? 'from-red-500 to-red-600' : 'from-green-500 to-green-600'} rounded-lg p-4 text-white`}>
                  <h3 className="text-sm font-medium opacity-90">{gap > 0 ? 'Corpus Gap' : 'Surplus'}</h3>
                  <p className="text-2xl font-bold">{formatCurrencyShort(Math.abs(gap))}</p>
                  <p className="text-sm opacity-75">{gap > 0 ? 'additional needed' : 'extra corpus'}</p>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
                  <h3 className="text-sm font-medium opacity-90">Required Monthly SIP</h3>
                  <p className="text-2xl font-bold">{formatCurrencyShort(requiredMonthlySip)}</p>
                  <p className="text-sm opacity-75">to bridge gap</p>
                </div>
              </div>

              {/* Charts Section */}
              {yearWiseData.length > 0 && (
                <div className="space-y-6">
                  {/* Corpus Breakdown */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Retirement Corpus Breakdown</h3>
                    <div className="h-64">
                      <Doughnut data={getCorpusBreakdownData()} options={doughnutOptions} />
                    </div>
                  </div>

                  {/* Expense Analysis */}
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Expense Analysis</h3>
                    <div className="h-64">
                      <Doughnut data={getExpenseBreakdownData()} options={doughnutOptions} />
                    </div>
                  </div>
                </div>
              )}

              {/* Retirement Readiness */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-100">
                <h3 className="text-lg font-semibold mb-3 text-indigo-900">Retirement Readiness</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                    <div>
                      <p className="text-sm font-medium text-indigo-800">Years to Retirement</p>
                      <p className="text-lg font-bold text-indigo-900">
                        {Number(retirementAge) - Number(currentAge)} years
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                    <div>
                      <p className="text-sm font-medium text-indigo-800">Retirement Duration</p>
                      <p className="text-lg font-bold text-indigo-900">
                        {Number(lifeExpectancy) - Number(retirementAge)} years
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Accumulation Phase Chart */}
          {yearWiseData.length > 0 && getAccumulationChartData() && (
            <div className="mt-8">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Wealth Accumulation Phase</h3>
                <div className="h-64">
                  <Line data={getAccumulationChartData()} options={chartOptions} />
                </div>
              </div>
            </div>
          )}

          {/* Retirement Phase Chart */}
          {retirementData.length > 0 && getRetirementChartData() && (
            <div className="mt-8">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Retirement Phase Analysis</h3>
                <div className="h-64">
                  <Line data={getRetirementChartData()} options={chartOptions} />
                </div>
              </div>
            </div>
          )}

          {/* Year-wise Breakdown Table */}
          {yearWiseData.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Accumulation Phase Details</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Age
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Portfolio Start
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Annual SIP
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Annual Returns
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Portfolio End
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Investment
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {yearWiseData.slice(0, 10).map((data, index) => (
                      <tr key={data.year} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {data.year}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrencyShort(data.startValue)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                          {formatCurrencyShort(data.annualSip)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                          {formatCurrencyShort(data.returns)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-purple-600 font-medium">
                          {formatCurrencyShort(data.endValue)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatCurrencyShort(data.totalInvestment)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {yearWiseData.length > 10 && (
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Showing first 10 years. Full projection continues until retirement.
                </p>
              )}
            </div>
          )}

          {/* Key Features */}
          <div className="mt-8 bg-indigo-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-indigo-900">Retirement Planning Essentials</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-indigo-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-indigo-900">Start Early</h4>
                  <p className="text-sm text-indigo-700">Power of compounding works best with time</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-indigo-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-indigo-900">Inflation Protection</h4>
                  <p className="text-sm text-indigo-700">Plan for rising costs over decades</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-indigo-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-indigo-900">Asset Allocation</h4>
                  <p className="text-sm text-indigo-700">Balanced portfolio for sustainable returns</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-indigo-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-indigo-900">Regular Review</h4>
                  <p className="text-sm text-indigo-700">Adjust plan based on life changes</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Share Buttons */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mt-8">
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => {
                  const text = `🏦 Retirement Planning Results!\n\n👤 Current Age: ${currentAge}\n🎯 Retirement Age: ${retirementAge}\n💰 Required Corpus: ₹${(requiredCorpus/10000000).toFixed(2)} Crores\n📊 Monthly SIP: ₹${monthlySip.toLocaleString('en-IN')}\n📈 Projected Corpus: ₹${(projectedCorpus/10000000).toFixed(2)} Crores\n\nPlan yours: https://www.worksocial.in/calculators/retirement`;
                  const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
                  window.open(url, '_blank');
                }}
                className="flex items-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors shadow-lg"
              >
                Share on WhatsApp
              </button>
              <button 
                onClick={async () => {
                  if (navigator.share) {
                    try {
                      await navigator.share({
                        title: 'Retirement Calculator Results',
                        text: `My retirement planning: Need ₹${(requiredCorpus/10000000).toFixed(2)} Crores by age ${retirementAge}!`,
                        url: window.location.href,
                      });
                    } catch {
                      console.log('Share cancelled');
                    }
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }
                }}
                className="flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors shadow-lg"
              >
                Share
              </button>
              <button 
                onClick={() => {
                  window.print();
                }}
                className="flex items-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors shadow-lg"
              >
                Download as PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetirementCalculator;
