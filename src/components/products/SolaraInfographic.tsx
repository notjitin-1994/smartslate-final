'use client';

import { motion } from 'framer-motion';

export default function SolaraInfographic() {
  const features = [
    { name: 'Polaris', icon: '⭐', angle: 0 },
    { name: 'Constellation', icon: '🌌', angle: 72 },
    { name: 'Nova', icon: '✨', angle: 144 },
    { name: 'Orbit', icon: '🔄', angle: 216 },
    { name: 'Spectrum', icon: '📊', angle: 288 },
  ];

  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
      {/* Central Sun/Core */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-20"
      >
        <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl">
          <motion.div
            animate={{
              boxShadow: [
                '0 0 20px rgba(251, 191, 36, 0.5)',
                '0 0 40px rgba(251, 191, 36, 0.8)',
                '0 0 20px rgba(251, 191, 36, 0.5)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute inset-0 rounded-full"
          />
          <span className="text-2xl md:text-3xl font-bold text-white">AI</span>
        </div>
      </motion.div>

      {/* Orbiting Features */}
      <div className="absolute inset-0">
        {features.map((feature, index) => {
          const radius = 120; // Base radius for desktop
          const mobileRadius = 80; // Radius for mobile
          const x = Math.cos((feature.angle * Math.PI) / 180);
          const y = Math.sin((feature.angle * Math.PI) / 180);

          return (
            <motion.div
              key={feature.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `translate(calc(-50% + ${x * mobileRadius}px), calc(-50% + ${y * mobileRadius}px))`,
              }}
            >
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20 + index * 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="relative"
              >
                <div className="glass-effect p-3 md:p-4 rounded-xl flex flex-col items-center justify-center min-w-[60px] md:min-w-[80px]">
                  <span className="text-xl md:text-2xl mb-1">{feature.icon}</span>
                  <span className="text-xs font-medium text-primary-accent hidden md:block">
                    {feature.name}
                  </span>
                </div>
              </motion.div>

              {/* Orbital Path */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '200%',
                  height: '200%',
                }}
              >
                <motion.circle
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.5 + index * 0.1 }}
                  cx="50%"
                  cy="50%"
                  r={mobileRadius}
                  fill="none"
                  stroke="url(#gradient-orbit)"
                  strokeWidth="1"
                  strokeDasharray="2 4"
                  opacity="0.2"
                />
              </svg>
            </motion.div>
          );
        })}
      </div>

      {/* Energy Beams */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {features.map((feature, index) => {
          const x2 = 50 + 30 * Math.cos((feature.angle * Math.PI) / 180);
          const y2 = 50 + 30 * Math.sin((feature.angle * Math.PI) / 180);

          return (
            <motion.line
              key={`beam-${index}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{
                duration: 2,
                delay: index * 0.3,
                repeat: Infinity,
                repeatDelay: 3,
              }}
              x1="50%"
              y1="50%"
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="url(#gradient-beam)"
              strokeWidth="2"
            />
          );
        })}
        
        <defs>
          <linearGradient id="gradient-orbit" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--primary-accent)" />
            <stop offset="100%" stopColor="var(--secondary-accent)" />
          </linearGradient>
          <linearGradient id="gradient-beam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
        </defs>
      </svg>

      {/* Background Stars */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            delay: i * 0.2,
            repeat: Infinity,
            repeatDelay: 2,
          }}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      {/* Responsive adjustment for desktop */}
      <style jsx>{`
        @media (min-width: 768px) {
          ${features.map((feature, index) => {
            const radius = 120;
            const x = Math.cos((feature.angle * Math.PI) / 180);
            const y = Math.sin((feature.angle * Math.PI) / 180);
            return `
              .absolute.left-1\\/2.top-1\\/2:nth-child(${index + 2}) {
                transform: translate(calc(-50% + ${x * radius}px), calc(-50% + ${y * radius}px)) !important;
              }
            `;
          }).join('')}
        }
      `}</style>
    </div>
  );
}