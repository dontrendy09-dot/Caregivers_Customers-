import React, { useState } from 'react';
import { ShieldCheck, HeartHandshake, CalendarCheck2, MessageCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OnboardingScreenProps {
  onGetStarted?: () => void;
  onSignIn?: () => void;
  onFinish?: () => void;
  onSkip?: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onGetStarted,
  onSignIn,
  onFinish,
  onSkip,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleComplete = () => {
    if (onGetStarted) onGetStarted();
    else if (onFinish) onFinish();
    else if (onSkip) onSkip();
  };

  const handleSkipOrSignIn = () => {
    if (onSignIn) onSignIn();
    else if (onSkip) onSkip();
    else if (onFinish) onFinish();
    else if (onGetStarted) onGetStarted();
  };

  const slides = [
    {
      id: 1,
      title: 'Find trusted, verified caregivers',
      description: 'Discover thoroughly vetted nurses, senior aides, and companions with background checks & verified licenses.',
      icon: ShieldCheck,
      iconBg: 'bg-[#F2F4F2] text-[#4E6E5D] border-[#E8EEE8]',
      badge: '100% Background Checked',
      image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      title: 'Choose care that fits your needs',
      description: 'From 2-hour medical visits to full-time dementia companionship and post-op rehab, choose tailored support.',
      icon: HeartHandshake,
      iconBg: 'bg-[#F2F4F2] text-[#4E6E5D] border-[#E8EEE8]',
      badge: 'Personalized Support',
      image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      title: 'Book and manage care with ease',
      description: 'Transparent pricing with zero hidden fees. Select convenient time slots, track arrival, and manage payments safely.',
      icon: CalendarCheck2,
      iconBg: 'bg-[#F2F4F2] text-[#4E6E5D] border-[#E8EEE8]',
      badge: 'Clear Upfront Pricing',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 4,
      title: 'Stay connected with your caregiver',
      description: 'Receive real-time arrival updates, live session logs, photos, and chat securely anytime with your caregiver.',
      icon: MessageCircle,
      iconBg: 'bg-[#F2F4F2] text-[#4E6E5D] border-[#E8EEE8]',
      badge: 'Real-time Peace of Mind',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      handleComplete();
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-[#F8F9F8] text-[#1A1C1A] overflow-hidden min-h-[700px]">
      {/* Top Bar with Skip */}
      <div className="px-6 pt-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-1.5">
          <div className="w-7 h-7 rounded-lg bg-[#4E6E5D] flex items-center justify-center text-white">
            <ShieldCheck size={16} />
          </div>
          <span className="font-bold text-[#1A1C1A] text-sm tracking-tight">HavenCare</span>
        </div>
        <button
          type="button"
          onClick={handleSkipOrSignIn}
          className="text-xs font-semibold text-neutral-500 hover:text-[#1A1C1A] py-1 px-3 rounded-full hover:bg-[#E8EEE8] transition-colors cursor-pointer"
        >
          Skip
        </button>
      </div>

      {/* Main Slide Carousel Area */}
      <div className="flex-1 flex flex-col justify-center px-6 py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -25 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center text-center"
          >
            {/* Visual Image Card with Badge */}
            <div className="relative w-full max-w-[320px] h-64 rounded-2xl overflow-hidden shadow-xs border border-[#E8EEE8] mb-6 group">
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="text-[10px] font-semibold text-white bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-white/20">
                  {slides[currentSlide].badge}
                </span>
                <div className={`p-1.5 rounded-lg border backdrop-blur-xs shadow-xs ${slides[currentSlide].iconBg}`}>
                  {React.createElement(slides[currentSlide].icon, { size: 16 })}
                </div>
              </div>
            </div>

            {/* Slide Text */}
            <h2 className="text-xl font-bold text-[#1A1C1A] tracking-tight leading-tight mb-2 font-heading">
              {slides[currentSlide].title}
            </h2>
            <p className="text-xs text-neutral-600 leading-relaxed max-w-xs">
              {slides[currentSlide].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Controls */}
      <div className="px-6 pb-8 pt-2 flex flex-col gap-4">
        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-1.5">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'w-6 bg-[#4E6E5D]'
                  : 'w-1.5 bg-[#E8EEE8] hover:bg-neutral-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Primary CTA */}
        <div className="flex flex-col gap-2.5 pt-2">
          <button
            type="button"
            onClick={handleNext}
            className="w-full py-3.5 px-6 rounded-xl bg-[#4E6E5D] hover:bg-[#3E584A] active:scale-[0.98] text-white font-semibold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>{currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}</span>
            <ArrowRight size={15} />
          </button>

          <div className="text-center pt-1">
            <span className="text-xs text-neutral-500">Already have an account? </span>
            <button
              type="button"
              onClick={handleSkipOrSignIn}
              className="text-xs font-semibold text-[#4E6E5D] hover:underline cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
