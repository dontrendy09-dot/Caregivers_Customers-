import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Download,
  AlertTriangle,
  RotateCcw,
  Activity,
  KeyRound,
  FileText,
  HelpCircle,
  X
} from 'lucide-react';
import { Booking, AppScreen } from '../../types';
import { HeaderBar } from '../common/HeaderBar';
import { StatusBadge } from '../common/Badge';

interface BookingDetailScreenProps {
  booking: Booking;
  onBack: () => void;
  onTrackSession: (bookingId: string) => void;
  onStartChat: (caregiverId: string) => void;
  onCancelBooking: (bookingId: string) => void;
  onViewInvoice: (invoiceId: string) => void;
}

export const BookingDetailScreen: React.FC<BookingDetailScreenProps> = ({
  booking,
  onBack,
  onTrackSession,
  onStartChat,
  onCancelBooking,
  onViewInvoice,
}) => {
  const [showCancelModal, setShowCancelModal] = useState(false);

  return (
    <div className="flex-1 pb-28 bg-[#F8F9F8] min-h-screen">
      <HeaderBar
        title="Booking Details"
        subtitle={booking.bookingNumber}
        showBack={true}
        onBack={onBack}
      />

      <div className="px-5 py-4 space-y-4">
        {/* Status Header Banner */}
        <div className="p-4 bg-white rounded-2xl border border-[#E8EEE8] shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-semibold text-neutral-400 block mb-1">
              Current Status
            </span>
            <StatusBadge status={booking.status} size="md" />
          </div>

          {booking.status === 'active' && (
            <button
              type="button"
              onClick={() => onTrackSession(booking.id)}
              className="py-1.5 px-3 rounded-lg bg-[#4E6E5D] hover:bg-[#3E584A] active:scale-95 text-white text-xs font-medium flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <Activity size={13} className="animate-pulse" />
              <span>Track Live</span>
            </button>
          )}
        </div>

        {/* Arrival Verification PIN (for upcoming or active care) */}
        {(booking.status === 'upcoming' || booking.status === 'active') && (
          <div className="p-4 bg-[#4E6E5D] text-white rounded-2xl shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
                <KeyRound size={18} />
              </div>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-white/80">
                  Caregiver Check-in PIN
                </span>
                <p className="text-[11px] text-white/90 mt-0.5">
                  Share with caregiver at door
                </p>
              </div>
            </div>
            <div className="font-mono text-lg font-bold tracking-widest bg-white/20 px-3 py-1 rounded-xl border border-white/20">
              4829
            </div>
          </div>
        )}

        {/* Caregiver Profile Card */}
        <div className="p-4 bg-white rounded-2xl border border-[#E8EEE8] shadow-xs space-y-3.5">
          <h3 className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
            Assigned Caregiver
          </h3>
          <div className="flex items-center gap-3.5">
            <img
              src={booking.caregiverPhoto}
              alt={booking.caregiverName}
              className="w-12 h-12 rounded-xl object-cover border border-[#E8EEE8]"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-[#1A1C1A] truncate">
                {booking.caregiverName}
              </h4>
              <p className="text-[11px] text-[#4E6E5D] font-medium">{booking.serviceName}</p>
              <div className="flex items-center gap-1 text-[10px] text-neutral-500 mt-0.5">
                <ShieldCheck size={12} className="text-[#4E6E5D]" />
                <span>Verified Provider • {booking.caregiverRating} ★</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#F2F4F2]">
            <button
              type="button"
              onClick={() => onStartChat(booking.caregiverId)}
              className="py-2 px-3 rounded-xl bg-[#F2F4F2] hover:bg-[#E8EEE8] active:scale-95 text-[#4E6E5D] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#E8EEE8]"
            >
              <MessageSquare size={13} />
              <span>Message</span>
            </button>
            <a
              href={`tel:${booking.caregiverPhone}`}
              className="py-2 px-3 rounded-xl bg-[#F8F9F8] hover:bg-[#E8EEE8] active:scale-95 text-neutral-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#E8EEE8]"
            >
              <Phone size={13} />
              <span>Call Provider</span>
            </a>
          </div>
        </div>

        {/* Session Schedule & Location */}
        <div className="p-4 bg-white rounded-2xl border border-[#E8EEE8] shadow-xs space-y-3">
          <h3 className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
            Time & Location
          </h3>
          <div className="space-y-2.5 text-xs text-neutral-700">
            <div className="flex items-start gap-2.5">
              <Calendar size={14} className="text-[#4E6E5D] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#1A1C1A]">{booking.date}</span>
                <p className="text-[11px] text-neutral-500 mt-0.5">{booking.timeSlot} ({booking.durationHours} Hours)</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin size={14} className="text-[#4E6E5D] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#1A1C1A]">{booking.address.label}</span>
                <p className="text-[11px] text-neutral-600 mt-0.5">
                  {booking.address.street} {booking.address.apt}, {booking.address.city}, {booking.address.state} {booking.address.zipCode}
                </p>
                {booking.address.landmark && (
                  <p className="text-[11px] text-neutral-400 mt-0.5 font-medium">
                    Note: {booking.address.landmark}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Care Recipient & Special Instructions */}
        <div className="p-4 bg-white rounded-2xl border border-[#E8EEE8] shadow-xs space-y-3">
          <h3 className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
            Care Details
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-neutral-500">Care Recipient:</span>
              <span className="font-semibold text-[#1A1C1A]">
                {booking.recipientName} ({booking.recipientRelationship})
              </span>
            </div>
            {booking.customNotes && (
              <div className="pt-2 border-t border-[#F2F4F2]">
                <span className="text-neutral-500 block mb-1">Special Notes:</span>
                <p className="text-neutral-700 bg-[#F8F9F8] p-2.5 rounded-xl leading-relaxed text-[11px] border border-[#E8EEE8]">
                  {booking.customNotes}
                </p>
              </div>
            )}
          </div>

          {/* Requirements Checklist */}
          {booking.specialRequirements.length > 0 && (
            <div className="pt-2 border-t border-[#F2F4F2]">
              <span className="text-neutral-500 text-xs block mb-1.5">Required Tasks:</span>
              <div className="flex flex-wrap gap-1.5">
                {booking.specialRequirements.map((req, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-[11px] font-medium bg-[#F2F4F2] text-[#4E6E5D] px-2.5 py-1 rounded-lg border border-[#E8EEE8]"
                  >
                    <CheckCircle2 size={12} className="text-[#4E6E5D]" />
                    <span>{req}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Payment & Invoice Breakdown */}
        <div className="p-4 bg-white rounded-2xl border border-[#E8EEE8] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
              Payment & Invoice
            </h3>
            <span className="text-[10px] font-semibold text-[#4E6E5D] bg-[#F2F4F2] px-2 py-0.5 rounded-full border border-[#E8EEE8]">
              Paid via {booking.paymentMethodLabel}
            </span>
          </div>

          <div className="space-y-1.5 text-xs text-neutral-600">
            <div className="flex justify-between">
              <span>Caregiver Rate ({booking.durationHours} hrs × ${booking.price.hourlyRate})</span>
              <span className="font-medium text-[#1A1C1A]">${booking.price.serviceFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Platform & Insurance Fee</span>
              <span className="font-medium text-[#1A1C1A]">${booking.price.platformFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes</span>
              <span className="font-medium text-[#1A1C1A]">${booking.price.taxes.toFixed(2)}</span>
            </div>
            {booking.price.discount && (
              <div className="flex justify-between text-[#4E6E5D] font-semibold">
                <span>Discount / Promo</span>
                <span>-${booking.price.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="pt-2 border-t border-[#F2F4F2] flex justify-between text-sm font-bold text-[#1A1C1A]">
              <span>Total Paid</span>
              <span className="text-[#4E6E5D]">${booking.price.total.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onViewInvoice(booking.invoiceId || 'inv-1')}
            className="w-full py-2.5 rounded-xl bg-[#F8F9F8] hover:bg-[#E8EEE8] active:scale-95 text-neutral-800 text-xs font-semibold flex items-center justify-center gap-1.5 border border-[#E8EEE8] transition-all cursor-pointer"
          >
            <Download size={13} />
            <span>Download Tax Receipt & Invoice</span>
          </button>
        </div>

        {/* Cancellation & Support actions */}
        {booking.status === 'upcoming' && (
          <div className="p-4 bg-white rounded-2xl border border-[#E8EEE8] shadow-xs space-y-2">
            <button
              type="button"
              onClick={() => setShowCancelModal(true)}
              className="w-full py-2.5 text-xs font-semibold text-rose-600 hover:text-rose-700 transition-colors cursor-pointer"
            >
              Cancel or Reschedule Booking
            </button>
          </div>
        )}
      </div>

      {/* CANCEL MODAL */}
      {showCancelModal && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full space-y-4 shadow-xl border border-[#E8EEE8]">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-100">
              <AlertTriangle size={22} />
            </div>

            <div className="text-center">
              <h3 className="text-sm font-bold text-[#1A1C1A]">
                Cancel Care Session?
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Cancellations made more than 12 hours before start time receive a 100% full refund immediately.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  onCancelBooking(booking.id);
                  setShowCancelModal(false);
                }}
                className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-all cursor-pointer"
              >
                Confirm Cancellation & Full Refund
              </button>

              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="w-full py-2.5 rounded-xl bg-[#F2F4F2] hover:bg-[#E8EEE8] text-neutral-700 text-xs font-semibold transition-all cursor-pointer border border-[#E8EEE8]"
              >
                Keep Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
