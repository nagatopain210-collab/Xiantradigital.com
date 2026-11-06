import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, ArrowRight, PhoneCall, Calendar, Sun, Moon, ChevronRight, ShieldCheck, Sparkles } from 'lucide-react';
import { MetallicLogo } from './MetallicLogo';
import { COMPANY_INFO } from '../data/copyData';
import { useTheme } from '../context/ThemeContext';
import { trackConversionEvent } from '../utils/analytics';

interface NavbarProps {
  onOpenQuote: (plan?: string) => void;
  onOpenContact: () => void;
  onOpenDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('#inicio');
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Soluciones', href: '#servicios' },
    { label: 'Casos de Éxito', href: '#prueba-social' },
    { label: 'Nuestro Proceso', href: '#proceso' },
    { label: 'Precios', href: '#precios' },
    { label: 'Preguntas Frecuentes', href: '#faq' },
  ];

  // Track active section on scroll for clear visual feedback
  useEffect(() => {
    const sectionIds = ['inicio', 'servicios', 'prueba-social', 'proceso', 'precios', 'faq'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(`#${sectionIds[i]}`);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when lateral drawer is open on mobile/tablet
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, label?: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setActiveSection(href);
    if (label) {
      trackConversionEvent('service_click', `Nav: ${label}`, 'navbar');
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className="Navbar fixed top-0 inset-x-0 md:sticky z-40 w-full h-16 sm:h-20 lg:h-22 border-b border-slate-200/75 dark:border-white/[0.08] bg-white/80 dark:bg-[#0B0F17]/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-[#0B0F17]/75 shadow-[0_4px_24px_rgba(2,6,23,0.12)] dark:shadow-[0_4px_24px_rgba(0,0,0,0.45)] transition-all duration-300">
        <div className="container-xiantra h-full flex items-center justify-between gap-2 sm:gap-4">
          
          {/* ================= ZONE 1: BRAND LOGO + VALUE PROPOSITION ================= */}
          <a
            href="#inicio"
            onClick={(e) => handleLinkClick(e, '#inicio', 'Logo Inicio')}
            className="relative inline-flex flex-col justify-center min-h-[44px] group focus:outline-none py-1 shrink-0"
            title="Xiantra Digital Solutions - Páginas web con IA para empresas que quieren crecer"
          >
            <div className="absolute -inset-2 bg-emerald-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="hidden sm:flex items-center">
              <MetallicLogo size="md" variant="cyan-electric" showSubtitle={false} />
            </div>
            <div className="flex sm:hidden items-center">
              <MetallicLogo size="sm" variant="cyan-electric" showSubtitle={false} />
            </div>
            <span className="hidden sm:block text-[9.5px] lg:text-[10px] font-medium text-emerald-600 dark:text-emerald-400/90 tracking-tight leading-none mt-1 group-hover:text-emerald-500 transition-colors">
              Páginas web con IA para empresas que quieren crecer
            </span>
          </a>

          {/* ================= ZONE 2: SALES-ORIENTED DESKTOP NAVIGATION ================= */}
          <nav
            aria-label="Navegación principal de ventas"
            className="hidden xl:flex items-center gap-4 2xl:gap-5 text-xs 2xl:text-sm font-semibold text-slate-700 dark:text-slate-300"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href, link.label)}
                  className={`transition-colors relative py-1.5 after:h-0.5 after:bg-gradient-to-r after:from-emerald-400 after:via-teal-400 after:to-cyan-400 after:absolute after:bottom-0 after:left-0 after:transition-all whitespace-nowrap ${
                    isActive
                      ? 'text-emerald-600 dark:text-emerald-400 after:w-full font-bold'
                      : 'hover:text-emerald-600 dark:hover:text-emerald-400 after:w-0 hover:after:w-full'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* ================= ZONE 3: CONVERSION-FOCUSED CONTROLS (TABLET & DESKTOP) ================= */}
          <div className="hidden md:flex items-center gap-2.5 lg:gap-3.5 shrink-0">
            {/* Minimalist Theme Switcher Icon */}
            <button
              onClick={toggleTheme}
              aria-label={isLight ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
              title={isLight ? 'Activar modo oscuro' : 'Activar modo claro'}
              className="w-10 h-10 rounded-xl glass-panel border border-slate-300/80 dark:border-white/10 hover:border-emerald-500/50 dark:hover:border-emerald-400/50 text-slate-700 dark:text-slate-200 flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95"
            >
              {isLight ? (
                <Sun className="w-4 h-4 text-amber-500 transition-transform duration-300 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-emerald-400 transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>

            {/* Secondary CTA: Ver ejemplos */}
            <a
              href="#prueba-social"
              onClick={(e) => handleLinkClick(e, '#prueba-social', 'Ver ejemplos Header')}
              className="inline-flex items-center gap-1.5 min-h-[42px] px-3.5 py-2 text-xs font-semibold rounded-xl glass-panel border border-slate-300/80 dark:border-white/10 hover:border-emerald-500/50 text-slate-800 dark:text-slate-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all cursor-pointer whitespace-nowrap hover:scale-[1.02]"
            >
              <span>Ver ejemplos</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
            </a>

            {/* Primary CTA + Micro-Trust Indicator */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => {
                  trackConversionEvent('quote_request', 'Solicitar diagnóstico gratis Header', 'navbar');
                  onOpenQuote('Diagnóstico Gratuito de 15 Minutos');
                }}
                className="group relative inline-flex items-center gap-2 min-h-[44px] px-4 lg:px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl text-slate-950 bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-300 border border-emerald-300/50 shadow-[0_0_20px_rgba(16,185,129,0.35)] hover:shadow-[0_0_28px_rgba(16,185,129,0.55)] cursor-pointer whitespace-nowrap transition-all duration-200 hover:scale-[1.02] active:scale-95"
              >
                <Calendar className="w-4 h-4 text-slate-950 shrink-0" />
                <span>Solicitar diagnóstico gratis</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-950 group-hover:translate-x-0.5 transition-transform" />
              </button>

              {/* Micro-trust indicator right beneath primary CTA */}
              <span className="hidden xl:inline-flex items-center gap-1.5 text-[9.5px] font-medium text-slate-600 dark:text-emerald-400/90 tracking-tight mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Especialistas en páginas web con IA · Atención personalizada
              </span>
            </div>

            {/* Tablet Hamburger Button (visible md to xl) */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="xl:hidden inline-flex items-center justify-center min-h-[44px] min-w-[44px] p-2.5 rounded-xl glass-panel text-slate-700 dark:text-slate-200 hover:text-emerald-500 dark:hover:text-emerald-400 border border-slate-300/80 dark:border-white/10 focus:outline-none transition-colors cursor-pointer"
              aria-label="Abrir menú de navegación"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* ================= MOBILE CONTROLS (< 768px: 'Solicitar diagnóstico' + Menu with 44px Touch Targets) ================= */}
          <div className="flex md:hidden items-center gap-2 shrink-0">
            <button
              onClick={() => {
                trackConversionEvent('quote_request', 'Solicitar diagnóstico Header Móvil', 'navbar_mobile');
                onOpenQuote('Diagnóstico Gratuito de 15 Minutos');
              }}
              className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3 xs:px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-300 text-slate-950 text-[11px] xs:text-xs font-extrabold tracking-tight border border-emerald-300/60 shadow-[0_0_16px_rgba(16,185,129,0.28)] active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-950 shrink-0" />
              <span>Solicitar diagnóstico</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
              className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] w-11 h-11 rounded-xl bg-slate-900/5 dark:bg-white/[0.06] hover:bg-slate-900/10 dark:hover:bg-white/[0.1] text-slate-800 dark:text-slate-100 hover:text-emerald-500 dark:hover:text-emerald-400 border border-slate-300/80 dark:border-white/12 backdrop-blur-sm focus:outline-none transition-all cursor-pointer active:scale-95 shrink-0"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* ================= SLIDE-OVER LATERAL DRAWER FOR MOBILE & TABLET (< 1280px) ================= */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden flex justify-end">
          {/* Backdrop Overlay */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs animate-in fade-in duration-200"
            aria-hidden="true"
          />

          {/* Slide-Over Drawer Panel */}
          <aside
            aria-label="Menú de navegación móvil y tablet"
            className="relative z-10 w-[min(86vw,340px)] h-full bg-white dark:bg-[#0B0F17] border-l border-slate-200 dark:border-white/10 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200"
          >
            {/* Top Drawer Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-3">
              <div className="flex flex-col">
                <MetallicLogo size="sm" variant="cyan-electric" showSubtitle={false} />
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                  Páginas web con IA para empresas
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] p-2 rounded-xl glass-panel text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer active:scale-95"
                aria-label="Cerrar menú de navegación"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links with Clear Active States */}
            <div className="flex-1 px-4 py-4 space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 px-3 pb-1.5">
                Navegación Estratégica
              </div>
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href, link.label)}
                    className={`min-h-[48px] px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between transition-all ${
                      isActive
                        ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 font-bold'
                        : 'text-slate-800 dark:text-slate-200 hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400'
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                      <span>{link.label}</span>
                    </span>
                    <ChevronRight className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`} />
                  </a>
                );
              })}

              {/* Theme Switcher Row inside Drawer */}
              <div className="pt-3 mt-3 border-t border-slate-200/80 dark:border-white/10">
                <button
                  onClick={toggleTheme}
                  className="w-full min-h-[48px] px-3.5 py-2.5 rounded-xl glass-panel flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-200 cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    {isLight ? (
                      <Sun className="w-4 h-4 text-amber-500" />
                    ) : (
                      <Moon className="w-4 h-4 text-emerald-400" />
                    )}
                    <span>Tema: {isLight ? 'Modo Claro' : 'Modo Oscuro'}</span>
                  </span>
                  <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">Cambiar</span>
                </button>
              </div>

              {/* Trust Badge inside Drawer */}
              <div className="mt-3 p-3 rounded-xl bg-emerald-500/5 dark:bg-emerald-950/20 border border-emerald-500/20 text-[11px] text-slate-600 dark:text-emerald-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Especialistas en páginas web con IA · Garantía por contrato</span>
              </div>
            </div>

            {/* Bottom Drawer Action Buttons (Thumb-Zone Accessible) */}
            <div className="p-4 sm:p-5 border-t border-slate-200/80 dark:border-white/10 bg-slate-50/70 dark:bg-slate-950/80 space-y-2.5 pb-safe">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  trackConversionEvent('quote_request', 'Solicitar diagnóstico gratis Drawer', 'mobile_drawer');
                  onOpenQuote('Diagnóstico Gratuito de 15 Minutos');
                }}
                className="w-full min-h-[48px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-300 text-slate-950 text-xs sm:text-sm font-black shadow-lg shadow-emerald-500/20 cursor-pointer active:scale-95 transition-transform"
              >
                <Calendar className="w-4 h-4 text-slate-950" />
                <span>Solicitar diagnóstico gratis</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <a
                href="#prueba-social"
                onClick={(e) => handleLinkClick(e, '#prueba-social', 'Ver ejemplos Drawer')}
                className="w-full min-h-[46px] py-2.5 px-3 rounded-xl glass-panel border border-slate-300/80 dark:border-white/10 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                <span>Ver casos de éxito y ejemplos</span>
              </a>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
                  'Hola Xiantra, deseo solicitar una cotización o diagnóstico gratuito sobre una página web con IA para mi empresa.'
                )}`}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackConversionEvent('whatsapp_click', 'WhatsApp Directo Drawer', 'mobile_drawer')}
                className="w-full min-h-[46px] py-2.5 px-4 rounded-xl bg-emerald-600/10 dark:bg-emerald-950/60 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-500" />
                <span>WhatsApp Directo 24/7</span>
              </a>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};
