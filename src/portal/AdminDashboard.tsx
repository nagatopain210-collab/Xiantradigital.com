import React, { useState } from 'react';
import {
  BarChart3,
  Users,
  Flame,
  MessageSquare,
  ShieldCheck,
  Plus,
  Search,
  Filter,
  Eye,
  Trash2,
  Edit3,
  ExternalLink,
  LogOut,
  Sparkles,
  TrendingUp,
  Clock,
  Smartphone,
  Monitor,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Send,
  Zap,
  Activity,
  Layers,
  Building,
  Key,
} from 'lucide-react';
import { usePortal } from './PortalContext';
import { ProjectStatus, ChatbotConversationLog, ClientProject } from './types';

export const AdminDashboard: React.FC = () => {
  const {
    adminName,
    logout,
    trafficMetrics,
    heatmapZones,
    chatbotLogs,
    clients,
    createClient,
    updateClientStatus,
    deleteClient,
    tickets,
    replyToTicket,
  } = usePortal();

  const [activeTab, setActiveTab] = useState<'traffic' | 'heatmap' | 'chatbot_logs' | 'clients' | 'tickets'>('traffic');

  // Search & filter states
  const [logSearch, setLogSearch] = useState('');
  const [selectedLogDetail, setSelectedLogDetail] = useState<ChatbotConversationLog | null>(null);

  // Client modal state
  const [isCreateClientOpen, setIsCreateClientOpen] = useState(false);
  const [newClientForm, setNewClientForm] = useState({
    companyName: '',
    contactName: '',
    email: '',
    passwordHash: '',
    phone: '',
    projectTitle: '',
    projectStatus: 'En diseño' as ProjectStatus,
    progressPercentage: 25,
    startDate: 'Hoy',
    estimatedDeliveryDate: 'En 3 semanas',
    websiteStagingUrl: 'https://staging.tuempresa.xiantradigital.com',
    cmsType: 'Custom React + Tailwind' as ClientProject['cmsType'],
    assignedTechLead: 'Daniel Morales (Lead Architect Xiantra)',
  });

  // Ticket reply in admin
  const [selectedAdminTicketId, setSelectedAdminTicketId] = useState<string | null>(null);
  const [adminReplyText, setAdminReplyText] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleCreateClientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientForm.companyName.trim() || !newClientForm.email.trim() || !newClientForm.passwordHash.trim()) {
      return;
    }

    createClient({
      ...newClientForm,
      websiteStagingUrl:
        newClientForm.websiteStagingUrl ||
        `https://staging.${newClientForm.companyName.toLowerCase().replace(/\s+/g, '')}.xiantradigital.com`,
      projectTitle:
        newClientForm.projectTitle ||
        `Plataforma Web + Chatbot IA para ${newClientForm.companyName}`,
    });

    setIsCreateClientOpen(false);
    setNewClientForm({
      companyName: '',
      contactName: '',
      email: '',
      passwordHash: '',
      phone: '',
      projectTitle: '',
      projectStatus: 'En diseño',
      progressPercentage: 25,
      startDate: 'Hoy',
      estimatedDeliveryDate: 'En 3 semanas',
      websiteStagingUrl: '',
      cmsType: 'Custom React + Tailwind',
      assignedTechLead: 'Daniel Morales (Lead Architect Xiantra)',
    });
  };

  const filteredLogs = chatbotLogs.filter((log) => {
    const q = logSearch.toLowerCase();
    return (
      log.clientCompanyTarget.toLowerCase().includes(q) ||
      log.userPrompt.toLowerCase().includes(q) ||
      log.botResponse.toLowerCase().includes(q) ||
      (log.visitorName && log.visitorName.toLowerCase().includes(q)) ||
      (log.visitorEmail && log.visitorEmail.toLowerCase().includes(q))
    );
  });

  const activeAdminTicket = tickets.find((t) => t.id === selectedAdminTicketId) || tickets[0] || null;

  const handleAdminTicketReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAdminTicket || !adminReplyText.trim()) return;

    replyToTicket(activeAdminTicket.id, adminReplyText, 'xiantra_soporte');
    setAdminReplyText('');
  };

  return (
    <div className="min-h-full flex flex-col bg-[#050811] text-slate-100">
      {/* ================= TOP ADMIN NAVIGATION BAR ================= */}
      <header className="px-4 sm:px-8 py-3.5 bg-slate-950/90 border-b border-cyan-500/30 sticky top-0 z-30 backdrop-blur-md flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-600 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-cyan-600/30 shrink-0">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-sm sm:text-base font-black text-white truncate">
                Xiantra Master Admin
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold shrink-0">
                PRODUCCIÓN
              </span>
            </div>
            <p className="text-xs text-slate-400 truncate">
              {adminName || 'Ing. David Restrepo · CTO Xiantra'}
            </p>
          </div>
        </div>

        {/* Live Visitor Meter & Logout */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-emerald-500/30">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs font-mono font-bold text-emerald-400">
              {trafficMetrics.liveActiveVisitors} en vivo
            </span>
          </div>

          <button
            onClick={logout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </div>
      </header>

      {/* ================= ADMIN TAB NAVIGATION ================= */}
      <div className="px-4 sm:px-8 border-b border-slate-800/80 bg-slate-950/60 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center gap-2 sm:gap-4 min-w-max">
          <button
            onClick={() => setActiveTab('traffic')}
            className={`py-3.5 px-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'traffic'
                ? 'border-cyan-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            <span>Tráfico en Tiempo Real</span>
          </button>

          <button
            onClick={() => setActiveTab('heatmap')}
            className={`py-3.5 px-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'heatmap'
                ? 'border-cyan-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Mapa de Calor & Clics</span>
          </button>

          <button
            onClick={() => setActiveTab('chatbot_logs')}
            className={`py-3.5 px-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'chatbot_logs'
                ? 'border-cyan-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>Registro Conversaciones IA ({chatbotLogs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('clients')}
            className={`py-3.5 px-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'clients'
                ? 'border-cyan-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="w-4 h-4 text-indigo-400" />
            <span>Gestión de Clientes ({clients.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('tickets')}
            className={`py-3.5 px-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'tickets'
                ? 'border-cyan-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4 text-purple-400" />
            <span>Soporte Global ({tickets.length})</span>
          </button>
        </div>
      </div>

      {/* ================= TAB BODY ================= */}
      <div className="flex-1 px-4 sm:px-8 py-6 max-w-7xl mx-auto w-full">
        {/* ================= TAB 1: REAL-TIME TRAFFIC & ANALYTICS ================= */}
        {activeTab === 'traffic' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base sm:text-xl font-bold text-white tracking-tight">
                Telemetría & Tráfico en Tiempo Real
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Monitorización directa de visitantes concurrentes, fuentes de conversión y tasa de rebote.
              </p>
            </div>

            {/* 4 Core KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-emerald-500/40 relative overflow-hidden">
                <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                  <span>Visitantes Concurrentes</span>
                  <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 mt-2">
                  {trafficMetrics.liveActiveVisitors}
                </div>
                <span className="text-[10px] text-emerald-500 font-mono mt-1 block">
                  ● Conectados en este instante
                </span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                  <span>Visitas Hoy</span>
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-white mt-2">
                  {trafficMetrics.todayTotalVisits.toLocaleString()}
                </div>
                <span className="text-[10px] text-cyan-400 font-mono mt-1 block">
                  +18.4% vs semana anterior
                </span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                  <span>Páginas Vistas</span>
                  <BarChart3 className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-white mt-2">
                  {trafficMetrics.todayPageViews.toLocaleString()}
                </div>
                <span className="text-[10px] text-slate-400 font-mono mt-1 block">
                  Promedio: 2.9 págs / sesión
                </span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
                <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                  <span>Tasa de Conversión</span>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-black font-mono text-amber-400 mt-2">
                  {trafficMetrics.conversionRate}
                </div>
                <span className="text-[10px] text-amber-500 font-mono mt-1 block">
                  Clicks a WhatsApp & Cotizador
                </span>
              </div>
            </div>

            {/* Split row: Top Pages & Traffic Sources */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Pages */}
              <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-cyan-400" />
                  <span>Páginas con Mayor Tráfico</span>
                </h3>
                <div className="space-y-3">
                  {trafficMetrics.topPages.map((page, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-mono text-slate-300 truncate max-w-[260px]">
                          {page.path}
                        </span>
                        <span className="font-mono text-emerald-400 font-bold">
                          {page.views} vistas ({page.percentage}%)
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-cyan-500 rounded-full"
                          style={{ width: `${page.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Traffic Sources & Devices */}
              <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>Fuentes de Adquisición & Dispositivos</span>
                </h3>

                <div className="space-y-3">
                  {trafficMetrics.trafficSources.map((source, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300">{source.source}</span>
                        <span className="font-mono text-cyan-400 font-semibold">
                          {source.visits} ({source.percentage}%)
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${source.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Móvil: 69.4%</span>
                  <span>Escritorio: 26.2%</span>
                  <span>Tablets: 4.4%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: HEATMAP & USER CLICKS ================= */}
        {activeTab === 'heatmap' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base sm:text-xl font-bold text-white tracking-tight">
                Mapa de Calor & Densidad de Clics
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Simulación visual interactiva de las zonas de mayor fricción, interés y clics de conversión.
              </p>
            </div>

            {/* Visual Heatmap Wireframe Simulator */}
            <div className="relative w-full h-[380px] sm:h-[420px] rounded-3xl bg-slate-950 border border-slate-800 overflow-hidden p-6 flex flex-col justify-between shadow-2xl">
              {/* Background website wireframe abstract grid */}
              <div className="absolute inset-0 bg-grid-tech opacity-30 pointer-events-none" />

              {/* Wireframe Mock Header */}
              <div className="relative z-10 flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                  <span className="text-[11px] font-mono text-slate-400 ml-2">
                    https://xiantradigital.com · Wireframe Interactivo
                  </span>
                </div>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-950/70 border border-amber-500/40 px-2 py-0.5 rounded">
                  MODO CALOR ACTIVO
                </span>
              </div>

              {/* Glowing Interactive Heatmap Pins positioned across the wireframe */}
              <div className="relative flex-1 my-4">
                {heatmapZones.map((zone) => {
                  const isVeryHigh = zone.intensityLevel === 'muy_alta';
                  return (
                    <div
                      key={zone.id}
                      style={{
                        left: `${zone.coordinates.xPercent}%`,
                        top: `${zone.coordinates.yPercent}%`,
                      }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20"
                    >
                      {/* Pulsing Heat Halo */}
                      <div
                        className={`absolute -inset-4 rounded-full blur-md opacity-80 group-hover:opacity-100 transition-opacity animate-pulse ${
                          isVeryHigh
                            ? 'bg-red-500/60'
                            : zone.intensityLevel === 'alta'
                            ? 'bg-amber-500/60'
                            : 'bg-emerald-500/40'
                        }`}
                      />

                      {/* Heat Pin */}
                      <div
                        className={`relative w-8 h-8 rounded-full border-2 flex items-center justify-center font-mono font-black text-[10px] shadow-lg transition-transform group-hover:scale-125 ${
                          isVeryHigh
                            ? 'bg-red-600 border-white text-white'
                            : zone.intensityLevel === 'alta'
                            ? 'bg-amber-500 border-white text-slate-950'
                            : 'bg-emerald-500 border-white text-slate-950'
                        }`}
                      >
                        <Flame className="w-4 h-4 fill-current" />
                      </div>

                      {/* Tooltip on Hover */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-left z-30">
                        <span className="text-[10px] font-bold block text-white truncate">
                          {zone.zoneName}
                        </span>
                        <div className="flex justify-between text-[9px] font-mono text-slate-400 mt-1">
                          <span>Clics: {zone.clickCount}</span>
                          <span className="text-emerald-400 font-bold">{zone.conversionRate}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Heatmap Legend */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs">
                <span className="text-slate-400 text-[11px]">
                  Pasa el cursor sobre los pines para ver métricas de clics por componente.
                </span>
                <div className="flex items-center gap-4 text-[10px] font-mono">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span>Muy Alto (&gt; 1,200 clics)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span>Alto (800 - 1,200 clics)</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span>Medio (&lt; 800 clics)</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Click Zones Breakdown Table */}
            <div className="rounded-3xl bg-slate-900/80 border border-slate-800 overflow-hidden">
              <div className="p-4 sm:p-5 border-b border-slate-800">
                <h3 className="text-sm font-bold text-white">
                  Desglose de Conversión por Zona de Interacción
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/80 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
                    <tr>
                      <th className="p-3.5 pl-5">Zona o Componente</th>
                      <th className="p-3.5">Sección</th>
                      <th className="p-3.5 text-right">Clics Totales</th>
                      <th className="p-3.5 text-right">Conversiones</th>
                      <th className="p-3.5 text-right">Tasa de Cierre</th>
                      <th className="p-3.5 text-center">Nivel de Calor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {heatmapZones.map((zone) => (
                      <tr key={zone.id} className="hover:bg-slate-800/50 transition-colors">
                        <td className="p-3.5 pl-5 font-bold text-white flex items-center gap-2">
                          <Flame className="w-3.5 h-3.5 text-amber-400" />
                          <span>{zone.zoneName}</span>
                        </td>
                        <td className="p-3.5 text-slate-400">{zone.pageSection}</td>
                        <td className="p-3.5 font-mono text-right font-bold text-white">
                          {zone.clickCount.toLocaleString()}
                        </td>
                        <td className="p-3.5 font-mono text-right text-emerald-400 font-bold">
                          {zone.conversionCount}
                        </td>
                        <td className="p-3.5 font-mono text-right font-bold text-cyan-400">
                          {zone.conversionRate}
                        </td>
                        <td className="p-3.5 text-center">
                          <span
                            className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                              zone.intensityLevel === 'muy_alta'
                                ? 'bg-red-950 text-red-300 border border-red-500/40'
                                : zone.intensityLevel === 'alta'
                                ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                                : 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                            }`}
                          >
                            {zone.intensityLevel.replace('_', ' ')}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: CHATBOT IA CONVERSATION LOGS ================= */}
        {activeTab === 'chatbot_logs' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base sm:text-xl font-bold text-white tracking-tight">
                  Registro Detallado de Conversaciones del Chatbot IA
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Auditoría completa de interacciones, prospectos calificados, preguntas del usuario y respuestas de la IA.
                </p>
              </div>

              {/* Search input */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={logSearch}
                  onChange={(e) => setLogSearch(e.target.value)}
                  placeholder="Buscar por cliente, correo o texto..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Logs Table */}
            <div className="rounded-3xl bg-slate-900/80 border border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/80 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
                    <tr>
                      <th className="p-3.5 pl-5">Fecha / Hora</th>
                      <th className="p-3.5">Empresa Cliente</th>
                      <th className="p-3.5">Prospecto</th>
                      <th className="p-3.5">Mensaje del Usuario</th>
                      <th className="p-3.5">Respuesta de la IA</th>
                      <th className="p-3.5 text-center">Score</th>
                      <th className="p-3.5 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {filteredLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-800/50 transition-colors">
                        <td className="p-3.5 pl-5 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                          {log.timestamp}
                        </td>
                        <td className="p-3.5 font-bold text-white whitespace-nowrap">
                          {log.clientCompanyTarget}
                        </td>
                        <td className="p-3.5 whitespace-nowrap">
                          <span className="font-semibold text-slate-200 block">
                            {log.visitorName || 'Anónimo'}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono block">
                            {log.visitorEmail || log.visitorPhone || 'Sin datos'}
                          </span>
                        </td>
                        <td className="p-3.5 max-w-xs truncate text-slate-300">
                          "{log.userPrompt}"
                        </td>
                        <td className="p-3.5 max-w-xs truncate text-emerald-400">
                          {log.botResponse}
                        </td>
                        <td className="p-3.5 text-center whitespace-nowrap">
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded-full font-bold bg-emerald-950 text-emerald-300 border border-emerald-500/40">
                            {log.qualificationScore}/100
                          </span>
                        </td>
                        <td className="p-3.5 text-right whitespace-nowrap">
                          <button
                            onClick={() => setSelectedLogDetail(log)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 hover:text-white transition-colors cursor-pointer"
                            title="Ver conversación completa"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Conversation Detail Modal */}
            {selectedLogDetail && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
                <div className="w-full max-w-2xl bg-slate-900 border border-cyan-500/40 rounded-3xl p-6 space-y-4 shadow-2xl text-slate-100">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                        Auditoría Conversacional IA
                      </span>
                      <h3 className="text-base font-bold text-white">
                        {selectedLogDetail.clientCompanyTarget} · {selectedLogDetail.timestamp}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedLogDetail(null)}
                      className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Visitor details badge */}
                  <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 block">Prospecto:</span>
                      <span className="font-bold text-white">{selectedLogDetail.visitorName || 'Anónimo'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 block">Correo / Teléfono:</span>
                      <span className="font-mono text-slate-300 text-[11px]">
                        {selectedLogDetail.visitorEmail || selectedLogDetail.visitorPhone || 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-500 block">Score Calificado:</span>
                      <span className="font-bold text-emerald-400">
                        {selectedLogDetail.qualificationScore}/100 ({selectedLogDetail.leadScore})
                      </span>
                    </div>
                  </div>

                  {/* Message Exchange */}
                  <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800 max-h-72 overflow-y-auto">
                    {/* User Prompt */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                        Mensaje del Visitante:
                      </span>
                      <div className="p-3 rounded-xl bg-slate-800 text-xs text-white leading-relaxed">
                        {selectedLogDetail.userPrompt}
                      </div>
                    </div>

                    {/* Bot Response */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">
                        Respuesta Generada por IA Xiantra (0.2s):
                      </span>
                      <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-slate-100 leading-relaxed">
                        {selectedLogDetail.botResponse}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-[11px] font-mono text-slate-400">
                      Intención Detectada: {selectedLogDetail.detectedIntent}
                    </span>
                    <button
                      onClick={() => setSelectedLogDetail(null)}
                      className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs"
                    >
                      Cerrar Vista
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 4: CLIENT MANAGEMENT (CRM & CREDENTIALS) ================= */}
        {activeTab === 'clients' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base sm:text-xl font-bold text-white tracking-tight">
                  Gestión de Clientes & Asignación de Estados
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Crea credenciales (correo y contraseña), asigna la fase del proyecto web y comparte accesos.
                </p>
              </div>

              <button
                onClick={() => setIsCreateClientOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-600/20 cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Crear Nuevo Cliente</span>
              </button>
            </div>

            {/* Clients Table */}
            <div className="rounded-3xl bg-slate-900/80 border border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/80 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
                    <tr>
                      <th className="p-3.5 pl-5">Empresa / Contacto</th>
                      <th className="p-3.5">Credenciales de Acceso</th>
                      <th className="p-3.5">Estado de la Página Web</th>
                      <th className="p-3.5">Avance</th>
                      <th className="p-3.5">Staging URL</th>
                      <th className="p-3.5 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {clients.map((cli) => (
                      <tr key={cli.id} className="hover:bg-slate-800/50 transition-colors">
                        <td className="p-3.5 pl-5">
                          <span className="font-bold text-white block text-xs sm:text-sm">
                            {cli.companyName}
                          </span>
                          <span className="text-[11px] text-slate-400">{cli.contactName}</span>
                        </td>

                        {/* Credentials column */}
                        <td className="p-3.5">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 font-mono text-[11px] text-slate-300">
                              <span>{cli.email}</span>
                              <button
                                onClick={() => handleCopy(cli.email, `${cli.id}-email`)}
                                className="text-slate-500 hover:text-white"
                                title="Copiar correo"
                              >
                                {copiedKey === `${cli.id}-email` ? (
                                  <Check className="w-3 h-3 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                            <div className="flex items-center gap-1 font-mono text-[10px] text-slate-400">
                              <span>Clave: <strong className="text-emerald-400">{cli.passwordHash}</strong></span>
                              <button
                                onClick={() => handleCopy(cli.passwordHash, `${cli.id}-pass`)}
                                className="text-slate-500 hover:text-white"
                                title="Copiar clave"
                              >
                                {copiedKey === `${cli.id}-pass` ? (
                                  <Check className="w-3 h-3 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </div>
                        </td>

                        {/* Status switcher */}
                        <td className="p-3.5">
                          <select
                            value={cli.projectStatus}
                            onChange={(e) =>
                              updateClientStatus(cli.id, e.target.value as ProjectStatus)
                            }
                            className="px-2.5 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-semibold text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                          >
                            <option value="En diseño">En diseño (25%)</option>
                            <option value="En desarrollo">En desarrollo (65%)</option>
                            <option value="Pruebas">Pruebas (90%)</option>
                            <option value="Entregada">Entregada (100%)</option>
                          </select>
                        </td>

                        {/* Progress */}
                        <td className="p-3.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-white text-xs">
                              {cli.progressPercentage}%
                            </span>
                            <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-emerald-500 rounded-full"
                                style={{ width: `${cli.progressPercentage}%` }}
                              />
                            </div>
                          </div>
                        </td>

                        <td className="p-3.5">
                          <a
                            href={cli.websiteStagingUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="font-mono text-[11px] text-cyan-400 hover:underline flex items-center gap-1 max-w-[180px] truncate"
                          >
                            <span className="truncate">{cli.websiteStagingUrl}</span>
                            <ExternalLink className="w-3 h-3 shrink-0" />
                          </a>
                        </td>

                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => deleteClient(cli.id)}
                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-950 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                            title="Eliminar cliente"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Create Client Modal */}
            {isCreateClientOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
                <div className="w-full max-w-xl bg-slate-900 border border-cyan-500/40 rounded-3xl p-6 space-y-4 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <Building className="w-5 h-5 text-cyan-400" />
                      <h3 className="text-base font-bold text-white">
                        Alta de Nuevo Cliente & Credenciales
                      </h3>
                    </div>
                    <button
                      onClick={() => setIsCreateClientOpen(false)}
                      className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleCreateClientSubmit} className="space-y-3.5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Nombre de la Empresa *
                        </label>
                        <input
                          type="text"
                          required
                          value={newClientForm.companyName}
                          onChange={(e) =>
                            setNewClientForm({ ...newClientForm, companyName: e.target.value })
                          }
                          placeholder="Ej. Aceros del Norte SAS"
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Persona de Contacto *
                        </label>
                        <input
                          type="text"
                          required
                          value={newClientForm.contactName}
                          onChange={(e) =>
                            setNewClientForm({ ...newClientForm, contactName: e.target.value })
                          }
                          placeholder="Ej. Ing. Fernando Gómez"
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Correo Electrónico (Usuario) *
                        </label>
                        <input
                          type="email"
                          required
                          value={newClientForm.email}
                          onChange={(e) =>
                            setNewClientForm({ ...newClientForm, email: e.target.value })
                          }
                          placeholder="gerencia@empresa.co"
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Contraseña Inicial Otorgada *
                        </label>
                        <input
                          type="text"
                          required
                          value={newClientForm.passwordHash}
                          onChange={(e) =>
                            setNewClientForm({ ...newClientForm, passwordHash: e.target.value })
                          }
                          placeholder="claveSegura2025"
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Estado Inicial del Proyecto
                        </label>
                        <select
                          value={newClientForm.projectStatus}
                          onChange={(e) =>
                            setNewClientForm({
                              ...newClientForm,
                              projectStatus: e.target.value as ProjectStatus,
                            })
                          }
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
                        >
                          <option value="En diseño">En diseño</option>
                          <option value="En desarrollo">En desarrollo</option>
                          <option value="Pruebas">Pruebas</option>
                          <option value="Entregada">Entregada</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">
                          Fecha Estimada de Entrega
                        </label>
                        <input
                          type="text"
                          value={newClientForm.estimatedDeliveryDate}
                          onChange={(e) =>
                            setNewClientForm({
                              ...newClientForm,
                              estimatedDeliveryDate: e.target.value,
                            })
                          }
                          placeholder="Ej. 15 Diciembre 2025"
                          className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        URL de Staging o Entorno de Pruebas
                      </label>
                      <input
                        type="url"
                        value={newClientForm.websiteStagingUrl}
                        onChange={(e) =>
                          setNewClientForm({
                            ...newClientForm,
                            websiteStagingUrl: e.target.value,
                          })
                        }
                        placeholder="https://staging.tuempresa.xiantradigital.com"
                        className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-mono"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                      <button
                        type="button"
                        onClick={() => setIsCreateClientOpen(false)}
                        className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-lg"
                      >
                        Crear y Activar Cliente
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 5: TICKETS & SUPPORT QUEUE ================= */}
        {activeTab === 'tickets' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base sm:text-xl font-bold text-white tracking-tight">
                Cola Central de Tickets de Soporte
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Responde solicitudes, cambios de diseño y consultas de pasarelas de todos los clientes.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-5 space-y-2.5">
                {tickets.map((tck) => {
                  const isSelected = activeAdminTicket?.id === tck.id;
                  return (
                    <button
                      key={tck.id}
                      onClick={() => setSelectedAdminTicketId(tck.id)}
                      className={`w-full p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-slate-900 border-cyan-500/70 shadow-md'
                          : 'bg-slate-950/60 border-slate-800 hover:bg-slate-900/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono text-cyan-400 font-bold">
                          {tck.clientCompany}
                        </span>
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                          {tck.status}
                        </span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white mt-1 line-clamp-1">
                        {tck.subject}
                      </h4>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 font-mono">
                        <span>{tck.category}</span>
                        <span>{tck.messages.length} mensajes</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="lg:col-span-7">
                {activeAdminTicket ? (
                  <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col h-[480px]">
                    <div className="pb-3 border-b border-slate-800">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase">
                        Ticket #{activeAdminTicket.id} · {activeAdminTicket.clientCompany}
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-white">
                        {activeAdminTicket.subject}
                      </h4>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-3 py-3.5 pr-1 no-scrollbar">
                      {activeAdminTicket.messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex flex-col ${
                            msg.sender === 'xiantra_soporte' ? 'items-end' : 'items-start'
                          }`}
                        >
                          <div className="flex items-center gap-1.5 mb-1 px-1">
                            <span className="text-[10px] font-bold text-slate-300">
                              {msg.senderName}
                            </span>
                            <span className="text-[9px] font-mono text-slate-500">
                              {msg.timestamp}
                            </span>
                          </div>
                          <div
                            className={`max-w-[88%] p-3 rounded-2xl text-xs leading-relaxed ${
                              msg.sender === 'xiantra_soporte'
                                ? 'bg-cyan-600 text-white rounded-tr-none'
                                : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none'
                            }`}
                          >
                            <p>{msg.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <form
                      onSubmit={handleAdminTicketReply}
                      className="pt-3 border-t border-slate-800 flex items-center gap-2"
                    >
                      <input
                        type="text"
                        value={adminReplyText}
                        onChange={(e) => setAdminReplyText(e.target.value)}
                        placeholder="Responder como Soporte Técnico Xiantra..."
                        className="flex-1 px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                      />
                      <button
                        type="submit"
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white transition-colors cursor-pointer shrink-0"
                        aria-label="Responder ticket"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="p-8 text-center bg-slate-900/50 rounded-3xl border border-slate-800 text-slate-400 text-xs h-[480px] flex items-center justify-center">
                    Selecciona un ticket de la lista para responder.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
