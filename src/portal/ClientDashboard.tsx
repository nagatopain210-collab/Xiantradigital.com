import React, { useState } from 'react';
import {
  Building2,
  ExternalLink,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Plus,
  Send,
  LogOut,
  Sparkles,
  Shield,
  Layers,
  Code,
  Globe,
  FileText,
  User,
  ArrowRight,
  ChevronRight,
  Server,
  Zap,
} from 'lucide-react';
import { usePortal } from './PortalContext';
import { ProjectStatus, SupportTicket } from './types';
import { COMPANY_INFO } from '../data/copyData';

export const ClientDashboard: React.FC = () => {
  const { currentClient, logout, tickets, createSupportTicket, replyToTicket } = usePortal();

  const [activeTab, setActiveTab] = useState<'project' | 'tickets' | 'resources'>('project');
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [ticketReplyText, setTicketReplyText] = useState('');
  const [isCreatingTicket, setIsCreatingTicket] = useState(false);

  // New ticket form state
  const [newTicketSubject, setNewTicketSubject] = useState('');
  const [newTicketCategory, setNewTicketCategory] = useState<SupportTicket['category']>('Modificaciones');
  const [newTicketPriority, setNewTicketPriority] = useState<SupportTicket['priority']>('Media');
  const [newTicketMessage, setNewTicketMessage] = useState('');

  if (!currentClient) {
    return (
      <div className="p-8 text-center text-slate-400">
        <p>No hay sesión de cliente activa.</p>
        <button onClick={logout} className="mt-4 px-4 py-2 rounded-xl bg-slate-800 text-white">
          Ir a Inicio de Sesión
        </button>
      </div>
    );
  }

  // Filter tickets for this client
  const clientTickets = tickets.filter((t) => t.clientId === currentClient.id);
  const activeTicket = clientTickets.find((t) => t.id === selectedTicketId) || clientTickets[0] || null;

  const handleCreateTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicketSubject.trim() || !newTicketMessage.trim()) return;

    createSupportTicket(newTicketSubject, newTicketCategory, newTicketPriority, newTicketMessage);
    setNewTicketSubject('');
    setNewTicketMessage('');
    setIsCreatingTicket(false);
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTicket || !ticketReplyText.trim()) return;

    replyToTicket(activeTicket.id, ticketReplyText, 'cliente');
    setTicketReplyText('');
  };

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case 'En diseño':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'En desarrollo':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'Pruebas':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
      case 'Entregada':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
    }
  };

  return (
    <div className="min-h-full flex flex-col bg-[#070A12] text-slate-100">
      {/* ================= TOP CLIENT NAVBAR ================= */}
      <header className="px-4 sm:px-8 py-4 bg-slate-950/80 border-b border-slate-800/80 sticky top-0 z-30 backdrop-blur-md flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-600/20 shrink-0">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-sm sm:text-lg font-black text-white truncate">
                {currentClient.companyName}
              </h1>
              <span
                className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${getStatusColor(
                  currentClient.projectStatus
                )}`}
              >
                ● {currentClient.projectStatus.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-slate-400 truncate">
              Contacto: {currentClient.contactName} · {currentClient.email}
            </p>
          </div>
        </div>

        {/* Top actions */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={currentClient.websiteProductionUrl || currentClient.websiteStagingUrl}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>Ver Sitio Web</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>

          <button
            onClick={logout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/40 hover:bg-red-900/50 border border-red-500/30 text-xs font-semibold text-red-300 transition-colors cursor-pointer"
            title="Cerrar sesión"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cerrar Sesión</span>
          </button>
        </div>
      </header>

      {/* ================= HERO KPI & PROGRESS BANNER ================= */}
      <div className="px-4 sm:px-8 py-6 bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950/40 border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                Proyecto Activo Xiantra Digital Solutions
              </span>
              <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight mt-0.5">
                {currentClient.projectTitle}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Líder Técnico Asignado:{' '}
                <span className="text-emerald-400 font-semibold">{currentClient.assignedTechLead}</span>
              </p>
            </div>

            <div className="flex items-center gap-4 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 shrink-0">
              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Entrega Estimada</span>
                <span className="text-xs sm:text-sm font-bold text-white">
                  {currentClient.estimatedDeliveryDate}
                </span>
              </div>
              <div className="w-px h-8 bg-slate-800" />
              <div className="text-right">
                <span className="text-[10px] font-mono text-emerald-400 uppercase block">Avance Global</span>
                <span className="text-base sm:text-xl font-black font-mono text-emerald-400">
                  {currentClient.progressPercentage}%
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Progress Bar */}
          <div className="space-y-1.5">
            <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-700 shadow-md shadow-emerald-500/20"
                style={{ width: `${currentClient.progressPercentage}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] font-mono text-slate-400">
              <span>Fase 1: Wireframes & Diseño</span>
              <span>Fase 2: Código & Chatbot</span>
              <span>Fase 3: Pruebas Transaccionales</span>
              <span>Fase 4: Despliegue Oficial</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= TAB NAVIGATION ================= */}
      <div className="px-4 sm:px-8 border-b border-slate-800 bg-slate-950/50">
        <div className="max-w-6xl mx-auto flex items-center gap-3">
          <button
            onClick={() => setActiveTab('project')}
            className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'project'
                ? 'border-emerald-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Cronograma & Hitos</span>
          </button>

          <button
            onClick={() => setActiveTab('tickets')}
            className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'tickets'
                ? 'border-emerald-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <span>Mesa de Soporte ({clientTickets.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('resources')}
            className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'resources'
                ? 'border-emerald-500 text-white'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Shield className="w-4 h-4 text-indigo-400" />
            <span>Accesos Útiles & Credenciales</span>
          </button>
        </div>
      </div>

      {/* ================= TAB CONTENT ================= */}
      <div className="flex-1 px-4 sm:px-8 py-6 max-w-6xl mx-auto w-full">
        {/* TAB 1: CRONOGRAMA & HITOS DE ENTREGA */}
        {activeTab === 'project' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Cronograma de Desarrollo & Entregables
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Cada fase completada es auditada bajo los estándares de alta conversión de Xiantra.
              </p>
            </div>

            <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-6 space-y-6 sm:space-y-8 pl-6 sm:pl-8">
              {currentClient.milestones.map((ms, idx) => (
                <div key={ms.id} className="relative group">
                  {/* Step Icon Badge */}
                  <div
                    className={`absolute -left-[35px] sm:-left-[43px] top-0 w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                      ms.status === 'completado'
                        ? 'bg-emerald-950 border-emerald-400 text-emerald-400'
                        : ms.status === 'en_progreso'
                        ? 'bg-cyan-950 border-cyan-400 text-cyan-400 animate-pulse'
                        : 'bg-slate-900 border-slate-700 text-slate-500'
                    }`}
                  >
                    {ms.status === 'completado' ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : ms.status === 'en_progreso' ? (
                      <Zap className="w-4 h-4" />
                    ) : (
                      <span className="text-xs font-mono font-bold">{idx + 1}</span>
                    )}
                  </div>

                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm sm:text-base font-bold text-white">{ms.title}</h4>
                          <span
                            className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                              ms.status === 'completado'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                                : ms.status === 'en_progreso'
                                ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/30'
                                : 'bg-slate-800 text-slate-400'
                            }`}
                          >
                            {ms.status.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1">{ms.description}</p>
                      </div>

                      <div className="text-left sm:text-right shrink-0">
                        <span className="text-[10px] font-mono text-slate-400 block">
                          Fecha Objetivo: {ms.targetDate}
                        </span>
                        {ms.completedDate && (
                          <span className="text-[10px] font-mono text-emerald-400 block font-semibold">
                            ✓ Entregado el {ms.completedDate}
                          </span>
                        )}
                      </div>
                    </div>

                    {ms.deliverable && (
                      <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-mono text-[11px]">Entregable Aprobado:</span>
                        <span className="font-semibold text-emerald-400 flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5" />
                          <span>{ms.deliverable}</span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Direct Web Preview Card */}
            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
              <div className="space-y-1 text-center md:text-left">
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wide">
                  Entorno Activo de Pre-visualización
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white">
                  {currentClient.websiteStagingUrl}
                </h4>
                <p className="text-xs text-slate-300">
                  Desplegado bajo arquitectura segura con HTTPS y motor de compresión WebP.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <a
                  href={currentClient.websiteStagingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer"
                >
                  <span>Abrir Staging en Vivo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
                    `Hola Daniel, soy ${currentClient.contactName} de ${currentClient.companyName}. Tengo una consulta sobre los hitos de entrega de nuestra página web.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                  <span>WhatsApp Técnico</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MESA DE SOPORTE & TICKETS TÉCNICOS */}
        {activeTab === 'tickets' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Tickets de Soporte Técnico & Modificaciones
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Comunícate directamente con nuestro equipo de ingeniería. Tiempo promedio de respuesta: &lt; 2 horas.
                </p>
              </div>

              <button
                onClick={() => setIsCreatingTicket(!isCreatingTicket)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow transition-all cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>{isCreatingTicket ? 'Cancelar' : 'Crear Nuevo Ticket'}</span>
              </button>
            </div>

            {/* Create Ticket Modal / Form */}
            {isCreatingTicket && (
              <form
                onSubmit={handleCreateTicketSubmit}
                className="p-5 rounded-2xl bg-slate-900 border border-emerald-500/40 space-y-4 animate-in fade-in"
              >
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Nuevo Requerimiento o Consulta de Soporte</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs text-slate-300 font-semibold mb-1">
                      Asunto del Requerimiento
                    </label>
                    <input
                      type="text"
                      required
                      value={newTicketSubject}
                      onChange={(e) => setNewTicketSubject(e.target.value)}
                      placeholder="Ej. Actualizar foto de producto en página de inicio"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 font-semibold mb-1">Categoría</label>
                    <select
                      value={newTicketCategory}
                      onChange={(e) => setNewTicketCategory(e.target.value as SupportTicket['category'])}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Diseño Web">Diseño Web</option>
                      <option value="Chatbot IA">Chatbot IA</option>
                      <option value="Pasarela de Pago">Pasarela de Pago</option>
                      <option value="Hosting / Dominio">Hosting / Dominio</option>
                      <option value="Modificaciones">Modificaciones</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-300 font-semibold mb-1">
                    Descripción Detallada
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newTicketMessage}
                    onChange={(e) => setNewTicketMessage(e.target.value)}
                    placeholder="Describe los cambios, dudas o archivos que deseas incorporar..."
                    className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCreatingTicket(false)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                  >
                    Descartar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow"
                  >
                    Enviar Ticket a Xiantra
                  </button>
                </div>
              </form>
            )}

            {/* Tickets Two-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Tickets List */}
              <div className="lg:col-span-5 space-y-2.5">
                {clientTickets.length === 0 ? (
                  <div className="p-8 text-center bg-slate-900/50 rounded-2xl border border-slate-800 text-slate-400 text-xs">
                    No tienes tickets abiertos. Haz clic en "Crear Nuevo Ticket" si requieres soporte.
                  </div>
                ) : (
                  clientTickets.map((tck) => {
                    const isSelected = activeTicket?.id === tck.id;
                    return (
                      <button
                        key={tck.id}
                        onClick={() => setSelectedTicketId(tck.id)}
                        className={`w-full p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-slate-900 border-emerald-500/70 shadow-md'
                            : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/50'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-mono text-emerald-400 font-bold">
                            #{tck.id.toUpperCase()}
                          </span>
                          <span
                            className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold ${
                              tck.status === 'Abierto'
                                ? 'bg-amber-950 text-amber-400 border border-amber-500/30'
                                : tck.status === 'En revisión'
                                ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/30'
                                : 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                            }`}
                          >
                            {tck.status}
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-white mt-1 line-clamp-1">
                          {tck.subject}
                        </h4>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 font-mono">
                          <span>{tck.category}</span>
                          <span>{tck.updatedAt}</span>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Right Column: Ticket Conversation Thread */}
              <div className="lg:col-span-7">
                {activeTicket ? (
                  <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col h-[460px]">
                    {/* Thread Header */}
                    <div className="pb-3 border-b border-slate-800 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 uppercase">
                          {activeTicket.category} · Prioridad {activeTicket.priority}
                        </span>
                        <h4 className="text-sm sm:text-base font-bold text-white">
                          {activeTicket.subject}
                        </h4>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400">
                        {activeTicket.status}
                      </span>
                    </div>

                    {/* Messages Body */}
                    <div className="flex-1 overflow-y-auto space-y-3 py-3.5 pr-1 no-scrollbar">
                      {activeTicket.messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex flex-col ${
                            msg.sender === 'cliente' ? 'items-end' : 'items-start'
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
                              msg.sender === 'cliente'
                                ? 'bg-emerald-600 text-white rounded-tr-none'
                                : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none'
                            }`}
                          >
                            <p>{msg.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Reply Input Form */}
                    <form onSubmit={handleReplySubmit} className="pt-3 border-t border-slate-800 flex items-center gap-2">
                      <input
                        type="text"
                        value={ticketReplyText}
                        onChange={(e) => setTicketReplyText(e.target.value)}
                        placeholder="Escribe tu respuesta a los ingenieros..."
                        className="flex-1 px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                      <button
                        type="submit"
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer shrink-0"
                        aria-label="Enviar respuesta"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="p-8 text-center bg-slate-900/50 rounded-3xl border border-slate-800 text-slate-400 text-xs h-[460px] flex items-center justify-center">
                    Selecciona un ticket para ver la conversación o crea uno nuevo.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ACCESOS ÚTILES & RECURSOS */}
        {activeTab === 'resources' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Enlaces Directos & Accesos del Ecosistema
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Accede a tus plataformas vinculadas, credenciales de staging y documentación técnica.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Dominio & Servidor</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    DNS configurado en {currentClient.dnsProvider || 'Cloudflare Enterprise'} con protección DDoS.
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-emerald-400">
                  Uptime 99.9% Garantizado
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <Code className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Arquitectura Tecnológica</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Motor: {currentClient.cmsType} optimizado para carga en &lt; 0.8s en dispositivos móviles.
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-cyan-400">
                  Código 100% Propietario
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Certificados de Seguridad</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Cifrado SSL SHA-256 de 2048 bits activo para transacciones bancarias.
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-indigo-400">
                  Cumplimiento PCI-DSS / Wompi
                </div>
              </div>
            </div>

            {/* List of links */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                Recursos Documentados
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentClient.usefulResources.map((res, rIdx) => (
                  <a
                    key={rIdx}
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-slate-400 group-hover:text-emerald-400">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                          {res.title}
                        </h5>
                        <p className="text-[11px] text-slate-400 line-clamp-1">{res.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
