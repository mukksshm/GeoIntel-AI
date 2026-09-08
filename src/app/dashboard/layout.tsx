import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import { ToastProvider } from '@/lib/toast';
import { AuthProvider } from '@/lib/auth-context';
import { DocumentsProvider } from '@/lib/documents-context';
import { CopilotProvider } from '@/lib/copilot-context';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <DocumentsProvider>
          <CopilotProvider>
            <div style={{ display: 'flex', height: '100vh', background: 'var(--coal-900)', overflow: 'hidden' }}>
              <Sidebar />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <TopBar />
                <main style={{ flex: 1, overflowY: 'auto' }}>
                  {children}
                </main>
              </div>
            </div>
          </CopilotProvider>
        </DocumentsProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
