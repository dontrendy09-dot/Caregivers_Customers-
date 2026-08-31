import React from 'react';
import {
  HeartHandshake,
  Stethoscope,
  Smile,
  Activity,
  Sparkles,
  Baby,
  ShieldCheck,
  Clock,
  ChevronRight,
  ArrowLeft,
  CheckCircle2
} from 'lucide-react';
import { CareCategory, CareCategoryId, AppScreen } from '../../types';
import { HeaderBar } from '../common/HeaderBar';

interface ServicesScreenProps {
  categories: CareCategory[];
  onSelectCategory: (categoryId: CareCategoryId) => void;
  onBack: () => void;
}

export const ServicesScreen: React.FC<ServicesScreenProps> = ({
  categories,
  onSelectCategory,
  onBack,
}) => {
  const renderCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartHandshake':
        return <HeartHandshake size={22} />;
      case 'Stethoscope':
        return <Stethoscope size={22} />;
      case 'Smile':
        return <Smile size={22} />;
      case 'Activity':
        return <Activity size={22} />;
      case 'Sparkles':
        return <Sparkles size={22} />;
      case 'Baby':
        return <Baby size={22} />;
      case 'ShieldCheck':
        return <ShieldCheck size={22} />;
      case 'Clock':
      default:
        return <Clock size={22} />;
    }
  };

  return (
    <div className="flex-1 pb-24 bg-[#F8F9F8] min-h-screen">
      <HeaderBar
        title="Care Services"
        subtitle="Explore specialized home care categories"
        showBack={true}
        onBack={onBack}
      />

      <div className="px-5 py-4 space-y-3.5">
        <div className="p-4 bg-[#4E6E5D] text-white rounded-2xl shadow-xs">
          <h2 className="text-xs font-bold text-white">
            Custom Care Designed for Your Loved Ones
          </h2>
          <p className="text-[11px] text-white/80 mt-1 leading-relaxed">
            All services are delivered by licensed, background-verified caregivers with flexible scheduling.
          </p>
        </div>

        <div className="space-y-2.5">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="bg-white p-3.5 rounded-2xl border border-[#E8EEE8] hover:border-[#4E6E5D]/50 active:scale-[0.99] transition-all shadow-xs flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#F2F4F2] text-[#4E6E5D] flex items-center justify-center shrink-0 border border-[#E8EEE8] group-hover:bg-[#4E6E5D] group-hover:text-white transition-colors">
                  {renderCategoryIcon(cat.iconName)}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-[#1A1C1A] truncate">
                      {cat.name}
                    </h3>
                    {cat.badge && (
                      <span className="text-[9px] font-semibold bg-[#F2F4F2] text-[#4E6E5D] px-1.5 py-0.5 rounded-full border border-[#E8EEE8]">
                        {cat.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-500 truncate mt-0.5">
                    {cat.shortDesc}
                  </p>
                  <span className="text-[11px] font-semibold text-[#4E6E5D] mt-0.5 block">
                    Starting from ${cat.startingPrice}/hr
                  </span>
                </div>
              </div>

              <div className="w-7 h-7 rounded-full bg-[#F2F4F2] flex items-center justify-center text-neutral-400 group-hover:bg-[#E8EEE8] group-hover:text-[#4E6E5D] shrink-0 ml-2 transition-colors">
                <ChevronRight size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
