/**
 * Copy comercial, planes en COP, casos de éxito y datos estructurados para Xiantra Digital Solutions
 * Optimizado para CRO (Conversion Rate Optimization), Neuroventas y Psicología del Consumidor
 * www.xiantradigital.com
 */

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  benefits: string[];
  features: string[];
  techStack: string[];
  idealFor: string;
}

export interface IntegrationItem {
  name: string;
  category: 'ecommerce' | 'crm' | 'automation' | 'ai';
  categoryLabel: string;
  description: string;
  iconName: string;
  highlight: string;
}

export interface CaseStudy {
  id: string;
  client: string;
  domain: string;
  industry: string;
  image: string;
  metricHighlight: string;
  metricLabel: string;
  metricsHeadline?: string;
  keyMetrics?: {
    value: string;
    label: string;
    sublabel: string;
    trend?: 'up' | 'down';
  }[];
  summary: string;
  problem: string;
  solution: string;
  results: string[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface MaintenancePlan {
  id: string;
  name: string;
  priceCOP: string;
  period: string;
  popular?: boolean;
  tagline: string;
  changesIncluded: string;
  features: string[];
}

export const COMPANY_INFO = {
  name: 'Xiantra Digital Solutions',
  shortName: 'Xiantra',
  domain: 'www.xiantradigital.com',
  email: 'contacto@xiantradigital.com',
  phone: '+57 312 890 4521',
  whatsappNumber: '573128904521',
  whatsappMessage: 'Hola David de Xiantra Digital Solutions! Estuve revisando www.xiantradigital.com y quiero un diagnóstico comercial gratuito para aumentar las ventas y cotizaciones de mi empresa.',
  location: 'Sede Principal en Colombia · Clientes en Latam, España y EE. UU.',
  schedule: 'Atención Directa: Lunes a Sábado · 8:00 AM - 7:00 PM (COT)',
};

export const SOCIAL_PROOF_STATS = [
  { value: '4.9/5', label: 'Calificación de Satisfacción', sub: 'Más de 120 clientes satisfechos' },
  { value: '+180', label: 'Proyectos Entregados', sub: 'En Colombia, México, EE. UU. y España' },
  { value: '+$3.4M', label: 'Dólares en Cotizaciones', sub: 'Procesadas por nuestros sistemas' },
  { value: '90 Días', label: 'Garantía Total de Soporte', sub: '100% de propiedad del código' },
];

export const TRUSTED_INDUSTRIES = [
  'Maquinaria & Fabricación Industrial',
  'Distribuidores Mayoristas & Logística',
  'E-Commerce & Retail de Consumo',
  'Firmas de Ingeniería & Consultoría',
  'Clínicas & Servicios Especializados',
];

export const HERO_COPY = {
  badge: '¿Tus canales digitales te traen clientes todos los días?',
  titlePart1: 'Tu empresa está perdiendo cotizaciones y ventas',
  titlePart2: 'frente a competidores que sí responden al instante',
  subtitle:
    'Remplazamos páginas web estáticas y canales que nadie atiende por un sistema comercial automático que capta clientes, resuelve dudas y cierra cotizaciones en WhatsApp las 24 horas del día. Menos trabajo manual para ti. Más dinero en tu empresa.',
  primaryCta: 'Quiero Aumentar Mis Ventas (Desde $799.999 COP)',
  secondaryCta: 'Ver Demo del Panel Administrador en Vivo',
  stats: [
    { value: '+240%', label: 'Aumento en Cotizaciones Reales', context: 'Caso verificado Maquitec SAS' },
    { value: '< 25s', label: 'Tiempo de Respuesta en WhatsApp', context: 'Cierras la venta antes que la competencia' },
    { value: '24/7', label: 'Captura y Venta Continua', context: 'Ventas de noche, fines de semana y festivos' },
    { value: '100%', label: 'Propiedad del Software', context: 'Panel Administrador incluido gratis' },
  ],
};

export const SERVICES_COPY: ServiceItem[] = [
  {
    id: 'web-ai',
    number: '01',
    title: 'Sistemas Web de Alta Conversión (Convierte Visitas en Clientes)',
    tagline: 'Si tu página actual no genera cotizaciones semanales, no tienes un activo: tienes un gasto.',
    description:
      'No construimos páginas de adorno. Diseñamos plataformas comerciales enfocadas 100% en que cada visitante entienda tu valor en 3 segundos, confíe en tu empresa y pulse el botón para comprar o pedir una cotización formal.',
    benefits: [
      '¿Cómo mejora tu negocio? Carga en menos de 0.8s: evitas que el 53% de tus clientes abandone antes de ver tu oferta.',
      'Apareces primero en Google cuando tus clientes están buscando comprar, no solo navegando por curiosidad.',
      'Arquitectura psicológica "Zona del Pulgar" para que cotizar desde un celular sea tan fácil como mandar un WhatsApp.',
      'Panel Administrador PLUS incluido de regalo (ahorro de $1.200.000 COP) para que tengas control total sin depender de programadores.',
    ],
    features: [
      'Velocidad milimétrica: carga antes de que el cliente parpadee',
      'Estructura de persuasión directa orientada a captar clientes calificados',
      'Formularios dinámicos conectados a tu WhatsApp y CRM',
      'Panel de Control en español para ver visitas y contactos',
    ],
    techStack: ['Alta Conversión', 'Carga Instantánea', 'SEO Comercial', 'Panel Administrador'],
    idealFor: 'Empresas B2B, consultoras, constructoras y firmas de servicios que necesitan flujo continuo de prospectos.',
  },
  {
    id: 'ecommerce',
    number: '02',
    title: 'E-Commerce y Carrito Inteligente (Más Ventas, Menos Abandonos)',
    tagline: 'El 70% de tus clientes abandona el carrito por procesos engorrosos. Rescatamos esas ventas en automático.',
    description:
      'Construimos tiendas virtuales con pasarelas de pago colombianas y checkout en 1 solo paso. Recuperamos pedidos abandonados por WhatsApp en menos de 15 minutos para que rescates ventas millonarias que dabas por perdidas.',
    benefits: [
      '¿Cómo mejora tu negocio? Checkout en 1 clic que sube hasta un 40% la cantidad de personas que finalizan su compra.',
      'Recuperación automática por WhatsApp: el sistema contacta amablemente al cliente indeciso y rescata la venta.',
      'Cobros inmediatos con PSE, Nequi, Daviplata, Bancolombia y tarjetas internacionales.',
      'Tu inventario siempre cuadrado en tiempo real: cero errores humanos ni quejas de clientes por falta de stock.',
    ],
    features: [
      'Pasarelas locales: Wompi, PSE, Bancolombia, Nequi, MercadoPago y Stripe',
      'Venta cruzada inteligente para subir el ticket promedio de compra',
      'Cálculo de envíos nacionales automatizado',
      'Notificaciones de pedido automáticas al cliente por WhatsApp',
    ],
    techStack: ['Checkout en 1 Clic', 'Pasarelas PSE / Wompi', 'WhatsApp Automation', 'Control de Stock'],
    idealFor: 'Marcas de retail, importadores, distribuidores mayoristas y negocios que necesitan facturar 24/7 sin límites.',
  },
  {
    id: 'chatbots',
    number: '03',
    title: 'Agente de WhatsApp y Cierre 24/7 (Tu Mejor Vendedor Sin Descanso)',
    tagline: 'Tu cliente te escribe a las 9:00 PM. Si tardas más de 5 minutos, ya le compró a tu competencia.',
    description:
      'Implementamos un asesor comercial con IA entrenado con tus precios, productos y políticas. Atiende de inmediato en tu WhatsApp oficial, filtra a los curiosos, cotiza en segundos y entrega el cliente listo para comprar a tu equipo.',
    benefits: [
      '¿Cómo mejora tu negocio? Respuesta en menos de 3 segundos: atiendes al prospecto cuando su dinero y deseo de compra están calientes.',
      'Filtro de prospectos: nunca más pierdes horas atendiendo personas sin presupuesto; solo hablas con compradores reales.',
      'Trabaja 24/7/365: vendes de noche, domingos y festivos sin pagar nómina nocturna, horas extras ni rotación de personal.',
      'Sincronización instantánea con tu CRM o correo para que tu equipo comercial haga seguimiento sin esfuerzo.',
    ],
    features: [
      'Entrenado exactamente con el catálogo, preguntas y respuestas de tu empresa',
      'Conexión oficial con WhatsApp Cloud API (seguro, estable y sin riesgo de bloqueos)',
      'Agendamiento automático de citas y videollamadas comerciales',
      'Transferencia fluida a un asesor humano cuando el cliente está listo para pagar',
    ],
    techStack: ['WhatsApp Cloud Oficial', 'IA Entrenada con tu Catálogo', 'Filtro Comercial', 'CRM Sincronizado'],
    idealFor: 'Empresas de servicios, maquinaria, salud, academias e inmobiliarias con alto volumen de consultas comerciales.',
  },
];

export const INTEGRATIONS_LIST: IntegrationItem[] = [
  {
    name: 'WhatsApp Business Cloud API',
    category: 'automation',
    categoryLabel: 'Ventas y Atención Inmediata',
    description: 'Tus clientes reciben cotizaciones, catálogos y confirmaciones en segundos en la app que más usan.',
    iconName: 'MessageSquare',
    highlight: 'Canal #1 en Ventas',
  },
  {
    name: 'Wompi, PSE, Nequi & Bancolombia',
    category: 'ecommerce',
    categoryLabel: 'Cobros Locales Colombia',
    description: 'Permite que cualquier cliente te pague al instante con débito PSE, billeteras digitales o tarjetas.',
    iconName: 'CreditCard',
    highlight: 'Cero Fricción al Pagar',
  },
  {
    name: 'Inteligencia Artificial Especializada',
    category: 'ai',
    categoryLabel: 'Asesores de Ventas 24/7',
    description: 'Modelos entrenados para calificar el interés del cliente, resolver dudas comerciales y cerrar ventas.',
    iconName: 'Sparkles',
    highlight: 'Ventas en Piloto Automático',
  },
  {
    name: 'Shopify, WooCommerce & Catálogos',
    category: 'ecommerce',
    categoryLabel: 'Comercio Electrónico',
    description: 'Gestión impecable de inventarios masivos con actualización automática de precios y existencias.',
    iconName: 'ShoppingBag',
    highlight: 'Control Total',
  },
  {
    name: 'HubSpot, Salesforce & Zoho CRM',
    category: 'crm',
    categoryLabel: 'Gestión de Prospectos',
    description: 'Cada cotización entra clasificada con nombre, teléfono y valor estimado para que no pierdas un lead.',
    iconName: 'Users',
    highlight: 'Embudo de Ventas Organizado',
  },
  {
    name: 'Google Analytics 4 & Meta CAPI',
    category: 'automation',
    categoryLabel: 'Rentabilidad Publicitaria',
    description: 'Mide con precisión matemática qué anuncio o canal te trae ventas reales y cuál te hace perder dinero.',
    iconName: 'BarChart3',
    highlight: 'Retorno Medible (ROI)',
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'maquitec',
    client: 'Maquitec Ingeniería SAS',
    domain: 'maquitecingenieria.com',
    industry: 'Maquinaria Industrial, Corte por Láser & Doblado CNC',
    image: '/images/maquitec_case_study_1793654809199.jpg',
    metricHighlight: '+240%',
    metricLabel: 'Aumento en Cotizaciones Calificadas',
    metricsHeadline: '+240% en solicitudes · -60% en tiempo de respuesta comercial',
    keyMetrics: [
      {
        value: '+240%',
        label: 'Solicitudes de Cotización',
        sublabel: 'De 3 semanales a flujo comercial diario',
        trend: 'up',
      },
      {
        value: '-60%',
        label: 'Tiempo de Respuesta',
        sublabel: 'De 4 horas a < 25 segundos en WhatsApp',
        trend: 'down',
      },
      {
        value: '98/100',
        label: 'Google PageSpeed',
        sublabel: 'Carga instantánea en < 0.8s en móvil',
        trend: 'up',
      },
      {
        value: '+$45M',
        label: 'Pipeline Generado',
        sublabel: 'Primer trimestre de operación activa',
        trend: 'up',
      },
    ],
    summary:
      'De recibir 3 cotizaciones semanales a procesar solicitudes empresariales todos los días gracias a un cotizador dinámico y atención inmediata por WhatsApp.',
    problem:
      'Tenían una página web vieja en WordPress que tardaba casi 5 segundos en cargar. Los ingenieros y jefes de planta que buscaban maquinaria se desesperaban y se iban a la competencia sin cotizar.',
    solution:
      'Construimos un sistema comercial de carga ultrarrápida (<0.8s) con fichas técnicas dinámicas, cotizador automático por WhatsApp y panel de administración intuitivo.',
    results: [
      '+240% de incremento en prospectos calificados en los primeros 60 días.',
      'Tiempo de respuesta reducido de 4 horas a menos de 25 segundos.',
      'Puntuación Core Web Vitals de 98/100 en Google PageSpeed.',
    ],
    testimonial: {
      quote:
        'El cambio con Xiantra fue directo al bolsillo. Pasamos de tener una página estática que era un adorno a recibir cotizaciones de empresas industriales todos los días directamente en nuestro WhatsApp y CRM.',
      author: 'Ing. Carlos Restrepo',
      role: 'Director Comercial · Maquitec Ingeniería SAS',
    },
  },
  {
    id: 'distrialimentos',
    client: 'DistriAlimentos de Colombia',
    domain: 'distrialimentos.com.co',
    industry: 'Distribución Mayorista B2B & E-Commerce',
    image: '/images/ecommerce_automation_1793654013429.jpg',
    metricHighlight: '+185%',
    metricLabel: 'Crecimiento en Pedidos Recurrentes',
    metricsHeadline: '+185% pedidos recurrentes · -61% en abandono de carritos',
    keyMetrics: [
      {
        value: '+185%',
        label: 'Pedidos Recurrentes',
        sublabel: 'Reorden en 1 clic vía WhatsApp y Web',
        trend: 'up',
      },
      {
        value: '-61%',
        label: 'Abandono de Carrito',
        sublabel: 'Reducido del 72% al 28% con checkout optimizado',
        trend: 'down',
      },
      {
        value: '+34%',
        label: 'Ticket Promedio',
        sublabel: 'Venta cruzada y sugerida automatizada',
        trend: 'up',
      },
      {
        value: '450+',
        label: 'Pedidos / Mes',
        sublabel: 'Sin errores de stock ni demoras operativas',
        trend: 'up',
      },
    ],
    summary:
      'Reducción drástica del abandono de carritos y automatización de pedidos mayoristas por WhatsApp con cobro directo vía PSE y Wompi.',
    problem:
      'El 72% de los clientes que agregaban productos al carrito abandonaban la compra porque el proceso de pago tenía demasiados pasos y formularios innecesarios.',
    solution:
      'Diseñamos un checkout en 1 solo clic y un sistema automático de WhatsApp que contacta al cliente a los 15 minutos con su carrito listo para pagar.',
    results: [
      'Abandono de carrito reducido del 72% al 28% en el primer mes.',
      'Más de 450 pedidos procesados mensualmente sin errores de inventario.',
      'Aumento del 34% en el ticket promedio mediante venta sugerida.',
    ],
    testimonial: {
      quote:
        'La integración de pagos con PSE y la recuperación por WhatsApp hicieron que recuperáramos millones de pesos en ventas que antes simplemente se perdían en el aire.',
      author: 'Mariana Duarte',
      role: 'Líder de Canales Digitales · DistriAlimentos',
    },
  },
];

export const PRICING_CONSTRUCTION = [
  {
    tier: 'Landing Page de Alta Conversión',
    priceCOP: '$799.999 COP',
    tag: 'Resultados Rápidos',
    ideal: 'Para empresas y profesionales que necesitan captar clientes de inmediato con campañas o redes.',
    features: [
      'Estructura 100% enfocada en que el cliente pulse el botón de compra o cotización',
      'Velocidad extrema (<0.8s) para que no pierdas ni un solo visitante móvil',
      'Conexión directa a tu WhatsApp comercial con mensaje predeterminado',
      'Formulario optimizado de baja fricción para recibir prospectos calificados',
      'SEO comercial para aparecer en Google cuando buscan tu servicio',
      '🎁 PLUS INCLUIDO: Panel de Administración de regalo para ver métricas y contactos',
      '🛡️ Garantía de satisfacción técnica de 90 días',
    ],
  },
  {
    tier: 'Sistema Web Corporativo + IA',
    priceCOP: '$1.499.999 COP',
    popular: true,
    tag: 'El Más Elegido por Empresas',
    ideal: 'Para empresas B2B, consultoras, industrias y marcas que buscan liderar su sector y cerrar ventas 24/7.',
    features: [
      'Arquitectura multi-sección diseñada para transmitir autoridad y cerrar contratos',
      'Copywriting persuasivo enfocado en resolver objeciones y aumentar el valor percibido',
      'Catálogo de servicios/productos interactivo de alta gama',
      'Agente de ventas con IA para WhatsApp y Web (atiende y califica clientes 24/7)',
      'Sincronización instantánea con tu CRM o correo electrónico',
      '🎁 PLUS INCLUIDO: Panel de Control completo para editar contenidos y ver leads',
      '🛡️ Garantía de satisfacción de 90 días + Código 100% de tu propiedad',
    ],
  },
  {
    tier: 'E-Commerce con Carrito Inteligente',
    priceCOP: '$2.799.999 COP',
    tag: 'Ventas Automáticas 24/7',
    ideal: 'Para importadores, distribuidores y tiendas de retail que necesitan procesar cientos de pagos online.',
    features: [
      'Tienda virtual completa sin límite de productos ni cobros por transacción propios',
      'Checkout ultra-rápido en 1 solo paso para evitar el abandono de compras',
      'Pasarelas locales integradas: Wompi, PSE, Nequi, Bancolombia, MercadoPago y Stripe',
      'Sistema de rescate de carritos abandonados automático por WhatsApp',
      'Cálculo de envíos nacionales sincronizado con empresas de logística',
      '🎁 PLUS INCLUIDO: Panel Administrador de Pedidos, Clientes, Facturación y Stock',
      '🛡️ Garantía de 90 días + Acompañamiento en tus primeras ventas',
    ],
  },
];

export const MAINTENANCE_PLANS: MaintenancePlan[] = [
  {
    id: 'basic',
    name: 'Plan Esencial',
    priceCOP: '$149.999 COP',
    period: '/mes',
    tagline: 'Tu web siempre rápida, segura y actualizada sin que tengas que mover un dedo.',
    changesIncluded: 'Hasta 2 cambios mensuales de banners, textos o promociones',
    features: [
      'Monitoreo de seguridad y disponibilidad 24/7 (tu web nunca se cae)',
      'Copias de seguridad semanales en la nube',
      'Actualización técnica de librerías y certificados de seguridad SSL',
      'Hasta 2 cambios mensuales de contenido o precios realizados por ingenieros',
      'Soporte técnico directo por WhatsApp en horario laboral',
    ],
  },
  {
    id: 'intermediate',
    name: 'Plan Crecimiento Pro',
    priceCOP: '$289.999 COP',
    period: '/mes',
    popular: true,
    tagline: 'El plan recomendado para empresas activas que buscan optimizar ventas mes a mes.',
    changesIncluded: 'Hasta 6 cambios mensuales + Afinación continua de velocidad y SEO',
    features: [
      'Todo lo incluido en el Plan Esencial',
      'Optimización mensual de velocidad para mantener Core Web Vitals al 99+',
      'Afinación continua de posicionamiento en Google (SEO comercial)',
      'Hasta 6 cambios mensuales de productos, banners o nuevos servicios',
      'Reporte ejecutivo mensual con métricas de visitas y cotizaciones generadas',
      'Ajustes y mejoras continuas en las respuestas del bot de WhatsApp',
      'Soporte técnico prioritario con respuesta en menos de 2 horas',
    ],
  },
  {
    id: 'plus',
    name: 'Plan Escala VIP',
    priceCOP: '$499.999 COP',
    period: '/mes',
    tagline: 'Acompañamiento estratégico integral para e-commerce y empresas de alto volumen.',
    changesIncluded: 'Cambios de contenido y productos ILIMITADOS cada mes',
    features: [
      'Todo lo incluido en el Plan Crecimiento Pro',
      'Cambios y actualizaciones de contenido ILIMITADOS todo el mes',
      'Optimización continua de tasa de conversión (CRO) para subir tus ventas',
      'Re-entrenamiento mensual de tu agente de IA con nuevos productos y promociones',
      'Sesión mensual de consultoría estratégica con un ingeniero senior dedicado',
      'Soporte prioritario 24/7 para emergencias críticas',
    ],
  },
];

export const WHY_US_COPY = {
  sectionTitle: '¿Por qué las empresas eligen a Xiantra para multiplicar sus ventas?',
  subtitle:
    'No vendemos código por horas ni plantillas de adorno. Diseñamos sistemas comerciales con un solo objetivo: que recuperes tu inversión con creces en el menor tiempo posible.',
  pillars: [
    {
      title: 'Velocidad de Entrega (Tu Proyecto Listo en Días)',
      description:
        'Mientras otras agencias tardan meses en entregarte borradores vacíos, nosotros lanzamos tu sistema comercial en 7 a 14 días hábiles listo para captar clientes.',
      metric: 'Lanzamiento en 7 a 14 Días',
      tag: 'Cero Pérdida de Tiempo',
    },
    {
      title: 'Obsesión por la Conversión y el Retorno (ROI)',
      description:
        'Cada titular, botón, formulario y flujo de WhatsApp se diseña para que el cliente sienta confianza inmediata y tome la decisión de comprar.',
      metric: '3.4x Retorno Promedio',
      tag: 'Diseñado para Facturar',
    },
    {
      title: 'Acompañamiento Real y Código 100% Tuyo',
      description:
        'No te dejamos solo tras la entrega. Eres dueño absoluto de tu desarrollo, tu hosting y tu base de datos, con 90 días de soporte garantizado.',
      metric: '100% Propiedad Sin Candados',
      tag: 'Tranquilidad Total',
    },
  ],
};

export const COMPARISON_TRADITIONAL_VS_XIANTRA = [
  {
    aspect: 'Objetivo Principal',
    traditional: 'Hacer una página "bonita" que no vende nada y termina siendo un gasto abandonado.',
    xiantra: 'Construir una máquina de ventas automática que genera cotizaciones y dinero todos los días.',
  },
  {
    aspect: 'Velocidad de Carga',
    traditional: 'Lenta (3 a 6 segundos). Más del 53% de tus clientes móviles se van con tu competencia.',
    xiantra: 'Ultra-rápida (< 0.8 segundos). Retienes a cada cliente y ahorras dinero en publicidad.',
  },
  {
    aspect: 'Atención al Cliente Fuera de Horario',
    traditional: 'Formularios que nadie revisa. El cliente que escribe de noche ya le compró a otro por la mañana.',
    xiantra: 'Agente de WhatsApp 24/7: atiende en 3 segundos, responde dudas y agenda citas mientras duermes.',
  },
  {
    aspect: 'Administración y Cambios',
    traditional: 'Dependes de la agencia para cambiar una foto o te cobran tarifas exageradas por cada ajuste.',
    xiantra: 'Panel Administrador del Cliente incluido de regalo: intuitivo, fácil y sin pagar un peso extra.',
  },
  {
    aspect: 'Propiedad del Software',
    traditional: 'Te atan a plataformas cautivas o retienen el acceso a tu propio dominio y código.',
    xiantra: 'Eres el dueño legal del 100% de tu código fuente, cuentas y datos desde el primer día.',
  },
];

export const CTA_BANNER_COPY = {
  title: '¿Cuántos clientes más estás dispuesto a perder frente a tu competencia?',
  subtitle:
    'Cada día que pasa sin un sistema comercial automático es dinero que dejas sobre la mesa. Hablemos hoy 15 minutos en una sesión estratégica gratuita y te mostraremos exactamente dónde estás perdiendo ventas.',
  primaryAction: 'Quiero Mi Diagnóstico Comercial Gratuito',
  secondaryAction: 'Hablar con un Asesor por WhatsApp',
  guaranteeText: 'Sin compromiso · Evaluación en < 2 horas · Garantía de 90 días',
};
