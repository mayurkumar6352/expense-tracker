import { formatCurrency } from '../utils/format';
import { TrendingUp, TrendingDown } from 'lucide-react';

function StatCard({ label, amount, type, icon: Icon, delay = 0 }) {
  const colors = {
    income:  { text: '#22D3A0', bg: 'rgba(34,211,160,0.1)',  border: 'rgba(34,211,160,0.2)'  },
    expense: { text: '#FF6B6B', bg: 'rgba(255,107,107,0.1)', border: 'rgba(255,107,107,0.2)' },
  };
  const c = colors[type];
  return (
    <div className="glass-card p-4 animate-slide-up" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-body font-medium uppercase tracking-wider" style={{ color: 'var(--color-muted)' }}>{label}</span>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: c.bg, border: `1px solid ${c.border}` }}>
          <Icon size={15} style={{ color: c.text }} />
        </div>
      </div>
      <div className="font-display font-bold text-xl count-animate" style={{ color: c.text }}>
        {formatCurrency(amount)}
      </div>
    </div>
  );
}

export function Dashboard({ balance, totalIncome, totalExpenses, transactions }) {
  const expenseRatio = totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 0;
  return (
    <div className="space-y-4">
      {/* Hero Balance */}
      <div className="relative overflow-hidden rounded-2xl p-6 animate-scale-in"
        style={{
          background: 'linear-gradient(135deg, var(--color-hero1), var(--color-hero2), var(--color-hero3))',
          border: '1px solid rgba(124,111,255,0.3)',
          boxShadow: '0 0 60px rgba(124,111,255,0.15)',
        }}>
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #7C6FFF, transparent)' }} />
        <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #9D93FF, transparent)' }} />
        <div className="relative z-10">
          <p className="text-xs font-body font-medium uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,0.6)' }}>Total Balance</p>
          <div className="font-display font-extrabold text-4xl text-white mb-1 count-animate">
            {balance < 0 ? '-' : ''}{formatCurrency(balance)}
          </div>
          <p className="text-xs font-mono" style={{ color: 'rgba(255,255,255,0.35)' }}>
            {transactions.length} transaction{transactions.length !== 1 ? 's' : ''} recorded
          </p>
          {totalIncome > 0 && (
            <div className="mt-4">
              <div className="flex justify-between text-xs mb-1.5 font-body" style={{ color: 'rgba(255,255,255,0.4)' }}>
                <span>Spent</span>
                <span>{Math.min(100, expenseRatio).toFixed(0)}%</span>
              </div>
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <div className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${Math.min(100, expenseRatio)}%`,
                    background: expenseRatio > 80
                      ? 'linear-gradient(90deg,#FF6B6B,#FF9B9B)'
                      : 'linear-gradient(90deg,#22D3A0,#6EF0CC)',
                  }} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatCard label="Income"   amount={totalIncome}   type="income"  icon={TrendingUp}  delay={100} />
        <StatCard label="Expenses" amount={totalExpenses} type="expense" icon={TrendingDown} delay={150} />
      </div>
    </div>
  );
}
