document.addEventListener('DOMContentLoaded', () => {

    // --- EMI Calculator Logic ---
    const emiForm = document.getElementById('emi-form');
    if (emiForm) {
        emiForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get values from the form
            const principal = parseFloat(document.getElementById('principal').value);
            const annualInterestRate = parseFloat(document.getElementById('interest-rate').value);
            const tenureYears = parseFloat(document.getElementById('tenure').value);

            // Validate inputs
            if (isNaN(principal) || isNaN(annualInterestRate) || isNaN(tenureYears) || principal <= 0 || annualInterestRate <= 0 || tenureYears <= 0) {
                alert("Please enter valid positive numbers for all fields.");
                return;
            }

            // Calculate monthly values
            const monthlyInterestRate = annualInterestRate / 12 / 100;
            const tenureMonths = tenureYears * 12;

            // EMI Calculation Formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
            const emi = (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenureMonths)) / (Math.pow(1 + monthlyInterestRate, tenureMonths) - 1);
            
            const totalPayment = emi * tenureMonths;
            const totalInterest = totalPayment - principal;

            // INR Currency Formatter
            const inrFormatter = new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 0
            });

            // Display results
            document.getElementById('emi-result').textContent = inrFormatter.format(emi);
            document.getElementById('interest-result').textContent = inrFormatter.format(totalInterest);
            document.getElementById('total-result').textContent = inrFormatter.format(totalPayment);
        });
    }

    // --- Mobile Navigation Toggle ---
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav ul');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }
});