import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Zap,
  Bot,
  MessageSquare,
  Sparkles,
  User,
  Mail,
  BarChart3,
  Users,
  Check,
  Lock,
  ArrowUpRight,
  DollarSign,
  Smartphone,
  ChevronRight,
  Layers,
  FileSearch,
  Globe,
  Calendar,
  Star,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/copyData';
import { trackConversionEvent } from '../utils/analytics';

interface HeroProps {
  onOpenQuote: (serviceTitle?: string) => void;
  onOpenContact: () => void;
  onOpenDemo: () => void;
}

type DemoScenarioKey = 'b2b-machine' | 'ecommerce-cart' | 'health-booking';

interface CompactScenario {
  id: DemoScenarioKey;
  label: string;
  badge: string;
  clientQuery: string;
  aiResponse: string;
  resultMetric: string;
  quoteValue: string;
}

const COMPACT_SCENARIOS: Record<DemoScenarioKey, CompactScenario> = {
  'b2b-machine': {
    id: 'b2b-machine',
    label: 'Industria & B2B',
    badge: 'Cotizador IA · 0.3s',
    clientQuery: '“Necesito cotización de Cortadora Láser 3kW con envío a Bogotá.”',
    aiResponse:
      '¡Hola! Entrega en 5 días hábiles. Inversión base: $14.500.000 COP con garantía de 1 año. Te envié la ficha técnica en PDF a tu WhatsApp.',
    resultMetric: '+240% Cotizaciones B2B',
    quoteValue: 'Lead Clase A (Score 98/100)',
  },
  'ecommerce-cart': {
    id: 'ecommerce-cart',
    label: 'Catálogo & Pagos',
    badge: 'Checkout 1-Clic',
    clientQuery: '“Quiero pedir 80 unidades mayoristas y pagar por PSE.”',
    aiResponse:
      'Pedido #D-4821 listo. Generé tu link de pago directo por PSE / Wompi ($3.890.000 COP) con despacho hoy mismo.',
    resultMetric: '+185% Ventas Cerradas',
    quoteValue: 'Pago PSE Sincronizado',
  },
  'health-booking': {
    id: 'health-booking',
    label: 'Servicios & Citas',
    badge: 'Agenda 24/7',
    clientQuery: '“¿Tienen valoración disponible este jueves por la tarde?”',
    aiResponse:
      '¡Claro! Cupo reservado este Jueves 5:15 PM. Sincronicé tu cita en Google Calendar y envié recordatorio automático.',
    resultMetric: '94% Citas en Automático',
    quoteValue: 'Cero Inasistencias',
  },
};

export const Hero: React.FC<HeroProps> = ({ onOpenQuote, onOpenDemo }) => {
  // Mobile interactive view mode: 'ai-card' (compact visual showcase) vs 'advisory-form' (streamlined lead form)
  const [mobileConsoleTab, setMobileConsoleTab] = useState<'ai-card' | 'advisory-form'>('ai-card');
  const [activeScenario, setActiveScenario] = useState<DemoScenarioKey>('b2b-machine');

  // Real-time metrics ticker
  const [liveVisitors, setLiveVisitors] = useState(24);
  const [leadsCapturedToday, setLeadsCapturedToday] = useState(38);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveVisitors((prev) => {
        const change = Math.floor(Math.random() * 3) - 1;
        const next = prev + change;
        return next >= 19 && next <= 33 ? next : 24;
      });
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  // Lead capture form state with anti-spam honeypot and instant validation
  const [advisoryForm, setAdvisoryForm] = useState({
    fullName: '',
    phone: '',
    country: 'Colombia (+57)',
    email: '',
    honeypot: '', // Anti-spam silent field
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const countryOptions = [
    'Colombia (+57)',
    'México (+52)',
    'Estados Unidos (+1)',
    'España (+34)',
    'Chile (+56)',
    'Perú (+51)',
    'Argentina (+54)',
    'Ecuador (+593)',
    'Panamá (+507)',
    'Costa Rica (+506)',
    'Guatemala (+502)',
    'Otro País (Internacional)',
  ];

  const validateAndSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Spam protection: if hidden honeypot is filled, silently abort
    if (advisoryForm.honeypot.trim() !== '') {
      return;
    }

    if (advisoryForm.fullName.trim().length < 3) {
      setFormError('Por favor ingresa tu nombre y apellido.');
      return;
    }

    const cleanPhone = advisoryForm.phone.replace(/\D/g, '');
    if (cleanPhone.length < 7) {
      setFormError('Ingresa un número de celular o WhatsApp válido.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(advisoryForm.email.trim())) {
      setFormError('Ingresa un correo electrónico válido.');
      return;
    }

    setIsSubmittingForm(true);
    trackConversionEvent('form_submit', `Diagnóstico 15 Min (${advisoryForm.country})`, 'hero_form');

    setTimeout(() => {
      setIsSubmittingForm(false);
      setFormSubmitted(true);
      setLeadsCapturedToday((prev) => prev + 1);
    }, 450);
  };

  const handleScrollToSolutions = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    trackConversionEvent('service_click', 'Conocer nuestras soluciones Hero', 'hero');
    const target = document.querySelector('#servicios');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentScenario = COMPACT_SCENARIOS[activeScenario];

  return (
    <section id="inicio" className="relative pt-4 pb-12 sm:pt-10 sm:pb-20 lg:pt-14 lg:pb-28 overflow-hidden bg-grid-tech">
      {/* Dynamic Multi-Glow Background: Optimized for Desktop, Clean on Mobile */}
      <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-[min(1100px,96vw)] h-[620px] bg-gradient-to-tr from-emerald-600/15 via-cyan-500/10 to-blue-600/10 blur-[150px] -z-10 pointer-events-none rounded-full" />

      <div className="container-xiantra">
        {/* ================= HERO 7:5 ASYMMETRIC GRID (DESKTOP) / MOBILE-FIRST CONVERSION STACK (MOBILE) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">
          
          {/* ================= LEFT COLUMN: IMMEDIATE VALUE PROPOSITION & STRATEGIC CTAS (7 COLS) ================= */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">
            
            {/* Top Status Indicator: Linear / Vercel Style */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/40 shadow-sm">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[10.5px] sm:text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                Páginas Web Inteligentes &amp; Automatización IA 24/7
              </span>
              <span className="hidden sm:inline text-slate-500">|</span>
              <span className="hidden sm:inline text-[11px] font-mono text-slate-300">
                100% Código Propietario
              </span>
            </div>

            {/* Potent Commercial H1 Headline */}
            <h1 className="heading-hero-fluid font-black tracking-tight text-slate-900 dark:text-white leading-[1.09]">
              Transformamos negocios tradicionales en empresas capaces de{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                atraer clientes y vender automáticamente 24/7.
              </span>
            </h1>

            {/* Clear, Results-Oriented Subtitle (Concise on Mobile, Detailed on Desktop) */}
            <p className="body-fluid text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl">
              Diseñamos sistemas comerciales completos con{' '}
              <strong className="text-slate-900 dark:text-white font-semibold">carga ultra-rápida (&lt;0.8s)</strong>,{' '}
              <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">chatbots con IA en WhatsApp</strong>{' '}
              que califican y cotizan en 2 segundos, y un{' '}
              <strong className="text-slate-900 dark:text-white font-semibold">centro de mando en vivo</strong> para multiplicar tus ventas.
            </p>

            {/* Two Strategic CTAs: 1. Solicitar una cotización | 2. Conocer nuestras soluciones */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <button
                onClick={() => {
                  trackConversionEvent('quote_request', 'Solicitar una cotización Hero', 'hero');
                  onOpenQuote('Cotización Personalizada de Sistema Web + IA');
                }}
                className="w-full sm:w-auto min-h-[50px] sm:min-h-[52px] inline-flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3.5 rounded-xl text-sm sm:text-base font-extrabold text-white btn-xiantra-emerald shadow-emerald-glow transition-all duration-200 cursor-pointer active:scale-[0.98] group"
              >
                <FileSearch className="w-5 h-5 text-emerald-200 shrink-0" />
                <span>Solicitar una cotización</span>
                <ArrowRight className="w-4 h-4 text-emerald-100 group-hover:translate-x-1 transition-transform shrink-0" />
              </button>

              <a
                href="#servicios"
                onClick={handleScrollToSolutions}
                className="w-full sm:w-auto min-h-[48px] sm:min-h-[52px] inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-xl text-sm font-bold text-slate-900 dark:text-slate-100 glass-panel hover:border-emerald-500/50 hover:bg-slate-100/90 dark:hover:bg-slate-800/90 transition-all duration-200 cursor-pointer active:scale-[0.98]"
              >
                <Layers className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Conocer nuestras soluciones</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </a>
            </div>

            {/* Structured Trust Metrics Strip (Compact 2x2 on Mobile, 4-col on Tablet/Desktop) */}
            <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-0 rounded-xl bg-slate-900/40 sm:bg-transparent border border-slate-800/60 sm:border-0">
                <span className="text-lg sm:text-2xl font-black font-mono text-emerald-500 dark:text-emerald-400 tabular-nums">
                  4.9 / 5
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                  +120 Empresas Activas
                </span>
              </div>

              <div className="p-2.5 sm:p-0 rounded-xl bg-slate-900/40 sm:bg-transparent border border-slate-800/60 sm:border-0">
                <span className="text-lg sm:text-2xl font-black font-mono text-slate-900 dark:text-white tabular-nums">
                  +$3.4M USD
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                  En Ventas Procesadas
                </span>
              </div>

              <div className="p-2.5 sm:p-0 rounded-xl bg-slate-900/40 sm:bg-transparent border border-slate-800/60 sm:border-0">
                <span className="text-lg sm:text-2xl font-black font-mono text-cyan-600 dark:text-cyan-400 tabular-nums">
                  &lt; 0.8s
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                  Velocidad Móvil Real
                </span>
              </div>

              <div className="p-2.5 sm:p-0 rounded-xl bg-slate-900/40 sm:bg-transparent border border-slate-800/60 sm:border-0">
                <span className="text-lg sm:text-2xl font-black font-mono text-slate-900 dark:text-white tabular-nums">
                  90 Días
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                  Garantía por Contrato
                </span>
              </div>
            </div>

            {/* Quick Micro-Trust Signals */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 shrink-0" />
                <span>WhatsApp Cloud API Oficial</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-500 shrink-0" />
                <span>Pagos PSE, Wompi, Bancolombia y Stripe</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500 shrink-0" />
                <span>Entrega Llave en Mano en 7 a 14 Días</span>
              </span>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: COMPACT INTERACTIVE AI CARD ON MOBILE / FULL CONSOLE ON DESKTOP (5 COLS) ================= */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-2xl sm:rounded-3xl bg-[#070D18]/95 border border-emerald-500/40 hover:border-emerald-500/60 transition-all duration-300 shadow-[0_20px_50px_rgba(2,6,15,0.85)] ring-1 ring-white/10 overflow-hidden">
              
              {/* Mobile Segmented Switcher: Compact AI Demo vs Quick Diagnostic Form */}
              <div className="lg:hidden p-2 bg-[#050912] border-b border-white/10 grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => setMobileConsoleTab('ai-card')}
                  className={`min-h-[42px] px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    mobileConsoleTab === 'ai-card'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-sm'
                      : 'text-slate-300 hover:text-white bg-slate-900/70'
                  }`}
                >
                  <Zap className="w-3.5 h-3.5 shrink-0" />
                  <span>Demostración IA</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMobileConsoleTab('advisory-form')}
                  className={`min-h-[42px] px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    mobileConsoleTab === 'advisory-form'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-sm'
                      : 'text-slate-300 hover:text-white bg-slate-900/70'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  <span>Diagnóstico Gratis</span>
                </button>
              </div>

              {/* ================= MOBILE TAB 1: COMPACT INTERACTIVE AI SOLUTION SHOWCASE ================= */}
              <div className={`${mobileConsoleTab === 'ai-card' ? 'block' : 'hidden'} lg:hidden p-4 sm:p-5 space-y-4 bg-[#070D18]`}>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] font-mono font-bold text-white uppercase tracking-wider">
                      Simulador de Solución Digital
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-950/90 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                    {currentScenario.badge}
                  </span>
                </div>

                {/* Sector Selector Pills */}
                <div className="grid grid-cols-3 gap-1.5">
                  {(Object.keys(COMPACT_SCENARIOS) as DemoScenarioKey[]).map((key) => {
                    const item = COMPACT_SCENARIOS[key];
                    const active = activeScenario === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setActiveScenario(key)}
                        className={`min-h-[38px] px-2 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer truncate ${
                          active
                            ? 'bg-emerald-500/20 border border-emerald-400 text-emerald-300'
                            : 'bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>

                {/* Interactive Conversation & Value Preview */}
                <div className="p-3.5 rounded-2xl bg-slate-950/95 border border-slate-800/90 space-y-3 text-xs">
                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      Cliente
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 leading-relaxed">
                      {currentScenario.clientQuery}
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <div className="p-2.5 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-100 leading-relaxed">
                      <span className="text-[10px] font-mono text-emerald-400 font-bold block mb-0.5">
                        Agente IA Xiantra · Respuesta en 0.3s
                      </span>
                      {currentScenario.aiResponse}
                    </div>
                  </div>

                  {/* Result Metric Bar */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-emerald-400 font-bold">{currentScenario.resultMetric}</span>
                    <span className="text-cyan-300">{currentScenario.quoteValue}</span>
                  </div>
                </div>

                {/* Action Triggers inside Compact Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => setMobileConsoleTab('advisory-form')}
                    className="w-full min-h-[46px] py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-300 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-95 transition-transform"
                  >
                    <Calendar className="w-4 h-4 text-slate-950 shrink-0" />
                    <span>Reservar Diagnóstico Gratis (15 min)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      trackConversionEvent('demo_open', 'Abrir Centro de Mando desde Hero Móvil', 'hero_mobile_card');
                      onOpenDemo();
                    }}
                    className="w-full min-h-[44px] py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <BarChart3 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Ver Tu Centro de Mando</span>
                  </button>
                </div>
              </div>

              {/* ================= DESKTOP DEFAULT & MOBILE TAB 2: EXECUTIVE ADVISORY FORM ================= */}
              <div className={`${mobileConsoleTab === 'advisory-form' ? 'block' : 'hidden'} lg:block`}>
                {/* Console Top Bar: Executive Advisor Header */}
                <div className="px-4 sm:px-5 py-3.5 bg-gradient-to-r from-[#0A1322] via-[#08101E] to-[#0A1322] border-b border-white/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-400/80 shrink-0 shadow-md">
                      <img
                        src="/images/advisor_corporate_man_1793654807154.jpg"
                        alt="Consultor Estratégico IA Xiantra"
                        width={40}
                        height={40}
                        fetchPriority="high"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm truncate">Asesoría Estratégica</span>
                        <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                          15 MIN · GRATIS
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 block truncate">
                        Consultor Senior en IA y Crecimiento B2B
                      </span>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-500/30 px-2.5 py-1 rounded-lg shrink-0">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="tabular-nums">Sin Costo</span>
                  </div>
                </div>

                {/* Form Content Area */}
                <div className="p-4 sm:p-6 space-y-4 bg-[#070D18]/90">
                  {!formSubmitted ? (
                    <form onSubmit={validateAndSubmitForm} className="space-y-3.5" noValidate>
                      {/* Hidden Honeypot Input for Anti-Spam */}
                      <input
                        type="text"
                        name="website_url_verification"
                        tabIndex={-1}
                        autoComplete="off"
                        value={advisoryForm.honeypot}
                        onChange={(e) => setAdvisoryForm({ ...advisoryForm, honeypot: e.target.value })}
                        className="hidden"
                        aria-hidden="true"
                      />

                      <div className="space-y-1.5">
                        <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>Diagnóstico gratuito en 45 segundos</span>
                        </div>

                        <h2 className="text-base sm:text-lg font-black text-white tracking-tight leading-snug">
                          Descubre cómo atraer más clientes con una página web inteligente
                        </h2>

                        <p className="text-xs text-slate-300 leading-relaxed hidden sm:block">
                          Analizamos tu negocio y te mostramos cómo implementar una web con IA, catálogo interactivo y atención en WhatsApp 24/7.
                        </p>

                        {/* Confidence Badges */}
                        <div className="grid grid-cols-2 gap-1.5 pt-1.5 pb-1 border-y border-white/5 text-[11px] text-slate-200">
                          <div className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>Sin compromiso</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>Propuesta a medida</span>
                          </div>
                        </div>
                      </div>

                      {formError && (
                        <div
                          role="alert"
                          className="p-2.5 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-200 text-xs font-medium"
                        >
                          {formError}
                        </div>
                      )}

                      {/* Mobile-Friendly Form Inputs */}
                      <div className="space-y-3">
                        {/* 1. Nombre y Apellido */}
                        <div>
                          <label htmlFor="hero-fullname" className="block text-xs font-semibold text-slate-200 mb-1">
                            Nombre y Apellido <span className="text-emerald-400">*</span>
                          </label>
                          <div className="relative">
                            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                            <input
                              id="hero-fullname"
                              type="text"
                              name="name"
                              autoComplete="name"
                              required
                              value={advisoryForm.fullName}
                              onChange={(e) => {
                                setFormError(null);
                                setAdvisoryForm({ ...advisoryForm, fullName: e.target.value });
                              }}
                              placeholder="Ej. Carlos Restrepo"
                              className="w-full min-h-[46px] pl-10 pr-3.5 py-2.5 bg-[#0C1526] border border-slate-700/80 rounded-xl text-base sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/25 transition-all"
                            />
                          </div>
                        </div>

                        {/* 2 & 3. Celular / WhatsApp y País */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label htmlFor="hero-phone" className="block text-xs font-semibold text-slate-200 mb-1">
                              Celular / WhatsApp <span className="text-emerald-400">*</span>
                            </label>
                            <div className="relative">
                              <Smartphone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                              <input
                                id="hero-phone"
                                type="tel"
                                name="tel"
                                inputMode="tel"
                                autoComplete="tel"
                                required
                                value={advisoryForm.phone}
                                onChange={(e) => {
                                  setFormError(null);
                                  setAdvisoryForm({ ...advisoryForm, phone: e.target.value });
                                }}
                                placeholder="310 123 4567"
                                className="w-full min-h-[46px] pl-10 pr-3.5 py-2.5 bg-[#0C1526] border border-slate-700/80 rounded-xl text-base sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/25 transition-all font-mono"
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="hero-country" className="block text-xs font-semibold text-slate-200 mb-1">
                              País <span className="text-emerald-400">*</span>
                            </label>
                            <div className="relative">
                              <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                              <select
                                id="hero-country"
                                name="country"
                                required
                                value={advisoryForm.country}
                                onChange={(e) => setAdvisoryForm({ ...advisoryForm, country: e.target.value })}
                                className="w-full min-h-[46px] pl-10 pr-8 py-2.5 bg-[#0C1526] border border-slate-700/80 rounded-xl text-base sm:text-sm text-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/25 transition-all cursor-pointer appearance-none"
                              >
                                {countryOptions.map((country) => (
                                  <option key={country} value={country} className="bg-slate-950 text-white py-1">
                                    {country}
                                  </option>
                                ))}
                              </select>
                              <ChevronRight className="w-4 h-4 text-slate-400 absolute right-3 top-3.5 rotate-90 pointer-events-none" />
                            </div>
                          </div>
                        </div>

                        {/* 4. Correo Electrónico */}
                        <div>
                          <label htmlFor="hero-email" className="block text-xs font-semibold text-slate-200 mb-1">
                            Correo Electrónico <span className="text-emerald-400">*</span>
                          </label>
                          <div className="relative">
                            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                            <input
                              id="hero-email"
                              type="email"
                              name="email"
                              inputMode="email"
                              autoComplete="email"
                              required
                              value={advisoryForm.email}
                              onChange={(e) => {
                                setFormError(null);
                                setAdvisoryForm({ ...advisoryForm, email: e.target.value });
                              }}
                              placeholder="carlos@tuempresa.com"
                              className="w-full min-h-[46px] pl-10 pr-3.5 py-2.5 bg-[#0C1526] border border-slate-700/80 rounded-xl text-base sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/25 transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Primary Conversion Button */}
                      <button
                        type="submit"
                        disabled={isSubmittingForm}
                        className="w-full min-h-[52px] py-3.5 px-5 rounded-xl font-black text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-300 hover:from-emerald-300 hover:to-teal-200 shadow-[0_0_25px_rgba(16,185,129,0.45)] transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.99] group mt-2"
                      >
                        {isSubmittingForm ? (
                          <span className="flex items-center gap-2 font-bold text-slate-950">
                            <Clock className="w-4 h-4 animate-spin" />
                            <span>Reservando tu Espacio...</span>
                          </span>
                        ) : (
                          <>
                            <Calendar className="w-4 h-4 text-slate-950 shrink-0" />
                            <span>Quiero mi diagnóstico gratuito de 15 min</span>
                            <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform shrink-0" />
                          </>
                        )}
                      </button>

                      {/* Confidence Footer */}
                      <div className="pt-2 flex items-center justify-between text-[11px] text-slate-300 border-t border-white/5">
                        <span className="flex items-center gap-1">
                          <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span>Datos 100% protegidos</span>
                        </span>
                        <span className="flex items-center gap-1 font-mono text-emerald-400 font-semibold">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
                          <span>Respuesta &lt; 2 horas</span>
                        </span>
                      </div>
                    </form>
                  ) : (
                    /* Confirmation State with Direct WhatsApp Connection */
                    <div className="text-center py-5 sm:py-6 space-y-4 animate-in fade-in duration-200">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto">
                        <Check className="w-6 h-6" />
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                          Diagnóstico Confirmado
                        </span>
                        <h3 className="text-lg font-black text-white">
                          ¡Solicitud Recibida con Éxito!
                        </h3>
                        <p className="text-xs text-slate-300 max-w-sm mx-auto">
                          Gracias <strong className="text-white">{advisoryForm.fullName}</strong>. Hemos reservado tu diagnóstico para tu empresa en <strong className="text-emerald-400">{advisoryForm.country}</strong>.
                        </p>
                      </div>

                      <a
                        href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
                          `Hola Xiantra, acabo de reservar mi diagnóstico gratuito de 15 minutos para mi empresa en ${advisoryForm.country}.\n\n• Nombre: ${advisoryForm.fullName}\n• Celular: ${advisoryForm.phone}\n• Correo: ${advisoryForm.email}\n\nQuedo atento a la confirmación.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => trackConversionEvent('whatsapp_click', 'Confirmar Reserva Hero Form WhatsApp', 'hero_form')}
                        className="min-h-[48px] w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg cursor-pointer transition-all active:scale-[0.99]"
                      >
                        <MessageSquare className="w-4 h-4 text-slate-950" />
                        <span>Confirmar por WhatsApp Ahora</span>
                        <ArrowRight className="w-4 h-4 text-slate-950" />
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          setFormSubmitted(false);
                          setAdvisoryForm({
                            fullName: '',
                            phone: '',
                            country: 'Colombia (+57)',
                            email: '',
                            honeypot: '',
                          });
                        }}
                        className="text-[11px] text-slate-400 hover:text-white transition-colors underline block mx-auto cursor-pointer"
                      >
                        Editar datos o registrar otra solicitud
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= SOLUTION SHOWCASE: TU CENTRO DE MANDO GERENCIAL ================= */}
        <div className="mt-12 sm:mt-18 max-w-6xl mx-auto">
          <div className="text-center mb-6 sm:mb-8 px-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[11px] sm:text-xs font-mono font-bold tracking-wide mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>INCLUIDO CON TU NUEVA PÁGINA WEB · SIN COSTO MENSUAL</span>
            </div>
            
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Tu Centro de Mando 24/7:{' '}
              <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Sabrás exactamente cuánto dinero produce tu web cada día
              </span>
            </h2>

            <p className="mt-2.5 text-xs sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              No te entregamos una página ciega. Controla desde tu celular cuántos prospectos entran, qué responde tu IA en WhatsApp y tus ventas cerradas 24/7.
            </p>
          </div>

          <div className="rounded-2xl sm:rounded-3xl glass-panel-neon border border-emerald-500/30 overflow-hidden shadow-fintech-card">
            {/* Topbar of Control Panel Mockup */}
            <div className="px-4 sm:px-6 py-3 border-b border-white/10 bg-slate-950/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
              <div className="flex items-center justify-between sm:justify-start gap-3">
                <div className="flex items-center gap-1.5 pr-2.5 border-r border-slate-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px] text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white font-bold">TU CENTRO DE MANDO EN VIVO</span>
                  <span className="text-slate-600 hidden md:inline">|</span>
                  <span className="text-emerald-400 font-bold hidden md:inline">{liveVisitors} visitantes activos</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  trackConversionEvent('demo_open', 'Probar Demo Interactiva Hero Panel', 'hero_panel');
                  onOpenDemo();
                }}
                className="w-full sm:w-auto min-h-[40px] px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
              >
                <BarChart3 className="w-3.5 h-3.5 text-slate-950" />
                <span>Probar Centro de Mando Interactivo</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
              </button>
            </div>

            {/* KPI Summary Cards inside Mockup (2x2 on Mobile, 4-col on Desktop) */}
            <div className="p-3.5 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 bg-slate-950/75">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 mb-1 text-[11px] sm:text-xs">
                    <span>Leads Hoy</span>
                    <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                  </div>
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-xl sm:text-3xl font-black font-mono text-emerald-400 tabular-nums">
                      {leadsCapturedToday}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold font-mono">+38%</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Calificados por IA</p>
                </div>

                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 mb-1 text-[11px] sm:text-xs">
                    <span>En Negociación</span>
                    <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
                  </div>
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-xl sm:text-3xl font-black font-mono text-white tabular-nums">
                      $45.8M
                    </span>
                    <span className="text-[10px] text-cyan-400 font-bold font-mono">COP</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Seguimiento activo</p>
                </div>

                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 mb-1 text-[11px] sm:text-xs">
                    <span>Respuesta IA</span>
                    <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                  </div>
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-xl sm:text-3xl font-black font-mono text-emerald-400 tabular-nums">
                      0.3s
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">24/7</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">En WhatsApp Oficial</p>
                </div>

                <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-slate-900/90 border border-slate-800">
                  <div className="flex items-center justify-between text-slate-400 mb-1 text-[11px] sm:text-xs">
                    <span>Ventas 24/7</span>
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400" />
                  </div>
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-xl sm:text-3xl font-black font-mono text-white tabular-nums">
                      142
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold font-mono">Activas</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Noches y festivos</p>
                </div>
              </div>

              {/* Conversion Graph Vector */}
              <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white">
                      Curva de Adquisición y Cierre de Ventas en Tiempo Real
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      3.4x mayor conversión cuando el prospecto recibe atención en menos de 25 segundos
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-[11px]">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-mono">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" /> Cierre IA WhatsApp
                    </span>
                    <span className="flex items-center gap-1.5 text-cyan-400 font-mono">
                      <span className="w-2 h-2 rounded-full bg-cyan-500 inline-block" /> Tráfico Calificado
                    </span>
                  </div>
                </div>

                <div className="h-24 sm:h-36 w-full relative pt-2">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 800 130" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="emeraldChartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,105 Q100,75 200,85 T400,50 T600,25 T800,10 L800,130 L0,130 Z"
                      fill="url(#emeraldChartGrad)"
                    />
                    <path
                      d="M0,105 Q100,75 200,85 T400,50 T600,25 T800,10"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                    />
                    <circle cx="200" cy="85" r="4.5" fill="#10b981" />
                    <circle cx="600" cy="25" r="4.5" fill="#34d399" />
                    <circle cx="800" cy="10" r="5" fill="#ffffff" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
