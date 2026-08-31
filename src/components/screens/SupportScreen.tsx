import React, { useState } from 'react';
import {
  Headphones,
  Phone,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Send,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { HeaderBar } from '../common/HeaderBar';

interface SupportScreenProps {
  onBack: () => void;
  onStartChat: (supportId: string) => void;
}

export const SupportScreen: React.FC<SupportScreenProps> = ({
  onBack,
  onStartChat,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [callbackRequested, setCallbackRequested] = useState(false);
  const [callbackPhone, setCallbackPhone] = useState('+1 (555) 234-5678');

  const faqs = [
    {
      q: 'How does HavenCare escrow payment protection work?',
      a: 'When you book a caregiver, your payment is securely held in an escrow account. The funds are only disbursed to the caregiver after the scheduled shift finishes and you confirm satisfactory care.'
    },
    {
      q: 'What happens if my caregiver is unable to attend?',
      a: 'Our 24/7 clinical concierge automatically dispatches a vetted backup caregiver in your neighborhood at no extra cost, or issues an instant 100% refund based on your preference.'
    },
    {
      q: 'Can I interview or chat with a caregiver before booking?',
      a: 'Yes! You can message any verified caregiver directly through their profile page to ask questions about clinical experience, routines, and availability before requesting care.'
    },
    {
      q: 'Are HavenCare services eligible for Long-Term Care Insurance?',
      a: 'Yes. All invoices generated in your HavenCare app include full taxonomy codes, provider NPI / license numbers, and itemized hours for long-term care insurance (LTCI) claim submissions.'
    }
  ];

  return (
    <div className="flex-1 pb-24 bg-[#F8F9F8] min-h-screen">
      <HeaderBar
        title="Help & Support"
        subtitle="24/7 HavenCare Clinical Concierge"
        showBack={true}
        onBack={onBack}
      />

      <div className="px-5 py-4 space-y-4">
        {/* Support Channels Card */}
        <div className="bg-white p-4 rounded-2xl border border-[#E8EEE8] shadow-xs space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F2F4F2] text-[#4E6E5D] flex items-center justify-center border border-[#E8EEE8]">
              <Headphones size={20} />
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#1A1C1A]">Need Immediate Help?</h3>
              <p className="text-[11px] text-neutral-500">Typical response time under 2 minutes</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <a
              href="tel:+18005550199"
              className="p-2.5 rounded-xl bg-[#4E6E5D] hover:bg-[#3E584A] active:scale-98 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <Phone size={13} />
              <span>Call Concierge</span>
            </a>

            <button
              type="button"
              onClick={() => onStartChat('support-team')}
              className="p-2.5 rounded-xl bg-[#F8F9F8] hover:bg-[#F2F4F2] border border-[#E8EEE8] active:scale-98 text-[#1A1C1A] font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <MessageSquare size={13} />
              <span>Live Chat</span>
            </button>
          </div>
        </div>

        {/* Request Immediate Callback */}
        <div className="bg-white p-4 rounded-2xl border border-[#E8EEE8] shadow-xs space-y-2.5">
          <h4 className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
            Request Clinical Callback
          </h4>
          <p className="text-xs text-neutral-600">
            A registered nurse or care specialist will call you within 15 minutes.
          </p>

          {callbackRequested ? (
            <div className="p-3 bg-[#F2F4F2] rounded-xl text-[#4E6E5D] text-xs font-semibold flex items-center gap-2 border border-[#E8EEE8]">
              <CheckCircle2 size={15} />
              <span>Callback requested! A care specialist is dialing you shortly.</span>
            </div>
          ) : (
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={callbackPhone}
                onChange={(e) => setCallbackPhone(e.target.value)}
                className="flex-1 p-2.5 bg-white border border-[#E8EEE8] rounded-xl text-xs font-medium text-[#1A1C1A] focus:outline-none focus:ring-1 focus:ring-[#4E6E5D]"
              />
              <button
                type="button"
                onClick={() => setCallbackRequested(true)}
                className="py-2.5 px-3.5 bg-[#4E6E5D] hover:bg-[#3E584A] text-white font-semibold text-xs rounded-xl transition-all cursor-pointer shadow-xs"
              >
                Request
              </button>
            </div>
          )}
        </div>

        {/* FAQs */}
        <div className="bg-white p-4 rounded-2xl border border-[#E8EEE8] shadow-xs space-y-3">
          <h4 className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
            Frequently Asked Questions
          </h4>

          <div className="space-y-2">
            {faqs.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="rounded-xl border border-[#E8EEE8] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-3 text-left text-xs font-semibold text-[#1A1C1A] bg-[#F8F9F8] hover:bg-[#F2F4F2] flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span>{item.q}</span>
                    {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                  {isOpen && (
                    <div className="p-3 bg-white text-xs text-neutral-600 leading-relaxed border-t border-[#E8EEE8]">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
