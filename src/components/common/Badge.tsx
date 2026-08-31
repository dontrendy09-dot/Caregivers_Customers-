import React from 'react';
import { ShieldCheck, CheckCircle2, Star } from 'lucide-react';

interface VerifiedBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({
  size = 'sm',
  showLabel = true,
  className = ''
}) => {
  const iconSize = size === 'sm' ? 12 : size === 'md' ? 14 : 16;
  const textSize = size === 'sm' ? 'text-[10px]' : size === 'md' ? 'text-xs' : 'text-sm';
  
  return (
    <span
      className={`inline-flex items-center gap-1 font-bold rounded-full bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 tracking-wide ${textSize} ${className}`}
      title="100% Background, License & Identity Verified"
    >
      <ShieldCheck size={iconSize} className="text-blue-600 shrink-0" />
      {showLabel && <span>Verified Pro</span>}
    </span>
  );
};

interface StatusBadgeProps {
  status: 'upcoming' | 'active' | 'completed' | 'cancelled' | 'paid' | 'pending' | 'refunded';
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  switch (status) {
    case 'active':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E8EAE6] text-[#4E6E5D] border border-[#E8EEE8] ${className}`}>
          <span className="w-2 h-2 rounded-full bg-[#4E6E5D] animate-ping" />
          <span>Active Now</span>
        </span>
      );
    case 'upcoming':
      return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100 ${className}`}>
          <span>Upcoming</span>
        </span>
      );
    case 'completed':
    case 'paid':
      return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200 ${className}`}>
          <CheckCircle2 size={12} />
          <span className="capitalize">{status}</span>
        </span>
      );
    case 'cancelled':
    case 'refunded':
      return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-100 ${className}`}>
          <span className="capitalize">{status}</span>
        </span>
      );
    case 'pending':
    default:
      return (
        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100 ${className}`}>
          <span className="capitalize">{status}</span>
        </span>
      );
  }
};
