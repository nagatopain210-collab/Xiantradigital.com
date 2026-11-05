import React, { useState } from 'react';
import {
  X,
  LayoutDashboard,
  Globe,
  Smartphone,
  Monitor,
  MessageSquare,
  TrendingUp,
  MousePointerClick,
  FileText,
  CheckCircle2,
  Sparkles,
  Bot,
  Building,
  User,
  Mail,
  Download,
  ArrowRight,
  RefreshCw,
  BarChart3,
} from 'lucide-react';

interface ClientAdminDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuote: () => void;
}

export const ClientAdminDemoModal: React.FC<ClientAdminDemoModalProps> = ({
  isOpen,
  onClose,
  onOpenQuote,
}) => {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const [activeTab, setActiveTab] = useState<'metrics' | 'report' | 'bot_chats' | 'website'>('metrics');
  const [deviceView, setDeviceView] = useState<'desktop' | 'mobile'>('desktop');
  const [reportDownloaded, setReportDownloaded] = useState(false);
  const [simulatedNotice, setSimulatedNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleStartDemo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim() || !clientCompany.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setIsConfigured(true);
    }, 700);
  };

  const handleDownloadReport = () => {
    setReportDownloaded(true);
    setTimeout(() => setReportDownloaded(false), 3000);
  };

  const triggerSimulatedNotice = (msg: string) => {
    setSimulatedNotice(msg);
    setTimeout(() => setSimulatedNotice(null), 3500);
  };

  const companyDisplayName = clientCompany.trim() || 'Tu Empresa';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[90dvh] flex flex-col bg-[#080B14] rounded-2xl border border-cyan-500/40 shadow-2xl overflow-hidden text-slate-100">
        {/* Top Header Bar */}
        <div className="px-4 sm:px-5 py-3 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-slate-950 shadow-md shadow-cyan-500/20 shrink-0">
              <LayoutDashboard className="w-5 h-5 text-slate-950" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-xs sm:text-base truncate">
                  {isConfigured ? `Panel de Control · ${companyDisplayName}` : 'Simulador del Panel Administrativo'}
                </span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/80 border border-cyan-700/60 px-2 py-0.5 rounded font-bold shrink-0">
                  {isConfigured ? 'DEMO ACTIVO' : 'PASO 1'}
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block truncate">
                {isConfigured
                  ? `Administrador: ${clientName} (${clientEmail}) · Sincronizado con Chatbot de IA`
                  : 'Ingresa los datos de tu empresa para generar un panel interactivo a tu medida'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isConfigured && (
              <button
                onClick={() => setIsConfigured(false)}
                className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
                title="Cambiar datos de empresa"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Cambiar Empresa</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="min-h-[40px] min-w-[40px] flex items-center justify-center text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto bg-[#05070D]">
          {/* ================= STEP 1: ONBOARDING CAPTURE ================= */}
          {!isConfigured ? (
            <div className="min-h-full flex items-center justify-center p-4 sm:p-10">
              <div className="w-full max-w-lg bg-slate-900/90 rounded-2xl p-5 sm:p-8 border border-cyan-500/30 shadow-2xl">
                <div className="text-center mb-5 sm:mb-6">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-cyan-950/80 border border-cyan-500/50 text-cyan-400 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-cyan-950">
                    <Sparkles className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Personaliza tu Panel Administrativo
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1">
                    Escribe tus datos para entrar al simulador interactivo con las métricas y el informe de rendimiento de tu empresa.
                  </p>
                </div>

                <form onSubmit={handleStartDemo} className="space-y-4 text-xs">
                  <div>
                    <label className="text-slate-300 font-bold block mb-1 text-[11px] flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Tu Nombre y Apellido *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="Ej. Carlos Restrepo"
                      className="w-full min-h-[46px] bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-bold block mb-1 text-[11px] flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Tu Correo Corporativo *</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="carlos@empresa.com"
                      className="w-full min-h-[46px] bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="text-slate-300 font-bold block mb-1 text-[11px] flex items-center gap-1.5">
                      <Building className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Nombre de tu Empresa *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={clientCompany}
                      onChange={(e) => setClientCompany(e.target.value)}
                      placeholder="Ej. Maquinaria Industrial SAS"
                      className="w-full min-h-[46px] bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-base sm:text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isGenerating}
                      className="w-full min-h-[48px] py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-emerald-950 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Configurando panel para {clientCompany}...</span>
                        </>
                      ) : (
                        <>
                          <span>Entrar al Demo de {clientCompany.trim() || 'Mi Empresa'}</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>

                  <div className="pt-1 text-center">
                    <span className="text-[11px] text-slate-400">
                      Incluido como <strong className="text-cyan-300">PLUS GRATIS</strong> (Ahorro de $1.200.000 COP) con tu web.
                    </span>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            /* ================= STEP 2: PERSONALIZED CLIENT ADMIN DASHBOARD ================= */
            <div className="p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6 max-w-6xl mx-auto">
              {/* Internal Nav Tabs (Scrollable on narrow mobile) */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-2 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-1 text-xs overflow-x-auto no-scrollbar">
                  <button
                    onClick={() => setActiveTab('metrics')}
                    className={`min-h-[38px] flex items-center gap-1.5 px-3 py-2 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      activeTab === 'metrics'
                        ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>1. Visitas &amp; Clicks</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('bot_chats')}
                    className={`min-h-[38px] flex items-center gap-1.5 px-3 py-2 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      activeTab === 'bot_chats'
                        ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>2. Uso del Bot</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('report')}
                    className={`min-h-[38px] flex items-center gap-1.5 px-3 py-2 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      activeTab === 'report'
                        ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>3. Informe IA</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('website')}
                    className={`min-h-[38px] flex items-center gap-1.5 px-3 py-2 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                      activeTab === 'website'
                        ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>4. Ver Web en Vivo</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onOpenQuote();
                  }}
                  className="min-h-[40px] px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs cursor-pointer shadow transition-all shrink-0"
                >
                  Quiero este Panel para {companyDisplayName}
                </button>
              </div>

              {/* TAB 1: VISITAS, CLICKS & RESUMEN */}
              {activeTab === 'metrics' && (
                <div className="space-y-5 sm:space-y-6 animate-in fade-in">
                  {/* 4 Core Metric Cards (2x2 on Mobile/Tablet, 4-col on Desktop) */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-cyan-500/30">
                      <div className="flex items-center justify-between text-slate-400 mb-2">
                        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-300">
                          Visitas Web
                        </span>
                        <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight tabular-nums">
                          12.840
                        </span>
                        <span className="text-[11px] font-bold text-emerald-400">+24.8%</span>
                      </div>
                      <div className="mt-2.5 pt-2 border-t border-slate-800/80 text-[10px] sm:text-[11px] text-slate-400 flex items-center justify-between">
                        <span>78% Móvil</span>
                        <span>22% PC</span>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-indigo-500/30">
                      <div className="flex items-center justify-between text-slate-400 mb-2">
                        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-300">
                          Clicks CTAs
                        </span>
                        <MousePointerClick className="w-4 h-4 text-indigo-400 shrink-0" />
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight tabular-nums">
                          3.420
                        </span>
                        <span className="text-[11px] font-bold text-emerald-400">+31.2%</span>
                      </div>
                      <div className="mt-2.5 pt-2 border-t border-slate-800/80 text-[10px] sm:text-[11px] text-slate-400 flex items-center justify-between">
                        <span>2.180 WA</span>
                        <span>1.240 Form</span>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-emerald-500/30">
                      <div className="flex items-center justify-between text-slate-400 mb-2">
                        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-300">
                          Uso del Bot
                        </span>
                        <Bot className="w-4 h-4 text-emerald-400 shrink-0" />
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight tabular-nums">
                          418
                        </span>
                        <span className="text-[11px] font-bold text-emerald-400">Chats</span>
                      </div>
                      <div className="mt-2.5 pt-2 border-t border-slate-800/80 text-[10px] sm:text-[11px] text-slate-400 flex items-center justify-between">
                        <span>389 Leads</span>
                        <span>93% Ok</span>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-teal-500/30">
                      <div className="flex items-center justify-between text-slate-400 mb-2">
                        <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-300">
                          Conversión
                        </span>
                        <TrendingUp className="w-4 h-4 text-teal-400 shrink-0" />
                      </div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl sm:text-3xl font-black font-mono text-white tracking-tight tabular-nums">
                          5.2%
                        </span>
                        <span className="text-[11px] font-bold text-cyan-400">3.4x</span>
                      </div>
                      <div className="mt-2.5 pt-2 border-t border-slate-800/80 text-[10px] sm:text-[11px] text-slate-400 flex items-center justify-between">
                        <span>Carga: 0.7s</span>
                        <span>24/7</span>
                      </div>
                    </div>
                  </div>

                  {/* Visual Chart of Visits vs Clicks (7 Days) */}
                  <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-xs sm:text-sm font-extrabold text-white">
                          Rendimiento de Visitas y Clicks hacia WhatsApp (Últimos 7 Días)
                        </h4>
                        <p className="text-[11px] sm:text-xs text-slate-400">
                          Medición en tiempo real para {companyDisplayName}
                        </p>
                      </div>
                      <span className="text-xs font-mono text-cyan-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800 shrink-0">
                        7 Días
                      </span>
                    </div>

                    <div className="pt-4 grid grid-cols-7 gap-2 sm:gap-4 items-end h-40 sm:h-44">
                      {[
                        { day: 'Lun', clicks: 380, height: '60%' },
                        { day: 'Mar', clicks: 420, height: '72%' },
                        { day: 'Mié', clicks: 510, height: '85%' },
                        { day: 'Jue', clicks: 480, height: '80%' },
                        { day: 'Vie', clicks: 640, height: '98%' },
                        { day: 'Sáb', clicks: 390, height: '58%' },
                        { day: 'Dom', clicks: 320, height: '48%' },
                      ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 h-full justify-end">
                          <span className="text-[9px] sm:text-[10px] font-mono text-cyan-300 tabular-nums">
                            {item.clicks}
                          </span>
                          <div
                            className="w-full max-w-[42px] bg-gradient-to-t from-indigo-600 via-cyan-500 to-teal-400 rounded-t-lg transition-all duration-500 shadow-lg shadow-cyan-950"
                            style={{ height: item.height }}
                          />
                          <span className="text-[10px] sm:text-[11px] font-medium text-slate-400">
                            {item.day}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: USO DEL BOT DE SU PÁGINA (CONVERSACIONES) */}
              {activeTab === 'bot_chats' && (
                <div className="space-y-6 animate-in fade-in">
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/70 border border-slate-800">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                      <div>
                        <div className="flex items-center gap-2">
                          <Bot className="w-5 h-5 text-cyan-400 shrink-0" />
                          <h4 className="text-sm sm:text-base font-extrabold text-white">
                            Registro de Uso del Chatbot IA para {companyDisplayName}
                          </h4>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Prospectos que conversaron con el bot en tu web y fueron transferidos a WhatsApp
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-xs">
                        <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono font-bold">
                          Bot Activo 24/7
                        </span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {[
                        {
                          client: 'Ing. Fernando Valderrama',
                          query: `Hola, requiero cotización formal de productos para ${companyDisplayName} para entrega inmediata en Bogotá.`,
                          botAction: 'Cotización en PDF enviada y número celular capturado (+57 312 984 1120).',
                          status: 'Transferido a WhatsApp',
                          time: 'Hace 8 min',
                          channel: 'WhatsApp Cloud API',
                        },
                        {
                          client: 'Carolina Morales',
                          query: '¿Cuáles son los precios de mayoreo y medios de pago que aceptan?',
                          botAction: 'Explicó pasarelas PSE / Wompi y agendó llamada con el asesor comercial.',
                          status: 'Cita Agendada',
                          time: 'Hace 34 min',
                          channel: 'Web Chat',
                        },
                        {
                          client: 'Andrés Felipe Gómez',
                          query: '¿Tienen soporte técnico y garantía para empresas en Medellín?',
                          botAction: 'Aclaró garantía de 90 días y envió ubicación de bodega.',
                          status: 'Lead Cualificado',
                          time: 'Hace 1h 15 min',
                          channel: 'WhatsApp Cloud API',
                        },
                      ].map((chat, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2 text-xs"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="font-bold text-white text-sm">{chat.client}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                                {chat.channel}
                              </span>
                              <span className="text-slate-400 text-[11px]">{chat.time}</span>
                            </div>
                          </div>

                          <p className="text-slate-300 italic bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
                            &ldquo;{chat.query}&rdquo;
                          </p>

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-[11px]">
                            <span className="text-slate-400 flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              <span>{chat.botAction}</span>
                            </span>
                            <span className="font-bold text-emerald-400 shrink-0">{chat.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: INFORME EJECUTIVO PERSONALIZADO */}
              {activeTab === 'report' && (
                <div className="space-y-6 animate-in fade-in">
                  <div className="p-5 sm:p-8 rounded-2xl bg-slate-900/85 border border-cyan-500/40 relative">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-cyan-400 mb-1">
                          <FileText className="w-4 h-4" />
                          <span>Informe Mensual Generado por Xiantra AI</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                          Informe de Rendimiento Digital: {companyDisplayName}
                        </h3>
                        <span className="text-xs text-slate-400">
                          Periodo Auditado: Últimos 30 Días · Administrador: {clientName}
                        </span>
                      </div>

                      <button
                        onClick={handleDownloadReport}
                        className="min-h-[42px] inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors cursor-pointer self-start sm:self-auto"
                      >
                        <Download className="w-4 h-4 text-cyan-400" />
                        <span>{reportDownloaded ? '¡Descargado!' : 'Descargar Informe en PDF'}</span>
                      </button>
                    </div>

                    <div className="py-5 space-y-4 text-xs sm:text-sm text-slate-200 leading-relaxed">
                      <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40">
                        <span className="font-bold text-cyan-300 block mb-1">
                          Resumen Ejecutivo de Rendimiento:
                        </span>
                        <p>
                          Durante el último mes, la plataforma web y el chatbot de IA de <strong>{companyDisplayName}</strong> registraron <strong>12.840 visitas</strong> y <strong>3.420 interacciones directas</strong>. El chatbot de WhatsApp atendió con éxito a 418 prospectos con un tiempo de respuesta promedio de <strong>0.3 segundos</strong>, logrando canalizar <strong>84 oportunidades comerciales calificadas</strong>.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
                        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                          <span className="text-[11px] font-mono text-cyan-400 block mb-1">MÉTRICA 1: VELOCIDAD</span>
                          <span className="text-lg font-bold text-white block">0.68s en Móviles</span>
                          <span className="text-[11px] text-slate-400">0% de rebote por lentitud técnica</span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                          <span className="text-[11px] font-mono text-emerald-400 block mb-1">MÉTRICA 2: ATENCIÓN</span>
                          <span className="text-lg font-bold text-white block">87% Fuera de Horario</span>
                          <span className="text-[11px] text-slate-400">Ventas capturadas en noches y festivos</span>
                        </div>
                        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                          <span className="text-[11px] font-mono text-indigo-400 block mb-1">MÉTRICA 3: ROI</span>
                          <span className="text-lg font-bold text-white block">4.8x Retorno</span>
                          <span className="text-[11px] text-slate-400">Reducción de costos de soporte manual</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <span className="text-xs text-slate-400">
                        Informe confidencial generado para <strong>{clientEmail}</strong>.
                      </span>

                      <button
                        onClick={() => {
                          onClose();
                          onOpenQuote();
                        }}
                        className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs cursor-pointer shadow-lg hover:scale-105 transition-transform"
                      >
                        Implementar esta Solución en {companyDisplayName}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: VISTA DE LA PÁGINA WEB DE SU EMPRESA */}
              {activeTab === 'website' && (
                <div className="space-y-4 flex flex-col items-center animate-in fade-in">
                  <div className="flex items-center justify-between w-full max-w-4xl bg-slate-900/80 px-4 py-2.5 rounded-xl border border-slate-800">
                    <div className="flex items-center gap-2 text-xs text-slate-300 truncate">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                      <span className="font-mono text-slate-400 truncate">
                        https://{clientCompany.toLowerCase().replace(/\s+/g, '') || 'tuempresa'}.com
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setDeviceView('desktop')}
                        className={`p-1.5 rounded-lg text-xs flex items-center gap-1.5 cursor-pointer ${
                          deviceView === 'desktop'
                            ? 'bg-indigo-600 text-white'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <Monitor className="w-4 h-4" />
                        <span className="hidden sm:inline">Escritorio</span>
                      </button>
                      <button
                        onClick={() => setDeviceView('mobile')}
                        className={`p-1.5 rounded-lg text-xs flex items-center gap-1.5 cursor-pointer ${
                          deviceView === 'mobile'
                            ? 'bg-indigo-600 text-white'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        <Smartphone className="w-4 h-4" />
                        <span className="hidden sm:inline">Móvil</span>
                      </button>
                    </div>
                  </div>

                  {simulatedNotice && (
                    <div className="w-full max-w-4xl px-4 py-2.5 rounded-xl bg-cyan-950/90 border border-cyan-500/40 text-xs text-cyan-200 flex items-center justify-between animate-in fade-in">
                      <span>{simulatedNotice}</span>
                      <button onClick={() => setSimulatedNotice(null)} className="text-cyan-400 font-bold ml-2">
                        OK
                      </button>
                    </div>
                  )}

                  <div
                    className={`transition-all duration-300 border border-slate-700/80 rounded-2xl overflow-hidden bg-slate-950 shadow-2xl ${
                      deviceView === 'mobile' ? 'w-[340px] max-w-full' : 'w-full max-w-4xl'
                    }`}
                  >
                    <div className="px-4 sm:px-5 py-3.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-cyan-400 text-slate-950 font-black text-xs flex items-center justify-center shrink-0">
                          {companyDisplayName.charAt(0)}
                        </div>
                        <span className="font-bold text-white text-xs sm:text-sm truncate">
                          {companyDisplayName}
                        </span>
                      </div>

                      <button
                        onClick={() =>
                          triggerSimulatedNotice(`Simulación activa: Conectando con WhatsApp Cloud API de ${companyDisplayName}`)
                        }
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold flex items-center gap-1.5 cursor-pointer shrink-0"
                      >
                        <MessageSquare className="w-3 h-3" />
                        <span>Chatbot 24/7</span>
                      </button>
                    </div>

                    <div className="p-6 sm:p-8 text-center space-y-4 bg-gradient-to-b from-slate-900/60 to-slate-950">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/50">
                        Sitio Oficial de {companyDisplayName}
                      </span>
                      <h3 className="text-lg sm:text-2xl font-black text-white leading-tight">
                        Soluciones Líderes &amp; Atención Inmediata con IA
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
                        Bienvenido al portal oficial de {companyDisplayName}. Consulta nuestros servicios, cotiza en tiempo real y recibe atención personalizada 24/7.
                      </p>

                      <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                        <button
                          onClick={() =>
                            triggerSimulatedNotice(`Simulación activa: Desplegando catálogo interactivo de ${companyDisplayName}`)
                          }
                          className="w-full sm:w-auto min-h-[42px] px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs cursor-pointer shadow"
                        >
                          Explorar Catálogo
                        </button>
                        <button
                          onClick={() =>
                            triggerSimulatedNotice(`Simulación activa: Abriendo asistente IA de ${companyDisplayName}`)
                          }
                          className="w-full sm:w-auto min-h-[42px] px-5 py-2.5 rounded-xl border border-slate-700 text-slate-200 hover:bg-slate-800 text-xs font-bold cursor-pointer"
                        >
                          Cotizar con Asesor IA
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
