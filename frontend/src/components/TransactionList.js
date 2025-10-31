import React from 'react';

const TransactionList = ({ transactions, onDelete }) => {
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      onDelete(id);
    }
  };

  return (
    <div className="transaction-list">
      <h2>Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction._id} className={`transaction-item ${transaction.type}`}>
              <div className="transaction-details">
                <span className="type">Type: {transaction.type}</span>
                <span className="amount">${transaction.amount}</span>
                <span className="category">{transaction.category}</span>
                <span className="description">{transaction.description}</span>
                <span className="date">{new Date(transaction.date).toLocaleDateString()}</span>
              </div>
              <button onClick={() => handleDelete(transaction._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionList;
