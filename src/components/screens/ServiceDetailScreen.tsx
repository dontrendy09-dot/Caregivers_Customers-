import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Star,
  Users,
  ShieldCheck,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { CareService, CareCategory, Caregiver, AppScreen } from '../../types';
import { HeaderBar } from '../common/HeaderBar';

interface ServiceDetailScreenProps {
  service: CareService;
  category: CareCategory;
  caregivers: Caregiver[];
  onBack: () => void;
  onFindCaregivers: (categoryId: string) => void;
  onSelectCaregiver: (caregiverId: string) => void;
}

export const ServiceDetailScreen: React.FC<ServiceDetailScreenProps> = ({
  service,
  category,
  caregivers,
  onBack,
  onFindCaregivers,
  onSelectCaregiver,
}) => {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const matchedCaregivers = caregivers.filter((cg) => cg.services.includes(service.id));

  return (
    <div className="flex-1 pb-28 bg-[#F8F9F8] min-h-screen">
      <HeaderBar
        title={service.name}
        subtitle="Detailed Service Overview"
        showBack={true}
        onBack={onBack}
      />

      <div className="px-5 py-4 space-y-4">
        {/* Service Hero Banner */}
        <div className="bg-[#4E6E5D] rounded-2xl p-5 text-white shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-white/80">
              Starting at ${service.startingPrice}/hr
            </span>
            <span className="bg-white/20 text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
              {matchedCaregivers.length} Available Nearby
            </span>
          </div>
          <h2 className="text-base font-bold text-white mb-1.5">
            {service.name}
          </h2>
          <p className="text-xs text-white/85 leading-relaxed">
            {service.overview}
          </p>
        </div>

        {/* What Is Included */}
        <div className="bg-white p-4 rounded-2xl border border-[#E8EEE8] shadow-xs">
          <h3 className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-3">
            What is Included
          </h3>
          <div className="space-y-2">
            {service.whatIncluded.map((item, index) => (
              <div key={index} className="flex items-start gap-2.5 text-xs text-[#1A1C1A]">
                <CheckCircle2 size={15} className="text-[#4E6E5D] shrink-0 mt-0.5" />
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Who Needs This Service */}
        <div className="bg-white p-4 rounded-2xl border border-[#E8EEE8] shadow-xs">
          <h3 className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-3">
            Who Needs This Service
          </h3>
          <div className="space-y-2">
            {service.whoNeedsThis.map((item, index) => (
              <div key={index} className="flex items-start gap-2.5 text-xs text-neutral-700">
                <div className="w-1.5 h-1.5 rounded-full bg-[#4E6E5D] shrink-0 mt-1.5" />
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Available Caregivers in Category */}
        <div className="bg-white p-4 rounded-2xl border border-[#E8EEE8] shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
              Top Rated in {service.name.split(' ')[0]}
            </h3>
            <button
              type="button"
              onClick={() => onFindCaregivers(service.id)}
              className="text-xs font-semibold text-[#4E6E5D] hover:underline cursor-pointer"
            >
              View All ({matchedCaregivers.length})
            </button>
          </div>

          <div className="space-y-2.5">
            {matchedCaregivers.slice(0, 2).map((cg) => (
              <div
                key={cg.id}
                onClick={() => onSelectCaregiver(cg.id)}
                className="p-3 rounded-xl bg-[#F8F9F8] hover:bg-[#F2F4F2] border border-[#E8EEE8] flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={cg.photo}
                    alt={cg.name}
                    className="w-10 h-10 rounded-xl object-cover border border-[#E8EEE8]"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-[#1A1C1A]">{cg.name}</h4>
                    <div className="flex items-center gap-1 text-[11px] text-neutral-500">
                      <Star size={11} className="text-amber-400 fill-amber-400" />
                      <span>{cg.rating.toFixed(2)} ({cg.reviewsCount})</span>
                      <span>•</span>
                      <span>${cg.hourlyRate}/hr</span>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-xs font-semibold text-[#4E6E5D] cursor-pointer"
                >
                  Profile →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="bg-white p-4 rounded-2xl border border-[#E8EEE8] shadow-xs">
          <h3 className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-3">
            Frequently Asked Questions
          </h3>
          <div className="space-y-2">
            {service.faqs.map((faq, index) => {
              const isOpen = openFaqIdx === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-[#E8EEE8] overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : index)}
                    className="w-full p-3 text-left flex items-center justify-between text-xs font-semibold text-[#1A1C1A] bg-[#F8F9F8] hover:bg-[#F2F4F2] transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                  {isOpen && (
                    <div className="p-3 bg-white text-xs text-neutral-600 leading-relaxed border-t border-[#E8EEE8]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* STICKY BOTTOM CTA */}
      <div className="sticky bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xs border-t border-[#E8EEE8] px-5 py-3 pb-6 flex items-center justify-between gap-4 shadow-md mt-auto">
        <div>
          <span className="text-[10px] text-neutral-400 uppercase font-semibold block">Hourly Rates From</span>
          <div className="text-base font-bold text-[#1A1C1A] leading-tight">
            ${service.startingPrice}<span className="text-xs font-normal text-neutral-500">/hr</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onFindCaregivers(service.id)}
          className="flex-1 py-3 px-4 rounded-xl bg-[#4E6E5D] hover:bg-[#3E584A] active:scale-[0.98] text-white font-semibold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>Find Available Caregivers</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
