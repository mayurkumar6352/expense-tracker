import { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { AddTransaction } from './components/AddTransaction';
import { TransactionList } from './components/TransactionList';
import { BottomNav } from './components/BottomNav';
import { InstallBanner, OfflineBanner } from './components/Banners';
import { useTransactions } from './hooks/useTransactions';
import { usePWA } from './hooks/usePWA';
import { useTheme } from './hooks/useTheme';
import { Sun, Moon } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showInstallBanner, setShowInstallBanner] = useState(false);

  const { transactions, addTransaction, deleteTransaction, totalIncome, totalExpenses, balance } = useTransactions();
  const { installPrompt, isInstalled, isOnline, promptInstall } = usePWA();
  const { isDark, toggle } = useTheme();

  useEffect(() => {
    if (installPrompt && !isInstalled) {
      const t = setTimeout(() => setShowInstallBanner(true), 3000);
      return () => clearTimeout(t);
    }
  }, [installPrompt, isInstalled]);

  const handleAdd = (form) => {
    addTransaction(form);
    setTimeout(() => setActiveTab('dashboard'), 1600);
  };

  const handleInstall = async () => {
    const ok = await promptInstall();
    if (ok) setShowInstallBanner(false);
  };

  return (
    <div className="min-h-dvh flex flex-col" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <div style={{ height: 'env(safe-area-inset-top, 0px)' }} />

      {/* Header */}
      <header className="px-5 pt-4 pb-2 flex items-center justify-between" style={{ background: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)' }}>
        <div>
          <h1 className="font-display font-extrabold text-2xl text-gradient tracking-tight">ledgr</h1>
          <p className="text-xs font-body" style={{ color: 'var(--color-muted)' }}>
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!isOnline && <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" title="Offline" />}

          {/* Theme Toggle */}
          <button
            onClick={toggle}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-body text-xs font-semibold transition-all duration-200 active:scale-95"
            style={{
              background: 'var(--color-card)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-muted)',
            }}
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
            {isDark ? 'Light' : 'Dark'}
          </button>

          <div className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(124,111,255,0.15)', border: '1px solid rgba(124,111,255,0.3)' }}>
            <span style={{ color: '#7C6FFF', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 14 }}>₹</span>
          </div>
        </div>
      </header>

      {!isOnline && <OfflineBanner />}
      {showInstallBanner && !isInstalled && (
        <InstallBanner onInstall={handleInstall} onDismiss={() => setShowInstallBanner(false)} />
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 pb-28 space-y-6" style={{ scrollbarWidth: 'none' }}>
        {activeTab === 'dashboard' && (
          <div className="pt-2 space-y-6 animate-fade-in">
            <Dashboard balance={balance} totalIncome={totalIncome} totalExpenses={totalExpenses} transactions={transactions} />

            {transactions.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display font-semibold text-sm" style={{ color: 'var(--color-text)' }}>Recent</span>
                  <button onClick={() => setActiveTab('transactions')} style={{ color: '#7C6FFF' }} className="text-xs font-body font-medium">
                    See all →
                  </button>
                </div>
                <div className="space-y-2">
                  {transactions.slice(0, 4).map(tx => {
                    const isIncome = tx.type === 'income';
                    return (
                      <div key={tx.id} className="flex items-center gap-3 p-3.5 glass-card">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center text-base"
                          style={{ background: isIncome ? 'rgba(34,211,160,0.12)' : 'rgba(255,107,107,0.12)' }}>
                          {tx.catIcon || tx.title.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-body font-medium truncate" style={{ color: 'var(--color-text)' }}>{tx.title}</p>
                          <p className="text-xs font-body capitalize" style={{ color: 'var(--color-muted)' }}>{tx.category}</p>
                        </div>
                        <span className="font-mono text-sm font-semibold" style={{ color: isIncome ? '#22D3A0' : '#FF6B6B' }}>
                          {isIncome ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {transactions.length === 0 && (
              <div className="text-center py-8">
                <p className="text-4xl mb-3">💸</p>
                <p className="font-display font-bold" style={{ color: 'var(--color-text)' }}>Start Tracking</p>
                <p className="text-sm font-body mt-1" style={{ color: 'var(--color-muted)' }}>Tap + to add your first transaction</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'add' && (
          <div className="pt-2 animate-fade-in">
            <AddTransaction onAdd={handleAdd} />
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="pt-2 animate-fade-in">
            <TransactionList transactions={transactions} onDelete={deleteTransaction} />
          </div>
        )}
      </main>

      <BottomNav activeTab={activeTab} onChange={setActiveTab} />
    </div>
  );
}
