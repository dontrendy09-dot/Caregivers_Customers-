import React, { useState } from 'react';
import {
  Star,
  CheckCircle2,
  Heart,
  Sparkles,
  DollarSign,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Booking } from '../../types';
import { HeaderBar } from '../common/HeaderBar';

interface ReviewScreenProps {
  booking: Booking;
  onBack: () => void;
  onSubmitReview: (reviewData: {
    rating: number;
    tags: string[];
    comment: string;
    tipAmount: number;
  }) => void;
}

export const ReviewScreen: React.FC<ReviewScreenProps> = ({
  booking,
  onBack,
  onSubmitReview,
}) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('Elena was exceptionally warm, gentle, and attentive with mom. She prepared a wonderful tea and documented all vitals perfectly.');
  const [selectedTags, setSelectedTags] = useState<string[]>([
    'Punctual & Reliable',
    'Compassionate & Warm',
    'High Clinical Skill'
  ]);
  const [tipAmount, setTipAmount] = useState<number>(10);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const tagOptions = [
    'Punctual & Reliable',
    'Compassionate & Warm',
    'High Clinical Skill',
    'Great Communication',
    'Attentive to Detail',
    'Patient with Senior',
    'Cleaned up Carefully'
  ];

  const handleToggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      onSubmitReview({
        rating,
        tags: selectedTags,
        comment,
        tipAmount
      });
    }, 1200);
  };

  if (isSubmitted) {
    return (
      <div className="flex-1 pb-20 bg-[#F8F9F8] min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="w-14 h-14 rounded-full bg-[#F2F4F2] text-[#4E6E5D] flex items-center justify-center mx-auto mb-4 border border-[#E8EEE8]">
          <CheckCircle2 size={30} />
        </div>
        <h2 className="text-base font-bold text-[#1A1C1A]">
          Thank You for Your Feedback!
        </h2>
        <p className="text-xs text-neutral-500 mt-1 max-w-xs leading-relaxed">
          Your review helps other families find trusted care for their loved ones.
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 pb-28 bg-[#F8F9F8] min-h-screen">
      <HeaderBar
        title="Rate & Review"
        subtitle={`Session with ${booking.caregiverName}`}
        showBack={true}
        onBack={onBack}
      />

      <div className="px-5 py-4 space-y-4">
        {/* Caregiver Header Card */}
        <div className="p-4 bg-white rounded-2xl border border-[#E8EEE8] shadow-xs flex items-center gap-3.5">
          <img
            src={booking.caregiverPhoto}
            alt={booking.caregiverName}
            className="w-12 h-12 rounded-xl object-cover border border-[#E8EEE8]"
          />
          <div>
            <h3 className="text-xs font-bold text-[#1A1C1A]">
              {booking.caregiverName}
            </h3>
            <p className="text-[11px] text-[#4E6E5D] font-medium">{booking.serviceName}</p>
            <span className="text-[11px] text-neutral-400">
              {booking.date} • {booking.durationHours} Hours session
            </span>
          </div>
        </div>

        {/* Star Rating Selector */}
        <div className="p-5 bg-white rounded-2xl border border-[#E8EEE8] shadow-xs text-center space-y-3">
          <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
            How was your experience?
          </span>

          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                className="p-1 active:scale-110 transition-transform cursor-pointer"
              >
                <Star
                  size={28}
                  className={`${
                    (hoverRating || rating) >= star
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-neutral-200 fill-neutral-100'
                  } transition-colors`}
                />
              </button>
            ))}
          </div>

          <span className="text-xs font-semibold text-[#4E6E5D] block">
            {rating === 5 && 'Outstanding Care & Compassion'}
            {rating === 4 && 'Great Care & Very Helpful'}
            {rating === 3 && 'Good / Met Expectations'}
            {rating <= 2 && 'Needs Improvement'}
          </span>
        </div>

        {/* Compliment Tags */}
        <div className="p-4 bg-white rounded-2xl border border-[#E8EEE8] shadow-xs space-y-2.5">
          <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
            What went well?
          </span>
          <div className="flex flex-wrap gap-1.5">
            {tagOptions.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleToggleTag(tag)}
                  className={`py-1.5 px-3 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#4E6E5D] text-white border-[#4E6E5D] shadow-xs'
                      : 'bg-[#F8F9F8] text-neutral-700 border-[#E8EEE8] hover:bg-[#F2F4F2]'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Written Review */}
        <div className="p-4 bg-white rounded-2xl border border-[#E8EEE8] shadow-xs space-y-2">
          <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
            Write a Note of Appreciation
          </span>
          <textarea
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share details about the caregiver's warmth, punctuality, and clinical care..."
            className="w-full p-2.5 bg-white border border-[#E8EEE8] rounded-xl text-xs text-[#1A1C1A] focus:outline-none focus:ring-1 focus:ring-[#4E6E5D] leading-relaxed"
          />
        </div>

        {/* Optional Tip */}
        <div className="p-4 bg-white rounded-2xl border border-[#E8EEE8] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
              Add a Caregiver Tip (Optional)
            </span>
            <span className="text-[11px] text-[#4E6E5D] font-medium">100% goes to caregiver</span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[0, 5, 10, 15].map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setTipAmount(amt)}
                className={`py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  tipAmount === amt
                    ? 'bg-[#F2F4F2] border-[#4E6E5D] text-[#4E6E5D] ring-1 ring-[#4E6E5D]/20'
                    : 'bg-white border-[#E8EEE8] text-neutral-600 hover:bg-[#F8F9F8]'
                }`}
              >
                {amt === 0 ? 'No Tip' : `$${amt}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* STICKY BOTTOM SUBMIT */}
      <div className="sticky bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xs border-t border-[#E8EEE8] px-5 py-3.5 pb-6 shadow-md mt-auto">
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full py-3.5 rounded-xl bg-[#4E6E5D] hover:bg-[#3E584A] active:scale-[0.98] text-white font-semibold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>Submit Review & Rating</span>
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
};
