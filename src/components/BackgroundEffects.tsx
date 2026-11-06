import React, { useEffect, useRef, memo } from 'react';

interface GalaxyStar {
  x: number;
  y: number;
  radius: number;
  color: string;
  twinkle: number;
  twinkleSpeed: number;
  baseAlpha: number;
  vx: number;
  vy: number;
}

interface ConstellationNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  glowColor: string;
  pulse: number;
  pulseSpeed: number;
  driftPhase: number;
}

interface CyberPulse {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  progress: number;
  speed: number;
  color: string;
}

interface ShootingStreak {
  x: number;
  y: number;
  length: number;
  speedX: number;
  speedY: number;
  opacity: number;
  maxOpacity: number;
  width: number;
  color: string;
}

export const BackgroundEffects: React.FC = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;

    let animationFrameId = 0;
    let isTabVisible = !document.hidden;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const isMobile = width < 768;

    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: isMobile ? 120 : 180,
      isActive: false,
    };

    // 1. Estrellas de fondo de la Galaxia (twinkling starfield)
    const starCount = isMobile ? 48 : 80;
    const stars: GalaxyStar[] = [];
    const starColors = ['#ffffff', '#67e8f9', '#a7f3d0', '#38bdf8', '#34d399'];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * (isMobile ? 1.4 : 1.7) + 0.5,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.02 + Math.random() * 0.035,
        baseAlpha: 0.35 + Math.random() * 0.5,
        vx: (Math.random() - 0.5) * 0.08,
        vy: -0.05 - Math.random() * 0.12,
      });
    }

    // 2. Nodos de la Red Galáctica / Constelación
    const nodeCount = isMobile ? 28 : 50;
    const nodes: ConstellationNode[] = [];
    const colorThemes = [
      { fill: 'rgba(52, 211, 153, 0.95)', glow: 'rgba(52, 211, 153, 0.35)' }, // Verde Menta brillante
      { fill: 'rgba(56, 189, 248, 0.95)', glow: 'rgba(56, 189, 248, 0.35)' }, // Cian Eléctrico
      { fill: 'rgba(6, 182, 212, 0.90)', glow: 'rgba(6, 182, 212, 0.30)' },  // Azul Cian
      { fill: 'rgba(16, 185, 129, 0.90)', glow: 'rgba(16, 185, 129, 0.30)' }, // Esmeralda Fintech
    ];

    for (let i = 0; i < nodeCount; i++) {
      const theme = colorThemes[i % colorThemes.length];
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.34,
        vy: -0.1 - Math.random() * 0.24,
        radius: Math.random() * 1.6 + 1.2,
        color: theme.fill,
        glowColor: theme.glow,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.016 + Math.random() * 0.02,
        driftPhase: Math.random() * Math.PI * 2,
      });
    }

    const pulses: CyberPulse[] = [];
    const streaks: ShootingStreak[] = [];

    const createShootingStreak = () => {
      const maxStreaks = isMobile ? 1 : 2;
      if (streaks.length < maxStreaks && Math.random() < 0.016) {
        const startX = Math.random() * width * 0.85;
        const startY = Math.random() * (height * 0.45);
        const angle = (26 + Math.random() * 10) * (Math.PI / 180);
        const speed = 5 + Math.random() * 4;
        const length = isMobile ? 90 : 130;
        const colors = ['#34d399', '#38bdf8', '#06b6d4'];

        streaks.push({
          x: startX,
          y: startY,
          length,
          speedX: Math.cos(angle) * speed,
          speedY: Math.sin(angle) * speed,
          opacity: 0,
          maxOpacity: 0.65 + Math.random() * 0.25,
          width: 1.4,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      if (!mouse.isActive) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.isActive = true;
      }
    };

    const handleMouseLeave = () => {
      mouse.isActive = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
        if (!mouse.isActive) {
          mouse.x = mouse.targetX;
          mouse.y = mouse.targetY;
          mouse.isActive = true;
        }
      }
    };

    const handleTouchEnd = () => {
      mouse.isActive = false;
    };

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible && !animationFrameId) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const maxDistance = isMobile ? 115 : 142;
    const maxDistanceSq = maxDistance * maxDistance;

    const render = () => {
      if (!isTabVisible) {
        animationFrameId = 0;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      if (mouse.isActive) {
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;
      }

      // A. Renderizar Estrellas de Galaxia (Twinkling Starfield)
      for (let s = 0; s < stars.length; s++) {
        const star = stars[s];
        star.twinkle += star.twinkleSpeed;
        star.y += star.vy;
        star.x += star.vx;

        if (star.y < -5) star.y = height + 5;
        if (star.x < -5) star.x = width + 5;
        if (star.x > width + 5) star.x = -5;

        const currentAlpha = Math.max(0.1, Math.min(1, star.baseAlpha + Math.sin(star.twinkle) * 0.35));

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentAlpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      createShootingStreak();

      // B. Renderizar Meteoros / Estrellas Fugaces
      for (let s = streaks.length - 1; s >= 0; s--) {
        const streak = streaks[s];
        streak.x += streak.speedX;
        streak.y += streak.speedY;

        if (streak.opacity < streak.maxOpacity) {
          streak.opacity += 0.05;
        }

        const tailX = streak.x - (streak.speedX / 7) * streak.length;
        const tailY = streak.y - (streak.speedY / 7) * streak.length;

        const grad = ctx.createLinearGradient(tailX, tailY, streak.x, streak.y);
        grad.addColorStop(0, 'rgba(0,0,0,0)');
        grad.addColorStop(0.65, streak.color);
        grad.addColorStop(1, '#ffffff');

        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = streak.width;
        ctx.lineCap = 'round';
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(streak.x, streak.y);
        ctx.stroke();

        if (streak.x > width + 180 || streak.y > height + 180) {
          streaks.splice(s, 1);
        }
      }

      // C. Renderizar Nodos de Constelación y Líneas Conectoras
      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i];

        p.driftPhase += 0.009;
        p.x += p.vx + Math.sin(p.driftPhase) * 0.16;
        p.y += p.vy;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        p.pulse += p.pulseSpeed;
        const currentRadius = p.radius + Math.sin(p.pulse) * 0.5;

        // Atracción gravitatoria suave en móvil y desktop
        if (mouse.isActive) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distSq = dx * dx + dy * dy;
          const mouseRadiusSq = mouse.radius * mouse.radius;

          if (distSq < mouseRadiusSq && distSq > 4) {
            const dist = Math.sqrt(distSq);
            const force = (mouse.radius - dist) / mouse.radius;
            p.x += (dx / dist) * force * 0.7;
            p.y += (dy / dist) * force * 0.7;

            ctx.beginPath();
            ctx.strokeStyle = `rgba(52, 211, 153, ${0.35 * force})`;
            ctx.lineWidth = 1 * force;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }

        // Halo concéntrico exterior (brillo estelar sin saturar GPU)
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p.glowColor;
        ctx.fill();

        // Núcleo brillante de la estrella
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Filamentos cósmicos entre estrellas
        for (let j = i + 1; j < nodes.length; j++) {
          const p2 = nodes[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistanceSq) {
            const dist = Math.sqrt(distSq);
            const alpha = 1 - dist / maxDistance;

            ctx.beginPath();
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.28})`;
            ctx.lineWidth = alpha * 0.95;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();

            // Fotones / pulsos de datos galácticos viajando por las líneas
            if (Math.random() < 0.00045 && pulses.length < 6) {
              pulses.push({
                x: p.x,
                y: p.y,
                targetX: p2.x,
                targetY: p2.y,
                progress: 0,
                speed: 0.024 + Math.random() * 0.016,
                color: '#34d399',
              });
            }
          }
        }
      }

      // D. Renderizar Pulsos Fotónicos
      for (let k = pulses.length - 1; k >= 0; k--) {
        const pulse = pulses[k];
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          pulses.splice(k, 1);
          continue;
        }

        const currentX = pulse.x + (pulse.targetX - pulse.x) * pulse.progress;
        const currentY = pulse.y + (pulse.targetY - pulse.y) * pulse.progress;

        ctx.beginPath();
        ctx.arc(currentX, currentY, 3.8, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(52, 211, 153, 0.35)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(currentX, currentY, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = pulse.color;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const startTimer = window.setTimeout(() => {
      animationFrameId = requestAnimationFrame(render);
    }, 28);

    return () => {
      clearTimeout(startTimer);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
    >
      {/* 1. Malla de estrellas y constelación interactiva (Canvas acelerado) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block opacity-90 sm:opacity-85"
      />

      {/* 2. Matriz de Puntos Cibernéticos Galácticos (el look tecnológico característico de Xiantra) */}
      <div
        className="absolute inset-0 bg-grid-tech opacity-60 sm:opacity-45"
        style={{
          maskImage: 'radial-gradient(ellipse 90% 80% at 50% 35%, black 45%, transparent 92%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 35%, black 45%, transparent 92%)',
        }}
      />

      {/* 3. Nebulosa Superior: Brillo Esmeralda / Cian Cósmico */}
      <div
        className="absolute -top-[14%] left-1/2 -translate-x-1/2 w-[720px] sm:w-[920px] h-[480px] rounded-full opacity-70 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(16,185,129,0.20) 0%, rgba(6,182,212,0.12) 38%, transparent 72%)',
        }}
      />

      {/* 4. Nebulosa Lateral Galáctica */}
      <div
        className="absolute top-[38%] -left-[16%] w-[560px] sm:w-[700px] h-[520px] rounded-full opacity-55 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(6,182,212,0.18) 0%, rgba(37,99,235,0.08) 50%, transparent 75%)',
        }}
      />

      {/* 5. Arco Planetario / Nebulosa Inferior (el brillo icónico detrás de los botones del Hero y CTAs) */}
      <div
        className="absolute bottom-[2%] sm:bottom-[6%] left-1/2 -translate-x-1/2 w-[600px] sm:w-[840px] h-[340px] rounded-full opacity-65 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 60%, rgba(52,211,153,0.18) 0%, rgba(6,182,212,0.10) 45%, transparent 75%)',
        }}
      />
    </div>
  );
});

BackgroundEffects.displayName = 'BackgroundEffects';
