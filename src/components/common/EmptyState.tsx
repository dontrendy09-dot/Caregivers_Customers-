import React from 'react';
import { LucideIcon, SearchX } from 'lucide-react';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = SearchX,
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 max-w-sm mx-auto ${className}`}>
      <div className="w-16 h-16 rounded-2xl bg-[#F2F4F2] border border-[#E8EEE8] flex items-center justify-center text-[#4E6E5D] mb-4 shadow-xs">
        <Icon size={28} strokeWidth={1.8} />
      </div>
      <h3 className="text-base font-bold text-[#1A1C1A] mb-1.5">{title}</h3>
      <p className="text-xs text-neutral-500 leading-relaxed mb-6">{description}</p>
      
      <div className="flex flex-col gap-2.5 w-full">
        {actionLabel && onAction && (
          <button
            type="button"
            onClick={onAction}
            className="w-full py-3 px-4 rounded-xl bg-[#4E6E5D] hover:bg-[#3E584A] text-white font-semibold text-xs shadow-md shadow-[#4E6E5D]/20 active:scale-[0.98] transition-all cursor-pointer"
          >
            {actionLabel}
          </button>
        )}
        {secondaryActionLabel && onSecondaryAction && (
          <button
            type="button"
            onClick={onSecondaryAction}
            className="w-full py-2.5 px-4 rounded-xl bg-[#F2F4F2] hover:bg-[#E8EAE6] text-neutral-700 font-medium text-xs transition-all cursor-pointer"
          >
            {secondaryActionLabel}
          </button>
        )}
      </div>
    </div>
  );
};
