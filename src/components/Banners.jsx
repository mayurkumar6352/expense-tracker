import { Download, X } from 'lucide-react';

export function InstallBanner({ onInstall, onDismiss }) {
  return (
    <div className="install-banner mx-4 mb-3 rounded-xl overflow-hidden"
      style={{ background: 'rgba(124,111,255,0.1)', border: '1px solid rgba(124,111,255,0.25)' }}>
      <div className="flex items-center gap-3 p-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(124,111,255,0.2)' }}>
          <Download size={18} style={{ color: '#7C6FFF' }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-display font-semibold" style={{ color: 'var(--color-text)' }}>Install Ledgr</p>
          <p className="text-xs font-body" style={{ color: 'var(--color-muted)' }}>Add to home screen for offline use</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onInstall} className="px-3 py-1.5 rounded-lg text-white text-xs font-display font-semibold" style={{ background: '#7C6FFF' }}>Install</button>
          <button onClick={onDismiss} style={{ color: 'var(--color-muted)' }}><X size={16} /></button>
        </div>
      </div>
    </div>
  );
}

export function OfflineBanner() {
  return (
    <div className="mx-4 mb-3 rounded-xl px-4 py-2.5 flex items-center gap-2"
      style={{ border: '1px solid rgba(234,179,8,0.3)', background: 'rgba(234,179,8,0.1)' }}>
      <span style={{ fontSize: 14 }}>📡</span>
      <p className="text-xs font-body font-medium" style={{ color: '#ca8a04' }}>You're offline — changes saved locally</p>
    </div>
  );
}
