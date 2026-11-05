import React from 'react';
import { Bot, Zap, Eye, Layers, Building2 } from 'lucide-react';
import { usePortal } from '../portal/PortalContext';

interface MobileBottomBarProps {
  onOpenQuote: () => void;
  onOpenDemo: () => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  onOpenQuote,
  onOpenDemo,
}) => {
  const { openPortal, currentRole } = usePortal();

  const scrollToServices = () => {
    const el = document.querySelector('#servicios');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const openXianBot = () => {
    window.dispatchEvent(new CustomEvent('open-xiantra-bot'));
  };

  return (
    <nav
      aria-label="Barra de navegación inferior rápida para móviles y tablets"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 glass-panel bg-white/95 dark:bg-[#060913]/95 backdrop-blur-xl border-t border-slate-200/90 dark:border-white/10 shadow-[0_-10px_28px_-6px_rgba(15,23,42,0.16)] dark:shadow-[0_-10px_28px_-6px_rgba(0,0,0,0.85)] px-2 sm:px-6 pt-1.5 pb-safe"
    >
      <div className="max-w-xl mx-auto grid grid-cols-4 items-center gap-1.5">
        {/* 1. Soluciones Quick Jump */}
        <button
          onClick={scrollToServices}
          className="min-h-[46px] flex flex-col items-center justify-center py-1 rounded-xl text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-white active:scale-95 transition-all cursor-pointer"
        >
          <Layers className="w-4 h-4 mb-0.5 text-slate-500 dark:text-slate-400" />
          <span className="text-[10px] sm:text-[11px] font-semibold tracking-tight">Soluciones</span>
        </button>

        {/* 2. Portal Clientes & Admin */}
        <button
          onClick={() => openPortal('login')}
          className="min-h-[46px] flex flex-col items-center justify-center py-1 rounded-xl text-emerald-700 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 active:scale-95 transition-all cursor-pointer"
        >
          <Building2 className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] sm:text-[11px] font-bold tracking-tight truncate max-w-[80px]">
            {currentRole ? 'Mi Portal' : 'Portal'}
          </span>
        </button>

        {/* 3. Hablar con Xian IA */}
        <button
          onClick={openXianBot}
          className="min-h-[46px] flex flex-col items-center justify-center py-1 rounded-xl text-emerald-700 dark:text-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-300 active:scale-95 transition-all cursor-pointer"
        >
          <div className="relative">
            <Bot className="w-4 h-4 mb-0.5" />
            <span className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <span className="text-[10px] sm:text-[11px] font-bold tracking-tight">Xian IA 24/7</span>
        </button>

        {/* 4. Cotizar (Primary Thumb CTA) */}
        <button
          onClick={onOpenQuote}
          className="min-h-[44px] flex items-center justify-center gap-1 px-2.5 sm:px-4 py-2 rounded-xl btn-xiantra-primary active:scale-95 text-white font-extrabold text-[11px] sm:text-xs shadow-md shadow-cyan-950/30 cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Cotizar</span>
        </button>
      </div>
    </nav>
  );
};
