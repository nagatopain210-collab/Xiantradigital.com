import React, { useState } from 'react';
import {
  Lock,
  Mail,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowRight,
  UserCheck,
  Building2,
  KeyRound,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { usePortal } from './PortalContext';
import { MetallicLogo } from '../components/MetallicLogo';

interface ClientLoginViewProps {
  onSuccess?: () => void;
}

export const ClientLoginView: React.FC<ClientLoginViewProps> = ({ onSuccess }) => {
  const { login, quickLoginAsClient, quickLoginAsAdmin, clients } = usePortal();

  const [activeTab, setActiveTab] = useState<'client' | 'admin'>('client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Por favor ingresa tanto tu correo como tu contraseña.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const result = login(email, password);
      setIsLoading(false);
      if (result.success) {
        if (onSuccess) onSuccess();
      } else {
        setErrorMessage(result.error || 'Credenciales no válidas.');
      }
    }, 400);
  };

  const handleQuickClient = (clientId: string) => {
    setErrorMessage(null);
    quickLoginAsClient(clientId);
    if (onSuccess) onSuccess();
  };

  const handleQuickAdmin = () => {
    setErrorMessage(null);
    quickLoginAsAdmin();
    if (onSuccess) onSuccess();
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4 sm:p-8">
      {/* Brand Header */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="flex justify-center mb-3">
          <MetallicLogo size="lg" variant="cyan-electric" />
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Autenticación Segura · Red Corporativa B2B</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
          {activeTab === 'client' ? 'Portal Privado de Clientes' : 'Acceso Administrativo Xiantra'}
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-md mx-auto">
          {activeTab === 'client'
            ? 'Monitorea el avance de tu página web, hitos de entrega, accesos y tickets de soporte.'
            : 'Consola interna de analíticas en tiempo real, mapas de calor, logs de IA y gestión CRM.'}
        </p>
      </div>

      {/* Role Switch Tabs */}
      <div className="grid grid-cols-2 p-1 bg-slate-900/90 border border-white/10 rounded-2xl mb-6 shadow-inner">
        <button
          type="button"
          onClick={() => {
            setActiveTab('client');
            setErrorMessage(null);
          }}
          className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'client'
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Área de Clientes</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab('admin');
            setErrorMessage(null);
          }}
          className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === 'admin'
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <KeyRound className="w-4 h-4" />
          <span>Panel Administrador</span>
        </button>
      </div>

      {/* Form Card */}
      <div className="p-6 sm:p-7 rounded-3xl bg-slate-950/90 border border-slate-800 shadow-2xl relative overflow-hidden backdrop-blur-xl">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1">{errorMessage}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Correo Electrónico Corporativo
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={
                  activeTab === 'client'
                    ? 'ej. gerencia@maquitec.co'
                    : 'admin@xiantradigital.com'
                }
                className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-sans"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Contraseña Asignada
              </label>
              <span className="text-[10px] text-slate-500 font-mono">
                {activeTab === 'client' ? 'Otorgada por Xiantra' : 'Clave de Administrador'}
              </span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-3 bg-slate-900 border border-slate-700/80 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-500 hover:text-slate-300 p-1"
                aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full min-h-[46px] rounded-xl font-bold text-xs sm:text-sm text-white flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
              activeTab === 'client'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 shadow-emerald-500/20'
                : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-cyan-500/20'
            } ${isLoading ? 'opacity-70 cursor-wait' : 'hover:scale-[1.01]'}`}
          >
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Autenticando...</span>
              </span>
            ) : (
              <>
                <span>Iniciar Sesión en el Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* 1-Click Fast Testing Credentials Section */}
        <div className="mt-6 pt-5 border-t border-slate-800/90">
          <div className="flex items-center gap-1.5 mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] font-mono font-bold text-slate-300 uppercase tracking-wide">
              Accesos Rápidos de Demostración (1 Clic)
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
            Haz clic en cualquiera de las cuentas precargadas para probar la experiencia inmediatamente sin tener que escribir:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {clients.slice(0, 2).map((cli) => (
              <button
                key={cli.id}
                type="button"
                onClick={() => handleQuickClient(cli.id)}
                className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-emerald-500/30 hover:border-emerald-500/60 text-left transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                    {cli.companyName}
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                    Cliente
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">
                  {cli.email}
                </div>
              </button>
            ))}

            <button
              type="button"
              onClick={handleQuickAdmin}
              className="p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/30 hover:border-cyan-500/60 text-left transition-all cursor-pointer group sm:col-span-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Xiantra Digital Solutions (Administrador General)</span>
                </span>
                <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  Admin Master
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                admin@xiantradigital.com · Acceso a Analíticas, Heatmap, Logs IA y CRM
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
