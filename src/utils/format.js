/**
 * Format number as Indian Rupee currency
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.abs(amount));
}

/**
 * Format date to readable string
 */
export function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';

  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
  });
}

/**
 * Group transactions by date
 */
export function groupByDate(transactions) {
  const groups = {};
  transactions.forEach(tx => {
    const key = tx.date;
    if (!groups[key]) groups[key] = [];
    groups[key].push(tx);
  });

  return Object.entries(groups)
    .sort(([a], [b]) => new Date(b) - new Date(a))
    .map(([date, txs]) => ({ date, transactions: txs }));
}

/**
 * Category icons map
 */
export const CATEGORIES = {
  salary: { icon: '💼', label: 'Salary' },
  freelance: { icon: '💻', label: 'Freelance' },
  investment: { icon: '📈', label: 'Investment' },
  gift: { icon: '🎁', label: 'Gift' },
  food: { icon: '🍽️', label: 'Food' },
  housing: { icon: '🏠', label: 'Housing' },
  transport: { icon: '🚗', label: 'Transport' },
  health: { icon: '💊', label: 'Health' },
  entertainment: { icon: '🎬', label: 'Entertainment' },
  shopping: { icon: '🛍️', label: 'Shopping' },
  utilities: { icon: '⚡', label: 'Utilities' },
  education: { icon: '📚', label: 'Education' },
  other: { icon: '📌', label: 'Other' },
};

export const INCOME_CATEGORIES = ['salary', 'freelance', 'investment', 'gift', 'other'];
export const EXPENSE_CATEGORIES = ['food', 'housing', 'transport', 'health', 'entertainment', 'shopping', 'utilities', 'education', 'other'];
