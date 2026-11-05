import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface MetallicLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  variant?: 'metallic' | 'cyan-electric';
  iconOnly?: boolean;
}

export const MetallicLogo: React.FC<MetallicLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  variant = 'cyan-electric',
  iconOnly = false,
}) => {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const heightClasses = {
    xs: 'h-6 sm:h-7',
    sm: 'h-8 sm:h-9',
    md: 'h-11 sm:h-12',
    lg: 'h-14 sm:h-16',
    xl: 'h-16 sm:h-20',
  }[size];

  const uniqueId = React.useId().replace(/:/g, '');

  return (
    <div className={`inline-flex items-center gap-3 select-none group ${className}`}>
      <svg
        viewBox={iconOnly ? '0 0 98 84' : '0 0 330 84'}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${heightClasses} w-auto object-contain transition-all duration-300 group-hover:scale-[1.03]`}
        style={{
          filter: isLight
            ? 'drop-shadow(0 2px 10px rgba(2, 132, 199, 0.18))'
            : variant === 'cyan-electric'
            ? 'drop-shadow(0 2px 14px rgba(56, 189, 248, 0.25))'
            : 'drop-shadow(0 2px 10px rgba(226, 232, 240, 0.15))',
        }}
        aria-label="Xiantra Digital Solutions"
      >
        <defs>
          {/* Electric Cyan & Cobalt Gradient for X Mark */}
          <linearGradient id={`x-primary-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={variant === 'cyan-electric' ? (isLight ? '#0284C7' : '#7DD3FC') : '#FFFFFF'} />
            <stop offset="30%" stopColor={variant === 'cyan-electric' ? (isLight ? '#0369A1' : '#38BDF8') : '#E2E8F0'} />
            <stop offset="65%" stopColor={variant === 'cyan-electric' ? '#2563EB' : '#94A3B8'} />
            <stop offset="100%" stopColor={variant === 'cyan-electric' ? '#1E3A8A' : '#64748B'} />
          </linearGradient>

          {/* Dynamic Orbital Ring Gradient */}
          <linearGradient id={`orbit-${uniqueId}`} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={variant === 'cyan-electric' ? '#1E3A8A' : '#64748B'} stopOpacity="0.65" />
            <stop offset="40%" stopColor={variant === 'cyan-electric' ? '#0284C7' : '#E2E8F0'} stopOpacity="0.98" />
            <stop offset="75%" stopColor={isLight ? '#38BDF8' : '#FFFFFF'} stopOpacity="1" />
            <stop offset="100%" stopColor={variant === 'cyan-electric' ? '#0284C7' : '#94A3B8'} stopOpacity="0.88" />
          </linearGradient>

          {/* Adaptive Titanium Sheen for Wordmark (Dark vs Light Mode) */}
          <linearGradient id={`text-sheen-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="85%">
            <stop offset="0%" stopColor={isLight ? '#0F172A' : '#FFFFFF'} />
            <stop offset="45%" stopColor={isLight ? '#1E293B' : '#F8FAFC'} />
            <stop offset="80%" stopColor={isLight ? '#334155' : '#E2E8F0'} />
            <stop offset="100%" stopColor={isLight ? '#0284C7' : '#94A3B8'} />
          </linearGradient>

          {/* Specular Depth Filter */}
          <filter id={`specular-${uniqueId}`} x="-12%" y="-12%" width="124%" height="124%">
            <feDropShadow
              dx="0"
              dy="1.5"
              stdDeviation="1.8"
              floodColor={isLight ? '#0F172A' : '#000000'}
              floodOpacity={isLight ? '0.2' : '0.65'}
            />
          </filter>
        </defs>

        {/* ================= ICON MARK: STYLIZED X WITH ORBITAL RING ================= */}
        <g id="monogram" filter={`url(#specular-${uniqueId})`}>
          {/* Back segment of the Orbital Ellipse */}
          <path
            d="M12 58 C2 46, 12 28, 42 16 C62 8, 80 12, 86 24 C88 28, 85 32, 79 34 C73 36, 68 33, 65 29 C60 21, 48 18, 34 23 C18 29, 13 42, 20 50 C24 55, 30 58, 38 60 L35 64 C25 62, 17 61, 12 58 Z"
            fill={`url(#orbit-${uniqueId})`}
            opacity="0.92"
          />

          {/* Primary Left Diagonal of X */}
          <path
            d="M22 20 L39 20 L68 66 L51 66 Z"
            fill={`url(#x-primary-${uniqueId})`}
          />

          {/* Primary Right Diagonal of X (Faceted geometric cut) */}
          <path
            d="M63 20 L80 20 L27 66 L10 66 Z"
            fill={`url(#x-primary-${uniqueId})`}
          />

          {/* Central Intersection Bevel / Specular Highlight */}
          <polygon
            points="39,39 51,39 45,49"
            fill="#FFFFFF"
            opacity={isLight ? '0.75' : '0.5'}
          />

          {/* Front segment of the Orbital Ellipse sweeping forward */}
          <path
            d="M7 66 C-1 54, 8 36, 32 24 C34 23, 37 24, 38 27 C39 29, 37 32, 34 33 C18 41, 12 53, 17 60 C23 68, 40 70, 60 62 C69 58, 77 52, 82 46 C85 43, 89 44, 90 47 C91 50, 88 54, 83 58 C74 67, 61 74, 46 76 C28 78, 14 74, 7 66 Z"
            fill={`url(#orbit-${uniqueId})`}
          />
        </g>

        {!iconOnly && (
          <>
            {/* ================= WORDMARK: XIANTRA ================= */}
            <text
              x="102"
              y="49"
              fontFamily="'Outfit', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
              fontSize="42"
              fontWeight="900"
              letterSpacing="0.015em"
              fill={`url(#text-sheen-${uniqueId})`}
            >
              Xiantra
            </text>

            {/* ================= SUBTITLE: DIGITAL SOLUTIONS ================= */}
            {showSubtitle && (
              <text
                x="104"
                y="68"
                fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
                fontSize="11.5"
                fontWeight="700"
                letterSpacing="0.29em"
                fill={isLight ? '#0284C7' : '#38BDF8'}
                className="uppercase"
                opacity="0.95"
              >
                Digital Solutions
              </text>
            )}
          </>
        )}
      </svg>
    </div>
  );
};
