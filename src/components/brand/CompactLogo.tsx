'use client';

import { motion } from 'framer-motion';

interface CompactLogoProps {
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export default function CompactLogo({ 
  showText = true, 
  size = 'md',
  animated = true 
}: CompactLogoProps) {
  const sizes = {
    sm: { icon: 32, text: 'text-lg' },
    md: { icon: 40, text: 'text-xl' },
    lg: { icon: 56, text: 'text-3xl' },
  };

  const { icon: iconSize, text: textSize } = sizes[size];

  return (
    <div className="flex items-center gap-3">
      {/* Animated Alert Icon */}
      <motion.div
        className="relative flex-shrink-0"
        animate={animated ? {
          rotate: [0, 2, -2, 0],
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Glow Effect */}
        {animated && (
          <motion.div
            className="absolute inset-0 bg-orange-500 rounded-full blur-lg"
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
        
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 80 80"
          className="relative z-10"
        >
          {/* Triangle */}
          <path
            d="M 40 10 L 70 65 L 10 65 Z"
            fill="none"
            stroke="url(#logoGradient)"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          
          {/* Exclamation */}
          <rect x="37" y="28" width="6" height="22" fill="url(#logoGradient2)" rx="1.5" />
          <circle cx="40" cy="56" r="3.5" fill="url(#logoGradient2)" />

          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ea580c" />
              <stop offset="50%" stopColor="#dc2626" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
            <linearGradient id="logoGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#dc2626" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Text */}
      {showText && (
        <div className="flex flex-col leading-tight">
          <motion.span
            className={`${textSize} font-black bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 bg-clip-text text-transparent`}
            initial={animated ? { opacity: 0, x: -10 } : {}}
            animate={animated ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            DCRF
          </motion.span>
          <motion.span
            className="text-[10px] font-semibold text-gray-600 tracking-wide"
            initial={animated ? { opacity: 0, x: -10 } : {}}
            animate={animated ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Disaster & Climate
          </motion.span>
        </div>
      )}
    </div>
  );
}
