'use client';

import { motion } from 'framer-motion';

export default function StrategicSkillsInfographic() {
  const layers = [
    { size: 'w-48 h-48 md:w-56 md:h-56', delay: 0.2, opacity: 0.1 },
    { size: 'w-40 h-40 md:w-48 md:h-48', delay: 0.4, opacity: 0.15 },
    { size: 'w-32 h-32 md:w-40 md:h-40', delay: 0.6, opacity: 0.2 },
    { size: 'w-24 h-24 md:w-32 md:h-32', delay: 0.8, opacity: 0.3 },
  ];

  return (
    <div className="relative w-full h-full min-h-[400px] flex items-center justify-center">
      {/* Layered Architecture Visualization */}
      <div className="relative">
        {layers.map((layer, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: layer.delay }}
            className={`absolute inset-0 flex items-center justify-center`}
          >
            <div
              className={`${layer.size} border-2 border-primary-accent rounded-2xl transform rotate-45`}
              style={{ opacity: layer.opacity }}
            />
          </motion.div>
        ))}

        {/* Core */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="relative z-10 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-secondary-accent to-secondary-accent-dark rounded-xl flex items-center justify-center transform rotate-45 shadow-lg"
        >
          <svg className="w-8 h-8 md:w-10 md:h-10 text-white transform -rotate-45" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-1.007 1.11-1.227l.128-.054a2 2 0 012.115 0l.128.054c.55.22 1.02.685 1.11 1.227l.068.416a2 2 0 001.943 1.542l.433-.064a2 2 0 012.23 2.23l-.064.433a2 2 0 001.542 1.943l.416.068c.542.09 1.007.56 1.227 1.11l.054.128a2 2 0 010 2.115l-.054.128c-.22.55-.685 1.02-1.227 1.11l-.416.068a2 2 0 00-1.542 1.943l.064.433a2 2 0 01-2.23 2.23l-.433-.064a2 2 0 00-1.943 1.542l-.068.416c-.09.542-.56 1.007-1.11 1.227l-.128.054a2 2 0 01-2.115 0l-.128-.054c-.55-.22-1.02-.685-1.11-1.227l-.068-.416a2 2 0 00-1.943-1.542l-.433.064a2 2 0 01-2.23-2.23l.064-.433a2 2 0 00-1.542-1.943l-.416-.068c-.542-.09-1.007-.56-1.227-1.11l-.054-.128a2 2 0 010-2.115l.054.128c.22-.55.685-1.02 1.227-1.11l.416-.068a2 2 0 001.542-1.943l-.064-.433a2 2 0 012.23-2.23l.433.064a2 2 0 001.943-1.542l.068-.416zM12 15a3 3 0 100-6 3 3 0 000 6z" />
          </svg>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        initial={{ opacity: 0, x: -50, y: -50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute top-10 left-10"
      >
        <div className="glass-effect p-3 rounded-lg">
          <svg className="w-6 h-6 text-primary-accent" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50, y: -50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="absolute top-10 right-10"
      >
        <div className="glass-effect p-3 rounded-lg">
          <svg className="w-6 h-6 text-secondary-accent" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -50, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 1.6 }}
        className="absolute bottom-10 left-10"
      >
        <div className="glass-effect p-3 rounded-lg">
          <svg className="w-6 h-6 text-primary-accent" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
          </svg>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.8, delay: 1.8 }}
        className="absolute bottom-10 right-10"
      >
        <div className="glass-effect p-3 rounded-lg">
          <svg className="w-6 h-6 text-secondary-accent" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" />
          </svg>
        </div>
      </motion.div>

      {/* Animated Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
          }}
          transition={{
            duration: 3,
            delay: i * 0.5,
            repeat: Infinity,
            repeatDelay: 1,
          }}
          className="absolute w-1 h-1 bg-primary-accent rounded-full"
          style={{
            left: '50%',
            top: '50%',
          }}
        />
      ))}
    </div>
  );
}