import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const loanTypes = {
    home: { 
        name: 'Home Loan', 
        icon: '🏠',
        maxAmount: 150000000, // 15 Crore
        maxRate: 20,
        maxTenure: 30
    },
    personal: { 
        name: 'Personal Loan', 
        icon: '💰',
        maxAmount: 10000000, // 1 Crore
        maxRate: 36,
        maxTenure: 10
    },
    car: { 
        name: 'Car Loan', 
        icon: '🚗',
        maxAmount: 20000000, // 2 Crore
        maxRate: 16,
        maxTenure: 10
    },
    business: { 
        name: 'Business Loan', 
        icon: '💼',
        maxAmount: 10000000, // 1 Crore
        maxRate: 24,
        maxTenure: 7
    },
    property: { 
        name: 'Loan Against Property', 
        icon: '🏢',
        maxAmount: 200000000, // 20 Crore
        maxRate: 15,
        maxTenure: 20
    },
    education: { 
        name: 'Education Loan', 
        icon: '🎓',
        maxAmount: 10000000, // 1 Crore
        maxRate: 15,
        maxTenure: 15
    },
    all: { 
        name: 'All in One', 
        icon: '📊',
        maxAmount: 500000000, // 50 Crore
        maxRate: 48,
        maxTenure: 30
    }
};

function EmiCalculator() {
    const [loanType, setLoanType] = useState('home');
    const [amount, setAmount] = useState(2500000);
    const [rate, setRate] = useState(8.5);
    const [tenure, setTenure] = useState(20);
    const [tenureType, setTenureType] = useState('years');
    const [emi, setEmi] = useState(0);
    const [totalInterest, setTotalInterest] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);
    const [amortizationData, setAmortizationData] = useState([]);
    const [startDate, setStartDate] = useState(new Date().toISOString().substring(0, 7));

    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    const formatCurrency = (value) => {
        if (value >= 10000000) {
            return '₹' + (value / 10000000).toFixed(2) + ' Cr';
        } else if (value >= 100000) {
            return '₹' + (value / 100000).toFixed(2) + ' L';
        } else {
            return '₹' + Math.round(value).toLocaleString('en-IN');
        }
    };

    useEffect(() => {
        const currentLoan = loanTypes[loanType];
        if (tenureType === 'years' && tenure > currentLoan.maxTenure) {
            setTenure(currentLoan.maxTenure);
        }
        if (tenureType === 'months' && tenure > currentLoan.maxTenure * 12) {
            setTenure(currentLoan.maxTenure * 12);
        }
        if (amount > currentLoan.maxAmount) {
            setAmount(Math.min(2500000, currentLoan.maxAmount));
        }
        if (rate > currentLoan.maxRate) {
            setRate(Math.min(8.5, currentLoan.maxRate));
        }
    }, [loanType, tenure, tenureType, amount, rate]);

    useEffect(() => {
        const principal = amount;
        const monthlyRate = rate / 100 / 12;
        const numberOfMonths = tenureType === 'years' ? tenure * 12 : tenure;

        if (principal > 0 && monthlyRate > 0 && numberOfMonths > 0) {
            const emiValue = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) / (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
            const totalPaymentValue = emiValue * numberOfMonths;
            const totalInterestValue = totalPaymentValue - principal;

            setEmi(emiValue);
            setTotalPayment(totalPaymentValue);
            setTotalInterest(totalInterestValue);

            // Amortization calculation
            const yearlyData = [];
            let balance = principal;
            const totalYears = Math.ceil(numberOfMonths / 12);

            for (let year = 1; year <= totalYears; year++) {
                const startBalance = balance;
                let yearlyPrincipal = 0;
                let yearlyInterest = 0;
                let yearlyEMI = 0;
                
                const monthsInYear = (year === totalYears) ? (numberOfMonths % 12 || 12) : 12;
                
                for (let month = 1; month <= monthsInYear; month++) {
                    const interestPayment = balance * monthlyRate;
                    const principalPayment = emiValue - interestPayment;
                    
                    yearlyInterest += interestPayment;
                    yearlyPrincipal += principalPayment;
                    yearlyEMI += emiValue;
                    balance -= principalPayment;
                }
                
                yearlyData.push({
                    year,
                    openingBalance: startBalance,
                    emiPaid: yearlyEMI,
                    principal: yearlyPrincipal,
                    interest: yearlyInterest,
                    closingBalance: Math.max(0, balance)
                });
            }
            setAmortizationData(yearlyData);
        }
    }, [amount, rate, tenure, tenureType, startDate]);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }
        if (chartRef.current && amortizationData.length > 0) {
            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: amortizationData.map(d => `Year ${d.year}`),
                    datasets: [{
                        label: 'Principal',
                        data: amortizationData.map(d => d.principal),
                        backgroundColor: '#3b82f6',
                        borderRadius: 4
                    }, {
                        label: 'Interest',
                        data: amortizationData.map(d => d.interest),
                        backgroundColor: '#ef4444',
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: { stacked: true },
                        y: { 
                            stacked: true,
                            ticks: {
                                callback: function(value) {
                                    return formatCurrency(value);
                                }
                            }
                        }
                    },
                    plugins: {
                        legend: { position: 'top' },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `${context.dataset.label}: ${formatCurrency(context.parsed.y)}`;
                                }
                            }
                        }
                    }
                }
            });
        }
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [amortizationData]);

    const handleTenureTypeChange = (type) => {
        const currentLoan = loanTypes[loanType];
        if (type === 'years') {
            setTenureType('years');
            setTenure(Math.min(20, currentLoan.maxTenure));
        } else {
            setTenureType('months');
            setTenure(Math.min(240, currentLoan.maxTenure * 12));
        }
    };

    const currentLoanDetails = loanTypes[loanType];
    const principalPercentage = (amount / totalPayment) * 100;

    return (
        <div className="container mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full lg:w-80 bg-white rounded-xl shadow-lg p-6 h-fit">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Loan Calculators</h3>
                <div className="space-y-2">
                    {Object.entries(loanTypes).map(([key, { name, icon }]) => (
                        <div 
                            key={key}
                            className={`loan-calculator-item p-3 rounded-lg cursor-pointer transition-all duration-300 hover:bg-blue-100 hover:shadow-md hover:transform hover:scale-105 ${loanType === key ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:border-l-4 hover:border-blue-400'}`}
                            onClick={() => setLoanType(key)}
                        >
                            <div className="flex items-center space-x-3">
                                <span className="text-2xl transition-transform duration-300 hover:scale-110">{icon}</span>
                                <span className="font-medium text-gray-700 hover:text-blue-700 transition-colors duration-300">{name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
                {/* Product Tabs */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <div className="flex flex-wrap gap-4 mb-6">
                        {Object.entries(loanTypes).map(([key, { name, icon }]) => (
                            <div 
                                key={key}
                                className={`loan-tab px-6 py-3 rounded-lg cursor-pointer transition-all font-medium ${loanType === key ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                onClick={() => setLoanType(key)}
                            >
                                {icon} {name}
                            </div>
                        ))}
                    </div>

                    {/* Calculator Inputs */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Left Column - Inputs */}
                        <div className="space-y-6">
                            {/* Loan Amount */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    <span>{currentLoanDetails.name} Amount</span>
                                </label>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">₹1L</span>
                                        <span className="text-2xl font-bold text-blue-600">{formatCurrency(amount)}</span>
                                        <span className="text-sm text-gray-600">{formatCurrency(currentLoanDetails.maxAmount)}</span>
                                    </div>
                                    <input type="range" min="100000" max={currentLoanDetails.maxAmount} value={amount} 
                                           onChange={(e) => setAmount(Number(e.target.value))}
                                           className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"/>
                                    <input type="number" value={amount} 
                                           onChange={(e) => setAmount(Number(e.target.value))}
                                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                                </div>
                            </div>

                            {/* Interest Rate */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Interest Rate (% per annum)
                                </label>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">5%</span>
                                        <span className="text-2xl font-bold text-green-600">{rate}%</span>
                                        <span className="text-sm text-gray-600">{currentLoanDetails.maxRate}%</span>
                                    </div>
                                    <input type="range" min="5" max={currentLoanDetails.maxRate} step="0.1" value={rate} 
                                           onChange={(e) => setRate(Number(e.target.value))}
                                           className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"/>
                                    <input type="number" value={rate} step="0.1" 
                                           onChange={(e) => setRate(Number(e.target.value))}
                                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                                </div>
                            </div>

                            {/* Loan Tenure */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-3">
                                    Loan Tenure
                                </label>
                                <div className="space-y-3">
                                    <div className="flex space-x-4">
                                        <button onClick={() => handleTenureTypeChange('years')} className={`flex-1 py-2 px-4 rounded-lg font-medium ${tenureType === 'years' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Years</button>
                                        <button onClick={() => handleTenureTypeChange('months')} className={`flex-1 py-2 px-4 rounded-lg font-medium ${tenureType === 'months' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}>Months</button>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">{tenureType === 'years' ? '1 Year' : '12 Months'}</span>
                                        <span className="text-2xl font-bold text-purple-600">{tenure} {tenureType === 'years' ? (tenure > 1 ? 'Years' : 'Year') : (tenure > 1 ? 'Months' : 'Month')}</span>
                                        <span className="text-sm text-gray-600">{tenureType === 'years' ? `${currentLoanDetails.maxTenure} Years` : `${currentLoanDetails.maxTenure * 12} Months`}</span>
                                    </div>
                                    <input type="range" min={tenureType === 'years' ? 1 : 12} max={tenureType === 'years' ? currentLoanDetails.maxTenure : currentLoanDetails.maxTenure * 12} value={tenure} 
                                           onChange={(e) => setTenure(Number(e.target.value))}
                                           className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"/>
                                    <input type="number" value={tenure} 
                                           onChange={(e) => setTenure(Number(e.target.value))}
                                           className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Results */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-6">EMI Calculation Results</h3>
                            
                            <div className="space-y-4">
                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Monthly EMI</span>
                                        <span className="text-2xl font-bold text-blue-600">{formatCurrency(emi)}</span>
                                    </div>
                                </div>
                                
                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Total Interest</span>
                                        <span className="text-xl font-bold text-red-500">{formatCurrency(totalInterest)}</span>
                                    </div>
                                </div>
                                
                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Total Payment</span>
                                        <span className="text-xl font-bold text-green-600">{formatCurrency(totalPayment)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Breakdown Visual */}
                            <div className="mt-6">
                                <h4 className="font-semibold text-gray-700 mb-3">Payment Breakdown</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                                        <span className="text-sm text-gray-600">Principal Amount</span>
                                        <span className="ml-auto font-medium">{formatCurrency(amount)}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                                        <span className="text-sm text-gray-600">Total Interest</span>
                                        <span className="ml-auto font-medium">{formatCurrency(totalInterest)}</span>
                                    </div>
                                </div>
                                <div className="mt-3 h-4 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full" style={{ width: `${principalPercentage}%`, background: `linear-gradient(to right, #3b82f6, #ef4444)` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Amortization Section */}
                <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-gray-800">Amortization Schedule</h3>
                        <div className="flex items-center space-x-4">
                            <label className="text-sm font-medium text-gray-700">Start EMI Date:</label>
                            <input type="month" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                                   className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"/>
                        </div>
                    </div>
                    
                    {/* Yearly Chart */}
                    <div className="mb-6">
                        <canvas ref={chartRef} width="400" height="200"></canvas>
                    </div>

                    {/* Amortization Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Year</th>
                                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Opening Balance</th>
                                    <th className="px-4 py-3 text-left font-semibold text-gray-700">EMI Paid</th>
                                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Principal</th>
                                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Interest</th>
<th className="px-4 py-3 text-left font-semibold text-gray-700">Closing Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {amortizationData.map((data) => (
                                    <tr key={data.year} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium">{data.year}</td>
                                        <td className="px-4 py-3">{formatCurrency(data.openingBalance)}</td>
                                        <td className="px-4 py-3">{formatCurrency(data.emiPaid)}</td>
                                        <td className="px-4 py-3 text-blue-600">{formatCurrency(data.principal)}</td>
                                        <td className="px-4 py-3 text-red-600">{formatCurrency(data.interest)}</td>
                                        <td className="px-4 py-3">{formatCurrency(data.closingBalance)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmiCalculator;



