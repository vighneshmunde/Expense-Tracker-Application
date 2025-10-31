import React, { useState } from 'react';
import axios from 'axios';

const TransactionForm = ({ onTransactionAdded }) => {
  const incomeCategories = [
    'Salary',
    'Bonus',
    'Freelance Income',
    'Business Income',
    'Investment Income',
    'Interest Income',
    'Rental Income',
    'Dividend',
    'Commission',
    'Gift Received',
    'Refunds/Reimbursements',
    'Other Income'
  ];

  const expenseCategories = [
    'Food & Dining',
    'Groceries',
    'Transportation',
    'Fuel',
    'Rent',
    'Utilities (Electricity, Water, Gas)',
    'Internet & Mobile',
    'Shopping',
    'Entertainment',
    'Health & Fitness',
    'Insurance',
    'Education',
    'EMIs / Loans',
    'Travel',
    'Subscriptions',
    'Personal Care',
    'Household',
    'Maintenance',
    'Donations',
    'Taxes',
    'Fees & Charges',
    'Pets',
    'Gifts & Donations',
    'Investments (Outflow)',
    'Miscellaneous'
  ];

  const [formData, setFormData] = useState({
    type: 'income',
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'type') {
      // Reset category when type changes
      setFormData({
        ...formData,
        type: value,
        category: ''
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (parseFloat(formData.amount) <= 0) {
      alert('Amount must be greater than 0');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/transactions', formData);
      onTransactionAdded();
      setFormData({
        type: 'income',
        amount: '',
        category: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  return (
    <div className="transaction-form">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Type:</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="form-group">
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {(formData.type === 'income' ? incomeCategories : expenseCategories).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
};

export default TransactionForm;
