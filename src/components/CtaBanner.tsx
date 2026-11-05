import React from 'react';
import { CTA_BANNER_COPY, COMPANY_INFO } from '../data/copyData';
import { MessageSquare, ShieldCheck, ArrowRight, Clock } from 'lucide-react';

interface CtaBannerProps {
  onOpenQuote: () => void;
  onOpenContact: () => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenQuote }) => {
  const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
    'Hola Xiantra, quiero solicitar el diagnóstico comercial gratuito para mi empresa.'
  )}`;

  return (
    <section id="contacto" className="section-padding-fluid relative">
      <div className="container-xiantra">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl glass-panel-neon p-6 sm:p-12 lg:p-16 shadow-2xl">
          {/* Subtle Ambient Backlights */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-5 sm:space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-slate-600 dark:text-slate-400 uppercase">
              <span className="text-cyan-600 dark:text-cyan-400 font-bold select-none">—</span>
              <span>DIAGNÓSTICO ESTRATÉGICO SIN COSTO</span>
            </div>

            <h2 className="heading-section-fluid font-black text-slate-900 dark:text-white tracking-tight">
              {CTA_BANNER_COPY.title}
            </h2>

            <p className="body-fluid text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-normal">
              {CTA_BANNER_COPY.subtitle}
            </p>

            {/* Benefit-Driven Dual CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3.5 sm:gap-4">
              <button
                onClick={onOpenQuote}
                className="w-full sm:w-auto min-h-[52px] inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-4 rounded-xl text-sm sm:text-base font-extrabold text-white btn-xiantra-emerald shadow-emerald-glow transition-all duration-300 cursor-pointer"
              >
                <span>Solicitar Diagnóstico Comercial Gratuito</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto min-h-[52px] inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl glass-panel text-slate-800 dark:text-slate-100 hover:border-emerald-500/50 font-bold text-sm transition-all duration-200 cursor-pointer shadow-fintech-card"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hablar por WhatsApp Oficial</span>
              </a>
            </div>

            {/* Trust & Guarantee Indicators */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <span>Garantía de Satisfacción Técnica de 90 Días</span>
              </span>
              <span className="text-slate-300 dark:text-slate-700 select-none hidden sm:inline">·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500 dark:text-slate-300 shrink-0" />
                <span>Respuesta comercial en &lt; 2 horas</span>
              </span>
              <span className="text-slate-300 dark:text-slate-700 select-none hidden sm:inline">·</span>
              <span className="font-semibold text-cyan-700 dark:text-cyan-300">Panel Administrador GRATIS de por vida</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
