import React, { useState } from 'react';
import Overview from '../components/ToolsComponents/Overview';
import MortgageCalc from '../components/ToolsComponents/MortgageCalc';
import BudgetCalc from '../components/ToolsComponents/BudgetCalc';
import HomeSalesCalc from '../components/ToolsComponents/HomeSalesCalc';

export default function Tools() {
  const [currentPage, setCurrentPage] = useState('overview');

  const renderPage = () => {
    switch (currentPage) {
      case 'overview':
        return <Overview />;
      case 'mortgagecalc':
        return <MortgageCalc />;
      case 'budgetcalc':
        return <BudgetCalc />;
      case 'homesalescalc':
        return <HomeSalesCalc />;
      default:
        return <Overview />;
    }
  };
  return (
    <div className="flex bg-gray-200">
      {/* Sidebar */}
      <div className="w-1/6 mt-10 bg-gray-200">
        <p className='text-blue-gray-900 text-5xl p-5'>Tools</p>
        <div className="p-5 space-y-6 align-left text-base">
          {/* Text Buttons */}
          <button
            className={`cursor-pointer ${currentPage === 'overview' ? 'text-blue3 font-bold' : 'text-blue-gray-900'}`}
            onClick={() => setCurrentPage('overview')}
          >
            Overview
          </button>
          <button
            className={`cursor-pointer ${currentPage === 'mortgagecalc' ? 'text-blue3 font-bold' : 'text-blue-gray-900'}`}
            onClick={() => setCurrentPage('mortgagecalc')}
          >
            Mortgage Calculator
          </button>
          <button
            className={`cursor-pointer ${currentPage === 'budgetcalc' ? 'text-blue3 font-bold' : 'text-blue-gray-900'}`}
            onClick={() => setCurrentPage('budgetcalc')}
          >
            Budget Calculator
          </button>
          <button
            className={`text-left cursor-pointer ${currentPage === 'homesalescalc' ? 'text-blue3 font-bold' : 'text-blue-gray-900'}`}
            onClick={() => setCurrentPage('homesalescalc')}
          >
            Home Sales <br/>Proceeds Calculator
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-5/6 bg-gray-200 mt-6">
        {/* Render current page */}
        {renderPage()}
      </div>
    </div>
  );
}
