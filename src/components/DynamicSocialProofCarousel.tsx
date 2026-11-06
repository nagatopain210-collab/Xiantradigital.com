import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  TrendingUp,
  ArrowUpRight,
  Quote,
  Zap,
  Play,
  Pause,
  Volume2,
} from 'lucide-react';
import { MetallicLogo } from './MetallicLogo';
import { trackConversionEvent } from '../utils/analytics';

interface SocialProofCase {
  id: string;
  company: string;
  industry: string;
  city: string;
  posterUrl: string;
  videoDuration: string;
  primaryMetric: string;
  metricLabel: string;
  secondaryMetric: string;
  secondaryLabel: string;
  quote: string;
  videoHighlight: string;
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
    posterUrl: '/images/video_testimonial_maquitec_1793655595723.jpg',
    videoDuration: '0:48',
    primaryMetric: '+240%',
    metricLabel: 'Solicitudes de Cotización B2B',
    secondaryMetric: '< 25s',
    secondaryLabel: 'Tiempo de Respuesta en WhatsApp',
    quote:
      'Pasamos de una web lenta que nadie visitaba a recibir cotizaciones industriales calificadas todos los días directamente en nuestro WhatsApp y panel.',
    videoHighlight:
      'En 3 semanas automatizamos el envío de fichas técnicas y el filtro de clientes con presupuesto real.',
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
    posterUrl: '/images/video_testimonial_ecommerce_1793655597470.jpg',
    videoDuration: '0:52',
    primaryMetric: '+185%',
    metricLabel: 'Pedidos Recurrentes Automatizados',
    secondaryMetric: '-61%',
    secondaryLabel: 'Reducción en Abandono de Carrito',
    quote:
      'El checkout en 1 clic con PSE y el agente Xian en WhatsApp recuperaron millones en pedidos mayoristas que antes se enfriaban por falta de seguimiento.',
    videoHighlight:
      'Nuestros clientes mayoristas ahora piden desde el celular en menos de 1 minuto con pago PSE integrado.',
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
    posterUrl: '/images/video_testimonial_clinic_1793655597013.jpg',
    videoDuration: '0:41',
    primaryMetric: '+310%',
    metricLabel: 'Agendamientos de Valoración',
    secondaryMetric: '24/7',
    secondaryLabel: 'Calificación Automática de Pacientes',
    quote:
      'El 65% de nuestros pacientes escriben después de las 7 PM. Hoy el agente virtual responde al instante, filtra el tratamiento y agenda la cita sin intervención humana.',
    videoHighlight:
      'Eliminamos las citas perdidas en noches y domingos gracias al asistente IA conectado a nuestra agenda.',
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
    posterUrl: '/images/maquitec_case_study_1793654809199.jpg',
    videoDuration: '0:55',
    primaryMetric: '4.9x',
    metricLabel: 'Retorno sobre Inversión Publicitaria',
    secondaryMetric: '0.38s',
    secondaryLabel: 'Velocidad de Carga Móvil',
    quote:
      'Con el Centro de Mando de Xiantra sabemos exactamente qué campaña de Meta o Google nos trae compradores reales con presupuesto aprobado.',
    videoHighlight:
      'Cada visitante móvil recibe los planos y precios al instante, triplicando las visitas a sala de ventas.',
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
  // On-demand video story playback state (no heavy auto-loaded streams on startup)
  const [playingCaseId, setPlayingCaseId] = useState<string | null>(null);
  const [playbackProgress, setPlaybackProgress] = useState(0);

  // Auto-advance carousel only on desktop when not hovering or playing a testimonial
  useEffect(() => {
    if (isHovered || playingCaseId || (typeof window !== 'undefined' && window.innerWidth < 768)) {
      return;
    }
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % DYNAMIC_PROOF_CASES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isHovered, playingCaseId]);

  // Simulate smooth on-demand testimonial playback progress
  useEffect(() => {
    if (!playingCaseId) {
      setPlaybackProgress(0);
      return;
    }
    const interval = setInterval(() => {
      setPlaybackProgress((prev) => {
        if (prev >= 100) {
          setPlayingCaseId(null);
          return 0;
        }
        return prev + 2;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [playingCaseId]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + DYNAMIC_PROOF_CASES.length) % DYNAMIC_PROOF_CASES.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % DYNAMIC_PROOF_CASES.length);
  };

  const togglePlayCase = (e: React.MouseEvent, id: string, company: string) => {
    e.stopPropagation();
    if (playingCaseId === id) {
      setPlayingCaseId(null);
    } else {
      setPlayingCaseId(id);
      setPlaybackProgress(0);
      trackConversionEvent('service_click', `Reproducir Testimonio: ${company}`, 'social_proof');
    }
  };

  return (
    <section id="prueba-social" className="section-padding-fluid relative z-10 overflow-hidden">
      <div className="container-xiantra">
        {/* ================= HEADER WITH XIANTRA BRAND AUTHORITY ================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-6 sm:mb-10">
          <div className="max-w-3xl space-y-2.5">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
              <MetallicLogo size="xs" iconOnly />
              <span>CASOS DE ÉXITO Y TESTIMONIOS VERIFICADOS</span>
            </div>

            <h2 className="heading-section-fluid font-black text-slate-900 dark:text-white tracking-tight">
              Resultados comerciales reales en{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                empresas que digitalizaron sus ventas con IA
              </span>
            </h2>

            <p className="body-fluid text-slate-600 dark:text-slate-300">
              Desliza en tu celular o pulsa en cada caso para reproducir el resumen ejecutivo bajo demanda sin ralentizar tu navegación.
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
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === currentIndex
                      ? 'w-8 bg-emerald-500 dark:bg-emerald-400'
                      : 'w-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl glass-panel hover:border-emerald-500/40 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer active:scale-95"
                aria-label="Caso anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl glass-panel hover:border-emerald-500/40 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer active:scale-95"
                aria-label="Siguiente caso"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="md:hidden flex items-center justify-between text-[11px] font-mono text-emerald-500 dark:text-emerald-400 mb-3">
          <span>← Desliza para explorar casos ({DYNAMIC_PROOF_CASES.length}) →</span>
          <span>Reproducción bajo demanda</span>
        </div>

        {/* ================= TOUCH-SWIPEABLE CAROUSEL ON MOBILE, 2X2 ON TABLET, 4-COL ON DESKTOP ================= */}
        <div
          className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 overflow-x-auto md:overflow-visible snap-x-touch pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {DYNAMIC_PROOF_CASES.map((item, idx) => {
            const isActive = idx === currentIndex;
            const isPlaying = playingCaseId === item.id;

            return (
              <article
                key={item.id}
                onClick={() => setCurrentIndex(idx)}
                className={`min-w-[84vw] sm:min-w-[320px] md:min-w-0 snap-center shrink-0 group relative rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer overflow-hidden ${
                  isActive
                    ? 'glass-panel-neon border-2 border-emerald-500/60 dark:border-emerald-400/60 shadow-lg'
                    : 'glass-panel glass-panel-hover hover:border-emerald-500/40'
                }`}
              >
                <div className="relative z-10 space-y-3.5">
                  {/* On-Demand Video Testimonial Poster Container (CLS-Free) */}
                  <div className="relative h-36 sm:h-40 w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                    <img
                      src={item.posterUrl}
                      alt={`Testimonio de ${item.executive} - ${item.company}`}
                      width={400}
                      height={225}
                      loading="lazy"
                      decoding="async"
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        isPlaying ? 'scale-105 brightness-50' : 'group-hover:scale-105 brightness-90'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                    {/* Top Audit Pill */}
                    <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-slate-950/85 border border-emerald-500/40 text-emerald-300 font-bold">
                        {item.verifiedDate}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-950/85 text-slate-300">
                        {item.videoDuration}
                      </span>
                    </div>

                    {/* On-Demand Play / Pause Button Overlay */}
                    <button
                      type="button"
                      onClick={(e) => togglePlayCase(e, item.id, item.company)}
                      aria-label={isPlaying ? `Pausar testimonio de ${item.company}` : `Reproducir testimonio de ${item.company}`}
                      className="absolute inset-0 flex items-center justify-center group/play cursor-pointer focus:outline-none"
                    >
                      <div
                        className={`min-h-[44px] px-3.5 py-2 rounded-full flex items-center gap-2 text-xs font-bold transition-all shadow-lg ${
                          isPlaying
                            ? 'bg-emerald-500 text-slate-950'
                            : 'bg-slate-950/85 hover:bg-emerald-500 text-white hover:text-slate-950 border border-emerald-400/50'
                        }`}
                      >
                        {isPlaying ? (
                          <>
                            <Pause className="w-3.5 h-3.5 fill-current" />
                            <span>Pausar Caso</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Ver Resumen</span>
                          </>
                        )}
                      </div>
                    </button>

                    {/* Active On-Demand Story Overlay */}
                    {isPlaying && (
                      <div className="absolute inset-x-0 bottom-0 p-3 bg-slate-950/95 border-t border-emerald-500/40 space-y-1.5 animate-in fade-in duration-150">
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 font-bold">
                          <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                          <span>Resumen Ejecutivo:</span>
                        </div>
                        <p className="text-[11px] text-white leading-snug font-medium">
                          “{item.videoHighlight}”
                        </p>
                        <div className="w-full h-1 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className="h-full bg-emerald-400 transition-all duration-200"
                            style={{ width: `${playbackProgress}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Client & Sector Info */}
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {item.company}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      {item.industry} · <span className="text-slate-700 dark:text-slate-300">{item.city}</span>
                    </p>
                  </div>

                  {/* Primary & Secondary Quantitative Metrics */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2.5 rounded-xl bg-slate-50/90 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800/90">
                      <div className="flex items-center justify-between">
                        <span className="text-lg sm:text-xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                          {item.primaryMetric}
                        </span>
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      </div>
                      <span className="text-[10px] text-slate-600 dark:text-slate-300 leading-tight block mt-0.5">
                        {item.metricLabel}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50/90 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800/90">
                      <div className="flex items-center justify-between">
                        <span className="text-lg sm:text-xl font-black font-mono text-cyan-600 dark:text-cyan-300">
                          {item.secondaryMetric}
                        </span>
                        <Zap className="w-3.5 h-3.5 text-cyan-500 shrink-0" />
                      </div>
                      <span className="text-[10px] text-slate-600 dark:text-slate-300 leading-tight block mt-0.5">
                        {item.secondaryLabel}
                      </span>
                    </div>
                  </div>

                  {/* Executive Testimonial Quote */}
                  <div className="relative pt-0.5">
                    <Quote className="w-3.5 h-3.5 text-emerald-500/50 mb-1" />
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Footer: Executive Attribution & Xiantra Official Stamp */}
                <div className="relative z-10 mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">{item.executive}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block">{item.role}</span>
                  </div>

                  <div className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span>Auditado</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* ================= BOTTOM OFFICIAL XIANTRA GUARANTEE BAR ================= */}
        <div className="mt-6 sm:mt-10 p-4 sm:p-6 rounded-2xl glass-panel-neon flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="shrink-0 hidden sm:block">
              <MetallicLogo size="sm" showSubtitle={false} />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                Resultados Respaldados por Garantía Contractual de 90 Días
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Cada sistema incluye velocidad &lt; 0.8s, agente comercial IA 24/7 y Tu Centro de Mando en vivo.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => {
                trackConversionEvent('demo_open', 'Ver Centro de Mando desde Casos de Éxito', 'social_proof');
                onOpenDemo();
              }}
              className="flex-1 sm:flex-initial min-h-[44px] px-4 py-2.5 rounded-xl glass-panel hover:border-emerald-500/40 text-xs font-semibold text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
            >
              Ver Centro de Mando
            </button>
            <button
              onClick={() => {
                trackConversionEvent('quote_request', 'Cotizar Proyecto desde Casos de Éxito', 'social_proof');
                onOpenQuote();
              }}
              className="flex-1 sm:flex-initial min-h-[44px] px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-xs font-extrabold text-slate-950 shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Cotizar para Mi Empresa</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
