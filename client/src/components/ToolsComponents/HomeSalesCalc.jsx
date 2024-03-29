import React, { useState } from 'react';
import { Input, Button, Typography } from "@material-tailwind/react";
import { CurrencyRupeeIcon, InformationCircleIcon, ReceiptPercentIcon } from '@heroicons/react/24/outline';

export default function HomeSaleProceedsCalculator() {
  const [sellingPrice, setSellingPrice] = useState('');
  const [sellingShowPrice, setSellingShowPrice] = useState('');
  const [mortgageBalance, setMortgageBalance] = useState('');
  const [homeCosts, setHomeCosts] = useState('');
  const [closingCosts, setClosingCosts] = useState('');
  const [movingCosts, setmovingCosts] = useState('');
  const [agentFees, setAgentFees] = useState('');
  const [taxes, setTaxes] = useState('');
  const [costsToSell, setCostsToSell] = useState('');
  const [proceeds, setProceeds] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    // Validate input values
    const inputSellingPrice = parseFloat(sellingPrice);
    const inputMortgageBalance = parseFloat(mortgageBalance);
    const inputHomeCosts = parseFloat(homeCosts);
    const inputClosingCosts = parseFloat(closingCosts);
    const inputAgentFees = parseFloat(agentFees);
    const inputTaxes = parseFloat(taxes);
    const inputMovingCosts = parseFloat(movingCosts);

    // Clearing previous errors
    setError('');

    if (isNaN(inputSellingPrice) || isNaN(inputMortgageBalance) || isNaN(inputClosingCosts) || isNaN(inputAgentFees) || isNaN(inputTaxes) || isNaN(inputMovingCosts)) {
      setError('All fields must be valid numbers');
      setProceeds(null);
      return;
    }

    // Validate agent fees and taxes
    if (inputAgentFees < 0 || inputAgentFees > 100 || inputTaxes < 0 || inputTaxes > 100) {
      setError('Agent fees and taxes must be between 0 and 100');
      setProceeds(null);
      return;
    }
    const iInputTaxes = inputSellingPrice * (inputTaxes/100);
    const iAgentFees = inputSellingPrice * (inputAgentFees/100);
    const iCostsToSell = (inputMortgageBalance + inputClosingCosts + iAgentFees + iInputTaxes + inputHomeCosts + inputMovingCosts);

    // Calculate home sale proceeds
    const proceeds = inputSellingPrice - iCostsToSell;
    
    if (proceeds < 0) {
      setError('Proceeds cannot be negative');
      setProceeds(null);
      return;
    }

    // Format the proceeds with commas
    const formattedProceeds = proceeds.toLocaleString();

    // Set the proceeds
    setProceeds(formattedProceeds);
    setCostsToSell(iCostsToSell.toLocaleString());
    setSellingShowPrice(inputSellingPrice.toLocaleString());
    console.log(sellingShowPrice);
    console.log(costsToSell);
  };

  return (
    <div className='m-10 bg-gray-200'>
      <center>
        <p className='text-blue3 text-lg text-pretty font-bold mt-5 p-2'>HOME SALE PROCEEDS CALCULATOR</p>
        <p className='text-black text-3xl p-1'>Estimate Your Net Profit</p>
        <p className='text-gray-700 text-base p-1 pb-6'>Use our Home Sale Proceeds Calculator to estimate the potential net profit from the <br/>sale of your home after considering various costs.</p>
        <div className="bg-white inline-block p-12 w-2/3 rounded-xl mb-16">
          <div className="flex">
            <div className="flex flex-col w-1/2 pr-2 items-end gap-6">
              <Input color="blue" size="lg" label="Home Selling Price" icon={<CurrencyRupeeIcon />} value={sellingPrice} onChange={(e) => setSellingPrice(e.target.value)} required/>
              <div className="w-full">
                <Input color="blue" size="lg" label="Remaining mortgage balance" icon={<CurrencyRupeeIcon />} value={mortgageBalance} onChange={(e) => setMortgageBalance(e.target.value)} required/>
                <Typography
                  color="gray"
                  className="mt-2 flex items-start gap-1 font-normal text-left text-xs "
                >
                  <InformationCircleIcon className='text-gray-500 h-5 w-5'/>
                  Enter the amount left on your mortgage, estimated balance of any loans.
                </Typography>
              </div>
              <div className="w-full">
                <Input color="blue" size="lg" label="Repairs, Staging & Cleaning" icon={<CurrencyRupeeIcon />} value={homeCosts} onChange={(e) => setHomeCosts(e.target.value)} />
                <Typography
                  color="gray"
                  className="mt-2 flex items-start gap-1 font-normal text-left text-xs "
                >
                  <InformationCircleIcon className='text-gray-500 h-5 w-5'/>
                  Estimate the amount you plan to spend preparing to list your home.
                </Typography>
              </div>
              <div className="w-full">
                <Input color="blue" size="lg" label="Closing Costs" icon={<CurrencyRupeeIcon />} value={closingCosts} onChange={(e) => setClosingCosts(e.target.value)} />
                <Typography
                  color="gray"
                  className="mt-2 flex items-start gap-1 font-normal text-left text-xs "
                >
                  <InformationCircleIcon className='text-gray-500 h-5 w-5'/>
                  Closing costs can be negotiated between the buyer and seller, but are generally between 1-4% of the sale price.
                </Typography>
              </div>
              <div className="w-full">
                <Input color="blue" size="lg" label="Real Estate Agent Fees" icon={<ReceiptPercentIcon />} value={agentFees} onChange={(e) => setAgentFees(e.target.value)} />
                <Typography
                  color="gray"
                  className="mt-2 flex items-start gap-1 font-normal text-left text-xs "
                >
                  <InformationCircleIcon className='text-gray-500 h-6 w-6'/>
                  Sellers typically pay 5-6% of the home sale price, split between their agent and the buyer’s agent.
                </Typography>
              </div>
              <div className="w-full">
              <Input color="blue" size="lg" label="Taxes" icon={<ReceiptPercentIcon />} value={taxes} onChange={(e) => setTaxes(e.target.value)} />
                <Typography
                  color="gray"
                  className="mt-2 flex items-start gap-1 font-normal text-left text-xs "
                >
                  <InformationCircleIcon className='text-gray-500 h-5 w-5'/>
                  Depends on the location of the property. Some counties and cities charge a transfer tax and some don’t.
                </Typography>
              </div>
              <div className="w-full">
                <Input color="blue" size="lg" label="Moving Costs" icon={<CurrencyRupeeIcon />} value={movingCosts} onChange={(e) => setmovingCosts(e.target.value)} />
                <Typography
                  color="gray"
                  className="mt-2 flex items-start gap-1 font-normal text-left text-xs "
                >
                  <InformationCircleIcon className='text-gray-500 h-5 w-5'/>
                  Estimate additional costs for storage, moving or temporary housing during your home transition.
                </Typography>
              </div>
              <div className='pr-24'>
                <Button variant="gradient" color="blue" onClick={handleCalculate}>Calculate</Button> 
              </div>
            </div>
            <div className="w-1/2 pl-2">
              <div>
                <div className="pb-2">
                  {error && <p className="text-red-500">{error}</p>}
                </div>
                <div className="flex flex-col items-center mt-6 shadow-2xl ml-4 border-b-2 border-blue3 p-4 gap-2">
                  <div>
                    <p className='text-xs text-gray-600'>Estimated Home Sale Proceeds</p>
                    <div className='text-blue3 pt-4 font-bold text-3xl'>{proceeds ? `₹ ${proceeds}` : '-'}</div>
                  </div>
                  <div className='flex flex-row'>
                    <div className="flex flex-col justify-around w-1/2 items-center mt-4 shadow-2xl ml-2 p-2 gap-2">
                        <p className='text-xs text-gray-600'>Sale Price</p>
                        <div className='text-blue3 pt-2 font-bold text-base'>{sellingShowPrice ? `₹${sellingShowPrice}` : '-'}</div>
                    </div>
                    <div className="flex flex-col justify-around w-1/2 items-center mt-4 shadow-2xl ml-2 p-2 gap-2"> {/* Add justify-center here */}
                        <p className='text-xs text-gray-600'>Costs to Sell</p>
                        <div className='text-blue3 pt-2 font-bold text-base'>{costsToSell ? `₹${costsToSell}` : '-'}</div>
                    </div>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </center>
    </div>
  );
}
