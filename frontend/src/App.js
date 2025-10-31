import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Summary from './components/Summary';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    console.log('Fetching transactions');
    try {
      const response = await axios.get('http://localhost:5000/api/transactions');
      setTransactions(response.data);
      console.log('Transactions fetched:', response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleTransactionAdded = () => {
    fetchTransactions();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/transactions/${id}`);
      fetchTransactions();
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const handleClearAll = async () => {
    console.log('Clear all button clicked');
    if (window.confirm('Are you sure you want to clear all transactions?')) {
      try {
        await axios.delete('http://localhost:5000/api/transactions');
        console.log('Delete request sent and completed');
        setTransactions([]);
      } catch (error) {
        console.error('Error clearing transactions:', error);
      }
    }
  };

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <Summary transactions={transactions} />
      <TransactionForm onTransactionAdded={handleTransactionAdded} />
      <TransactionList transactions={transactions} onDelete={handleDelete} />
      {transactions.length > 0 && (
        <button onClick={handleClearAll} className="clear-all-btn">
          Clear All Transactions
        </button>
      )}
    </div>
  );
}

export default App;
