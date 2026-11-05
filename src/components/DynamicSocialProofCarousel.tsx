import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  TrendingUp,
  ArrowUpRight,
  Quote,
  Zap,
} from 'lucide-react';
import { MetallicLogo } from './MetallicLogo';

interface SocialProofCase {
  id: string;
  company: string;
  industry: string;
  city: string;
  primaryMetric: string;
  metricLabel: string;
  secondaryMetric: string;
  secondaryLabel: string;
  quote: string;
  executive: string;
  role: string;
  verifiedDate: string;
  auditId: string;
}

const DYNAMIC_PROOF_CASES: SocialProofCase[] = [
  {
    id: 'maquitec-proof',
    company: 'Maquitec Ingeniería SAS',
    industry: 'Maquinaria CNC & Corte Láser',
    city: 'Bogotá / Medellín',
    primaryMetric: '+240%',
    metricLabel: 'Solicitudes de Cotización B2B',
    secondaryMetric: '< 25s',
    secondaryLabel: 'Tiempo de Respuesta en WhatsApp',
    quote:
      'Pasamos de una web lenta que nadie visitaba a recibir cotizaciones industriales calificadas todos los días directamente en nuestro WhatsApp y panel.',
    executive: 'Ing. Carlos Restrepo',
    role: 'Director Comercial',
    verifiedDate: 'Verificado 2026',
    auditId: 'XIA-AUD-904',
  },
  {
    id: 'distrialimentos-proof',
    company: 'DistriAlimentos de Colombia',
    industry: 'Distribución Mayorista & E-Commerce',
    city: 'Cali / Eje Cafetero',
    primaryMetric: '+185%',
    metricLabel: 'Pedidos Recurrentes Automatizados',
    secondaryMetric: '-61%',
    secondaryLabel: 'Reducción en Abandono de Carrito',
    quote:
      'El checkout en 1 clic con PSE y el agente Xian en WhatsApp recuperaron millones en pedidos mayoristas que antes se enfriaban por falta de seguimiento.',
    executive: 'Mariana Duarte',
    role: 'Líder de Canales Digitales',
    verifiedDate: 'Verificado 2026',
    auditId: 'XIA-AUD-812',
  },
  {
    id: 'odontolaser-proof',
    company: 'Clínica OdontoLaser VIP',
    industry: 'Salud & Especialidades Médicas',
    city: 'Medellín',
    primaryMetric: '+310%',
    metricLabel: 'Agendamientos de Valoración',
    secondaryMetric: '24/7',
    secondaryLabel: 'Calificación Automática de Pacientes',
    quote:
      'El 65% de nuestros pacientes escriben después de las 7 PM. Hoy el agente virtual responde al instante, filtra el tratamiento y agenda la cita sin intervención humana.',
    executive: 'Dra. Claudia Valencia',
    role: 'Directora Médica General',
    verifiedDate: 'Verificado 2026',
    auditId: 'XIA-AUD-756',
  },
  {
    id: 'inmoandes-proof',
    company: 'Constructora & Inmobiliaria Andes',
    industry: 'Proyectos Inmobiliarios & Finca Raíz',
    city: 'Barranquilla / Bogotá',
    primaryMetric: '4.9x',
    metricLabel: 'Retorno sobre Inversión Publicitaria',
    secondaryMetric: '0.38s',
    secondaryLabel: 'Velocidad de Carga Móvil',
    quote:
      'Con el Panel Administrador de Xiantra sabemos exactamente qué campaña de Meta o Google nos trae compradores reales con presupuesto aprobado.',
    executive: 'Andrés Felipe Gómez',
    role: 'Gerente de Ventas y Mercadeo',
    verifiedDate: 'Verificado 2026',
    auditId: 'XIA-AUD-689',
  },
];

interface DynamicSocialProofCarouselProps {
  onOpenQuote: () => void;
  onOpenDemo: () => void;
}

export const DynamicSocialProofCarousel: React.FC<DynamicSocialProofCarouselProps> = ({
  onOpenQuote,
  onOpenDemo,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-advance carousel unless user is hovering over cards
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % DYNAMIC_PROOF_CASES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isHovered]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + DYNAMIC_PROOF_CASES.length) % DYNAMIC_PROOF_CASES.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % DYNAMIC_PROOF_CASES.length);
  };

  return (
    <section id="prueba-social" className="section-padding-fluid relative z-10 overflow-hidden">
      <div className="container-xiantra">
        {/* ================= HEADER WITH XIANTRA BRAND AUTHORITY ================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2.5 text-xs font-mono tracking-widest text-cyan-600 dark:text-cyan-400 uppercase">
              <MetallicLogo size="xs" iconOnly />
              <span>PRUEBA SOCIAL DINÁMICA · VALIDACIÓN OFICIAL XIANTRA</span>
            </div>

            <h2 className="heading-section-fluid font-black text-slate-900 dark:text-white tracking-tight">
              Empresas verificadas con el{' '}
              <span className="text-gradient-xiantra">Sello de Rendimiento Xiantra</span>
            </h2>

            <p className="body-fluid text-slate-600 dark:text-slate-300">
              Desliza en móvil o pasa el cursor sobre cada caso de estudio para inspeccionar la auditoría de rendimiento validada por nuestra arquitectura comercial B2B.
            </p>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between sm:justify-start gap-3 w-full sm:w-auto">
            <div className="flex items-center gap-1.5 mr-2">
              {DYNAMIC_PROOF_CASES.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Ir al caso ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex
                      ? 'w-8 bg-emerald-500 dark:bg-emerald-400'
                      : 'w-2 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl glass-panel hover:border-cyan-500/40 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
                aria-label="Caso anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl glass-panel hover:border-cyan-500/40 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer"
                aria-label="Siguiente caso"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="md:hidden flex items-center justify-between text-[11px] font-mono text-cyan-600 dark:text-cyan-400 mb-3">
          <span>← Desliza horizontalmente para ver casos ({DYNAMIC_PROOF_CASES.length}) →</span>
        </div>

        {/* ================= INTERACTIVE CARDS: HORIZONTAL SWIPE ON MOBILE, 2X2 ON TABLET, 4-COL ON DESKTOP ================= */}
        <div
          className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 overflow-x-auto md:overflow-visible snap-x-touch pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {DYNAMIC_PROOF_CASES.map((item, idx) => {
            const isActive = idx === currentIndex;

            return (
              <div
                key={item.id}
                onClick={() => setCurrentIndex(idx)}
                className={`min-w-[85vw] sm:min-w-[330px] md:min-w-0 snap-center shrink-0 group relative rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-500 cursor-pointer overflow-hidden ${
                  isActive
                    ? 'glass-panel-neon border-2 border-cyan-500/60 dark:border-cyan-400/60 shadow-[0_12px_40px_-10px_rgba(6,182,212,0.28)]'
                    : 'glass-panel glass-panel-hover hover:border-cyan-500/40'
                }`}
              >
                {/* Micro-animation Shimmer Sweep on Hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/0 via-cyan-400/5 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Top Corner Xiantra Watermark Seal that illuminates on Hover */}
                <div className="absolute -right-6 -top-6 opacity-10 group-hover:opacity-25 group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 pointer-events-none">
                  <MetallicLogo size="xl" iconOnly />
                </div>

                <div className="relative z-10 space-y-4 sm:space-y-5">
                  {/* Top Seal: Xiantra Verified Badge */}
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-200 dark:border-slate-800/80">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded-lg bg-cyan-50 dark:bg-cyan-950/80 border border-cyan-500/30 group-hover:border-cyan-400 group-hover:scale-110 transition-all duration-300">
                        <MetallicLogo size="xs" iconOnly />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold text-cyan-700 dark:text-cyan-300 uppercase tracking-wider block">
                          Éxito Validado Xiantra
                        </span>
                        <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400 block">
                          ID: {item.auditId} · {item.verifiedDate}
                        </span>
                      </div>
                    </div>

                    <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 group-hover:animate-ping shrink-0" />
                  </div>

                  {/* Client & Sector Info */}
                  <div>
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-200 transition-colors tracking-tight">
                      {item.company}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      {item.industry} · <span className="text-slate-700 dark:text-slate-300">{item.city}</span>
                    </p>
                  </div>

                  {/* Primary & Secondary Quantitative Metrics with Hover Micro-Animation */}
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    <div className="p-3 rounded-xl bg-slate-50/90 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800/90 group-hover:border-emerald-500/40 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-xl sm:text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform origin-left">
                          {item.primaryMetric}
                        </span>
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                      </div>
                      <span className="text-[10px] text-slate-600 dark:text-slate-300 leading-tight block mt-1">
                        {item.metricLabel}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50/90 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800/90 group-hover:border-cyan-500/40 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-xl sm:text-2xl font-black font-mono text-cyan-600 dark:text-cyan-300 group-hover:scale-105 transition-transform origin-left">
                          {item.secondaryMetric}
                        </span>
                        <Zap className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400 opacity-70 group-hover:scale-125 transition-transform shrink-0" />
                      </div>
                      <span className="text-[10px] text-slate-600 dark:text-slate-300 leading-tight block mt-1">
                        {item.secondaryLabel}
                      </span>
                    </div>
                  </div>

                  {/* Executive Testimonial Quote */}
                  <div className="relative pt-1">
                    <Quote className="w-4 h-4 text-cyan-500/40 dark:text-cyan-400/40 mb-1 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors" />
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Footer: Executive Attribution & Xiantra Official Stamp */}
                <div className="relative z-10 mt-6 pt-3.5 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">{item.executive}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block">{item.role}</span>
                  </div>

                  <div className="inline-flex items-center gap-1 text-[10px] font-mono text-cyan-600 dark:text-cyan-400 group-hover:translate-x-0.5 transition-transform">
                    <span>Auditado</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= BOTTOM OFFICIAL XIANTRA GUARANTEE BAR ================= */}
        <div className="mt-8 sm:mt-10 p-5 sm:p-6 rounded-2xl glass-panel-neon flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="shrink-0">
              <MetallicLogo size="sm" showSubtitle={false} />
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block" />
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                Infraestructura Certificada por Xiantra Digital Solutions
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Cada proyecto incluye telemetría en vivo, velocidad &lt; 0.8s y el agente ejecutivo Xian 24/7.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onOpenDemo}
              className="flex-1 sm:flex-initial min-h-[44px] px-4 py-2.5 rounded-xl glass-panel hover:border-cyan-500/40 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
            >
              Ver Panel en Vivo
            </button>
            <button
              onClick={onOpenQuote}
              className="flex-1 sm:flex-initial min-h-[44px] px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-xs font-bold text-white shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Validar Mi Empresa</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
