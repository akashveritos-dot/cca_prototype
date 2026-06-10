'use client';

import { motion } from 'framer-motion';

export default function AnimatedLogo({ onComplete }: { onComplete?: () => void }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Background Pulse Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-red-500/20 to-orange-500/20"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Concentric Circles */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border-2 border-orange-500/30"
          initial={{ width: 0, height: 0, opacity: 0 }}
          animate={{
            width: [0, 300 + i * 100, 300 + i * 100],
            height: [0, 300 + i * 100, 300 + i * 100],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 3,
            delay: i * 0.4,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Main Logo Container */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          duration: 1,
          ease: "easeOut",
          type: "spring",
          stiffness: 100
        }}
      >
        {/* Emergency Icon with Glow */}
        <motion.div
          className="relative mb-6"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Glow Effect */}
          <motion.div
            className="absolute inset-0 bg-orange-500 rounded-full blur-2xl"
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Alert Triangle */}
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            className="relative z-10"
          >
            {/* Outer Triangle */}
            <motion.path
              d="M 60 10 L 110 100 L 10 100 Z"
              fill="none"
              stroke="url(#gradient1)"
              strokeWidth="4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            
            {/* Inner Exclamation */}
            <motion.g
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <rect x="56" y="40" width="8" height="35" fill="url(#gradient2)" rx="2" />
              <circle cx="60" cy="85" r="5" fill="url(#gradient2)" />
            </motion.g>

            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ea580c" />
                <stop offset="50%" stopColor="#dc2626" />
                <stop offset="100%" stopColor="#ea580c" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#dc2626" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* DCRF Text - Animated Letters */}
        <motion.div
          className="flex items-center gap-2 mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {['D', 'C', 'R', 'F'].map((letter, i) => (
            <motion.span
              key={i}
              className="text-6xl font-black bg-gradient-to-br from-orange-500 via-red-600 to-orange-500 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 1 + i * 0.1,
                duration: 0.5,
                type: "spring",
                stiffness: 200
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>

        {/* Full Name - Word by Word Animation */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.div className="text-xl font-bold text-gray-800 mb-1 overflow-hidden">
            {['Disaster', '&', 'Climate'].map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 1.5 + i * 0.15,
                  duration: 0.5
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
          <motion.div className="text-xl font-bold text-gray-800 overflow-hidden">
            {['Resilience', 'Federation'].map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 2 + i * 0.15,
                  duration: 0.5
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Joint Venture Badge */}
        <motion.div
          className="mt-4 px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-full border-2 border-orange-300"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.3, duration: 0.5 }}
        >
          <motion.p
            className="text-sm font-semibold text-orange-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.5 }}
          >
            Joint Venture: TCUIF × DiCAF
          </motion.p>
        </motion.div>

        {/* Loading Bar */}
        <motion.div
          className="mt-8 w-64 h-1 bg-gray-200 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.3 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-orange-500 via-red-500 to-orange-500"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              delay: 2.5,
              duration: 1.5,
              ease: "easeInOut"
            }}
            onAnimationComplete={onComplete}
          />
        </motion.div>

        {/* Loading Text */}
        <motion.p
          className="mt-3 text-sm text-gray-600 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{
            delay: 2.5,
            duration: 1.5,
            times: [0, 0.2, 0.8, 1]
          }}
        >
          Preparing Disaster Resilience Platform...
        </motion.p>
      </motion.div>

      {/* Particle Effects */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-orange-500 rounded-full"
          style={{
            left: '50%',
            top: '50%',
          }}
          animate={{
            x: [0, (Math.cos((i * Math.PI) / 6) * 200)],
            y: [0, (Math.sin((i * Math.PI) / 6) * 200)],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: 2 + (i * 0.1),
            repeat: Infinity,
            repeatDelay: 1,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
}
