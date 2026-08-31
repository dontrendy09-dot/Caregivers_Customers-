import React from 'react';
import {
  Heart,
  Star,
  ShieldCheck,
  MapPin,
  Clock,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { Caregiver, AppScreen } from '../../types';
import { HeaderBar } from '../common/HeaderBar';
import { EmptyState } from '../common/EmptyState';
import { VerifiedBadge } from '../common/Badge';

interface FavoritesScreenProps {
  favoriteCaregivers: Caregiver[];
  onToggleFavorite: (id: string) => void;
  onSelectCaregiver: (id: string) => void;
  onRequestCare: (id: string) => void;
  onFindCare: () => void;
  onBack: () => void;
}

export const FavoritesScreen: React.FC<FavoritesScreenProps> = ({
  favoriteCaregivers,
  onToggleFavorite,
  onSelectCaregiver,
  onRequestCare,
  onFindCare,
  onBack,
}) => {
  return (
    <div className="flex-1 pb-24 bg-[#F8F9F8] min-h-screen">
      <HeaderBar
        title="Saved Caregivers"
        subtitle="Your trusted favorites list"
        showBack={true}
        onBack={onBack}
      />

      <div className="px-5 py-4 space-y-3.5">
        {favoriteCaregivers.length === 0 ? (
          <EmptyState
            title="No saved caregivers yet"
            description="Tap the heart icon on any caregiver's profile to save them here for fast repeat booking."
            actionLabel="Discover Caregivers"
            onAction={onFindCare}
            className="py-14"
          />
        ) : (
          favoriteCaregivers.map((cg) => (
            <div
              key={cg.id}
              className="bg-white rounded-2xl border border-[#E8EEE8] shadow-xs overflow-hidden p-4 space-y-3"
            >
              <div className="flex items-start gap-3.5">
                <img
                  src={cg.photo}
                  alt={cg.name}
                  className="w-13 h-13 rounded-xl object-cover border border-[#E8EEE8] shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <div>
                      <h3 className="text-xs font-bold text-[#1A1C1A] truncate">
                        {cg.name}
                      </h3>
                      <p className="text-[11px] text-[#4E6E5D] font-medium">{cg.mainSkill}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onToggleFavorite(cg.id)}
                      className="text-rose-500 p-1 active:scale-95 transition-all cursor-pointer"
                      aria-label="Remove favorite"
                    >
                      <Heart size={16} className="fill-rose-500" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-neutral-600 mt-1">
                    <div className="flex items-center gap-1 font-bold text-[#1A1C1A]">
                      <Star size={12} className="text-amber-400 fill-amber-400" />
                      <span>{cg.rating.toFixed(2)}</span>
                    </div>
                    <span>•</span>
                    <span>{cg.experienceYears}+ yrs exp</span>
                    <span>•</span>
                    <span className="font-bold text-[#1A1C1A]">${cg.hourlyRate}/hr</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2.5 border-t border-[#F2F4F2] gap-2">
                <button
                  type="button"
                  onClick={() => onSelectCaregiver(cg.id)}
                  className="text-xs font-semibold text-neutral-700 hover:text-[#1A1C1A] cursor-pointer"
                >
                  View Profile
                </button>

                <button
                  type="button"
                  onClick={() => onRequestCare(cg.id)}
                  className="py-1.5 px-3.5 rounded-xl bg-[#4E6E5D] hover:bg-[#3E584A] text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
                >
                  Request Care
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
