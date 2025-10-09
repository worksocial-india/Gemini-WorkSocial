import React, { useState, useEffect, useCallback } from 'react';
import CalculatorSidebar from './CalculatorSidebar';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const ProRataCalculator = () => {
    // State for user inputs
    const [propertyName, setPropertyName] = useState('Sample Property');
    const [propertyLocation, setPropertyLocation] = useState('Sample Location');
    const [propertyType, setPropertyType] = useState('Villa');
    const [propertySize, setPropertySize] = useState(1200);
    const [propertyCost, setPropertyCost] = useState(5000000);
    const [gstApplicableAmount, setGstApplicableAmount] = useState(5000000);
    const [gstRate, setGstRate] = useState(5);
    const [numberOfDemands, setNumberOfDemands] = useState(5);
    const [ltv, setLtv] = useState(80);
    const [requiredLoanAmount, setRequiredLoanAmount] = useState(4000000);

    // State for calculated values
    const [gstAmount, setGstAmount] = useState(0);
    const [totalWithGst, setTotalWithGst] = useState(0);
    const [maxEligibleLoan, setMaxEligibleLoan] = useState(0);
    const [downPayment, setDownPayment] = useState(0);
    const [bankPercentage, setBankPercentage] = useState(0);
    const [customerPercentage, setCustomerPercentage] = useState(0);
    const [proRataRatioBank, setProRataRatioBank] = useState('0%');
    const [proRataRatioCustomer, setProRataRatioCustomer] = useState('0%');

    // State for tables
    const [paymentSchedule, setPaymentSchedule] = useState([]);
    const [proRataSchedule, setProRataSchedule] = useState([]);

    // --- Main Calculation Logic ---
    const calculateAll = useCallback(() => {
        const cost = Number(propertyCost) || 0;
        const gstAmountVal = (Number(gstApplicableAmount) * Number(gstRate)) / 100;
        const total = cost + gstAmountVal;

        setGstAmount(gstAmountVal);
        setTotalWithGst(total);

        let currentLtv = Number(ltv) || 0;
        let eligibleLoan = 0;
        if (total <= 3000000) {
            currentLtv = Math.min(currentLtv, 90);
        } else if (total > 3000000 && total <= 7500000) {
            currentLtv = Math.min(currentLtv, 80);
        } else {
            currentLtv = Math.min(currentLtv, 75);
        }
        eligibleLoan = (total * currentLtv) / 100;
        
        setLtv(currentLtv);
        setMaxEligibleLoan(eligibleLoan);

        const loanAmount = Number(requiredLoanAmount) || 0;
        const downPaymentVal = total - loanAmount;
        setDownPayment(downPaymentVal);

        const bankPercent = total > 0 ? (loanAmount / total) * 100 : 0;
        const customerPercent = total > 0 ? (downPaymentVal / total) * 100 : 0;
        setBankPercentage(bankPercent);
        setCustomerPercentage(customerPercent);

        if (bankPercent > 0 || customerPercent > 0) {
            const roundedBankPercentage = Math.ceil(bankPercent);
            const roundedCustomerPercentage = 100 - roundedBankPercentage;
            setProRataRatioBank(`${roundedBankPercentage}%`);
            setProRataRatioCustomer(`${roundedCustomerPercentage}%`);
        } else {
            setProRataRatioBank('0%');
            setProRataRatioCustomer('0%');
        }
    }, [propertyCost, gstApplicableAmount, gstRate, ltv, requiredLoanAmount]);

    // --- Effects to run calculations and update schedules ---
    useEffect(() => {
        calculateAll();
    }, [calculateAll]);

    useEffect(() => {
        const demands = parseInt(numberOfDemands, 10);
        if (demands > 0) {
            const initialPercentage = (100 / demands);
            const newSchedule = Array.from({ length: demands }, (_, i) => ({
                id: i,
                demandName: `Demand ${i + 1}`,
                percentage: initialPercentage.toFixed(2),
            }));
            setPaymentSchedule(newSchedule);
        }
    }, [numberOfDemands]);

    useEffect(() => {
        const bankRatio = parseFloat(proRataRatioBank.replace('%', '')) / 100;
        const customerRatio = parseFloat(proRataRatioCustomer.replace('%', '')) / 100;

        const newProRataSchedule = paymentSchedule.map((paymentRow, index) => {
            const amount = (totalWithGst * Number(paymentRow.percentage)) / 100;
            let bankContribution = 0;
            let customerContribution = 0;

            // Logic from the original script
            const isFirstDemand = index === 0;
            const isLastDemand = index === paymentSchedule.length - 1;
            const shouldApplyProRata = index >= 2 && !isLastDemand && paymentSchedule.length > 3;

            if (shouldApplyProRata) {
                bankContribution = amount * bankRatio;
                customerContribution = amount * customerRatio;
            } else {
                if (isFirstDemand) {
                    customerContribution = amount;
                }
                bankContribution = amount - customerContribution;
            }
            
            return {
                ...paymentRow,
                amount: amount,
                bankContribution: bankContribution,
                bankPercentage: totalWithGst > 0 ? (bankContribution / totalWithGst) * 100 : 0,
                customerContribution: customerContribution,
                ocPercentage: totalWithGst > 0 ? (customerContribution / totalWithGst) * 100 : 0,
            };
        });
        setProRataSchedule(newProRataSchedule);
    }, [paymentSchedule, totalWithGst, proRataRatioBank, proRataRatioCustomer]);


    // --- Handlers ---
    const handlePaymentScheduleChange = (index, field, value) => {
        const newSchedule = [...paymentSchedule];
        newSchedule[index][field] = value;
        setPaymentSchedule(newSchedule);
    };
    
    const handleProRataCustomerChange = (index, value) => {
        const newSchedule = [...proRataSchedule];
        const row = newSchedule[index];
        const customerContribution = Math.min(Number(value) || 0, row.amount);
        
        row.customerContribution = customerContribution;
        row.bankContribution = row.amount - customerContribution;
        row.bankPercentage = totalWithGst > 0 ? (row.bankContribution / totalWithGst) * 100 : 0;
        row.ocPercentage = totalWithGst > 0 ? (customerContribution / totalWithGst) * 100 : 0;

        setProRataSchedule(newSchedule);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'Home Loan Pro-Rata Calculator',
                text: 'Check out this Home Loan Pro-Rata Calculator!',
                url: window.location.href,
            })
            .then(() => console.log('Successful share'))
            .catch((error) => console.log('Error sharing', error));
        } else {
            alert('Web Share API is not supported in your browser.');
        }
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

    const generatePdf = () => {
        try {
            // Create new PDF document with improved settings
            const doc = new jsPDF({
                orientation: 'landscape',
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
            doc.text('Home Loan Pro-rata Payment Calculator', doc.internal.pageSize.getWidth() / 2, 20, { align: 'center' });
            
            // Add property details section
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.setDrawColor(220, 220, 220);
            doc.roundedRect(14, 25, 268, 40, 3, 3, 'S'); // Draw border around property details
            
            // Property details with improved formatting
            doc.setFontSize(11);
            doc.text(`Property: ${propertyName}`, 20, 35);
            doc.text(`Location: ${propertyLocation}`, 20, 45);
            doc.text(`Type: ${propertyType}`, 20, 55);
            
            doc.text(`Size: ${propertySize} sq ft`, 150, 35);
            doc.text(`Property Cost: ${formatCurrencyForPDF(propertyCost)}`, 150, 45);
            doc.text(`Total with GST: ${formatCurrencyForPDF(totalWithGst)}`, 150, 55);
            
            // Add payment schedule table
            if (paymentSchedule.length > 0) {
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(14);
                doc.text('Payment Schedule', 20, 80);
                
                const scheduleColumns = ["Demand", "Percentage (%)", "Amount (Rs.)"];
                const scheduleRows = paymentSchedule.map(row => [
                    row.demand || '',
                    `${row.percentage}%`,
                    formatCurrencyForPDF(row.amount)
                ]);
                
                doc.autoTable({
                    head: [scheduleColumns],
                    body: scheduleRows,
                    startY: 85,
                    margin: { left: 20, right: 20 },
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
                        0: { halign: 'center' },
                        1: { halign: 'center' },
                        2: { halign: 'right' }
                    },
                    alternateRowStyles: { 
                        fillColor: [248, 249, 250] 
                    }
                });
            }
            
            // Add pro-rata schedule table
            if (proRataSchedule.length > 0) {
                const currentY = doc.lastAutoTable?.finalY || 120;
                
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(14);
                doc.text('Pro-rata Schedule', 20, currentY + 15);
                
                const proRataColumns = ["Demand", "Amount (Rs.)", "Bank Contribution (Rs.)", "Customer Contribution (Rs.)", "Bank %", "Customer %"];
                const proRataRows = proRataSchedule.map(row => [
                    row.demand || '',
                    formatCurrencyForPDF(row.amount),
                    formatCurrencyForPDF(row.bankContribution),
                    formatCurrencyForPDF(row.customerContribution),
                    `${(row.bankPercentage || 0).toFixed(1)}%`,
                    `${(row.ocPercentage || 0).toFixed(1)}%`
                ]);
                
                doc.autoTable({
                    head: [proRataColumns],
                    body: proRataRows,
                    startY: currentY + 20,
                    margin: { left: 20, right: 20 },
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
                        0: { halign: 'center' },
                        1: { halign: 'right' },
                        2: { halign: 'right' },
                        3: { halign: 'right' },
                        4: { halign: 'center' },
                        5: { halign: 'center' }
                    },
                    alternateRowStyles: { 
                        fillColor: [248, 249, 250] 
                    }
                });
            }
            
            // Add footer with generation date and branding
            const finalY = doc.lastAutoTable?.finalY || 150;
            if (finalY < 180) {
                doc.setFontSize(9);
                doc.setTextColor(128, 128, 128);
                doc.text(`Generated on: ${new Date().toLocaleDateString('en-IN')}`, 20, finalY + 20);
                doc.text('Powered by WorkSocial India', doc.internal.pageSize.getWidth() - 20, finalY + 20, { align: 'right' });
            }
            
            // Save the PDF
            doc.save(`pro-rata-calculation-${new Date().getTime()}.pdf`);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try again.');
        }
    };

    // --- Totals Calculation ---
    const scheduleTotals = paymentSchedule.reduce((acc, row) => {
        acc.percentage += Number(row.percentage) || 0;
        acc.amount += (totalWithGst * Number(row.percentage)) / 100;
        return acc;
    }, { percentage: 0, amount: 0 });

    const proRataTotals = proRataSchedule.reduce((acc, row) => {
        acc.percentage += Number(row.percentage) || 0;
        acc.amount += row.amount || 0;
        acc.bank += row.bankContribution || 0;
        acc.customer += row.customerContribution || 0;
        acc.bankPercentage += row.bankPercentage || 0;
        acc.ocPercentage += row.ocPercentage || 0;
        return acc;
    }, { percentage: 0, amount: 0, bank: 0, customer: 0, bankPercentage: 0, ocPercentage: 0 });

    return (
        <div className="flex">
            <div className="hidden lg:block">
                <CalculatorSidebar />
            </div>
            <div className="flex-grow">
                <div className="calculator-container p-4 md:p-6 mx-auto" id="calculatorContent" style={{ maxWidth: '1200px' }}>
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 mb-6 text-white">
                        <h1 className="text-2xl md:text-3xl font-bold mb-2">Home loan Pro rata Payment calculator</h1>
                        <p className="opacity-90">Calculate your loan details, payment schedule, and more</p>
                    </div>

                    {/* 1. Property Details */}
                    <div className="section">
                        <div className="section-header">1. Property Details</div>
                        <div className="p-4 md:p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Property Name</label>
                                    <input type="text" value={propertyName} onChange={e => setPropertyName(e.target.value)} className="form-input" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Property Location</label>
                                    <input type="text" value={propertyLocation} onChange={e => setPropertyLocation(e.target.value)} className="form-input" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                                    <select value={propertyType} onChange={e => setPropertyType(e.target.value)} className="form-select">
                                        <option>Apartment</option>
                                        <option>Villa</option>
                                        <option>Plot</option>
                                        <option>Commercial</option>
                                        <option>Flat</option>
                                        <option>Shop</option>
                                        <option>Studio Apartment</option>
                                        <option>Floor</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Property Size (sq.ft)</label>
                                    <input type="number" value={propertySize} onChange={e => setPropertySize(e.target.value)} className="form-input" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* 2. Cost Configuration */}
                        <div className="section">
                            <div className="section-header">2. Cost Configuration</div>
                            <div className="p-4 md:p-6">
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Property Cost (₹)</label>
                                            <input type="number" value={propertyCost} onChange={e => setPropertyCost(e.target.value)} className="form-input" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">GST Applicable Amount (₹)</label>
                                            <input type="number" value={gstApplicableAmount} onChange={e => setGstApplicableAmount(e.target.value)} className="form-input" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">GST Rate (%)</label>
                                            <input type="number" value={gstRate} onChange={e => setGstRate(e.target.value)} className="form-input" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">GST Amount (₹)</label>
                                            <input type="number" value={gstAmount.toFixed(2)} className="form-input" readOnly />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount with GST (₹)</label>
                                            <input type="number" value={totalWithGst.toFixed(2)} className="form-input" readOnly />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Demands</label>
                                            <select value={numberOfDemands} onChange={e => setNumberOfDemands(e.target.value)} className="form-select">
                                                {Array.from({ length: 20 }, (_, i) => i + 1).map(n => <option key={n} value={n}>{n}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 3. Loan Detail */}
                        <div className="section">
                            <div className="section-header">3. Loan Detail</div>
                            <div className="p-4 md:p-6">
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Max Eligible Loan (₹)</label>
                                            <input type="number" value={maxEligibleLoan.toFixed(2)} className="form-input" readOnly />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">LTV Possible (%)</label>
                                            <input type="number" value={ltv} onChange={e => setLtv(e.target.value)} className="form-input" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Sanctioned Loan Amount (₹)</label>
                                            <input type="number" value={requiredLoanAmount} onChange={e => setRequiredLoanAmount(e.target.value)} className="form-input" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Bank LTV (%)</label>
                                            <input type="number" value={bankPercentage.toFixed(2)} className="form-input" readOnly />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Own Contribution Payment (₹)</label>
                                            <input type="number" value={downPayment.toFixed(2)} className="form-input" readOnly />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Customer OC (%)</label>
                                            <input type="number" value={customerPercentage.toFixed(2)} className="form-input" readOnly />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. Payment Schedule */}
                    <div className="section mt-6">
                        <div className="section-header">4. Payment Schedule</div>
                        <div className="p-4 md:p-6">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Demand</th>
                                            <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage (%)</th>
                                            <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (₹)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {paymentSchedule.map((row, index) => (
                                            <tr key={row.id} className="payment-row">
                                                <td className="px-4 py-3">
                                                    <input type="text" value={row.demandName} onChange={e => handlePaymentScheduleChange(index, 'demandName', e.target.value)} className="form-input w-full" />
                                                </td>
                                                <td className="px-4 py-3">
                                                    <input type="number" value={row.percentage} onChange={e => handlePaymentScheduleChange(index, 'percentage', e.target.value)} className="form-input w-full" />
                                                </td>
                                                <td className="px-4 py-3">
                                                    <input type="text" value={((totalWithGst * Number(row.percentage)) / 100).toLocaleString('en-IN', { maximumFractionDigits: 2 })} className="form-input w-full" readOnly />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td className="px-4 py-3 font-medium">Total</td>
                                            <td className="px-4 py-3 font-medium">{scheduleTotals.percentage.toFixed(2)}%</td>
                                            <td className="px-4 py-3 font-medium">Rs.{scheduleTotals.amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* 5. Pro Rata Ratio */}
                    <div className="section mt-6">
                        <div className="section-header bg-gradient-to-r from-green-600 to-blue-600">5. Pro Rata Ratio</div>
                        <div className="p-4 md:p-6 bg-gradient-to-r from-green-50 to-blue-50">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="text-center">
                                    <label className="block text-sm font-semibold text-gray-800 mb-2">Bank Contribution</label>
                                    <div className="bg-white rounded-lg p-4 border-2 border-green-200 shadow-sm">
                                        <input type="text" value={proRataRatioBank} className="form-input text-center text-lg font-bold text-green-700 bg-transparent border-0" readOnly />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <label className="block text-sm font-semibold text-gray-800 mb-2">Customer Contribution</label>
                                    <div className="bg-white rounded-lg p-4 border-2 border-blue-200 shadow-sm">
                                        <input type="text" value={proRataRatioCustomer} className="form-input text-center text-lg font-bold text-blue-700 bg-transparent border-0" readOnly />
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6 mt-6">
                                <div className="text-center">
                                    <label className="block text-sm font-semibold text-gray-800 mb-2">Sanctioned Loan Amount (₹)</label>
                                    <div className="bg-white rounded-lg p-4 border-2 border-gray-200 shadow-sm">
                                        <input type="text" value={`Rs.${(Number(requiredLoanAmount) || 0).toLocaleString('en-IN')}`} className="form-input text-center text-lg font-bold text-gray-700 bg-transparent border-0" readOnly />
                                    </div>
                                </div>
                                <div className="text-center">
                                    <label className="block text-sm font-semibold text-gray-800 mb-2">Own Contribution Payment (₹)</label>
                                    <div className="bg-white rounded-lg p-4 border-2 border-gray-200 shadow-sm">
                                        <input type="text" value={`Rs.${(downPayment || 0).toLocaleString('en-IN')}`} className="form-input text-center text-lg font-bold text-gray-700 bg-transparent border-0" readOnly />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 6. Pro-Rata Calculation */}
                    <div className="section mt-6">
                        <div className="section-header">6. Pro-Rata Calculation</div>
                        <div className="p-4 md:p-6">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Demand</th>
                                            <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage (%)</th>
                                            <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (₹)</th>
                                            <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bank Contribution (₹)</th>
                                            <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bank (%)</th>
                                            <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer Contribution (₹)</th>
                                            <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">OC (%)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {proRataSchedule.map((row, index) => {
                                            const isEditable = index !== proRataSchedule.length - 1;
                                            return (
                                                <tr key={row.id} className="payment-row">
                                                    <td className="px-4 py-3">{row.demandName}</td>
                                                    <td className="px-4 py-3">{row.percentage}</td>
                                                    <td className="px-4 py-3">Rs.{row.amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                                                    <td className="px-4 py-3">Rs.{row.bankContribution.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                                                    <td className="px-4 py-3">{row.bankPercentage.toFixed(2)}%</td>
                                                    <td className="px-4 py-3">
                                                        <input 
                                                            type="number" 
                                                            value={row.customerContribution}
                                                            onChange={e => handleProRataCustomerChange(index, e.target.value)}
                                                            className={`form-input w-full ${isEditable ? 'bg-yellow-100' : 'bg-gray-100'}`}
                                                            readOnly={!isEditable}
                                                        />
                                                    </td>
                                                    <td className="px-4 py-3">{row.ocPercentage.toFixed(2)}%</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td className="px-4 py-3 font-medium">Total</td>
                                            <td className="px-4 py-3 font-medium">{proRataTotals.percentage.toFixed(2)}%</td>
                                            <td className="px-4 py-3 font-medium">Rs.{proRataTotals.amount.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                                            <td className="px-4 py-3 font-medium">Rs.{proRataTotals.bank.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                                            <td className="px-4 py-3 font-medium">{proRataTotals.bankPercentage.toFixed(2)}%</td>
                                            <td className="px-4 py-3 font-medium">Rs.{proRataTotals.customer.toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                                            <td className="px-4 py-3 font-medium">{proRataTotals.ocPercentage.toFixed(2)}%</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* 7. Share */}
                    <div className="section mt-6">
                        <div className="section-header">7. Share</div>
                        <div className="p-4 md:p-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <button onClick={handleShare} className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-md flex items-center justify-center">
                                    Share
                                </button>
                                <button onClick={generatePdf} className="bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-md flex items-center justify-center">
                                    Download as PDF
                                </button>
                                <a href="https://calculators.worksocial.in/" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-md flex items-center justify-center">
                                    More Calculators
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProRataCalculator;

