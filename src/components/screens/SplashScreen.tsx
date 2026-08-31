import React, { useEffect } from 'react';
import { ShieldCheck, Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface SplashScreenProps {
  onComplete?: () => void;
  onFinish?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete, onFinish }) => {
  const handleDone = () => {
    if (onFinish) onFinish();
    else if (onComplete) onComplete();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleDone();
    }, 2400);
    return () => clearTimeout(timer);
  }, [onComplete, onFinish]);

  return (
    <div className="flex-1 flex flex-col items-center justify-between p-8 bg-[#F8F9F8] text-[#1A1C1A] relative overflow-hidden min-h-[720px]">
      <div className="w-full flex justify-end">
        <button
          type="button"
          onClick={handleDone}
          className="text-xs text-neutral-500 hover:text-[#1A1C1A] bg-white px-3 py-1.5 rounded-full border border-[#E8EEE8] transition-colors cursor-pointer"
        >
          Skip Intro →
        </button>
      </div>

      {/* Brand Center */}
      <div className="flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative mb-6"
        >
          <div className="w-20 h-20 rounded-2xl bg-[#4E6E5D] text-white shadow-sm flex items-center justify-center relative">
            <ShieldCheck size={38} strokeWidth={2} />
            <div className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full bg-white border border-[#E8EEE8] flex items-center justify-center shadow-xs">
              <Heart size={14} className="text-[#4E6E5D] fill-[#4E6E5D]" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold tracking-tight font-heading text-[#1A1C1A]">
            Haven<span className="text-[#4E6E5D]">Care</span>
          </h1>
          <p className="text-xs font-medium text-neutral-500 mt-1.5 tracking-wide">
            Care that feels personal.
          </p>
        </motion.div>
      </div>

      {/* Bottom Loading Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col items-center gap-2.5 w-full"
      >
        <div className="w-12 h-1 bg-[#E8EEE8] rounded-full overflow-hidden">
          <div className="w-full h-full bg-[#4E6E5D] rounded-full animate-pulse" />
        </div>
        <span className="text-[10px] text-neutral-400 tracking-wider uppercase font-semibold">
          Verified Caregiver Platform
        </span>
      </motion.div>
    </div>
  );
};
