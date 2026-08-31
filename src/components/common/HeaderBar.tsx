import React from 'react';
import { ArrowLeft, Bell, Heart, Share2 } from 'lucide-react';

interface HeaderBarProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  showNotification?: boolean;
  unreadNotifsCount?: number;
  onNotificationClick?: () => void;
  showFavorite?: boolean;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
  showShare?: boolean;
  onShare?: () => void;
  rightAction?: React.ReactNode;
  transparent?: boolean;
  className?: string;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  title,
  subtitle,
  showBack = false,
  onBack,
  showNotification = false,
  unreadNotifsCount = 0,
  onNotificationClick,
  showFavorite = false,
  isFavorite = false,
  onFavoriteToggle,
  showShare = false,
  onShare,
  rightAction,
  transparent = false,
  className = ''
}) => {
  return (
    <header
      className={`sticky top-0 z-30 px-4 pt-3 pb-3 flex items-center justify-between transition-colors ${
        transparent
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-md border-b border-[#E8EEE8]'
      } ${className}`}
    >
      <div className="flex items-center gap-3 min-w-0">
        {showBack && (
          <button
            type="button"
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-[#F2F4F2] hover:bg-[#E8EAE6] active:scale-95 flex items-center justify-center text-[#1A1C1A] shrink-0 transition-all cursor-pointer"
            aria-label="Back"
          >
            <ArrowLeft size={17} />
          </button>
        )}

        {title && (
          <div className="min-w-0">
            <h1 className="text-base font-bold text-[#1A1C1A] truncate leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-neutral-500 truncate leading-tight">
                {subtitle}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        {showNotification && (
          <button
            type="button"
            onClick={onNotificationClick}
            className="relative w-9 h-9 rounded-full bg-[#F2F4F2] hover:bg-[#E8EAE6] active:scale-95 flex items-center justify-center text-[#1A1C1A] transition-all cursor-pointer"
            aria-label="Notifications"
          >
            <Bell size={17} />
            {unreadNotifsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#4E6E5D] rounded-full ring-2 ring-white" />
            )}
          </button>
        )}

        {showFavorite && (
          <button
            type="button"
            onClick={onFavoriteToggle}
            className={`w-9 h-9 rounded-full active:scale-95 flex items-center justify-center transition-all cursor-pointer ${
              isFavorite
                ? 'bg-rose-50 text-rose-500'
                : 'bg-[#F2F4F2] hover:bg-[#E8EAE6] text-neutral-600'
            }`}
            aria-label="Favorite"
          >
            <Heart size={17} className={isFavorite ? 'fill-rose-500 text-rose-500' : ''} />
          </button>
        )}

        {showShare && (
          <button
            type="button"
            onClick={onShare}
            className="w-9 h-9 rounded-full bg-[#F2F4F2] hover:bg-[#E8EAE6] active:scale-95 flex items-center justify-center text-neutral-600 transition-all cursor-pointer"
            aria-label="Share"
          >
            <Share2 size={17} />
          </button>
        )}

        {rightAction}
      </div>
    </header>
  );
};
