import React from 'react';
import {
  Globe,
  Bot,
  LayoutDashboard,
  Zap,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

interface TrilogySectionProps {
  onOpenBot: () => void;
  onOpenQuote: () => void;
  onOpenDemo: () => void;
}

export const TrilogySection: React.FC<TrilogySectionProps> = ({
  onOpenBot,
  onOpenQuote,
  onOpenDemo,
}) => {
  return (
    <section id="trilogia-de-valor" className="section-padding-fluid relative overflow-hidden">
      <div className="container-xiantra">
        {/* ================= SECTION HEADER ================= */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-emerald-400 uppercase bg-slate-900/90 border border-emerald-500/30 px-3.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>LA TRILOGÍA INDISPENSABLE DE VENTAS B2B</span>
          </div>

          <h2 className="heading-section-fluid font-black text-slate-900 dark:text-white tracking-tight">
            Los 3 Pilares Indispensables para{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Multiplicar Ventas y Ganancias
            </span>
          </h2>

          <p className="body-fluid text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Una página web aislada no responde cotizaciones. Un bot sin una web sólida no genera confianza. Y sin un panel de control, estás volando a ciegas. Unimos los tres pilares en un solo ecosistema comercial.
          </p>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="md:hidden flex items-center justify-between text-[11px] font-mono text-emerald-500 mb-3">
          <span>← Desliza los 3 Pilares Comerciales →</span>
        </div>

        {/* ================= 3 PILLARS CARDS: SWIPE ON MOBILE, 2-COL TABLET, 3-COL DESKTOP ================= */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 overflow-x-auto md:overflow-visible snap-x-touch pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 items-stretch">
          
          {/* ================= PILAR 01: SITIO WEB DE ALTO RENDIMIENTO ================= */}
          <div className="min-w-[85vw] sm:min-w-[350px] md:min-w-0 snap-center shrink-0 rounded-3xl glass-panel glass-panel-hover p-6 sm:p-7 lg:p-8 flex flex-col justify-between group relative overflow-hidden shadow-fintech-card">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-5 sm:space-y-6">
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 shadow-inner group-hover:scale-105 transition-transform">
                  <Globe className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-2.5 py-1 rounded-md uppercase font-bold">
                  Pilar 01 · Web
                </span>
              </div>

              <div>
                <h3 className="heading-card-fluid font-bold text-slate-900 dark:text-white tracking-tight">
                  Sitio Web de Carga Instantánea
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Carga extrema en &lt; 0.8s, responsive mobile impecable y arquitectura de credibilidad corporativa para convertir visitantes fríos en compradores.
                </p>
              </div>

              {/* UI Mockup Mini-Card: Performance Metrics */}
              <div className="rounded-2xl bg-slate-950/90 border border-slate-800 p-3.5 sm:p-4 space-y-3">
                <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                  <span className="font-mono text-slate-400 text-[11px]">Core Web Vitals Test</span>
                  <span className="text-emerald-400 font-bold font-mono">Score: 99/100</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="block text-[10px] text-slate-400 uppercase">Velocidad</span>
                    <span className="text-xs sm:text-sm font-bold text-emerald-400">0.38s FCP</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="block text-[10px] text-slate-400 uppercase">Retención</span>
                    <span className="text-xs sm:text-sm font-bold text-white">+89%</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="block text-[10px] text-slate-400 uppercase">Móvil</span>
                    <span className="text-xs sm:text-sm font-bold text-cyan-400">100% Ok</span>
                  </div>
                </div>
              </div>

              {/* Bullet Features */}
              <ul className="space-y-2.5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Carga milimétrica que evita la fuga del 53% de visitantes en celulares.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Copywriting de alta persuasión enfocado en derribar objeciones comerciales.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Indexación y SEO técnico para dominar búsquedas de intención de compra.</span>
                </li>
              </ul>
            </div>

            {/* Bottom Pillar Footnote */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                Cero plantillas lentas
              </span>
              <span className="font-mono text-[11px] text-emerald-400">React + Vite + Tailwind</span>
            </div>
          </div>

          {/* ================= PILAR 02: AGENTE VIRTUAL CON IA 24/7 (THE CENTRAL CORE) ================= */}
          <div className="min-w-[85vw] sm:min-w-[350px] md:min-w-0 snap-center shrink-0 rounded-3xl glass-panel-neon glass-panel-hover p-6 sm:p-7 lg:p-8 flex flex-col justify-between group relative overflow-hidden ring-2 ring-emerald-500/40 shadow-emerald-glow">
            <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-5 sm:space-y-6">
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-transform">
                  <Bot className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono text-emerald-300 bg-emerald-950/80 border border-emerald-500/50 px-2.5 py-1 rounded-md uppercase font-black">
                  Pilar 02 · Núcleo IA 24/7
                </span>
              </div>

              <div>
                <h3 className="heading-card-fluid font-bold text-slate-900 dark:text-white tracking-tight">
                  Agente Comercial con IA en WhatsApp
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Integrado a WhatsApp Cloud API oficial y Web. Responde en 0.3 segundos, cotiza y califica compradores reales día y noche.
                </p>
              </div>

              {/* UI Mockup Mini-Card: Live Chat Snippet */}
              <div className="rounded-2xl bg-slate-950 border border-slate-800 p-3.5 space-y-2 text-xs font-sans">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono border-b border-slate-800/80 pb-1.5">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    WhatsApp Business Oficial
                  </span>
                  <span className="text-emerald-400 font-bold">0.3s respuesta</span>
                </div>
                <div className="space-y-2 pt-1 text-[11px]">
                  <div className="bg-slate-900 text-slate-300 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-slate-400 font-semibold block text-[10px]">Cliente (11:42 PM):</span>
                    &ldquo;Necesito cotización urgente para entrega en Medellín.&rdquo;
                  </div>
                  <div className="bg-emerald-950/70 border border-emerald-500/40 text-emerald-100 p-2.5 rounded-xl shadow-inner">
                    <span className="text-emerald-300 font-bold block text-[10px]">Agente IA (0.2s):</span>
                    &ldquo;¡Hola! Entrega en 5 días hábiles. Tu cotización base es de $14.5M COP con garantía técnica. ¿Te transfiero con el asesor humano para formalizar?&rdquo;
                  </div>
                </div>
              </div>

              {/* Bullet Features */}
              <ul className="space-y-2.5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Atención 24/7/365: captura clientes que compran de noche o en festivos.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Calificación automática: separa curiosos de prospectos con presupuesto listo.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Traspaso fluido al equipo humano cuando el comprador está listo para cerrar.</span>
                </li>
              </ul>
            </div>

            {/* Bottom Action */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
              <button
                onClick={onOpenBot}
                className="w-full min-h-[46px] inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl btn-xiantra-emerald text-white text-xs font-bold transition-all cursor-pointer shadow-md"
              >
                <Bot className="w-4 h-4" />
                <span>Probar Agente con Xian Ahora</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* ================= PILAR 03: PANEL ADMINISTRADOR INTEGRADO ================= */}
          <div className="min-w-[85vw] sm:min-w-[350px] md:min-w-0 md:col-span-2 lg:col-span-1 snap-center shrink-0 rounded-3xl glass-panel glass-panel-hover p-6 sm:p-7 lg:p-8 flex flex-col justify-between group relative overflow-hidden shadow-fintech-card">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-5 sm:space-y-6">
              {/* Header Badge */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 shadow-inner group-hover:scale-105 transition-transform">
                  <LayoutDashboard className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono text-slate-300 bg-slate-800/80 border border-slate-700 px-2.5 py-1 rounded-md uppercase font-bold">
                  Pilar 03 · Control
                </span>
              </div>

              <div>
                <h3 className="heading-card-fluid font-bold text-slate-900 dark:text-white tracking-tight">
                  Panel Administrador Propietario
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Dashboard visual para auditar visitas en tiempo real, efectividad de anuncios, cotizaciones generadas y exportación en Excel.
                </p>
              </div>

              {/* UI Mockup Mini-Card: Live Dashboard Ticker */}
              <div className="rounded-2xl bg-slate-950/90 border border-slate-800 p-4 space-y-3">
                <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                  <span className="font-mono text-slate-400 text-[11px]">Resumen Comercial Hoy</span>
                  <span className="flex items-center gap-1.5 text-emerald-400 text-[11px] font-mono font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Sincronizado
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-left">
                    <span className="block text-[10px] text-slate-400">Leads Calificados</span>
                    <span className="text-base font-bold text-emerald-400">38 capturados</span>
                    <span className="text-[10px] text-emerald-400 block mt-0.5">+38% vs ayer</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-left">
                    <span className="block text-[10px] text-slate-400">Tasa Conversión</span>
                    <span className="text-base font-bold text-cyan-300">4.8% activa</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">vs 0.9% estándar</span>
                  </div>
                </div>
              </div>

              {/* Bullet Features */}
              <ul className="space-y-2.5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Monitoreo de visitas en vivo y procedencia exacta de campañas (Google y Meta).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Base de datos descargable con nombres, teléfonos y requerimientos calificados.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Sin depender de agencias ni pagar tarifas mensuales por revisar tus métricas.</span>
                </li>
              </ul>
            </div>

            {/* Bottom Action */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
              <button
                onClick={onOpenDemo}
                className="w-full min-h-[46px] inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl glass-panel text-slate-800 dark:text-slate-200 hover:border-emerald-500/50 text-xs font-bold transition-all cursor-pointer"
              >
                <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                <span>Explorar Panel Demo en Vivo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Triad Value Bar */}
        <div className="mt-12 sm:mt-14 p-6 sm:p-8 rounded-3xl glass-panel-neon border border-emerald-500/35 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left shadow-fintech-card">
          <div className="space-y-1.5">
            <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              ¿Por qué los 3 pilares deben trabajar juntos?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Tener una web sin bot es perder el 60% de contactos fuera de horario. Tener un bot sin web no genera confianza. Y sin un panel de control, no sabes qué canal te deja dinero.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={onOpenQuote}
              className="w-full md:w-auto min-h-[48px] px-8 py-3 rounded-xl text-xs sm:text-sm font-bold text-white btn-xiantra-emerald shadow-emerald-glow cursor-pointer transition-all"
            >
              Cotizar Sistema Completo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
