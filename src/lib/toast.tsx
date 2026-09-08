'use client';

import { useState, createContext, useContext, useCallback, useEffect } from 'react';

export type ToastType = { id: string; message: string; type: 'success' | 'info' | 'error' };

const ToastContext = createContext<{
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}>({ showToast: () => {} });

let globalShowToast: ((message: string, type?: 'success' | 'info' | 'error') => void) | null = null;

export function showToast(message: string, type: 'success' | 'info' | 'error' = 'success') {
  if (globalShowToast) {
    globalShowToast(message, type);
  }
}

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const triggerToast = useCallback((message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).slice(2, 11);
    // Defer the state update to ensure it never executes during an ongoing React render phase
    setTimeout(() => {
      setToasts(prev => [...prev, { id, message, type }]);
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
    }, 0);
  }, []);

  useEffect(() => {
    globalShowToast = triggerToast;
    return () => {
      globalShowToast = null;
    };
  }, [triggerToast]);

  const colorMap = {
    success: 'var(--verified)',
    info: 'var(--info)',
    error: 'var(--alert)',
  };

  return (
    <ToastContext.Provider value={{ showToast: triggerToast }}>
      {children}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {toasts.map(t => (
          <div key={t.id} className="toast" style={{ borderLeft: `3px solid ${colorMap[t.type]}` }}>
            <span style={{ color: colorMap[t.type], fontSize: 16 }}>
              {t.type === 'success' ? '✓' : t.type === 'error' ? '✕' : 'i'}
            </span>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
