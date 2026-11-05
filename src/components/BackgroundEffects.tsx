import React, { useEffect, useRef } from 'react';

interface Particle {
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

export const BackgroundEffects: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Smooth mouse tracking with inertia for gentle cursor-following particles
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      radius: 210,
      isActive: false,
    };

    const colorThemes = [
      { fill: 'rgba(56, 189, 248, 0.9)', glow: 'rgba(56, 189, 248, 0.38)' }, // Electric Sky Cyan
      { fill: 'rgba(6, 182, 212, 0.85)', glow: 'rgba(6, 182, 212, 0.35)' }, // Cyan
      { fill: 'rgba(129, 140, 248, 0.85)', glow: 'rgba(129, 140, 248, 0.35)' }, // Indigo
      { fill: 'rgba(52, 211, 153, 0.8)', glow: 'rgba(52, 211, 153, 0.32)' }, // Emerald
    ];

    const particleCount = width < 768 ? 42 : 84;
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const theme = colorThemes[Math.floor(Math.random() * colorThemes.length)];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.42, // Slow, subtle floating velocity
        vy: -0.15 - Math.random() * 0.35, // Gentle upward float
        radius: Math.random() * 2 + 1.1,
        color: theme.fill,
        glowColor: theme.glow,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.02,
        driftPhase: Math.random() * Math.PI * 2,
      });
    }

    const pulses: CyberPulse[] = [];
    const streaks: ShootingStreak[] = [];

    const createShootingStreak = () => {
      if (streaks.length < 2 && Math.random() < 0.025) {
        const startX = Math.random() * width * 1.1;
        const startY = Math.random() * (height * 0.55);
        const angle = (22 + Math.random() * 14) * (Math.PI / 180);
        const speed = 5.5 + Math.random() * 4.5;
        const length = 110 + Math.random() * 90;
        const colors = ['#38bdf8', '#06b6d4', '#818cf8'];

        streaks.push({
          x: startX,
          y: startY,
          length,
          speedX: Math.cos(angle) * speed,
          speedY: Math.sin(angle) * speed,
          opacity: 0,
          maxOpacity: 0.55 + Math.random() * 0.25,
          width: 1.2 + Math.random() * 1.2,
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
        mouse.isActive = true;
      }
    };

    const handleTouchEnd = () => {
      mouse.isActive = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    const maxDistance = width < 768 ? 90 : 130;
    const maxDistanceSq = maxDistance * maxDistance;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth cursor interpolation
      if (mouse.isActive) {
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;
      }

      createShootingStreak();

      for (let s = streaks.length - 1; s >= 0; s--) {
        const streak = streaks[s];
        streak.x += streak.speedX;
        streak.y += streak.speedY;

        if (streak.opacity < streak.maxOpacity) {
          streak.opacity += 0.04;
        }

        const tailX = streak.x - (streak.speedX / 8) * streak.length;
        const tailY = streak.y - (streak.speedY / 8) * streak.length;

        const grad = ctx.createLinearGradient(tailX, tailY, streak.x, streak.y);
        grad.addColorStop(0, 'rgba(0,0,0,0)');
        grad.addColorStop(0.7, streak.color);
        grad.addColorStop(1, '#ffffff');

        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = streak.width;
        ctx.lineCap = 'round';
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(streak.x, streak.y);
        ctx.stroke();

        if (streak.x > width + 200 || streak.y > height + 200) {
          streaks.splice(s, 1);
        }
      }

      // Update & Draw Slowly Floating & Cursor-Following Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.driftPhase += 0.008;
        p.x += p.vx + Math.sin(p.driftPhase) * 0.18;
        p.y += p.vy;

        // Wrap smoothly around edges for continuous slow upward float
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        p.pulse += p.pulseSpeed;
        const currentRadius = p.radius + Math.sin(p.pulse) * 0.5;

        // Subtle cursor attraction / following
        if (mouse.isActive) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distSq = dx * dx + dy * dy;
          const mouseRadiusSq = mouse.radius * mouse.radius;

          if (distSq < mouseRadiusSq && distSq > 4) {
            const dist = Math.sqrt(distSq);
            const force = (mouse.radius - dist) / mouse.radius;
            p.x += (dx / dist) * force * 0.85;
            p.y += (dy / dist) * force * 0.85;

            ctx.beginPath();
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.32 * force})`;
            ctx.lineWidth = 1 * force;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }

        // Particle soft halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius * 2.4, 0, Math.PI * 2);
        ctx.fillStyle = p.glowColor;
        ctx.fill();

        // Particle core
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistanceSq) {
            const dist = Math.sqrt(distSq);
            const alpha = 1 - dist / maxDistance;

            ctx.beginPath();
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.18})`;
            ctx.lineWidth = alpha * 0.9;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();

            if (Math.random() < 0.0003 && pulses.length < 10) {
              pulses.push({
                x: p.x,
                y: p.y,
                targetX: p2.x,
                targetY: p2.y,
                progress: 0,
                speed: 0.02 + Math.random() * 0.015,
                color: '#7dd3fc',
              });
            }
          }
        }
      }

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
        ctx.arc(currentX, currentY, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = pulse.color;
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* 1. Subtle Floating & Cursor-Following Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block opacity-55"
      />

      {/* 2. Cyber Matrix Grid with Depth Mask */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(56,189,248,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:56px_56px]"
        style={{
          maskImage: 'radial-gradient(ellipse 90% 70% at 50% 30%, black 30%, transparent 85%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 70% at 50% 30%, black 30%, transparent 85%)',
        }}
      />

      {/* 3. Soft Atmospheric Nebulas */}
      <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[950px] h-[500px] bg-gradient-to-b from-cyan-500/10 via-blue-600/06 to-transparent blur-[150px] rounded-full" />
      <div className="absolute top-[35%] -left-[10%] w-[800px] h-[650px] bg-gradient-to-tr from-indigo-600/08 via-cyan-600/05 to-transparent blur-[170px] rounded-full" />
      <div className="absolute top-[60%] -right-[10%] w-[800px] h-[650px] bg-gradient-to-bl from-teal-500/08 via-cyan-600/05 to-transparent blur-[170px] rounded-full" />
    </div>
  );
};
