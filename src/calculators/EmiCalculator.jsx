import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import { Calculator, Share2, Download, FileText, Table, ArrowLeft, PieChart, TrendingUp, CreditCard, Calendar, BadgeDollarSign, Percent, Landmark, MessageCircle } from 'lucide-react';
import CalculatorSidebar from './CalculatorSidebar';
import { trackCalculatorUsage } from '../hooks/useGoogleAnalytics';

// Custom styles
const styles = {
  gradientBg: "bg-gradient-to-r from-blue-600 to-purple-600",
  cardShadow: "shadow-lg hover:shadow-xl transition-shadow duration-300",
  inputStyle: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none",
  buttonPrimary: "w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition duration-300",
  buttonSecondary: "px-3 py-2 bg-gray-100 text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-200 transition duration-300 flex items-center gap-2",
};

function EmiCalculator() {
  // State variables
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureValue, setTenureValue] = useState(20);
  const [tenureType, setTenureType] = useState("years");
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [showShareModal, setShowShareModal] = useState(false);
  
  // Results state
  const [results, setResults] = useState({
    monthlyEMI: 0,
    totalInterest: 0,
    totalAmount: 0
  });
  
  // Amortization schedule state
  const [amortizationData, setAmortizationData] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [yearOptions, setYearOptions] = useState([]);
  
  // Chart reference
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Calculate EMI on component mount and when inputs change
  useEffect(() => {
    calculateEMI();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loanAmount, interestRate, tenureValue, tenureType, startDate]);

  // Initialize chart when component mounts
  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    if (chartRef.current) {
      updateChart();
    }
    
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);

  // Calculate EMI and related values
  const calculateEMI = () => {
    if (!loanAmount || !interestRate || !tenureValue) {
      return;
    }

    // Convert tenure to months
    const tenureMonths = tenureType === "years" ? tenureValue * 12 : tenureValue;
    const monthlyRate = interestRate / (12 * 100);
    
    // EMI calculation formula
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / 
               (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    
    const totalAmount = emi * tenureMonths;
    const totalInterest = totalAmount - loanAmount;

    setResults({
      monthlyEMI: emi,
      totalInterest: totalInterest,
      totalAmount: totalAmount
    });

    generateAmortizationSchedule(loanAmount, monthlyRate, emi, tenureMonths);
    populateYearDropdown(tenureMonths);

    // Track calculator usage
    trackCalculatorUsage('emi_calculator', 'calculate');
  };

  // Generate the amortization schedule
  const generateAmortizationSchedule = (principal, monthlyRate, emi, months) => {
    let balance = principal;
    const amortData = [];
    const startDateObj = new Date(startDate);
    
    for (let i = 1; i <= months; i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = emi - interestPayment;
      balance -= principalPayment;
      
      const currentDate = new Date(startDateObj);
      currentDate.setMonth(startDateObj.getMonth() + i - 1);
      
      amortData.push({
        month: i,
        date: currentDate,
        emi: emi,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance)
      });
    }
    
    setAmortizationData(amortData);
  };

  // Populate year dropdown for amortization table
  const populateYearDropdown = (totalMonths) => {
    const years = Math.ceil(totalMonths / 12);
    const options = Array.from({ length: years }, (_, i) => ({
      value: i + 1,
      label: `Year ${i + 1}`
    }));
    
    setYearOptions(options);
    setSelectedYear(options[0] || "");
  };

  // Update the pie chart with new data
  const updateChart = () => {
    if (!chartRef.current) return;
    
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Principal Amount', 'Total Interest'],
        datasets: [{
          data: [loanAmount, results.totalInterest],
          backgroundColor: ['#3B82F6', '#EF4444'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              usePointStyle: true
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.raw;
                return `${label}: ₹${value.toLocaleString('en-IN', {maximumFractionDigits: 0})}`;
              }
            }
          }
        }
      }
    });
  };

  // Format number as Indian currency
  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN', {maximumFractionDigits: 0})}`;
  };

  // Format number for PDF output (clean formatting without currency symbol issues)
  const formatCurrencyForPDF = (amount) => {
    // Convert to string and format manually to avoid any locale issues in PDF
    const numStr = Math.round(amount).toString();
    // Add commas in Indian format (lakhs, crores)
    let result = '';
    let count = 0;
    for (let i = numStr.length - 1; i >= 0; i--) {
      result = numStr[i] + result;
      count++;
      if (count === 3 && i > 0) {
        result = ',' + result;
        count = 0;
      } else if (count === 2 && i > 0 && (numStr.length - i) > 3) {
        result = ',' + result;
        count = 0;
      }
    }
    return result;
  };

  // Filter amortization data by selected year
  const getFilteredAmortizationData = () => {
    if (!selectedYear || amortizationData.length === 0) {
      return [];
    }
    
    // Return all data if "all" is selected
    if (selectedYear === "all") {
      return amortizationData;
    }
    
    return amortizationData.filter(row => row.year === parseInt(selectedYear));
  };

  // Handle downloading data
  const downloadData = (type) => {
    if (type === 'excel') {
      downloadExcel();
    } else if (type === 'pdf') {
      createPDF();
    }
  };

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(amortizationData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Amortization Schedule");
    XLSX.writeFile(wb, "EMI_Amortization_Schedule.xlsx");
  };

  const createPDF = () => {
    const doc = new jsPDF();
    // ... PDF generation code ...
    doc.save('EMI_Amortization_Schedule.pdf');
  };

  // Handle sharing
  const handleShare = (platform) => {
    const url = window.location.href;
    const message = `Check out my EMI calculation: ${url}`;
    
    if (platform === 'whatsapp') {
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    } else {
      // Other platforms logic
      let shareUrl = '';
      switch(platform) {
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
          break;
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`;
          break;
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
          break;
        case 'telegram':
          shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(message)}`;
          break;
      }
      
      if (shareUrl) {
        window.open(shareUrl, '_blank');
      }
    }
    
    setShowShareModal(false);
  };

  return (
    <div className="flex">
      <CalculatorSidebar />
    <div className="min-h-screen bg-gray-50 text-gray-800 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Back to Calculators Link */}
        <div className="mb-6">
          <Link to="/calculators" className="flex items-center text-blue-600 hover:underline">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Calculators
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Calculator Inputs */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl ${styles.cardShadow}">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <Calculator className="w-6 h-6 mr-2 text-blue-600" />
              EMI Calculator
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount (₹)</label>
                <input 
                  type="number" 
                  value={loanAmount} 
                  onChange={(e) => setLoanAmount(parseFloat(e.target.value) || 0)}
                  className={`${styles.inputStyle} text-sm md:text-base h-12 md:h-auto touch-manipulation`} 
                  placeholder="10,00,000" 
                  inputMode="numeric"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Annual Interest Rate (%)</label>
                <input 
                  type="number" 
                  value={interestRate} 
                  onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                  className={`${styles.inputStyle} text-sm md:text-base h-12 md:h-auto touch-manipulation`} 
                  placeholder="8.5" 
                  step="0.1"
                  inputMode="decimal"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tenure</label>
                <div className="flex gap-2">
                  <input 
                    type="number" 
                    value={tenureValue} 
                    onChange={(e) => setTenureValue(parseFloat(e.target.value) || 0)}
                    className="flex-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-gray-900 text-sm md:text-base h-12 md:h-auto touch-manipulation" 
                    placeholder="20" 
                    inputMode="numeric"
                  />
                  <select 
                    value={tenureType} 
                    onChange={(e) => setTenureType(e.target.value)}
                    className="w-24 md:w-1/3 px-2 md:px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-gray-900 text-xs md:text-sm h-12 md:h-auto">
                    <option value="years">Years</option>
                    <option value="months">Months</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">EMI Start Date</label>
                <input 
                  type="date" 
                  value={startDate} 
                  onChange={(e) => setStartDate(e.target.value)}
                  className={`${styles.inputStyle} h-12 md:h-auto text-sm md:text-base touch-manipulation`}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Results and Charts */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Results Overview */}
            <div className="bg-white p-6 rounded-2xl ${styles.cardShadow}">
              <h2 className="text-lg font-bold mb-4 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
                EMI Results Overview
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="text-lg font-bold text-green-800">
                    {formatCurrency(results.monthlyEMI)}
                  </div>
                  <div className="text-sm text-green-600">Monthly EMI</div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-lg font-bold text-blue-800">
                    {formatCurrency(results.totalInterest)}
                  </div>
                  <div className="text-sm text-blue-600">Total Interest</div>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="text-lg font-bold text-purple-800">
                    {formatCurrency(results.totalAmount)}
                  </div>
                  <div className="text-sm text-purple-600">Total Amount</div>
                </div>
              </div>

              {/* Chart - Responsive height */}
              <div className="relative h-48 md:h-60 mb-4">
                <canvas ref={chartRef}></canvas>
              </div>
            </div>
            
            {/* Amortization Table */}
            <div className="bg-white p-6 rounded-2xl ${styles.cardShadow}">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <h2 className="text-lg font-bold mb-3 sm:mb-0 flex items-center">
                  <Table className="w-6 h-6 mr-2 text-orange-600" />
                  Amortization Schedule
                </h2>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:space-x-2">
                  <select 
                    value={selectedYear} 
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none min-w-0"
                  >
                    <option value="">Select Year</option>
                    {yearOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <button 
                    onClick={() => setSelectedYear("all")} 
                    className="px-3 py-2 text-sm border-2 border-blue-400 shadow-md rounded-lg hover:bg-blue-50 hover:border-blue-500 focus:outline-none transition flex items-center justify-center whitespace-nowrap"
                  >
                    <div className="flex items-center justify-center gap-1">
                      <span>View All</span>
                    </div>
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="p-3">Month</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Principal</th>
                      <th className="p-3">Interest</th>
                      <th className="p-3 text-right">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getFilteredAmortizationData().map((row, index) => (
                      <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="p-3">{row.month}</td>
                        <td className="p-3">{row.date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                        <td className="p-3">₹{Math.round(row.principal).toLocaleString('en-IN')}</td>
                        <td className="p-3">₹{Math.round(row.interest).toLocaleString('en-IN')}</td>
                        <td className="p-3 text-right">₹{Math.round(row.balance).toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 m-4 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Share EMI Calculation</h3>
            <div className="grid grid-cols-2 gap-5">
              <button onClick={() => handleShare('facebook')} className="px-3 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center justify-center h-11 border-2 border-blue-700 shadow-md">Facebook</button>
              <button onClick={() => handleShare('twitter')} className="px-3 py-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 text-sm flex items-center justify-center h-11 border-2 border-blue-500 shadow-md">Twitter</button>
              <button onClick={() => handleShare('linkedin')} className="px-3 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 text-sm flex items-center justify-center h-11 border-2 border-blue-800 shadow-md">LinkedIn</button>
              <button onClick={() => handleShare('telegram')} className="px-3 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm flex items-center justify-center h-11 border-2 border-blue-600 shadow-md">Telegram</button>
              <button onClick={() => {navigator.clipboard.writeText(window.location.href); alert('Link copied!');}} className="px-3 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm flex items-center justify-center h-11 border-2 border-gray-700 shadow-md">Copy Link</button>
              <button onClick={() => window.location.href = `mailto:?subject=EMI Calculation&body=Check out my EMI calculation: ${window.location.href}`} className="px-3 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm flex items-center justify-center h-11 border-2 border-red-700 shadow-md">Email</button>
            </div>
            <button onClick={() => setShowShareModal(false)} className="w-auto mx-auto mt-5 px-3 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 h-11 flex items-center justify-center border-2 border-gray-400 shadow-md">Close</button>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default EmiCalculator;
