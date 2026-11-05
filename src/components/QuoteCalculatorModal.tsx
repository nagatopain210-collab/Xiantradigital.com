import React, { useState } from 'react';
import { X, Calculator, Check, MessageSquare, Clock, Gift } from 'lucide-react';
import { COMPANY_INFO } from '../data/copyData';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

export const QuoteCalculatorModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [projectType, setProjectType] = useState<'landing' | 'pro' | 'ecommerce' | 'enterprise'>('pro');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['seo', 'bot']);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [city, setCity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const baseProjects = {
    landing: {
      name: 'Landing Page Comercial Rápida',
      price: 799999,
      priceFormatted: '$799.999 COP',
      timeline: '5 a 8 días hábiles',
      desc: 'Mobile first, velocidad <0.8s, formulario de captura y botón de WhatsApp.',
    },
    pro: {
      name: 'Página Web Corporativa Pro + IA',
      price: 1499999,
      priceFormatted: '$1.499.999 COP',
      timeline: '10 a 14 días hábiles',
      desc: 'Multi-sección, SEO semántico, catálogo interactivo y sincronización CRM.',
    },
    ecommerce: {
      name: 'Tienda E-Commerce & Carrito Inteligente',
      price: 2799999,
      priceFormatted: '$2.799.999 COP',
      timeline: '3 a 4 semanas',
      desc: 'Catálogo ilimitado, checkout en 1 clic, pasarelas Wompi/PSE/Stripe.',
    },
    enterprise: {
      name: 'Ecosistema Omnicanal a la Medida',
      price: 4500000,
      priceFormatted: '$4.500.000 COP',
      timeline: '4 a 6 semanas',
      desc: 'Web Pro + E-Commerce + Chatbot IA WhatsApp Cloud con flujos en Make.',
    },
  };

  const addonsList = [
    { id: 'seo', name: 'SEO Semántico Avanzado + Indexación Google Schema', price: 290000, priceFormatted: '+$290.000 COP' },
    { id: 'bot', name: 'Agente Xiantra Bot para WhatsApp Business', price: 450000, priceFormatted: '+$450.000 COP' },
    { id: 'pse', name: 'Pasarelas Locales Integradas (PSE, Wompi, Bancolombia)', price: 350000, priceFormatted: '+$350.000 COP' },
    { id: 'crm', name: 'Sincronización Bidireccional con CRM (HubSpot / Zoho)', price: 390000, priceFormatted: '+$390.000 COP' },
    { id: 'maint', name: 'Mes de Mantenimiento Intermedio (6 cambios)', price: 289999, priceFormatted: '+$289.999 COP' },
  ];

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const currentBase = baseProjects[projectType];
  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const addon = addonsList.find((a) => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const totalEstimate = currentBase.price + addonsTotal;
  const formattedTotal = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(totalEstimate);

  const handleSendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const addonNames = selectedAddons
      .map((id) => addonsList.find((a) => a.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    const text = `Hola *Xiantra Digital Solutions*!%0A%0AHe configurado mi cotización web en COP:%0A- *Solución:* ${currentBase.name}%0A- *Inversión estimada:* ${formattedTotal}%0A- *Plazo estimado:* ${currentBase.timeline}%0A- *Adicionales:* ${addonNames || 'Ninguno'}%0A- *BONUS INCLUIDO:* Panel Administrador del Cliente (GRATIS)%0A%0A*Mis Datos:*%0A- Nombre: ${name || 'No especificado'}%0A- Empresa: ${company || 'No especificada'}%0A- Ciudad: ${city || 'No especificada'}%0A- Email: ${email || 'No especificado'}%0A%0A¿Podemos agendar una llamada para revisar detalles?`;

    const url = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${text}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.open(url, '_blank');
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90dvh] overflow-y-auto bg-[#0B0F19] rounded-2xl border border-slate-700/80 shadow-2xl p-5 sm:p-8 text-slate-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 min-h-[40px] min-w-[40px] flex items-center justify-center text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2 pr-8">
              <Calculator className="w-4 h-4 shrink-0" />
              <span>Calculadora de Proyecto en Pesos Colombianos (COP)</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              Cotiza tu desarrollo web en tiempo real
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mb-5">
              Selecciona tu tipo de proyecto y módulos adicionales para estimar la inversión exacta y el cronograma de entrega.
            </p>

            {/* Plus Banner inside Modal */}
            <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 mb-6 flex items-center gap-3">
              <Gift className="w-5 h-5 text-cyan-400 shrink-0" />
              <p className="text-xs text-slate-200">
                <strong className="text-cyan-300">PLUS INCLUIDO DE REGALO:</strong> Todas las cotizaciones incluyen el Panel de Administración del Cliente valorado en $1.200.000 COP sin costo adicional.
              </p>
            </div>

            <form onSubmit={handleSendToWhatsApp} className="space-y-6">
              {/* Step 1: Base Project Type */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-3">
                  1. Selecciona la solución base
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(Object.keys(baseProjects) as Array<keyof typeof baseProjects>).map((key) => {
                    const item = baseProjects[key];
                    const isSelected = projectType === key;

                    return (
                      <button
                        type="button"
                        key={key}
                        onClick={() => setProjectType(key)}
                        className={`text-left p-4 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-950/60 border-cyan-400/80 shadow-lg shadow-indigo-900/30'
                            : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-xs sm:text-sm font-bold ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                            {item.name}
                          </span>
                        </div>
                        <span className="text-xs font-mono font-bold text-cyan-400 block mb-1">
                          {item.priceFormatted}
                        </span>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          {item.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Add-ons */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-3">
                  2. Módulos e integraciones adicionales
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {addonsList.map((addon) => {
                    const checked = selectedAddons.includes(addon.id);
                    return (
                      <button
                        type="button"
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`min-h-[44px] flex items-center justify-between p-3 rounded-lg border text-xs transition-colors cursor-pointer text-left ${
                          checked
                            ? 'bg-slate-800/90 border-cyan-500/50 text-white'
                            : 'bg-slate-900/40 border-slate-800/80 text-slate-400 hover:text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                              checked ? 'bg-cyan-500 border-cyan-400' : 'border-slate-700 bg-slate-950'
                            }`}
                          >
                            {checked && <Check className="w-3 h-3 text-slate-950 stroke-[3]" />}
                          </div>
                          <span>{addon.name}</span>
                        </div>
                        <span className="font-mono text-slate-300 ml-2 tabular-nums shrink-0">
                          {addon.priceFormatted}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Calculation Summary Bar */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-400 block">Inversión estimada:</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                      {formattedTotal}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">(Según alcance)</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-950 px-3.5 py-2 rounded-lg border border-slate-800">
                  <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>
                    Entrega estimada: <strong className="text-white">{currentBase.timeline}</strong>
                  </span>
                </div>
              </div>

              {/* Step 3: Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Nombre y Apellido *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Carlos Mendoza"
                    className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-base sm:text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Empresa *</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Innova SAS"
                    className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-base sm:text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Ciudad *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Medellín / Bogotá"
                    className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-base sm:text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Correo Electrónico *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="carlos@innova.com"
                    className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-base sm:text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Cerrar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-950 transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span>Recibir Propuesta Detallada por WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 sm:py-10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              ¡Presupuesto Generado con Éxito!
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
              Se ha preparado tu propuesta estimada de {formattedTotal}. Haz clic a continuación para continuar el chat con un especialista:
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
                  `Hola David de Xiantra, generé mi propuesta estimada de ${formattedTotal} en la web para ${company || 'mi empresa'} y quiero coordinar la entrega.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto min-h-[46px] px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Hablar con un Especialista por WhatsApp</span>
              </a>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="w-full sm:w-auto min-h-[46px] px-6 py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs sm:text-sm font-medium cursor-pointer"
              >
                Cerrar Ventana
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
