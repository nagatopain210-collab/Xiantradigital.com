import React, { useState } from 'react';
import {
  Send,
  User,
  CheckCheck,
  RefreshCw,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Zap,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/copyData';

const advisorPhoto = '/images/advisor_corporate_man_1793654807154.jpg';

interface Message {
  sender: 'bot' | 'user';
  text: string;
  time: string;
  quickReplies?: string[];
  kpiHighlight?: string;
}

export const ChatbotPreview: React.FC = () => {
  const initialMessages: Message[] = [
    {
      sender: 'bot',
      text: '¡Hola! Soy David Restrepo, director de consultoría en Xiantra Digital. Si tu empresa siente que su página web actual o su WhatsApp no están generando suficientes cotizaciones semanales, estás en el lugar correcto. ¿Cuál es tu objetivo comercial prioritario?',
      time: '12:01 PM',
      quickReplies: [
        'Quiero captar más cotizaciones B2B',
        'Quiero vender online y cobrar por PSE/Wompi',
        'Quiero un agente de WhatsApp que venda 24/7',
        '¿Cuánto cuesta implementar esto?',
      ],
    },
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const getBotResponse = (query: string): { text: string; quickReplies?: string[]; kpiHighlight?: string } => {
    const q = query.toLowerCase();

    if (q.includes('cotizaciones') || q.includes('b2b') || q.includes('web') || q.includes('página')) {
      return {
        text: 'Totalmente comprendido. En proyectos B2B lo vital es que el cliente entienda tu valor en 3 segundos y pueda pedir una cotización en 1 solo clic. Con Maquitec SAS logramos un +240% en prospectos calificados en 60 días. ¿Te gustaría que evaluemos tu caso en una sesión de 15 minutos sin costo?',
        quickReplies: ['Sí, agendar diagnóstico gratuito', '¿Cuánto cuesta el desarrollo?', 'Hablar por WhatsApp'],
        kpiHighlight: '+240% en cotizaciones B2B calificadas',
      };
    }
    if (q.includes('online') || q.includes('pse') || q.includes('wompi') || q.includes('tienda') || q.includes('ventas')) {
      return {
        text: 'Excelente. El mayor dolor del e-commerce en Colombia es que el 70% de clientes abandona el carrito por cobros difíciles. Con nuestro checkout en 1 paso y rescate automático por WhatsApp, DistriAlimentos redujo el abandono del 72% al 28%. ¿Vendes al detal o al por mayor?',
        quickReplies: ['Vendo al por mayor (B2B)', 'Vendo al detal (B2C)', 'Quiero cotizar mi tienda'],
        kpiHighlight: 'Rescate de carritos 72% → 28%',
      };
    }
    if (q.includes('whatsapp') || q.includes('24/7') || q.includes('agente') || q.includes('bot')) {
      return {
        text: 'Es la inversión más rentable para una empresa activa. El agente se entrena con tu catálogo, precios y políticas. Atiende en menos de 3 segundos a las 9 PM o un domingo, descarta curiosos y te entrega al comprador listo para pagar. ¿Te gustaría probarlo en tu celular?',
        quickReplies: ['Quiero probarlo en mi celular', '¿Se conecta a mi CRM?', 'Quiero hablar con un asesor'],
        kpiHighlight: 'Atención autónoma en < 3 segundos 24/7',
      };
    }
    if (q.includes('cuesta') || q.includes('precio') || q.includes('inversión') || q.includes('cuánto')) {
      return {
        text: 'Nuestros proyectos llave en mano inician desde $799.999 COP para Landing Pages de alta velocidad, $1.490.000 COP para Web Corporativa con IA, y $2.890.000 COP para E-Commerce completo. ¡Todos incluyen el Panel Administrador sin costo adicional! ¿Para qué empresa sería el proyecto?',
        quickReplies: ['Quiero una propuesta formal', 'Ver planes de mantenimiento', 'Chatear por WhatsApp'],
        kpiHighlight: 'Planes desde $799.999 COP llave en mano',
      };
    }

    return {
      text: 'Entiendo perfectamente. Cada empresa tiene metas y dolores comerciales distintos. Puedo prepararte un diagnóstico gratuito en menos de 2 horas o coordinar una llamada directa con un especialista.',
      quickReplies: ['Quiero mi diagnóstico gratuito', 'Hablar por WhatsApp ahora'],
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText.trim();
    if (!text) return;

    const userMsg: Message = {
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getBotResponse(text);
      const botMsg: Message = {
        sender: 'bot',
        text: response.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickReplies: response.quickReplies,
        kpiHighlight: response.kpiHighlight,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 650);
  };

  const handleReset = () => {
    setMessages(initialMessages);
  };

  return (
    <div className="rounded-3xl bg-[#070B14] border border-emerald-500/35 shadow-[0_20px_50px_rgba(5,9,17,0.7)] overflow-hidden flex flex-col h-[480px] sm:h-[550px]">
      {/* Human Consultative Chatbot Header */}
      <div className="px-4 sm:px-5 py-3.5 bg-gradient-to-r from-slate-950 via-[#0A1220] to-slate-950 border-b border-white/10 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative w-11 h-11 rounded-2xl p-0.5 bg-gradient-to-tr from-emerald-400 to-cyan-500 shadow-md shrink-0">
            <img
              src={advisorPhoto}
              alt="David Restrepo - Consultor Comercial"
              className="w-full h-full rounded-[14px] object-cover object-top border border-slate-950"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-950 animate-pulse" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-extrabold text-white text-sm truncate">David Restrepo</span>
              <span className="text-[9px] font-mono font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                EN LÍNEA
              </span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono mt-0.5 truncate">
              <span>Director Comercial</span>
              <span>·</span>
              <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                <Zap className="w-3 h-3 fill-current" />
                <span>Respuesta 0.2s</span>
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-white rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 transition-colors cursor-pointer shrink-0"
          title="Reiniciar conversación"
          aria-label="Reiniciar conversación"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-950/60 no-scrollbar">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            {/* KPI Highlight Card if present */}
            {msg.kpiHighlight && (
              <div className="mb-2 p-2 px-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-[11px] font-mono text-emerald-300 flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>{msg.kpiHighlight}</span>
              </div>
            )}

            <div
              className={`max-w-[88%] sm:max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-[13px] leading-relaxed shadow-md ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-tr-none font-medium'
                  : 'bg-slate-900/90 border border-slate-800 text-slate-100 rounded-tl-none'
              }`}
            >
              {msg.text}
            </div>

            <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-500 px-1 font-mono">
              <span>{msg.time}</span>
              {msg.sender === 'user' && <CheckCheck className="w-3 h-3 text-emerald-400" />}
            </div>

            {/* Quick replies */}
            {msg.quickReplies && (
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {msg.quickReplies.map((reply, rIdx) => (
                  <button
                    key={rIdx}
                    onClick={() => handleSendMessage(reply)}
                    className="text-xs px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800/90 text-slate-200 hover:text-emerald-300 border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer font-medium text-left shadow-sm hover:scale-[1.01]"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-slate-900 border border-emerald-500/40 w-24">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.3s]" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.15s]" />
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce" />
            <span className="text-[10px] font-mono text-emerald-300 ml-1">IA...</span>
          </div>
        )}
      </div>

      {/* Input Field */}
      <div className="p-3 bg-slate-950/90 border-t border-slate-800 flex items-center gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Escribe tu consulta comercial para respuesta en 0.2s..."
          className="flex-1 bg-slate-900 border border-slate-700/80 rounded-2xl px-4 py-2.5 min-h-[44px] text-xs sm:text-[13px] text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
        />
        <button
          onClick={() => handleSendMessage()}
          className="w-11 h-11 flex items-center justify-center bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-2xl transition-all shadow-md shadow-emerald-500/20 cursor-pointer shrink-0"
          aria-label="Enviar mensaje comercial"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
