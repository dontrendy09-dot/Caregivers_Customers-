import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  Sparkles,
  RotateCcw,
  Star,
  Activity,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Booking, BookingStatus, AppScreen } from '../../types';
import { StatusBadge } from '../common/Badge';
import { EmptyState } from '../common/EmptyState';
import { HeaderBar } from '../common/HeaderBar';

interface BookingsScreenProps {
  bookings: Booking[];
  onViewBooking: (bookingId: string) => void;
  onTrackActiveSession: (bookingId: string) => void;
  onRebook: (caregiverId: string) => void;
  onLeaveReview: (booking: Booking) => void;
  onFindCare: () => void;
}

export const BookingsScreen: React.FC<BookingsScreenProps> = ({
  bookings,
  onViewBooking,
  onTrackActiveSession,
  onRebook,
  onLeaveReview,
  onFindCare,
}) => {
  const [activeTab, setActiveTab] = useState<BookingStatus | 'all'>('upcoming');

  const tabs: { id: BookingStatus | 'all'; label: string }[] = [
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'active', label: 'Active Live' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' },
  ];

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === 'all') return true;
    return b.status === activeTab;
  });

  return (
    <div className="flex-1 pb-24 bg-[#F8F9F8] min-h-screen">
      <HeaderBar
        title="My Bookings"
        subtitle="Manage your home care sessions"
        showBack={false}
      />

      {/* Tabs */}
      <div className="px-5 pt-3 bg-white border-b border-[#E8EEE8]">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3">
          {tabs.map((tab) => {
            const count = bookings.filter((b) => b.status === tab.id).length;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`py-1.5 px-3 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#4E6E5D] text-white shadow-xs'
                    : 'bg-[#F2F4F2] text-neutral-600 hover:bg-[#E8EEE8]'
                }`}
              >
                <span>{tab.label}</span>
                {count > 0 && (
                  <span
                    className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] ${
                      activeTab === tab.id ? 'bg-[#3E584A] text-white' : 'bg-[#E8EEE8] text-neutral-700'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bookings List */}
      <div className="px-5 py-4 space-y-3.5">
        {filteredBookings.length === 0 ? (
          <EmptyState
            title={`No ${activeTab} bookings`}
            description="When you request care for yourself or a loved one, your scheduled sessions will appear here."
            actionLabel="Find a Caregiver"
            onAction={onFindCare}
            className="py-12"
          />
        ) : (
          filteredBookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-2xl border border-[#E8EEE8] transition-all overflow-hidden shadow-xs hover:border-[#4E6E5D]/40"
            >
              <div className="p-4">
                {/* Header: Status + Booking Ref */}
                <div className="flex items-center justify-between pb-3 border-b border-[#F2F4F2]">
                  <StatusBadge status={b.status} />
                  <span className="text-[11px] font-mono font-medium text-neutral-400">
                    {b.bookingNumber}
                  </span>
                </div>

                {/* Body info */}
                <div
                  onClick={() => onViewBooking(b.id)}
                  className="flex items-center gap-3 py-3 cursor-pointer"
                >
                  <img
                    src={b.caregiverPhoto}
                    alt={b.caregiverName}
                    className="w-12 h-12 rounded-xl object-cover border border-[#E8EEE8] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-bold text-[#1A1C1A] truncate">
                      {b.caregiverName}
                    </h3>
                    <p className="text-[11px] font-medium text-[#4E6E5D] truncate">
                      {b.serviceName}
                    </p>
                    <p className="text-[10px] text-neutral-500 truncate mt-0.5">
                      For {b.recipientName} ({b.recipientRelationship})
                    </p>
                  </div>
                  <ChevronRight size={15} className="text-neutral-400 shrink-0" />
                </div>

                {/* Time and address meta */}
                <div className="bg-[#F8F9F8] rounded-xl p-2.5 space-y-1 text-xs text-neutral-600 border border-[#E8EEE8]">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[11px]">
                      <Calendar size={12} className="text-[#4E6E5D]" />
                      <span>{b.date} • {b.timeSlot}</span>
                    </span>
                    <span className="font-bold text-[#1A1C1A]">
                      ${b.price.total.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 truncate">
                    <MapPin size={11} className="text-[#4E6E5D] shrink-0" />
                    <span className="truncate">{b.address.street}, {b.address.city}</span>
                  </div>
                </div>

                {/* Actions Footer */}
                <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#F2F4F2] gap-2">
                  <button
                    type="button"
                    onClick={() => onViewBooking(b.id)}
                    className="text-xs font-semibold text-neutral-600 hover:text-[#1A1C1A] py-1 cursor-pointer"
                  >
                    View Details
                  </button>

                  <div className="flex items-center gap-2">
                    {b.status === 'active' && (
                      <button
                        type="button"
                        onClick={() => onTrackActiveSession(b.id)}
                        className="py-1.5 px-3 rounded-lg bg-[#4E6E5D] hover:bg-[#3E584A] active:scale-95 text-white text-xs font-medium flex items-center gap-1 shadow-xs transition-all cursor-pointer"
                      >
                        <Activity size={12} />
                        <span>Track Live Session</span>
                      </button>
                    )}

                    {b.status === 'completed' && !b.ratingGiven && (
                      <button
                        type="button"
                        onClick={() => onLeaveReview(b)}
                        className="py-1.5 px-3 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-medium flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <Star size={12} className="text-amber-500 fill-amber-500" />
                        <span>Rate & Review</span>
                      </button>
                    )}

                    {b.status === 'completed' && (
                      <button
                        type="button"
                        onClick={() => onRebook(b.caregiverId)}
                        className="py-1.5 px-3 rounded-lg bg-[#4E6E5D] hover:bg-[#3E584A] active:scale-95 text-white text-xs font-medium flex items-center gap-1 shadow-xs transition-all cursor-pointer"
                      >
                        <RotateCcw size={11} />
                        <span>Rebook</span>
                      </button>
                    )}

                    {b.status === 'upcoming' && (
                      <button
                        type="button"
                        onClick={() => onViewBooking(b.id)}
                        className="py-1.5 px-3 rounded-lg bg-[#F2F4F2] text-[#4E6E5D] hover:bg-[#E8EEE8] text-xs font-semibold transition-all cursor-pointer border border-[#E8EEE8]"
                      >
                        Manage Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
