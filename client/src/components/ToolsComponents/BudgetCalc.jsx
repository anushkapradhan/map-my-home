import React, { useState } from 'react';
import { Input, Button } from "@material-tailwind/react";
import { CurrencyRupeeIcon } from '@heroicons/react/24/outline';

export default function BudgetCalculator() {
  const [savings, setSavings] = useState('');
  const [monthlyEMI, setMonthlyEMI] = useState('');
  const [loanTenure, setLoanTenure] = useState('');
  const [budget, setBudget] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {

    // Convert input values to numbers
    const savingsAmount = parseFloat(savings);
    const monthlyEMIAmount = parseFloat(monthlyEMI);
    const loanTenureYears = parseFloat(loanTenure);

    // Clearing previous errors
    setError('');

    // Validate loan tenure
    if (loanTenureYears > 30) {
      setError('Loan tenure cannot exceed 30 years');
      setBudget('0');
      return;
    }

    // Validate input amount
    if (isNaN(savingsAmount) || isNaN(monthlyEMIAmount) || isNaN(loanTenureYears)) {
      setError('Savings, loan tenure and EMI must be valid numbers');
      setBudget('0');
      return;
    }

    // Convert loan tenure from years to months
    const loanTenureMonths = loanTenureYears * 12;

    // Define the interest rate (r) - You can set your own rate here
    const r = 0.007; // Example interest rate of 8.75%

    // Calculate total amount along with interest (a)
    const a = monthlyEMIAmount * loanTenureMonths;

    // Calculate total budget (t)
    const t = a + savingsAmount;

    // Set the budget
    setBudget(t.toFixed(2)); // Limiting to 2 decimal places for currency

    // Format the budget with commas
    const formattedBudget = t.toLocaleString();

    // Set the budget
    setBudget(formattedBudget);
  };

  return (
    <div className='m-10'>
      <center>
        <p className='text-blue3 text-lg text-pretty font-bold mt-5 p-2'>BUDGET CALCULATOR</p>
        <p className='text-black text-3xl p-1'>Plan Your Finances Wisely</p>
        <p className='text-gray-700 text-base p-1 pb-6'>Our Budget Calculator assists you in creating a comprehensive budget to manage your <br/>income, expenses, and savings effectively.</p>
        <div className="bg-white inline-block p-12 w-2/3 rounded-xl">
          <div className="flex">
            <div className="flex flex-col w-1/2 pr-2 items-end gap-6">
              <Input className='space-x-3' color="blue" size="lg" label="Savings for Buying Home" icon={<CurrencyRupeeIcon />} value={savings} onChange={(e) => setSavings(e.target.value)} required/> 
              <Input className='space-x-3' color="blue" size="lg" label="EMI you can afford (Monthly)" icon={<CurrencyRupeeIcon />} value={monthlyEMI} onChange={(e) => setMonthlyEMI(e.target.value)} required/> 
              <Input className='space-x-3' color="blue" size="lg" label="Preferred Loan Tenure (in Years)" value={loanTenure} onChange={(e) => setLoanTenure(e.target.value)} required/> 
              <div className='pr-24'>
                <Button variant="gradient" color="blue" onClick={handleCalculate}>Calculate</Button> 
              </div>
            </div>
            <div className="w-1/2 pl-2">
                <div className='pb-2'>
                  {error && <p className="text-red-500">{error}</p>}
                </div>
                <div className="flex flex-col items-center mt-6 shadow-2xl ml-4 border-b-2 border-blue3 p-4 gap-2">
                  <p className='text-xs text-gray-600'>Your Home Budget is</p>
                  <div className='text-blue3 pt-4 font-bold text-3xl'>{budget ? `₹ ${budget}` : '-'}</div>
                </div>
            </div>
          </div>
        </div>
      </center>
    </div>
  );
}
