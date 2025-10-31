import React from 'react';

const Summary = ({ transactions }) => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <div className="summary">
      <h2>Summary</h2>
      <div className="summary-item">
        <span>Total Income:</span>
        <span className="income">${totalIncome}</span>
      </div>
      <div className="summary-item">
        <span>Total Expenses:</span>
        <span className="expense">${totalExpenses}</span>
      </div>
      <div className="summary-item">
        <span>Balance:</span>
        <span className={balance >= 0 ? 'income' : 'expense'}>${balance}</span>
      </div>
    </div>
  );
};

export default Summary;
