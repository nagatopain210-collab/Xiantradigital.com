import React from 'react';
import { Sparkles, Calendar, Code2, Rocket, Check, ArrowRight, Clock, ShieldCheck } from 'lucide-react';

interface ProcessStepsSectionProps {
  onOpenQuote: () => void;
  onOpenDemo: () => void;
}

export const ProcessStepsSection: React.FC<ProcessStepsSectionProps> = ({ onOpenQuote, onOpenDemo }) => {
  const steps = [
    {
      step: '01',
      title: 'Diagnóstico Estratégico de 15 Minutos',
      subtitle: 'Sin costo y 100% personalizado',
      description:
        'Nos reunimos brevemente para evaluar tu situación comercial actual, revisar tus productos o servicios y detectar las fugas de clientes que tienes hoy.',
      deliverables: [
        'Análisis de presencia digital y competencia',
        'Definición de metas de ventas y cotizaciones',
        'Propuesta técnica y presupuesto cerrado en COP',
      ],
      timeframe: 'Día 1',
      icon: Calendar,
      badgeColor: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/70',
    },
    {
      step: '02',
      title: 'Arquitectura, Textos y Agente IA',
      subtitle: 'Nosotros nos encargamos de todo el trabajo pesado',
      description:
        'Redactamos los textos persuasivos de ventas, programamos la página con carga ultrarrápida e integramos el Asistente de IA oficial de WhatsApp con tu catálogo.',
      deliverables: [
        'Diseño y desarrollo con entrega de código fuente',
        'Chatbot entrenado con preguntas frecuentes y precios',
        'Panel de control administrativo con analítica en vivo',
      ],
      timeframe: 'Días 2 a 10',
      icon: Code2,
      badgeColor: 'border-cyan-500/40 text-cyan-400 bg-cyan-950/70',
    },
    {
      step: '03',
      title: 'Lanzamiento y Ventas 24/7',
      subtitle: 'Entrega Llave en Mano lista para facturar',
      description:
        'Publicamos tu nueva plataforma en tu dominio propio, capacitamos a tu equipo en 20 minutos y activamos el sistema para captar clientes en automático.',
      deliverables: [
        'Conexión oficial a pasarelas PSE, Wompi y WhatsApp',
        '90 días de soporte técnico y garantía por contrato',
        'Capacitación gerencial del panel administrador',
      ],
      timeframe: 'Días 10 a 14',
      icon: Rocket,
      badgeColor: 'border-teal-500/40 text-teal-300 bg-teal-950/70',
    },
  ];

  return (
    <section id="proceso" className="section-padding-fluid relative overflow-hidden">
      <div className="container-xiantra relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider bg-emerald-950/70 border border-emerald-500/30 px-3.5 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Metodología Ágil y Sin Fricciones</span>
          </div>

          <h2 className="heading-section-fluid font-black text-slate-900 dark:text-white tracking-tight">
            De la idea a vender 24/7 en{' '}
            <span className="text-gradient-xiantra">3 pasos simples</span>
          </h2>

          <p className="body-fluid text-slate-600 dark:text-slate-300">
            Sabemos que tu tiempo vale oro. Diseñamos un proceso <strong>100% Llave en Mano</strong> donde tú no tienes que redactar textos, ni saber de programación, ni lidiar con servidores.
          </p>

          <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 pt-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Garantía de entrega en 7 a 14 días laborables por contrato</span>
          </div>
        </div>

        {/* Horizontal Timeline Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 relative">
          
          {/* Connecting line on desktop */}
          <div className="hidden md:block absolute top-14 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-emerald-500/40 via-cyan-500/40 to-teal-500/40 pointer-events-none -z-0" />

          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative rounded-2xl bg-[#09111E]/95 border border-slate-800 hover:border-emerald-500/50 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-[0_15px_40px_rgba(2,6,15,0.7)] hover:-translate-y-1 group"
              >
                {/* Top Badge & Number */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#0C1728] border border-slate-700 group-hover:border-emerald-400/80 flex items-center justify-center text-emerald-400 transition-colors shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${item.badgeColor}`}>
                        {item.timeframe}
                      </span>
                      <span className="text-2xl font-black font-mono text-slate-700 group-hover:text-emerald-400/70 transition-colors">
                        {item.step}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-white tracking-tight leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs font-medium text-emerald-400/90 mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Deliverables List */}
                  <div className="pt-2 border-t border-slate-800/80 space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                      Lo que recibes:
                    </span>
                    {item.deliverables.map((deliv, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step Footer Micro-indicator */}
                <div className="pt-5 mt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Cero estrés operativo</span>
                  </span>
                  <span className="font-mono text-emerald-400 font-bold">Paso {index + 1} de 3</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout Bar: Llave en Mano + CTA */}
        <div className="mt-10 sm:mt-12 p-5 sm:p-7 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-[#0A1424] to-cyan-950/60 border border-emerald-500/35 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Garantía Llave en Mano</span>
            </span>
            <h4 className="text-sm sm:text-base font-bold text-white">
              ¿Listo para dar el primer paso sin comprometer tu presupuesto?
            </h4>
            <p className="text-xs text-slate-300">
              El diagnóstico inicial de 15 minutos es completamente gratuito y te entrega un mapa de acción claro.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenQuote}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black text-xs sm:text-sm shadow-[0_0_25px_rgba(16,185,129,0.45)] transition-all flex items-center gap-2 cursor-pointer active:scale-95 whitespace-nowrap"
            >
              <span>Agendar Diagnóstico (15 min)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
