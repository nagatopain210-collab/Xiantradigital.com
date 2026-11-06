import React from 'react';
import {
  Globe,
  Bot,
  ArrowRight,
  BarChart3,
  CreditCard,
  Zap,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Calculator,
  Headphones,
} from 'lucide-react';
import { trackConversionEvent } from '../utils/analytics';

interface ServicesProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

interface CommercialSolution {
  id: string;
  number: string;
  title: string;
  concreteBenefit: string;
  shortExplanation: string;
  metricBadge: string;
  ctaLabel: string;
  quoteServiceKey: string;
  icon: React.ReactNode;
  featured?: boolean;
}

const COMMERCIAL_SOLUTIONS: CommercialSolution[] = [
  {
    id: 'smart-web',
    number: '01',
    title: 'Desarrollo de Páginas Web Inteligentes',
    concreteBenefit: 'Convierte hasta 3.4x más visitantes en clientes reales',
    shortExplanation:
      'Sitios empresariales con carga instantánea (<0.8s en móviles), arquitectura persuasiva B2B y posicionamiento técnico en Google para captar compradores activos.',
    metricBadge: 'Carga < 0.8s · Score 99/100',
    ctaLabel: 'Cotizar Web Inteligente',
    quoteServiceKey: 'Desarrollo de Página Web Inteligente',
    icon: <Globe className="w-5 h-5 text-emerald-400" />,
    featured: true,
  },
  {
    id: 'ai-chatbots',
    number: '02',
    title: 'Chatbots con Inteligencia Artificial',
    concreteBenefit: 'Atiende y vende en WhatsApp las 24 horas en < 0.3s',
    shortExplanation:
      'Agentes entrenados con tus productos, precios y políticas que responden preguntas, filtran prospectos y cierran ventas sin pagar nómina nocturna.',
    metricBadge: 'API Oficial WhatsApp 24/7',
    ctaLabel: 'Implementar Chatbot IA',
    quoteServiceKey: 'Chatbot con Inteligencia Artificial 24/7',
    icon: <Bot className="w-5 h-5 text-cyan-400" />,
    featured: true,
  },
  {
    id: 'customer-automation',
    number: '03',
    title: 'Automatización de Atención al Cliente',
    concreteBenefit: 'Ahorra +15 horas semanales en tareas repetitivas',
    shortExplanation:
      'Agendamiento automático de citas, recordatorios por WhatsApp, respuestas a preguntas frecuentes y derivación inteligente a tu equipo comercial.',
    metricBadge: 'Cero Clientes Ignorados',
    ctaLabel: 'Automatizar mi Atención',
    quoteServiceKey: 'Automatización de Atención al Cliente',
    icon: <Headphones className="w-5 h-5 text-emerald-400" />,
  },
  {
    id: 'digital-catalogs',
    number: '04',
    title: 'Catálogos Digitales Interactivos',
    concreteBenefit: 'Tus clientes exploran y piden desde su celular en segundos',
    shortExplanation:
      'Vitrinas digitales ultrarrápidas con filtros por categoría, fichas técnicas descargables en PDF y botón de pedido directo a WhatsApp.',
    metricBadge: '100% Optimizado Móvil',
    ctaLabel: 'Crear Catálogo Digital',
    quoteServiceKey: 'Catálogo Digital Interactivo',
    icon: <BookOpen className="w-5 h-5 text-cyan-400" />,
  },
  {
    id: 'smart-quoters',
    number: '05',
    title: 'Cotizadores Inteligentes en Línea',
    concreteBenefit: 'Entrega presupuestos inmediatos cuando el cliente está listo',
    shortExplanation:
      'Calculadoras interactivas que estiman precios según volumen, medidas o servicios seleccionados, capturando los datos del comprador al instante.',
    metricBadge: '+240% Solicitudes B2B',
    ctaLabel: 'Configurar Cotizador',
    quoteServiceKey: 'Sistema Cotizador Inteligente B2B',
    icon: <Calculator className="w-5 h-5 text-emerald-400" />,
  },
  {
    id: 'lead-systems',
    number: '06',
    title: 'Sistemas de Captura y Gestión de Leads',
    concreteBenefit: 'Control total de tus prospectos en Tu Centro de Mando',
    shortExplanation:
      'Formularios móviles de 1 paso sincronizados con tu panel gerencial para clasificar clientes por presupuesto, urgencia y canal de origen.',
    metricBadge: 'Panel Incluido Gratis',
    ctaLabel: 'Activar Sistema de Leads',
    quoteServiceKey: 'Sistema de Captura y Gestión de Leads',
    icon: <BarChart3 className="w-5 h-5 text-cyan-400" />,
  },
  {
    id: 'ecommerce-checkout',
    number: '07',
    title: 'Carritos de Compra & Soluciones Comerciales',
    concreteBenefit: 'Reduce el abandono de carrito en -61% con cobro en 1 clic',
    shortExplanation:
      'Tiendas online completas con pasarelas PSE, Wompi, Nequi, Bancolombia y tarjetas, más recuperación automática de pedidos por WhatsApp.',
    metricBadge: '0% Comisión Xiantra',
    ctaLabel: 'Cotizar E-Commerce',
    quoteServiceKey: 'E-Commerce con Carrito y Pagos PSE/Wompi',
    icon: <CreditCard className="w-5 h-5 text-emerald-400" />,
  },
];

export const Services: React.FC<ServicesProps> = ({ onSelectServiceForQuote }) => {
  const handleSelectSolution = (title: string) => {
    trackConversionEvent('service_click', title, 'services_section');
    onSelectServiceForQuote(title);
  };

  return (
    <section id="servicios" className="section-padding-fluid relative overflow-hidden">
      <div className="container-xiantra">
        {/* ================= SECTION HEADER: RESULTS OVER FEATURES ================= */}
        <div className="max-w-3xl mb-8 sm:mb-14 space-y-3.5">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-emerald-400 uppercase bg-slate-900/90 border border-emerald-500/30 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>SOLUCIONES COMERCIALES CON INTELIGENCIA ARTIFICIAL</span>
          </div>

          <h2 className="heading-section-fluid font-black text-slate-900 dark:text-white tracking-tight">
            No solo diseñamos páginas web:{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              construimos sistemas digitales que atraen clientes y multiplican tus ventas.
            </span>
          </h2>

          <p className="body-fluid text-slate-600 dark:text-slate-300 font-normal">
            Cada solución está diseñada para resolver un cuello de botella comercial: eliminar la lentitud, automatizar la atención y facilitar que tus clientes te compren desde cualquier celular.
          </p>
        </div>

        {/* ================= 7 STRATEGIC COMMERCIAL SOLUTIONS GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
          {COMMERCIAL_SOLUTIONS.map((sol, idx) => {
            // Bento asymmetric spans on desktop (lg:col-span-6 for top 2 featured, lg:col-span-4 for next 3, lg:col-span-6 for last 2)
            let colSpanClass = 'lg:col-span-4';
            if (idx === 0 || idx === 1) colSpanClass = 'lg:col-span-6';
            else if (idx === 5 || idx === 6) colSpanClass = 'lg:col-span-6';

            return (
              <article
                key={sol.id}
                className={`${colSpanClass} rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-7 flex flex-col justify-between transition-all duration-300 group relative overflow-hidden ${
                  sol.featured
                    ? 'glass-panel-neon border border-emerald-500/45 shadow-fintech-card'
                    : 'glass-panel glass-panel-hover border border-slate-200/80 dark:border-slate-800/90'
                }`}
              >
                <div className="space-y-4">
                  {/* Top Bar: Number + Icon + Metric Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center shrink-0 shadow-inner">
                        {sol.icon}
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-400">
                        Solución {sol.number}
                      </span>
                    </div>

                    <span className="text-[10.5px] font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-500/10 dark:bg-emerald-950/80 border border-emerald-500/35 px-2.5 py-1 rounded-full">
                      {sol.metricBadge}
                    </span>
                  </div>

                  {/* Title & Concrete Benefit */}
                  <div className="space-y-1.5">
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {sol.title}
                    </h3>
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>{sol.concreteBenefit}</span>
                    </div>
                  </div>

                  {/* Brief Commercial Explanation */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {sol.shortExplanation}
                  </p>
                </div>

                {/* Action Footer */}
                <div className="mt-5 pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-3">
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    Entrega llave en mano
                  </span>
                  <button
                    type="button"
                    onClick={() => handleSelectSolution(sol.quoteServiceKey)}
                    className="min-h-[42px] px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 dark:text-emerald-300 hover:text-slate-950 border border-emerald-500/30 font-bold text-xs inline-flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
                  >
                    <span>{sol.ctaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* ================= FEATURED AUTOMATION PIPELINE BANNER ================= */}
        <div className="mt-8 sm:mt-12 rounded-2xl sm:rounded-3xl bg-[#08101E] border border-emerald-500/35 p-5 sm:p-8 lg:p-10 shadow-fintech-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            <div className="lg:col-span-6 space-y-3.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5" />
                <span>Atención Comercial Sin Pausas</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-snug">
                ¿Qué pasa cuando un cliente te escribe un domingo a las 11:30 PM?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Con una web tradicional, el cliente se va con la competencia porque nadie responde. Con <strong className="text-white">Xiantra</strong>, tu asistente IA lo atiende en 0.3 segundos, le muestra el catálogo, calcula su cotización y deja la venta lista en tu WhatsApp.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleSelectSolution('Sistema Completo: Web + Chatbot IA 24/7')}
                  className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl btn-xiantra-emerald text-white text-xs sm:text-sm font-extrabold shadow-md cursor-pointer transition-all active:scale-[0.98]"
                >
                  <span>Solicitar Diagnóstico para Mi Empresa</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Visual Funnel Pipeline Mockup */}
            <div className="lg:col-span-6 rounded-2xl bg-slate-950/90 border border-slate-800 p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
                <span className="text-emerald-400 font-bold">FLUJO DE CONVERSIÓN AUTOMÁTICO</span>
                <span>Respuesta: 0.28s</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold shrink-0">
                    1
                  </span>
                  <div>
                    <span className="font-bold text-white block">Visita en tu Web Inteligente</span>
                    <span className="text-[11px] text-slate-400">Carga en &lt; 0.8s en cualquier celular</span>
                  </div>
                </div>
                <span className="text-emerald-400 font-mono font-bold text-[11px] shrink-0">+89% retención</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-emerald-500/40 flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">
                    2
                  </span>
                  <div>
                    <span className="font-bold text-white block">Filtro y Cotización por IA</span>
                    <span className="text-[11px] text-slate-400">Califica presupuesto y envía catálogo</span>
                  </div>
                </div>
                <span className="text-emerald-400 font-mono font-bold text-[11px] shrink-0">24/7 Activo</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold shrink-0">
                    3
                  </span>
                  <div>
                    <span className="font-bold text-white block">Cierre en WhatsApp o Pago PSE</span>
                    <span className="text-[11px] text-slate-400">Registro inmediato en Tu Centro de Mando</span>
                  </div>
                </div>
                <span className="text-cyan-400 font-mono font-bold text-[11px] shrink-0">3.4x ROI</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
