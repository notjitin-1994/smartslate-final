'use client';

import { motion, useReducedMotion } from 'framer-motion';

export default function SolaraInfographic() {
  const reduced = useReducedMotion();
  const features = [
    { name: 'Polaris', icon: '●', angle: 0 },
    { name: 'Constellation', icon: '●', angle: 60 },
    { name: 'Nova', icon: '●', angle: 120 },
    { name: 'Orbit', icon: '●', angle: 180 },
    { name: 'Nebula', icon: '●', angle: 240 },
    { name: 'Spectrum', icon: '●', angle: 300 },
  ];

  return (
    <div className="relative w-full h-full min-h-[420px] flex items-center justify-center">
      <Starfield />
      <Constellations />
      <Nebula reduced={!!reduced} />

      <motion.div
        initial={reduced ? false : { scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative z-20"
      >
        <div
          className="rounded-full flex items-center justify-center"
          style={{
            width: '10rem',
            height: '10rem',
            background: 'radial-gradient(60% 60% at 50% 50%, var(--primary-accent) 0%, var(--primary-accent-dark) 100%)',
            boxShadow: '0 0 60px rgba(79,70,229,0.4), 0 0 120px rgba(79,70,229,0.2)',
          }}
        >
          {!reduced && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(79,70,229,0.35), rgba(79,70,229,0) 60%)',
                filter: 'blur(6px)'
              }}
              animate={{ opacity: [0.25, 0.6, 0.25], scale: [1, 1.12, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </div>
      </motion.div>

      <Orbits reduced={!!reduced} />

      <div className="absolute inset-0 z-10">
        {features.map((feature, index) => (
          <OrbitingNode key={feature.name} feature={feature} index={index} reduced={!!reduced} />
        ))}
      </div>

      <Beams features={features} reduced={!!reduced} />
    </div>
  );
}

function OrbitingNode({ feature, index, reduced }: { feature: { name: string; icon: string; angle: number }, index: number, reduced: boolean }) {
  const mobileRadius = 88;
  const desktopRadius = 130;
  const x = Math.cos((feature.angle * Math.PI) / 180);
  const y = Math.sin((feature.angle * Math.PI) / 180);

  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.6 + index * 0.08 }}
      className="absolute left-1/2 top-1/2"
      style={{
        transform: `translate(calc(-50% + ${x * mobileRadius}px), calc(-50% + ${y * mobileRadius}px))`,
      }}
    >
      <motion.div
        animate={reduced ? {} : { rotate: 360 }}
        transition={{ duration: 24 + index * 2, repeat: Infinity, ease: 'linear' }}
        className="relative"
      >
        <div className="glass-effect p-3 md:p-4 rounded-xl flex flex-col items-center justify-center min-w-[54px] md:min-w-[76px]" style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
          <span className="text-base md:text-lg mb-1" style={{ color: 'var(--primary-accent)' }}>{feature.icon}</span>
          <span className="text-[10px] font-medium text-primary-accent hidden md:block">{feature.name}</span>
        </div>
      </motion.div>


      <style jsx>{`
        @media (min-width: 768px) {
          .absolute.left-1\\/2.top-1\\/2 {
            transform: translate(calc(-50% + ${x * desktopRadius}px), calc(-50% + ${y * desktopRadius}px)) !important;
          }
        }
      `}</style>
    </motion.div>
  );
}

function Beams({ features, reduced }: { features: { angle: number }[]; reduced: boolean }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
      {features.map((feature, index) => {
        const x2 = 50 + 30 * Math.cos((feature.angle * Math.PI) / 180);
        const y2 = 50 + 30 * Math.sin((feature.angle * Math.PI) / 180);

        return (
          <motion.line
            key={`beam-${index}`}
            initial={reduced ? { opacity: 0.25 } : { opacity: 0 }}
            animate={reduced ? { opacity: 0.25 } : { opacity: [0, 0.45, 0] }}
            transition={{ duration: 2.2, delay: index * 0.25, repeat: reduced ? 0 : Infinity, repeatDelay: 2.5 }}
            x1="50%"
            y1="50%"
            x2={`${x2}%`}
            y2={`${y2}%`}
            stroke="url(#gradient-beam-blue)"
            strokeWidth="1.5"
          />
        );
      })}

      <defs>
        <linearGradient id="gradient-orbit-blue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--primary-accent)" />
          <stop offset="100%" stopColor="var(--primary-accent-dark)" />
        </linearGradient>
        <linearGradient id="gradient-beam-blue" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--primary-accent)" />
          <stop offset="100%" stopColor="var(--primary-accent-dark)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function Starfield() {
  const reduced = useReducedMotion();
  // Deterministic pseudo-random generator to avoid SSR/client mismatches
  const pseudoRandom = (seed: number) => {
    const x = Math.sin(seed * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  };
  const stars = Array.from({ length: 14 }).map((_, i) => ({
    id: i,
    left: `${pseudoRandom(i + 1) * 100}%`,
    top: `${pseudoRandom(i + 101) * 100}%`,
    delay: i * 0.2,
  }));

  return (
    <>
      {stars.map((s) => (
        <motion.div
          key={`star-${s.id}`}
          initial={{ opacity: 0 }}
          animate={reduced ? { opacity: 0.4 } : { opacity: [0, 1, 0], scale: [0.6, 1, 0.6] }}
          transition={{ duration: 3, delay: s.delay, repeat: reduced ? 0 : Infinity, repeatDelay: 1.8 }}
          className="absolute rounded-full"
          style={{
            width: '3px',
            height: '3px',
            left: s.left,

            top: s.top,
            background: 'radial-gradient(circle, rgba(255,255,255,0.9), rgba(255,255,255,0) 60%)'
          }}
          aria-hidden
        />
      ))}

      {!reduced && [0, 1].map((i) => (
        <motion.div
          key={`flare-${i}`}
          className="absolute rounded-full"
          style={{
            width: '10px',
            height: '10px',
            left: `${20 + i * 45}%`,
            top: `${30 + i * 25}%`,
            background: 'radial-gradient(circle, rgba(255,255,255,0.95), rgba(255,255,255,0) 60%)',
            filter: 'blur(0.5px)'
          }}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: [0, 0.7, 0], scale: [0.7, 1.8, 0.7] }}
          transition={{ duration: 6.5, delay: i * 2, repeat: Infinity, repeatDelay: 8 }}
          aria-hidden
        />
      ))}
    </>
  );
}

function Orbits({ reduced }: { reduced: boolean }) {
  const radii = [80, 115, 150];
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
      {radii.map((r, i) => (
        <motion.circle
          key={r}
          cx="50%"
          cy="50%"
          r={r}
          fill="none"
          stroke="url(#gradient-orbit-blue)"
          strokeWidth="1.2"
          strokeDasharray="4 10"
          opacity="0.18"
          initial={reduced ? { opacity: 0.18 } : { strokeDashoffset: 0 }}
          animate={reduced ? { opacity: 0.18 } : { strokeDashoffset: 56 }}
          transition={{ duration: 14 + i * 2, repeat: reduced ? 0 : Infinity, ease: 'linear' }}
        />
      ))}
    </svg>
  );
}

function Nebula({ reduced }: { reduced: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
      <motion.div
        className="rounded-full"
        style={{
          width: 380,
          height: 380,
          background: 'radial-gradient(45% 55% at 50% 50%, rgba(79,70,229,0.18) 0%, rgba(79,70,229,0.08) 35%, rgba(79,70,229,0) 70%)',
          filter: 'blur(8px)',
        }}
        initial={{ opacity: 0.5, scale: 0.96 }}
        animate={reduced ? { opacity: 0.5, scale: 0.96 } : { opacity: [0.45, 0.6, 0.45], scale: [0.96, 1.02, 0.96] }}
        transition={{ duration: 9, repeat: reduced ? 0 : Infinity, ease: 'easeInOut' }}
      />
      {!reduced && (
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 460,
            height: 300,
            background: 'radial-gradient(50% 60% at 50% 50%, rgba(79,70,229,0.15) 0%, rgba(79,70,229,0.06) 40%, rgba(79,70,229,0) 75%)',
            filter: 'blur(10px)',
          }}
          initial={{ rotate: 0, opacity: 0.35 }}
          animate={{ rotate: 360, opacity: [0.3, 0.45, 0.3] }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
      )}
    </div>
  );
}

function Constellations() {
  const reduced = useReducedMotion();
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
      <defs>
        <linearGradient id="constellation-blue" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--primary-accent)" />
          <stop offset="100%" stopColor="var(--primary-accent-dark)" />
        </linearGradient>
      </defs>

      <motion.polyline
        points="15,25 32,38 50,28 68,42 84,30"
        fill="none"
        stroke="url(#constellation-blue)"
        strokeWidth="0.6"
        opacity="0.14"
        initial={reduced ? { opacity: 0.14 } : { pathLength: 0 }}
        animate={reduced ? { opacity: 0.14 } : { pathLength: 1 }}
        transition={{ duration: 2.2, delay: 1 }}
      />
      <motion.polyline
        points="20,70 35,58 50,66 66,54 82,62"
        fill="none"
        stroke="url(#constellation-blue)"
        strokeWidth="0.6"
        opacity="0.12"
        initial={reduced ? { opacity: 0.12 } : { pathLength: 0 }}
        animate={reduced ? { opacity: 0.12 } : { pathLength: 1 }}
        transition={{ duration: 2.2, delay: 1.3 }}
      />
    </svg>
  );
}
