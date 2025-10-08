import React, { useMemo, useState } from 'react';
import CalculatorSidebar from './CalculatorSidebar';

function LoanEligibilityCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState(100000);
  const [existingEmis, setExistingEmis] = useState(15000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenureYears, setLoanTenureYears] = useState(20);
  const [foir, setFoir] = useState(40);

  const calculations = useMemo(() => {
    const income = Number(monthlyIncome) || 0;
    const obligations = Math.min(Number(existingEmis) || 0, income);
    const foirLimit = Math.max(Math.min(Number(foir) || 0, 80), 15) / 100; // clamp 15-80%

    const monthlyRate = Math.max(Number(interestRate) || 0, 0) / 1200;
    const tenureMonths = Math.max(Math.round(Number(loanTenureYears) || 0) * 12, 12);

    const emiCapacity = Math.max(income * foirLimit, 0);
    const residualCapacity = Math.max(income - obligations, 0);
    const eligibleEmi = Math.min(emiCapacity, residualCapacity);

    let eligibleAmount = 0;
    if (eligibleEmi > 0) {
      if (monthlyRate === 0) {
        eligibleAmount = eligibleEmi * tenureMonths;
      } else {
        const factor = Math.pow(1 + monthlyRate, tenureMonths);
        eligibleAmount = eligibleEmi * ((factor - 1) / (monthlyRate * factor));
      }
    }

    const annualIncome = income * 12;
    const emiToIncomeRatio = income ? (eligibleEmi / income) * 100 : 0;

    return {
      eligibleEmi,
      eligibleAmount,
      annualIncome,
      emiToIncomeRatio,
      foirLimitPercent: foirLimit * 100,
      residualCapacity,
    };
  }, [monthlyIncome, existingEmis, interestRate, loanTenureYears, foir]);

  const formatCurrency = (value) => value.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: value >= 100000 ? 0 : 2,
  });

  return (
    <div className="flex">
      <CalculatorSidebar />
    <div className="bg-slate-50 py-10">
      <div className="max-w-5xl mx-auto px-6">
        <header className="text-center mb-10">
          <p className="text-sm uppercase tracking-[0.4em] text-sky-600 font-semibold">Loan Eligibility</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-slate-800">How much home loan can you get?</h1>
          <p className="mt-4 text-slate-600 max-w-3xl mx-auto">
            Enter your income, existing EMIs and preferred tenure to estimate the maximum loan amount banks typically offer based on FOIR (Fixed Obligation to Income Ratio).
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[340px,1fr]">
          <section className="bg-white rounded-2xl shadow-lg shadow-slate-200/40 p-6 border border-slate-100">
            <h2 className="text-xl font-semibold text-slate-700 mb-4">Applicant Profile</h2>
            <div className="space-y-4">
              <label className="block">
                <span className="block text-sm font-medium text-slate-600">Monthly Net Income (₹)</span>
                <input
                  type="number"
                  value={monthlyIncome}
                  onChange={(event) => setMonthlyIncome(event.target.value)}
                  min={0}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-800 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none"
                  placeholder="e.g. 100000"
                />
              </label>

              <label className="block">
                <span className="block text-sm font-medium text-slate-600">Existing Monthly EMIs (₹)</span>
                <input
                  type="number"
                  value={existingEmis}
                  onChange={(event) => setExistingEmis(event.target.value)}
                  min={0}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-800 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none"
                  placeholder="e.g. 15000"
                />
              </label>

              <label className="block">
                <span className="block text-sm font-medium text-slate-600">Interest Rate (% p.a.)</span>
                <input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(event) => setInterestRate(event.target.value)}
                  min={0}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-800 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none"
                  placeholder="e.g. 8.5"
                />
              </label>

              <label className="block">
                <span className="block text-sm font-medium text-slate-600">Loan Tenure (years)</span>
                <input
                  type="number"
                  value={loanTenureYears}
                  onChange={(event) => setLoanTenureYears(event.target.value)}
                  min={1}
                  max={30}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-slate-800 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none"
                  placeholder="e.g. 20"
                />
              </label>

              <label className="block">
                <div className="flex items-center justify-between text-sm font-medium text-slate-600">
                  <span>FOIR (income portion allowed for EMIs)</span>
                  <span className="text-slate-500">{foir}%</span>
                </div>
                <input
                  type="range"
                  min={15}
                  max={70}
                  value={foir}
                  onChange={(event) => setFoir(event.target.value)}
                  className="mt-2 w-full"
                />
                <p className="mt-1 text-xs text-slate-500">Most banks allow 35%-45% of monthly income for EMIs.</p>
              </label>
            </div>
          </section>

          <section>
            <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/40 p-6 border border-slate-100">
              <h2 className="text-xl font-semibold text-slate-700 mb-4">Eligibility Estimate</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                  <p className="text-sm text-slate-500">Eligible Loan Amount</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">{formatCurrency(calculations.eligibleAmount)}</p>
                  <p className="mt-2 text-xs text-slate-500">Based on current inputs and tenure of {loanTenureYears} years.</p>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                  <p className="text-sm text-slate-500">Affordable EMI</p>
                  <p className="mt-2 text-3xl font-semibold text-emerald-600">{formatCurrency(calculations.eligibleEmi)}</p>
                  <p className="mt-2 text-xs text-slate-500">({calculations.emiToIncomeRatio.toFixed(1)}% of income • FOIR limit {calculations.foirLimitPercent.toFixed(0)}%)</p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-700 mb-3">Snapshot</h3>
                <dl className="grid gap-3 md:grid-cols-2 text-sm text-slate-600">
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                    <dt>Annual Income</dt>
                    <dd className="font-semibold text-slate-800">{formatCurrency(calculations.annualIncome)}</dd>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                    <dt>Residual Income after EMIs</dt>
                    <dd className="font-semibold text-slate-800">{formatCurrency(calculations.residualCapacity)}</dd>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                    <dt>Tenure Considered</dt>
                    <dd className="font-semibold text-slate-800">{loanTenureYears} years</dd>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
                    <dt>Interest Rate</dt>
                    <dd className="font-semibold text-slate-800">{Number(interestRate).toFixed(2)}% p.a.</dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-inner">
                <h3 className="text-base font-semibold text-slate-700">Improve eligibility quickly</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600 list-disc list-inside">
                  <li>Reduce existing EMIs or credit card dues before applying.</li>
                  <li>Add a co-applicant with steady income.</li>
                  <li>Opt for a longer tenure if you need a higher sanctioned amount.</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    </div>
  );
}

export default LoanEligibilityCalculator;
