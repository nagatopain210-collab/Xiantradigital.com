import React from 'react';
import { X, Maximize2, Minimize2, ExternalLink } from 'lucide-react';
import { usePortal } from './PortalContext';
import { ClientLoginView } from './ClientLoginView';
import { ClientDashboard } from './ClientDashboard';
import { AdminDashboard } from './AdminDashboard';

export const PortalModalContainer: React.FC = () => {
  const { isPortalOpen, closePortal, currentRole, activePortalView } = usePortal();

  if (!isPortalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-7xl h-[94vh] flex flex-col bg-[#070A12] rounded-3xl border border-white/10 shadow-2xl overflow-hidden text-slate-100">
        {/* Top universal close floating trigger */}
        <div className="absolute top-3.5 right-4 z-40 flex items-center gap-2">
          <button
            onClick={closePortal}
            className="w-8 h-8 rounded-full bg-slate-900/90 hover:bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer shadow-lg"
            title="Cerrar ventana"
            aria-label="Cerrar modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic view rendering */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {activePortalView === 'login' || !currentRole ? (
            <div className="min-h-full flex items-center justify-center py-8">
              <ClientLoginView />
            </div>
          ) : currentRole === 'client' ? (
            <ClientDashboard />
          ) : (
            <AdminDashboard />
          )}
        </div>
      </div>
    </div>
  );
};
