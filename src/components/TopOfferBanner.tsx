import React, { useState, useEffect } from 'react';
import {
  Timer,
  ArrowRight,
  X,
  Tag,
  Copy,
  Check,
  Flame,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Gift,
  Zap,
  Sparkles,
} from 'lucide-react';
import { COMPANY_INFO } from '../data/copyData';

const blackFridayImg = '/images/black_friday_promo_1793715566161.jpg';

interface TopOfferBannerProps {
  onClaimOffer: () => void;
}

export const TopOfferBanner: React.FC<TopOfferBannerProps> = ({ onClaimOffer }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : false
  );
  const [copiedCoupon, setCopiedCoupon] = useState(false);

  // Real-time Countdown timer targeting end of November Black Friday
  const [timeLeft, setTimeLeft] = useState({
    days: 18,
    hours: 14,
    minutes: 23,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  const pad = (n: number) => n.toString().padStart(2, '0');

  const handleCopyCoupon = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('BLACK35XIANTRA');
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 2500);
  };

  const handleWhatsAppReservation = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(
      `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
        'Hola Xiantra, quiero asegurar mi cupo del Black Friday con el 35% de descuento y entrega garantizada antes de diciembre.'
      )}`,
      '_blank'
    );
  };

  return (
    <div className="relative z-40 text-slate-100 transition-all select-none">
      {/* ================= COMPACT TOP ANNOUNCEMENT BAR (MOBILE / TABLET / DESKTOP) ================= */}
      <div className="relative bg-gradient-to-r from-[#060913] via-[#091122] to-[#060913] border-b border-cyan-500/25 shadow-md overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-80" />

        <div
          className="absolute inset-y-0 right-0 w-80 md:w-[480px] pointer-events-none opacity-25 mix-blend-screen bg-cover bg-right hidden md:block"
          style={{
            backgroundImage: `url(${blackFridayImg})`,
            maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 25%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 25%, transparent 100%)',
          }}
        />

        <div className="container-xiantra py-1.5 sm:py-2 flex items-center justify-between gap-2 sm:gap-3 relative">
          {/* Main Campaign Line (Clicking toggles the detailed drawer) */}
          <div
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="flex-1 flex items-center justify-start gap-2 sm:gap-3 text-xs cursor-pointer group min-w-0"
          >
            {/* Luminous Cyber Badge */}
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-gradient-to-r from-cyan-950/90 to-blue-950/90 border border-cyan-400/40 text-cyan-300 font-mono text-[10px] sm:text-[11px] font-bold tracking-wider shrink-0">
              <Flame className="w-3 h-3 text-amber-400 fill-amber-400 animate-pulse shrink-0" />
              <span className="hidden xs:inline">BLACK FRIDAY</span>
              <span className="xs:hidden">BF</span>
            </div>

            {/* Core Offer Typography */}
            <div className="flex items-center gap-1.5 text-slate-200 text-[11px] sm:text-xs font-medium truncate">
              <span className="font-extrabold text-cyan-300 shrink-0">35% OFF</span>
              <span className="text-slate-300 truncate hidden sm:inline">en Sitios Web B2B + Agente IA</span>
              <span className="text-slate-500 hidden lg:inline">·</span>
              <span className="text-slate-400 hidden lg:inline">Panel Administrador $0 COP</span>
            </div>

            {/* Precision Monospace Digital Timer */}
            <div className="inline-flex items-center gap-1 font-mono text-[10px] sm:text-[11px] text-slate-200 bg-slate-900/90 border border-white/10 px-2 py-0.5 rounded shrink-0">
              <Timer className="w-3 h-3 text-cyan-400 shrink-0" />
              <span className="tabular-nums font-semibold tracking-tight">
                {pad(timeLeft.days)}d:{pad(timeLeft.hours)}h:{pad(timeLeft.minutes)}m:{pad(timeLeft.seconds)}s
              </span>
            </div>

            {/* 1-Click Coupon Copier Chip (Desktop) */}
            <button
              onClick={handleCopyCoupon}
              className="hidden xl:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-[11px] font-mono text-slate-300 transition-colors"
              title="Copiar cupón de descuento"
            >
              <Tag className="w-2.5 h-2.5 text-cyan-400" />
              <span>BLACK35</span>
              {copiedCoupon ? (
                <span className="text-emerald-400 font-bold ml-0.5 flex items-center gap-0.5">
                  <Check className="w-3 h-3" /> Copiado
                </span>
              ) : (
                <Copy className="w-2.5 h-2.5 text-slate-400 ml-0.5" />
              )}
            </button>

            {/* Toggle Drawer Indicator */}
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors shrink-0">
              <span className="hidden md:inline">{drawerOpen ? 'Minimizar' : 'Ver promociones'}</span>
              {drawerOpen ? (
                <ChevronUp className="w-3.5 h-3.5" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5" />
              )}
            </span>
          </div>

          {/* Right Action & Dismiss */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={onClaimOffer}
              className="inline-flex items-center gap-1 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 hover:from-cyan-300 hover:to-blue-300 transition-all duration-200 cursor-pointer shadow-sm whitespace-nowrap"
            >
              <Zap className="w-3 h-3 fill-slate-950 text-slate-950 shrink-0" />
              <span className="hidden sm:inline">Reclamar 35% OFF</span>
              <span className="sm:hidden">Reclamar</span>
              <ArrowRight className="w-3 h-3 hidden sm:inline" />
            </button>

            <button
              onClick={() => setIsVisible(false)}
              className="text-slate-400 hover:text-white p-1.5 rounded-md hover:bg-slate-800/60 transition-colors cursor-pointer"
              aria-label="Cerrar banner de Black Friday"
              title="Cerrar banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ================= EXPANDABLE HIGH-FIDELITY SHOWCASE DRAWER ================= */}
      {drawerOpen && (
        <div className="relative bg-[#070B16] border-b border-cyan-500/30 text-slate-100 shadow-2xl animate-in slide-in-from-top-2 fade-in-50 duration-300 overflow-hidden">
          {/* Subtle Ambient Emerald & Cyan Aura Backgrounds */}
          <div className="absolute -top-16 left-1/4 w-96 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 right-1/4 w-96 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent pointer-events-none" />

          <div className="container-xiantra py-5 sm:py-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center">
              {/* Left: High-Definition 16:9 Black Friday 3D Image Banner with Luminous Aura */}
              <div className="lg:col-span-4 relative rounded-xl overflow-hidden border border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.18)] hover:shadow-[0_0_35px_rgba(16,185,129,0.25)] transition-all duration-300 group">
                <img
                  src={blackFridayImg}
                  alt="Black Friday Noviembre Xiantra Digital Solutions"
                  width={640}
                  height={360}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-40 sm:h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex flex-wrap items-center justify-between gap-1 text-[10px] sm:text-[11px] font-mono">
                  <span className="text-cyan-300 font-semibold bg-slate-950/90 border border-cyan-500/40 px-2 py-0.5 rounded shadow-sm">
                    Entrega antes de Diciembre
                  </span>
                  <span className="text-emerald-400 font-bold bg-slate-950/90 border border-emerald-500/40 px-2 py-0.5 rounded shadow-sm animate-pulse">
                    Cupos: 3 Disponibles
                  </span>
                </div>
              </div>

              {/* Center & Right: 3 Discounted Tiers Cards with Emerald & Cyan Aura */}
              <div className="lg:col-span-8 space-y-4 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                      <span>Tarifas Especiales de Black Friday · Noviembre 2026</span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold">
                        <Sparkles className="w-2.5 h-2.5" /> 35% OFF
                      </span>
                    </h3>
                    <p className="text-xs text-slate-300">
                      Selecciona tu plan con entrega llave en mano garantizada.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-slate-400">Cupón:</span>
                    <button
                      onClick={handleCopyCoupon}
                      className="px-2.5 py-1 rounded bg-slate-900 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold hover:bg-slate-800 hover:border-cyan-400 transition-all cursor-pointer flex items-center gap-1.5 shadow-[0_0_12px_rgba(6,182,212,0.2)] active:scale-95"
                    >
                      <span>BLACK35XIANTRA</span>
                      {copiedCoupon ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                {/* 3 Pricing Cards: Horizontal Touch Swipe on Mobile, 3-col Grid on Tablet/Desktop */}
                <div className="flex sm:grid sm:grid-cols-3 gap-3.5 overflow-x-auto snap-x-touch pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
                  {/* Tier 1: Landing Page */}
                  <div className="min-w-[250px] sm:min-w-0 snap-center p-4 rounded-xl bg-slate-900/90 border border-slate-800/90 hover:border-cyan-500/50 shadow-sm hover:shadow-[0_0_22px_rgba(6,182,212,0.22)] transition-all duration-300 shrink-0 relative group">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block font-semibold">
                      Landing Page Rápida
                    </span>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-xl font-bold font-mono text-white">$519.999</span>
                      <span className="text-xs text-slate-500 line-through">$799.999</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-semibold block mt-0.5">
                      Ahorras $280.000 COP (35%)
                    </span>
                    <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                      Carga &lt; 0.8s, botón WhatsApp y estructura para captar clientes en campañas.
                    </p>
                  </div>

                  {/* Tier 2: Featured (Corporativo + Agente IA) with Vibrant Emerald & Cyan Aura */}
                  <div className="min-w-[250px] sm:min-w-0 snap-center p-4 rounded-xl bg-gradient-to-b from-[#0a1829] via-[#091522] to-slate-900/95 border-2 border-emerald-400/70 shadow-[0_0_28px_rgba(16,185,129,0.25)] hover:shadow-[0_0_36px_rgba(16,185,129,0.38)] relative shrink-0 transition-all duration-300 ring-1 ring-emerald-500/20 group">
                    {/* Top Highlight Badge */}
                    <div className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-[9px] uppercase tracking-wider shadow-sm flex items-center gap-1 font-mono">
                      <Sparkles className="w-2.5 h-2.5" /> Más Elegido
                    </div>

                    <span className="text-[10px] font-mono text-cyan-300 uppercase block font-bold">
                      Corporativo + Agente IA (Top)
                    </span>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-xl font-bold font-mono text-cyan-200">$974.999</span>
                      <span className="text-xs text-slate-400 line-through">$1.499.999</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold block mt-0.5">
                      Ahorras $525.000 COP (35%)
                    </span>
                    <p className="text-[11px] text-slate-200 mt-2 leading-relaxed font-medium">
                      Web corporativa multi-sección + Chatbot IA 24/7 en WhatsApp oficial.
                    </p>
                  </div>

                  {/* Tier 3: E-Commerce */}
                  <div className="min-w-[250px] sm:min-w-0 snap-center p-4 rounded-xl bg-slate-900/90 border border-slate-800/90 hover:border-emerald-500/50 shadow-sm hover:shadow-[0_0_22px_rgba(16,185,129,0.22)] transition-all duration-300 shrink-0 relative group">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block font-semibold">
                      E-Commerce Completo
                    </span>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-xl font-bold font-mono text-white">$1.819.999</span>
                      <span className="text-xs text-slate-500 line-through">$2.799.999</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-semibold block mt-0.5">
                      Ahorras $980.000 COP (35%)
                    </span>
                    <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                      Catálogo con pasarelas Wompi / PSE y cobro directo sin comisiones extras.
                    </p>
                  </div>
                </div>

                {/* Bottom Value & Action Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Gift className="w-4 h-4 text-cyan-400 shrink-0 animate-bounce" />
                    <span>
                      <strong className="text-white">Panel Administrador GRATIS de por vida</strong> ($1.200.000 COP).
                    </span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={handleWhatsAppReservation}
                      className="flex-1 sm:flex-initial min-h-[42px] px-3.5 py-2 rounded-lg text-xs font-semibold text-emerald-300 bg-emerald-950/70 border border-emerald-600/60 hover:bg-emerald-900/70 shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_22px_rgba(16,185,129,0.35)] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5 shrink-0" />
                      <span>Apartar por WhatsApp</span>
                    </button>
                    <button
                      onClick={() => {
                        setDrawerOpen(false);
                        onClaimOffer();
                      }}
                      className="flex-1 sm:flex-initial min-h-[42px] px-4 py-2 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-[0_0_18px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.45)] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>Abrir Cotizador</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
