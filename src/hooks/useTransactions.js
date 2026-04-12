import { useState, useEffect } from 'react';

const STORAGE_KEY = 'ledgr_transactions';

// Sample seed data for first-time users
const SEED_DATA = [
  {
    id: '1',
    title: 'Monthly Salary',
    amount: 75000,
    type: 'income',
    date: new Date().toISOString().split('T')[0],
    category: 'salary',
  },
  {
    id: '2',
    title: 'Rent Payment',
    amount: 18000,
    type: 'expense',
    date: new Date().toISOString().split('T')[0],
    category: 'housing',
  },
  {
    id: '3',
    title: 'Grocery Shopping',
    amount: 3200,
    type: 'expense',
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    category: 'food',
  },
  {
    id: '4',
    title: 'Freelance Project',
    amount: 12000,
    type: 'income',
    date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
    category: 'freelance',
  },
];

export function useTransactions() {
  const [transactions, setTransactions] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      // Seed data for first-time users
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_DATA));
      return SEED_DATA;
    } catch {
      return [];
    }
  });

  // Sync to localStorage whenever transactions change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, [transactions]);

  const addTransaction = (transaction) => {
    const newTx = {
      ...transaction,
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      amount: parseFloat(transaction.amount),
      createdAt: new Date().toISOString(),
    };
    setTransactions(prev => [newTx, ...prev]);
    return newTx;
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(tx => tx.id !== id));
  };

  const clearAll = () => {
    setTransactions([]);
  };

  // Computed values
  const totalIncome = transactions
    .filter(tx => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalExpenses = transactions
    .filter(tx => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0);

  const balance = totalIncome - totalExpenses;

  return {
    transactions,
    addTransaction,
    deleteTransaction,
    clearAll,
    totalIncome,
    totalExpenses,
    balance,
  };
}
