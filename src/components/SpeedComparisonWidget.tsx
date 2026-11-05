import React from 'react';
import { Zap, Clock, AlertTriangle, CheckCircle2, TrendingUp, Smartphone, ShieldCheck, ArrowRight } from 'lucide-react';

interface SpeedComparisonWidgetProps {
  onOpenAudit: () => void;
}

export const SpeedComparisonWidget: React.FC<SpeedComparisonWidgetProps> = ({ onOpenAudit }) => {
  return (
    <section className="py-6 sm:py-10 relative">
      <div className="container-xiantra">
        <div className="rounded-3xl bg-gradient-to-b from-[#09111E] to-[#060B14] border border-slate-800 p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(2,6,15,0.7)] relative overflow-hidden">
          
          {/* Subtle Ambient Backing Glow */}
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 space-y-2.5">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
              <Zap className="w-3.5 h-3.5" />
              <span>Velocidad y Retención Comercial</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Cada segundo de demora te cuesta el 20% de tus clientes
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Google penaliza las páginas lentas y los usuarios en celular no esperan más de 3 segundos. Compara el impacto real en tus ventas:
            </p>
          </div>

          {/* Comparison Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            
            {/* Card 1: Traditional Website */}
            <div className="rounded-2xl bg-slate-950/70 border border-rose-500/30 p-6 space-y-5 relative flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-rose-500/20">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="font-bold text-sm text-slate-200">Sitio Web Tradicional / WordPress</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-rose-400 bg-rose-950/60 border border-rose-500/30 px-2 py-0.5 rounded">
                    4.5 a 6.0 seg
                  </span>
                </div>

                {/* KPI Bars */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Velocidad de carga en celular</span>
                      <span className="font-mono text-rose-400 font-bold">4.8 seg (Lenta)</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-500 w-[85%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">Tasa de abandono de visitantes</span>
                      <span className="font-mono text-rose-400 font-bold">53% se van antes de cargar</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-500/80 w-[53%]" />
                    </div>
                  </div>
                </div>

                {/* Pain bullet points */}
                <ul className="space-y-2 text-xs text-slate-300 pt-2">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>Plugins pesados que se desactualizan y caen la página.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>Cero respuestas de noche o fines de semana: prospectos perdidos.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>Google califica bajo tu anuncio por baja experiencia móvil.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 font-mono">
                Resultado: Gasto mensual sin clientes asegurados
              </div>
            </div>

            {/* Card 2: Xiantra AI Machine */}
            <div className="rounded-2xl bg-[#081220]/90 border border-emerald-500/50 p-6 space-y-5 relative shadow-[0_0_30px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/20 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-emerald-500/30">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-bold text-sm text-white">Máquina Comercial Xiantra con IA</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded">
                    &lt; 0.8 seg
                  </span>
                </div>

                {/* KPI Bars */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">Velocidad de carga en celular</span>
                      <span className="font-mono text-emerald-400 font-bold">&lt; 0.8 seg (Instantánea)</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 w-[15%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">Puntaje Google Core Web Vitals</span>
                      <span className="font-mono text-emerald-400 font-bold">98/100 (Excelente)</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 w-[98%]" />
                    </div>
                  </div>
                </div>

                {/* Benefits bullet points */}
                <ul className="space-y-2 text-xs text-slate-200 pt-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Retienes al 100% de los visitantes que llegan desde anuncios o Google.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Agente de WhatsApp responde en 2 seg con precios y agenda llamadas.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Panel de control en tiempo real para ver tus visitas y prospectos.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="font-mono text-emerald-400 font-bold">Retorno garantizado en contrato</span>
                <button
                  onClick={onOpenAudit}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  <span>Auditar Mi Web Gratis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
