import React, { useState } from 'react';
import { PRICING_CONSTRUCTION, MAINTENANCE_PLANS, MaintenancePlan } from '../data/copyData';
import { CheckCircle2, ArrowRight, Gift, ShieldCheck, FileCheck, Globe, DollarSign } from 'lucide-react';

interface PricingProps {
  onOpenQuote: (tierTitle?: string) => void;
  onOpenDemo: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onOpenQuote, onOpenDemo }) => {
  const [activeTab, setActiveTab] = useState<'construction' | 'maintenance'>('construction');
  const [currency, setCurrency] = useState<'COP' | 'USD'>('COP');

  // Currency conversion mapping
  const getConstructionPrice = (tierTitle: string) => {
    if (currency === 'USD') {
      if (tierTitle.includes('Landing')) return { current: '$129 USD', regular: '$199 USD' };
      if (tierTitle.includes('Corporativo')) return { current: '$239 USD', regular: '$369 USD' };
      return { current: '$449 USD', regular: '$689 USD' };
    }
    if (tierTitle.includes('Landing')) return { current: '$519.999 COP', regular: '$799.999 COP' };
    if (tierTitle.includes('Corporativo')) return { current: '$974.999 COP', regular: '$1.499.999 COP' };
    return { current: '$1.819.999 COP', regular: '$2.799.999 COP' };
  };

  const getMaintenancePrice = (planId: string) => {
    if (currency === 'USD') {
      if (planId === 'basic') return '$39 USD';
      if (planId === 'intermediate') return '$75 USD';
      return '$149 USD';
    }
    if (planId === 'basic') return '$149.999 COP';
    if (planId === 'intermediate') return '$289.999 COP';
    return '$589.999 COP';
  };

  return (
    <section id="precios" className="section-padding-fluid relative">
      <div className="container-xiantra">
        
        {/* ================= SECTION HEADER ================= */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-emerald-400 uppercase bg-emerald-950/70 border border-emerald-500/30 px-3 py-1 rounded-full">
            <span className="font-bold select-none">—</span>
            <span>INVERSIÓN TRANSPARENTE Y RETORNO MEDIBLE</span>
          </div>

          <h2 className="heading-section-fluid font-black text-slate-900 dark:text-white tracking-tight">
            Tarifas claras orientadas a generar{' '}
            <span className="text-gradient-xiantra">
              retorno comercial desde el primer mes.
            </span>
          </h2>

          <p className="body-fluid text-slate-600 dark:text-slate-300 font-normal">
            Sin tarifas ocultas ni ataduras forzadas. Eres el dueño legal del 100% de tu código fuente, cuentas y base de clientes desde el día 1.
          </p>

          {/* Mode Selector & Currency Switcher Row */}
          <div className="mt-6 sm:mt-8 flex flex-col md:flex-row items-center justify-center gap-3">
            {/* 1. Mode Tab Selector */}
            <div className="inline-flex items-center p-1.5 glass-panel rounded-xl text-xs font-semibold gap-1 w-full sm:w-auto">
              <button
                onClick={() => setActiveTab('construction')}
                className={`min-h-[42px] px-4 sm:px-5 py-2.5 rounded-lg transition-all cursor-pointer flex-1 sm:flex-initial ${
                  activeTab === 'construction'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                1. Desarrollo Llave en Mano (Pago Único)
              </button>
              <button
                onClick={() => setActiveTab('maintenance')}
                className={`min-h-[42px] px-4 sm:px-5 py-2.5 rounded-lg transition-all cursor-pointer flex-1 sm:flex-initial ${
                  activeTab === 'maintenance'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                2. Planes Mensuales de Acompañamiento
              </button>
            </div>

            {/* 2. Currency Selector (COP / USD) */}
            <div className="inline-flex items-center p-1 bg-[#09111E] border border-slate-700/80 rounded-xl text-xs font-mono font-bold">
              <button
                onClick={() => setCurrency('COP')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  currency === 'COP'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>🇨🇴 COP ($)</span>
              </button>
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                  currency === 'USD'
                    ? 'bg-emerald-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>🌎 USD ($)</span>
              </button>
            </div>
          </div>
        </div>

        {/* ================= HIGH-VALUE BONO CALLOUT ================= */}
        <div className="mb-10 sm:mb-12 p-5 sm:p-7 rounded-2xl glass-panel-neon flex flex-col md:flex-row items-start md:items-center justify-between gap-5 border border-emerald-500/35">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 dark:bg-emerald-950/70 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 shadow-inner">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[10px] sm:text-[11px] font-bold text-emerald-300 bg-emerald-950/90 border border-emerald-500/40 px-2 py-0.5 rounded uppercase">
                  Bono de Valor $1.200.000 COP Gratis ($290 USD)
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Todos los proyectos incluyen el Panel Administrador del Cliente de por vida
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Monitorea en vivo visitas, cotizaciones de WhatsApp y descarga bases de datos sin intermediarios.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenDemo}
            className="w-full md:w-auto shrink-0 min-h-[44px] px-4 py-2.5 rounded-xl glass-panel hover:border-emerald-500/40 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <span>Explorar Panel Demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="md:hidden flex items-center justify-between text-[11px] font-mono text-emerald-400 mb-3">
          <span>← Desliza para comparar los 3 planes →</span>
          <span className="text-slate-400">Precios en {currency}</span>
        </div>

        {/* ================= TAB 1: ONE-TIME DEVELOPMENT TIERS ================= */}
        {activeTab === 'construction' && (
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 overflow-x-auto md:overflow-visible snap-x-touch pt-3 pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 items-stretch animate-in fade-in duration-200">
            {PRICING_CONSTRUCTION.map((tier, idx) => {
              const priceInfo = getConstructionPrice(tier.tier);
              return (
                <div
                  key={tier.tier}
                  className={`min-w-[85vw] sm:min-w-[340px] md:min-w-0 ${
                    idx === 2 ? 'md:col-span-2 lg:col-span-1' : ''
                  } snap-center shrink-0 rounded-2xl p-6 sm:p-7 lg:p-8 flex flex-col justify-between relative transition-all duration-300 ${
                    tier.popular
                      ? 'glass-panel-neon border-2 border-emerald-500/60 shadow-[0_20px_50px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/30'
                      : 'glass-panel glass-panel-hover border border-slate-800'
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-md bg-gradient-to-r from-emerald-500 to-teal-500 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-950 shadow-md">
                      Top Elección Empresas
                    </div>
                  )}

                  <div className="space-y-5">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                        {tier.tier}
                      </h3>
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {tier.ideal}
                      </p>
                    </div>

                    {/* Price Block with Promo and Currency */}
                    <div className="border-y border-slate-200 dark:border-slate-800/80 py-4 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 line-through font-mono">
                          {priceInfo.regular}
                        </span>
                        <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-1.5 py-0.5 rounded">
                          35% OFF BLACK FRIDAY
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                          {priceInfo.current}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono block">
                        Pago único · Entrega Llave en Mano · Código 100% tuyo
                      </span>
                    </div>

                    {/* Guarantee Contractual Slogan Badge */}
                    <div className="p-2.5 rounded-xl bg-[#0B1524] border border-emerald-500/30 flex items-center gap-2 text-xs text-slate-200">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="font-semibold text-[11px]">90 Días de Garantía Técnica por Contrato</span>
                    </div>

                    {/* Feature Checklist */}
                    <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                      {tier.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800/80 space-y-2">
                    <button
                      onClick={() => onOpenQuote(`${tier.tier} (${currency})`)}
                      className={`w-full min-h-[46px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        tier.popular
                          ? 'bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black shadow-lg shadow-emerald-950/40'
                          : 'glass-panel text-slate-800 dark:text-slate-200 hover:border-emerald-500/40'
                      }`}
                    >
                      <span>Seleccionar y Configurar</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[10px] text-slate-400 text-center block font-mono">
                      Entrega lista en 7 a 14 días
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ================= TAB 2: MONTHLY MAINTENANCE PLANS ================= */}
        {activeTab === 'maintenance' && (
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 overflow-x-auto md:overflow-visible snap-x-touch pt-3 pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 items-stretch animate-in fade-in duration-200">
            {MAINTENANCE_PLANS.map((plan: MaintenancePlan, idx: number) => {
              const priceMonthly = getMaintenancePrice(plan.id);
              return (
                <div
                  key={plan.id}
                  className={`min-w-[85vw] sm:min-w-[340px] md:min-w-0 ${
                    idx === 2 ? 'md:col-span-2 lg:col-span-1' : ''
                  } snap-center shrink-0 rounded-2xl p-6 sm:p-7 lg:p-8 flex flex-col justify-between relative transition-all duration-300 ${
                    plan.popular
                      ? 'glass-panel-neon border-2 border-emerald-500/60 shadow-2xl'
                      : 'glass-panel glass-panel-hover border border-slate-800'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-md bg-gradient-to-r from-emerald-500 to-teal-500 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-950 shadow-md">
                      Recomendado para PYMEs
                    </div>
                  )}

                  <div className="space-y-5">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                        {plan.name}
                      </h3>
                      <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {plan.tagline}
                      </p>
                    </div>

                    <div className="border-y border-slate-200 dark:border-slate-800/80 py-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white font-mono tracking-tight">
                          {priceMonthly}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">{plan.period}</span>
                      </div>
                      <span className="text-[11px] text-emerald-400 font-mono block mt-1 font-semibold">
                        {plan.changesIncluded}
                      </span>
                    </div>

                    {/* Feature Checklist */}
                    <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                      {plan.features.map((feature: string, fIdx: number) => (
                        <li key={fIdx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800/80">
                    <button
                      onClick={() => onOpenQuote(`Plan de Mantenimiento: ${plan.name} (${currency})`)}
                      className={`w-full min-h-[46px] py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black shadow-lg shadow-emerald-950/40'
                          : 'glass-panel text-slate-800 dark:text-slate-200 hover:border-emerald-500/40'
                      }`}
                    >
                      <span>Contratar Plan Mensual</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ================= LEGAL, DIAN & FACTURACIÓN ELECTRÓNICA TRUST BAR ================= */}
        <div className="mt-10 sm:mt-12 p-5 sm:p-6 rounded-2xl bg-[#09111E] border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
          <div className="flex items-start gap-3">
            <FileCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block">Factura Electrónica DIAN</span>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Emitimos facturación legal para deducibilidad de costos empresariales en Colombia.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block">Contrato y Garantía Legal</span>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Contrato firmado con cláusula de confidencialidad y propiedad total del software.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Globe className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white block">Pasarelas Oficiales</span>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Pagos seguros con PSE, Bancolombia, Wompi, Nequi, Tarjeta de Crédito y Stripe.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
