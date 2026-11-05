import React from 'react';
import {
  Globe,
  Bot,
  Zap,
  Smartphone,
  ShieldCheck,
  Search,
  MessageSquare,
  Clock,
  Filter,
  Database,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

interface DualValueSectionProps {
  onOpenBot: () => void;
  onOpenQuote: () => void;
  onOpenDemo: () => void;
}

export const DualValueSection: React.FC<DualValueSectionProps> = ({
  onOpenBot,
  onOpenQuote,
  onOpenDemo,
}) => {
  return (
    <section id="valor-dual" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: Sober SaaS Framing */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-slate-400 uppercase">
            <span className="text-cyan-400 font-bold select-none">—</span>
            <span>Arquitectura Comercial Dual</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Diseño web de alta fidelidad.{' '}
            <span className="bg-gradient-to-r from-slate-200 via-cyan-300 to-white bg-clip-text text-transparent">
              Inteligencia Artificial que vende.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Una página web sin atención inmediata pierde clientes. Un chatbot sin una página confiable no transmite autoridad. Unimos ambos pilares en una sola solución pensada para PYMEs.
          </p>
        </div>

        {/* ================= DUAL VALUE GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* ================= BLOQUE 1: SITIO WEB DE ALTO RENDIMIENTO ================= */}
          <div className="rounded-3xl border border-slate-800 bg-[#080C16]/90 p-8 sm:p-10 flex flex-col justify-between hover:border-slate-700/80 transition-all duration-300 shadow-xl group">
            <div className="space-y-6">
              
              {/* Badge & Pillar Indicator */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700/80 flex items-center justify-center text-cyan-400 shadow-inner">
                  <Globe className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Pilar 01 · Plataforma Web
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Sitio Web de Alto Rendimiento
                </h3>
                <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
                  Infraestructura diseñada para proyectar la máxima credibilidad corporativa y retener visitantes desde el primer segundo.
                </p>
              </div>

              {/* Feature Points */}
              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Velocidad Extrema (&lt; 0.8s)</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      Carga instantánea en cualquier red móvil. Evitas el 53% de abandono que sufren las páginas lentas en WordPress.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Diseño Adaptable (Zona del Pulgar)</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      Optimizado para el 80% del tráfico que navega desde smartphones, con botones accesibles y lectura sin fricción.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Autoridad de Marca & Confianza B2B</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      Estética sobria tipo SaaS internacional que posiciona a tu PYME como líder indiscutible frente a tu competencia.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                    <Search className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Optimización SEO Comercial</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      Estructura semántica preparada para rankear en Google cuando tus clientes buscan cotizar tus servicios.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Pillar Footer CTA */}
            <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Incluye Panel de Control autoadministrable</span>
              <button
                onClick={onOpenDemo}
                className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Ver Maqueta en Vivo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* ================= BLOQUE 2: AGENTE VIRTUAL CON IA ================= */}
          <div className="rounded-3xl border border-slate-800 bg-[#080C16]/90 p-8 sm:p-10 flex flex-col justify-between hover:border-slate-700/80 transition-all duration-300 shadow-xl group">
            <div className="space-y-6">
              
              {/* Badge & Pillar Indicator */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700/80 flex items-center justify-center text-cyan-400 shadow-inner">
                  <Bot className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold">
                  Pilar 02 · Agente IA 24/7
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Agente Virtual con Inteligencia Artificial
                </h3>
                <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
                  Un asesor comercial incansable entrenado con tu catálogo, precios y políticas, conectado directamente a tu WhatsApp oficial.
                </p>
              </div>

              {/* Feature Points */}
              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Atención 24/7 en Web y WhatsApp</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      Responde a las 11:00 PM, fines de semana y festivos. Nunca más pierdes un prospecto porque nadie estaba disponible.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Respuesta Instantánea a Cotizaciones</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      Calcula estimaciones, despacha fichas técnicas y resuelve dudas comerciales en menos de 10 segundos.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                    <Filter className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Calificación Automatizada de Prospectos</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      Filtra a curiosos sin presupuesto. Tu equipo comercial solo recibe conversaciones de compradores listos para pagar.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                    <Database className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Sincronización con CRM & WhatsApp Cloud</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      Integración limpia con HubSpot, Sheets o tu base de datos mediante la API oficial sin riesgo de bloqueos.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Pillar Footer CTA */}
            <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Entrenamiento a la medida de tu empresa</span>
              <button
                onClick={onOpenBot}
                className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Probar Chatbot Ahora</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
