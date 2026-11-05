import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  TrendingUp,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Activity,
  Zap,
  Bot,
  MessageSquare,
  Sparkles,
  Send,
  User,
  Mail,
  Briefcase,
  BarChart3,
  Users,
  Check,
  Lock,
  ArrowUpRight,
  DollarSign,
  Smartphone,
  ChevronRight,
  Shield,
  Layers,
  Award,
  Play,
  RotateCcw,
  FileSearch,
  Globe,
  Calendar,
  Star,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/copyData';
import { MetallicLogo } from './MetallicLogo';

interface HeroProps {
  onOpenQuote: (serviceTitle?: string) => void;
  onOpenContact: () => void;
  onOpenDemo: () => void;
}

type DemoScenarioKey = 'b2b-machine' | 'ecommerce-cart' | 'health-booking';

interface DemoScenario {
  id: DemoScenarioKey;
  label: string;
  tag: string;
  clientName: string;
  avatar: string;
  initialMessage: string;
  botReply: string;
  quickReplies: string[];
  kpiHighlight: string;
  kpiLabel: string;
  estimatedQuoteCOP: string;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote, onOpenDemo }) => {
  // Mode selector in Right Column: 'ai-simulator' (Live Chatbot Engine) vs 'lead-form' (Quick Quote Form)
  const [heroPanelMode, setHeroPanelMode] = useState<'ai-simulator' | 'lead-form'>('ai-simulator');
  const [activeScenario, setActiveScenario] = useState<DemoScenarioKey>('b2b-machine');
  
  // Real-time metrics animation
  const [liveVisitors, setLiveVisitors] = useState(24);
  const [leadsCapturedToday, setLeadsCapturedToday] = useState(38);
  const [demoInput, setDemoInput] = useState('');
  
  // Interactive Simulator Demo Sequence States
  const [isTyping, setIsTyping] = useState(false);
  const [typingStatusText, setTypingStatusText] = useState('IA Xiantra analizando...');
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [demoStep, setDemoStep] = useState<number>(0); // 0 = idle, 1 = solicitud, 2 = filtro comercial, 3 = calificado
  const [customQuoteResult, setCustomQuoteResult] = useState<string | null>(null);

  const chatScrollRef = useRef<HTMLDivElement>(null);
  const demoTimersRef = useRef<NodeJS.Timeout[]>([]);

  // Scenarios configured for high-converting sales demonstration
  const scenarios: Record<DemoScenarioKey, DemoScenario> = {
    'b2b-machine': {
      id: 'b2b-machine',
      label: 'Maquinaria B2B',
      tag: 'Cotización Industrial',
      clientName: 'Ing. Carlos Restrepo (Maquitec SAS)',
      avatar: '/images/advisor_corporate_man_1793654807154.jpg',
      initialMessage: 'Buenas noches, necesito una cotización formal de una Cortadora Láser de Fibra 3kW con entrega en Bogotá.',
      botReply: '¡Hola Ingeniero Carlos! En Maquitec atendemos 24/7. El equipo de Láser Fibra 3kW tiene entrega inmediata (5 a 8 días hábiles). Tu inversión estimada base es de $14.500.000 COP con capacitación técnica y 1 año de garantía. ¿Para qué calibre de lámina la requieres? Te acabo de adjuntar la ficha técnica oficial.',
      quickReplies: ['Calibre 1/4 y 1/2 pulgada', '¿Financiación con Bancolombia?', 'Enviar cotización a mi WhatsApp'],
      kpiHighlight: '+240%',
      kpiLabel: 'Aumento en Cotizaciones B2B',
      estimatedQuoteCOP: '$14.500.000 COP',
    },
    'ecommerce-cart': {
      id: 'ecommerce-cart',
      label: 'E-Commerce / Retail',
      tag: 'Rescate de Carritos',
      clientName: 'Mariana Duarte (DistriAlimentos)',
      avatar: '/images/video_testimonial_ecommerce_1793655597470.jpg',
      initialMessage: 'Dejé pendiente un pedido mayorista de 120 cajas pero la pasarela me pedía demasiados datos.',
      botReply: '¡Hola Mariana! Detectamos tu pedido mayorista (#D-4821). Hemos simplificado tu pago en 1 solo clic mediante PSE, Wompi o Bancolombia por $3.890.000 COP con despacho prioritario hoy mismo. ¿Deseas pagarlo ahora o recibir el link directo a tu celular?',
      quickReplies: ['Pagar con PSE / Wompi ahora', 'Cambiar dirección de envío', 'Hablar con un asesor humano'],
      kpiHighlight: '38%',
      kpiLabel: 'Carritos Rescatados por WhatsApp',
      estimatedQuoteCOP: '$3.890.000 COP',
    },
    'health-booking': {
      id: 'health-booking',
      label: 'Salud & Clínicas',
      tag: 'Agendamiento 24/7',
      clientName: 'Dr. Mauricio Cárdenas (Quantum Health)',
      avatar: '/images/video_testimonial_clinic_1793655597013.jpg',
      initialMessage: 'Hola, requiero valoración de ortodoncia invisible y horarios disponibles este jueves por la tarde.',
      botReply: '¡Buenas tardes! Tenemos disponibilidad para tu valoración VIP este Jueves a las 3:30 PM o 5:15 PM en la sede El Poblado. La consulta incluye diagnóstico digital 3D. ¿Con cuál horario confirmamos tu cita para sincronizarla en Google Calendar?',
      quickReplies: ['Agendar a las 5:15 PM', '¿Qué costo tiene la valoración?', 'Quiero hablar por WhatsApp'],
      kpiHighlight: '94%',
      kpiLabel: 'Citas Agendadas en Piloto Automático',
      estimatedQuoteCOP: 'Cita VIP Agendada',
    },
  };

  const currentScenario = scenarios[activeScenario];

  const [conversationHistory, setConversationHistory] = useState<
    Array<{ sender: 'user' | 'bot'; text: string; time: string }>
  >([
    {
      sender: 'user',
      text: currentScenario.initialMessage,
      time: '11:42 PM',
    },
    {
      sender: 'bot',
      text: currentScenario.botReply,
      time: '11:42 PM (0.2s)',
    },
  ]);

  const clearAllDemoTimers = () => {
    demoTimersRef.current.forEach((t) => clearTimeout(t));
    demoTimersRef.current = [];
  };

  // Clean timers on unmount
  useEffect(() => {
    return () => clearAllDemoTimers();
  }, []);

  // Auto-scroll chat smoothly to bottom when new messages arrive or when typing starts/stops
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTo({
        top: chatScrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [conversationHistory, isTyping]);

  // Update conversation when scenario changes
  useEffect(() => {
    clearAllDemoTimers();
    setIsDemoRunning(false);
    setIsTyping(false);
    setDemoStep(0);
    setCustomQuoteResult(null);
    setConversationHistory([
      {
        sender: 'user',
        text: currentScenario.initialMessage,
        time: '11:42 PM',
      },
      {
        sender: 'bot',
        text: currentScenario.botReply,
        time: '11:42 PM (0.2s)',
      },
    ]);
    setDemoInput('');
  }, [activeScenario]);

  // Live visitors ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveVisitors((prev) => {
        const change = Math.floor(Math.random() * 3) - 1;
        const next = prev + change;
        return next >= 18 && next <= 34 ? next : 24;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Lead capture form state for 15-minute free advisory (Nombre, Celular, País, Correo)
  const [advisoryForm, setAdvisoryForm] = useState({
    fullName: '',
    phone: '',
    country: 'Colombia (+57)',
    email: '',
  });
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

  const handleAdvisoryFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!advisoryForm.fullName.trim() || !advisoryForm.phone.trim() || !advisoryForm.email.trim()) return;

    setIsSubmittingForm(true);

    setTimeout(() => {
      setIsSubmittingForm(false);
      setFormSubmitted(true);
      setLeadsCapturedToday((prev) => prev + 1);
    }, 600);
  };

  // Automated 3-Step B2B Qualification Demo Sequence
  const startQualificationDemo = () => {
    clearAllDemoTimers();
    setIsDemoRunning(true);
    setDemoStep(1);
    setCustomQuoteResult(null);

    // Step 1: Inbound B2B request
    const step1Msg = {
      sender: 'user' as const,
      text: 'Buenas tardes, necesitamos modernizar la captación de nuestra empresa de ingeniería y automatizar cotizaciones para proyectos de $20M a $50M COP.',
      time: 'Ahora',
    };
    setConversationHistory([step1Msg]);

    // Step 2: IA typing indicator -> commercial qualification question
    const t1 = setTimeout(() => {
      setIsTyping(true);
      setTypingStatusText('IA validando catálogo y capacidad técnica...');
    }, 650);

    const t2 = setTimeout(() => {
      setIsTyping(false);
      setDemoStep(2);
      setConversationHistory((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: '¡Excelente! En Xiantra configuramos el bot con tu catálogo técnico. Para clasificar la cotización con prioridad alta: ¿cuál es tu volumen estimado de consultas mensuales y en cuántas semanas necesitas tener la web operando?',
          time: 'Ahora (0.2s)',
        },
      ]);
    }, 2100);

    // Step 3: Prospect reply with budget and timeline
    const t3 = setTimeout(() => {
      setConversationHistory((prev) => [
        ...prev,
        {
          sender: 'user',
          text: 'Manejamos entre 150 y 200 leads al mes y tenemos presupuesto asignado de $35M COP para iniciar en 3 semanas con WhatsApp Sync.',
          time: 'Ahora',
        },
      ]);
    }, 3600);

    // Step 4: IA typing indicator -> Lead qualified, preliminary quote & human handoff
    const t4 = setTimeout(() => {
      setIsTyping(true);
      setTypingStatusText('IA calculando cotización formal y asignando asesor oficial...');
    }, 4400);

    const t5 = setTimeout(() => {
      setIsTyping(false);
      setDemoStep(3);
      setIsDemoRunning(false);
      setCustomQuoteResult('$32.400.000 COP · Lead Clase A (98/100)');
      setConversationHistory((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: '🎯 ¡Calificación Aprobada! Has sido catalogado como Lead Clase A (Score 98/100). Tu solución llave en mano proyectada es de $32.400.000 COP con Web Fintech de Alta Conversión, Chatbot 24/7 y Sincronización CRM. Hemos reservado tu cupo de implementación técnica. ¿Deseas recibir la propuesta en PDF ahora mismo por WhatsApp?',
          time: 'Ahora (0.2s)',
        },
      ]);
    }, 6200);

    demoTimersRef.current = [t1, t2, t3, t4, t5];
  };

  const resetDemo = () => {
    clearAllDemoTimers();
    setIsDemoRunning(false);
    setIsTyping(false);
    setDemoStep(0);
    setCustomQuoteResult(null);
    setConversationHistory([
      {
        sender: 'user',
        text: currentScenario.initialMessage,
        time: '11:42 PM',
      },
      {
        sender: 'bot',
        text: currentScenario.botReply,
        time: '11:42 PM (0.2s)',
      },
    ]);
    setDemoInput('');
  };

  const handleSendDemoMessage = (textToSend?: string) => {
    const text = textToSend || demoInput;
    if (!text.trim()) return;

    // Stop automated sequence if user takes manual control
    clearAllDemoTimers();
    setIsDemoRunning(false);

    const userMsg = {
      sender: 'user' as const,
      text,
      time: 'Ahora',
    };

    setConversationHistory((prev) => [...prev, userMsg]);
    setDemoInput('');
    setIsTyping(true);
    setTypingStatusText('IA Xiantra redactando respuesta personalizada...');

    setTimeout(() => {
      setIsTyping(false);
      setConversationHistory((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: `Entendido perfectamente. El sistema ha registrado tus especificaciones en el Panel Administrador con prioridad Alta. Hemos preparado tu propuesta formal para ${currentScenario.label} por ${customQuoteResult || currentScenario.estimatedQuoteCOP} y te conectamos de inmediato con un asesor oficial en WhatsApp.`,
          time: 'Ahora (0.2s)',
        },
      ]);
    }, 850);
  };

  const handleOpenBotWidget = () => {
    window.dispatchEvent(new CustomEvent('open-xiantra-bot'));
  };

  return (
    <section id="inicio" className="relative pt-6 pb-16 sm:pt-12 sm:pb-24 lg:pt-14 lg:pb-28 overflow-hidden bg-grid-tech">
      {/* Dynamic Multi-Glow Background: Fintech Midnight & Emerald Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(1100px,96vw)] h-[620px] bg-gradient-to-tr from-emerald-600/15 via-cyan-500/10 to-blue-600/10 blur-[150px] -z-10 pointer-events-none rounded-full" />
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-emerald-500/10 blur-[120px] -z-10 pointer-events-none rounded-full" />

      <div className="container-xiantra">
        {/* ================= HERO 7:5 ASYMMETRIC GRID (DESKTOP) / OPTIMIZED STACK (MOBILE & TABLET) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ================= LEFT COLUMN: PERSUASIVE CRO VALUE PROPOSITION (7 COLS) ================= */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-left">
            
            {/* Top Auditor Badge: Fintech Guarantee & ROI Focus */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 dark:bg-slate-900/90 border border-emerald-500/40 shadow-sm backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-[11px] sm:text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                Infraestructura Comercial con IA · Retorno Garantizado
              </span>
              <span className="hidden sm:inline text-slate-500">|</span>
              <span className="hidden sm:inline text-[11px] font-mono text-slate-300">
                100% Código Propietario
              </span>
            </div>

            {/* Aggressive H1 Headline Oriented to Commercial Results */}
            <h1 className="heading-hero-fluid font-black tracking-tight text-slate-900 dark:text-white leading-[1.08]">
              Transformamos negocios tradicionales en empresas capaces de{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                atraer clientes y vender automáticamente 24/7.
              </span>
            </h1>

            {/* Hyper-persuasive Subtitle with concrete proof & pain points */}
            <p className="body-fluid text-slate-600 dark:text-slate-300 font-normal leading-relaxed max-w-2xl">
              Remplazamos sitios web obsoletos que nadie visita por una herramienta comercial de alto impacto: 
              <strong className="text-slate-900 dark:text-white font-semibold"> carga ultra-rápida (&lt;0.8s)</strong>, 
              un <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">asistente con IA en WhatsApp</strong> que califica prospectos en 2 segundos y un 
              <strong className="text-slate-900 dark:text-white font-semibold"> panel administrativo centralizado</strong> para auditar cada cotización en tiempo real.
            </p>

            {/* Large Elevated CTAs with Shimmer and Hover Effects */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={() => onOpenQuote('Auditoría de Conversión y Presencia Digital Gratuita')}
                className="w-full sm:w-auto min-h-[52px] inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl text-sm sm:text-base font-extrabold text-white btn-xiantra-emerald shadow-emerald-glow transition-all duration-300 cursor-pointer active:scale-[0.99] group"
              >
                <FileSearch className="w-5 h-5 text-emerald-200 shrink-0" />
                <span>Solicitar Auditoría de Conversión Gratuita</span>
                <ArrowRight className="w-4 h-4 text-emerald-100 group-hover:translate-x-1 transition-transform shrink-0" />
              </button>

              <button
                onClick={() => onOpenDemo()}
                className="w-full sm:w-auto min-h-[52px] inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold text-slate-900 dark:text-slate-100 glass-panel hover:border-emerald-500/50 hover:bg-slate-100/90 dark:hover:bg-slate-800/90 shadow-fintech-card transition-all duration-200 cursor-pointer active:scale-[0.99]"
              >
                <BarChart3 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Ver Demo del Panel en Vivo</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>
            </div>

            {/* Structured Social Proof Strip (Fintech Trust Metrics) */}
            <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-0.5">
                <span className="text-xl sm:text-2xl font-black font-mono text-emerald-500 dark:text-emerald-400 tabular-nums">
                  4.9 / 5
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                  +120 Clientes Satisfechos
                </span>
              </div>

              <div className="space-y-0.5">
                <span className="text-xl sm:text-2xl font-black font-mono text-slate-900 dark:text-white tabular-nums">
                  +$3.4M USD
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                  En Cotizaciones Procesadas
                </span>
              </div>

              <div className="space-y-0.5">
                <span className="text-xl sm:text-2xl font-black font-mono text-cyan-600 dark:text-cyan-400 tabular-nums">
                  &lt; 0.8s
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                  Carga Móvil Instantánea
                </span>
              </div>

              <div className="space-y-0.5">
                <span className="text-xl sm:text-2xl font-black font-mono text-slate-900 dark:text-white tabular-nums">
                  90 Días
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">
                  Garantía por Contrato
                </span>
              </div>
            </div>

            {/* Quick Micro-Trust Signals */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>WhatsApp Cloud API Oficial (Cero bloqueos)</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-500 shrink-0" />
                <span>Pasarelas PSE, Bancolombia, Wompi y Stripe</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-500 shrink-0" />
                <span>Despliegue Llave en Mano en 7 a 14 Días</span>
              </span>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: PREMIUM SAAS ADVISORY BOOKING CONSOLE (5 COLS) ================= */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-3xl bg-[#070D18]/95 backdrop-blur-2xl border border-emerald-500/40 hover:border-emerald-500/60 transition-all duration-300 shadow-[0_25px_65px_rgba(2,6,15,0.85)] ring-1 ring-white/10 overflow-hidden">
              
              {/* Corner Ambient Glows */}
              <div className="absolute -top-12 -right-12 w-56 h-56 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-56 h-56 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

              {/* Console Top Bar: Executive Advisor Header */}
              <div className="px-5 py-3.5 bg-gradient-to-r from-[#0A1322] via-[#08101E] to-[#0A1322] border-b border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-emerald-400/80 shrink-0 shadow-md ring-2 ring-emerald-500/20">
                    <img
                      src="/images/advisor_corporate_man_1793654807154.jpg"
                      alt="Consultor Estratégico IA Xiantra"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm truncate">Asesoría Estratégica</span>
                      <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                        15 MIN · 100% GRATIS
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

              {/* Form Content Area: 15-Minute Free Advisory Session */}
              <div className="p-5 sm:p-6 space-y-4 bg-[#070D18]/85">
                {!formSubmitted ? (
                  <form onSubmit={handleAdvisoryFormSubmit} className="space-y-4">
                    {/* Header & Value Proposition */}
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Reserva tu diagnóstico gratuito de 15 minutos</span>
                      </div>

                      <h3 className="text-base sm:text-lg font-black text-white tracking-tight leading-snug">
                        Descubre cómo tu empresa puede conseguir más clientes con una página web inteligente
                      </h3>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        Analizamos tu presencia digital, detectamos oportunidades de mejora y te mostramos cómo implementar una web con IA, automatización y atención 24/7.
                      </p>

                      {/* Confidence Badges (2x2 Grid) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 pb-1 border-y border-white/5">
                        <div className="flex items-center gap-2 text-xs text-slate-200">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span className="font-medium">Sin compromiso</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-200">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span className="font-medium">Diagnóstico personalizado</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-200">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span className="font-medium">Cupos limitados diariamente</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-200">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span className="font-medium">Recibe recomendaciones aplicables a tu negocio</span>
                        </div>
                      </div>
                    </div>

                    {/* SaaS-Styled Form Fields */}
                    <div className="space-y-3 pt-1">
                      {/* 1. Nombre y Apellido */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                          Nombre y Apellido <span className="text-emerald-400">*</span>
                        </label>
                        <div className="relative group">
                          <User className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition-colors absolute left-3.5 top-3.5 pointer-events-none" />
                          <input
                            type="text"
                            required
                            value={advisoryForm.fullName}
                            onChange={(e) => setAdvisoryForm({ ...advisoryForm, fullName: e.target.value })}
                            placeholder="Ej. Carlos Restrepo"
                            className="w-full min-h-[46px] pl-10 pr-3.5 py-2.5 bg-[#0C1526]/90 hover:bg-[#0E192D] border border-slate-700/80 hover:border-slate-600 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/25 transition-all shadow-inner"
                          />
                        </div>
                      </div>

                      {/* 2 & 3. Celular / WhatsApp y País (Grid on sm+) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                            Celular / WhatsApp <span className="text-emerald-400">*</span>
                          </label>
                          <div className="relative group">
                            <Smartphone className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition-colors absolute left-3.5 top-3.5 pointer-events-none" />
                            <input
                              type="tel"
                              inputMode="tel"
                              required
                              value={advisoryForm.phone}
                              onChange={(e) => setAdvisoryForm({ ...advisoryForm, phone: e.target.value })}
                              placeholder="Ej. 310 123 4567"
                              className="w-full min-h-[46px] pl-10 pr-3.5 py-2.5 bg-[#0C1526]/90 hover:bg-[#0E192D] border border-slate-700/80 hover:border-slate-600 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/25 transition-all font-mono shadow-inner"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                            País <span className="text-emerald-400">*</span>
                          </label>
                          <div className="relative group">
                            <Globe className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition-colors absolute left-3.5 top-3.5 pointer-events-none" />
                            <select
                              required
                              value={advisoryForm.country}
                              onChange={(e) => setAdvisoryForm({ ...advisoryForm, country: e.target.value })}
                              className="w-full min-h-[46px] pl-10 pr-9 py-2.5 bg-[#0C1526]/90 hover:bg-[#0E192D] border border-slate-700/80 hover:border-slate-600 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/25 transition-all cursor-pointer appearance-none shadow-inner"
                            >
                              {countryOptions.map((country) => (
                                <option key={country} value={country} className="bg-slate-950 text-white py-1">
                                  {country}
                                </option>
                              ))}
                            </select>
                            <ChevronRight className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 rotate-90 pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      {/* 4. Correo Electrónico */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                          Correo Electrónico <span className="text-emerald-400">*</span>
                        </label>
                        <div className="relative group">
                          <Mail className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 transition-colors absolute left-3.5 top-3.5 pointer-events-none" />
                          <input
                            type="email"
                            inputMode="email"
                            required
                            value={advisoryForm.email}
                            onChange={(e) => setAdvisoryForm({ ...advisoryForm, email: e.target.value })}
                            placeholder="carlos@tuempresa.com"
                            className="w-full min-h-[46px] pl-10 pr-3.5 py-2.5 bg-[#0C1526]/90 hover:bg-[#0E192D] border border-slate-700/80 hover:border-slate-600 rounded-xl text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-500/25 transition-all shadow-inner"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Primary Conversion Button: Large, Emerald Gradient, Glow, Calendar Icon */}
                    <button
                      type="submit"
                      disabled={isSubmittingForm}
                      className="w-full min-h-[54px] sm:min-h-[58px] py-4 px-6 rounded-xl font-black text-sm sm:text-base text-slate-950 bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-300 hover:from-emerald-300 hover:via-emerald-200 hover:to-teal-200 shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:shadow-[0_0_45px_rgba(16,185,129,0.7)] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer active:scale-[0.99] group mt-3 border border-emerald-200/40 relative overflow-hidden"
                    >
                      {/* Smooth Shimmer Light Pass */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />

                      {isSubmittingForm ? (
                        <span className="flex items-center gap-2 font-bold text-slate-950">
                          <Clock className="w-5 h-5 animate-spin" />
                          <span>Reservando tu Espacio...</span>
                        </span>
                      ) : (
                        <>
                          <Calendar className="w-5 h-5 text-slate-950 shrink-0" />
                          <span className="tracking-tight">Quiero mi diagnóstico gratuito de 15 minutos</span>
                          <ArrowRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1.5 transition-transform shrink-0" />
                        </>
                      )}
                    </button>

                    {/* Confidence & Scarcity Elements */}
                    <div className="pt-2 space-y-2 border-t border-white/5">
                      <div className="flex items-center justify-between text-[11px] text-slate-300">
                        <span className="flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>🔒 Tus datos están protegidos</span>
                        </span>
                        <span className="flex items-center gap-1 font-mono text-emerald-400 font-semibold bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded">
                          <Clock className="w-3 h-3" />
                          <span>3 espacios disponibles hoy</span>
                        </span>
                      </div>

                      <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-300 text-center font-medium">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 shrink-0" />
                        <span>⭐ Más empresas están digitalizando sus ventas con IA</span>
                      </div>
                    </div>
                  </form>
                ) : (
                  /* Success State with Instant WhatsApp Link */
                  <div className="text-center py-6 sm:py-8 space-y-4 animate-in fade-in zoom-in-95 duration-300">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                      <Check className="w-7 h-7" />
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                        Diagnóstico Confirmado
                      </span>
                      <h4 className="text-lg sm:text-xl font-black text-white">
                        ¡Solicitud Recibida con Éxito!
                      </h4>
                      <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                        Gracias <strong className="text-white">{advisoryForm.fullName}</strong>. Hemos reservado tu diagnóstico gratuito de 15 minutos para tu empresa en <strong className="text-emerald-400">{advisoryForm.country}</strong>.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#0C1526] border border-slate-700/80 text-left text-xs space-y-1.5 max-w-sm mx-auto shadow-inner">
                      <div className="text-slate-400 font-mono text-[10px] uppercase tracking-wider">Detalles de la reserva:</div>
                      <div className="text-white font-medium truncate flex items-center gap-2">
                        <Smartphone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>Celular: {advisoryForm.phone}</span>
                      </div>
                      <div className="text-white font-medium truncate flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>Correo: {advisoryForm.email}</span>
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
                        `Hola Xiantra, acabo de reservar mi diagnóstico gratuito de 15 minutos para mi empresa en ${advisoryForm.country}.\n\n• Nombre: ${advisoryForm.fullName}\n• Celular: ${advisoryForm.phone}\n• Correo: ${advisoryForm.email}\n\nQuedo atento a la confirmación de la hora.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="min-h-[50px] w-full inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs sm:text-sm shadow-[0_0_25px_rgba(16,185,129,0.45)] cursor-pointer transition-all active:scale-[0.99]"
                    >
                      <MessageSquare className="w-4 h-4 text-slate-950" />
                      <span>Conectar a WhatsApp Ahora</span>
                      <ArrowRight className="w-4 h-4 text-slate-950" />
                    </a>

                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setAdvisoryForm({
                          fullName: '',
                          phone: '',
                          country: 'Colombia (+57)',
                          email: '',
                        });
                      }}
                      className="text-[11px] text-slate-400 hover:text-white transition-colors underline pt-1 block mx-auto cursor-pointer"
                    >
                      ¿Registrar otra empresa o volver a editar?
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ================= SOLUTION SHOWCASE: MOCKUP INTERACTIVO DEL PANEL DE CONTROL ================= */}
        <div className="mt-14 sm:mt-20 max-w-6xl mx-auto">
          {/* Header explicativo: Corto, llamativo y orientado al beneficio empresarial */}
          <div className="text-center mb-8 px-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold tracking-wide mb-3 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
              <span>INCLUIDO CON TU NUEVA PÁGINA WEB · SIN COSTO MENSUAL</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Tu Panel de Control Gerencial:{' '}
              <span className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Sabrás exactamente cuánto dinero produce tu web cada día
              </span>
            </h3>

            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              No te entregamos una página ciega. Te damos un centro de comando privado para ver en tiempo real desde tu celular: cuántos prospectos entran, qué responde tu IA en WhatsApp y tus ventas 24/7.
            </p>

            {/* 3 micro-beneficios directos */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                <Smartphone className="w-3.5 h-3.5 text-emerald-500" />
                Monitorea desde tu celular (iOS / Android)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                <Bot className="w-3.5 h-3.5 text-cyan-500" />
                Asistente IA WhatsApp 24/7 sincronizado
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                100% tuyo sin mensualidades ocultas
              </span>
            </div>
          </div>

          <div className="rounded-3xl glass-panel-neon border border-emerald-500/30 overflow-hidden shadow-fintech-card transition-all duration-300">
            
            {/* Topbar of Control Panel Mockup */}
            <div className="px-4 sm:px-6 py-3.5 border-b border-white/10 bg-slate-950/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 pr-3 border-r border-slate-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px] text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white font-bold">VISTA PREVIA DEL PANEL QUE RECIBIRÁS</span>
                  <span className="text-slate-600 hidden sm:inline">|</span>
                  <span className="text-emerald-400 font-bold hidden sm:inline">{liveVisitors} visitantes activos en tu web</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                  WhatsApp Cloud API + Pasarelas PSE/Wompi sincronizadas
                </span>
                <button
                  onClick={() => onOpenDemo()}
                  className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-500/20 cursor-pointer active:scale-95"
                >
                  <BarChart3 className="w-3.5 h-3.5 text-slate-950" />
                  <span>Probar Demo Interactiva</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
                </button>
              </div>
            </div>

            {/* KPI Summary Cards inside Mockup */}
            <div className="p-4 sm:p-6 lg:p-8 space-y-6 bg-slate-950/70">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
                
                {/* Metric 1: Inbound Leads */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow">
                  <div className="flex items-center justify-between text-slate-400 mb-1.5 text-xs">
                    <span>Leads Calificados Hoy</span>
                    <Users className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 tabular-nums">
                      {leadsCapturedToday}
                    </span>
                    <span className="text-[11px] text-emerald-400 font-bold font-mono">
                      +38% vs ayer
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Filtrados automáticamente por IA</p>
                </div>

                {/* Metric 2: Revenue Pipeline */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow">
                  <div className="flex items-center justify-between text-slate-400 mb-1.5 text-xs">
                    <span>Cotizaciones Abiertas</span>
                    <DollarSign className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black font-mono text-white tabular-nums">
                      $45.8M
                    </span>
                    <span className="text-[11px] text-cyan-400 font-bold font-mono">
                      COP activos
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Negociaciones en seguimiento</p>
                </div>

                {/* Metric 3: AI Response Speed */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow">
                  <div className="flex items-center justify-between text-slate-400 mb-1.5 text-xs">
                    <span>Tiempo de Respuesta</span>
                    <Zap className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 tabular-nums">
                      0.3s
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      vs 4.5h humano
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Cierre de venta antes que la competencia</p>
                </div>

                {/* Metric 4: Closed sales */}
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow">
                  <div className="flex items-center justify-between text-slate-400 mb-1.5 text-xs">
                    <span>Ventas Cerradas 24/7</span>
                    <ShieldCheck className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black font-mono text-white tabular-nums">
                      142
                    </span>
                    <span className="text-[11px] text-emerald-400 font-bold font-mono">
                      Sin pausas
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Noches, festivos y fines de semana</p>
                </div>
              </div>

              {/* Conversion Graph Vector */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white">
                      Curva de Adquisición y Cierre de Ventas en Vivo
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Impacto comprobado: 3.4x mayor conversión cuando el cliente recibe respuesta en menos de 25 segundos
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-mono">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Cierre por IA WhatsApp
                    </span>
                    <span className="flex items-center gap-1.5 text-cyan-400 font-mono">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block" /> Tráfico Web Calificado
                    </span>
                  </div>
                </div>

                <div className="h-32 sm:h-40 w-full relative pt-2">
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
                    <circle cx="200" cy="85" r="4.5" fill="#10b981" className="animate-pulse" />
                    <circle cx="600" cy="25" r="4.5" fill="#34d399" className="animate-pulse" />
                    <circle cx="800" cy="10" r="5" fill="#ffffff" />
                  </svg>
                </div>
              </div>

              {/* Bottom reassurance strip: Qué ganas con este panel */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5 text-slate-200 text-center sm:text-left">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 hidden sm:block" />
                  <span>
                    <strong className="text-white">¿Para qué te sirve?</strong> Eliminas la incertidumbre: sabrás con precisión cuántas ventas genera tu web, cuántos prospectos filtra tu IA y qué tan rentable es tu negocio cada día.
                  </span>
                </div>
                <button
                  onClick={() => onOpenDemo()}
                  className="shrink-0 px-3.5 py-2 rounded-xl bg-slate-900/90 border border-emerald-500/40 hover:border-emerald-300 text-emerald-300 hover:text-white font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shadow-sm"
                >
                  <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Ver Panel Interactivo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
