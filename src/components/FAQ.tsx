import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare, ShieldCheck, FileCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/copyData';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      category: 'Inversión & Retorno',
      question: '¿Cuánto cuesta y en cuánto tiempo recupero mi inversión?',
      answer:
        'Nuestros proyectos en promoción inician desde $519.999 COP ($129 USD) para Landing Pages y $974.999 COP ($239 USD) para sistemas web corporativos con agente de IA. No hay costos ocultos ni mensualidades forzadas. La mayoría de nuestros clientes recuperan el 100% de su inversión en los primeros 30 a 60 días gracias al aumento en cotizaciones y clientes captados fuera de horario comercial.',
    },
    {
      category: 'Facturación & Legalidad',
      question: '¿Emiten Factura Electrónica legal para deducir costos ante la DIAN?',
      answer:
        'Sí, absolutamente. En Xiantra operamos con total respaldo jurídico y formal en Colombia. Emitimos Factura Electrónica oficial ante la DIAN con todos los requisitos tributarios de ley para personas jurídicas y personas naturales con actividad comercial, garantizando la deducibilidad tributaria de tu inversión.',
    },
    {
      category: 'Esfuerzo del Cliente',
      question: '¿Cuánto esfuerzo o tiempo tengo que poner de mi parte?',
      answer:
        'Cero esfuerzo técnico. Nuestro servicio es 100% Llave en Mano: solo requerimos una sesión inicial de 15 minutos y acceso a tu catálogo o lista de servicios. Nosotros nos encargamos de la redacción persuasiva de ventas, la arquitectura web, el entrenamiento del chatbot y la conexión a pasarelas bancarias. No tienes que programar ni redactar nada.',
    },
    {
      category: 'Situación Actual',
      question: '¿Y si mi empresa ya tiene una página web antigua o lenta?',
      answer:
        'El 80% de nuestros clientes ya tenían un sitio web cuando llegaron a nosotros, pero tardaba en cargar, no respondía en WhatsApp y no les traía clientes. Evaluamos tu página actual gratis en 15 minutos y te mostramos con métricas exactas por qué tus visitantes no están convirtiendo y cuánto dinero estás perdiendo frente a competidores que sí responden al instante.',
    },
    {
      category: 'Compatibilidad de Industria',
      question: '¿Esto realmente sirve para el tipo de empresa que tengo?',
      answer:
        'Si tu negocio vende productos o servicios y tus clientes potenciales usan Google o WhatsApp para cotizar, este sistema funciona para ti. Hemos generado resultados medibles para empresas de maquinaria industrial, importadores, mayoristas, e-commerce, consultoras, clínicas médicas y prestadores de servicios en Colombia, México, EE. UU. y España.',
    },
    {
      category: 'Tiempos de Entrega',
      question: '¿Cuánto tiempo tarda en estar lista y funcionando?',
      answer:
        'No tardamos meses como las agencias convencionales. Entregamos Landing Pages comerciales listas en 7 días hábiles, y páginas web corporativas con agente de WhatsApp en 10 a 14 días hábiles, con pruebas de velocidad y carga instantánea garantizadas.',
    },
    {
      category: 'Garantía & Seguridad',
      question: '¿Qué garantía tengo de que esto funcionará para mi empresa?',
      answer:
        'Te damos 90 días de garantía de satisfacción técnica por contrato. Si algo no opera con máxima velocidad o necesitas ajustes en el bot de WhatsApp, nuestro equipo lo soluciona de inmediato sin cobrarte un solo peso. Además, eres el dueño legal del 100% de tu código y tu dominio.',
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section-padding-fluid relative">
      <div className="container-xiantra max-w-5xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-3 bg-emerald-950/70 border border-emerald-500/30 px-3.5 py-1.5 rounded-full">
            <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Resolución de Dudas Frecuentes</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Transparencia y Cero Riesgo</span>
          </div>
          <h2 className="heading-section-fluid font-black text-slate-900 dark:text-white tracking-tight">
            Resolvemos tus dudas antes de que tomes una decisión
          </h2>
          <p className="mt-3 body-fluid text-slate-600 dark:text-slate-300">
            Respuestas honestas sobre costos, tiempos de entrega, factura electrónica DIAN y garantía de resultados.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5 sm:space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`rounded-2xl transition-all duration-300 bg-[#09111E] border ${
                  isOpen
                    ? 'border-emerald-500/50 shadow-xl shadow-emerald-950/20 ring-1 ring-emerald-500/20'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full min-h-[60px] text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block font-mono">
                      {faq.category}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-white tracking-tight block">
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-emerald-500/20 text-emerald-400 rotate-180' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/80 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Contact Help Strip */}
        <div className="mt-10 sm:mt-12 text-center p-5 sm:p-6 rounded-2xl bg-[#09111E] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <span className="text-xs font-bold text-white block">
              ¿Tienes una pregunta específica sobre tu empresa o pasarelas de pago?
            </span>
            <span className="text-xs text-slate-400">
              Nuestro equipo comercial te responde en menos de 10 minutos por WhatsApp.
            </span>
          </div>

          <a
            href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
              'Hola Xiantra, estuve revisando las preguntas frecuentes en la web y tengo una consulta sobre la implementación para mi empresa.'
            )}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Consultar por WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
