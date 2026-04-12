import { Home, Plus, List } from 'lucide-react';

const tabs = [
  { id: 'dashboard', label: 'Home', icon: Home },
  { id: 'add', label: 'Add', icon: Plus, special: true },
  { id: 'transactions', label: 'History', icon: List },
];

export function BottomNav({ activeTab, onChange }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: 'var(--color-tabs-bg)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--color-border)',
        paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))',
        transition: 'background 0.3s ease',
      }}>
      <div className="flex items-center justify-around px-4 pt-2 max-w-md mx-auto">
        {tabs.map(({ id, label, icon: Icon, special }) => {
          const isActive = activeTab === id;
          if (special) {
            return (
              <button key={id} onClick={() => onChange(id)}
                className="relative -mt-6 w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-200 active:scale-90"
                style={{
                  background: 'linear-gradient(135deg, #9D93FF, #7C6FFF)',
                  boxShadow: '0 4px 24px rgba(124,111,255,0.5)',
                  border: '2px solid rgba(157,147,255,0.3)',
                }}>
                <Icon size={22} color="white" strokeWidth={2.5} />
              </button>
            );
          }
          return (
            <button key={id} onClick={() => onChange(id)}
              className="flex-1 flex flex-col items-center justify-center gap-1 py-2 transition-colors duration-200"
              style={{ color: isActive ? '#7C6FFF' : 'var(--color-muted)', border: 'none', background: 'none' }}>
              <div className="relative transition-all duration-200" style={{ transform: isActive ? 'scale(1.1)' : 'scale(1)' }}>
                <Icon size={22} strokeWidth={isActive ? 2 : 1.5} />
                {isActive && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ background: '#7C6FFF' }} />}
              </div>
              <span className="text-xs font-body font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
