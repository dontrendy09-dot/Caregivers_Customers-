import React from 'react';
import {
  User,
  Users,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  ShieldCheck,
  Headphones,
  FileText,
  ChevronRight,
  LogOut,
  Wallet,
  Sparkles,
  Settings,
  HelpCircle
} from 'lucide-react';
import { CustomerProfile, AppScreen } from '../../types';
import { HeaderBar } from '../common/HeaderBar';

interface ProfileScreenProps {
  profile: CustomerProfile;
  favoritesCount: number;
  recipientsCount: number;
  unreadNotifsCount: number;
  onNavigate: (screen: AppScreen) => void;
  onLogout: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  profile,
  favoritesCount,
  recipientsCount,
  unreadNotifsCount,
  onNavigate,
  onLogout,
}) => {
  return (
    <div className="flex-1 pb-24 bg-[#F8F9F8] min-h-screen">
      <HeaderBar
        title="Account & Profile"
        subtitle="Manage family care settings"
        showBack={false}
      />

      <div className="px-5 py-4 space-y-4">
        {/* User Identity Card */}
        <div className="p-4 bg-white rounded-2xl border border-[#E8EEE8] shadow-xs flex items-center gap-3.5">
          <div className="relative">
            <img
              src={profile.photo}
              alt={profile.name}
              className="w-13 h-13 rounded-full object-cover border border-[#E8EEE8]"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="text-sm font-bold text-[#1A1C1A] truncate">
                {profile.name}
              </h3>
              <span className="text-[10px] font-semibold bg-[#F2F4F2] text-[#4E6E5D] px-2 py-0.5 rounded-full border border-[#E8EEE8]">
                Verified
              </span>
            </div>
            <p className="text-xs text-neutral-500 truncate mt-0.5">{profile.email}</p>
            <p className="text-xs text-neutral-400 truncate">{profile.phone}</p>
          </div>
        </div>

        {/* Wallet & Quick Stats */}
        <div className="p-4 bg-[#4E6E5D] text-white rounded-2xl shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[11px] text-white/80 font-semibold uppercase tracking-wider block">
              HavenCare Escrow Wallet
            </span>
            <div className="text-xl font-bold text-white mt-0.5">
              ${profile.walletBalance.toFixed(2)}
            </div>
            <span className="text-[11px] text-white/80">
              {profile.totalCompletedCareHours} Total Care Hours Completed
            </span>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('payments_history')}
            className="py-1.5 px-3 rounded-xl bg-white text-[#4E6E5D] font-semibold text-xs transition-colors cursor-pointer hover:bg-[#F2F4F2]"
          >
            Wallet & Invoices
          </button>
        </div>

        {/* Core Menu Sections */}
        <div className="bg-white rounded-2xl border border-[#E8EEE8] shadow-xs divide-y divide-[#F2F4F2] overflow-hidden">
          {/* Care Recipients */}
          <div
            onClick={() => onNavigate('care_recipients')}
            className="p-3.5 flex items-center justify-between hover:bg-[#F8F9F8] cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#F2F4F2] text-[#4E6E5D] flex items-center justify-center border border-[#E8EEE8]">
                <Users size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1A1C1A]">Care Recipients (Family)</h4>
                <p className="text-[11px] text-neutral-500">{recipientsCount} saved family profiles</p>
              </div>
            </div>
            <ChevronRight size={15} className="text-neutral-400" />
          </div>

          {/* Saved Caregivers (Favorites) */}
          <div
            onClick={() => onNavigate('favorites')}
            className="p-3.5 flex items-center justify-between hover:bg-[#F8F9F8] cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100">
                <Heart size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1A1C1A]">Saved Caregivers</h4>
                <p className="text-[11px] text-neutral-500">{favoritesCount} trusted caregivers</p>
              </div>
            </div>
            <ChevronRight size={15} className="text-neutral-400" />
          </div>

          {/* Saved Addresses */}
          <div
            onClick={() => onNavigate('addresses')}
            className="p-3.5 flex items-center justify-between hover:bg-[#F8F9F8] cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#F2F4F2] text-[#4E6E5D] flex items-center justify-center border border-[#E8EEE8]">
                <MapPin size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1A1C1A]">Saved Addresses</h4>
                <p className="text-[11px] text-neutral-500">Service locations & gate codes</p>
              </div>
            </div>
            <ChevronRight size={15} className="text-neutral-400" />
          </div>

          {/* Payment Methods & Invoices */}
          <div
            onClick={() => onNavigate('payments_history')}
            className="p-3.5 flex items-center justify-between hover:bg-[#F8F9F8] cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#F2F4F2] text-[#4E6E5D] flex items-center justify-center border border-[#E8EEE8]">
                <CreditCard size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1A1C1A]">Payments & Invoices</h4>
                <p className="text-[11px] text-neutral-500">Cards, receipts & tax deductions</p>
              </div>
            </div>
            <ChevronRight size={15} className="text-neutral-400" />
          </div>

          {/* Notifications */}
          <div
            onClick={() => onNavigate('notifications')}
            className="p-3.5 flex items-center justify-between hover:bg-[#F8F9F8] cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100">
                <Bell size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1A1C1A]">Notifications & Alerts</h4>
                <p className="text-[11px] text-neutral-500">Caregiver arrival & updates</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {unreadNotifsCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#4E6E5D] text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadNotifsCount}
                </span>
              )}
              <ChevronRight size={15} className="text-neutral-400" />
            </div>
          </div>
        </div>

        {/* Trust, Safety & Support Section */}
        <div className="bg-white rounded-2xl border border-[#E8EEE8] shadow-xs divide-y divide-[#F2F4F2] overflow-hidden">
          {/* Safety Center */}
          <div
            onClick={() => onNavigate('safety_center')}
            className="p-3.5 flex items-center justify-between hover:bg-[#F8F9F8] cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#F2F4F2] text-[#4E6E5D] flex items-center justify-center border border-[#E8EEE8]">
                <ShieldCheck size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1A1C1A]">Safety & Vetting Center</h4>
                <p className="text-[11px] text-neutral-500">Background checks & clinical insurance</p>
              </div>
            </div>
            <ChevronRight size={15} className="text-neutral-400" />
          </div>

          {/* 24/7 Concierge Support */}
          <div
            onClick={() => onNavigate('support')}
            className="p-3.5 flex items-center justify-between hover:bg-[#F8F9F8] cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#F2F4F2] text-[#4E6E5D] flex items-center justify-center border border-[#E8EEE8]">
                <Headphones size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1A1C1A]">24/7 Clinical Concierge & Help</h4>
                <p className="text-[11px] text-neutral-500">Live phone support & triage</p>
              </div>
            </div>
            <ChevronRight size={15} className="text-neutral-400" />
          </div>
        </div>

        {/* Logout button */}
        <button
          type="button"
          onClick={onLogout}
          className="w-full p-3.5 rounded-2xl bg-white hover:bg-rose-50 border border-[#E8EEE8] text-rose-600 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <LogOut size={15} />
          <span>Sign Out of HavenCare</span>
        </button>

        <p className="text-center text-[10px] text-neutral-400 pb-2">
          HavenCare Mobile v2.4.0 • HIPAA Compliant & Insured
        </p>
      </div>
    </div>
  );
};
