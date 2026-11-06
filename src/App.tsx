import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  Check,
  ArrowRight,
  ChevronDown,
  ShieldCheck,
  Clock,
  Zap,
  MessageSquare,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Send,
  Star,
  Calendar,
  RefreshCw,
} from 'lucide-react';
import { MetallicLogo } from './components/MetallicLogo';
import { BackgroundEffects } from './components/BackgroundEffects';
import { trackConversionEvent } from './utils/analytics';

const WHATSAPP_NUMBER = '573508569464';
const WHATSAPP_PREFILLED_TEXT = 'Hola, quiero mi diagnóstico gratis para mi negocio';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_PREFILLED_TEXT)}`;

interface DemoChatStep {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
  quoteBadge?: {
    plan: string;
    price: string;
    delivery: string;
  };
}

const DEMO_SCENARIOS: Record<
  'cotizar' | 'catalogo' | 'citas',
  { label: string; messages: DemoChatStep[] }
> = {
  cotizar: {
    label: 'Cotizar web + bot IA',
    messages: [
      {
        id: 'c1',
        sender: 'user',
        text: 'Hola, vi su página. Pierdo muchos clientes porque escribimos tarde por WhatsApp. ¿Cómo funciona su sistema?',
        time: '10:42 PM',
      },
      {
        id: 'c2',
        sender: 'bot',
        text: '¡Hola! Soy Xian, el asistente con IA de Xiantra. Qué bueno saludarte. Para recomendarte el sistema exacto: ¿qué tipo de negocio tienes y cuántos mensajes recibes al día?',
        time: '10:42 PM · en 2 s',
      },
      {
        id: 'c3',
        sender: 'user',
        text: 'Tenemos una distribuidora y clínica estética, nos llegan unos 25 mensajes diarios.',
        time: '10:43 PM',
      },
      {
        id: 'c4',
        sender: 'bot',
        text: 'Perfecto. Con ese volumen, el Sistema Crecimiento 24/7 atiende a cada cliente en 2 segundos, envía catálogo, filtra curiosos y agenda citas directo en tu calendario:',
        time: '10:43 PM · en 2 s',
        quoteBadge: {
          plan: 'Sistema Crecimiento 24/7 (Web + Bot IA)',
          price: '$249 USD (Equivale a $974.999 COP)',
          delivery: 'Construcción y entrega en 30 días · Mantenimiento mensual incluido',
        },
      },
    ],
  },
  catalogo: {
    label: 'Atención nocturna 24/7',
    messages: [
      {
        id: 'n1',
        sender: 'user',
        text: 'Buenas noches, ¿tienen disponibilidad de este equipo y cuánto cuesta el envío a Medellín?',
        time: '11:18 PM',
      },
      {
        id: 'n2',
        sender: 'bot',
        text: '¡Hola! Sí, tenemos 4 unidades en stock inmediato. El envío asegurado a Medellín tarda 24 horas hábiles. ¿Deseas que te genere el enlace de pago o prefieres cotización formal a nombre de tu empresa?',
        time: '11:18 PM · en 2 s',
      },
      {
        id: 'n3',
        sender: 'user',
        text: 'Cotización formal para empresa, por favor.',
        time: '11:19 PM',
      },
      {
        id: 'n4',
        sender: 'bot',
        text: '¡Listo! Aquí tienes tu cotización en PDF y dejé notificado a nuestro asesor principal para despachar tu pedido a primera hora:',
        time: '11:19 PM · en 2 s',
        quoteBadge: {
          plan: 'Lead Calificado y Cotizado en Automático',
          price: 'Venta rescatada fuera de horario',
          delivery: 'Tiempo de respuesta: 1.8 segundos',
        },
      },
    ],
  },
  citas: {
    label: 'Agendar diagnóstico',
    messages: [
      {
        id: 'a1',
        sender: 'user',
        text: 'Quiero saber si esto sirve para mi negocio de servicios antes de invertir.',
        time: '08:15 AM',
      },
      {
        id: 'a2',
        sender: 'bot',
        text: 'Totalmente. Hacemos una sesión de diagnóstico gratuita de 15 minutos donde revisamos tu caso y te mostramos cuánto puedes facturar con automatización. ¿Te queda mejor hoy a las 3:00 PM o mañana a las 10:00 AM?',
        time: '08:15 AM · en 2 s',
      },
      {
        id: 'a3',
        sender: 'user',
        text: 'Hoy a las 3:00 PM me queda perfecto.',
        time: '08:16 AM',
      },
      {
        id: 'a4',
        sender: 'bot',
        text: '¡Confirmado! Agendé tu diagnóstico gratuito hoy a las 3:00 PM y te envié el recordatorio por aquí mismo.',
        time: '08:16 AM · en 2 s',
        quoteBadge: {
          plan: 'Cita Comercial Agendada sin Intervención Humana',
          price: '0 horas de trabajo manual',
          delivery: 'Sincronizado con tu WhatsApp',
        },
      },
    ],
  },
};

const CLIENT_LOGOS = [
  { name: 'Maquitec SAS', metric: '+240% cotizaciones', sector: 'Maquinaria B2B' },
  { name: 'DistriAlimentos', metric: '-61% abandono', sector: 'Mayorista' },
  { name: 'Clínica NovaDent', metric: '3.4x más citas', sector: 'Salud & Estética' },
  { name: 'Andina Constructora', metric: 'Respuesta en 2 s', sector: 'Inmobiliaria' },
  { name: 'TecniGlobal Latam', metric: '+$45M pipeline/mes', sector: 'Importadora' },
];

const PAIN_SOLUTIONS = [
  {
    painTitle: 'Pierdo clientes por no responder rápido',
    painDesc:
      'Un cliente escribe a las 8:00 PM pidiendo precio. Si le respondes al día siguiente, ya le compró a otro.',
    solutionTitle: 'Respuesta y cotización en 2 segundos (24/7)',
    solutionDesc:
      'Nuestro bot con IA en tu WhatsApp saluda al instante, responde dudas reales de tu negocio y entrega precios mientras descansas.',
    metric: 'Atención en 2 s',
  },
  {
    painTitle: 'Mi página web actual no vende nada',
    painDesc:
      'Páginas lentas, confusas o llenas de texto técnico que tardan 5 segundos en cargar y hacen que el visitante se vaya sin escribir.',
    solutionTitle: 'Web inteligente diseñada para convertir',
    solutionDesc:
      'Construimos páginas que cargan en menos de 0.8 segundos y guían al visitante paso a paso hasta dejarte sus datos o comprarte.',
    metric: 'Carga < 0.8s',
  },
  {
    painTitle: 'Demasiado trabajo manual repetitivo',
    painDesc:
      'Tu equipo pierde horas todos los días respondiendo las mismas preguntas a curiosos que nunca compran.',
    solutionTitle: 'Filtro automático de clientes listos para pagar',
    solutionDesc:
      'El sistema califica el presupuesto y la urgencia de cada contacto y te entrega en bandeja solo a los clientes listos para cerrar.',
    metric: 'Ahorra +15h/sem',
  },
];

const CASE_STUDIES_CRO = [
  {
    company: 'Maquitec Ingeniería SAS',
    industry: 'Maquinaria Industrial · Colombia',
    highlight: '+240% en cotizaciones mensuales',
    before: 'Web lenta (4.8s), recibían solo 3 cotizaciones por semana y tardaban 4 horas en contestar WhatsApp.',
    after: 'Web en 0.6s + Bot IA en WhatsApp que envía fichas técnicas y cotiza en 2 segundos las 24 horas.',
    quote:
      'Pasamos de tener una página que era un gasto a recibir solicitudes de empresas todos los días directamente en nuestro WhatsApp.',
    author: 'Ing. Carlos Restrepo',
    role: 'Director Comercial',
  },
  {
    company: 'DistriAlimentos Latam',
    industry: 'Distribución & Catálogo · Colombia / México',
    highlight: '+185% en pedidos cerrados',
    before: 'El 72% de los clientes dejaba el pedido a medias porque nadie respondía sus dudas en la noche.',
    after: 'Catálogo rápido conectado a WhatsApp con seguimiento automático a los 10 minutos para cerrar el pedido.',
    quote:
      'Recuperamos millones en ventas que antes se perdían por no contestar a tiempo los fines de semana.',
    author: 'Mariana Duarte',
    role: 'Gerente de Ventas',
  },
  {
    company: 'Clínica Especializada Nova',
    industry: 'Salud & Servicios · Latinoamérica',
    highlight: '3.4x más citas agendadas',
    before: 'Recepción saturada respondiendo precios y horarios; decenas de mensajes sin leer cada mañana.',
    after: 'Asistente IA que resuelve dudas, filtra tratamientos y agenda citas confirmadas sin contratar más personal.',
    quote:
      'Hoy amanecemos con la agenda llena de pacientes calificados que reservaron solos durante la noche.',
    author: 'Dr. Alejandro Vega',
    role: 'Director General',
  },
];

const PACKAGES = [
  {
    name: 'Sistema Captación Rápida',
    subtitle: 'Para negocios y profesionales que necesitan empezar a captar clientes con su presencia digital optimizada.',
    priceUSD: '$135 USD',
    oldPriceUSD: '$209 USD',
    priceCOP: '$519.999 COP',
    oldPriceCOP: '$799.999 COP',
    popular: false,
    deliveryTime: 'Construcción en 30 días',
    features: [
      'Landing page de alta conversión (carga en <0.8s)',
      'Copywriting persuasivo enfocado en ventas',
      'Conexión directa a tu WhatsApp con mensaje inteligente',
      'Formulario corto de captura de prospectos',
      'Plan de mantenimiento mensual incluido (actualizaciones, hosting y soporte)',
      'Tiempo de construcción y entrega: 30 días',
      'Panel de control simple para ver tus contactos',
    ],
  },
  {
    name: 'Sistema Crecimiento 24/7',
    subtitle: 'El sistema completo para que tu negocio atienda, califique y venda solo día y noche.',
    priceUSD: '$249 USD',
    oldPriceUSD: '$385 USD',
    priceCOP: '$974.999 COP',
    oldPriceCOP: '$1.499.999 COP',
    popular: true,
    badge: 'MÁS ELEGIDO · 35% OFF',
    deliveryTime: 'Construcción en 30 días',
    features: [
      'Página web inteligente multi-sección (<0.8s)',
      'Chatbot con IA en tu WhatsApp entrenado con tu negocio',
      'Calificación y cotización automática de clientes en 2 s',
      'Centro de mando 24/7 para control de clientes y ventas',
      'Plan de mantenimiento mensual incluido (monitoreo, ajustes y soporte técnico)',
      'Construcción y configuración llave en mano en 30 días',
      'Garantía total por escrito de 90 días',
    ],
  },
  {
    name: 'Sistema Catálogo & Escala',
    subtitle: 'Para empresas con múltiples productos o servicios que buscan automatizar pedidos y cobros.',
    priceUSD: '$465 USD',
    oldPriceUSD: '$715 USD',
    priceCOP: '$1.819.999 COP',
    oldPriceCOP: '$2.799.999 COP',
    popular: false,
    deliveryTime: 'Construcción en 30 días',
    features: [
      'Todo lo incluido en el Sistema Crecimiento 24/7',
      'Catálogo interactivo o carrito de compras sin comisiones',
      'Integración de pagos locales (PSE, Wompi, tarjetas)',
      'Recuperación automática de clientes indecisos por WhatsApp',
      'Plan de mantenimiento mensual premium incluido (soporte prioritario continuo)',
      'Construcción completa y entrega llave en mano en 30 días',
    ],
  },
];

const MAINTENANCE_PLANS = [
  {
    name: 'Plan Basic',
    subtitle: 'Mantenimiento preventivo esencial para mantener tu web rápida, protegida y siempre al aire.',
    priceUSD: '$21 USD',
    unitUSD: '/ mes',
    priceCOP: '$79.999 COP',
    unitCOP: '/ mes',
    changesCount: 'Soporte y mantenimiento preventivo continuo',
    changesBadge: 'Mantenimiento preventivo',
    contractTerm: 'Pago mensual por un año de servicio',
    popular: false,
    features: [
      'Hosting cloud de alta velocidad y certificados de seguridad SSL',
      'Monitoreo activo 24/7 de estabilidad y tiempos de carga',
      'Copias de seguridad semanales de respaldo automático',
      'Actualizaciones preventivas de software y parches de seguridad',
      'Soporte técnico directo vía WhatsApp para dudas operativas',
      'Monitoreo de estado de conexión del bot de WhatsApp',
      'Pago mensual por un año de servicio',
    ],
  },
  {
    name: 'Plan Plus',
    subtitle: 'El plan ideal para negocios activos que renuevan promociones, cambian precios y ajustan su oferta.',
    priceUSD: '$36 USD',
    unitUSD: '/ mes',
    priceCOP: '$140.000 COP',
    unitCOP: '/ mes',
    changesCount: '5 cambios mensuales incluidos',
    changesBadge: '5 CAMBIOS / MES',
    contractTerm: 'Pago mensual por un año de servicio',
    popular: true,
    badge: 'MÁS ELEGIDO · 5 CAMBIOS/MES',
    features: [
      'Todo lo incluido en el Plan Basic',
      '5 cambios o actualizaciones al mes (textos, banners, precios, promos)',
      'Ajustes periódicos y calibración de la IA en tu bot de WhatsApp',
      'Soporte técnico prioritario con respuesta en menos de 2 horas',
      'Copias de seguridad periódicas y restauración inmediata ante fallos',
      'Optimización periódica de tiempos de respuesta en móviles',
      'Pago mensual por un año de servicio',
    ],
  },
  {
    name: 'Plan Expert',
    subtitle: 'Para empresas dinámicas en expansión continua que requieren soporte preferencial VIP y cambios ágiles.',
    priceUSD: '$65 USD',
    unitUSD: '/ mes',
    priceCOP: '$250.000 COP',
    unitCOP: '/ mes',
    changesCount: '20 cambios mensuales incluidos',
    changesBadge: '20 CAMBIOS / MES',
    contractTerm: 'Pago mensual por un año de servicio',
    popular: false,
    badge: 'MÁXIMA CAPACIDAD · 20 CAMBIOS/MES',
    features: [
      'Todo lo incluido en el Plan Plus',
      '20 cambios o actualizaciones al mes (productos, secciones, copys, flujos)',
      'Soporte técnico VIP dedicado con atención preferencial directa',
      'Optimización mensual continua de velocidad de carga y conversión (CRO)',
      'Entrenamiento avanzado y ajuste de nuevos flujos comerciales en el bot',
      'Reporte mensual de rendimiento, visitantes y estado del sistema',
      'Pago mensual por un año de servicio',
    ],
  },
];

const FAQS = [
  {
    q: '¿Cuánto cuesta y en cuánto tiempo recupero la inversión?',
    a: 'Nuestros sistemas completos comienzan desde $135 USD (aprox. $519.999 COP) con el descuento de Black Friday y ya incluyen el plan de mantenimiento mensual. La mayoría de nuestros clientes recupera el 100% de su inversión en las primeras semanas con solo 2 o 3 ventas adicionales que antes perdían por no responder a tiempo.',
  },
  {
    q: '¿Cuánto tardan en construir y entregar mi página y el bot funcionando?',
    a: 'El tiempo de construcción y entrega integral de tu sistema llave en mano es de 30 días. Durante este plazo nos encargamos de todo: diseño de la página de alta conversión, copywriting persuasivo, entrenamiento y conexión del bot de WhatsApp e integración de formularios y pruebas operativas completas.',
  },
  {
    q: '¿Qué planes de mantenimiento mensual ofrecen y qué incluyen?',
    a: 'Ofrecemos 3 planes de mantenimiento mensual transparentes (pago mensual por un año de servicio): Plan Basic por $79.999 COP / mes ($21 USD) con soporte preventivo, hosting y monitoreo 24/7; Plan Plus por $140.000 COP / mes ($36 USD) con 5 cambios mensuales incluidos y calibración de la IA; y Plan Expert por $250.000 COP / mes ($65 USD) con 20 cambios mensuales incluidos, soporte VIP directo y optimización continua CRO.',
  },
  {
    q: '¿Necesito saber de tecnología o programación para usarlo?',
    a: 'Cero. Te entregamos todo configurado y funcionando en tu propio WhatsApp y un panel en español sumamente sencillo. Si sabes usar WhatsApp en tu celular, sabes usar tu nuevo sistema comercial.',
  },
  {
    q: '¿Qué pasa si necesito soporte o ajustes después de la entrega?',
    a: 'Cuentas con 90 días de garantía total por contrato además del plan de mantenimiento mensual continuo. Si necesitas ajustar un precio, agregar una promoción o afinar una respuesta del bot, nuestro equipo te acompaña paso a paso según los cambios de tu plan.',
  },
  {
    q: '¿El código y mi número de WhatsApp siguen siendo míos?',
    a: 'El 100% de la página web, el dominio y tu línea de WhatsApp son propiedad exclusiva de tu negocio desde el primer día. No te atamos a contratos forzosos ni retenemos tus accesos.',
  },
];

export default function App() {
  const [promoVisible, setPromoVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeScenario, setActiveScenario] = useState<'cotizar' | 'catalogo' | 'citas'>('cotizar');
  const [visibleMessagesCount, setVisibleMessagesCount] = useState<number>(4);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [showStickyMobileBar, setShowStickyMobileBar] = useState(false);
  const [pricingTab, setPricingTab] = useState<'sistemas' | 'mantenimiento'>('sistemas');

  // Countdown for Promo Bar ("termina en 18d 14h")
  const [countdown, setCountdown] = useState({ days: 18, hours: 14, mins: 22 });

  // Short 3-field form state
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    businessType: 'Servicios / Consultoría',
  });
  const [formError, setFormError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const formSectionRef = useRef<HTMLElement>(null);

  // Subtle countdown update every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.mins > 0) return { ...prev, mins: prev.mins - 1 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59 };
        return prev;
      });
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Animate WhatsApp Demo messages when switching scenario
  useEffect(() => {
    setVisibleMessagesCount(1);
    const t1 = setTimeout(() => setVisibleMessagesCount(2), 350);
    const t2 = setTimeout(() => setVisibleMessagesCount(3), 800);
    const t3 = setTimeout(() => setVisibleMessagesCount(4), 1250);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [activeScenario]);

  // Show mobile sticky CTA bar only after scrolling past Hero and hide when final form is visible
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroBottom = heroRef.current ? heroRef.current.offsetTop + heroRef.current.offsetHeight - 100 : 520;
      const formTop = formSectionRef.current
        ? formSectionRef.current.getBoundingClientRect().top
        : 9999;
      const isFormInView = formTop < window.innerHeight - 80;

      setShowStickyMobileBar(scrollY > heroBottom && !isFormInView);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePrimaryCtaClick = (sourceLabel: string, preferredPlan?: string) => {
    trackConversionEvent('quote_request', sourceLabel, 'cro_funnel');
    if (preferredPlan) {
      setFormData((prev) => ({ ...prev, businessType: preferredPlan }));
    }
    setMobileMenuOpen(false);
    formSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      nameInputRef.current?.focus({ preventScroll: true });
    }, 650);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = formData.name.trim();
    const cleanDigits = formData.whatsapp.replace(/\D/g, '');

    if (cleanName.length < 2) {
      setFormError('Por favor ingresa tu nombre para agendar tu diagnóstico.');
      return;
    }
    if (cleanDigits.length < 7) {
      setFormError('Ingresa un número de WhatsApp válido (mínimo 7 dígitos).');
      return;
    }

    setFormError('');
    setFormSubmitted(true);
    trackConversionEvent(
      'form_submit',
      `Diagnóstico: ${formData.businessType}`,
      'final_3field_form'
    );
  };

  const buildPersonalizedWhatsAppUrl = () => {
    const msg = formData.name.trim()
      ? `Hola, quiero mi diagnóstico gratis para mi negocio. Soy ${formData.name.trim()} (${formData.businessType}) y mi WhatsApp es ${formData.whatsapp.trim()}.`
      : WHATSAPP_PREFILLED_TEXT;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div
      className="relative min-h-screen bg-[#050911] text-slate-100 antialiased selection:bg-emerald-400/30 selection:text-emerald-200 flex flex-col overflow-x-hidden"
      style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}
    >
      {/* Fondo Animado de Galaxia, Constelación & Nebulosas (GPU Composited) */}
      <BackgroundEffects />

      {/* ===================================================================== */}
      {/* 1. BARRA PROMO FINA (MÁX. 36PX DE ALTO, SIN TEXTO CORTADO, SIN BOTÓN RECLAMAR) */}
      {/* ===================================================================== */}
      {promoVisible && (
        <div
          role="region"
          aria-label="Promoción activa"
          className="relative h-9 max-h-[36px] w-full bg-[#0B1322]/90 border-b border-emerald-500/20 px-2.5 sm:px-6 flex items-center justify-between gap-1.5 sm:gap-2 text-[10px] xs:text-[11px] sm:text-xs text-slate-200 shrink-0 z-50 touch-manipulation"
        >
          <div className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap overflow-hidden">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
            <span className="font-semibold text-white">Black Friday:</span>
            <span className="font-bold text-emerald-400">35% OFF</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-300">
              termina en {countdown.days}d {countdown.hours}h
            </span>
          </div>
          <button
            type="button"
            onClick={() => setPromoVisible(false)}
            data-track="promo-bar-close"
            aria-label="Cerrar aviso de promoción"
            className="w-7 h-7 sm:w-6 sm:h-6 rounded-md text-slate-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer shrink-0 active:scale-90"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 2. HEADER MINIMALISTA (.Navbar): LOGO + 1 CTA COMPACTO + MENÚ HAMBURGUESA */}
      {/* ===================================================================== */}
      <header className="Navbar sticky top-0 z-40 w-full h-14 md:h-16 bg-[#070B12]/80 backdrop-blur-md border-b border-white/[0.07] transition-all">
        <div className="max-w-6xl mx-auto h-full px-3.5 sm:px-6 flex items-center justify-between gap-2 sm:gap-3">
          {/* Brand Logo */}
          <a
            href="#inicio"
            data-track="nav-logo"
            className="inline-flex items-center min-h-[44px] focus:outline-none shrink-0"
            aria-label="Xiantra - Ir al inicio"
          >
            <MetallicLogo size="sm" variant="cyan-electric" showSubtitle={false} />
          </a>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Navegación principal"
            className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300"
          >
            <a href="#como-funciona" data-track="nav-problema-solucion" className="hover:text-emerald-400 transition-colors">
              Cómo funciona
            </a>
            <a href="#demo-whatsapp" data-track="nav-demo" className="hover:text-emerald-400 transition-colors">
              Demo en vivo
            </a>
            <a href="#casos" data-track="nav-casos" className="hover:text-emerald-400 transition-colors">
              Resultados
            </a>
            <a href="#paquetes" data-track="nav-paquetes" className="hover:text-emerald-400 transition-colors">
              Paquetes & Mantenimiento
            </a>
            <a href="#faq" data-track="nav-faq" className="hover:text-emerald-400 transition-colors">
              Preguntas
            </a>
          </nav>

          {/* Right Controls: Single Compact CTA + Hamburger Button */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handlePrimaryCtaClick('Header CTA Compacto')}
              data-track="cta-header-primary"
              className="inline-flex items-center justify-center min-h-[38px] md:min-h-[40px] px-2.5 sm:px-3.5 py-1.5 md:py-2 rounded-lg sm:rounded-xl bg-[#34D399] hover:bg-[#10B981] text-[#050911] text-[11px] sm:text-xs font-extrabold tracking-tight shadow-[0_0_18px_rgba(52,211,153,0.28)] active:scale-95 transition-all cursor-pointer whitespace-nowrap touch-manipulation"
            >
              Agenda tu diagnóstico
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-track="nav-menu-toggle"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 min-h-[44px] min-w-[44px] rounded-lg sm:rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-100 active:scale-95 transition-all cursor-pointer shrink-0 touch-manipulation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Clean Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <nav
            aria-label="Menú móvil"
            className="lg:hidden bg-[#0B111E]/95 backdrop-blur-md border-b border-white/10 px-4 pt-3 pb-5 space-y-1 shadow-2xl"
          >
            {[
              { label: 'Problema → Solución', href: '#como-funciona' },
              { label: 'Demo de WhatsApp en vivo', href: '#demo-whatsapp' },
              { label: 'Casos y resultados (Antes / Después)', href: '#casos' },
              { label: 'Paquetes y planes de mantenimiento', href: '#paquetes' },
              { label: 'Preguntas frecuentes (FAQ)', href: '#faq' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                data-track={`mobile-nav-${item.href.replace('#', '')}`}
                className="flex items-center justify-between min-h-[48px] px-3.5 py-3 rounded-xl text-sm font-medium text-slate-200 hover:bg-white/5 hover:text-emerald-400 active:bg-white/10 transition-colors touch-manipulation"
              >
                <span>{item.label}</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </a>
            ))}
            <div className="pt-2.5">
              <button
                type="button"
                onClick={() => handlePrimaryCtaClick('Menú Móvil CTA')}
                data-track="cta-mobile-menu-primary"
                className="w-full min-h-[50px] rounded-xl bg-[#34D399] hover:bg-[#10B981] text-[#050911] font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-transform cursor-pointer touch-manipulation"
              >
                <span>Agenda tu diagnóstico gratis</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1 relative z-10">
        {/* ===================================================================== */}
        {/* 3. HERO SECTION (MOBILE FIRST 390PX -> DESKTOP)                       */}
        {/* ===================================================================== */}
        <section
          id="inicio"
          ref={heroRef}
          className="relative pt-7 pb-10 sm:pt-10 sm:pb-14 md:py-20 px-3.5 sm:px-6 overflow-hidden"
        >
          <div className="max-w-3xl mx-auto text-center relative z-10">
            {/* Etiqueta corta de una línea (sin mayúsculas sostenidas ni fuente monoespaciada larga) */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#0C1322]/85 border border-emerald-400/25 text-[11px] sm:text-sm font-medium text-emerald-300 mb-3.5 sm:mb-5 max-w-full">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="truncate sm:whitespace-normal">Páginas web inteligentes y chatbots con IA en WhatsApp</span>
            </div>

            {/* H1 único de máximo 12 palabras (9 palabras), enfocado en el resultado */}
            <h1
              className="text-[26px] xs:text-[29px] sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold text-white tracking-tight leading-[1.18] sm:leading-[1.12] mb-3 sm:mb-4"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Tu negocio vendiendo 24/7, sin contratar más personal
            </h1>

            {/* Subtítulo de máximo 2 líneas con UN solo color de resalte */}
            <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-5 sm:mb-7">
              Atrae clientes con una web ultra-rápida y deja que un{' '}
              <span className="text-emerald-400 font-semibold">
                bot con IA en tu WhatsApp responda y cotice en 2 segundos
              </span>
              .
            </p>

            {/* CTA Primario: botón de ancho completo en móvil, alto contraste + microcopy debajo */}
            <div className="max-w-md mx-auto flex flex-col items-center">
              <button
                type="button"
                onClick={() => handlePrimaryCtaClick('Hero CTA Principal')}
                data-track="cta-hero-primary"
                className="w-full min-h-[52px] sm:min-h-[54px] px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-[#34D399] hover:bg-[#10B981] text-[#050911] font-extrabold text-base sm:text-lg shadow-[0_8px_25px_rgba(52,211,153,0.35)] md:shadow-[0_10px_30px_rgba(52,211,153,0.35)] hover:shadow-[0_12px_36px_rgba(52,211,153,0.5)] flex items-center justify-center gap-2.5 active:scale-[0.98] transition-all cursor-pointer touch-manipulation"
              >
                <span>Agenda tu diagnóstico gratis</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>

              {/* Microcopy obligatorio debajo del CTA primario */}
              <p className="text-[11px] sm:text-xs text-slate-400 mt-2 sm:mt-2.5 font-medium">
                Gratis · Sin compromiso · Respuesta en menos de 2 horas
              </p>

              {/* CTA Secundario: enlace de texto "Ver cómo funciona" (no botón grande) */}
              <a
                href="#demo-whatsapp"
                data-track="cta-hero-secondary-link"
                onClick={() => trackConversionEvent('demo_open', 'Ver cómo funciona Hero Link', 'hero')}
                className="inline-flex items-center gap-1.5 mt-3 sm:mt-4 text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors py-1.5 min-h-[40px] touch-manipulation"
              >
                <span>Ver cómo funciona</span>
                <ChevronDown className="w-4 h-4" />
              </a>
            </div>

            {/* Fila de prueba social inmediata: 5 estrellas + 3 cifras */}
            <div className="mt-6 sm:mt-9 pt-4 sm:pt-6 border-t border-white/[0.08]">
              <div className="flex items-center justify-center gap-1.5 mb-3 sm:mb-4">
                <div className="flex items-center text-amber-400" aria-label="5 de 5 estrellas">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-[11px] sm:text-xs md:text-sm font-semibold text-slate-200">
                  4.9/5 calificación de clientes en Latinoamérica
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 md:gap-4 max-w-lg mx-auto">
                <div className="p-2 sm:p-2.5 md:p-3 rounded-xl sm:rounded-2xl bg-[#0C1322]/85 border border-white/[0.08]">
                  <div
                    className="text-sm xs:text-base sm:text-xl md:text-2xl font-extrabold text-white"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    +50 negocios
                  </div>
                  <div className="text-[10px] sm:text-[11px] md:text-xs text-slate-400 mt-0.5 leading-tight">
                    vendiendo 24/7
                  </div>
                </div>

                <div className="p-2 sm:p-2.5 md:p-3 rounded-xl sm:rounded-2xl bg-[#0C1322]/85 border border-white/[0.08]">
                  <div
                    className="text-sm xs:text-base sm:text-xl md:text-2xl font-extrabold text-emerald-400"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    &lt;0.8s de carga
                  </div>
                  <div className="text-[10px] sm:text-[11px] md:text-xs text-slate-400 mt-0.5 leading-tight">
                    cero rebote móvil
                  </div>
                </div>

                <div className="p-2 sm:p-2.5 md:p-3 rounded-xl sm:rounded-2xl bg-[#0C1322]/85 border border-white/[0.08]">
                  <div
                    className="text-sm xs:text-base sm:text-xl md:text-2xl font-extrabold text-cyan-400"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Respuesta en 2 s
                  </div>
                  <div className="text-[10px] sm:text-[11px] md:text-xs text-slate-400 mt-0.5 leading-tight">
                    en tu WhatsApp
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================== */}
        {/* 4. FRANJA DE LOGOS DE CLIENTES Y RESULTADOS REALES                    */}
        {/* ===================================================================== */}
        <section
          aria-label="Empresas y resultados verificados"
          className="py-4 sm:py-6 bg-[#0A101D]/75 border-y border-white/[0.06] px-3.5 sm:px-6"
        >
          <div className="max-w-6xl mx-auto">
            <p className="text-center text-[11px] sm:text-xs font-semibold text-slate-400 mb-3 sm:mb-4 px-2">
              Negocios en Colombia, México y Latinoamérica que ya automatizaron sus ventas con Xiantra
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
              {CLIENT_LOGOS.map((item, idx) => (
                <div
                  key={item.name}
                  className={`px-2.5 py-2 sm:px-3.5 sm:py-2.5 rounded-xl bg-[#070B12]/85 border border-white/[0.07] flex flex-col items-center justify-center text-center ${
                    idx === 4 ? 'col-span-2 sm:col-span-1 max-w-[240px] sm:max-w-none mx-auto w-full' : ''
                  }`}
                >
                  <span className="text-[11px] sm:text-xs md:text-sm font-bold text-slate-200">{item.name}</span>
                  <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-400 mt-0.5">
                    {item.metric}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================== */}
        {/* 5. SECCIÓN "PROBLEMA → SOLUCIÓN" (3 DOLORES Y CÓMO XIANTRA RESUELVE)  */}
        {/* ===================================================================== */}
        <section id="como-funciona" className="cv-section py-10 sm:py-16 lg:py-20 px-3.5 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 lg:mb-12">
              <span className="text-[11px] sm:text-xs font-semibold text-emerald-400 tracking-wide">
                Del caos manual a ventas automáticas
              </span>
              <h2
                className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white mt-1.5 sm:mt-2 tracking-tight"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Por qué hoy se te escapan clientes (y cómo lo solucionamos)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5">
              {PAIN_SOLUTIONS.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#0C1322]/90 border border-white/[0.08] p-4 sm:p-5 md:p-6 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
                >
                  {/* Problema / Dolor */}
                  <div className="pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-white/[0.07]">
                    <div className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-rose-400 mb-1.5 sm:mb-2">
                      <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                      <span>El problema hoy</span>
                    </div>
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-white leading-snug">
                      “{item.painTitle}”
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1 sm:mt-1.5 leading-relaxed">
                      {item.painDesc}
                    </p>
                  </div>

                  {/* Solución Xiantra */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2">
                      <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-bold text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                        <span>Solución Xiantra</span>
                      </span>
                      <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-[10px] sm:text-[11px] font-bold text-emerald-300">
                        {item.metric}
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-bold text-emerald-300 leading-snug">
                      {item.solutionTitle}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1 sm:mt-1.5 leading-relaxed">
                      {item.solutionDesc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================================================================== */}
        {/* 6. DEMO VISUAL: MOCKUP DE CHAT DE WHATSAPP EN VIVO (XIAN IA INTEGRADO)*/}
        {/* ===================================================================== */}
        <section
          id="demo-whatsapp"
          className="cv-section py-10 sm:py-16 lg:py-20 px-3.5 sm:px-6 bg-[#0A101D]/75 border-y border-white/[0.06]"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
              <span className="text-[11px] sm:text-xs font-semibold text-cyan-400 tracking-wide">
                Demostración interactiva en tiempo real
              </span>
              <h2
                className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white mt-1.5 sm:mt-2 tracking-tight"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Mira cómo el bot califica y cotiza en tu WhatsApp en 2 segundos
              </h2>
              <p className="text-xs sm:text-base text-slate-300 mt-1.5 sm:mt-2">
                Toca un escenario abajo para ver cómo nuestro asistente IA responde y cierra por ti a cualquier hora.
              </p>
            </div>

            {/* Scenario Switcher Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-4 sm:mb-6">
              {(Object.keys(DEMO_SCENARIOS) as Array<'cotizar' | 'catalogo' | 'citas'>).map(
                (key) => {
                  const active = activeScenario === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => {
                        setActiveScenario(key);
                        trackConversionEvent('demo_open', `Demo Escenario: ${key}`, 'whatsapp_demo');
                      }}
                      data-track={`demo-scenario-${key}`}
                      className={`min-h-[44px] px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer touch-manipulation ${
                        active
                          ? 'bg-emerald-400 text-[#050911] shadow-[0_0_20px_rgba(52,211,153,0.3)]'
                          : 'bg-[#070B12]/90 text-slate-300 border border-white/10 hover:border-emerald-400/40 active:bg-white/5'
                      }`}
                    >
                      {DEMO_SCENARIOS[key].label}
                    </button>
                  );
                }
              )}
            </div>

            {/* WhatsApp Chat Mockup Window (with Xian IA Avatar integrated here) */}
            <div className="max-w-xl mx-auto rounded-2xl sm:rounded-3xl bg-[#070B12]/95 border border-emerald-500/30 shadow-[0_16px_50px_rgba(0,0,0,0.6)] overflow-hidden">
              {/* WhatsApp Header */}
              <div className="px-3.5 py-3 sm:px-4 sm:py-3.5 bg-[#0F1928] border-b border-white/10 flex items-center justify-between gap-2.5 sm:gap-3">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-emerald-400 shrink-0">
                    <img
                      src="/images/advisor_corporate_man_1793654807154.jpg"
                      alt="Xian - Asistente IA 24/7 integrado"
                      width={44}
                      height={44}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <span className="text-xs sm:text-sm font-bold text-white">
                        Xian · Asistente IA de Ventas
                      </span>
                      <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[9px] sm:text-[10px] font-bold text-emerald-300">
                        IA 24/7
                      </span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs text-emerald-400 mt-0.5">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>En línea · Responde en 2 segundos</span>
                    </div>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  WhatsApp Oficial
                </span>
              </div>

              {/* Chat Messages Body */}
              <div className="p-3.5 sm:p-5 space-y-2.5 sm:space-y-3.5 min-h-[300px] sm:min-h-[340px] bg-gradient-to-b from-[#08101C] to-[#070B12]">
                {DEMO_SCENARIOS[activeScenario].messages
                  .slice(0, visibleMessagesCount)
                  .map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.sender === 'user' ? 'items-end' : 'items-start'
                      } transition-all duration-300`}
                    >
                      <div
                        className={`max-w-[92%] sm:max-w-[88%] rounded-2xl px-3.5 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-[#134D37] text-white rounded-tr-xs border border-emerald-500/30'
                            : 'bg-[#111A2B] text-slate-100 rounded-tl-xs border border-white/10'
                        }`}
                      >
                        <p>{msg.text}</p>

                        {msg.quoteBadge && (
                          <div className="mt-2.5 sm:mt-3 p-2.5 sm:p-3 rounded-xl bg-[#070B12]/90 border border-emerald-400/40 space-y-1">
                            <div className="flex items-center justify-between text-[11px] sm:text-xs font-bold text-emerald-400">
                              <span>{msg.quoteBadge.plan}</span>
                              <Sparkles className="w-3.5 h-3.5 shrink-0" />
                            </div>
                            <div className="text-xs sm:text-sm font-extrabold text-white">
                              {msg.quoteBadge.price}
                            </div>
                            <div className="text-[11px] sm:text-xs text-slate-400">
                              {msg.quoteBadge.delivery}
                            </div>
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] sm:text-[11px] text-slate-400 mt-1 px-1">{msg.time}</span>
                    </div>
                  ))}
              </div>

              {/* Simulated Chat Footer with Direct WhatsApp Test Link */}
              <div className="px-3.5 py-2.5 sm:px-4 sm:py-3 bg-[#0C1322] border-t border-white/10 flex items-center justify-between gap-2">
                <span className="text-[11px] sm:text-xs text-slate-400 truncate">
                  ¿Quieres probarlo directo en tu celular?
                </span>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="demo-open-real-whatsapp"
                  onClick={() => trackConversionEvent('whatsapp_click', 'Probar en WhatsApp Demo', 'whatsapp_demo')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 shrink-0 min-h-[36px] py-1 touch-manipulation"
                >
                  <span>Escribir por WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Repeated Unified Primary CTA after Demo */}
            <div className="mt-6 sm:mt-8 max-w-md mx-auto text-center">
              <button
                type="button"
                onClick={() => handlePrimaryCtaClick('Post-Demo CTA')}
                data-track="cta-post-demo-primary"
                className="w-full min-h-[52px] sm:min-h-[54px] px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-[#34D399] hover:bg-[#10B981] text-[#050911] font-extrabold text-base sm:text-lg shadow-[0_8px_25px_rgba(52,211,153,0.32)] md:shadow-[0_10px_30px_rgba(52,211,153,0.32)] flex items-center justify-center gap-2.5 active:scale-[0.98] transition-all cursor-pointer touch-manipulation"
              >
                <span>Agenda tu diagnóstico gratis</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-2 font-medium">
                Gratis · Sin compromiso · Respuesta en menos de 2 horas
              </p>
            </div>
          </div>
        </section>

        {/* ===================================================================== */}
        {/* 7. CASOS / TESTIMONIOS CON RESULTADO MEDIBLE (ANTES / DESPUÉS)       */}
        {/* ===================================================================== */}
        {/* ===================================================================== */}
        {/* 7. CASOS / TESTIMONIOS CON RESULTADO MEDIBLE (ANTES / DESPUÉS)       */}
        {/* ===================================================================== */}
        <section id="casos" className="cv-section py-10 sm:py-16 lg:py-20 px-3.5 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 lg:mb-12">
              <span className="text-[11px] sm:text-xs font-semibold text-emerald-400 tracking-wide">
                Resultados comprobados en Latinoamérica
              </span>
              <h2
                className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white mt-1.5 sm:mt-2 tracking-tight"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                El antes y después de implementar Xiantra
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 sm:gap-5">
              {CASE_STUDIES_CRO.map((c, idx) => (
                <article
                  key={idx}
                  className="rounded-2xl bg-[#0C1322]/90 border border-white/[0.08] p-4 sm:p-5 md:p-6 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Metric Badge */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-[11px] sm:text-xs font-extrabold text-emerald-300 mb-2.5 sm:mb-3">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>{c.highlight}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-white">{c.company}</h3>
                    <p className="text-[11px] sm:text-xs text-slate-400 mb-3 sm:mb-4">{c.industry}</p>

                    {/* Before / After Comparison Boxes */}
                    <div className="space-y-2 sm:space-y-2.5 mb-4 sm:mb-5">
                      <div className="p-2.5 sm:p-3 rounded-xl bg-rose-950/25 border border-rose-500/20">
                        <span className="text-[10px] sm:text-[11px] font-bold text-rose-400 block mb-0.5">
                          ANTES:
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed">{c.before}</p>
                      </div>

                      <div className="p-2.5 sm:p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
                        <span className="text-[10px] sm:text-[11px] font-bold text-emerald-400 block mb-0.5">
                          DESPUÉS CON XIANTRA:
                        </span>
                        <p className="text-xs text-slate-100 leading-relaxed font-medium">
                          {c.after}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Verified Client Quote */}
                  <div className="pt-3.5 sm:pt-4 border-t border-white/[0.07]">
                    <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed mb-2.5 sm:mb-3">
                      “{c.quote}”
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-white">{c.author}</div>
                        <div className="text-[10px] sm:text-[11px] text-slate-400">{c.role}</div>
                      </div>
                      <div className="flex items-center text-amber-400">
                        {[...Array(5)].map((_, s) => (
                          <Star key={s} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Repeated Unified Primary CTA after Testimonials */}
            <div className="mt-8 sm:mt-10 max-w-md mx-auto text-center">
              <button
                type="button"
                onClick={() => handlePrimaryCtaClick('Post-Testimonios CTA')}
                data-track="cta-post-testimonials-primary"
                className="w-full min-h-[52px] sm:min-h-[54px] px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-[#34D399] hover:bg-[#10B981] text-[#050911] font-extrabold text-base sm:text-lg shadow-[0_8px_25px_rgba(52,211,153,0.32)] md:shadow-[0_10px_30px_rgba(52,211,153,0.32)] flex items-center justify-center gap-2.5 active:scale-[0.98] transition-all cursor-pointer touch-manipulation"
              >
                <span>Agenda tu diagnóstico gratis</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
              <p className="text-[11px] sm:text-xs text-slate-400 mt-2 font-medium">
                Gratis · Sin compromiso · Respuesta en menos de 2 horas
              </p>
            </div>
          </div>
        </section>

        {/* ===================================================================== */}
        {/* 8. OFERTA: PAQUETES + MÁS POPULAR DESTACADO + GARANTÍA + ESCASEZ REAL */}
        {/* ===================================================================== */}
        <section
          id="paquetes"
          className="cv-section py-10 sm:py-16 lg:py-20 px-3.5 sm:px-6 bg-[#0A101D]/75 border-y border-white/[0.06]"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-7">
              {/* Real Scarcity Indicator */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-[11px] sm:text-xs font-bold text-amber-300 mb-2.5 sm:mb-3">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span>
                  {pricingTab === 'sistemas'
                    ? 'Disponibilidad del mes: Solo quedan 3 cupos para entrega en 30 días'
                    : 'Cupos de soporte del mes: Asignación técnica dedicada por empresa'}
                </span>
              </div>

              <h2
                className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {pricingTab === 'sistemas'
                  ? 'Elige el sistema que pondrá tu negocio a vender 24/7'
                  : 'Planes de Mantenimiento Mensual con Cambios Incluidos'}
              </h2>
              <p className="text-xs sm:text-base text-slate-300 mt-1.5 sm:mt-2">
                {pricingTab === 'sistemas'
                  ? 'Precios transparentes en USD y COP (35% OFF). Todos los planes incluyen plan de mantenimiento mensual y construcción en 30 días.'
                  : 'Pago mensual por un año de servicio. Precios en USD y COP para mantener tu web rápida, segura y siempre actualizada.'}
              </p>
            </div>

            {/* Toggle Segmentado: Sistemas Web+IA (30 días) vs Planes de Mantenimiento Mensual */}
            <div className="flex items-center justify-center p-1 sm:p-1.5 rounded-2xl bg-[#070B12]/95 border border-white/10 max-w-xl mx-auto mb-6 sm:mb-8 shadow-lg">
              <button
                type="button"
                onClick={() => setPricingTab('sistemas')}
                data-track="pricing-tab-sistemas"
                className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer touch-manipulation ${
                  pricingTab === 'sistemas'
                    ? 'bg-[#34D399] text-[#050911] shadow-[0_4px_16px_rgba(52,211,153,0.3)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>Sistemas Web + IA</span>
                <span className="text-[10px] sm:text-[11px] px-1.5 py-0.5 rounded-md bg-black/25 font-bold">30 días</span>
              </button>
              <button
                type="button"
                onClick={() => setPricingTab('mantenimiento')}
                data-track="pricing-tab-mantenimiento"
                className={`flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer touch-manipulation ${
                  pricingTab === 'mantenimiento'
                    ? 'bg-[#34D399] text-[#050911] shadow-[0_4px_16px_rgba(52,211,153,0.3)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>Mantenimiento Mensual</span>
                <span className="text-[10px] sm:text-[11px] px-1.5 py-0.5 rounded-md bg-black/25 font-bold">1 año</span>
              </button>
            </div>

            {/* TAB 1: 3 Sistemas Web + IA */}
            {pricingTab === 'sistemas' && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
                  {PACKAGES.map((pkg) => (
                    <div
                      key={pkg.name}
                      className={`relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 flex flex-col justify-between transition-all ${
                        pkg.popular
                          ? 'bg-gradient-to-b from-[#0E1E2E]/95 to-[#0B1422]/95 border-2 border-[#34D399] shadow-[0_0_40px_rgba(52,211,153,0.18)]'
                          : 'bg-[#070B12]/90 border border-white/[0.08]'
                      }`}
                    >
                      {pkg.popular && (
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 sm:px-3.5 py-1 rounded-full bg-[#34D399] text-[#050911] text-[11px] sm:text-xs font-extrabold tracking-tight shadow-md whitespace-nowrap">
                          {pkg.badge}
                        </div>
                      )}

                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-lg sm:text-xl font-extrabold text-white">{pkg.name}</h3>
                          <span className="text-[10px] sm:text-[11px] font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded-full shrink-0">
                            {pkg.deliveryTime}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-400 mt-1 sm:mt-1.5 leading-relaxed">
                          {pkg.subtitle}
                        </p>

                        {/* Precios: USD ENCIMA, COP DEBAJO + Plan de Mantenimiento Mensual */}
                        <div className="mt-4 sm:mt-5 pb-4 sm:pb-5 border-b border-white/[0.08] space-y-1.5">
                          {/* 1. Precio en USD (ENCIMA) */}
                          <div className="flex items-baseline gap-2">
                            <span
                              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight"
                              style={{ fontFamily: "'Outfit', sans-serif" }}
                            >
                              {pkg.priceUSD}
                            </span>
                            <span className="text-xs text-slate-500 line-through">
                              {pkg.oldPriceUSD}
                            </span>
                            <span className="text-[10px] sm:text-[11px] font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-400/30 px-2 py-0.5 rounded-md ml-auto">
                              35% OFF
                            </span>
                          </div>

                          {/* 2. Precio en Pesos Colombianos (DEBAJO) */}
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-xs text-slate-400">Equivale a:</span>
                            <span className="text-sm sm:text-base font-bold text-emerald-300">
                              {pkg.priceCOP}
                            </span>
                            <span className="text-[11px] text-slate-500 line-through">
                              {pkg.oldPriceCOP}
                            </span>
                          </div>

                          {/* 3. Etiqueta destacada: Plan de mantenimiento mensual incluido */}
                          <div className="pt-1">
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-400/30 text-[11px] font-bold text-emerald-300">
                              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 stroke-[3]" />
                              <span>Mantenimiento mensual incluido</span>
                            </div>
                          </div>
                        </div>

                        <ul className="space-y-2.5 sm:space-y-3 my-4 sm:my-6">
                          {pkg.features.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm text-slate-200">
                              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        type="button"
                        onClick={() => handlePrimaryCtaClick(`Paquete: ${pkg.name}`, pkg.name)}
                        data-track={`cta-package-${pkg.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className={`w-full min-h-[48px] sm:min-h-[50px] py-3 sm:py-3.5 px-4 sm:px-5 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer touch-manipulation active:scale-[0.98] ${
                          pkg.popular
                            ? 'bg-[#34D399] hover:bg-[#10B981] text-[#050911] shadow-[0_8px_25px_rgba(52,211,153,0.3)]'
                            : 'bg-white/[0.07] hover:bg-white/[0.12] text-white border border-white/10'
                        }`}
                      >
                        <span>Agenda tu diagnóstico gratis</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-4 sm:mt-6 text-center">
                  <button
                    type="button"
                    onClick={() => setPricingTab('mantenimiento')}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-cyan-300 hover:text-cyan-200 underline decoration-cyan-400/40 underline-offset-4 cursor-pointer"
                  >
                    <span>¿Ya tienes página web y requieres solo soporte y cambios mensuales? Ver planes de mantenimiento aquí</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            )}

            {/* TAB 2: 3 Planes de Mantenimiento Mensual (Basic, Plus, Expert) */}
            {pricingTab === 'mantenimiento' && (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 items-stretch">
                  {MAINTENANCE_PLANS.map((plan) => (
                    <div
                      key={plan.name}
                      className={`relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 flex flex-col justify-between transition-all ${
                        plan.popular
                          ? 'bg-gradient-to-b from-[#0E1E2E]/95 to-[#0B1422]/95 border-2 border-[#34D399] shadow-[0_0_40px_rgba(52,211,153,0.18)]'
                          : 'bg-[#070B12]/90 border border-white/[0.08]'
                      }`}
                    >
                      {plan.badge && (
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 sm:px-3.5 py-1 rounded-full bg-[#34D399] text-[#050911] text-[11px] sm:text-xs font-extrabold tracking-tight shadow-md whitespace-nowrap">
                          {plan.badge}
                        </div>
                      )}

                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="text-lg sm:text-xl font-extrabold text-white">{plan.name}</h3>
                          <span className="text-[10px] sm:text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full shrink-0">
                            {plan.changesBadge}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-400 mt-1 sm:mt-1.5 leading-relaxed">
                          {plan.subtitle}
                        </p>

                        {/* Precios: USD ENCIMA, COP DEBAJO + Pago mensual por un año de servicio */}
                        <div className="mt-4 sm:mt-5 pb-4 sm:pb-5 border-b border-white/[0.08] space-y-2">
                          {/* 1. Precio en USD (ENCIMA) */}
                          <div className="flex items-baseline gap-1.5">
                            <span
                              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight"
                              style={{ fontFamily: "'Outfit', sans-serif" }}
                            >
                              {plan.priceUSD}
                            </span>
                            <span className="text-xs sm:text-sm font-semibold text-slate-400">
                              {plan.unitUSD}
                            </span>
                          </div>

                          {/* 2. Precio en Pesos Colombianos (DEBAJO) */}
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-xs text-slate-400">Equivale a:</span>
                            <span className="text-sm sm:text-base font-bold text-emerald-300">
                              {plan.priceCOP}
                            </span>
                            <span className="text-xs text-slate-400">
                              {plan.unitCOP}
                            </span>
                          </div>

                          {/* 3. Etiqueta destacada: Pago mensual por un año de servicio */}
                          <div className="pt-1">
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-400/30 text-[11px] font-bold text-cyan-300">
                              <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                              <span>{plan.contractTerm}</span>
                            </div>
                          </div>
                        </div>

                        <ul className="space-y-2.5 sm:space-y-3 my-4 sm:my-6">
                          {plan.features.map((feat, fIdx) => (
                            <li key={fIdx} className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm text-slate-200">
                              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <button
                        type="button"
                        onClick={() => handlePrimaryCtaClick(`Mantenimiento: ${plan.name}`, `${plan.name} (${plan.priceCOP} / ${plan.priceUSD})`)}
                        data-track={`cta-maintenance-${plan.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className={`w-full min-h-[48px] sm:min-h-[50px] py-3 sm:py-3.5 px-4 sm:px-5 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer touch-manipulation active:scale-[0.98] ${
                          plan.popular
                            ? 'bg-[#34D399] hover:bg-[#10B981] text-[#050911] shadow-[0_8px_25px_rgba(52,211,153,0.3)]'
                            : 'bg-white/[0.07] hover:bg-white/[0.12] text-white border border-white/10'
                        }`}
                      >
                        <span>Agenda tu diagnóstico gratis</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-4 sm:mt-6 text-center">
                  <button
                    type="button"
                    onClick={() => setPricingTab('sistemas')}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-300 hover:text-emerald-200 underline decoration-emerald-400/40 underline-offset-4 cursor-pointer"
                  >
                    <span>¿Aún no tienes tu página web inteligente? Conoce nuestros 3 sistemas completos de entrega en 30 días</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </>
            )}

            {/* 90-Day Guarantee Seal */}
            <div className="mt-6 sm:mt-8 p-4 sm:p-5 rounded-2xl bg-[#070B12]/90 border border-emerald-500/25 max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 text-center sm:text-left">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h3 className="text-xs sm:text-base font-bold text-white">
                  Garantía de Satisfacción y Funcionamiento de 90 Días por Contrato
                </h3>
                <p className="text-[11px] sm:text-sm text-slate-300 mt-1 leading-relaxed">
                  Si tu sistema no carga en menos de 1 segundo o el bot no responde como acordamos, trabajamos gratis hasta dejarlo perfecto. Sin letras pequeñas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================== */}
        {/* 9. FAQ DE 5 PREGUNTAS QUE ELIMINAN OBJECIONES                         */}
        {/* ===================================================================== */}
        {/* ===================================================================== */}
        {/* 9. FAQ DE 5 PREGUNTAS QUE ELIMINAN OBJECIONES                         */}
        {/* ===================================================================== */}
        <section id="faq" className="cv-section py-10 sm:py-16 lg:py-20 px-3.5 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-6 sm:mb-10">
              <span className="text-[11px] sm:text-xs font-semibold text-emerald-400 tracking-wide">
                Respuestas claras sin rodeos
              </span>
              <h2
                className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white mt-1.5 sm:mt-2 tracking-tight"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Preguntas frecuentes antes de agendar
              </h2>
            </div>

            <div className="space-y-2.5 sm:space-y-3">
              {FAQS.map((item, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-xl sm:rounded-2xl bg-[#0C1322]/90 border border-white/[0.08] overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      data-track={`faq-toggle-${idx + 1}`}
                      aria-expanded={isOpen}
                      className="w-full min-h-[52px] sm:min-h-[56px] px-4 py-3 sm:px-5 sm:py-4 text-left flex items-center justify-between gap-3 sm:gap-4 text-xs sm:text-sm md:text-base font-bold text-white hover:text-emerald-300 transition-colors cursor-pointer touch-manipulation"
                    >
                      <span className="pr-1">{item.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/[0.05] pt-2.5 sm:pt-3">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===================================================================== */}
        {/* 10. CTA FINAL CON FORMULARIO CORTO (MÁX. 3 CAMPOS: NOMBRE, WHATSAPP, NEGOCIO) */}
        {/* ===================================================================== */}
        <section
          id="diagnostico"
          ref={formSectionRef}
          className="cv-section py-10 sm:py-16 lg:py-20 px-3.5 sm:px-6 bg-gradient-to-b from-[#0A101D]/80 to-[#070B12]/90 border-t border-white/[0.08]"
        >
          <div className="max-w-xl mx-auto">
            <div className="rounded-2xl sm:rounded-3xl bg-[#0C1322]/95 border border-emerald-400/35 p-4.5 sm:p-7 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.65)]">
              <div className="text-center mb-5 sm:mb-6">
                <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-[11px] sm:text-xs font-bold text-emerald-300 mb-2.5 sm:mb-3">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Sesión gratuita de 15 minutos</span>
                </span>
                <h2
                  className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  Agenda tu diagnóstico gratis
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 sm:mt-1.5 leading-relaxed">
                  Déjanos estos 3 datos y te contactamos por WhatsApp en menos de 2 horas con un plan a la medida de tu negocio.
                </p>
              </div>

              {!formSubmitted ? (
                <form onSubmit={handleFormSubmit} className="space-y-3.5 sm:space-y-4" noValidate>
                  {/* Campo 1: Nombre */}
                  <div>
                    <label
                      htmlFor="lead-name"
                      className="block text-[11px] sm:text-xs font-bold text-slate-200 mb-1 sm:mb-1.5"
                    >
                      1. Tu nombre *
                    </label>
                    <input
                      ref={nameInputRef}
                      id="lead-name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Ej. Carlos Restrepo"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full min-h-[48px] px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#070B12] border border-white/15 text-base text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>

                  {/* Campo 2: WhatsApp */}
                  <div>
                    <label
                      htmlFor="lead-whatsapp"
                      className="block text-[11px] sm:text-xs font-bold text-slate-200 mb-1 sm:mb-1.5"
                    >
                      2. Tu WhatsApp *
                    </label>
                    <input
                      id="lead-whatsapp"
                      type="tel"
                      inputMode="tel"
                      required
                      autoComplete="tel"
                      placeholder="Ej. +57 300 123 4567"
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                      className="w-full min-h-[48px] px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#070B12] border border-white/15 text-base text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>

                  {/* Campo 3: Tipo de negocio */}
                  <div>
                    <label
                      htmlFor="lead-business"
                      className="block text-[11px] sm:text-xs font-bold text-slate-200 mb-1 sm:mb-1.5"
                    >
                      3. Tipo de negocio *
                    </label>
                    <select
                      id="lead-business"
                      value={formData.businessType}
                      onChange={(e) =>
                        setFormData({ ...formData, businessType: e.target.value })
                      }
                      className="w-full min-h-[48px] px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#070B12] border border-white/15 text-base text-white focus:outline-none focus:border-emerald-400 transition-colors"
                    >
                      <option value="Servicios / Consultoría">Servicios / Consultoría</option>
                      <option value="Comercio / Tienda / Catálogo">
                        Comercio / Tienda / Catálogo
                      </option>
                      <option value="Salud / Clínica / Estética">
                        Salud / Clínica / Estética
                      </option>
                      <option value="Industria / Mayorista B2B">
                        Industria / Mayorista B2B
                      </option>
                      <option value="Plan Mantenimiento Basic ($79.999 COP / $21 USD)">
                        Mantenimiento Web · Plan Basic ($79.999 COP / $21 USD)
                      </option>
                      <option value="Plan Mantenimiento Plus ($140.000 COP / $36 USD)">
                        Mantenimiento Web · Plan Plus con 5 cambios ($140.000 COP / $36 USD)
                      </option>
                      <option value="Plan Mantenimiento Expert ($250.000 COP / $65 USD)">
                        Mantenimiento Web · Plan Expert con 20 cambios ($250.000 COP / $65 USD)
                      </option>
                      <option value="Otro negocio">Otro negocio</option>
                    </select>
                  </div>

                  {formError && (
                    <p
                      role="alert"
                      className="text-xs font-semibold text-rose-400 bg-rose-950/40 border border-rose-500/30 rounded-xl px-3 sm:px-3.5 py-2 sm:py-2.5"
                    >
                      {formError}
                    </p>
                  )}

                  <button
                    type="submit"
                    data-track="cta-final-form-submit"
                    className="w-full min-h-[52px] sm:min-h-[54px] px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-[#34D399] hover:bg-[#10B981] text-[#050911] font-extrabold text-base sm:text-lg shadow-[0_8px_25px_rgba(52,211,153,0.35)] md:shadow-[0_10px_30px_rgba(52,211,153,0.35)] flex items-center justify-center gap-2.5 active:scale-[0.98] transition-all cursor-pointer touch-manipulation"
                  >
                    <span>Agenda tu diagnóstico gratis</span>
                    <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                  </button>

                  <p className="text-center text-[11px] sm:text-xs text-slate-400 font-medium">
                    Gratis · Sin compromiso · Respuesta en menos de 2 horas
                  </p>
                </form>
              ) : (
                <div
                  role="status"
                  className="p-4 sm:p-5 rounded-2xl bg-emerald-950/35 border border-emerald-400/40 text-center space-y-3.5 sm:space-y-4"
                >
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-emerald-400/20 text-emerald-300 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold text-white">
                    ¡Solicitud recibida, {formData.name}!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    Hemos reservado tu diagnóstico gratuito para tu negocio de{' '}
                    <strong className="text-emerald-300">{formData.businessType}</strong>. Si deseas atención inmediata ahora mismo, toca el botón de abajo para abrir WhatsApp:
                  </p>
                  <a
                    href={buildPersonalizedWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-track="cta-form-success-whatsapp"
                    onClick={() =>
                      trackConversionEvent('whatsapp_click', 'Confirmar en WhatsApp Post-Form', 'final_3field_form')
                    }
                    className="w-full min-h-[50px] sm:min-h-[52px] px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-[#050911] font-extrabold text-xs sm:text-sm inline-flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-transform"
                  >
                    <Send className="w-4 h-4" />
                    <span>Confirmar ahora por WhatsApp</span>
                  </a>
                </div>
              )}

              {/* Direct WhatsApp Alternative Link */}
              <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-white/[0.08] text-center">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="cta-final-direct-whatsapp"
                  onClick={() =>
                    trackConversionEvent('whatsapp_click', 'WhatsApp Directo bajo Formulario', 'final_3field_form')
                  }
                  className="inline-flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 min-h-[40px] py-1 touch-manipulation"
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span>¿Prefieres hablar ya? Escríbenos directo por WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ===================================================================== */}
      {/* SEMANTIC MINIMAL FOOTER                                               */}
      {/* ===================================================================== */}
      <footer className="relative z-10 py-6 sm:py-8 px-3.5 sm:px-6 bg-[#05080E]/90 border-t border-white/[0.06] text-center text-[11px] sm:text-xs text-slate-400 pb-24 md:pb-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <MetallicLogo size="xs" variant="cyan-electric" showSubtitle={false} />
            <span>© {new Date().getFullYear()} Xiantra Digital Solutions · Latinoamérica</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-track="footer-whatsapp"
              className="hover:text-emerald-400 transition-colors min-h-[36px] inline-flex items-center"
            >
              WhatsApp: +57 350 856 9464
            </a>
            <span>·</span>
            <a href="#diagnostico" className="hover:text-emerald-400 transition-colors min-h-[36px] inline-flex items-center">
              Diagnóstico gratis
            </a>
          </div>
        </div>
      </footer>

      {/* ===================================================================== */}
      {/* BARRA CTA STICKY INFERIOR EN MÓVIL (APARECE TRAS PASAR EL HERO)       */}
      {/* ===================================================================== */}
      {showStickyMobileBar && (
        <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-[#070B12]/95 backdrop-blur-md border-t border-emerald-500/25 px-3 sm:px-4 py-2 sm:py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] shadow-[0_-8px_25px_rgba(0,0,0,0.6)]">
          <button
            type="button"
            onClick={() => handlePrimaryCtaClick('Barra Sticky Móvil Post-Hero')}
            data-track="cta-mobile-sticky-bar"
            className="w-full min-h-[48px] px-4 py-3 rounded-xl bg-[#34D399] hover:bg-[#10B981] text-[#050911] font-extrabold text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform cursor-pointer touch-manipulation"
          >
            <span>Agenda tu diagnóstico gratis</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      )}

      {/* ===================================================================== */}
      {/* BOTÓN DE WHATSAPP FLOTANTE PEQUEÑO (56PX) ABAJO A LA DERECHA          */}
      {/* Con margen inferior dinámico para no tapar jamás ningún CTA           */}
      {/* ===================================================================== */}
      <div
        className={`fixed right-3.5 sm:right-4 z-50 transition-all duration-200 ${
          showStickyMobileBar ? 'bottom-20 md:bottom-6' : 'bottom-4 sm:bottom-5 md:bottom-6'
        }`}
        style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
      >
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-track="cta-floating-whatsapp-56px"
          onClick={() =>
            trackConversionEvent('whatsapp_click', 'Botón Flotante 56px Derecha', 'floating_whatsapp')
          }
          aria-label="Escribir por WhatsApp: Hola, quiero mi diagnóstico gratis para mi negocio"
          className="relative w-13 h-13 sm:w-14 sm:h-14 min-h-[52px] min-w-[52px] sm:min-h-[56px] sm:min-w-[56px] rounded-full bg-gradient-to-tr from-[#128C7E] via-[#20BD5A] to-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)] border-2 border-white/25 flex items-center justify-center active:scale-95 transition-transform duration-200 touch-manipulation"
        >
          {/* Subtle GPU-Composited Pulse Ring */}
          <span
            className="absolute inset-0 rounded-full border-2 border-[#25D366] opacity-55 animate-ping pointer-events-none"
            style={{ animationDuration: '2.8s' }}
            aria-hidden="true"
          />

          {/* Official WhatsApp SVG Logo */}
          <svg
            viewBox="0 0 24 24"
            width="26"
            height="26"
            fill="currentColor"
            className="relative z-10 sm:w-7 sm:h-7"
            aria-hidden="true"
          >
            <path d="M12.031 2C6.508 2 2.023 6.485 2.023 12.007c0 1.766.461 3.49 1.337 5.01L2 22l5.122-1.343a9.967 9.967 0 0 0 4.909 1.296h.004c5.522 0 10.007-4.485 10.007-10.007C22.042 6.485 17.553 2 12.031 2Zm5.845 14.158c-.246.694-1.432 1.328-1.988 1.411-.511.077-1.158.109-1.87-.117-.432-.137-.986-.32-1.698-.627-2.99-1.291-4.943-4.301-5.092-4.5-.149-.199-1.216-1.618-1.216-3.086 0-1.468.769-2.19 1.042-2.488.273-.298.596-.373.794-.373.199 0 .397.002.571.01.183.009.428-.07.67.512.248.596.844 2.061.918 2.21.075.149.124.323.025.522-.099.199-.149.323-.298.497-.149.174-.313.389-.447.522-.149.149-.304.311-.131.609.174.298.771 1.273 1.656 2.062 1.139 1.015 2.098 1.33 2.396 1.479.298.149.472.124.646-.075.174-.199.745-.869.943-1.167.199-.298.397-.248.67-.149.273.099 1.738.82 2.036.968.298.149.497.224.571.348.075.124.075.72-.171 1.414Z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
