import React from 'react';
import {
  Bell,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Heart,
  ChevronRight,
  Trash2
} from 'lucide-react';
import { NotificationItem, AppScreen } from '../../types';
import { HeaderBar } from '../common/HeaderBar';
import { EmptyState } from '../common/EmptyState';

interface NotificationsScreenProps {
  notifications: NotificationItem[];
  onBack: () => void;
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
  onNotificationClick: (notif: NotificationItem) => void;
}

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  notifications,
  onBack,
  onMarkAsRead,
  onClearAll,
  onNotificationClick,
}) => {
  return (
    <div className="flex-1 pb-24 bg-[#F8F9F8] min-h-screen">
      <HeaderBar
        title="Notifications"
        subtitle="Live care alerts & booking updates"
        showBack={true}
        onBack={onBack}
      />

      <div className="px-5 py-4 space-y-3.5">
        <div className="flex items-center justify-between">
          <span className="text-xs text-neutral-500">
            {notifications.filter((n) => !n.isRead).length} unread updates
          </span>
          {notifications.length > 0 && (
            <button
              type="button"
              onClick={onClearAll}
              className="text-xs font-semibold text-[#4E6E5D] hover:underline cursor-pointer"
            >
              Mark all as read
            </button>
          )}
        </div>

        {notifications.length === 0 ? (
          <EmptyState
            title="All caught up!"
            description="You don't have any new notifications right now. Important care updates will appear here."
            className="py-14"
          />
        ) : (
          <div className="bg-white rounded-2xl border border-[#E8EEE8] shadow-xs divide-y divide-[#F2F4F2] overflow-hidden">
            {notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => {
                  onMarkAsRead(n.id);
                  onNotificationClick(n);
                }}
                className={`p-3.5 flex items-start gap-3 hover:bg-[#F8F9F8] cursor-pointer transition-colors ${
                  !n.isRead ? 'bg-[#F2F4F2]/50' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 border ${
                    n.type === 'booking'
                      ? 'bg-[#F2F4F2] text-[#4E6E5D] border-[#E8EEE8]'
                      : n.type === 'message'
                      ? 'bg-blue-50 text-blue-700 border-blue-100'
                      : n.type === 'health'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-100'
                      : 'bg-amber-50 text-amber-700 border-amber-100'
                  }`}
                >
                  <Bell size={15} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h4 className={`text-xs ${!n.isRead ? 'font-bold text-[#1A1C1A]' : 'font-semibold text-neutral-800'}`}>
                      {n.title}
                    </h4>
                    <span className="text-[10px] text-neutral-400 font-medium shrink-0">
                      {n.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 leading-snug">
                    {n.body}
                  </p>
                </div>

                {!n.isRead && (
                  <span className="w-2 h-2 rounded-full bg-[#4E6E5D] shrink-0 mt-2" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
