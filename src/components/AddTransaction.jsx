import { useState } from 'react';
import { Plus, Tag, Calendar, CheckCircle2 } from 'lucide-react';
import { CATEGORIES, INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../utils/format';

const DEFAULT_FORM = {
  title: '', amount: '', type: 'expense',
  date: new Date().toISOString().split('T')[0], category: 'food',
};

export function AddTransaction({ onAdd }) {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const categories = form.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.amount || parseFloat(form.amount) <= 0) e.amount = 'Enter a valid amount';
    return e;
  };

  const handleSubmit = () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    onAdd(form);
    setSuccess(true);
    setTimeout(() => { setForm(DEFAULT_FORM); setSuccess(false); }, 1500);
  };

  const handleTypeChange = (type) => {
    setForm(f => ({ ...f, type, category: type === 'income' ? 'salary' : 'food' }));
  };

  const isIncome = form.type === 'income';

  return (
    <div className="space-y-5 animate-slide-up">
      <div>
        <h2 className="font-display font-bold text-xl" style={{ color: 'var(--color-text)' }}>New Transaction</h2>
        <p className="text-sm font-body mt-0.5" style={{ color: 'var(--color-muted)' }}>Record an income or expense</p>
      </div>

      {/* Type Toggle */}
      <div className="flex gap-2 p-1 rounded-xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <button onClick={() => handleTypeChange('expense')}
          className="flex-1 py-2.5 rounded-lg text-sm font-display font-semibold transition-all duration-200"
          style={{ background: !isIncome ? '#FF6B6B' : 'transparent', color: !isIncome ? '#fff' : 'var(--color-muted)' }}>
          Expense
        </button>
        <button onClick={() => handleTypeChange('income')}
          className="flex-1 py-2.5 rounded-lg text-sm font-display font-semibold transition-all duration-200"
          style={{ background: isIncome ? '#22D3A0' : 'transparent', color: isIncome ? '#0A0A0F' : 'var(--color-muted)' }}>
          Income
        </button>
      </div>

      {/* Title */}
      <div>
        <label className="block text-xs font-body font-medium uppercase tracking-wider mb-2" style={{ color: 'var(--color-muted)' }}>Title</label>
        <div className="relative">
          <Tag size={15} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--color-muted)' }} />
          <input type="text" placeholder="e.g. Monthly Salary, Grocery..."
            className="input-field pl-10"
            style={{ borderColor: errors.title ? '#FF6B6B' : undefined }}
            value={form.title}
            onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            maxLength={50} />
        </div>
        {errors.title && <p className="text-xs mt-1 font-body" style={{ color: '#FF6B6B' }}>{errors.title}</p>}
      </div>

      {/* Amount */}
      <div>
        <label className="block text-xs font-body font-medium uppercase tracking-wider mb-2" style={{ color: 'var(--color-muted)' }}>Amount (₹)</label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-sm pointer-events-none" style={{ color: 'var(--color-muted)' }}>₹</span>
          <input type="number" placeholder="0"
            className="input-field pl-9 font-mono text-lg"
            style={{ borderColor: errors.amount ? '#FF6B6B' : undefined }}
            value={form.amount}
            onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
            inputMode="decimal" min="0" />
        </div>
        {errors.amount && <p className="text-xs mt-1 font-body" style={{ color: '#FF6B6B' }}>{errors.amount}</p>}
      </div>

      {/* Category */}
      <div>
        <label className="block text-xs font-body font-medium uppercase tracking-wider mb-2" style={{ color: 'var(--color-muted)' }}>Category</label>
        <div className="grid grid-cols-4 gap-2">
          {categories.map(cat => (
            <button key={cat} onClick={() => setForm(f => ({ ...f, category: cat }))}
              className="flex flex-col items-center gap-1 p-2.5 rounded-xl text-center transition-all duration-150"
              style={{
                border: `1px solid ${form.category === cat ? '#7C6FFF' : 'var(--color-border)'}`,
                background: form.category === cat ? 'rgba(124,111,255,0.12)' : 'var(--color-card)',
                color: form.category === cat ? '#9D93FF' : 'var(--color-muted)',
              }}>
              <span className="text-xl">{CATEGORIES[cat]?.icon}</span>
              <span className="text-xs font-body leading-tight">{CATEGORIES[cat]?.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Date */}
      <div>
        <label className="block text-xs font-body font-medium uppercase tracking-wider mb-2" style={{ color: 'var(--color-muted)' }}>Date</label>
        <div className="relative">
          <Calendar size={15} className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--color-muted)' }} />
          <input type="date" className="input-field pl-10 font-mono"
            value={form.date}
            onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
            max={new Date().toISOString().split('T')[0]} />
        </div>
      </div>

      {/* Submit */}
      <button onClick={handleSubmit}
        className="w-full flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-display font-semibold text-sm transition-all duration-200 active:scale-95"
        style={{
          background: success ? '#22D3A0' : isIncome ? '#22D3A0' : '#FF6B6B',
          color: (success || isIncome) ? '#0A0A0F' : '#fff',
        }}>
        {success ? <><CheckCircle2 size={18} /><span>Transaction Added!</span></> : <><Plus size={18} /><span>Add {isIncome ? 'Income' : 'Expense'}</span></>}
      </button>
    </div>
  );
}
