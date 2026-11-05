import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/copyData';
import { Mail, MapPin, ArrowUp, MessageSquare, ShieldCheck, Globe, Building2, KeyRound } from 'lucide-react';
import { MetallicLogo } from './MetallicLogo';
import { usePortal } from '../portal/PortalContext';

interface FooterProps {
  onOpenContact: () => void;
  onOpenQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact, onOpenQuote }) => {
  const [activeLegalModal, setActiveLegalModal] = useState<'privacy' | 'terms' | null>(null);
  const { openPortal } = usePortal();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-white/[0.08] bg-white/90 dark:bg-[#020407]/95 text-slate-600 dark:text-slate-300 text-sm relative">
      <div className="container-xiantra pt-14 sm:pt-16 pb-28 lg:pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-14">
          {/* Column 1 & 2: Brand & Mission with Metallic Logo */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-4 sm:space-y-5">
            <div className="flex items-center gap-3">
              <a href="#inicio" className="focus:outline-none group inline-block" title="Xiantra Digital Solutions">
                <MetallicLogo size="lg" variant="cyan-electric" />
              </a>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm">
              Ingeniería web de alta fidelidad, plataformas de e-commerce optimizadas para conversión y automatización inteligente con agentes de IA para empresas modernas.
            </p>

            <div className="text-xs text-slate-500 dark:text-slate-400 space-y-2 pt-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <span>{COMPANY_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>{COMPANY_INFO.schedule}</span>
              </div>
            </div>

            {/* Micro Trust Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl glass-panel text-[11px] text-cyan-700 dark:text-cyan-300 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
              <span>100% Propiedad del Software y Código</span>
            </div>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block mb-3.5">
              Navegación
            </span>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#inicio" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Servicios de Desarrollo &amp; IA
                </a>
              </li>
              <li>
                <a href="#prueba-social" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Prueba Social Dinámica
                </a>
              </li>


              <li>
                <a href="#precios" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Precios en COP
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenQuote}
                  className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors text-left cursor-pointer"
                >
                  Calculadora de Presupuesto
                </button>
              </li>
              <li className="pt-2 border-t border-slate-200 dark:border-white/10">
                <button
                  onClick={() => openPortal('login')}
                  className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Portal de Clientes (/login-cliente)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => openPortal('admin')}
                  className="text-cyan-600 dark:text-cyan-400 font-bold hover:underline transition-colors text-left cursor-pointer flex items-center gap-1.5"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Panel Administrativo Interno</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Main Services */}
          <div>
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block mb-3.5">
              Especialidades
            </span>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#servicios" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Páginas Web con IA (React/Vite)
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  E-Commerce &amp; Carritos Inteligentes
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Chatbots WhatsApp Cloud API
                </a>
              </li>

              <li>
                <a href="#servicios" className="hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
                  Auditoría Core Web Vitals 99+
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Direct B2B Contact */}
          <div className="sm:col-span-2 lg:col-span-1">
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block mb-3.5">
              Contacto B2B
            </span>
            <div className="space-y-3.5 text-xs">
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
              >
                <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0" />
                <span className="truncate">{COMPANY_INFO.email}</span>
              </a>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                <span>WhatsApp Soporte Directo</span>
              </a>

              <div className="pt-1">
                <button
                  onClick={onOpenContact}
                  className="w-full min-h-[44px] py-2.5 px-3.5 text-center rounded-xl glass-panel hover:border-cyan-500/40 text-slate-900 dark:text-slate-100 text-xs font-bold transition-all cursor-pointer shadow-sm"
                >
                  Agendar Sesión Técnica
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 border-t border-slate-200 dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="text-center sm:text-left">
            <p className="text-slate-700 dark:text-slate-300">
              © {new Date().getFullYear()} {COMPANY_INFO.name}. Todos los derechos reservados.
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Dominio oficial: <span className="text-cyan-600 dark:text-cyan-400 font-mono">{COMPANY_INFO.domain}</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <button
              onClick={() => setActiveLegalModal('privacy')}
              className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              Política de Privacidad
            </button>
            <button
              onClick={() => setActiveLegalModal('terms')}
              className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              Términos de Servicio
            </button>
            <button
              onClick={scrollToTop}
              className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-xl glass-panel text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Volver arriba"
              title="Volver arriba"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Legal Modal */}
      {activeLegalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel-neon rounded-3xl p-6 sm:p-8 max-w-lg w-full text-slate-800 dark:text-slate-200 space-y-4 shadow-2xl">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {activeLegalModal === 'privacy' ? 'Política de Privacidad' : 'Términos de Servicio'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeLegalModal === 'privacy'
                ? 'En Xiantra Digital Solutions (www.xiantradigital.com) protegemos la información empresarial de nuestros clientes de conformidad con las normativas internacionales de protección de datos (GDPR y regulaciones locales). Ningún dato provisto en nuestras consultas técnicas o integraciones de API es compartido con terceros.'
                : 'Todos los proyectos desarrollados por Xiantra Digital Solutions transfieren el 100% de la propiedad intelectual y código fuente al cliente al completarse el cronograma pactado. Garantizamos 90 días de soporte técnico de garantía post-lanzamiento en todos nuestros desarrollos.'}
            </p>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveLegalModal(null)}
                className="min-h-[42px] px-5 py-2.5 btn-xiantra-primary text-xs font-semibold rounded-xl text-white transition-colors cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
