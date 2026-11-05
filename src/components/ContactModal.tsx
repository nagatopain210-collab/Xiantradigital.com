import React, { useState } from 'react';
import { X, Calendar, Check, Send } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceOfInterest, setServiceOfInterest] = useState('Desarrollo Web AI');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[90dvh] overflow-y-auto bg-[#0B0F19] rounded-2xl border border-slate-700/80 shadow-2xl p-5 sm:p-8 text-slate-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 min-h-[40px] min-w-[40px] flex items-center justify-center text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!success ? (
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2 pr-8">
              <Calendar className="w-4 h-4 shrink-0" />
              <span>Sesión Estratégica &amp; Demo Técnica</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              Agenda tu consulta con nuestros ingenieros
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mb-5">
              Evaluaremos tu situación tecnológica actual y diseñaremos una propuesta para escalar tus canales de venta y automatización.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Sofia Reyes"
                    className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Empresa / Negocio *</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Ej. Grupo Nexus"
                    className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Correo Electrónico *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sofia@gruponexus.com"
                    className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">Teléfono / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+57 300 123 4567"
                    className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">Servicio de Mayor Interés</label>
                <select
                  value={serviceOfInterest}
                  onChange={(e) => setServiceOfInterest(e.target.value)}
                  className="w-full min-h-[44px] bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-2.5 text-base sm:text-sm text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="Desarrollo Web AI">Página Web Potenciada con Inteligencia Artificial</option>
                  <option value="E-Commerce Inteligente">Tienda E-Commerce &amp; Carrito de Compra Optimizado</option>
                  <option value="Chatbot WhatsApp">Chatbot Inteligente WhatsApp &amp; CRM</option>
                  <option value="Ecosistema Integral">Ecosistema Integral (Web + E-Commerce + IA)</option>
                  <option value="Consultoría Técnica">Consultoría y Auditoría de Conversión</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Detalles del proyecto o requerimiento actual
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Cuéntanos sobre tu modelo de negocio, objetivos o desafíos actuales..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-base sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-slate-400">
                  Respuesta garantizada en &lt; 2h hábiles
                </span>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto min-h-[46px] inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-semibold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Enviando...' : 'Solicitar Llamada'}</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-14 h-14 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">
              ¡Solicitud Recibida Correctamente!
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
              Gracias, {name}. Uno de nuestros líderes técnicos se pondrá en contacto contigo a través de {email} o WhatsApp en las próximas 2 horas para coordinar la sesión estratégica.
            </p>
            <div className="pt-4">
              <button
                onClick={() => {
                  setSuccess(false);
                  onClose();
                }}
                className="min-h-[44px] px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-medium cursor-pointer"
              >
                Entendido
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
