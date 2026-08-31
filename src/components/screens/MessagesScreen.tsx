import React from 'react';
import {
  Search,
  MessageSquare,
  ChevronRight,
  ShieldCheck,
  Headphones
} from 'lucide-react';
import { Conversation, Caregiver, AppScreen } from '../../types';
import { HeaderBar } from '../common/HeaderBar';

interface MessagesScreenProps {
  conversations: Conversation[];
  caregivers: Caregiver[];
  onSelectConversation: (conversationId: string) => void;
  onContactSupport: () => void;
}

export const MessagesScreen: React.FC<MessagesScreenProps> = ({
  conversations,
  caregivers,
  onSelectConversation,
  onContactSupport,
}) => {
  return (
    <div className="flex-1 pb-24 bg-[#F8F9F8] min-h-screen">
      <HeaderBar
        title="Messages"
        subtitle="Direct communication with your caregivers"
        showBack={false}
      />

      <div className="px-5 py-4 space-y-3.5">
        {/* HavenCare 24/7 Clinical Support Banner */}
        <div
          onClick={onContactSupport}
          className="p-3.5 rounded-2xl bg-[#4E6E5D] text-white flex items-center justify-between cursor-pointer shadow-xs hover:bg-[#3E584A] transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 text-white flex items-center justify-center">
              <Headphones size={18} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">HavenCare Clinical Concierge</h4>
              <p className="text-[11px] text-white/80">24/7 Live care coordination support</p>
            </div>
          </div>
          <span className="text-[11px] font-semibold bg-white/20 px-2.5 py-1 rounded-full text-white">
            Chat Now
          </span>
        </div>

        {/* Conversation List */}
        <div className="bg-white rounded-2xl border border-[#E8EEE8] shadow-xs divide-y divide-[#F2F4F2] overflow-hidden">
          {conversations.map((conv) => {
            const caregiver = caregivers.find((cg) => cg.id === conv.caregiverId);
            return (
              <div
                key={conv.id}
                onClick={() => onSelectConversation(conv.id)}
                className="p-3.5 flex items-center gap-3 hover:bg-[#F8F9F8] active:bg-[#F2F4F2] cursor-pointer transition-colors"
              >
                <div className="relative shrink-0">
                  <img
                    src={conv.caregiverPhoto}
                    alt={conv.caregiverName}
                    className="w-11 h-11 rounded-xl object-cover border border-[#E8EEE8]"
                  />
                  {conv.isOnline && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h4 className="text-xs font-bold text-[#1A1C1A] truncate">
                      {conv.caregiverName}
                    </h4>
                    <span className="text-[10px] text-neutral-400 font-medium shrink-0">
                      {conv.lastMessageTime}
                    </span>
                  </div>

                  <p className="text-xs text-neutral-500 truncate leading-snug">
                    {conv.lastMessage}
                  </p>

                  {conv.bookingContext && (
                    <span className="text-[10px] text-[#4E6E5D] font-medium block mt-0.5">
                      Session: {conv.bookingContext}
                    </span>
                  )}
                </div>

                {conv.unreadCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#4E6E5D] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    {conv.unreadCount}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
