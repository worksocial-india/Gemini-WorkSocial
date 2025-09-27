import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Chart from 'chart.js/auto';
import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';
import { Calculator, Share2, Download, FileText, Table, ArrowLeft, PieChart, TrendingUp, CreditCard, Calendar, BadgeDollarSign, Percent, Landmark, MessageCircle } from 'lucide-react';

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
    if (options.length > 0 && !selectedYear) {
      setSelectedYear(1);
    }
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

  // Get filtered amortization data for selected year
  const getYearlyAmortizationData = () => {
    if (!selectedYear || amortizationData.length === 0) {
      return [];
    }
    
    // Return all data if "all" is selected
    if (selectedYear === "all") {
      return amortizationData;
    }
    
    const startMonth = (parseInt(selectedYear) - 1) * 12;
    const endMonth = Math.min(parseInt(selectedYear) * 12, amortizationData.length);
    
    return amortizationData.slice(startMonth, endMonth);
  };

  // Download report as PDF
  const createPDF = async () => {
    if (amortizationData.length === 0) {
      alert('Please calculate EMI first');
      return;
    }
    
    try {
      // Load logo image
      const loadImageAsBase64 = (imagePath) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL('image/png'));
          };
          img.onerror = reject;
          img.src = imagePath;
        });
      };

      // Load the WorkSocial logo
      const logoBase64 = await loadImageAsBase64('/Logo-worksocialindia.png');
      
      // Create PDF with fixed A4 size - ensuring consistency across all devices
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        putOnlyUsedFonts: true,
        floatPrecision: 2 // Ensures consistent decimal precision
      });

      // Define fixed margins and layout constants (absolute values)
      const margin = {
        top: 35,
        bottom: 30,
        left: 20,
        right: 20
      };
      
      // Use fixed A4 dimensions to ensure consistency
      const pageWidth = 210; // A4 width in mm
      const contentWidth = pageWidth - margin.left - margin.right; // 170mm

      // Function to add header with fixed positioning
      const addHeader = () => {
        // Add logo at fixed position
        pdf.addImage(logoBase64, 'PNG', margin.left, 10, 40, 15);
        
        // Add company name and tagline with fixed positioning
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(16);
        pdf.setTextColor(28, 100, 242); // Blue color
        pdf.text('WorkSocial India', 65, 17); // Fixed x position
        
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(11);
        pdf.setTextColor(100, 100, 100);
        pdf.text('Backed by Bankers', 65, 24); // Fixed x position
        
        // Add date on the right with fixed positioning
        pdf.setFontSize(9);
        pdf.setTextColor(120, 120, 120);
        pdf.text(`Generated on: ${new Date().toLocaleDateString('en-IN')}`, 
          190, 15, { align: 'right' }); // Fixed x position (210-20=190)
        
        // Add horizontal line with fixed coordinates
        pdf.setDrawColor(28, 100, 242);
        pdf.setLineWidth(1);
        pdf.line(margin.left, 28, 190, 28); // Fixed coordinates
        
        // Add a subtle shadow line with fixed coordinates
        pdf.setDrawColor(220, 220, 220);
        pdf.setLineWidth(0.3);
        pdf.line(margin.left, 29, 190, 29); // Fixed coordinates
      };

      // Function to add footer with fixed positioning
      const addFooter = () => {
        const footerY = 267; // Fixed position from top (297-30=267)
        
        // Add horizontal line with fixed coordinates
        pdf.setDrawColor(28, 100, 242);
        pdf.setLineWidth(0.8);
        pdf.line(margin.left, footerY - 5, 190, footerY - 5); // Fixed coordinates
        
        // Add a subtle shadow line with fixed coordinates
        pdf.setDrawColor(220, 220, 220);
        pdf.setLineWidth(0.3);
        pdf.line(margin.left, footerY - 4, 190, footerY - 4); // Fixed coordinates
        
        // Add small logo in footer at fixed position
        pdf.addImage(logoBase64, 'PNG', margin.left, footerY - 2, 12, 4.5);
        
        // Add company info with fixed positioning
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(9);
        pdf.setTextColor(28, 100, 242);
        pdf.text('WorkSocial India', 35, footerY); // Fixed x position
        
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(8);
        pdf.setTextColor(100, 100, 100);
        pdf.text('Backed by Bankers | www.worksocial.in', 35, footerY + 4); // Fixed x position
        
        // Add page number with fixed positioning
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(8);
        pdf.setTextColor(28, 100, 242);
        pdf.text('Page 1', 190, footerY, { align: 'right' }); // Fixed x position
        
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(7);
        pdf.setTextColor(120, 120, 120);
        pdf.text('EMI Calculator Report', 190, footerY + 4, { align: 'right' }); // Fixed x position
      };

      // Add header and footer
      addHeader();
      addFooter();
      
      // Add title with fixed positioning
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(20);
      pdf.setTextColor(28, 100, 242);
      pdf.text('EMI Calculation Report', 105, 45, { align: 'center' }); // Fixed center position
      
      // Add subtitle with fixed positioning
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text('Complete Loan Analysis & Planning', 105, 52, { align: 'center' }); // Fixed center position

      // Loan Details Section
      let currentY = 70;
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(14);
      pdf.setTextColor(40, 40, 40);
      pdf.text('Loan Details', margin.left, currentY);
      
      currentY += 8;
      pdf.setDrawColor(28, 100, 242);
      pdf.setLineWidth(2);
      pdf.line(margin.left, currentY, margin.left + 30, currentY);
      
      currentY += 8;
      
      // Create a styled box for loan details
      pdf.setFillColor(248, 250, 252);
      pdf.rect(margin.left, currentY, contentWidth, 35, 'F');
      pdf.setDrawColor(220, 220, 220);
      pdf.setLineWidth(0.5);
      pdf.rect(margin.left, currentY, contentWidth, 35);
      
      currentY += 8;
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(11);
      pdf.setTextColor(60, 60, 60);
      
      const loanDetails = [
        [`Loan Amount:`, 'Rs. ' + formatCurrencyForPDF(loanAmount)],
        [`Interest Rate:`, `${interestRate}% per annum`],
        [`Loan Term:`, `${tenureValue} ${tenureType}`],
        [`EMI Start Date:`, `${new Date(startDate).toLocaleDateString('en-IN')}`]
      ];
      
      loanDetails.forEach((detail) => {
        pdf.setFont('helvetica', 'normal');
        pdf.text(detail[0], margin.left + 5, currentY);
        pdf.setFont('helvetica', 'bold');
        pdf.text(detail[1], margin.left + 50, currentY);
        currentY += 6;
      });

      // EMI Results Section
      currentY += 10;
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(14);
      pdf.setTextColor(40, 40, 40);
      pdf.text('EMI Calculation Results', margin.left, currentY);
      
      currentY += 8;
      pdf.setDrawColor(34, 197, 94);
      pdf.setLineWidth(2);
      pdf.line(margin.left, currentY, margin.left + 40, currentY);
      
      currentY += 8;
      
      // Create result boxes with fixed dimensions
      const resultBoxWidth = 53; // Fixed width (170-10)/3 = 53.33mm, rounded to 53
      const resultBoxHeight = 25;
      const boxSpacing = 5;
      
      // Monthly EMI Box - Fixed position
      pdf.setFillColor(239, 246, 255);
      pdf.rect(margin.left, currentY, resultBoxWidth, resultBoxHeight, 'F');
      pdf.setDrawColor(59, 130, 246);
      pdf.setLineWidth(1);
      pdf.rect(margin.left, currentY, resultBoxWidth, resultBoxHeight);
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.setTextColor(30, 64, 175);
      pdf.text('Monthly EMI', margin.left + (resultBoxWidth/2), currentY + 8, { align: 'center' });
      
      pdf.setFontSize(12);
      pdf.setTextColor(30, 64, 175);
      pdf.text('Rs. ' + formatCurrencyForPDF(results.monthlyEMI), margin.left + (resultBoxWidth/2), currentY + 16, { align: 'center' });
      
      // Total Interest Box - Fixed position
      const box2X = margin.left + resultBoxWidth + boxSpacing;
      pdf.setFillColor(254, 242, 242);
      pdf.rect(box2X, currentY, resultBoxWidth, resultBoxHeight, 'F');
      pdf.setDrawColor(239, 68, 68);
      pdf.setLineWidth(1);
      pdf.rect(box2X, currentY, resultBoxWidth, resultBoxHeight);
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.setTextColor(185, 28, 28);
      pdf.text('Total Interest', box2X + (resultBoxWidth/2), currentY + 8, { align: 'center' });
      
      pdf.setFontSize(12);
      pdf.setTextColor(185, 28, 28);
      pdf.text('Rs. ' + formatCurrencyForPDF(results.totalInterest), box2X + (resultBoxWidth/2), currentY + 16, { align: 'center' });
      
      // Total Amount Box - Fixed position
      const box3X = margin.left + (resultBoxWidth + boxSpacing) * 2;
      pdf.setFillColor(240, 253, 244);
      pdf.rect(box3X, currentY, resultBoxWidth, resultBoxHeight, 'F');
      pdf.setDrawColor(34, 197, 94);
      pdf.setLineWidth(1);
      pdf.rect(box3X, currentY, resultBoxWidth, resultBoxHeight);
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.setTextColor(21, 128, 61);
      pdf.text('Total Amount', box3X + (resultBoxWidth/2), currentY + 8, { align: 'center' });
      
      pdf.setFontSize(12);
      pdf.setTextColor(21, 128, 61);
      pdf.text('Rs. ' + formatCurrencyForPDF(results.totalAmount), box3X + (resultBoxWidth/2), currentY + 16, { align: 'center' });

      // Summary Section
      currentY += 40;
      
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(14);
      pdf.setTextColor(40, 40, 40);
      pdf.text('Loan Summary', margin.left, currentY);
      
      currentY += 8;
      pdf.setDrawColor(168, 85, 247);
      pdf.setLineWidth(2);
      pdf.line(margin.left, currentY, margin.left + 35, currentY);
      
      currentY += 10;
      
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(80, 80, 80);
      
      const summaryItems = [
        `• Interest to Principal Ratio: ${((results.totalInterest / loanAmount) * 100).toFixed(1)}%`,
        `• Monthly commitment for ${tenureType === "years" ? tenureValue : Math.ceil(tenureValue/12)} years`,
        `• Total interest cost: Rs. ` + formatCurrencyForPDF(results.totalInterest),
        `• Generated on ${new Date().toLocaleDateString('en-IN')} via WorkSocial India EMI Calculator`
      ];
      
      summaryItems.forEach(item => {
        pdf.text(item, margin.left, currentY);
        currentY += 6;
      });

      // Check if we need a new page for amortization table
      if (currentY > 217) { // Fixed value (267-50=217)
        pdf.addPage();
        addHeader();
        addFooter();
        currentY = 50;
      } else {
        currentY += 15;
      }

      // Amortization Table or
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(14);
      pdf.setTextColor(40, 40, 40);
      pdf.text('Amortization Schedule', margin.left, currentY);
      
      currentY += 8;
      pdf.setDrawColor(220, 38, 127);
      pdf.setLineWidth(2);
      pdf.line(margin.left, currentY, margin.left + 45, currentY);
      
      currentY += 10;

      // Table parameters with fixed dimensions
      const rowHeight = 6;
      const headerHeight = 8;
      const tableWidth = 170; // Fixed table width (contentWidth)
      const colWidths = [15, 25, 30, 30, 30, 40]; // Column widths in mm
      const maxRowsPerPage = Math.floor((237 - currentY) / rowHeight); // Fixed calculation (267-30=237)
      
      // Function to draw table header with fixed positioning
      const drawTableHeader = (yPos) => {
        // Header background with fixed dimensions
        pdf.setFillColor(240, 248, 255);
        pdf.rect(margin.left, yPos, tableWidth, headerHeight, 'F');
        
        // Header border with fixed dimensions
        pdf.setDrawColor(59, 130, 246);
        pdf.setLineWidth(0.5);
        pdf.rect(margin.left, yPos, tableWidth, headerHeight);
        
        // Header text
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(9);
        pdf.setTextColor(30, 64, 175);
        
        const headers = ['Month', 'Date', 'EMI (₹)', 'Principal (₹)', 'Interest (₹)', 'Balance (₹)'];
        let xPos = margin.left + 2;
        
        headers.forEach((header, index) => {
          pdf.text(header, xPos, yPos + 5.5);
          xPos += colWidths[index];
        });
        
        return yPos + headerHeight;
      };
      
      // Function to draw table row
      const drawTableRow = (rowData, yPos, isEvenRow = false) => {
        // Row background
        if (isEvenRow) {
          pdf.setFillColor(248, 250, 252);
          pdf.rect(margin.left, yPos, tableWidth, rowHeight, 'F');
        }
        
        // Row border
        pdf.setDrawColor(220, 220, 220);
        pdf.setLineWidth(0.3);
        pdf.rect(margin.left, yPos, tableWidth, rowHeight);
        
        // Row text
        pdf.setFont('helvetica', 'normal');
        pdf.setFontSize(8);
        pdf.setTextColor(60, 60, 60);
        
        let xPos = margin.left + 2;
        
        rowData.forEach((data, index) => {
          const cellWidth = colWidths[index] - 4;
          
          // Handle text overflow
          if (typeof data === 'string' && pdf.getTextWidth(data) > cellWidth) {
            const words = data.split(' ');
            let line = '';
            let lines = [];
            
            for (let word of words) {
              const testLine = line + word + ' ';
              if (pdf.getTextWidth(testLine) > cellWidth && line !== '') {
                lines.push(line.trim());
                line = word + ' ';
              } else {
                line = testLine;
              }
            }
            lines.push(line.trim());
            
            // Only show first line if multiple lines
            pdf.text(lines[0], xPos, yPos + 4);
          } else {
            pdf.text(data.toString(), xPos, yPos + 4);
          }
          
          xPos += colWidths[index];
        });
        
        return yPos + rowHeight;
      };

      // Draw amortization table
      let currentPageRows = 0;
      let currentTableY = drawTableHeader(currentY);
      let pageNumber = 1;
      
      // Show complete amortization schedule for full loan term
      const displayData = amortizationData;
      
      displayData.forEach((payment, index) => {
        // Check if we need a new page
        if (currentPageRows >= maxRowsPerPage) {
          pdf.addPage();
          pageNumber++;
          
          // Update page number in footer function with fixed positioning
          const addPagedFooter = () => {
            const footerY = 267; // Fixed position
            
            // Add horizontal line with fixed coordinates
            pdf.setDrawColor(28, 100, 242);
            pdf.setLineWidth(0.8);
            pdf.line(margin.left, footerY - 5, 190, footerY - 5); // Fixed coordinates
            
            // Add a subtle shadow line with fixed coordinates
            pdf.setDrawColor(220, 220, 220);
            pdf.setLineWidth(0.3);
            pdf.line(margin.left, footerY - 4, 190, footerY - 4); // Fixed coordinates
            
            // Add small logo in footer with fixed position
            pdf.addImage(logoBase64, 'PNG', margin.left, footerY - 2, 12, 4.5);
            
            // Add company info with fixed positioning
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(9);
            pdf.setTextColor(28, 100, 242);
            pdf.text('WorkSocial India', 35, footerY); // Fixed position
            
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(8);
            pdf.setTextColor(100, 100, 100);
            pdf.text('Backed by Bankers | www.worksocial.in', 35, footerY + 4); // Fixed position
            
            // Add page number with fixed positioning
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(8);
            pdf.setTextColor(28, 100, 242);
            pdf.text(`Page ${pageNumber}`, 190, footerY, { align: 'right' }); // Fixed position
            
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(7);
            pdf.setTextColor(120, 120, 120);
            pdf.text('EMI Calculator Report', 190, footerY + 4, { align: 'right' }); // Fixed position
          };
          
          addHeader();
          addPagedFooter();
          
          currentTableY = 50;
          currentTableY = drawTableHeader(currentTableY);
          currentPageRows = 0;
        }
        
        const rowData = [
          payment.month.toString(),
          payment.date.toLocaleDateString('en-IN', { month: 'short', year: '2-digit' }),
          formatCurrencyForPDF(payment.emi),
          formatCurrencyForPDF(payment.principal),
          formatCurrencyForPDF(payment.interest),
          formatCurrencyForPDF(payment.balance)
        ];
        
        currentTableY = drawTableRow(rowData, currentTableY, index % 2 === 1);
        currentPageRows++;
      });
      
      // Add completion note for full schedule
      if (amortizationData.length > 0) {
        currentTableY += 10;
        if (currentTableY > 217) { // Fixed value (267-50=217)
          pdf.addPage();
          addHeader();
          addFooter();
          currentTableY = 50;
        }
        pdf.setFont('helvetica', 'italic');
        pdf.setFontSize(9);
        pdf.setTextColor(120, 120, 120);
        pdf.text(`Complete amortization schedule showing all ${amortizationData.length} monthly payments.`, 
          margin.left, currentTableY);
      }

      // Save the PDF with branded filename
      const currentDate = new Date().toLocaleDateString('en-IN').replace(/\//g, '-');
      pdf.save(`WorkSocial-EMI-Report-${currentDate}.pdf`);
    } catch(error) {
      console.error("Error generating PDF:", error);
      alert("There was a problem generating the PDF. Please try again.");
    }
  };

  // Download amortization schedule as Excel
  const downloadExcel = () => {
    if (amortizationData.length === 0) {
      alert('Please calculate EMI first');
      return;
    }

    // Create workbook and add sheets
    const wb = XLSX.utils.book_new();
    
    // Summary sheet with loan details
    const summary_data = [
      ['EMI Calculator - Loan Summary'],
      [''],
      ['Loan Details'],
      ['Loan Amount', loanAmount],
      ['Interest Rate', `${interestRate}%`],
      ['Tenure', `${tenureValue} ${tenureType}`],
      ['EMI Start Date', new Date(startDate).toLocaleDateString('en-IN')],
      [''],
      ['Results'],
      ['Monthly EMI', results.monthlyEMI],
      ['Total Interest', results.totalInterest],
      ['Total Amount', results.totalAmount],
      ['Interest to Principal Ratio', `${((results.totalInterest / loanAmount) * 100).toFixed(2)}%`],
    ];
    
    // Create summary worksheet
    const summary_ws = XLSX.utils.aoa_to_sheet(summary_data);
    
    // Set column widths for summary sheet
    const summary_cols = [
      { wch: 20 }, // Column A width
      { wch: 15 }  // Column B width
    ];
    summary_ws['!cols'] = summary_cols;
    
    // Amortization schedule worksheet
    const amort_data = [
      ['Complete Amortization Schedule'],
      [''],
      ['Month', 'Date', 'EMI (₹)', 'Principal (₹)', 'Interest (₹)', 'Balance (₹)'],
      ...amortizationData.map(row => [
        row.month,
        row.date.toLocaleDateString('en-IN'),
        Math.round(row.emi),
        Math.round(row.principal),
        Math.round(row.interest),
        Math.round(row.balance)
      ])
    ];
    
    const amort_ws = XLSX.utils.aoa_to_sheet(amort_data);
    
    // Set column widths for amortization sheet
    const amort_cols = [
      { wch: 8 },  // Month
      { wch: 12 }, // Date
      { wch: 12 }, // EMI
      { wch: 12 }, // Principal
      { wch: 12 }, // Interest
      { wch: 15 }  // Balance
    ];
    amort_ws['!cols'] = amort_cols;
    
    // Yearly summary worksheet
    const yearly_summary = [];
    let currentYear = 1;
    let yearlyInterest = 0;
    let yearlyPrincipal = 0;
    
    // Header row for yearly summary
    yearly_summary.push(['Year', 'Principal Paid (₹)', 'Interest Paid (₹)', 'Total Payment (₹)', 'Remaining Balance (₹)']);
    
    // Calculate yearly totals
    amortizationData.forEach((row, index) => {
      const rowYear = Math.floor(index / 12) + 1;
      
      if (rowYear > currentYear) {
        // Add previous year's data
        yearly_summary.push([
          `Year ${currentYear}`,
          Math.round(yearlyPrincipal),
          Math.round(yearlyInterest),
          Math.round(yearlyPrincipal + yearlyInterest),
          Math.round(amortizationData[index-1].balance)
        ]);
        
        // Reset for new year
        currentYear = rowYear;
        yearlyInterest = 0;
        yearlyPrincipal = 0;
      }
      
      yearlyInterest += row.interest;
      yearlyPrincipal += row.principal;
      
      // Add last year if it's the final entry
      if (index === amortizationData.length - 1) {
        yearly_summary.push([
          `Year ${currentYear}`,
          Math.round(yearlyPrincipal),
          Math.round(yearlyInterest),
          Math.round(yearlyPrincipal + yearlyInterest),
          Math.round(row.balance)
        ]);
      }
    });
    
    const yearly_ws = XLSX.utils.aoa_to_sheet(yearly_summary);
    
    // Set column widths for yearly summary
    const yearly_cols = [
      { wch: 10 }, // Year
      { wch: 18 }, // Principal Paid
      { wch: 18 }, // Interest Paid
      { wch: 18 }, // Total Payment
      { wch: 20 }  // Remaining Balance
    ];
    yearly_ws['!cols'] = yearly_cols;
    
    // Add all sheets to workbook
    XLSX.utils.book_append_sheet(wb, summary_ws, 'Loan Summary');
    XLSX.utils.book_append_sheet(wb, yearly_ws, 'Yearly Summary');
    XLSX.utils.book_append_sheet(wb, amort_ws, 'Monthly Schedule');
    
    // Generate Excel file
    XLSX.writeFile(wb, 'EMI-Complete-Analysis.xlsx');
  };

  // Share via WhatsApp
  const shareWhatsApp = () => {
    const tenureMonths = tenureType === "years" ? tenureValue * 12 : tenureValue;
    const tenureYears = tenureType === "years" ? tenureValue : Math.round((tenureValue / 12) * 10) / 10;
    
    const message = `EMI summary — WorkSocial India
Loan: ${formatCurrency(loanAmount)}
Tenure: ${tenureMonths} months (${tenureYears} years)
Monthly EMI: ${formatCurrency(results.monthlyEMI)}
Interest Paid (total): ${formatCurrency(results.totalInterest)}
Principal Repaid (total): ${formatCurrency(loanAmount)}
Total Payment: ${formatCurrency(results.totalAmount)}
Calculate yours: https://www.worksocial.in/calculators/emi`;
    
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // Share on other platforms
  const shareOn = (platform) => {
    const message = `My EMI calculation for a ${formatCurrency(loanAmount)} loan: Monthly EMI ${formatCurrency(results.monthlyEMI)}`;
    const url = window.location.href;
    
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
    
    setShowShareModal(false);
  };

  // Copy link to clipboard
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('Link copied to clipboard!');
      setShowShareModal(false);
    });
  };

  // Share via email
  const shareViaEmail = () => {
    const subject = 'EMI Calculation Results';
    const body = `Check out my EMI calculation:\n\nLoan Amount: ${formatCurrency(loanAmount)}\nInterest Rate: ${interestRate}%\nTenure: ${tenureValue} ${tenureType}\nMonthly EMI: ${formatCurrency(results.monthlyEMI)}\nTotal Interest: ${formatCurrency(results.totalInterest)}\n\nView details: ${window.location.href}`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
    setShowShareModal(false);
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
          <h1 className="text-3xl md:text-4xl font-bold text-center mt-4">💰 EMI Calculator</h1>
          <p className="text-center mt-2 text-blue-100">Complete Loan Analysis & Planning Tool</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="flex flex-col xl:flex-row gap-4 md:gap-6">
          {/* Mobile-first: Stack all sections vertically on mobile, horizontal on xl screens */}
          
          {/* Loan Details Section - Full width on mobile, 25% on xl */}
          <div className="xl:w-1/4 flex flex-col order-1 xl:order-1">
            <div className={`bg-white rounded-xl ${styles.cardShadow} p-4 md:p-6 flex-grow`}>
              <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Calculator className="mr-2 h-4 w-4 md:h-5 md:w-5 text-blue-600" />
                Loan Details
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

            {/* Other Calculators - Hide on mobile for better UX */}
            <div className={`bg-white rounded-xl ${styles.cardShadow} p-4 mt-4 h-auto hidden md:block`}>
              <h3 className="text-lg font-bold text-gray-800 mb-3">🔧 Other Calculators</h3>
              <div className="space-y-2">
                <Link to="/calculators/part-payment" className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-blue-50 rounded-lg transition duration-300 border border-gray-200 flex items-center">
                  <span className="font-medium text-sm">💳 Part Payment Calculator</span>
                </Link>
                <Link to="/calculators/eligibility" className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-blue-50 rounded-lg transition duration-300 border border-gray-200 flex items-center">
                  <span className="font-medium text-sm">✅ Loan Eligibility Calculator</span>
                </Link>
                <Link to="/calculators/amortization" className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-blue-50 rounded-lg transition duration-300 border border-gray-200 flex items-center">
                  <span className="font-medium text-sm">📈 Advanced Amortization</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Results Section - Full width on mobile, reorder for mobile priority */}
          <div className="xl:w-[30%] flex flex-col order-2 xl:order-2">
            {/* EMI Results */}
            <div className={`bg-white rounded-xl ${styles.cardShadow} p-4 md:p-6 flex-grow`}>
              <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center">
                <TrendingUp className="mr-2 h-4 w-4 md:h-5 md:w-5 text-green-600" />
                EMI Results
              </h2>
              
              {/* Mobile: Horizontal layout for key metrics */}
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

              {/* Chart - Responsive height */}
              <div className="relative h-48 md:h-60 mb-4">
                <canvas ref={chartRef}></canvas>
              </div>

              {/* Empty placeholder - removed buttons from here */}
            </div>
          </div>

          {/* Amortization Schedule - Full width on mobile, last on mobile */}
          <div className="xl:w-[45%] flex flex-col order-3 xl:order-3">
            {/* Amortization Chart Summary */}
            <div className={`bg-white rounded-xl ${styles.cardShadow} p-4 md:p-6 mb-4`}>
              <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-3 flex items-center">
                <PieChart className="mr-2 h-4 w-4 md:h-5 md:w-5 text-purple-600" />
                Amortization Summary
              </h2>
              
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-xs text-gray-500">Total Interest</p>
                  <p className="font-bold text-sm md:text-base text-blue-600">{formatCurrency(results.totalInterest)}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-xs text-gray-500">Total Principal</p>
                  <p className="font-bold text-sm md:text-base text-green-600">{formatCurrency(loanAmount)}</p>
                </div>
              </div>
              

              
              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>Loan Progress</span>
                  <span>{Math.min(100, Math.round((results.totalInterest / (results.totalAmount)) * 100))}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${Math.min(100, Math.round((results.totalInterest / (results.totalAmount)) * 100))}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            {/* Amortization Schedule */}
            <div className={`bg-white rounded-xl ${styles.cardShadow} p-4 md:p-6 flex-grow`}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-0 flex items-center">
                  <Table className="mr-2 h-4 w-4 md:h-5 md:w-5 text-orange-600" />
                  Monthly Schedule
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
              
              <div className="overflow-x-auto -mx-4 md:mx-0">
                <div className={selectedYear === "all" ? "max-h-[400px] md:max-h-[500px] overflow-y-auto" : ""}>
                  <table className="w-full text-sm min-w-[500px]">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                      <tr>
                        <th className="sticky left-0 bg-gray-50 px-2 md:px-3 py-2 text-left font-medium text-gray-700 text-xs whitespace-nowrap border-r border-gray-200">
                          {selectedYear === "all" ? "Month/Payment" : "Month"}
                        </th>
                        <th className="px-2 md:px-3 py-2 text-left font-medium text-gray-700 text-xs whitespace-nowrap">EMI</th>
                        <th className="px-2 md:px-3 py-2 text-left font-medium text-gray-700 text-xs whitespace-nowrap">Principal</th>
                        <th className="px-2 md:px-3 py-2 text-left font-medium text-gray-700 text-xs whitespace-nowrap">Interest</th>
                        <th className="px-2 md:px-3 py-2 text-left font-medium text-gray-700 text-xs whitespace-nowrap">Balance</th>
                      </tr>
                    </thead>
                  <tbody>
                    {getYearlyAmortizationData().length > 0 ? (
                      getYearlyAmortizationData().map((data, index) => {
                        // Add year separator for complete view
                        const isNewYear = selectedYear === "all" && index > 0 && 
                          Math.floor((index - 1) / 12) !== Math.floor(index / 12);
                        
                        return (
                          <React.Fragment key={index}>
                            {isNewYear && (
                              <tr className="bg-blue-50">
                                <td colSpan="5" className="sticky left-0 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700">
                                  Year {Math.floor(index / 12) + 1}
                                </td>
                              </tr>
                            )}
                            <tr className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="sticky left-0 bg-white hover:bg-gray-50 px-2 md:px-3 py-3 md:py-2 text-xs border-r border-gray-200">
                                <div className="flex flex-col sm:flex-row sm:justify-between">
                                  <span className="font-medium">{data.date.toLocaleDateString('en-IN', {month: 'short', year: 'numeric'})}</span>
                                  {selectedYear === "all" && <span className="text-gray-500">#{data.month}</span>}
                                </div>
                              </td>
                              <td className="px-2 md:px-3 py-3 md:py-2 text-xs font-medium">{formatCurrency(data.emi)}</td>
                              <td className="px-2 md:px-3 py-3 md:py-2 text-xs text-green-600 font-medium">{formatCurrency(data.principal)}</td>
                              <td className="px-2 md:px-3 py-3 md:py-2 text-xs text-red-600 font-medium">{formatCurrency(data.interest)}</td>
                              <td className="px-2 md:px-3 py-3 md:py-2 text-xs text-blue-600 font-medium">{formatCurrency(data.balance)}</td>
                            </tr>
                          </React.Fragment>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-3 py-6 text-center text-gray-500 text-xs">
                          Select a year to view monthly breakdown
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
        
        {/* Action Buttons - Full Width with mobile-first design */}
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
                  <div className="relative p-1 flex items-center justify-center">
                    <FileText className="h-6 w-6 md:h-7 md:w-9" />
                  </div>
                  <span className="text-xs font-medium">PDF Report</span>
                </button>
                
                <button 
                  onClick={downloadExcel} 
                  className="flex-1 md:flex-none md:w-20 px-3 py-3 bg-white border-2 border-green-400 shadow-md text-green-600 hover:bg-green-50 rounded-lg transition duration-300 flex flex-col items-center justify-center gap-1 touch-manipulation"
                >
                  <div className="relative p-1 flex items-center justify-center">
                    <Table className="h-6 w-6 md:h-7 md:w-9" />
                  </div>
                  <span className="text-xs font-medium">Excel Sheet</span>
                </button>
                
                <button 
                  onClick={shareWhatsApp} 
                  className="flex-1 md:flex-none md:w-20 px-3 py-3 bg-white border-2 border-green-400 shadow-md text-green-500 hover:bg-green-50 rounded-lg transition duration-300 flex flex-col items-center justify-center gap-1 touch-manipulation"
                >
                  <div className="relative bg-green-500 rounded-full p-1 flex items-center justify-center">
                    <MessageCircle className="h-5 w-5 md:h-7 md:w-9 text-white" />
                  </div>
                  <span className="text-xs font-medium">WhatsApp</span>
                </button>
                
                <button 
                  onClick={() => setShowShareModal(true)} 
                  className="flex-1 md:flex-none md:w-20 px-3 py-3 bg-white border-2 border-blue-400 shadow-md text-blue-600 hover:bg-blue-50 rounded-lg transition duration-300 flex flex-col items-center justify-center gap-1 touch-manipulation"
                >
                  <div className="relative p-1 flex items-center justify-center">
                    <Share2 className="h-6 w-6 md:h-7 md:w-9" />
                  </div>
                  <span className="text-xs font-medium">More Options</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Loan Summary Block - Full Width */}
        <div className="mb-4">
          <div className={`bg-white rounded-xl ${styles.cardShadow} p-4 md:p-6`}>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <Calculator className="mr-2 h-5 w-5 text-blue-600" />
              Loan Summary & Tips
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-blue-800 text-sm mb-2">Your Monthly EMI</h3>
                    <p className="font-bold text-lg text-blue-900">{formatCurrency(results.monthlyEMI)}</p>
                    <p className="text-xs text-blue-600 mt-1">Due every month for {tenureType === "years" ? tenureValue : Math.ceil(tenureValue/12)} years</p>
                  </div>
                  <CreditCard className="h-8 w-8 text-blue-400 opacity-80" />
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-green-800 text-sm mb-2">Interest Cost</h3>
                    <p className="font-bold text-lg text-green-900">{formatCurrency(results.totalInterest)}</p>
                    <p className="text-xs text-green-600 mt-1">{((results.totalInterest / loanAmount) * 100).toFixed(1)}% of your principal</p>
                  </div>
                  <Percent className="h-8 w-8 text-green-400 opacity-80" />
                </div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-purple-800 text-sm mb-2">Total Repayment</h3>
                    <p className="font-bold text-lg text-purple-900">{formatCurrency(results.totalAmount)}</p>
                    <p className="text-xs text-purple-600 mt-1">Principal + Interest over full term</p>
                  </div>
                  <BadgeDollarSign className="h-8 w-8 text-purple-400 opacity-80" />
                </div>
              </div>
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-amber-800 text-sm mb-2">Interest Rate</h3>
                    <p className="font-bold text-lg text-amber-900">{interestRate}% p.a.</p>
                    <p className="text-xs text-amber-600 mt-1">Fixed rate throughout tenure</p>
                  </div>
                  <Landmark className="h-8 w-8 text-amber-400 opacity-80" />
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-800 mb-2 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <span>Tips to Reduce Your EMI</span>
              </h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-blue-100 text-blue-600 p-1 text-xs mt-0.5">✓</div>
                  <span>Consider making a larger down payment to reduce your principal loan amount</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-blue-100 text-blue-600 p-1 text-xs mt-0.5">✓</div>
                  <span>Opt for a longer loan tenure to reduce monthly EMI (but this increases total interest)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full bg-blue-100 text-blue-600 p-1 text-xs mt-0.5">✓</div>
                  <span>Maintain a good credit score to negotiate better interest rates with lenders</span>
                </li>
              </ul>
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
              <button onClick={() => shareOn('facebook')} className="px-3 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm flex items-center justify-center h-11 border-2 border-blue-700 shadow-md">Facebook</button>
              <button onClick={() => shareOn('twitter')} className="px-3 py-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 text-sm flex items-center justify-center h-11 border-2 border-blue-500 shadow-md">Twitter</button>
              <button onClick={() => shareOn('linkedin')} className="px-3 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 text-sm flex items-center justify-center h-11 border-2 border-blue-800 shadow-md">LinkedIn</button>
              <button onClick={() => shareOn('telegram')} className="px-3 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm flex items-center justify-center h-11 border-2 border-blue-600 shadow-md">Telegram</button>
              <button onClick={copyLink} className="px-3 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm flex items-center justify-center h-11 border-2 border-gray-700 shadow-md">Copy Link</button>
              <button onClick={shareViaEmail} className="px-3 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm flex items-center justify-center h-11 border-2 border-red-700 shadow-md">Email</button>
            </div>
            <button onClick={() => setShowShareModal(false)} className="w-auto mx-auto mt-5 px-3 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 h-11 flex items-center justify-center border-2 border-gray-400 shadow-md">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmiCalculator;
