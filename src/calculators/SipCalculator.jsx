import React, { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import CalculatorSidebar from './CalculatorSidebar';

Chart.register(...registerables);

const SipCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [annualRate, setAnnualRate] = useState(12);
  const [years, setYears] = useState(10);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [estimatedReturns, setEstimatedReturns] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [chartData, setChartData] = useState(null);

  const chartRef = useRef(null);

  const calculateSip = () => {
    const monthlyRate = annualRate / 12 / 100;
    const months = years * 12;
    const invested = monthlyInvestment * months;
    const futureValue = monthlyInvestment * ((((1 + monthlyRate) ** months) - 1) / monthlyRate) * (1 + monthlyRate);
    
    if (isFinite(futureValue)) {
      const returns = futureValue - invested;
      setTotalInvestment(invested);
      setEstimatedReturns(returns);
      setTotalValue(futureValue);

      setChartData({
        labels: ['Total Investment', 'Estimated Returns'],
        datasets: [
          {
            data: [invested, returns],
            backgroundColor: ['#4a90e2', '#50e3c2'],
            hoverBackgroundColor: ['#357abd', '#45b8a2'],
          },
        ],
      });
    } else {
        // Handle case where calculation is not finite
        setTotalInvestment(invested);
        setEstimatedReturns(0);
        setTotalValue(invested);
        setChartData({
            labels: ['Total Investment', 'Estimated Returns'],
            datasets: [
              {
                data: [invested, 0],
                backgroundColor: ['#4a90e2', '#50e3c2'],
                hoverBackgroundColor: ['#357abd', '#45b8a2'],
              },
            ],
          });
    }
  };

  useEffect(() => {
    calculateSip();
  }, [monthlyInvestment, annualRate, years, calculateSip]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="flex">
      <CalculatorSidebar />
      <div className="flex-grow max-w-4xl mx-auto p-4 md:p-8 bg-white shadow-lg rounded-lg mt-10">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">SIP Calculator</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700">Monthly Investment</label>
              <input
                type="number"
                value={monthlyInvestment}
                onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">Expected Return Rate (% p.a.)</label>
              <input
                type="number"
                value={annualRate}
                onChange={(e) => setAnnualRate(Number(e.target.value))}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">Investment Duration (Years)</label>
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            {chartData && (
              <div style={{ width: '100%', maxWidth: '300px' }}>
                <Pie
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                    },
                  }}
                  ref={chartRef}
                />
              </div>
            )}
            <div className="text-center mt-4 w-full">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-lg text-gray-600">Total Investment: <span className="font-bold text-blue-800">{formatCurrency(totalInvestment)}</span></p>
                <p className="text-lg text-gray-600">Estimated Returns: <span className="font-bold text-green-800">{formatCurrency(estimatedReturns)}</span></p>
                <p className="text-2xl font-bold text-gray-800 mt-2">Total Value: <span className="text-green-600">{formatCurrency(totalValue)}</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SipCalculator;
