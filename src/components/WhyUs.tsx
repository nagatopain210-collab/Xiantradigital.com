import React from 'react';
import { ChatbotPreview } from './ChatbotPreview';
import { TrendingUp, ShieldCheck, ArrowRight, Clock, CheckCircle2, DollarSign, Users, Sparkles, XCircle } from 'lucide-react';

export const WhyUs: React.FC = () => {
  return (
    <section id="nosotros" className="section-padding-fluid relative">
      <div className="container-xiantra">
        
        {/* ================= SECTION HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-emerald-400 uppercase bg-emerald-950/70 border border-emerald-500/30 px-3 py-1 rounded-full">
            <span className="font-bold select-none">—</span>
            <span>DIFERENCIACIÓN TECNOLÓGICA Y RETORNO FINANCIERO</span>
          </div>

          <h2 className="heading-section-fluid font-black text-slate-900 dark:text-white tracking-tight">
            ¿Por qué las empresas eligen a Xiantra para{' '}
            <span className="text-gradient-xiantra">escalar sus ventas sin inflar su nómina?</span>
          </h2>

          <p className="mt-3 body-fluid text-slate-600 dark:text-slate-300 font-normal">
            No vendemos horas de programación sueltas ni plantillas de adorno. Diseñamos infraestructuras comerciales completas para que recuperes tu inversión con creces desde el primer mes.
          </p>
        </div>

        {/* ================= COMPARATIVA DE AHORRO DE NÓMINA VS AGENTE IA ================= */}
        <div className="mb-12 sm:mb-16 p-6 sm:p-8 lg:p-10 rounded-3xl bg-[#09111E] border border-slate-800 shadow-[0_20px_50px_rgba(2,6,15,0.7)] space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-1">
                <DollarSign className="w-3.5 h-3.5" />
                <span>Impacto en la Rentabilidad de tu PyME</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                El costo real de responder tarde: Asesor Tradicional vs. Asistente IA 24/7
              </h3>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-3 py-1 rounded-lg shrink-0">
              Ahorro estimado: +$25.000.000 COP/año
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Asesor comercial de turno tradicional */}
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-rose-500/30 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-rose-500/20">
                <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                  <Users className="w-4 h-4" />
                  <span>Asesor Humano en Horario Fijo</span>
                </div>
                <span className="text-xs font-mono font-bold text-rose-400 bg-rose-950/70 border border-rose-500/30 px-2 py-0.5 rounded">
                  $2.500.000 COP / mes
                </span>
              </div>

              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Horario restringido:</strong> atiende solo 8 horas al día. Noches, domingos y festivos quedan sin atención.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Costos laborales fijos:</strong> salario mínimo integral, auxilio de transporte, cesantías y aportes parafiscales.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Tiempo de respuesta variable:</strong> demoras de 20 minutos a 4 horas en responder un mensaje de WhatsApp.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span><strong>Riesgo de rotación:</strong> tiempo y dinero gastado capacitando personal que luego renuncia.</span>
                </li>
              </ul>
            </div>

            {/* Right: Agente IA 24/7 Xiantra */}
            <div className="p-6 rounded-2xl bg-[#0C1728] border border-emerald-500/50 space-y-4 shadow-lg shadow-emerald-950/20 ring-1 ring-emerald-500/20">
              <div className="flex items-center justify-between pb-3 border-b border-emerald-500/30">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>Agente IA 24/7 Xiantra</span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-950/90 border border-emerald-500/40 px-2.5 py-0.5 rounded">
                  Pago Único · Sin Cargas
                </span>
              </div>

              <ul className="space-y-3 text-xs text-slate-200">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Atención continua 365 días:</strong> cotiza a las 11:30 PM un domingo con la misma precisión que un martes al mediodía.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Cero cargas de nómina:</strong> no paga primas, cesantías, vacaciones ni horas extras. Una sola inversión rentable.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Respuesta en 0.3 a 2 segundos:</strong> retiene al prospecto caliente antes de que busque a tu competencia en Google.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Filtro inteligente:</strong> entrega prospectos pre-calificados listos con presupuesto a tus ejecutivos de cierre.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* ================= 3 PROOF PILLARS CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 items-stretch">
          {/* Card 1: Record Delivery */}
          <div className="rounded-2xl p-6 sm:p-8 bg-[#09111E] border border-slate-800 hover:border-emerald-500/40 flex flex-col justify-between group transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#0C1728] border border-slate-700/80 flex items-center justify-center text-emerald-400 shadow-inner group-hover:scale-105 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono text-emerald-400 uppercase font-semibold tracking-wider block">
                Agilidad de Despliegue
              </span>
              <h3 className="heading-card-fluid font-bold text-white tracking-tight">
                Lanzamiento en 7 a 14 Días Hábiles
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Mientras las agencias tradicionales tardan 3 a 5 meses en borradores vacíos, nosotros entregamos tu sistema comercial listo para facturar en días.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">Tiempo Garantizado</span>
              <span className="text-xs font-bold font-mono text-emerald-400">Entrega Llave en Mano</span>
            </div>
          </div>

          {/* Card 2: ROI Obsession */}
          <div className="rounded-2xl p-6 sm:p-8 bg-[#0A1424] border border-emerald-500/40 flex flex-col justify-between shadow-xl ring-1 ring-emerald-500/20 group transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-slate-950 shadow-md group-hover:scale-105 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono text-emerald-300 uppercase font-bold tracking-wider block">
                Retorno de Inversión (ROI)
              </span>
              <h3 className="heading-card-fluid font-bold text-white tracking-tight">
                3.4x Retorno Promedio en el Primer Trimestre
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Cada elemento de copy, botón de WhatsApp y flujo de cotización se diseña con un solo fin: que tu cliente sienta confianza y compre sin fricciones.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">Conversión Media</span>
              <span className="text-xs font-bold font-mono text-emerald-300">4.8% en Campañas</span>
            </div>
          </div>

          {/* Card 3: 100% Ownership */}
          <div className="rounded-2xl p-6 sm:p-8 bg-[#09111E] border border-slate-800 hover:border-emerald-500/40 flex flex-col justify-between group transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#0C1728] border border-slate-700/80 flex items-center justify-center text-emerald-400 shadow-inner group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-mono text-emerald-400 uppercase font-semibold tracking-wider block">
                Propiedad y Transparencia
              </span>
              <h3 className="heading-card-fluid font-bold text-white tracking-tight">
                100% de Propiedad Legal del Código
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Cero ataduras técnicas. Eres el dueño absoluto de tu repositorio, hosting, base de datos y números de WhatsApp desde el primer día.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">Garantía</span>
              <span className="text-xs font-bold font-mono text-white">90 Días de Cobertura</span>
            </div>
          </div>
        </div>

        {/* ================= INTERACTIVE WORKFLOW PREVIEW ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center rounded-2xl bg-[#09111E] border border-slate-800 p-5 sm:p-8 lg:p-10 shadow-2xl overflow-hidden">
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Simulación de Operación Comercial Activa</span>
            </div>

            <h3 className="text-xl sm:text-3xl font-black text-white tracking-tight leading-snug">
              Comprueba cómo tus prospectos reciben cotizaciones en segundos sin intervención manual.
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Nuestro agente no solo responde saludos: consulta tu catálogo, calcula valores según especificaciones y notifica al asesor de guardia con el prospecto clasificado.
            </p>

            <div className="space-y-2.5 pt-1 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Tiempo promedio de respuesta en WhatsApp: <strong>0.3 segundos</strong>.
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Filtro de prospectos por urgencia, presupuesto y ubicación.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Envío automático de fichas técnicas en PDF.</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-xiantra-bot'))}
                className="w-full sm:w-auto min-h-[46px] px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Probar Chatbot en Pantalla</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <ChatbotPreview />
          </div>
        </div>

      </div>
    </section>
  );
};
