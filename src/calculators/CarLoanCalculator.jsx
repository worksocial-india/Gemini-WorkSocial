
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { Calculator, Share2, Download, FileText, Table, ArrowLeft, PieChart, Car, Calendar, BadgeDollarSign, Percent, Landmark, MessageCircle } from 'lucide-react';

// Custom styles
const styles = {
  gradientBg: "bg-gradient-to-r from-blue-600 to-purple-600",
  cardShadow: "shadow-lg hover:shadow-xl transition-shadow duration-300",
  inputStyle: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none",
  buttonPrimary: "w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition duration-300",
  buttonSecondary: "px-3 py-2 bg-gray-100 text-gray-800 border border-gray-200 rounded-lg hover:bg-gray-200 transition duration-300 flex items-center gap-2",
};

function CarLoanCalculator() {
  // State variables
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(9.5);
  const [tenureValue, setTenureValue] = useState(5);
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
  
  // Chart reference
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Calculate EMI on component mount and when inputs change
  useEffect(() => {
    calculateEMI();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loanAmount, interestRate, tenureValue, startDate]);

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

    const tenureMonths = tenureValue * 12;
    const monthlyRate = interestRate / (12 * 100);
    
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

  // Update chart with loan data
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

  // Download report as PDF
  const createPDF = () => {
    if (amortizationData.length === 0) {
      alert('Please calculate EMI first');
      return;
    }
    
    try {
      const pdf = new jsPDF();
      
      // Header
      pdf.setFontSize(18);
      pdf.text('Car Loan Schedule', 105, 15, { align: 'center' });

      pdf.setFontSize(12);
      pdf.text(`Loan Amount: ${formatCurrency(loanAmount)}`, 10, 30);
      pdf.text(`Interest Rate: ${interestRate}%`, 10, 40);
      pdf.text(`Term: ${tenureValue} years`, 10, 50);
      pdf.text(`Monthly EMI: ${formatCurrency(results.monthlyEMI)}`, 10, 60);

      const tableColumn = ["Month", "Principal", "Interest", "Outstanding"];
      const tableRows = [];

      amortizationData.forEach(item => {
          const row = [
              item.month,
              formatCurrency(item.principal),
              formatCurrency(item.interest),
              formatCurrency(item.balance)
          ];
          tableRows.push(row);
      });

      pdf.autoTable(tableColumn, tableRows, { startY: 70 });
      
      // Footer
      pdf.setFontSize(10);
      pdf.text('Backed By WorkSocial.in', 10, 284);
      pdf.textWithLink('www.worksocial.in/calculators', 150, 284, { url: 'http://www.worksocial.in/calculators' });

      pdf.save('Car_Loan_Schedule.pdf');
    } catch (error) {
      console.error('PDF Generation Error:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  // Download amortization schedule as Excel
  const downloadExcel = () => {
    if (amortizationData.length === 0) {
      alert('Please calculate EMI first');
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(amortizationData.map(item => ({
        Month: item.month,
        Principal: item.principal,
        Interest: item.interest,
        'Outstanding Amount': item.balance
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Amortization");
    XLSX.writeFile(workbook, "Car_Loan_Amortization.xlsx");
  };

  const shareOn = (platform) => {
    const url = window.location.href;
    const text = `Check out this Car Loan Calculator from WorkSocial!`;
    let shareUrl = '';

    switch (platform) {
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
            break;
        case 'telegram':
            shareUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
            break;
        case 'mail':
            shareUrl = `mailto:?subject=${encodeURIComponent('Car Loan Calculator')}&body=${encodeURIComponent(text + ' ' + url)}`;
            break;
        default:
            break;
    }

    if (shareUrl) {
        window.open(shareUrl, '_blank');
    }
  };


  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className={`${styles.gradientBg} text-white py-6`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/calculators" className="flex items-center text-white hover:text-blue-100 transition">
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span>Back to Calculators</span>
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-center mt-4"><Car className="inline-block mr-2" /> Car Loan Calculator</h1>
          <p className="text-center mt-2 text-blue-100">Plan Your Car Purchase</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col xl:flex-row gap-4 md:gap-6">
          
          {/* Loan Details Section */}
          <div className="xl:w-1/4 flex flex-col order-1">
            <div className={`bg-white rounded-xl ${styles.cardShadow} p-4 md:p-6 flex-grow`}>
              <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Calculator className="mr-2 h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                Loan Details
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Loan Amount (₹)</label>
                  <input 
                    type="number" 
                    value={loanAmount} 
                    max="20000000"
                    onChange={(e) => setLoanAmount(Math.min(parseFloat(e.target.value), 20000000) || 0)}
                    className={`${styles.inputStyle} text-sm md:text-base h-12 md:h-auto touch-manipulation`} 
                    placeholder="5,00,000" 
                    inputMode="numeric"
                  />
                  <input 
                    type="range"
                    min="0"
                    max="20000000"
                    step="10000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Annual Interest Rate (%)</label>
                  <input 
                    type="number" 
                    value={interestRate} 
                    max="15"
                    onChange={(e) => setInterestRate(Math.min(parseFloat(e.target.value), 15) || 0)}
                    className={`${styles.inputStyle} text-sm md:text-base h-12 md:h-auto touch-manipulation`} 
                    placeholder="9.5" 
                    step="0.1"
                    inputMode="decimal"
                  />
                  <input 
                    type="range"
                    min="0"
                    max="15"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Tenure (Years)</label>
                  <input 
                      type="number" 
                      value={tenureValue} 
                      max="10"
                      onChange={(e) => setTenureValue(Math.min(parseFloat(e.target.value), 10) || 0)}
                      class="flex-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-gray-900 text-sm md:text-base h-12 md:h-auto touch-manipulation" 
                      placeholder="5" 
                      inputMode="numeric"
                    />
                  <input 
                    type="range"
                    min="0"
                    max="10"
                    step="1"
                    value={tenureValue}
                    onChange={(e) => setTenureValue(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
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
          </div>

          {/* Results Section */}
          <div className="xl:w-[30%] flex flex-col order-2">
            <div className={`bg-white rounded-xl ${styles.cardShadow} p-4 md:p-6 flex-grow`}>
              <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center">
                <PieChart className="mr-2 h-4 w-4 md:h-5 md:w-5 text-purple-600" />
                Loan Breakdown
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-3 md:gap-4 mb-4">
                <div className="text-center p-3 md:p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                  <div className="text-lg md:text-xl font-bold text-green-600">
                    {formatCurrency(results.monthlyEMI)}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 font-medium">Monthly EMI</div>
                </div>
                <div className="text-center p-3 md:p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                  <div className="text-lg md:text-xl font-bold text-blue-600">
                    {formatCurrency(results.totalInterest)}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 font-medium">Total Interest</div>
                </div>
                <div className="text-center p-3 md:p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                  <div className="text-lg md:text-xl font-bold text-purple-600">
                    {formatCurrency(results.totalAmount)}
                  </div>
                  <div className="text-xs md:text-sm text-gray-600 font-medium">Total Amount</div>
                </div>
              </div>

              <div className="relative h-48 md:h-60 mb-4">
                <canvas ref={chartRef}></canvas>
              </div>
            </div>
          </div>

          {/* Amortization Schedule */}
          <div className="xl:w-[45%] flex flex-col order-3">
            <div className={`bg-white rounded-xl ${styles.cardShadow} p-4 md:p-6 flex-grow`}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-0 flex items-center">
                  <Table className="mr-2 h-4 w-4 md:h-5 md:w-5 text-orange-600" />
                  Amortization Schedule
                </h2>
              </div>
              
              <div className="overflow-x-auto -mx-4 md:mx-0">
                <div className="max-h-[400px] md:max-h-[500px] overflow-y-auto">
                  <table className="w-full text-sm min-w-[500px]">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                      <tr>
                        <th className="sticky left-0 bg-gray-50 px-2 md:px-3 py-2 text-left font-medium text-gray-700 text-xs whitespace-nowrap border-r border-gray-200">Month</th>
                        <th className="px-2 md:px-3 py-2 text-left font-medium text-gray-700 text-xs whitespace-nowrap">Principal</th>
                        <th className="px-2 md:px-3 py-2 text-left font-medium text-gray-700 text-xs whitespace-nowrap">Interest</th>
                        <th className="px-2 md:px-3 py-2 text-left font-medium text-gray-700 text-xs whitespace-nowrap">Outstanding</th>
                      </tr>
                    </thead>
                  <tbody>
                    {amortizationData.length > 0 ? (
                      amortizationData.map((data, index) => (
                            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="sticky left-0 bg-white hover:bg-gray-50 px-2 md:px-3 py-3 md:py-2 text-xs border-r border-gray-200">
                                <div className="flex flex-col sm:flex-row sm:justify-between">
                                  <span className="font-medium">{data.date.toLocaleDateString('en-IN', {month: 'short', year: 'numeric'})}</span>
                                  <span className="text-gray-500">#{data.month}</span>
                                </div>
                              </td>
                              <td className="px-2 md:px-3 py-3 md:py-2 text-xs text-green-600 font-medium">{formatCurrency(data.principal)}</td>
                              <td className="px-2 md:px-3 py-3 md:py-2 text-xs text-red-600 font-medium">{formatCurrency(data.interest)}</td>
                              <td className="px-2 md:px-3 py-3 md:py-2 text-xs text-blue-600 font-medium">{formatCurrency(data.balance)}</td>
                            </tr>
                        )
                      )
                    ) : (
                      <tr>
                        <td colSpan="4" className="px-3 py-6 text-center text-gray-500 text-xs">
                          Your amortization schedule will appear here.
                        </td>
                      </tr>
                    )}
                  </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="mt-6 mb-4 order-4">
          <div className={`bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl ${styles.cardShadow} p-4 md:p-6 border border-blue-100`}>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <h2 className="text-lg md:text-xl font-bold text-gray-800 flex items-center">
                <Share2 className="mr-2 h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Save & Share Your Results</span>
              </h2>
              
              <div className="grid grid-cols-2 md:flex md:flex-row gap-3 md:gap-4">
                <button 
                  onClick={createPDF}
                  className="flex-1 md:flex-none md:w-20 px-3 py-3 bg-white border-2 border-red-400 shadow-md text-red-600 hover:bg-red-50 rounded-lg transition duration-300 flex flex-col items-center justify-center gap-1 touch-manipulation"
                >
                  <FileText className="h-6 w-6 md:h-7 md:w-9" />
                  <span className="text-xs font-medium">PDF Report</span>
                </button>
                
                <button 
                  onClick={downloadExcel} 
                  className="flex-1 md:flex-none md:w-20 px-3 py-3 bg-white border-2 border-green-400 shadow-md text-green-600 hover:bg-green-50 rounded-lg transition duration-300 flex flex-col items-center justify-center gap-1 touch-manipulation"
                >
                  <Table className="h-6 w-6 md:h-7 md:w-9" />
                  <span className="text-xs font-medium">Excel Sheet</span>
                </button>
                
                <button 
                  onClick={() => shareOn('whatsapp')} 
                  className="flex-1 md:flex-none md:w-20 px-3 py-3 bg-white border-2 border-green-400 shadow-md text-green-500 hover:bg-green-50 rounded-lg transition duration-300 flex flex-col items-center justify-center gap-1 touch-manipulation"
                >
                  <MessageCircle className="h-6 w-6 md:h-7 md:w-9" />
                  <span className="text-xs font-medium">WhatsApp</span>
                </button>
                
                <button 
                  onClick={() => shareOn('telegram')} 
                  className="flex-1 md:flex-none md:w-20 px-3 py-3 bg-white border-2 border-blue-400 shadow-md text-blue-600 hover:bg-blue-50 rounded-lg transition duration-300 flex flex-col items-center justify-center gap-1 touch-manipulation"
                >
                  <Share2 className="h-6 w-6 md:h-7 md:w-9" />
                  <span className="text-xs font-medium">Telegram</span>
                </button>

                 <button 
                  onClick={() => shareOn('mail')} 
                  className="flex-1 md:flex-none md:w-20 px-3 py-3 bg-white border-2 border-gray-400 shadow-md text-gray-600 hover:bg-gray-50 rounded-lg transition duration-300 flex flex-col items-center justify-center gap-1 touch-manipulation"
                >
                  <FileText className="h-6 w-6 md:h-7 md:w-9" />
                  <span className="text-xs font-medium">Mail</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarLoanCalculator;
