import { useState } from 'react';
import { Trash2, TrendingUp, AlertTriangle, Search } from 'lucide-react';
import { formatCurrency, formatDate, groupByDate, CATEGORIES } from '../utils/format';

function TransactionItem({ tx, onDelete }) {
  const [confirming, setConfirming] = useState(false);
  const isIncome = tx.type === 'income';
  const cat = CATEGORIES[tx.category] || CATEGORIES.other;

  const handleDelete = () => {
    if (confirming) { onDelete(tx.id); }
    else { setConfirming(true); setTimeout(() => setConfirming(false), 2500); }
  };

  return (
    <div className="transaction-item">
      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
        style={{ background: isIncome ? 'rgba(34,211,160,0.12)' : 'rgba(255,107,107,0.12)' }}>
        {cat.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-body font-medium text-sm truncate" style={{ color: 'var(--color-text)' }}>{tx.title}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs font-body" style={{ color: 'var(--color-muted)' }}>{formatDate(tx.date)}</span>
          <span className="w-1 h-1 rounded-full" style={{ background: 'var(--color-muted)', opacity: 0.4 }} />
          <span className="text-xs font-body" style={{ color: 'var(--color-muted)' }}>{cat.label}</span>
        </div>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <p className="font-mono font-semibold text-sm" style={{ color: isIncome ? '#22D3A0' : '#FF6B6B' }}>
          {isIncome ? '+' : '-'}{formatCurrency(tx.amount)}
        </p>
        <button onClick={handleDelete}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
          style={{
            background: confirming ? '#FF6B6B' : 'var(--color-surface)',
            color: confirming ? '#fff' : 'var(--color-muted)',
            border: `1px solid ${confirming ? '#FF6B6B' : 'var(--color-border)'}`,
            transform: confirming ? 'scale(1.1)' : 'scale(1)',
          }}>
          {confirming ? <AlertTriangle size={13} /> : <Trash2 size={13} />}
        </button>
      </div>
    </div>
  );
}

export function TransactionList({ transactions, onDelete }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = transactions.filter(tx => {
    const matchSearch = tx.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || tx.type === filter;
    return matchSearch && matchFilter;
  });
  const grouped = groupByDate(filtered);

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
          style={{ background: 'rgba(124,111,255,0.1)', border: '1px solid rgba(124,111,255,0.2)' }}>
          <TrendingUp size={28} style={{ color: '#7C6FFF' }} />
        </div>
        <h3 className="font-display font-bold text-lg" style={{ color: 'var(--color-text)' }}>No Transactions Yet</h3>
        <p className="text-sm font-body mt-1 max-w-xs" style={{ color: 'var(--color-muted)' }}>
          Tap the + button to record your first income or expense
        </p>
      </div>
    );
  }

  const pills = ['all', 'income', 'expense'];
  const pillColors = {
    all:     { active: '#7C6FFF', color: '#fff' },
    income:  { active: '#22D3A0', color: '#0A0A0F' },
    expense: { active: '#FF6B6B', color: '#fff' },
  };

  return (
    <div className="space-y-4 animate-slide-up">
      <div>
        <h2 className="font-display font-bold text-xl" style={{ color: 'var(--color-text)' }}>Transactions</h2>
        <p className="text-sm font-body mt-0.5" style={{ color: 'var(--color-muted)' }}>{transactions.length} total records</p>
      </div>

      <div className="relative">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--color-muted)' }} />
        <input type="text" placeholder="Search transactions..." className="input-field pl-10"
          value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <div className="flex gap-2">
        {pills.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-4 py-1.5 rounded-full text-xs font-display font-semibold capitalize transition-all duration-200"
            style={{
              background: filter === f ? pillColors[f].active : 'var(--color-card)',
              color: filter === f ? pillColors[f].color : 'var(--color-muted)',
              border: `1px solid ${filter === f ? pillColors[f].active : 'var(--color-border)'}`,
            }}>
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0
        ? <div className="text-center py-10"><p className="text-sm font-body" style={{ color: 'var(--color-muted)' }}>No transactions match your search</p></div>
        : (
          <div className="space-y-4">
            {grouped.map(({ date, transactions: txs }) => (
              <div key={date}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-body font-medium uppercase tracking-wider" style={{ color: 'var(--color-muted)' }}>{formatDate(date)}</span>
                  <div className="flex-1 h-px" style={{ background: 'var(--color-border)' }} />
                  <span className="text-xs font-mono" style={{ color: 'var(--color-muted)', opacity: 0.6 }}>{txs.length} item{txs.length !== 1 ? 's' : ''}</span>
                </div>
                <div className="space-y-2">
                  {txs.map(tx => <TransactionItem key={tx.id} tx={tx} onDelete={onDelete} />)}
                </div>
              </div>
            ))}
          </div>
        )
      }
    </div>
  );
}
