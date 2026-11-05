import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ClientProject,
  SupportTicket,
  ChatbotConversationLog,
  HeatmapClickZone,
  TrafficAnalytics,
  AuthRole,
  ProjectStatus,
} from './types';
import {
  INITIAL_CLIENTS,
  INITIAL_TICKETS,
  INITIAL_CHATBOT_LOGS,
  INITIAL_HEATMAP_ZONES,
  INITIAL_TRAFFIC_METRICS,
  DEFAULT_ADMIN_CREDENTIALS,
} from './portalData';

interface PortalContextType {
  // Auth state
  isPortalOpen: boolean;
  activePortalView: 'login' | 'client' | 'admin';
  currentRole: AuthRole;
  currentClient: ClientProject | null;
  adminName: string | null;

  // Data lists
  clients: ClientProject[];
  tickets: SupportTicket[];
  chatbotLogs: ChatbotConversationLog[];
  heatmapZones: HeatmapClickZone[];
  trafficMetrics: TrafficAnalytics;

  // Actions
  openPortal: (view?: 'login' | 'client' | 'admin', defaultRole?: 'client' | 'admin') => void;
  closePortal: () => void;
  login: (email: string, pass: string) => { success: boolean; role?: AuthRole; error?: string };
  logout: () => void;
  createClient: (newClientData: Omit<ClientProject, 'id' | 'milestones' | 'usefulResources'>) => void;
  updateClientStatus: (clientId: string, status: ProjectStatus, progress?: number) => void;
  deleteClient: (clientId: string) => void;
  createSupportTicket: (
    subject: string,
    category: SupportTicket['category'],
    priority: SupportTicket['priority'],
    initialMessage: string
  ) => void;
  replyToTicket: (ticketId: string, messageText: string, sender: 'cliente' | 'xiantra_soporte') => void;
  quickLoginAsClient: (clientId?: string) => void;
  quickLoginAsAdmin: () => void;
}

const PortalContext = createContext<PortalContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CLIENTS: 'xiantra_portal_clients_v1',
  TICKETS: 'xiantra_portal_tickets_v1',
  LOGS: 'xiantra_portal_chatbot_logs_v1',
  SESSION_ROLE: 'xiantra_portal_session_role_v1',
  SESSION_CLIENT_ID: 'xiantra_portal_session_client_id_v1',
};

export const PortalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [activePortalView, setActivePortalView] = useState<'login' | 'client' | 'admin'>('login');
  const [currentRole, setCurrentRole] = useState<AuthRole>(null);
  const [currentClientId, setCurrentClientId] = useState<string | null>(null);
  const [adminName, setAdminName] = useState<string | null>(null);

  // Clients persistence
  const [clients, setClients] = useState<ClientProject[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CLIENTS);
      return saved ? JSON.parse(saved) : INITIAL_CLIENTS;
    } catch {
      return INITIAL_CLIENTS;
    }
  });

  // Tickets persistence
  const [tickets, setTickets] = useState<SupportTicket[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TICKETS);
      return saved ? JSON.parse(saved) : INITIAL_TICKETS;
    } catch {
      return INITIAL_TICKETS;
    }
  });

  // Chatbot logs persistence
  const [chatbotLogs, setChatbotLogs] = useState<ChatbotConversationLog[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LOGS);
      return saved ? JSON.parse(saved) : INITIAL_CHATBOT_LOGS;
    } catch {
      return INITIAL_CHATBOT_LOGS;
    }
  });

  const [heatmapZones] = useState<HeatmapClickZone[]>(INITIAL_HEATMAP_ZONES);
  const [trafficMetrics, setTrafficMetrics] = useState<TrafficAnalytics>(INITIAL_TRAFFIC_METRICS);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(clients));
    } catch (e) {
      console.error('Failed to save clients', e);
    }
  }, [clients]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TICKETS, JSON.stringify(tickets));
    } catch (e) {
      console.error('Failed to save tickets', e);
    }
  }, [tickets]);

  // Live traffic simulation ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setTrafficMetrics((prev) => {
        const delta = Math.floor(Math.random() * 5) - 2;
        const newLive = Math.max(22, Math.min(54, prev.liveActiveVisitors + delta));
        return {
          ...prev,
          liveActiveVisitors: newLive,
          todayTotalVisits: prev.todayTotalVisits + (Math.random() > 0.6 ? 1 : 0),
          todayPageViews: prev.todayPageViews + (Math.random() > 0.4 ? 2 : 0),
        };
      });
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const currentClient = clients.find((c) => c.id === currentClientId) || null;

  const openPortal = (view: 'login' | 'client' | 'admin' = 'login') => {
    if (view === 'client' && currentRole === 'client' && currentClient) {
      setActivePortalView('client');
    } else if (view === 'admin' && currentRole === 'admin') {
      setActivePortalView('admin');
    } else {
      setActivePortalView('login');
    }
    setIsPortalOpen(true);
  };

  const closePortal = () => {
    setIsPortalOpen(false);
  };

  const login = (email: string, pass: string): { success: boolean; role?: AuthRole; error?: string } => {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPass = pass.trim();

    // Check Admin
    if (
      trimmedEmail === DEFAULT_ADMIN_CREDENTIALS.email.toLowerCase() &&
      trimmedPass === DEFAULT_ADMIN_CREDENTIALS.password
    ) {
      setCurrentRole('admin');
      setAdminName(DEFAULT_ADMIN_CREDENTIALS.name);
      setCurrentClientId(null);
      setActivePortalView('admin');
      return { success: true, role: 'admin' };
    }

    // Check Client
    const clientFound = clients.find(
      (c) => c.email.toLowerCase() === trimmedEmail && c.passwordHash === trimmedPass
    );

    if (clientFound) {
      setCurrentRole('client');
      setCurrentClientId(clientFound.id);
      setAdminName(null);
      setActivePortalView('client');
      return { success: true, role: 'client' };
    }

    return {
      success: false,
      error: 'Credenciales inválidas. Verifica tu correo electrónico y contraseña o usa los accesos de prueba.',
    };
  };

  const logout = () => {
    setCurrentRole(null);
    setCurrentClientId(null);
    setAdminName(null);
    setActivePortalView('login');
  };

  const quickLoginAsClient = (targetClientId?: string) => {
    const target = targetClientId
      ? clients.find((c) => c.id === targetClientId) || clients[0]
      : clients[0];

    if (target) {
      setCurrentRole('client');
      setCurrentClientId(target.id);
      setAdminName(null);
      setActivePortalView('client');
      setIsPortalOpen(true);
    }
  };

  const quickLoginAsAdmin = () => {
    setCurrentRole('admin');
    setAdminName(DEFAULT_ADMIN_CREDENTIALS.name);
    setCurrentClientId(null);
    setActivePortalView('admin');
    setIsPortalOpen(true);
  };

  const createClient = (
    newClientData: Omit<ClientProject, 'id' | 'milestones' | 'usefulResources'>
  ) => {
    const newId = `cli-${Date.now()}`;
    const defaultMilestones = [
      {
        id: `m-${Date.now()}-1`,
        title: 'Definición de Alcance & Identidad Visual',
        description: 'Estructuración de wireframes, arquitectura de contenido y paleta corporativa.',
        targetDate: 'Semana 1',
        status: 'completado' as const,
        completedDate: 'Hoy',
      },
      {
        id: `m-${Date.now()}-2`,
        title: 'Desarrollo de Plataforma Web & Chatbot IA',
        description: 'Construcción frontend en React, responsive design y entrenamiento de IA.',
        targetDate: 'Semana 2',
        status: (newClientData.projectStatus === 'En diseño'
          ? 'pendiente'
          : 'en_progreso') as 'en_progreso' | 'pendiente',
      },
      {
        id: `m-${Date.now()}-3`,
        title: 'Pruebas de Pasarela & Seguridad SSL',
        description: 'Verificación Wompi/PSE, optimización móvil y auditoría de conversión.',
        targetDate: 'Semana 3',
        status: (newClientData.projectStatus === 'Pruebas' || newClientData.projectStatus === 'Entregada'
          ? 'completado'
          : 'pendiente') as 'completado' | 'pendiente',
      },
      {
        id: `m-${Date.now()}-4`,
        title: 'Lanzamiento a Producción',
        description: 'Activación del dominio oficial y sincronización con WhatsApp comercial.',
        targetDate: newClientData.estimatedDeliveryDate || 'Semana 4',
        status: (newClientData.projectStatus === 'Entregada'
          ? 'completado'
          : 'pendiente') as 'completado' | 'pendiente',
      },
    ];

    const usefulResources = [
      {
        title: 'Entorno de Pruebas (Staging)',
        description: 'Pre-visualización activa de la plataforma web.',
        url: newClientData.websiteStagingUrl,
        iconType: 'link' as const,
      },
      {
        title: 'Manual de Uso del Chatbot',
        description: 'Documentación oficial para gestionar prospectos.',
        url: 'https://docs.xiantradigital.com/manual-cliente.pdf',
        iconType: 'book' as const,
      },
    ];

    const newProject: ClientProject = {
      ...newClientData,
      id: newId,
      milestones: defaultMilestones,
      usefulResources,
    };

    setClients((prev) => [newProject, ...prev]);
  };

  const updateClientStatus = (clientId: string, status: ProjectStatus, progress?: number) => {
    let autoProgress = progress;
    if (autoProgress === undefined) {
      if (status === 'En diseño') autoProgress = 25;
      else if (status === 'En desarrollo') autoProgress = 65;
      else if (status === 'Pruebas') autoProgress = 90;
      else if (status === 'Entregada') autoProgress = 100;
      else autoProgress = 50;
    }

    setClients((prev) =>
      prev.map((c) => {
        if (c.id === clientId) {
          const updatedMilestones = c.milestones.map((m, idx) => {
            if (status === 'Entregada') {
              return { ...m, status: 'completado' as const };
            }
            if (status === 'Pruebas') {
              if (idx < 2) return { ...m, status: 'completado' as const };
              if (idx === 2) return { ...m, status: 'en_progreso' as const };
            }
            if (status === 'En desarrollo') {
              if (idx === 0) return { ...m, status: 'completado' as const };
              if (idx === 1) return { ...m, status: 'en_progreso' as const };
            }
            return m;
          });

          return {
            ...c,
            projectStatus: status,
            progressPercentage: autoProgress || c.progressPercentage,
            milestones: updatedMilestones,
          };
        }
        return c;
      })
    );
  };

  const deleteClient = (clientId: string) => {
    setClients((prev) => prev.filter((c) => c.id !== clientId));
  };

  const createSupportTicket = (
    subject: string,
    category: SupportTicket['category'],
    priority: SupportTicket['priority'],
    initialMessage: string
  ) => {
    if (!currentClient) return;

    const newTicket: SupportTicket = {
      id: `tck-${Date.now()}`,
      clientId: currentClient.id,
      clientCompany: currentClient.companyName,
      subject,
      category,
      priority,
      status: 'Abierto',
      createdAt: 'Hoy · Hace un momento',
      updatedAt: 'Hoy · Hace un momento',
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: 'cliente',
          senderName: currentClient.contactName,
          message: initialMessage,
          timestamp: 'Hoy · Hace un momento',
        },
      ],
    };

    setTickets((prev) => [newTicket, ...prev]);
  };

  const replyToTicket = (ticketId: string, messageText: string, sender: 'cliente' | 'xiantra_soporte') => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id === ticketId) {
          const senderName =
            sender === 'cliente'
              ? currentClient?.contactName || 'Cliente'
              : adminName || 'Soporte Técnico Xiantra';

          const newMsg = {
            id: `msg-${Date.now()}`,
            sender,
            senderName,
            message: messageText,
            timestamp: 'Hoy · Hace un momento',
          };

          return {
            ...t,
            updatedAt: 'Hoy · Hace un momento',
            status: sender === 'xiantra_soporte' ? 'En revisión' : t.status,
            messages: [...t.messages, newMsg],
          };
        }
        return t;
      })
    );
  };

  return (
    <PortalContext.Provider
      value={{
        isPortalOpen,
        activePortalView,
        currentRole,
        currentClient,
        adminName,
        clients,
        tickets,
        chatbotLogs,
        heatmapZones,
        trafficMetrics,
        openPortal,
        closePortal,
        login,
        logout,
        createClient,
        updateClientStatus,
        deleteClient,
        createSupportTicket,
        replyToTicket,
        quickLoginAsClient,
        quickLoginAsAdmin,
      }}
    >
      {children}
    </PortalContext.Provider>
  );
};

export const usePortal = () => {
  const context = useContext(PortalContext);
  if (!context) {
    throw new Error('usePortal must be used within a PortalProvider');
  }
  return context;
};
