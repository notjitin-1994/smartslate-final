'use client';

import { motion, useReducedMotion } from 'framer-motion';

export default function StrategicSkillsInfographic() {
  const reduced = useReducedMotion();
  const layers = [
    { size: 56, delay: 0.2, opacity: 0.08 },
    { size: 48, delay: 0.35, opacity: 0.12 },
    { size: 40, delay: 0.5, opacity: 0.18 },
    { size: 32, delay: 0.65, opacity: 0.26 },
  ];

  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
      <GridBackground />

      <div className="relative">
        {layers.map((layer, index) => (
          <motion.div
            key={index}
            initial={reduced ? false : { scale: 0.9, rotate: -6, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: layer.delay, ease: [0.2, 0.8, 0.2, 1] }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ filter: 'drop-shadow(0 4px 14px rgba(79,70,229,0.12))' }}
          >
            <div
              className="rounded-2xl"
              style={{
                width: `calc(${layer.size / 4}rem)`,
                height: `calc(${layer.size / 4}rem)`,
                transform: 'rotate(45deg)',
                border: `2px solid var(--primary-accent)`,
                opacity: layer.opacity,
              }}
            />
          </motion.div>
        ))}

        <motion.div
          initial={reduced ? { opacity: 0 } : { scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 1, ease: 'easeOut' }}
          className="relative z-10 rounded-xl flex items-center justify-center"
          style={{
            width: '5rem',
            height: '5rem',
            transform: 'rotate(45deg)',
            background: 'linear-gradient(135deg, var(--secondary-accent), var(--secondary-accent-dark))',
            boxShadow: '0 10px 24px rgba(15, 23, 42, 0.3)'
          }}
        >
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: 'rotate(-45deg)' }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-1.007 1.11-1.227l.128-.054a2 2 0 012.115 0l.128.054c.55.22 1.02.685 1.11 1.227l.068.416a2 2 0 001.943 1.542l.433-.064a2 2 0 012.23 2.23l-.064.433a2 2 0 001.542 1.943l.416.068c.542.09 1.007.56 1.227 1.11l.054.128a2 2 0 010 2.115l-.054.128c-.22.55-.685 1.02-1.227 1.11l-.416.068a2 2 0 00-1.542 1.943l.064.433a2 2 0 01-2.23 2.23l-.433-.064a2 2 0 00-1.943 1.542l-.068.416c-.09.542-.56 1.007-1.11 1.227l-.128.054a2 2 0 01-2.115 0l-.128-.054c-.55-.22-1.02-.685-1.11-1.227l-.068-.416a2 2 0 00-1.943-1.542l-.433.064a2 2 0 01-2.23-2.23l.064-.433a2 2 0 00-1.542-1.943l-.416-.068c-.542-.09-1.007-.56-1.227-1.11l-.054-.128a2 2 0 010-2.115l.054.128c.22-.55.685-1.02 1.227-1.11l.416-.068a2 2 0 001.542-1.943l-.064-.433a2 2 0 012.23-2.23l.433.064a2 2 0 001.943-1.542l.068-.416zM12 15a3 3 0 100-6 3 3 0 000 6z" />
          </svg>
        </motion.div>
      </div>

      <CornerCallout pos="tl" delay={1.1} iconColor="var(--primary-accent)" />
      <CornerCallout pos="tr" delay={1.25} iconColor="var(--secondary-accent)" />
      <CornerCallout pos="bl" delay={1.4} iconColor="var(--primary-accent)" />
      <CornerCallout pos="br" delay={1.55} iconColor="var(--secondary-accent)" />

      {[...Array(5)].map((_, i) => (
        <Particle key={i} delay={1.2 + i * 0.2} />
      ))}
    </div>
  );
}

function GridBackground() {
  return (
    <div
      className="absolute inset-0 rounded-2xl"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '24px 24px',
        maskImage: 'radial-gradient(70% 70% at 50% 50%, black 0%, transparent 100%)',
      }}
      aria-hidden
    />
  );
}

function CornerCallout({ pos, delay, iconColor }: { pos: 'tl' | 'tr' | 'bl' | 'br'; delay: number; iconColor: string }) {
  const reduced = useReducedMotion();
  const cls =
    pos === 'tl' ? 'top-8 left-8' :
    pos === 'tr' ? 'top-8 right-8' :
    pos === 'bl' ? 'bottom-8 left-8' :
    'bottom-8 right-8';

  const initial =
    pos === 'tl' ? { x: -40, y: -40 } :
    pos === 'tr' ? { x: 40, y: -40 } :
    pos === 'bl' ? { x: -40, y: 40 } :
    { x: 40, y: 40 };

  return (
    <motion.div
      className={`absolute ${cls}`}
      initial={reduced ? { opacity: 0 } : { opacity: 0, ...initial }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
    >
      <div className="glass-effect p-3 rounded-lg" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.5">
          <path d="M4 12h16M12 4v16" opacity="0.85" />
        </svg>
      </div>
    </motion.div>
  );
}

function Particle({ delay }: { delay: number }) {
  const reduced = useReducedMotion();
  if (reduced) return null;
  // Use deterministic offsets to avoid hydration mismatches
  const pseudoRandom = (seed: number) => {
    const x = Math.sin(seed * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  };
  const seed = Math.round(delay * 1000);
  const offsetX = (pseudoRandom(seed) * 140) - 70;
  const offsetY = (pseudoRandom(seed + 17) * 140) - 70;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 1, 0],
        x: [0, offsetX],
        y: [0, offsetY],
        scale: [0.8, 1, 0.8],
      }}
      transition={{ duration: 3, delay, repeat: Infinity, repeatDelay: 1.2 }}
      className="absolute w-1 h-1 rounded-full"
      style={{
        background: 'radial-gradient(circle, var(--primary-accent), transparent 70%)',
        left: '50%',
        top: '50%',
      }}
      aria-hidden
    />
  );
}
