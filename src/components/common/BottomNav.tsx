import React from 'react';
import { Home, Search, Calendar, MessageSquare, User } from 'lucide-react';
import { AppScreen } from '../../types';

interface BottomNavProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  unreadMessagesCount?: number;
  activeBookingsCount?: number;
  userAvatar?: string;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  unreadMessagesCount = 0,
  activeBookingsCount = 0,
  userAvatar = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
}) => {
  const isHomeActive = currentScreen === 'home';
  const isFindCareActive = currentScreen === 'find_care' || currentScreen === 'services' || currentScreen === 'favorites';
  const isBookingsActive = currentScreen === 'bookings' || currentScreen === 'booking_detail' || currentScreen === 'active_session';
  const isMessagesActive = currentScreen === 'messages' || currentScreen === 'chat_detail';
  const isProfileActive = [
    'profile',
    'care_recipients',
    'addresses',
    'payments_history',
    'notifications',
    'safety_center',
    'support'
  ].includes(currentScreen);

  return (
    <div className="sticky bottom-0 left-0 right-0 w-full z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] shrink-0">
      <nav className="w-full max-w-md mx-auto px-2 py-1.5 flex items-center justify-around">
        {/* 1. Home Tab */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all cursor-pointer ${
            isHomeActive
              ? 'text-[#1266DE]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
          aria-label="Home"
        >
          <div className="relative">
            <Home
              size={22}
              strokeWidth={isHomeActive ? 2.5 : 2}
              className={isHomeActive ? 'text-[#1266DE]' : 'text-slate-500'}
            />
            {isHomeActive && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#1266DE] rounded-full" />
            )}
          </div>
          <span className={`text-[10px] mt-1 font-semibold ${isHomeActive ? 'text-[#1266DE]' : 'text-slate-500'}`}>
            Home
          </span>
        </button>

        {/* 2. Find Care Tab */}
        <button
          type="button"
          onClick={() => onNavigate('find_care')}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all cursor-pointer ${
            isFindCareActive
              ? 'text-[#1266DE]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
          aria-label="Find Care"
        >
          <div className="relative">
            <Search
              size={22}
              strokeWidth={isFindCareActive ? 2.5 : 2}
              className={isFindCareActive ? 'text-[#1266DE]' : 'text-slate-500'}
            />
            {isFindCareActive && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#1266DE] rounded-full" />
            )}
          </div>
          <span className={`text-[10px] mt-1 font-semibold ${isFindCareActive ? 'text-[#1266DE]' : 'text-slate-500'}`}>
            Find Care
          </span>
        </button>

        {/* 3. Bookings Tab */}
        <button
          type="button"
          onClick={() => onNavigate('bookings')}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all cursor-pointer ${
            isBookingsActive
              ? 'text-[#1266DE]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
          aria-label="Bookings"
        >
          <div className="relative">
            <Calendar
              size={22}
              strokeWidth={isBookingsActive ? 2.5 : 2}
              className={isBookingsActive ? 'text-[#1266DE]' : 'text-slate-500'}
            />
            {activeBookingsCount > 0 && (
              <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-[#1266DE] text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                {activeBookingsCount}
              </span>
            )}
            {isBookingsActive && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#1266DE] rounded-full" />
            )}
          </div>
          <span className={`text-[10px] mt-1 font-semibold ${isBookingsActive ? 'text-[#1266DE]' : 'text-slate-500'}`}>
            Bookings
          </span>
        </button>

        {/* 4. Messages / Chat Tab */}
        <button
          type="button"
          onClick={() => onNavigate('messages')}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all cursor-pointer ${
            isMessagesActive
              ? 'text-[#1266DE]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
          aria-label="Messages"
        >
          <div className="relative">
            <MessageSquare
              size={22}
              strokeWidth={isMessagesActive ? 2.5 : 2}
              className={isMessagesActive ? 'text-[#1266DE]' : 'text-slate-500'}
            />
            {unreadMessagesCount > 0 && (
              <span className="absolute -top-1 -right-1.5 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
                {unreadMessagesCount}
              </span>
            )}
            {isMessagesActive && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#1266DE] rounded-full" />
            )}
          </div>
          <span className={`text-[10px] mt-1 font-semibold ${isMessagesActive ? 'text-[#1266DE]' : 'text-slate-500'}`}>
            Chat
          </span>
        </button>

        {/* 5. Account / Profile Tab */}
        <button
          type="button"
          onClick={() => onNavigate('profile')}
          className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all cursor-pointer ${
            isProfileActive
              ? 'text-[#1266DE]'
              : 'text-slate-500 hover:text-slate-800'
          }`}
          aria-label="Profile"
        >
          <div className="relative">
            <div className={`w-6 h-6 rounded-full overflow-hidden transition-all ${
              isProfileActive ? 'ring-2 ring-[#1266DE] ring-offset-1' : 'ring-1 ring-slate-300'
            }`}>
              <img
                src={userAvatar}
                alt="Profile"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {isProfileActive && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#1266DE] rounded-full" />
            )}
          </div>
          <span className={`text-[10px] mt-1 font-semibold ${isProfileActive ? 'text-[#1266DE]' : 'text-slate-500'}`}>
            Account
          </span>
        </button>
      </nav>
    </div>
  );
};
