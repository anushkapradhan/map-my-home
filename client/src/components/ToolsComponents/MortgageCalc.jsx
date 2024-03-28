import React, { useState } from 'react';
import { Input, Button } from "@material-tailwind/react";
import { CurrencyRupeeIcon, ReceiptPercentIcon } from '@heroicons/react/24/outline';

const apiKey = import.meta.env.VITE_BLOG_API_KEY_2;

export default function MortgageCalc() {
  const [homeValue, setHomeValue] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [duration, setDuration] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleCalculate = async () => {
    const homeValueNumber = parseFloat(homeValue);
    const downPaymentNumber = parseFloat(downPayment);
    const interestRateNumber = parseFloat(interestRate);
    const durationYearsNumber = parseFloat(duration);

    // Check if homeValue and downPayment are valid numbers and greater than 0
    if (isNaN(homeValueNumber) || isNaN(downPaymentNumber) || homeValueNumber <= 0 || downPaymentNumber <= 0) {
      setError('Home value and down payment must be valid numbers greater than 0.');
      setResult(null);
      return;
    }

    // Check if interestRate is a valid number and within the specified range
    if (isNaN(interestRateNumber) || interestRateNumber <= 0 || interestRateNumber > 10000) {
      setError('Interest rate must be a valid number greater than 0 and less than or equal to 10000.');
      setResult(null);
      return;
    }

    // Check if durationYears is a valid number and within the specified range
    if (!isNaN(durationYearsNumber) && (durationYearsNumber < 1 || durationYearsNumber > 10000)) {
      setError('Duration must be a valid number between 1 and 10000.');
      setResult(null);
      return;
    }

    if (homeValueNumber > downPaymentNumber) {
      setError('');
      try {
        const response = await fetch(`https://api.api-ninjas.com/v1/mortgagecalculator?interest_rate=${interestRate}&duration_years=${duration}&home_value=${homeValue}&downpayment=${downPayment}&X-Api-Key=${apiKey}`
        );
        console.log(interestRate, duration, homeValue, downPayment);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setResult(data);
      } catch (error) {
        setError('Request failed: ' + error.message);
        setResult(null);
      }
    } else {
      setError('Home value must be greater than down payment.');
      setResult(null);
    }
  };
  const loanAmount = parseFloat(homeValue) - parseFloat(downPayment);
  const totalMonths = parseFloat(duration) * parseFloat(12);
  const totalAmount = parseFloat(loanAmount) + (result ? parseFloat(result.total_interest_paid.toFixed(2)) : 0);

  return (
    <div className='m-10'>
      <center>
        <p className='text-blue3 text-lg text-pretty font-bold mt-5 p-2'>MORTGAGE CALCULATOR</p>
        <p className='text-black text-3xl p-1'>Calculate Your Mortgage Payments</p>
        <p className='text-gray-700 text-base p-1 pb-6'>Our Mortgage Calculator helps you estimate your monthly mortgage payments based on <br/>home value, down payment, interest rate, and loan term.</p>
        <div className="bg-white inline-block p-12 w-2/3 rounded-xl">
          <div className="flex">
            <div className="flex flex-col w-1/2 pr-2 items-end gap-6">
              <Input className='space-x-3' color="blue" size="lg" label="Home Value" icon={<CurrencyRupeeIcon />} value={homeValue} onChange={(e) => setHomeValue(e.target.value)} required/>
              <Input className='space-x-3' color="blue" size="lg" label="Down Payment" icon={<CurrencyRupeeIcon />} value={downPayment} onChange={(e) => setDownPayment(e.target.value)} required/>
              <Input className='space-x-3' color="blue" size="lg" label="Rate of Interest" icon={<ReceiptPercentIcon />} value={interestRate} onChange={(e) => setInterestRate(e.target.value)} required/>
              <Input className='space-x-3' color="blue" size="lg" label="Duration (in years)" placeholder='30' value={duration} onChange={(e) => setDuration(e.target.value)} />
              <div className='pr-24'>
                <Button variant="gradient" color="blue" onClick={handleCalculate}>Calculate</Button> 
              </div>
            </div>
            <div className="w-1/2 pl-2">
              {error && <p className="text-red-500 mt-2">{error}</p>}
              {result && (
                <div className="flex flex-col items-center mt-6 shadow-2xl ml-4 border-b-2 border-blue3 p-4 gap-2">
                  <p className='text-xs text-gray-600'>Estimated Payments</p>
                  <div className="flex items-end">
                    <p className='text-3xl text-blue3'>{result.monthly_payment.mortgage ? `₹ ${result.monthly_payment.mortgage.toLocaleString('en-IN', { maximumFractionDigits: 2 })}` : '-'}</p>
                    <p className="text-sm text-gray-600 pb-1">/month</p>
                  </div>
                  <div className="flex items-end">
                    <p className='text-3xl text-blue3'>{result.annual_payment.total ? `₹ ${result.annual_payment.total.toLocaleString('en-IN', { maximumFractionDigits: 2 })}` : '-'}</p>
                    <p className="text-sm text-gray-600 pb-1">/annually</p>
                  </div>
                  <div className='text-sm text-gray-600 pt-4'>Payment Breakdown</div>
                  <div className='flex flex-col gap-y-1'>
                    <div className='flex justify-between'>
                      <p className='text-sm text-gray-700'>Loan Amount:</p>
                      <p className="text-sm text-gray-600">{loanAmount}</p>
                    </div>
                    <div className='flex justify-between'>
                      <p className='text-sm text-gray-700'>Down Payment:</p>
                      <p className="text-sm text-gray-600">{downPayment}</p>
                    </div>
                    <div className='flex justify-between'>
                      <p className='text-sm text-gray-700'>Total Interest:</p>
                      <p className="text-sm text-gray-600">{result.total_interest_paid.toFixed(2)}</p>
                    </div>
                    <div className='flex justify-between'>
                      <p className='text-sm text-gray-700'>Total {totalMonths} mortgage payments:</p>
                      <p className="text-sm text-gray-600">{totalAmount}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </center>
    </div>
  )
}
