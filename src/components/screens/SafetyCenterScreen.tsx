import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  FileCheck2,
  UserCheck,
  Award,
  Phone,
  AlertTriangle
} from 'lucide-react';
import { HeaderBar } from '../common/HeaderBar';

interface SafetyCenterScreenProps {
  onBack: () => void;
}

export const SafetyCenterScreen: React.FC<SafetyCenterScreenProps> = ({ onBack }) => {
  return (
    <div className="flex-1 pb-24 bg-[#F8F9F8] min-h-screen">
      <HeaderBar
        title="Safety & Trust"
        subtitle="Our rigorous vetting standards"
        showBack={true}
        onBack={onBack}
      />

      <div className="px-5 py-4 space-y-4">
        {/* Banner */}
        <div className="p-5 bg-[#4E6E5D] text-white rounded-2xl shadow-xs text-center space-y-2">
          <div className="w-11 h-11 rounded-full bg-white/15 text-white flex items-center justify-center mx-auto">
            <ShieldCheck size={24} />
          </div>
          <h2 className="text-sm font-bold text-white">
            The HavenCare Safety Standard
          </h2>
          <p className="text-xs text-white/80 leading-relaxed max-w-xs mx-auto">
            Only 6% of caregiver applicants pass our 7-tier background and clinical verification process.
          </p>
        </div>

        {/* 7-Tier Verification Breakdown */}
        <div className="bg-white p-4 rounded-2xl border border-[#E8EEE8] shadow-xs space-y-3.5">
          <h3 className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
            Our 7-Tier Screening Protocol
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-[#F2F4F2] text-[#4E6E5D] flex items-center justify-center shrink-0 font-bold text-xs border border-[#E8EEE8]">
                1
              </div>
              <div>
                <h4 className="font-semibold text-[#1A1C1A]">Government ID & Biometric Verification</h4>
                <p className="text-neutral-500 mt-0.5 text-[11px]">SSN verification and biometric face match to prevent identity fraud.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-[#F2F4F2] text-[#4E6E5D] flex items-center justify-center shrink-0 font-bold text-xs border border-[#E8EEE8]">
                2
              </div>
              <div>
                <h4 className="font-semibold text-[#1A1C1A]">Federal & State Criminal Background Check</h4>
                <p className="text-neutral-500 mt-0.5 text-[11px]">Comprehensive multi-county, state and federal registry criminal audit.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-[#F2F4F2] text-[#4E6E5D] flex items-center justify-center shrink-0 font-bold text-xs border border-[#E8EEE8]">
                3
              </div>
              <div>
                <h4 className="font-semibold text-[#1A1C1A]">Medical License Authentication</h4>
                <p className="text-neutral-500 mt-0.5 text-[11px]">Direct API verification with state nursing and health worker boards.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-[#F2F4F2] text-[#4E6E5D] flex items-center justify-center shrink-0 font-bold text-xs border border-[#E8EEE8]">
                4
              </div>
              <div>
                <h4 className="font-semibold text-[#1A1C1A]">3-Stage Professional Reference Checks</h4>
                <p className="text-neutral-500 mt-0.5 text-[11px]">Structured phone interviews with former supervisors and families.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-[#F2F4F2] text-[#4E6E5D] flex items-center justify-center shrink-0 font-bold text-xs border border-[#E8EEE8]">
                5
              </div>
              <div>
                <h4 className="font-semibold text-[#1A1C1A]">$2,000,000 Comprehensive Liability Insurance</h4>
                <p className="text-neutral-500 mt-0.5 text-[11px]">Every booking is automatically insured and bonded against incidents.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-[#F2F4F2] text-[#4E6E5D] flex items-center justify-center shrink-0 font-bold text-xs border border-[#E8EEE8]">
                6
              </div>
              <div>
                <h4 className="font-semibold text-[#1A1C1A]">Escrow Payment Protection</h4>
                <p className="text-neutral-500 mt-0.5 text-[11px]">Caregivers are paid only after customer confirms successful shift completion.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-lg bg-[#F2F4F2] text-[#4E6E5D] flex items-center justify-center shrink-0 font-bold text-xs border border-[#E8EEE8]">
                7
              </div>
              <div>
                <h4 className="font-semibold text-[#1A1C1A]">24/7 Clinical Emergency Rapid Response</h4>
                <p className="text-neutral-500 mt-0.5 text-[11px]">Registered nurses on standby for emergency triage and backup staffing.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
