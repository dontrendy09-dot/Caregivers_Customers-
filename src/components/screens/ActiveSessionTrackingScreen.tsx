import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Phone,
  MessageSquare,
  AlertOctagon,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  Activity,
  Heart,
  ChevronRight,
  Sparkles,
  Check
} from 'lucide-react';
import { Booking, AppScreen } from '../../types';
import { HeaderBar } from '../common/HeaderBar';

interface ActiveSessionTrackingScreenProps {
  booking: Booking;
  onBack: () => void;
  onStartChat: (caregiverId: string) => void;
}

export const ActiveSessionTrackingScreen: React.FC<ActiveSessionTrackingScreenProps> = ({
  booking,
  onBack,
  onStartChat,
}) => {
  const [secondsElapsed, setSecondsElapsed] = useState(4820); // ~1 hr 20 min
  const [showSosModal, setShowSosModal] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<string[]>([
    'Checked in at residence with security PIN',
    'Vital signs recorded: BP 120/78, Pulse 72 bpm',
    'Morning medication administered with water'
  ]);

  const allTasks = [
    'Checked in at residence with security PIN',
    'Vital signs recorded: BP 120/78, Pulse 72 bpm',
    'Morning medication administered with water',
    'Gentle mobility & garden walk (20 mins)',
    'Warm lunch preparation (Soup & Herbal tea)',
    'Post-lunch vitals & daily care summary notes'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleToggleTask = (task: string) => {
    if (completedTasks.includes(task)) {
      setCompletedTasks(completedTasks.filter((t) => t !== task));
    } else {
      setCompletedTasks([...completedTasks, task]);
    }
  };

  return (
    <div className="flex-1 pb-28 bg-[#F8F9F8] min-h-screen">
      {/* Top Header */}
      <HeaderBar
        title="Live Care Tracker"
        subtitle={`Session ${booking.bookingNumber}`}
        showBack={true}
        onBack={onBack}
      />

      <div className="px-5 py-4 space-y-4">
        {/* Active Live Pulse Card */}
        <div className="bg-[#4E6E5D] rounded-3xl p-5 text-white shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 bg-white/15 text-white border border-white/20 px-2.5 py-1 rounded-full text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Active Care in Progress</span>
            </span>

            {/* Emergency SOS Trigger */}
            <button
              type="button"
              onClick={() => setShowSosModal(true)}
              className="py-1 px-2.5 rounded-full bg-rose-600/90 hover:bg-rose-600 text-white text-[11px] font-semibold flex items-center gap-1 shadow-xs transition-all cursor-pointer"
            >
              <AlertOctagon size={12} />
              <span>Emergency SOS</span>
            </button>
          </div>

          <div className="text-center py-2">
            <span className="text-[11px] text-white/80 uppercase font-semibold tracking-wider">
              Elapsed Care Time
            </span>
            <div className="text-3xl font-bold font-mono text-white tracking-widest my-1">
              {formatTimer(secondsElapsed)}
            </div>
            <span className="text-xs text-white/80">
              Target: {booking.durationHours} Hours (Ending at 5:00 PM)
            </span>
          </div>

          {/* Stepper tracker */}
          <div className="mt-4 pt-4 border-t border-white/15 grid grid-cols-4 gap-1 text-center">
            {[
              { label: 'En Route', done: true },
              { label: 'Arrived', done: true },
              { label: 'In Progress', active: true },
              { label: 'Wrap-Up', done: false }
            ].map((step, idx) => (
              <div key={idx} className="space-y-1">
                <div
                  className={`h-1 rounded-full ${
                    step.active
                      ? 'bg-emerald-300 animate-pulse'
                      : step.done
                      ? 'bg-white'
                      : 'bg-white/20'
                  }`}
                />
                <span
                  className={`text-[10px] block truncate ${
                    step.active
                      ? 'text-emerald-200 font-semibold'
                      : step.done
                      ? 'text-white'
                      : 'text-white/50'
                  }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Caregiver on duty card */}
        <div className="p-4 bg-white rounded-2xl border border-[#E8EEE8] shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={booking.caregiverPhoto}
                alt={booking.caregiverName}
                className="w-12 h-12 rounded-xl object-cover border border-[#E8EEE8]"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#1A1C1A]">
                {booking.caregiverName}
              </h4>
              <p className="text-[11px] text-[#4E6E5D] font-medium">{booking.serviceName}</p>
              <p className="text-[10px] text-neutral-400">At residence with {booking.recipientName}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onStartChat(booking.caregiverId)}
              className="p-2 rounded-xl bg-[#F2F4F2] hover:bg-[#E8EEE8] text-[#4E6E5D] transition-colors cursor-pointer border border-[#E8EEE8]"
              aria-label="Message"
            >
              <MessageSquare size={14} />
            </button>
            <a
              href={`tel:${booking.caregiverPhone}`}
              className="p-2 rounded-xl bg-[#F8F9F8] hover:bg-[#E8EEE8] text-neutral-800 transition-colors cursor-pointer border border-[#E8EEE8]"
              aria-label="Call"
            >
              <Phone size={14} />
            </a>
          </div>
        </div>

        {/* Live Care Checklist & Updates */}
        <div className="p-4 bg-white rounded-2xl border border-[#E8EEE8] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                Live Care Task Log
              </h3>
              <p className="text-[11px] text-neutral-500">
                Real-time updates confirmed by caregiver
              </p>
            </div>
            <span className="text-xs font-semibold text-[#4E6E5D] bg-[#F2F4F2] px-2 py-0.5 rounded-full border border-[#E8EEE8]">
              {completedTasks.length} / {allTasks.length} Done
            </span>
          </div>

          <div className="space-y-2 pt-1">
            {allTasks.map((task, idx) => {
              const isDone = completedTasks.includes(task);
              return (
                <div
                  key={idx}
                  onClick={() => handleToggleTask(task)}
                  className={`p-3 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-all ${
                    isDone
                      ? 'bg-[#F2F4F2]/70 border-[#4E6E5D]/30 text-[#1A1C1A]'
                      : 'bg-white border-[#E8EEE8] text-neutral-500 hover:bg-[#F8F9F8]'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                      isDone ? 'bg-[#4E6E5D] text-white' : 'border border-[#E8EEE8] bg-white'
                    }`}
                  >
                    {isDone && <Check size={11} strokeWidth={3} />}
                  </div>
                  <span className={`text-xs ${isDone ? 'font-medium text-[#1A1C1A]' : ''}`}>
                    {task}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Location & Safety Guarantee */}
        <div className="p-4 bg-white rounded-2xl border border-[#E8EEE8] shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#1A1C1A]">
            <MapPin size={14} className="text-[#4E6E5D]" />
            <span>Service Address</span>
          </div>
          <p className="text-xs text-neutral-600 pl-5">
            {booking.address.street} {booking.address.apt}, {booking.address.city}
          </p>
          <div className="pt-1 pl-5 flex items-center gap-1 text-[11px] text-[#4E6E5D] font-medium">
            <ShieldCheck size={12} />
            <span>GPS Geofence Verified Active</span>
          </div>
        </div>
      </div>

      {/* SOS EMERGENCY MODAL */}
      {showSosModal && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-xl border border-[#E8EEE8]">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-100">
              <AlertOctagon size={24} />
            </div>

            <div className="text-center">
              <h3 className="text-sm font-bold text-[#1A1C1A]">
                Emergency Care Assistance
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                If there is an immediate medical emergency, please dial 911 first.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href="tel:911"
                className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <Phone size={13} />
                <span>Call 911 Emergency Services</span>
              </a>

              <a
                href="tel:+18005550199"
                className="w-full py-2.5 rounded-xl bg-[#4E6E5D] hover:bg-[#3E584A] text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <ShieldCheck size={13} />
                <span>Call 24/7 HavenCare Clinical Triage</span>
              </a>

              <button
                type="button"
                onClick={() => setShowSosModal(false)}
                className="w-full py-2.5 rounded-xl bg-[#F2F4F2] hover:bg-[#E8EEE8] text-neutral-700 text-xs font-semibold transition-all cursor-pointer border border-[#E8EEE8]"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
