import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export type BackgroundVariant = 'hero' | 'about' | 'subtle' | 'services' | 'projects' | 'pricing' | 'blog' | 'contact';

interface AmbientBackgroundProps {
  variant?: BackgroundVariant;
  className?: string;
}

export function AmbientBackground({ variant = 'subtle', className = '' }: AmbientBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(true);

  // Mouse parallax motion values (Only enabled on fine-pointer desktop devices)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 40, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 30 });

  // Layer-specific subtle parallax limits
  const lightLayerX = useTransform(springX, [-0.5, 0.5], [-5, 5]);
  const lightLayerY = useTransform(springY, [-0.5, 0.5], [-5, 5]);

  const linesLayerX = useTransform(springX, [-0.5, 0.5], [-2, 2]);
  const linesLayerY = useTransform(springY, [-0.5, 0.5], [-2, 2]);

  const curvesLayerX = useTransform(springX, [-0.5, 0.5], [-3, 3]);
  const curvesLayerY = useTransform(springY, [-0.5, 0.5], [-3, 3]);

  // Intersection Observer to pause rendering when section is outside viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // RAF-throttled MouseMove Handler (disabled on coarse/touch pointers)
  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer || !isIntersecting) return;

    let rafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        const { innerWidth, innerHeight } = window;
        const x = e.clientX / innerWidth - 0.5;
        const y = e.clientY / innerHeight - 0.5;
        mouseX.set(x);
        mouseY.set(y);
        rafId = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [isIntersecting, mouseX, mouseY]);

  // Optimized Particles Canvas logic (Hero variant only, warm subtle dots)
  useEffect(() => {
    if (variant !== 'hero' || !isIntersecting) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isTouch = !window.matchMedia('(pointer: fine)').matches;
    const particleCount = isTouch ? 6 : 12;

    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.2 + 0.4,
      opacity: Math.random() * 0.12 + 0.04,
      speedX: (Math.random() - 0.5) * 0.06,
      speedY: -Math.random() * 0.08 - 0.02,
      pulseFactor: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulseFactor += 0.01;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const currentOpacity = p.opacity + Math.sin(p.pulseFactor) * 0.02;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 93, 63, ${Math.max(0.02, Math.min(0.15, currentOpacity))})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [variant, isIntersecting]);

  // Vertical line configurations
  const getLines = () => {
    switch (variant) {
      case 'hero':
        return [
          { left: '20%', h: 'h-[100%]', top: '0%' },
          { left: '40%', h: 'h-[100%]', top: '0%' },
          { left: '60%', h: 'h-[100%]', top: '0%' },
          { left: '80%', h: 'h-[100%]', top: '0%' },
        ];
      case 'services':
      case 'projects':
      case 'contact':
        return [
          { left: '25%', h: 'h-[100%]', top: '0%' },
          { left: '50%', h: 'h-[100%]', top: '0%' },
          { left: '75%', h: 'h-[100%]', top: '0%' },
        ];
      default:
        return [
          { left: '33%', h: 'h-[100%]', top: '0%' },
          { left: '66%', h: 'h-[100%]', top: '0%' },
        ];
    }
  };

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none select-none z-0 bg-[#F7F4EE] ${className}`}
    >
      {/* BASE BACKGROUND */}
      <div className="absolute inset-0 bg-[#F7F4EE]" />

      {/* ATMOSPHERIC LIGHT LAYERS (Subtle Warm Gradients) */}
      <motion.div
        style={{
          x: lightLayerX,
          y: lightLayerY,
        }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* TOP ATMOSPHERIC GLOW */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              variant === 'hero'
                ? 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(232, 93, 63, 0.03) 0%, rgba(252, 232, 226, 0.3) 40%, transparent 80%)'
                : variant === 'contact'
                ? 'radial-gradient(ellipse 70% 50% at 80% 10%, rgba(232, 93, 63, 0.02) 0%, rgba(247, 244, 238, 0.5) 50%, transparent 80%)'
                : 'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(232, 93, 63, 0.02) 0%, transparent 70%)',
          }}
        />

        {/* BOTTOM-LEFT ACCENT GLOW */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              variant === 'hero'
                ? 'radial-gradient(circle at 10% 90%, rgba(232, 93, 63, 0.02) 0%, transparent 50%)'
                : 'radial-gradient(circle at 15% 85%, rgba(232, 93, 63, 0.015) 0%, transparent 45%)',
          }}
        />
      </motion.div>

      {/* VERTICAL FAINT GRID LINES */}
      <motion.div
        style={{
          x: linesLayerX,
          y: linesLayerY,
        }}
        className="absolute inset-0 pointer-events-none"
      >
        {getLines().map((line, idx) => (
          <div
            key={idx}
            className={`absolute ${line.top} w-[1px] ${line.h}`}
            style={{
              left: line.left,
              background:
                'linear-gradient(to bottom, transparent, rgba(222, 217, 208, 0.5) 20%, rgba(222, 217, 208, 0.5) 80%, transparent)',
            }}
          />
        ))}
      </motion.div>

      {/* DECORATIVE SUBTLE CORNER CURVES */}
      <motion.div
        style={{
          x: curvesLayerX,
          y: curvesLayerY,
        }}
        className="absolute inset-0 pointer-events-none opacity-30"
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          {/* Top-Left Curve */}
          <path
            d="M 0 160 C 120 160 160 120 160 0"
            stroke="rgba(222, 217, 208, 0.7)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* Top-Right Curve */}
          <path
            d="M 1440 160 C 1320 160 1280 120 1280 0"
            stroke="rgba(222, 217, 208, 0.7)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </svg>
      </motion.div>

      {/* PARTICLES CANVAS */}
      {variant === 'hero' && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none opacity-50 z-[2]"
        />
      )}

      {/* STATIC NOISE OVERLAY */}
      <div className="absolute inset-0 bg-noise-static pointer-events-none z-[3]" />
    </div>
  );
}

