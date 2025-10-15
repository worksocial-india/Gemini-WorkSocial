// Utility function to share calculator results via WhatsApp
export const shareCalculatorResults = async (calculatorType, results, phoneNumber = "918882371688") => {
  // Direct share method only (no API)
  const message = formatResultsForDirectShare(calculatorType, results);
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  return { success: true, method: 'direct' };
};

// Format results for direct sharing
const formatResultsForDirectShare = (calculatorType, results) => {
  switch (calculatorType) {
    case 'emi':
      return `🏦 EMI Calculator Results from WorkSocial\n\n` +
             `💰 Loan Amount: ₹${results.loanAmount?.toLocaleString('en-IN')}\n` +
             `📊 Interest Rate: ${results.interestRate}%\n` +
             `⏰ Tenure: ${results.tenure} years\n` +
             `💳 Monthly EMI: ₹${results.monthlyEMI?.toLocaleString('en-IN')}\n` +
             `💸 Total Interest: ₹${results.totalInterest?.toLocaleString('en-IN')}\n` +
             `💯 Total Amount: ₹${results.totalAmount?.toLocaleString('en-IN')}\n\n` +
             `🌐 Calculate yours: https://www.worksocial.in/calculators/emi`;
             
    case 'sip':
      return `📈 SIP Calculator Results from WorkSocial\n\n` +
             `💰 Monthly Investment: ₹${results.monthlyInvestment?.toLocaleString('en-IN')}\n` +
             `📊 Expected Return: ${results.expectedReturn}%\n` +
             `⏰ Investment Period: ${results.years} years\n` +
             `💰 Total Invested: ₹${results.totalInvested?.toLocaleString('en-IN')}\n` +
             `🎯 Expected Amount: ₹${results.futureValue?.toLocaleString('en-IN')}\n` +
             `💹 Wealth Gained: ₹${results.wealthGained?.toLocaleString('en-IN')}\n\n` +
             `🌐 Calculate yours: https://www.worksocial.in/calculators/sip`;
             
    default:
      return `📊 Check out this calculator result from WorkSocial!\n\n🌐 www.worksocial.in`;
  }
};

// Quick share function for any text
export const shareToWhatsApp = (message, phoneNumber = "918882371688") => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};