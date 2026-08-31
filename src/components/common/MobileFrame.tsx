import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Signal, Smartphone, Monitor } from 'lucide-react';
import { AppScreen } from '../../types';

interface MobileFrameProps {
  children: React.ReactNode;
  activeSessionAlert?: React.ReactNode;
  currentScreen?: AppScreen;
}

export const MobileFrame: React.FC<MobileFrameProps> = ({
  children,
  activeSessionAlert,
  currentScreen = 'home',
}) => {
  const [deviceModel, setDeviceModel] = useState<'iphone' | 'pixel' | 'fullscreen'>('iphone');
  const [currentTime, setCurrentTime] = useState('9:41');

  const isDarkStatus = currentScreen === 'home' || currentScreen === 'splash';

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      hours = hours % 12 || 12;
      const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
      setCurrentTime(`${hours}:${minutesStr}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col items-center justify-start py-3 px-2 sm:py-6 sm:px-4 font-sans select-none overflow-x-hidden">
      {/* Top Device & Branding Controls Header */}
      <div className="w-full max-w-[420px] mb-3 px-2 flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-500/20">
            H
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
              HavenCare
            </div>
            <h1 className="text-sm font-bold text-white tracking-tight leading-tight">
              On-Demand Healthcare
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setDeviceModel('iphone')}
            className={`px-2 py-1 rounded-lg transition-all flex items-center gap-1 text-[11px] font-medium cursor-pointer ${
              deviceModel === 'iphone'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone size={12} />
            <span>iOS</span>
          </button>
          <button
            type="button"
            onClick={() => setDeviceModel('pixel')}
            className={`px-2 py-1 rounded-lg transition-all flex items-center gap-1 text-[11px] font-medium cursor-pointer ${
              deviceModel === 'pixel'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Android</span>
          </button>
          <button
            type="button"
            onClick={() => setDeviceModel('fullscreen')}
            className={`px-2 py-1 rounded-lg transition-all flex items-center gap-1 text-[11px] font-medium cursor-pointer ${
              deviceModel === 'fullscreen'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Monitor size={12} />
            <span>Fluid</span>
          </button>
        </div>
      </div>

      {/* Main Mobile Screen Wrapper */}
      <div
        className={`w-full bg-[#FFFFFF] relative flex flex-col transition-all duration-300 shadow-2xl ${
          deviceModel === 'fullscreen'
            ? 'max-w-[420px] min-h-[844px] rounded-2xl overflow-hidden border border-slate-800'
            : 'max-w-[395px] h-[844px] rounded-[46px] border-[8px] border-[#1E293B] ring-1 ring-slate-700/50 overflow-hidden'
        }`}
      >
        {/* iOS Dynamic Island / Android Punch Hole */}
        <div
          className={`sticky top-0 z-50 px-6 pt-3 pb-2 flex items-center justify-between text-xs font-semibold shrink-0 transition-colors duration-200 ${
            isDarkStatus
              ? 'bg-[#0F56C7] text-white'
              : 'bg-white/95 text-neutral-900 border-b border-neutral-100/80 backdrop-blur-md'
          }`}
        >
          {/* Time */}
          <span className={`w-12 font-semibold tracking-tight text-[12px] ${isDarkStatus ? 'text-white' : 'text-neutral-800'}`}>
            {currentTime}
          </span>

          {/* Dynamic Island / Notch */}
          {deviceModel === 'iphone' ? (
            <div className={`w-22 h-4.5 rounded-full flex items-center justify-between px-2 text-[9px] ${
              isDarkStatus ? 'bg-[#0B4DB0] text-white' : 'bg-black text-white'
            }`}>
              <div className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-blue-400/40" />
            </div>
          ) : deviceModel === 'pixel' ? (
            <div className="w-3.5 h-3.5 rounded-full bg-black ring-2 ring-blue-300" />
          ) : (
            <div className={`text-[10px] font-bold uppercase tracking-widest ${isDarkStatus ? 'text-blue-200' : 'text-neutral-500'}`}>
              HAVENCARE
            </div>
          )}

          {/* System status icons */}
          <div className={`flex items-center gap-1.5 w-12 justify-end ${isDarkStatus ? 'text-white' : 'text-neutral-700'}`}>
            <Signal size={12} strokeWidth={2.4} />
            <Wifi size={12} strokeWidth={2.4} />
            <BatteryMedium size={14} strokeWidth={2.4} />
          </div>
        </div>

        {/* Global Live Session Banner */}
        {activeSessionAlert}

        {/* Mobile Viewport Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col bg-[#F8FAFC] text-[#0F172A]">
          {children}
        </div>

        {/* iOS Home Indicator Bar */}
        <div className="w-full py-1.5 flex justify-center bg-white/95 backdrop-blur-md shrink-0 pointer-events-none border-t border-neutral-100">
          <div className="w-28 h-1 bg-black/20 rounded-full" />
        </div>
      </div>
    </div>
  );
};
