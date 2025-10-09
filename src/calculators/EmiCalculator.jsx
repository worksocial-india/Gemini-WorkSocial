import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Calculator, Share2, Download, FileText, Table, ArrowLeft, PieChart, TrendingUp, CreditCard, Calendar, BadgeDollarSign, Percent, Landmark, MessageCircle } from 'lucide-react';
import CalculatorSidebar from './CalculatorSidebar';
import { CalculatorShareButton } from '../components/CalculatorShareButtons';
import { trackCalculatorUsage } from '../hooks/useGoogleAnalytics';

// Custom styles
const styles = {
  gradientBg: "bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500",
  heroGradient: "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
  cardShadow: "shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1",
  glassMorphism: "backdrop-blur-lg bg-white/90 border border-white/20",
  inputStyle: "w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-400/30 focus:border-blue-500 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm text-gray-800 placeholder-gray-400",
  buttonPrimary: "w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-4 px-8 rounded-xl font-bold hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl",
  buttonSecondary: "px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border-2 border-gray-300 rounded-xl hover:from-gray-200 hover:to-gray-300 hover:border-gray-400 transition-all duration-300 flex items-center gap-2 font-medium shadow-md hover:shadow-lg",
  resultCard: "p-6 rounded-2xl shadow-xl border-l-4 transform hover:scale-105 transition-all duration-300",
  animatedIcon: "animate-pulse",
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
    totalAmount: 0,
    emi: 0 // Add backward compatibility
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
      totalAmount: totalAmount,
      emi: emi // Add backward compatibility
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
      
      // Calculate which year this month belongs to
      const year = Math.ceil(i / 12);
      
      amortData.push({
        month: i,
        year: year,
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
    setSelectedYear(options[0]?.value || ""); // Set to first year value, not object
  };

  // Update the pie chart with new data
  const updateChart = () => {
    if (!chartRef.current) return;
    
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    
    const ctx = chartRef.current.getContext('2d');
    const total = (loanAmount || 0) + (results.totalInterest || 0);
    
    // Prevent chart creation if values are not valid
    if (total <= 0 || !loanAmount || !results.totalInterest) {
      return;
    }
    
    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Principal Amount', 'Total Interest'],
        datasets: [{
          data: [loanAmount || 0, results.totalInterest || 0],
          backgroundColor: ['#3B82F6', '#EF4444'],
          borderWidth: 3,
          borderColor: '#ffffff',
          hoverBackgroundColor: ['#2563EB', '#DC2626'],
          cutout: '65%'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 30,
              usePointStyle: true,
              pointStyle: 'circle',
              font: {
                size: 14,
                weight: 'bold'
              },
              color: '#374151',
              generateLabels: function(chart) {
                const data = chart.data;
                if (data.labels.length && data.datasets.length) {
                  return data.labels.map((label, i) => {
                    const value = data.datasets[0].data[i];
                    const percentage = ((value / total) * 100).toFixed(1);
                    return {
                      text: `${label}: ₹${value.toLocaleString('en-IN', {maximumFractionDigits: 0})} (${percentage}%)`,
                      fillStyle: data.datasets[0].backgroundColor[i],
                      strokeStyle: data.datasets[0].borderColor,
                      lineWidth: data.datasets[0].borderWidth,
                      pointStyle: 'circle',
                      hidden: false,
                      index: i
                    };
                  });
                }
                return [];
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            borderColor: '#ffffff',
            borderWidth: 1,
            cornerRadius: 12,
            padding: 12,
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.raw;
                const percentage = ((value / total) * 100).toFixed(1);
                return `${label}: ₹${value.toLocaleString('en-IN', {maximumFractionDigits: 0})} (${percentage}%)`;
              }
            }
          },
          // Add data labels plugin for showing percentages on chart segments
          datalabels: {
            color: '#ffffff',
            font: {
              size: 16,
              weight: 'bold'
            },
            formatter: function(value) {
              const percentage = ((value / total) * 100).toFixed(1);
              return `${percentage}%\n₹${(value/100000).toFixed(1)}L`;
            },
            textAlign: 'center',
            anchor: 'center',
            align: 'center'
          }
        },
        elements: {
          arc: {
            borderWidth: 3,
            borderColor: '#ffffff'
          }
        }
      },
      plugins: [{
        // Custom plugin to draw data labels
        id: 'customDataLabels',
        beforeDatasetsDraw: function(chart) {
          const ctx = chart.ctx;
          const meta = chart.getDatasetMeta(0);
          
          meta.data.forEach((arc, index) => {
            const value = chart.data.datasets[0].data[index];
            const percentage = ((value / total) * 100).toFixed(1);
            const amount = value >= 100000 ? `₹${(value/100000).toFixed(1)}L` : `₹${(value/1000).toFixed(0)}K`;
            
            // Get arc center point
            const centerPoint = arc.getCenterPoint();
            
            ctx.save();
            ctx.font = 'bold 14px Arial';
            ctx.fillStyle = '#ffffff';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // Draw percentage
            ctx.fillText(`${percentage}%`, centerPoint.x, centerPoint.y - 8);
            // Draw amount
            ctx.font = 'bold 12px Arial';
            ctx.fillText(amount, centerPoint.x, centerPoint.y + 8);
            
            ctx.restore();
          });
        }
      }]
    });
  };

  // Format number as Indian currency
  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null || isNaN(amount)) {
      return '₹0';
    }
    return `₹${Math.round(amount).toLocaleString('en-IN')}`;
  };

  // Format number for PDF output (clean formatting without currency symbol issues)
  const formatCurrencyForPDF = (amount) => {
    if (!amount || isNaN(amount)) return '0';
    
    // Round the amount and convert to string
    const numStr = Math.round(Number(amount)).toString();
    
    // Simple Indian formatting with commas
    const len = numStr.length;
    if (len <= 3) return numStr;
    
    let result = '';
    let count = 0;
    
    // Process from right to left
    for (let i = len - 1; i >= 0; i--) {
      result = numStr[i] + result;
      count++;
      
      // Add comma after every 3 digits from right (for thousands)
      if (count === 3 && i > 0) {
        result = ',' + result;
        count = 0;
      }
      // Add comma after every 2 digits for lakhs and crores
      else if (count === 2 && i > 0 && (len - i) > 3) {
        result = ',' + result;
        count = 0;
      }
    }
    
    return result;
  };

  // Filter amortization data by selected year
  const getFilteredAmortizationData = () => {
    if (amortizationData.length === 0) {
      return [];
    }
    
    // Return all data if "all" is selected or no year is selected (default)
    if (selectedYear === "all" || !selectedYear) {
      return amortizationData;
    }
    
    return amortizationData.filter(row => row.year === parseInt(selectedYear));
  };

  const createPDF = () => {
    const generatePdf = (logoImage) => {
      try {
        const doc = new jsPDF({ 
          orientation: 'landscape', 
          unit: 'pt', 
          format: 'A4',
          putOnlyUsedFonts: true,
          floatPrecision: 16
        });
        const pageWidth = doc.internal.pageSize.getWidth();
        const marginX = 40;
        const headerTop = 32;
        let footerSpacer = headerTop;

        // Set default font encoding to handle text properly
        doc.setFont('helvetica');
        doc.setTextColor(0, 0, 0);

        // Add logo and branding
        if (logoImage) {
          const targetWidth = 120;
          const aspectRatio = logoImage.height ? logoImage.height / logoImage.width : 0.4;
          const logoHeight = targetWidth * aspectRatio;
          doc.addImage(logoImage, 'PNG', marginX, headerTop, targetWidth, logoHeight);
          footerSpacer = headerTop + logoHeight;
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(11);
          doc.text('Backed by Bankers', marginX, footerSpacer + 18);
          footerSpacer += 18;
        } else {
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(18);
          doc.text('WorkSocial', marginX, headerTop + 20);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(11);
          doc.text('Backed by Bankers', marginX, headerTop + 38);
          footerSpacer = headerTop + 38;
        }

        // Add title
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(24);
        doc.text('EMI Calculation Report', pageWidth - marginX, headerTop + 34, { align: 'right' });

        // Add divider line
        const dividerY = Math.max(footerSpacer + 16, headerTop + 44);
        doc.setDrawColor(226, 232, 240);
        doc.line(marginX, dividerY, pageWidth - marginX, dividerY);

        // Add loan summary with improved formatting
        let summaryY = dividerY + 25;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.text('Loan Summary', marginX, summaryY);
        
        summaryY += 20;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(11);
        
        // Format loan details in a cleaner way
        const loanDetails = [
          [`Loan Amount: Rs. ${formatCurrencyForPDF(loanAmount)}`, `Interest Rate: ${interestRate}% per annum`],
          [`Tenure: ${tenureValue} ${tenureType}`, `Monthly EMI: Rs. ${formatCurrencyForPDF(results.monthlyEMI)}`],
          [`Total Interest: Rs. ${formatCurrencyForPDF(results.totalInterest)}`, `Total Amount: Rs. ${formatCurrencyForPDF(results.totalAmount)}`]
        ];
        
        loanDetails.forEach(([left, right]) => {
          doc.text(left, marginX, summaryY);
          doc.text(right, marginX + 250, summaryY);
          summaryY += 15;
        });

        // Add amortization table
        autoTable(doc, {
          startY: summaryY + 20,
          margin: { left: marginX, right: marginX },
          headStyles: { 
            fillColor: [79, 70, 229], 
            halign: 'center', 
            textColor: 255,
            fontSize: 10,
            fontStyle: 'bold',
            font: 'helvetica'
          },
          styles: { 
            halign: 'center', 
            fontSize: 9,
            cellPadding: 4,
            font: 'helvetica',
            overflow: 'linebreak'
          },
          head: [[
            'Month',
            'Date',
            'EMI (Rs.)',
            'Principal (Rs.)',
            'Interest (Rs.)',
            'Remaining Balance (Rs.)',
          ]],
          body: amortizationData.map(row => [
            row.month,
            row.date ? row.date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A',
            results.monthlyEMI.toFixed(0),
            row.principal.toFixed(0),
            row.interest.toFixed(0),
            Math.max(row.balance, 0).toFixed(0),
          ]),
          didDrawPage: () => {
            const footerY = doc.internal.pageSize.getHeight() - 40;
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(11);
            doc.setTextColor(30, 41, 59);
            doc.text('WorkSocial India | worksocial.in', marginX, footerY);
            doc.setTextColor(37, 99, 235);
            doc.textWithLink('@worksocialindia', pageWidth - marginX, footerY, {
              align: 'right',
              url: 'https://www.instagram.com/worksocialindia',
            });
            doc.setTextColor(0, 0, 0);
          },
        });

        doc.save('EMI_Calculation_Report.pdf');
      } catch (error) {
        console.error('Error downloading PDF:', error);
        alert('An error occurred while downloading the PDF. Please try again.');
      }
    };

    // Load logo
    const logo = new Image();
    logo.crossOrigin = 'anonymous';
    logo.src = '/Logo-worksocialindia.png';

    if (logo.complete) {
      generatePdf(logo);
    } else {
      logo.onload = () => generatePdf(logo);
      logo.onerror = () => generatePdf(undefined);
    }
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
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="hidden lg:block">
        <CalculatorSidebar />
      </div>
      
      <div className="flex-1 p-4 sm:p-6 md:p-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Hero Section */}
          <div className="mb-8">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 text-white shadow-2xl">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <Link to="/calculators" className="inline-flex items-center text-white/90 hover:text-white transition-colors duration-200 mb-4 group">
                      <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
                      Back to Calculators
                    </Link>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                      EMI Calculator
                    </h1>
                    <p className="text-blue-100 text-lg">Calculate your loan EMI with precision and plan your finances better</p>
                  </div>
                  <div className="hidden md:block">
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Calculator className="w-12 h-12 text-white animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-400/20 to-transparent rounded-full translate-y-24 -translate-x-24"></div>
            </div>
          </div>
          
        <div className="grid grid-cols-1 gap-8">
          
          {/* Top Row: Calculator Inputs */}
          <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20">
            <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-800">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              Loan Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="group">
                <label className="flex text-sm font-semibold text-gray-700 mb-2 items-center">
                  <BadgeDollarSign className="w-4 h-4 mr-2 text-green-600" />
                  Loan Amount (₹)
                </label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={loanAmount} 
                    onChange={(e) => setLoanAmount(parseFloat(e.target.value) || 0)}
                    className={`${styles.inputStyle} text-lg font-medium group-hover:shadow-lg`}
                    placeholder="10,00,000" 
                    inputMode="numeric"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <Landmark className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="group">
                <label className="flex text-sm font-semibold text-gray-700 mb-2 items-center">
                  <Percent className="w-4 h-4 mr-2 text-blue-600" />
                  Annual Interest Rate (%)
                </label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={interestRate} 
                    onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                    className={`${styles.inputStyle} text-lg font-medium group-hover:shadow-lg`}
                    placeholder="8.5" 
                    step="0.1"
                    inputMode="decimal"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <span className="text-sm font-bold text-gray-500">%</span>
                  </div>
                </div>
              </div>

              <div className="group">
                <label className="flex text-sm font-semibold text-gray-700 mb-2 items-center">
                  <Calendar className="w-4 h-4 mr-2 text-purple-600" />
                  Loan Tenure
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input 
                    type="number" 
                    value={tenureValue} 
                    onChange={(e) => setTenureValue(parseFloat(e.target.value) || 0)}
                    className="px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-400/30 focus:border-purple-500 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm text-gray-800 placeholder-gray-400 text-lg font-medium group-hover:shadow-lg"
                    placeholder="20" 
                    inputMode="numeric"
                  />
                  <select 
                    value={tenureType} 
                    onChange={(e) => setTenureType(e.target.value)}
                    className="px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-400/30 focus:border-purple-500 focus:outline-none bg-white/80 backdrop-blur-sm text-gray-800 text-lg font-medium group-hover:shadow-lg transition-all duration-300">
                    <option value="years">Years</option>
                    <option value="months">Months</option>
                  </select>
                </div>
              </div>

              <div className="group">
                <label className="flex text-sm font-semibold text-gray-700 mb-2 items-center">
                  <Calendar className="w-4 h-4 mr-2 text-indigo-600" />
                  EMI Start Date
                </label>
                <input 
                  type="date" 
                  value={startDate} 
                  onChange={(e) => setStartDate(e.target.value)}
                  className={`${styles.inputStyle} text-lg font-medium group-hover:shadow-lg`}
                />
              </div>
            </div>
          </div>

          {/* Results and Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">              {/* Results Overview */}
              <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20">
                <h2 className="text-2xl font-bold mb-6 flex items-center text-gray-800">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-3">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  EMI Results Overview
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                  <div className={`${styles.resultCard} bg-gradient-to-br from-emerald-50 to-green-100 border-l-emerald-500`}>
                    <div className="flex flex-col items-center justify-center text-center h-full">
                      <div className="w-20 h-20 bg-emerald-200 rounded-full flex items-center justify-center mb-4 shadow-lg">
                        <CreditCard className="w-10 h-10 text-emerald-700" />
                      </div>
                      <span className="text-xs font-bold bg-emerald-200 text-emerald-800 px-4 py-2 rounded-full mb-3">MONTHLY</span>
                      <div className="text-3xl font-bold text-emerald-800 mb-2">
                        {formatCurrency(results.monthlyEMI)}
                      </div>
                      <div className="text-sm text-emerald-600 font-medium">Monthly EMI</div>
                    </div>
                  </div>
                  
                  <div className={`${styles.resultCard} bg-gradient-to-br from-blue-50 to-indigo-100 border-l-blue-500`}>
                    <div className="flex flex-col items-center justify-center text-center h-full">
                      <div className="w-20 h-20 bg-blue-200 rounded-full flex items-center justify-center mb-4 shadow-lg">
                        <Percent className="w-10 h-10 text-blue-700" />
                      </div>
                      <span className="text-xs font-bold bg-blue-200 text-blue-800 px-4 py-2 rounded-full mb-3">INTEREST</span>
                      <div className="text-3xl font-bold text-blue-800 mb-2">
                        {formatCurrency(results.totalInterest)}
                      </div>
                      <div className="text-sm text-blue-600 font-medium">Total Interest</div>
                    </div>
                  </div>
                  
                  <div className={`${styles.resultCard} bg-gradient-to-br from-purple-50 to-violet-100 border-l-purple-500`}>
                    <div className="flex flex-col items-center justify-center text-center h-full">
                      <div className="w-20 h-20 bg-purple-200 rounded-full flex items-center justify-center mb-4 shadow-lg">
                        <BadgeDollarSign className="w-10 h-10 text-purple-700" />
                      </div>
                      <span className="text-xs font-bold bg-purple-200 text-purple-800 px-4 py-2 rounded-full mb-3">TOTAL</span>
                      <div className="text-3xl font-bold text-purple-800 mb-2">
                        {formatCurrency(results.totalAmount)}
                      </div>
                      <div className="text-sm text-purple-600 font-medium">Total Amount</div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-wrap gap-3">
                  <button 
                    onClick={() => setShowShareModal(true)}
                    className="flex-1 min-w-0 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Results
                  </button>
                  <button 
                    onClick={() => window.open('https://wa.me/?text=Check out my EMI calculation on WorkSocial.in', '_blank')}
                    className="flex-1 min-w-0 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    WhatsApp
                  </button>
                </div>
              </div>

              {/* Chart Block */}
              <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                    <PieChart className="w-5 h-5 text-white" />
                  </div>
                  Loan Breakdown
                </h3>
                
                {/* Chart Container */}
                <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border-2 border-gray-100 shadow-inner">
                  <div className="relative h-64 md:h-80">
                    <canvas ref={chartRef}></canvas>
                  </div>
                </div>
              </div>
            </div>

          {/* Amortization Table - Full Width Single Column */}
          <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                  <h2 className="text-2xl font-bold mb-3 sm:mb-0 flex items-center text-gray-800">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mr-3">
                      <Table className="w-5 h-5 text-white" />
                    </div>
                    Amortization Schedule
                  </h2>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <select 
                      value={selectedYear} 
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="px-4 py-3 text-sm border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-orange-400/30 focus:border-orange-500 focus:outline-none bg-white/80 backdrop-blur-sm text-gray-800 font-medium transition-all duration-300 min-w-0"
                    >
                      <option value="">View All</option>
                      {yearOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <button 
                      onClick={() => setSelectedYear("all")} 
                      className="px-6 py-3 text-sm bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 focus:outline-none transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold flex items-center justify-center whitespace-nowrap"
                    >
                      <span>View All</span>
                    </button>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-gray-50 to-white rounded-2xl p-1 shadow-inner">
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gradient-to-r from-gray-100 to-gray-50">
                            <th className="p-4 text-left font-bold text-gray-800 border-b-2 border-gray-200">Month</th>
                            <th className="p-4 text-left font-bold text-gray-800 border-b-2 border-gray-200">Date</th>
                            <th className="p-4 text-left font-bold text-gray-800 border-b-2 border-gray-200">Principal</th>
                            <th className="p-4 text-left font-bold text-gray-800 border-b-2 border-gray-200">Interest</th>
                            <th className="p-4 text-right font-bold text-gray-800 border-b-2 border-gray-200">Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getFilteredAmortizationData().map((row, index) => (
                            <tr key={index} className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200">
                              <td className="p-4 font-semibold text-gray-800">{row.month}</td>
                              <td className="p-4 text-gray-700">{row.date ? row.date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A'}</td>
                              <td className="p-4 font-medium text-green-700">{formatCurrency(row.principal)}</td>
                              <td className="p-4 font-medium text-red-600">{formatCurrency(row.interest)}</td>
                              <td className="p-4 text-right font-bold text-blue-800">{formatCurrency(row.balance)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                
                {/* Share Buttons */}
                <div className="flex flex-col sm:flex-row justify-center sm:space-x-4 space-y-3 sm:space-y-0 mt-8 pb-6">
                  <button 
                    onClick={() => handleShare('whatsapp')}
                    className="flex items-center justify-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors shadow-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                    </svg>
                    Share on WhatsApp
                  </button>
                  <button 
                    onClick={() => setShowShareModal(true)}
                    className="flex items-center justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors shadow-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="18" cy="5" r="3"></circle>
                      <circle cx="6" cy="12" r="3"></circle>
                      <circle cx="18" cy="19" r="3"></circle>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                    </svg>
                    Share
                  </button>
                  <button 
                    onClick={createPDF}
                    className="flex items-center justify-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors shadow-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    Download as PDF
                  </button>
                </div>
                
                {/* WhatsApp Share Button - Moved outside of the flex container */}
                <div className="mt-4 flex justify-center">
                  <CalculatorShareButton 
                    calculatorType="emi"
                    results={{
                      loanAmount,
                      interestRate,
                      tenure: tenureValue,
                      monthlyEMI: results.monthlyEMI,
                      totalInterest: results.totalInterest,
                      totalAmount: results.totalAmount
                    }}
                    disabled={!results.monthlyEMI}
                  />
                </div>
              </div>
            </div>
          </div>

      {/* Enhanced Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl p-8 m-4 max-w-md w-full shadow-2xl border border-white/20 transform animate-in slide-in-from-bottom-4 duration-300">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Share2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Share Your EMI Calculation</h3>
              <p className="text-gray-600">Let others benefit from your calculation</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button 
                onClick={() => handleShare('facebook')} 
                className="px-4 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 text-sm font-semibold flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Facebook
              </button>
              <button 
                onClick={() => handleShare('twitter')} 
                className="px-4 py-4 bg-gradient-to-r from-sky-500 to-blue-500 text-white rounded-2xl hover:from-sky-600 hover:to-blue-600 text-sm font-semibold flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Twitter
              </button>
              <button 
                onClick={() => handleShare('linkedin')} 
                className="px-4 py-4 bg-gradient-to-r from-blue-700 to-blue-800 text-white rounded-2xl hover:from-blue-800 hover:to-blue-900 text-sm font-semibold flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                LinkedIn
              </button>
              <button 
                onClick={() => handleShare('whatsapp')} 
                className="px-4 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl hover:from-green-600 hover:to-green-700 text-sm font-semibold flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                WhatsApp
              </button>
              <button 
                onClick={() => {navigator.clipboard.writeText(window.location.href); alert('Link copied to clipboard!');}} 
                className="px-4 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-2xl hover:from-gray-700 hover:to-gray-800 text-sm font-semibold flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Copy Link
              </button>
              <button 
                onClick={() => window.location.href = `mailto:?subject=EMI Calculation&body=Check out my EMI calculation: ${window.location.href}`} 
                className="px-4 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl hover:from-red-600 hover:to-red-700 text-sm font-semibold flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Email
              </button>
            </div>
            
            <button 
              onClick={() => setShowShareModal(false)} 
              className="w-full px-6 py-4 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 rounded-2xl hover:from-gray-300 hover:to-gray-400 font-semibold flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Close
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default EmiCalculator;
