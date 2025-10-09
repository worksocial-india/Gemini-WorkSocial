import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Calculator, Share2, Download, FileText, Table, ArrowLeft, PieChart, Car, Calendar, BadgeDollarSign, Percent, Landmark, MessageCircle } from 'lucide-react';
import CalculatorSidebar from './CalculatorSidebar';

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

  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN', {maximumFractionDigits: 0})}`;
  };

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

  // Function to format currency for PDF (avoid Unicode symbols)
  const formatCurrencyForPDF = (amount) => {
    if (amount === undefined || amount === null || isNaN(amount)) {
      return 'Rs. 0';
    }
    
    const num = parseFloat(amount);
    if (num >= 10000000) { // 1 crore
      return `Rs. ${(num / 10000000).toFixed(2)} Cr`;
    } else if (num >= 100000) { // 1 lakh
      return `Rs. ${(num / 100000).toFixed(2)} L`;
    } else {
      return `Rs. ${num.toLocaleString('en-IN', { 
        minimumFractionDigits: 0,
        maximumFractionDigits: 0 
      })}`;
    }
  };

  const createPDF = async () => {
    if (amortizationData.length === 0) {
      alert('Please calculate EMI first');
      return;
    }
    
    try {
      // Create new PDF document with improved settings
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        putOnlyUsedFonts: true,
        floatPrecision: 16
      });
      
      // Set default font encoding
      doc.setFont('helvetica');
      doc.setTextColor(0, 0, 0);
      
      // Add title
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(18);
      doc.setTextColor(0, 51, 153); // Dark blue color
      doc.text('Car Loan Amortization Schedule', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });
      
      // Add summary section
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0); // Black color
      doc.setDrawColor(220, 220, 220); // Light grey for borders
      doc.roundedRect(14, 25, 182, 40, 3, 3, 'S'); // Draw border around summary
      
      // Loan summary details with improved formatting
      doc.setFontSize(11);
      doc.text(`Loan Amount: ${formatCurrencyForPDF(loanAmount)}`, 20, 35);
      doc.text(`Interest Rate: ${interestRate}%`, 20, 45);
      doc.text(`Term: ${tenureValue} years`, 20, 55);
      
      doc.text(`Monthly EMI: ${formatCurrencyForPDF(results.monthlyEMI)}`, 120, 35);
      doc.text(`Total Interest: ${formatCurrencyForPDF(results.totalInterest)}`, 120, 45);
      doc.text(`Total Amount: ${formatCurrencyForPDF(results.totalAmount)}`, 120, 55);
      
      // Add table with improved headers
      const tableColumn = ["Month", "Date", "Principal (Rs.)", "Interest (Rs.)", "Balance (Rs.)"];
      const tableRows = [];

      // Only include the first 12 months and last month for readability
      let displayData = [];
      if (amortizationData.length <= 24) {
        // Show all for smaller schedules
        displayData = amortizationData;
      } else {
        // Show first 12 and last 12 months for longer schedules
        displayData = [
          ...amortizationData.slice(0, 12),
          {month: '...', date: new Date(), emi: 0, principal: 0, interest: 0, balance: 0},
          ...amortizationData.slice(-12)
        ];
      }
      
      displayData.forEach(item => {
        // Handle the separator row
        if (item.month === '...') {
          const row = [
            '...',
            '...',
            '...',
            '...',
            '...'
          ];
          tableRows.push(row);
        } else {
          // Format date to MMM YYYY (e.g., Jan 2023)
          const dateStr = item.date instanceof Date 
            ? item.date.toLocaleDateString('en-IN', {month: 'short', year: 'numeric'})
            : '';
            
          const row = [
            item.month,
            dateStr,
            formatCurrencyForPDF(item.principal),
            formatCurrencyForPDF(item.interest),
            formatCurrencyForPDF(item.balance)
          ];
          tableRows.push(row);
        }
      });

      // Configure the table with improved styling
      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 75,
        margin: { top: 20 },
        styles: { 
          fontSize: 9,
          font: 'helvetica',
          cellPadding: 3,
          textColor: [0, 0, 0],
          lineColor: [200, 200, 200],
          lineWidth: 0.1,
          halign: 'center',
          valign: 'middle'
        },
        headStyles: { 
          fillColor: [0, 51, 153],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 10,
          halign: 'center'
        },
        columnStyles: {
          0: { halign: 'center', cellWidth: 20 },
          1: { halign: 'center', cellWidth: 35 },
          2: { halign: 'right', cellWidth: 45 },
          3: { halign: 'right', cellWidth: 45 },
          4: { halign: 'right', cellWidth: 45 }
        },
        alternateRowStyles: { 
          fillColor: [248, 249, 250] 
        },
        tableLineColor: [200, 200, 200],
        tableLineWidth: 0.1
      });
      
      // Add footer with generation date and branding
      const finalY = doc.lastAutoTable.finalY || 250;
      if (finalY < 260) {
        doc.setFontSize(9);
        doc.setTextColor(128, 128, 128);
        doc.text(`Generated on: ${new Date().toLocaleDateString('en-IN')}`, 20, finalY + 20);
        doc.text('Powered by WorkSocial India', doc.internal.pageSize.getWidth() - 20, finalY + 20, { align: 'right' });
      }

      // Save the PDF
      doc.save(`car-loan-amortization-${new Date().getTime()}.pdf`);
    } catch (error) {
      console.error('PDF Generation Error:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  // Handle sharing
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
    <div className="flex">
      <div className="hidden lg:block">
        <CalculatorSidebar />
      </div>
    <div className="min-h-screen bg-gray-50 text-gray-800 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Back to Calculators Link */}
        <div className="mb-6">
          <Link to="/calculators" className="flex items-center text-blue-600 hover:text-blue-800 transition">
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span className="text-sm md:text-base font-medium">Back to Calculators</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Calculator Inputs */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl ${styles.cardShadow}">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center">
              <Calculator className="mr-2 h-5 w-5 text-blue-600" />
              Loan Details
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loan Amount (₹)</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Annual Interest Rate (%)</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Tenure (Years)</label>
                <input 
                    type="number" 
                    value={tenureValue} 
                    max="10"
                    onChange={(e) => setTenureValue(Math.min(parseFloat(e.target.value), 10) || 0)}
                    className="flex-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-gray-900 text-sm md:text-base h-12 md:h-auto touch-manipulation" 
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

          {/* Right Column: Results and Charts */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Results Overview */}
            <div className={`bg-white rounded-2xl ${styles.cardShadow} p-6`}>
              <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center">
                <PieChart className="mr-2 h-5 w-5 text-purple-600" />
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

            {/* Amortization Table */}
            <div className="bg-white p-6 rounded-2xl ${styles.cardShadow}">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-0 flex items-center">
                  <Table className="mr-2 h-5 w-5 text-orange-600" />
                  Amortization Schedule
                </h2>
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
                    {amortizationData.map((row, index) => (
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
              
              {/* Share Buttons */}
              <div className="flex justify-center space-x-4 mt-8 pb-6">
                <button 
                  onClick={() => shareOn('whatsapp')}
                  className="flex items-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors shadow-lg"
                >
                  Share on WhatsApp
                </button>
                <button 
                  onClick={() => setShowShareModal(true)}
                  className="flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors shadow-lg"
                >
                  Share
                </button>
                <button 
                  onClick={createPDF}
                  className="flex items-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors shadow-lg"
                >
                  Download as PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Share Your Results</h3>
            
            <div className="flex flex-col gap-4">
              <button 
                onClick={() => shareOn('whatsapp')} 
                className="flex items-center justify-center gap-2 px-4 py-3 bg-green-100 text-green-700 rounded-lg shadow hover:bg-green-200 transition"
              >
                <MessageCircle className="h-5 w-5" />
                Share on WhatsApp
              </button>
              
              <button 
                onClick={() => shareOn('telegram')} 
                className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-100 text-blue-700 rounded-lg shadow hover:bg-blue-200 transition"
              >
                <Share2 className="h-5 w-5" />
                Share on Telegram
              </button>
              
              <button 
                onClick={() => shareOn('mail')} 
                className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg shadow hover:bg-gray-200 transition"
              >
                <FileText className="h-5 w-5" />
                Share via Email
              </button>
            </div>
            
            <div className="mt-4">
              <button 
                onClick={() => setShowShareModal(false)} 
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

export default CarLoanCalculator;
