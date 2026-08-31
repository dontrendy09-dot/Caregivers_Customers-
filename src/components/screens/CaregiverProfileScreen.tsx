import React, { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  Share2,
  Star,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MessageSquare,
  Award,
  BookOpen,
  ChevronRight,
  Sparkles,
  Phone,
  ThumbsUp,
  FileCheck2
} from 'lucide-react';
import { Caregiver, CareCategory, AppScreen } from '../../types';
import { VerifiedBadge } from '../common/Badge';
import { RatingStars } from '../common/RatingStars';

interface CaregiverProfileScreenProps {
  caregiver: Caregiver;
  categories: CareCategory[];
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onBack: () => void;
  onRequestCare: (caregiverId: string) => void;
  onStartChat: (caregiverId: string) => void;
}

export const CaregiverProfileScreen: React.FC<CaregiverProfileScreenProps> = ({
  caregiver,
  categories,
  isFavorite,
  onToggleFavorite,
  onBack,
  onRequestCare,
  onStartChat,
}) => {
  const [selectedDateIdx, setSelectedDateIdx] = useState(0);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(
    caregiver.availableSlots[0]?.slots[0] || '9:00 AM'
  );
  const [activeTab, setActiveTab] = useState<'about' | 'experience' | 'reviews'>('about');

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${caregiver.name} on HavenCare`,
        text: `Check out ${caregiver.name}'s verified caregiver profile on HavenCare.`,
        url: window.location.href
      }).catch(() => {});
    }
  };

  return (
    <div className="flex-1 pb-28 bg-[#F8F9F8] min-h-screen relative">
      {/* Top Floating Nav Bar */}
      <div className="sticky top-0 left-0 right-0 z-30 px-4 pt-3 pb-2 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-xs text-neutral-800 flex items-center justify-center active:scale-95 transition-all cursor-pointer border border-[#E8EEE8]"
          aria-label="Go Back"
        >
          <ArrowLeft size={16} />
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-xs text-neutral-800 flex items-center justify-center active:scale-95 transition-all cursor-pointer border border-[#E8EEE8]"
            aria-label="Share"
          >
            <Share2 size={15} />
          </button>
          <button
            type="button"
            onClick={() => onToggleFavorite(caregiver.id)}
            className={`w-9 h-9 rounded-full bg-white/90 backdrop-blur-md shadow-xs flex items-center justify-center active:scale-95 transition-all cursor-pointer border border-[#E8EEE8] ${
              isFavorite ? 'text-rose-500' : 'text-neutral-700 hover:text-rose-500'
            }`}
            aria-label="Save"
          >
            <Heart size={16} className={isFavorite ? 'fill-rose-500 text-rose-500' : ''} />
          </button>
        </div>
      </div>

      {/* Hero Profile Photo & Identity */}
      <div className="relative h-64 bg-[#1A1C1A]">
        <img
          src={caregiver.photo}
          alt={caregiver.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1C1A] via-[#1A1C1A]/30 to-black/20" />

        <div className="absolute bottom-4 left-5 right-5 text-white">
          <div className="flex items-center gap-2 mb-1.5">
            <VerifiedBadge size="sm" showLabel={true} className="bg-white/90 text-[#4E6E5D] border-0 shadow-xs" />
            {caregiver.availableToday && (
              <span className="bg-[#4E6E5D] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                ● Available Today
              </span>
            )}
          </div>
          <h1 className="text-xl font-bold font-serif tracking-tight text-white leading-tight">
            {caregiver.name}
          </h1>
          <p className="text-xs text-neutral-200 font-medium mt-0.5">
            {caregiver.mainSkill}
          </p>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="bg-white border-b border-[#E8EEE8] px-5 py-3 shadow-xs">
        <div className="grid grid-cols-4 gap-2 text-center divide-x divide-[#E8EEE8]">
          <div>
            <div className="flex items-center justify-center gap-0.5 text-xs font-bold text-[#1A1C1A]">
              <Star size={12} className="text-amber-400 fill-amber-400" />
              <span>{caregiver.rating.toFixed(1)}</span>
            </div>
            <span className="text-[10px] text-neutral-400 uppercase font-medium">
              {caregiver.reviewsCount} reviews
            </span>
          </div>

          <div>
            <div className="text-xs font-bold text-[#1A1C1A]">
              {caregiver.experienceYears} Yrs
            </div>
            <span className="text-[10px] text-neutral-400 uppercase font-medium">
              Experience
            </span>
          </div>

          <div>
            <div className="text-xs font-bold text-[#4E6E5D]">
              {caregiver.completedBookingsCount}
            </div>
            <span className="text-[10px] text-neutral-400 uppercase font-medium">
              Sessions
            </span>
          </div>

          <div>
            <div className="text-xs font-bold text-[#1A1C1A]">
              ${caregiver.hourlyRate}
            </div>
            <span className="text-[10px] text-neutral-400 uppercase font-medium">
              Per Hour
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-5 pt-3 bg-[#F8F9F8]">
        <div className="flex items-center gap-1.5 p-1 bg-[#F2F4F2] rounded-xl border border-[#E8EEE8]">
          {[
            { id: 'about', label: 'About & Services' },
            { id: 'experience', label: 'Experience & Trust' },
            { id: 'reviews', label: `Reviews (${caregiver.reviewsCount})` }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white text-[#4E6E5D] shadow-xs'
                  : 'text-neutral-500 hover:text-[#1A1C1A]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: ABOUT & SERVICES */}
      {activeTab === 'about' && (
        <div className="px-5 py-4 space-y-4">
          {/* About Bio */}
          <div className="bg-white p-4 rounded-2xl border border-[#E8EEE8] shadow-xs">
            <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2">
              Caregiver Introduction
            </h3>
            <p className="text-xs text-[#1A1C1A] leading-relaxed">
              {caregiver.bio}
            </p>

            <div className="mt-3.5 pt-3 border-t border-[#F2F4F2] flex items-center justify-between text-[11px] text-neutral-500">
              <span className="flex items-center gap-1.5">
                <MapPin size={12} className="text-[#4E6E5D]" />
                <span>{caregiver.location}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={12} className="text-[#4E6E5D]" />
                <span>Replies in {caregiver.responseTime}</span>
              </span>
            </div>
          </div>

          {/* Core Services Offered */}
          <div className="bg-white p-4 rounded-2xl border border-[#E8EEE8] shadow-xs">
            <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2.5">
              Services Offered
            </h3>
            <div className="flex flex-wrap gap-2">
              {caregiver.services.map((srvId) => {
                const serviceInfo = categories.find((c) => c.id === srvId);
                return (
                  <div
                    key={srvId}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F2F4F2] text-[#4E6E5D] text-xs font-semibold border border-[#E8EEE8]"
                  >
                    <CheckCircle2 size={13} className="text-[#4E6E5D]" />
                    <span>{serviceInfo?.name || srvId}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Skills & Specialties */}
          <div className="bg-white p-4 rounded-2xl border border-[#E8EEE8] shadow-xs">
            <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2.5">
              Skills & Expertise
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {caregiver.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-2.5 py-1 rounded-lg bg-[#F8F9F8] text-neutral-700 text-xs font-medium border border-[#E8EEE8]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Spoken Languages */}
          <div className="bg-white p-4 rounded-2xl border border-[#E8EEE8] shadow-xs">
            <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2">
              Languages Spoken
            </h3>
            <div className="flex items-center gap-2">
              {caregiver.languages.map((lang, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full bg-[#F2F4F2] text-neutral-700 text-xs font-medium border border-[#E8EEE8]"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* Transparent Pricing Breakdown */}
          <div className="bg-white p-4 rounded-2xl border border-[#E8EEE8] shadow-xs">
            <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-3">
              Standard Rates
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F8F9F8] border border-[#E8EEE8]">
                <span className="font-semibold text-[#1A1C1A]">Hourly Rate (Min 2 hrs)</span>
                <span className="font-bold text-[#4E6E5D]">${caregiver.hourlyRate}/hr</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F8F9F8] border border-[#E8EEE8]">
                <span className="font-semibold text-[#1A1C1A]">Day Rate (8 hrs block)</span>
                <span className="font-bold text-[#4E6E5D]">${caregiver.dailyRate}/day</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#F8F9F8] border border-[#E8EEE8]">
                <span className="font-semibold text-[#1A1C1A]">Overnight Stay (10 hrs)</span>
                <span className="font-bold text-[#4E6E5D]">${caregiver.overnightRate}/night</span>
              </div>
            </div>
          </div>

          {/* Availability Calendar & Slots */}
          <div className="bg-white p-4 rounded-2xl border border-[#E8EEE8] shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                Availability & Time Slots
              </h3>
              <span className="text-[10px] text-[#4E6E5D] font-bold">Real-time schedule</span>
            </div>

            {/* Date selector tabs */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              {caregiver.availableSlots.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setSelectedDateIdx(idx);
                    if (item.slots[0]) setSelectedTimeSlot(item.slots[0]);
                  }}
                  className={`py-2 px-2 rounded-xl text-center border transition-all cursor-pointer ${
                    selectedDateIdx === idx
                      ? 'bg-[#F2F4F2] border-[#4E6E5D] text-[#4E6E5D] font-bold'
                      : 'bg-[#F8F9F8] border-[#E8EEE8] text-neutral-600 hover:bg-[#F2F4F2]'
                  }`}
                >
                  <span className="text-[11px] block">{item.date}</span>
                  <span className="text-[10px] text-neutral-400">{item.slots.length} slots</span>
                </button>
              ))}
            </div>

            {/* Time slot chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {caregiver.availableSlots[selectedDateIdx]?.slots.map((slot, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedTimeSlot(slot)}
                  className={`py-1.5 px-3 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                    selectedTimeSlot === slot
                      ? 'bg-[#4E6E5D] text-white border-[#4E6E5D] shadow-xs'
                      : 'bg-[#F8F9F8] border-[#E8EEE8] text-neutral-700 hover:bg-[#F2F4F2]'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: EXPERIENCE & TRUST VERIFICATION */}
      {activeTab === 'experience' && (
        <div className="px-5 py-4 space-y-4">
          {/* Trust & Safety Checklist */}
          <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-xs">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
              HavenCare Verification Status
            </h3>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-neutral-700">
                  <CheckCircle2 size={16} className="text-teal-600" />
                  <span>Government Identity Verified</span>
                </span>
                <span className="font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded text-[11px]">Pass</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-neutral-700">
                  <CheckCircle2 size={16} className="text-teal-600" />
                  <span>National Criminal Background Check</span>
                </span>
                <span className="font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded text-[11px]">Clean</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-neutral-700">
                  <CheckCircle2 size={16} className="text-teal-600" />
                  <span>Medical Licenses & Registry Authenticated</span>
                </span>
                <span className="font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded text-[11px]">Active</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-neutral-700">
                  <CheckCircle2 size={16} className="text-teal-600" />
                  <span>Professional Reference Interviews (3)</span>
                </span>
                <span className="font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded text-[11px]">Verified</span>
              </div>
            </div>
          </div>

          {/* Certifications & Licenses */}
          <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-xs">
            <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-3">
              Certifications & Credentials
            </h3>
            <div className="space-y-3">
              {caregiver.certifications.map((cert, index) => (
                <div
                  key={index}
                  className="p-3 rounded-xl bg-neutral-50 border border-neutral-100 flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center shrink-0 mt-0.5">
                    <FileCheck2 size={16} />
                  </div>
                  <div className="flex-1 min-w-0 text-xs">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-neutral-900 truncate">
                        {cert.name}
                      </h4>
                      {cert.verified && (
                        <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded">
                          Verified
                        </span>
                      )}
                    </div>
                    <p className="text-neutral-500 mt-0.5">{cert.issuingOrg}</p>
                    {cert.licenseNumber && (
                      <p className="text-[11px] text-neutral-400 mt-0.5 font-mono">
                        License: {cert.licenseNumber} • Issued {cert.issueYear}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CUSTOMER REVIEWS */}
      {activeTab === 'reviews' && (
        <div className="px-5 py-4 space-y-4">
          {/* Rating Summary Card */}
          <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-xs">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-center">
                <div className="text-3xl font-extrabold text-neutral-900 font-heading">
                  {caregiver.rating.toFixed(2)}
                </div>
                <RatingStars rating={caregiver.rating} size={13} />
                <span className="text-[11px] text-neutral-400 block mt-0.5">
                  {caregiver.reviewsCount} verified reviews
                </span>
              </div>

              {/* Progress Bars */}
              <div className="flex-1 space-y-1 text-xs">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = caregiver.ratingBreakdown[stars as keyof typeof caregiver.ratingBreakdown] || 0;
                  const pct = Math.round((count / caregiver.reviewsCount) * 100);
                  return (
                    <div key={stars} className="flex items-center gap-2 text-[11px]">
                      <span className="w-3 text-neutral-500">{stars}</span>
                      <div className="flex-1 h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="w-6 text-neutral-400 text-right">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-neutral-100 text-center text-xs">
              <div className="p-2 bg-neutral-50 rounded-xl">
                <span className="text-[10px] text-neutral-400 uppercase block font-semibold">Quality</span>
                <span className="font-bold text-neutral-900">4.98 ⭐</span>
              </div>
              <div className="p-2 bg-neutral-50 rounded-xl">
                <span className="text-[10px] text-neutral-400 uppercase block font-semibold">Punctuality</span>
                <span className="font-bold text-neutral-900">5.0 ⭐</span>
              </div>
              <div className="p-2 bg-neutral-50 rounded-xl">
                <span className="text-[10px] text-neutral-400 uppercase block font-semibold">Comm.</span>
                <span className="font-bold text-neutral-900">4.95 ⭐</span>
              </div>
            </div>
          </div>

          {/* Review Items List */}
          <div className="space-y-3">
            {caregiver.recentReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-xs space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    {rev.authorPhoto ? (
                      <img
                        src={rev.authorPhoto}
                        alt={rev.authorName}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center text-xs">
                        {rev.authorName[0]}
                      </div>
                    )}
                    <div>
                      <h4 className="text-xs font-bold text-neutral-900">
                        {rev.authorName}
                      </h4>
                      <span className="text-[11px] text-neutral-400">
                        Booked {rev.serviceName} • {rev.date}
                      </span>
                    </div>
                  </div>
                  <RatingStars rating={rev.rating} size={12} />
                </div>

                <p className="text-xs text-neutral-700 leading-relaxed">
                  "{rev.comment}"
                </p>

                {rev.helpfulCount && (
                  <div className="flex items-center gap-1 text-[11px] text-neutral-400 pt-1">
                    <ThumbsUp size={11} />
                    <span>{rev.helpfulCount} people found this helpful</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STICKY BOTTOM CTA BAR */}
      <div className="sticky bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8EEE8] px-4 py-3 pb-6 flex items-center justify-between gap-3 shadow-lg mt-auto">
        <div className="shrink-0">
          <span className="text-[10px] text-neutral-400 uppercase font-semibold block">Total Rate</span>
          <div className="text-sm font-bold text-[#1A1C1A] leading-tight">
            ${caregiver.hourlyRate}<span className="text-xs font-normal text-neutral-500">/hr</span>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-1 justify-end">
          <button
            type="button"
            onClick={() => onStartChat(caregiver.id)}
            className="p-2.5 rounded-xl bg-[#F2F4F2] hover:bg-[#E8EEE8] active:scale-95 text-[#1A1C1A] transition-all flex items-center justify-center cursor-pointer border border-[#E8EEE8]"
            aria-label="Message Caregiver"
          >
            <MessageSquare size={16} />
          </button>

          <button
            type="button"
            onClick={() => onRequestCare(caregiver.id)}
            className="flex-1 max-w-[200px] py-3 px-4 rounded-xl bg-[#4E6E5D] hover:bg-[#3E584A] active:scale-[0.98] text-white font-medium text-xs shadow-xs text-center transition-all cursor-pointer"
          >
            Request Care Now
          </button>
        </div>
      </div>
    </div>
  );
};
