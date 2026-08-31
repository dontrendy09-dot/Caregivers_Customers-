import React from 'react';
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  ShieldCheck,
  MessageSquare,
  ArrowRight,
  Home,
  Download,
  Share2
} from 'lucide-react';
import { Booking, AppScreen } from '../../types';

interface BookingConfirmationScreenProps {
  booking: Booking;
  onViewBooking: (bookingId: string) => void;
  onStartChat: (caregiverId: string) => void;
  onGoHome: () => void;
}

export const BookingConfirmationScreen: React.FC<BookingConfirmationScreenProps> = ({
  booking,
  onViewBooking,
  onStartChat,
  onGoHome,
}) => {
  return (
    <div className="flex-1 pb-20 bg-[#F8F9F8] min-h-screen flex flex-col justify-between p-5">
      <div className="pt-4 text-center space-y-3.5">
        {/* Animated Checkmark Badge */}
        <div className="w-16 h-16 rounded-full bg-[#F2F4F2] text-[#4E6E5D] flex items-center justify-center mx-auto border border-[#E8EEE8]">
          <CheckCircle2 size={32} strokeWidth={2.2} />
        </div>

        <div>
          <span className="text-[11px] font-semibold text-[#4E6E5D] uppercase tracking-wider block">
            Booking Confirmed
          </span>
          <h1 className="text-xl font-bold font-heading text-[#1A1C1A] mt-1">
            Care Request Sent
          </h1>
          <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
            Your booking reference is <strong className="text-[#1A1C1A] font-mono">{booking.bookingNumber}</strong>. We've notified {booking.caregiverName}.
          </p>
        </div>

        {/* Booking Card Details */}
        <div className="bg-white rounded-2xl p-4 border border-[#E8EEE8] shadow-xs text-left space-y-3 mt-4">
          <div className="flex items-center gap-3 pb-3 border-b border-[#E8EEE8]">
            <img
              src={booking.caregiverPhoto}
              alt={booking.caregiverName}
              className="w-11 h-11 rounded-xl object-cover border border-[#E8EEE8]"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-xs font-bold text-[#1A1C1A] truncate">
                {booking.caregiverName}
              </h3>
              <p className="text-[11px] text-[#4E6E5D] font-medium">{booking.serviceName}</p>
              <div className="flex items-center gap-1 text-[10px] text-neutral-500 mt-0.5">
                <ShieldCheck size={11} className="text-[#4E6E5D]" />
                <span>Verified Provider • {booking.caregiverRating} ⭐</span>
              </div>
            </div>
          </div>

          <div className="space-y-1.5 text-xs text-neutral-700">
            <div className="flex items-center gap-2">
              <Calendar size={13} className="text-neutral-400 shrink-0" />
              <span className="font-semibold text-[#1A1C1A]">{booking.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={13} className="text-neutral-400 shrink-0" />
              <span>{booking.timeSlot} ({booking.durationHours} Hours)</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={13} className="text-neutral-400 shrink-0" />
              <span className="truncate">{booking.address.street}, {booking.address.city}</span>
            </div>
          </div>

          <div className="pt-2.5 border-t border-[#E8EEE8] flex items-center justify-between text-xs">
            <span className="text-neutral-500">Amount Paid (Escrow)</span>
            <span className="text-sm font-bold text-[#1A1C1A]">${booking.price.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Protection assurance */}
        <div className="p-3 bg-[#F2F4F2] rounded-xl border border-[#E8EEE8] flex items-center gap-2.5 text-left text-xs text-[#1A1C1A]">
          <ShieldCheck size={18} className="text-[#4E6E5D] shrink-0" />
          <p className="leading-tight text-[11px] text-neutral-600">
            <strong className="text-[#1A1C1A]">HavenCare Guarantee:</strong> Payment is held safely in escrow and only released after your care session is complete.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-4">
        <button
          type="button"
          onClick={() => onViewBooking(booking.id)}
          className="w-full py-3 rounded-xl bg-[#4E6E5D] hover:bg-[#3E584A] active:scale-[0.98] text-white font-semibold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>View Booking Details</span>
          <ArrowRight size={14} />
        </button>

        <button
          type="button"
          onClick={() => onStartChat(booking.caregiverId)}
          className="w-full py-3 rounded-xl bg-white hover:bg-[#F2F4F2] active:scale-[0.98] text-[#1A1C1A] border border-[#E8EEE8] font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
        >
          <MessageSquare size={14} />
          <span>Message Caregiver</span>
        </button>

        <button
          type="button"
          onClick={onGoHome}
          className="w-full py-2 text-xs font-semibold text-neutral-500 hover:text-[#1A1C1A] transition-colors cursor-pointer text-center"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};
