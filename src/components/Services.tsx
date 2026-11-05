import React from 'react';
import {
  Globe,
  Bot,
  ArrowRight,
  BarChart3,
  CreditCard,
  Activity,
  Zap,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Smartphone,
  Layers,
  ArrowUpRight,
} from 'lucide-react';

interface ServicesProps {
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectServiceForQuote }) => {
  return (
    <section id="servicios" className="section-padding-fluid relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="container-xiantra">
        {/* ================= SECTION HEADER: FINTECH HIGH IMPACT ================= */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-emerald-400 uppercase bg-slate-900/80 border border-emerald-500/30 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>INFRAESTRUCTURA DE CONVERSIÓN &amp; INTELIGENCIA ARTIFICIAL</span>
          </div>

          <h2 className="heading-section-fluid font-black text-slate-900 dark:text-white tracking-tight">
            Ingeniería de software construida para{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              captar clientes y cerrar ventas en piloto automático.
            </span>
          </h2>

          <p className="body-fluid text-slate-600 dark:text-slate-300 font-normal">
            Eliminamos las páginas web lentas que terminan abandonadas. Integramos velocidad extrema, asesores comerciales con IA y pasarelas de pago colombianas en una plataforma que trabaja por ti las 24 horas del día.
          </p>
        </div>

        {/* ================= FEATURED AUTOMATION BANNER (CORE VISUAL ASSET) ================= */}
        <div className="mb-10 sm:mb-14 rounded-3xl glass-panel-neon border border-emerald-500/40 p-6 sm:p-8 lg:p-10 shadow-fintech-card relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-emerald-500/15 via-cyan-500/10 to-transparent blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                NÚCLEO DE AUTOMATIZACIÓN COMERCIAL 24/7
              </span>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
                ¿Qué pasa cuando un cliente te escribe un domingo a las 11:30 PM?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Con una web tradicional, el cliente se va con la competencia porque nadie responde. Con <strong className="text-slate-900 dark:text-white font-semibold">Xiantra</strong>, el agente de IA lo atiende en 0.3 segundos, resuelve sus dudas con base en tus precios oficiales, le entrega su cotización formal y te agenda la llamada comercial o el pago inmediato por PSE/Wompi.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-700 dark:text-slate-200">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Cero pérdida de prospectos calificados</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Sin pagar horas extras ni nómina nocturna</span>
                </span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onSelectServiceForQuote('Sistema Web Corporativo + IA')}
                  className="min-h-[46px] inline-flex items-center gap-2 px-6 py-2.5 rounded-xl btn-xiantra-emerald text-white text-xs sm:text-sm font-bold shadow-md cursor-pointer transition-all active:scale-[0.99]"
                >
                  <span>Implementar Agente de IA para Mi Empresa</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Visual Funnel Pipeline Mockup */}
            <div className="lg:col-span-6 rounded-2xl bg-slate-950/90 border border-slate-800 p-5 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-2">
                <span className="text-emerald-400 font-bold">EMBUDO DE CONVERSIÓN ACTIVO</span>
                <span>Latencia: 0.28s</span>
              </div>

              {/* Step 1: Inbound Traffic */}
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <span className="font-bold text-white block">Tráfico Cualificado en Web</span>
                    <span className="text-[11px] text-slate-400">Carga en &lt; 0.8s en celulares</span>
                  </div>
                </div>
                <span className="text-emerald-400 font-mono font-bold text-xs">+89% retención</span>
              </div>

              {/* Step 2: Instant AI Qualification */}
              <div className="p-3 rounded-xl bg-slate-900/90 border border-emerald-500/40 flex items-center justify-between gap-3 text-xs shadow-inner">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <span className="font-bold text-white block">Calificación Inmediata por IA</span>
                    <span className="text-[11px] text-slate-400">Filtra curiosos y calcula presupuesto</span>
                  </div>
                </div>
                <span className="text-emerald-400 font-mono font-bold text-xs">&lt; 0.3s respuesta</span>
              </div>

              {/* Step 3: Formal Deal / Payment in WhatsApp */}
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800/80 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <span className="font-bold text-white block">Cierre en WhatsApp / PSE</span>
                    <span className="text-[11px] text-slate-400">Entrega el cliente listo para pagar</span>
                  </div>
                </div>
                <span className="text-cyan-400 font-mono font-bold text-xs">3.4x Retorno</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="md:hidden flex items-center justify-between text-[11px] font-mono text-emerald-600 dark:text-emerald-400 mb-3">
          <span>← Desliza las 4 Capacidades Técnicas →</span>
        </div>

        {/* ================= BENTO GRID ARCHITECTURE (SWIPE ON MOBILE, 2X2 ON TABLET, ASYMMETRIC 8:4 & 5:7 ON DESKTOP) ================= */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6 overflow-x-auto md:overflow-visible snap-x-touch pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 items-stretch">
          
          {/* ================= BENTO CARD 1 (COL SPAN 8 ON DESKTOP): WEB DE ALTO RENDIMIENTO ================= */}
          <div className="min-w-[86vw] sm:min-w-[360px] md:min-w-0 lg:col-span-8 snap-center shrink-0 rounded-3xl glass-panel glass-panel-hover p-6 sm:p-7 lg:p-8 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-5 sm:space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shadow-inner shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block font-semibold">
                      Capacidad 01 · Arquitectura Web
                    </span>
                    <h3 className="heading-card-fluid font-bold text-slate-900 dark:text-white tracking-tight">
                      Plataformas Web de Carga Instantánea (&lt; 0.8s)
                    </h3>
                  </div>
                </div>

                <span className="font-mono text-[11px] sm:text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-1 rounded">
                  Score: 99/100 Core Web Vitals
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                Desarrolladas sobre React, Vite y Tailwind CSS con renderizado optimizado al milisegundo. Garantizan retención total del tráfico móvil y posicionamiento orgánico técnico en Google para búsquedas de compra.
              </p>

              {/* Dynamic Interactive Telemetry Frame */}
              <div className="rounded-2xl bg-slate-50/90 dark:bg-slate-950/95 border border-slate-200 dark:border-slate-800 p-3.5 sm:p-4 space-y-3 font-mono text-xs">
                <div className="flex flex-wrap items-center justify-between gap-1 border-b border-slate-200 dark:border-slate-800/80 pb-2 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    Telemetría en Producción Auditada
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">Red Móvil Colombia 4G/5G</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center font-sans">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                    <span className="block text-[10px] text-slate-500 dark:text-slate-400 uppercase font-mono">FCP</span>
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">0.38s</span>
                    <span className="block text-[9px] text-slate-500 mt-0.5">Instantáneo</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                    <span className="block text-[10px] text-slate-500 dark:text-slate-400 uppercase font-mono">LCP</span>
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">0.72s</span>
                    <span className="block text-[9px] text-slate-500 mt-0.5">Retención 99.8%</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                    <span className="block text-[10px] text-slate-500 dark:text-slate-400 uppercase font-mono">CLS</span>
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 font-mono">0.00</span>
                    <span className="block text-[9px] text-slate-500 mt-0.5">Estabilidad</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                    <span className="block text-[10px] text-slate-500 dark:text-slate-400 uppercase font-mono">Retención</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white font-mono">+89%</span>
                    <span className="block text-[9px] text-slate-500 mt-0.5">vs WordPress</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Desde $799.999 COP</span>
              <button
                onClick={() => onSelectServiceForQuote('Landing Page de Alta Conversión')}
                className="min-h-[40px] inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors cursor-pointer group/link"
              >
                <span>Cotizar Plataforma Web</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* ================= BENTO CARD 2 (COL SPAN 4 ON DESKTOP): AGENTE IA 24/7 ================= */}
          <div className="min-w-[86vw] sm:min-w-[360px] md:min-w-0 lg:col-span-4 snap-center shrink-0 rounded-3xl glass-panel-neon glass-panel-hover p-6 sm:p-7 lg:p-8 flex flex-col justify-between group relative overflow-hidden border border-emerald-500/40">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center text-white shadow-md shadow-emerald-950/30">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="text-[11px] font-mono text-emerald-800 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded font-bold">
                  24/7 ACTIVO
                </span>
              </div>

              <div>
                <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block font-semibold">
                  Capacidad 02 · Inteligencia Comercial
                </span>
                <h3 className="heading-card-fluid font-bold text-slate-900 dark:text-white tracking-tight mt-1">
                  Agente Virtual con IA en WhatsApp
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
                  Conexión directa con la API Oficial de Meta. Responde dudas comerciales, cotiza según tu catálogo y filtra prospectos sin costo por empleado adicional.
                </p>
              </div>

              {/* Chat Simulation Preview Bubble */}
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-sans">
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono border-b border-slate-800 pb-1">
                  <span className="text-emerald-400">● WhatsApp Cloud API</span>
                  <span>Latencia: 0.28s</span>
                </div>
                <div className="text-[11px] bg-emerald-950/50 border border-emerald-800/40 p-2.5 rounded-xl text-emerald-200">
                  &ldquo;Tu cotización preliminar está lista por $14.500.000 COP con entrega en 6 días. ¿Te conecto con un asesor comercial?&rdquo;
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Desde $1.499.999 COP</span>
              <button
                onClick={() => onSelectServiceForQuote('Sistema Web Corporativo + IA')}
                className="min-h-[40px] inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors cursor-pointer group/link"
              >
                <span>Probar Agente</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* ================= BENTO CARD 3 (COL SPAN 5 ON DESKTOP): E-COMMERCE CON CHECKOUT EN 1 CLIC ================= */}
          <div className="min-w-[86vw] sm:min-w-[360px] md:min-w-0 lg:col-span-5 snap-center shrink-0 rounded-3xl glass-panel glass-panel-hover p-6 sm:p-7 lg:p-8 flex flex-col justify-between group">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <CreditCard className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase">
                  Capacidad 03 · Cobros Locales
                </span>
              </div>

              <div>
                <h3 className="heading-card-fluid font-bold text-slate-900 dark:text-white tracking-tight">
                  Checkout en 1 Clic con Wompi, PSE &amp; Nequi
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
                  Reducimos el abandono del carrito al 28% integrando pasarelas bancarias colombianas con verificación instantánea sin registros engorrosos.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-mono">Pasarela</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">PSE &amp; Wompi</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-mono">Abandono</span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">-61%</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-mono">Comisión</span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">0% Xiantra</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Desde $2.799.999 COP</span>
              <button
                onClick={() => onSelectServiceForQuote('Tienda E-Commerce de Alta Conversión')}
                className="min-h-[40px] inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors cursor-pointer group/link"
              >
                <span>Cotizar E-Commerce</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* ================= BENTO CARD 4 (COL SPAN 7 ON DESKTOP): CONTROL PANEL (100% PROPIETARIO) ================= */}
          <div className="min-w-[86vw] sm:min-w-[360px] md:min-w-0 lg:col-span-7 snap-center shrink-0 rounded-3xl glass-panel glass-panel-hover p-6 sm:p-7 lg:p-8 flex flex-col justify-between group">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-1 rounded font-bold">
                  INCLUIDO SIN COSTO
                </span>
              </div>

              <div>
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block font-semibold">
                  Capacidad 04 · Gobernanza de Datos
                </span>
                <h3 className="heading-card-fluid font-bold text-slate-900 dark:text-white tracking-tight mt-1">
                  Panel Administrador Propietario en Tiempo Real
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mt-2">
                  Controla visitas en vivo, prospectos capturados, efectividad de campañas y exportación directa a Excel. Cero dependencia técnica y sin pagar cuotas obligatorias mensuales.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300 font-mono text-[11px]">Sincronización en Vivo activa</span>
                </div>
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">Código fuente 100% tuyo desde el día 1</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between gap-2">
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-mono font-semibold">Bono incluido ($1.200.000 COP)</span>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-admin-demo'))}
                className="min-h-[40px] inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors cursor-pointer group/link"
              >
                <span>Explorar Panel Interactivo</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

        </div>

        {/* ================= MICRO-CASOS DE USO POR SECTOR EMPRESARIAL ================= */}
        <div className="mt-12 sm:mt-16 rounded-3xl bg-[#08101E] border border-slate-800 p-6 sm:p-8 lg:p-10 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                Soluciones Adaptadas a tu Nicho
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                ¿Cómo aplica esta tecnología al modelo de tu empresa?
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Entrenado con la lógica comercial de tu industria
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {/* Sector 1: Salud & Clínicas */}
            <div className="p-5 rounded-2xl bg-[#0C1728] border border-slate-800 hover:border-emerald-500/40 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Clínicas &amp; Salud</span>
                <span className="text-[10px] bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded">24/7 Activo</span>
              </div>
              <h4 className="text-sm font-bold text-white">Agendamiento y Confirmación</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                El chatbot responde dudas sobre tratamientos, califica la urgencia y agenda citas directamente en el calendario de tus doctores.
              </p>
              <div className="text-[11px] text-emerald-400 font-mono pt-1">
                Resultado: -80% citas perdidas por desatención
              </div>
            </div>

            {/* Sector 2: Maquinaria B2B & Industrial */}
            <div className="p-5 rounded-2xl bg-[#0C1728] border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Maquinaria &amp; B2B</span>
                <span className="text-[10px] bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 px-2 py-0.5 rounded">PDF Oficial</span>
              </div>
              <h4 className="text-sm font-bold text-white">Cotizaciones Industriales</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Entrega fichas técnicas en PDF, calcula presupuestos preliminares por calibre o volumen y transfiere el lead calificado a tus ingenieros.
              </p>
              <div className="text-[11px] text-cyan-400 font-mono pt-1">
                Resultado: Respuesta comercial en &lt; 2 seg
              </div>
            </div>

            {/* Sector 3: E-Commerce & Distribución */}
            <div className="p-5 rounded-2xl bg-[#0C1728] border border-slate-800 hover:border-teal-500/40 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-teal-400 uppercase">Comercio &amp; Mayoristas</span>
                <span className="text-[10px] bg-teal-950/80 border border-teal-500/30 text-teal-300 px-2 py-0.5 rounded">Wompi / PSE</span>
              </div>
              <h4 className="text-sm font-bold text-white">Rescate de Carritos y Cobro</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Si un cliente abandona el carrito, el agente le escribe con un cupón personalizado a WhatsApp y le permite pagar con PSE o Nequi en 1 paso.
              </p>
              <div className="text-[11px] text-teal-400 font-mono pt-1">
                Resultado: +35% de carritos recuperados
              </div>
            </div>

            {/* Sector 4: Servicios Profesionales */}
            <div className="p-5 rounded-2xl bg-[#0C1728] border border-slate-800 hover:border-violet-500/40 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-violet-400 uppercase">Consultoría &amp; Servicios</span>
                <span className="text-[10px] bg-violet-950/80 border border-violet-500/30 text-violet-300 px-2 py-0.5 rounded">Filtro de Leads</span>
              </div>
              <h4 className="text-sm font-bold text-white">Calificación y Cierre</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Filtra prospectos curiosos sin presupuesto y solo agenda reuniones con tomadores de decisión que cumplen con el perfil de tu empresa.
              </p>
              <div className="text-[11px] text-violet-400 font-mono pt-1">
                Resultado: 100% reuniones calificadas
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
