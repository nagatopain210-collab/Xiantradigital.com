export type ProjectStatus = 'En diseño' | 'En desarrollo' | 'Pruebas' | 'Entregada';

export interface Milestone {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  completedDate?: string;
  status: 'completado' | 'en_progreso' | 'pendiente';
  deliverable?: string;
}

export interface SupportTicketMessage {
  id: string;
  sender: 'cliente' | 'xiantra_soporte';
  senderName: string;
  message: string;
  timestamp: string;
}

export interface SupportTicket {
  id: string;
  clientId: string;
  clientCompany: string;
  subject: string;
  category: 'Diseño Web' | 'Chatbot IA' | 'Pasarela de Pago' | 'Hosting / Dominio' | 'Modificaciones';
  priority: 'Baja' | 'Media' | 'Alta' | 'Crítica';
  status: 'Abierto' | 'En revisión' | 'Resuelto';
  createdAt: string;
  updatedAt: string;
  messages: SupportTicketMessage[];
}

export interface ClientProject {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  passwordHash: string; // Plaintext representation for simulator demo
  phone: string;
  projectTitle: string;
  projectStatus: ProjectStatus;
  progressPercentage: number;
  startDate: string;
  estimatedDeliveryDate: string;
  websiteStagingUrl: string;
  websiteProductionUrl?: string;
  dnsProvider?: string;
  cmsType: 'Custom React + Tailwind' | 'Next.js + Node' | 'Shopify Headless' | 'WordPress VIP';
  assignedTechLead: string;
  milestones: Milestone[];
  usefulResources: {
    title: string;
    description: string;
    url: string;
    iconType: 'link' | 'code' | 'shield' | 'book';
  }[];
}

export interface ChatbotConversationLog {
  id: string;
  timestamp: string;
  clientCompanyTarget: string; // E.g., "Maquitec Ingeniería SAS"
  visitorName?: string;
  visitorEmail?: string;
  visitorPhone?: string;
  userPrompt: string;
  botResponse: string;
  leadScore: 'Clase A (Alta Prioridad)' | 'Clase B (Calificado)' | 'Informativo' | 'Soporte';
  qualificationScore: number; // 0 - 100
  estimatedValueCOP: string;
  detectedIntent: string;
  transferredToWhatsApp: boolean;
}

export interface HeatmapClickZone {
  id: string;
  zoneName: string;
  pageSection: 'Hero Header' | 'Simulador IA' | 'Reels Testimoniales' | 'Trilogía de Valor' | 'Precios COP' | 'Botón WhatsApp Flotante';
  clickCount: number;
  conversionCount: number;
  conversionRate: string;
  intensityLevel: 'muy_alta' | 'alta' | 'media' | 'moderada';
  coordinates: { xPercent: number; yPercent: number };
}

export interface TrafficAnalytics {
  liveActiveVisitors: number;
  todayTotalVisits: number;
  todayPageViews: number;
  averageSessionDuration: string;
  bounceRate: string;
  conversionRate: string;
  topPages: { path: string; views: number; percentage: number }[];
  devices: { device: string; share: number }[];
  trafficSources: { source: string; visits: number; percentage: number }[];
}

export type AuthRole = 'client' | 'admin' | null;

export interface AuthSession {
  role: AuthRole;
  clientData?: ClientProject;
  adminName?: string;
}
