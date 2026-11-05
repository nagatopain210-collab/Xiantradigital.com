import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { TopOfferBanner } from './components/TopOfferBanner';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrilogySection } from './components/TrilogySection';
import { SpeedComparisonWidget } from './components/SpeedComparisonWidget';
import { ProcessStepsSection } from './components/ProcessStepsSection';
import { DynamicSocialProofCarousel } from './components/DynamicSocialProofCarousel';
import { Services } from './components/Services';
import { Pricing } from './components/Pricing';
import { WhyUs } from './components/WhyUs';
import { CtaBanner } from './components/CtaBanner';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { ClientAdminDemoModal } from './components/ClientAdminDemoModal';
import { QuoteCalculatorModal } from './components/QuoteCalculatorModal';
import { ContactModal } from './components/ContactModal';
import { XiantraBotWidget } from './components/XiantraBotWidget';
import { BackgroundEffects } from './components/BackgroundEffects';
import { MobileBottomBar } from './components/MobileBottomBar';
import { PortalProvider } from './portal/PortalContext';
import { PortalModalContainer } from './portal/PortalModalContainer';

export default function App() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);

  const handleOpenQuote = (serviceTitle?: string) => {
    setPreselectedService(serviceTitle);
    setQuoteModalOpen(true);
  };

  useEffect(() => {
    const handleOpenDemoListener = () => setDemoModalOpen(true);
    const handleOpenQuoteListener = () => setQuoteModalOpen(true);

    window.addEventListener('open-admin-demo', handleOpenDemoListener);
    window.addEventListener('open-quote-calculator', handleOpenQuoteListener);

    return () => {
      window.removeEventListener('open-admin-demo', handleOpenDemoListener);
      window.removeEventListener('open-quote-calculator', handleOpenQuoteListener);
    };
  }, []);

  return (
    <ThemeProvider>
      <PortalProvider>
        <div className="min-h-screen text-slate-900 dark:text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-700 dark:selection:text-cyan-200 relative bg-[#F4F7FB] dark:bg-[#0B0F17] transition-colors duration-300">
        {/* 1. Dynamic Multi-Layer High-Tech Subtle Ambient Background */}
        <BackgroundEffects />

        {/* 2. Top Banner: Black Friday Noviembre Promo con Imagen & Contador */}
        <TopOfferBanner onClaimOffer={() => handleOpenQuote('Promoción Black Friday Noviembre')} />

        {/* 3. Header & Navigation with Prominent Logo & Theme Toggle */}
        <Navbar
          onOpenQuote={() => handleOpenQuote()}
          onOpenContact={() => setContactModalOpen(true)}
          onOpenDemo={() => setDemoModalOpen(true)}
        />

        <main className="flex-1 relative z-10">
          {/* 3. Header & Hero Section: Tagline, H1 Tríada Comercial, Subtítulo, CTAs & Mockup del Panel */}
          <Hero
            onOpenQuote={(service) => handleOpenQuote(service)}
            onOpenContact={() => setContactModalOpen(true)}
            onOpenDemo={() => setDemoModalOpen(true)}
          />

          <div className="divider-neon my-6 max-w-6xl mx-auto" />

          {/* 3.5. Comparativa de Velocidad y Retención (<0.8s vs 4.5s tradicional) */}
          <SpeedComparisonWidget
            onOpenAudit={() => handleOpenQuote('Auditoría de Velocidad y Conversión Gratuita')}
          />

          <div className="divider-neon my-6 max-w-6xl mx-auto" />

          {/* 4. Trilogía de Valor: Los 3 Pilares Indispensables (Web + Chatbot IA 24/7 + Panel Administrador) */}
          <TrilogySection
            onOpenBot={() => window.dispatchEvent(new CustomEvent('open-xiantra-bot'))}
            onOpenQuote={() => handleOpenQuote()}
            onOpenDemo={() => setDemoModalOpen(true)}
          />

          <div className="divider-neon my-6 max-w-6xl mx-auto" />

          {/* 5. Core Capabilities & Services con Micro-Casos por Sector */}
          <Services
            onSelectServiceForQuote={(title) => handleOpenQuote(title)}
          />

          <div className="divider-neon my-6 max-w-6xl mx-auto" />

          {/* 6. Prueba Social Dinámica con Carrusel Validado por Xiantra (Antes del Proceso y Precios) */}
          <DynamicSocialProofCarousel
            onOpenQuote={() => handleOpenQuote()}
            onOpenDemo={() => setDemoModalOpen(true)}
          />

          <div className="divider-neon my-6 max-w-6xl mx-auto" />

          {/* 7. Proceso Llave en Mano en 3 Pasos (Línea de Tiempo Horizontal) */}
          <ProcessStepsSection
            onOpenQuote={() => handleOpenQuote('Diagnóstico Estratégico de 15 Minutos')}
            onOpenDemo={() => setDemoModalOpen(true)}
          />

          <div className="divider-neon my-6 max-w-6xl mx-auto" />

          {/* 8. Pricing con Selector COP/USD + Sello Garantía 90 Días + Facturación DIAN */}
          <Pricing
            onOpenQuote={(tier) => handleOpenQuote(tier)}
            onOpenDemo={() => setDemoModalOpen(true)}
          />

          <div className="divider-neon my-6 max-w-6xl mx-auto" />

          {/* 13. Why Us & Interactive Chatbot Experience */}
          <WhyUs />

          <div className="divider-neon my-6 max-w-6xl mx-auto" />

          {/* 14. Interactive B2B FAQ */}
          <FAQ />

          {/* 15. Final Call to Action Conversion Banner */}
          <CtaBanner
            onOpenQuote={() => handleOpenQuote()}
            onOpenContact={() => setContactModalOpen(true)}
          />
        </main>

        {/* Semantic Footer */}
        <Footer
          onOpenContact={() => setContactModalOpen(true)}
          onOpenQuote={() => handleOpenQuote()}
        />

        {/* Interactive Client Admin & Web Preview Demo Modal (Plus) */}
        <ClientAdminDemoModal
          isOpen={demoModalOpen}
          onClose={() => setDemoModalOpen(false)}
          onOpenQuote={() => handleOpenQuote()}
        />

        {/* Interactive Project Quotation Calculator in COP */}
        <QuoteCalculatorModal
          isOpen={quoteModalOpen}
          onClose={() => setQuoteModalOpen(false)}
          preselectedService={preselectedService}
        />

        {/* Strategic Call / Demo Modal */}
        <ContactModal
          isOpen={contactModalOpen}
          onClose={() => setContactModalOpen(false)}
        />

        {/* Xiantra Bot: Corporate Advisor Xian in bottom right */}
        <XiantraBotWidget />

        {/* Official Client Portal & Master Admin Dashboard Modal Container */}
        <PortalModalContainer />

        {/* Mobile-First Fixed Thumb-Zone Navigation Bar */}
        <MobileBottomBar
          onOpenQuote={() => handleOpenQuote()}
          onOpenDemo={() => setDemoModalOpen(true)}
        />
      </div>
    </PortalProvider>
  </ThemeProvider>
  );
}
