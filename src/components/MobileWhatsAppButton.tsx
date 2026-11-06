import React, { memo } from 'react';
import { trackConversionEvent } from '../utils/analytics';

export const MobileWhatsAppButton: React.FC = memo(() => {
  const handleClick = () => {
    trackConversionEvent('whatsapp_click', {
      source: 'mobile_floating_whatsapp_component',
      phone: '573508569464',
    });
  };

  return (
    <div
      className="fixed bottom-4 left-4 z-40 md:hidden pb-safe pointer-events-none"
      style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
    >
      <a
        href="https://wa.me/573508569464"
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-label="Contactar por WhatsApp oficial al +57 350 856 9464"
        className="pointer-events-auto relative w-14 h-14 rounded-full bg-gradient-to-tr from-[#128C7E] via-[#20BD5A] to-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)] border-2 border-white/25 flex items-center justify-center active:scale-95 transition-transform duration-200 will-change-transform select-none"
      >
        {/* Subtle GPU-Composited Pulse Ring (transform + opacity only, zero blur repaint) */}
        <span
          className="absolute inset-0 rounded-full border-2 border-[#25D366] opacity-55 animate-ping pointer-events-none"
          style={{ animationDuration: '2.8s' }}
          aria-hidden="true"
        />

        {/* Official WhatsApp SVG Logo Only */}
        <svg
          viewBox="0 0 24 24"
          width="30"
          height="30"
          fill="currentColor"
          className="relative z-10 drop-shadow-xs"
          aria-hidden="true"
        >
          <path d="M12.031 2C6.508 2 2.023 6.485 2.023 12.007c0 1.766.461 3.49 1.337 5.01L2 22l5.122-1.343a9.967 9.967 0 0 0 4.909 1.296h.004c5.522 0 10.007-4.485 10.007-10.007C22.042 6.485 17.553 2 12.031 2Zm5.845 14.158c-.246.694-1.432 1.328-1.988 1.411-.511.077-1.158.109-1.87-.117-.432-.137-.986-.32-1.698-.627-2.99-1.291-4.943-4.301-5.092-4.5-.149-.199-1.216-1.618-1.216-3.086 0-1.468.769-2.19 1.042-2.488.273-.298.596-.373.794-.373.199 0 .397.002.571.01.183.009.428-.07.67.512.248.596.844 2.061.918 2.21.075.149.124.323.025.522-.099.199-.149.323-.298.497-.149.174-.313.389-.447.522-.149.149-.304.311-.131.609.174.298.771 1.273 1.656 2.062 1.139 1.015 2.098 1.33 2.396 1.479.298.149.472.124.646-.075.174-.199.745-.869.943-1.167.199-.298.397-.248.67-.149.273.099 1.738.82 2.036.968.298.149.497.224.571.348.075.124.075.72-.171 1.414Z" />
        </svg>

        {/* Subtle Online Dot */}
        <span className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-[#25D366] border-2 border-white z-20" />
      </a>
    </div>
  );
});

MobileWhatsAppButton.displayName = 'MobileWhatsAppButton';
