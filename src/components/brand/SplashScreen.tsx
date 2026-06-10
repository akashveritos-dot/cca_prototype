'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedLogo from './AnimatedLogo';

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleComplete = () => {
    // Small delay before hiding splash
    setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setShowContent(true), 300);
    }, 500);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="splash"
            className="fixed inset-0 z-[9999] bg-gradient-to-br from-gray-50 via-white to-gray-50"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              scale: 0.95,
            }}
            transition={{ 
              duration: 0.8,
              ease: "easeInOut"
            }}
          >
            {/* Animated Background Grid */}
            <div className="absolute inset-0 opacity-10">
              <div 
                className="absolute inset-0" 
                style={{
                  backgroundImage: `
                    linear-gradient(rgba(234, 88, 12, 0.1) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(234, 88, 12, 0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '50px 50px'
                }}
              />
            </div>

            {/* Logo Animation */}
            <AnimatedLogo onComplete={handleComplete} />

            {/* Skip Button */}
            <motion.button
              className="absolute bottom-8 right-8 px-4 py-2 text-sm text-gray-500 hover:text-orange-600 transition"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              onClick={handleComplete}
            >
              Skip →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContent && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
