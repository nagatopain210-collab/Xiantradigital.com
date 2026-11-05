import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Send,
  User,
  ArrowRight,
  Zap,
  Sparkles,
  RotateCcw,
  MessageSquare,
  Building2,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Phone,
  BarChart3,
  Bot,
  Minimize2,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/copyData';
import { MetallicLogo } from './MetallicLogo';

const xianAvatar = '/images/advisor_corporate_man_1793654807154.jpg';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  options?: {
    label: string;
    icon?: string;
    action?: string;
  }[];
  qualificationBadge?: {
    score: number;
    label: string;
    tag: string;
  };
  showQuoteCard?: {
    service: string;
    estimatedPriceCOP: string;
    timeline: string;
  };
}

export const XiantraBotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasPromptedBanner, setHasPromptedBanner] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState('Xian está analizando tu consulta...');
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [leadData, setLeadData] = useState({
    fullName: '',
    whatsapp: '',
    email: '',
    company: '',
    sector: '',
  });

  const initialBotMessage: Message = {
    id: 'msg-init',
    sender: 'bot',
    text: '¡Hola! Soy Xian, Director de Automatización Comercial en Xiantra Digital. ¿Qué tipo de solución necesitas para hacer crecer tu empresa?',
    time: 'Ahora',
    options: [
      { label: 'Página Web con IA 24/7 (Alta Conversión)', icon: 'zap' },
      { label: 'E-Commerce con Rescate de Carritos', icon: 'cart' },
      { label: 'Chatbot de Ventas para WhatsApp', icon: 'bot' },
      { label: 'Ver Demostración del Panel en Vivo', icon: 'chart' },
    ],
  };

  const [messages, setMessages] = useState<Message[]>([initialBotMessage]);

  // Listen to open events across the app
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-xiantra-bot', handleOpen);
    return () => window.removeEventListener('open-xiantra-bot', handleOpen);
  }, []);

  // Show welcome prompt pill after 3.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasPromptedBanner(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleOptionClick = (optionLabel: string) => {
    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: optionLabel,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setTypingText('Xian está calculando la solución y propuesta...');

    setTimeout(() => {
      setIsTyping(false);
      let botResponse: Message;

      const opt = optionLabel.toLowerCase();

      if (opt.includes('web con ia') || opt.includes('alta conversión') || opt.includes('b2b')) {
        setLeadData((prev) => ({ ...prev, sector: 'Web Corporativa B2B' }));
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          qualificationBadge: {
            score: 96,
            label: 'Lead B2B Calificado',
            tag: 'Prioridad Comercial Alta',
          },
          text: '¡Excelente elección! Nuestras páginas web con IA están diseñadas para convertir visitas en cotizaciones en menos de 3 minutos. Incluyen catálogo dinámico, agente 24/7 y panel de control para gerencia.',
          showQuoteCard: {
            service: 'Web Corporativa + Asistente IA 24/7',
            estimatedPriceCOP: '$1.490.000 COP',
            timeline: 'Entrega en 7 a 10 días hábiles',
          },
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          options: [
            { label: 'Recibir propuesta en PDF por WhatsApp', icon: 'phone' },
            { label: 'Explorar Panel Demo en Pantalla', icon: 'chart' },
            { label: 'Dejar mis datos para diagnóstico gratuito', icon: 'user' },
          ],
        };
      } else if (opt.includes('e-commerce') || opt.includes('carrito') || opt.includes('tienda')) {
        setLeadData((prev) => ({ ...prev, sector: 'E-Commerce & Retail' }));
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          qualificationBadge: {
            score: 94,
            label: 'E-Commerce Mayorista / Retail',
            tag: 'Rescate de Pedidos',
          },
          text: 'El mayor problema en Colombia es el abandono del carrito por pasarelas complejas. Nuestro sistema integra pago en 1 paso por Wompi/PSE y rescata pedidos directamente a través de WhatsApp.',
          showQuoteCard: {
            service: 'E-Commerce de Alta Conversión + Rescate',
            estimatedPriceCOP: '$2.890.000 COP',
            timeline: 'Entrega en 10 a 14 días hábiles',
          },
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          options: [
            { label: 'Recibir propuesta en PDF por WhatsApp', icon: 'phone' },
            { label: 'Dejar mis datos para diagnóstico gratuito', icon: 'user' },
          ],
        };
      } else if (opt.includes('panel demo') || opt.includes('demostración')) {
        window.dispatchEvent(new CustomEvent('open-admin-demo'));
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: 'He desplegado el Simulador del Panel de Control en tu pantalla. Podrás explorar métricas de visitantes, mapas de calor y registro de prospectos en tiempo real.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          options: [
            { label: 'Recibir cotización formal para mi empresa', icon: 'zap' },
            { label: 'Hablar con un consultor por WhatsApp', icon: 'phone' },
          ],
        };
      } else if (opt.includes('whatsapp') || opt.includes('asesor')) {
        window.open(
          `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
            `Hola Xian de Xiantra, estuve probando el asistente de IA en www.xiantradigital.com para ${leadData.sector || 'mi empresa'} y deseo cotizar una solución comercial.`
          )}`,
          '_blank'
        );
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: 'Te he conectado con la línea directa de WhatsApp de nuestros directores técnicos para atenderte de forma prioritaria.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          options: [
            { label: 'Dejar mis datos aquí también', icon: 'user' },
            { label: 'Reiniciar conversación', icon: 'rotate' },
          ],
        };
      } else if (opt.includes('datos') || opt.includes('diagnóstico') || opt.includes('cotización formal')) {
        setShowLeadForm(true);
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: 'Con gusto estructuramos tu propuesta comercial. Ingresa tus datos corporativos a continuación y te enviamos el desglose oficial en PDF:',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      } else if (opt.includes('reiniciar')) {
        handleReset();
        return;
      } else {
        botResponse = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: 'Comprendido. En Xiantra desarrollamos el ecosistema comercial completo: Web Ultrarrápida + Asistente IA 24/7 + Panel Administrador. ¿Deseas ver una cotización personalizada o hablar con un asesor?',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          options: [
            { label: 'Página Web con IA 24/7 (Alta Conversión)', icon: 'zap' },
            { label: 'Hablar con un consultor por WhatsApp', icon: 'phone' },
          ],
        };
      }

      setMessages((prev) => [...prev, botResponse]);
    }, 700);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage.trim();
    setInputMessage('');

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setTypingText('Xian está procesando tu consulta con el motor comercial...');

    setTimeout(() => {
      setIsTyping(false);
      const botResponse: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        qualificationBadge: {
          score: 95,
          label: 'Consulta Analizada',
          tag: 'Atención 24/7',
        },
        text: `Hola, he analizado tu consulta sobre "${userText}". Nuestro sistema responde dudas técnicas, envía fichas y cierra prospectos en piloto automático. ¿Te gustaría recibir una cotización detallada para tu empresa o agendar una llamada estratégica?`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        options: [
          { label: 'Recibir propuesta en PDF por WhatsApp', icon: 'phone' },
          { label: 'Explorar Panel Demo en Pantalla', icon: 'chart' },
          { label: 'Dejar mis datos para diagnóstico gratuito', icon: 'user' },
        ],
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 800);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadData.fullName.trim() || !leadData.whatsapp.trim()) return;

    setLeadSubmitted(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          qualificationBadge: {
            score: 99,
            label: 'Lead Registrado con Éxito',
            tag: 'Asignado a Asesor Senior',
          },
          text: `¡Perfecto, ${leadData.fullName}! He registrado tu solicitud en el Panel Administrador de Xiantra con prioridad Ejecutiva. Nuestro equipo de ingeniería te contactará en menos de 2 horas hábiles con tu propuesta formal.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          options: [
            { label: 'Explorar Panel Demo en Pantalla', icon: 'chart' },
            { label: 'Conectar por WhatsApp ahora mismo', icon: 'phone' },
          ],
        },
      ]);
      setShowLeadForm(false);
    }, 600);
  };

  const handleReset = () => {
    setMessages([initialBotMessage]);
    setShowLeadForm(false);
    setLeadSubmitted(false);
    setInputMessage('');
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. FLOATING ACTION TRIGGER: ULTRA-PREMIUM CORPORATE BEACON */}
      {/* ========================================================================= */}
      {!isOpen && (
        <div className="fixed bottom-20 right-3.5 sm:right-6 lg:bottom-6 lg:right-6 z-40 flex items-center gap-3">
          {/* Welcome Callout Pill */}
          {hasPromptedBanner && (
            <div className="relative group/pill hidden sm:flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-950/95 border border-emerald-500/40 text-slate-100 shadow-[0_10px_35px_rgba(5,9,17,0.85)] backdrop-blur-xl animate-in fade-in slide-in-from-right-3 duration-300">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setHasPromptedBanner(false);
                }}
                className="absolute -top-1.5 -left-1.5 w-4 h-4 rounded-full bg-slate-800 border border-slate-600 text-slate-400 hover:text-white flex items-center justify-center text-[9px] cursor-pointer"
                title="Descartar"
                aria-label="Cerrar aviso"
              >
                ✕
              </button>

              <div
                onClick={() => setIsOpen(true)}
                className="cursor-pointer flex flex-col text-right select-none"
              >
                <div className="flex items-center justify-end gap-1.5">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-xs font-bold text-white tracking-tight">
                    Xian · Consultor IA
                  </span>
                </div>
                <span className="text-[11px] text-emerald-300 font-medium">
                  ¿Te ayudo a cotizar tu proyecto web?
                </span>
              </div>
            </div>
          )}

          {/* Main Floating Trigger Button with Animated Glowing Rings */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative w-15 h-15 sm:w-16 sm:h-16 lg:w-18 lg:h-18 rounded-full p-0.5 group focus:outline-none cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95"
            aria-label="Abrir asistente de IA Xian"
          >
            {/* Outer Breathing Aurora Glow */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 opacity-60 blur-md group-hover:opacity-90 group-hover:blur-lg transition-all animate-pulse" />

            {/* Rotating Conic Ring */}
            <div className="relative w-full h-full rounded-full p-0.5 bg-gradient-to-tr from-emerald-400 via-cyan-400 to-blue-500 shadow-2xl">
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-slate-950 bg-slate-950">
                <img
                  src={xianAvatar}
                  alt="Xian - Asesor Corporativo con IA"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 via-transparent to-transparent" />
              </div>
            </div>

            {/* Live Status Indicator Dot */}
            <span className="absolute bottom-0.5 right-0.5 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-slate-950" />
            </span>

            {/* Micro Badge Label */}
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-slate-950 border border-emerald-400/70 text-[9px] font-mono font-black text-emerald-300 uppercase tracking-wider shadow-lg whitespace-nowrap">
              IA 24/7
            </span>
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. CHATBOT MODAL CONSOLE: HIGH-END FINTECH EXECUTIVE ASSISTANT */}
      {/* ========================================================================= */}
      {isOpen && (
        <div className="fixed inset-x-2.5 bottom-20 sm:inset-x-auto sm:bottom-20 sm:right-6 lg:bottom-6 lg:right-6 z-50 w-auto sm:w-[420px] md:w-[440px] h-[min(640px,84dvh)] rounded-3xl bg-[#060A14]/95 border border-emerald-500/35 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] flex flex-col overflow-hidden text-slate-100 backdrop-blur-2xl animate-in zoom-in-95 duration-200">
          
          {/* Ambient Lighting Corner Orbs */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* ================= EXECUTIVE HEADER ================= */}
          <div className="px-4 py-3.5 bg-gradient-to-r from-slate-950 via-[#0A1120] to-slate-950 border-b border-white/10 flex items-center justify-between gap-3 relative z-10">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-11 h-11 rounded-2xl p-0.5 bg-gradient-to-tr from-emerald-400 to-cyan-500 shadow-md shrink-0">
                <img
                  src={xianAvatar}
                  alt="Xian - Asistente Comercial"
                  className="w-full h-full rounded-[14px] object-cover object-top border border-slate-950"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950 animate-pulse" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-extrabold text-sm text-white tracking-tight truncate">
                    Xian · Asistente Comercial IA
                  </span>
                  <span className="text-[9px] font-mono font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 px-1.5 py-0.5 rounded">
                    EN LÍNEA
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono mt-0.5">
                  <span className="text-slate-300">Xiantra Digital</span>
                  <span>·</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-current" />
                    <span>Respuesta &lt; 0.2s</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handleReset}
                title="Reiniciar conversación"
                className="w-8 h-8 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Reiniciar chat"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Cerrar asistente"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ================= FAST SCENARIO CHIPS BAR ================= */}
          <div className="px-3.5 py-2 bg-slate-950/80 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar relative z-10 text-[11px]">
            <span className="text-slate-400 font-mono text-[10px] uppercase shrink-0 pl-1">
              Sector:
            </span>
            <button
              onClick={() => handleOptionClick('Página Web con IA 24/7 (Alta Conversión)')}
              className="px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/50 text-slate-300 hover:text-emerald-300 transition-colors shrink-0 whitespace-nowrap cursor-pointer font-medium"
            >
              🏢 Industria B2B
            </button>
            <button
              onClick={() => handleOptionClick('E-Commerce con Rescate de Carritos')}
              className="px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/50 text-slate-300 hover:text-emerald-300 transition-colors shrink-0 whitespace-nowrap cursor-pointer font-medium"
            >
              🛒 E-Commerce
            </button>
            <button
              onClick={() => handleOptionClick('Chatbot de Ventas para WhatsApp')}
              className="px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/50 text-slate-300 hover:text-emerald-300 transition-colors shrink-0 whitespace-nowrap cursor-pointer font-medium"
            >
              💬 WhatsApp Bot
            </button>
          </div>

          {/* ================= MESSAGES SCROLL AREA ================= */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs no-scrollbar relative z-10">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                {/* AI Qualification Telemetry Card if available */}
                {msg.qualificationBadge && (
                  <div className="w-full mb-2 p-2.5 rounded-2xl bg-gradient-to-r from-emerald-950/70 to-slate-900/90 border border-emerald-500/40 flex items-center justify-between gap-2 shadow-sm animate-in fade-in">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-white block">
                          {msg.qualificationBadge.label}
                        </span>
                        <span className="text-[9px] font-mono text-emerald-400 block">
                          {msg.qualificationBadge.tag}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-black text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-500/30">
                      Score: {msg.qualificationBadge.score}/100
                    </span>
                  </div>
                )}

                {/* Message Bubble */}
                <div className="flex items-end gap-2 max-w-[92%]">
                  {msg.sender === 'bot' && (
                    <div className="relative w-7 h-7 rounded-xl overflow-hidden border border-emerald-500/40 shrink-0 mb-0.5 shadow-sm">
                      <img
                        src={xianAvatar}
                        alt="Xian"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                  )}

                  <div
                    className={`px-4 py-3 rounded-2xl leading-relaxed shadow-md ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-tr-none font-medium'
                        : 'bg-slate-900/90 border border-slate-800 text-slate-100 rounded-tl-none'
                    }`}
                  >
                    <p className="text-xs sm:text-[13px]">{msg.text}</p>
                  </div>
                </div>

                {/* Timestamp */}
                <span className="text-[9px] text-slate-500 mt-1 px-1 font-mono">{msg.time}</span>

                {/* Dynamic Quote Card Preview inside bot message */}
                {msg.showQuoteCard && (
                  <div className="mt-2.5 ml-9 w-[calc(100%-2.25rem)] p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-900 border border-emerald-500/50 shadow-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wide">
                        Propuesta Estimada Inmediata
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {msg.showQuoteCard.timeline}
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between">
                      <h4 className="text-xs font-bold text-white">
                        {msg.showQuoteCard.service}
                      </h4>
                      <span className="text-sm font-black font-mono text-emerald-300">
                        {msg.showQuoteCard.estimatedPriceCOP}
                      </span>
                    </div>
                  </div>
                )}

                {/* Interactive Suggestion Action Chips */}
                {msg.options && msg.options.length > 0 && (
                  <div className="flex flex-col gap-1.5 mt-2.5 w-full max-w-[94%] pl-9">
                    {msg.options.map((opt, optIdx) => (
                      <button
                        key={optIdx}
                        onClick={() => handleOptionClick(opt.label)}
                        className="min-h-[42px] text-left px-3.5 py-2.5 rounded-xl bg-slate-900/95 hover:bg-slate-800/90 border border-slate-800 hover:border-emerald-500/60 text-xs text-slate-200 hover:text-emerald-300 transition-all cursor-pointer flex items-center justify-between group shadow-sm hover:scale-[1.01]"
                      >
                        <span className="font-semibold leading-tight pr-2">{opt.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Cinematic Animated Reasoning & Typing State */}
            {isTyping && (
              <div className="flex items-start gap-2 text-xs pl-1 animate-in fade-in">
                <div className="relative w-7 h-7 rounded-xl overflow-hidden border border-emerald-500/50 shrink-0">
                  <img
                    src={xianAvatar}
                    alt="Xian analizando"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="px-4 py-2.5 rounded-2xl bg-slate-900/95 border border-emerald-500/40 rounded-tl-none shadow-lg space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" />
                    <span className="text-[11px] font-mono text-emerald-300 font-semibold ml-1.5">
                      {typingText}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-slate-500 block">
                    Motor neuronal activo · Sincronizando con catálogo
                  </span>
                </div>
              </div>
            )}

            {/* High-Conversion Fast Lead Capture Form inside Widget */}
            {showLeadForm && !leadSubmitted && (
              <form
                onSubmit={handleFormSubmit}
                className="p-4 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/40 space-y-3 animate-in fade-in duration-200 mt-2 shadow-xl"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-white">
                      Registro de Propuesta Formal
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-emerald-400">PDF en 2 Horas</span>
                </div>

                <div className="space-y-2">
                  <div>
                    <label className="block text-[11px] text-slate-300 font-semibold mb-1">
                      Nombre y Apellido *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Ing. Carlos Restrepo"
                      value={leadData.fullName}
                      onChange={(e) => setLeadData({ ...leadData, fullName: e.target.value })}
                      className="w-full min-h-[42px] bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-300 font-semibold mb-1">
                      Número de Celular / WhatsApp *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-xs font-mono text-slate-400">🇨🇴 +57</span>
                      <input
                        type="tel"
                        required
                        placeholder="300 123 4567"
                        value={leadData.whatsapp}
                        onChange={(e) => setLeadData({ ...leadData, whatsapp: e.target.value })}
                        className="w-full min-h-[42px] pl-16 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-300 font-semibold mb-1">
                      Correo Corporativo
                    </label>
                    <input
                      type="email"
                      placeholder="contacto@tuempresa.com"
                      value={leadData.email}
                      onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                      className="w-full min-h-[42px] bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full min-h-[44px] py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-xs cursor-pointer shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Confirmar y Enviar a Xian</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ================= INPUT FOOTER CONSOLE ================= */}
          <div className="p-3 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent border-t border-slate-800/80 relative z-10 space-y-2">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Escribe tu consulta o requerimiento comercial..."
                className="flex-1 min-h-[44px] bg-slate-900 border border-slate-700/80 rounded-2xl px-3.5 py-2.5 text-xs sm:text-[13px] text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-2xl font-bold transition-all shadow-md shrink-0 ${
                  inputMessage.trim()
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white cursor-pointer shadow-emerald-500/20 scale-100'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
                }`}
                aria-label="Enviar mensaje a Xian"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 px-1">
              <span>IA Xiantra v3.5 · Privacidad Garantizada</span>
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 hover:underline flex items-center gap-1"
              >
                <span>WhatsApp Oficial</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
