import React, { useState } from 'react';
import {
  MapPin,
  Bell,
  Search,
  ChevronRight,
  ShieldCheck,
  Star,
  Clock,
  ArrowRight,
  Sparkles,
  SlidersHorizontal,
  Plus
} from 'lucide-react';
import {
  CareCategory,
  Caregiver,
  Booking,
  CustomerAddress,
  CareCategoryId,
  AppScreen
} from '../../types';

interface HomeScreenProps {
  userName: string;
  userAvatar?: string;
  activeAddress: CustomerAddress;
  categories: CareCategory[];
  recommendedCaregivers: Caregiver[];
  activeOrUpcomingBooking?: Booking;
  unreadNotifsCount: number;
  favoriteIds: string[];
  onToggleFavorite: (caregiverId: string) => void;
  onSelectCategory: (categoryId: CareCategoryId) => void;
  onSelectCaregiver: (caregiverId: string) => void;
  onViewBooking: (bookingId: string) => void;
  onNavigate: (screen: AppScreen) => void;
  onQuickSearch: (params: { category: CareCategoryId | 'all'; date: string; time: string }) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  userName = 'Balakrishnan',
  userAvatar = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  activeAddress,
  categories,
  recommendedCaregivers,
  activeOrUpcomingBooking,
  unreadNotifsCount,
  favoriteIds,
  onToggleFavorite,
  onSelectCategory,
  onSelectCaregiver,
  onViewBooking,
  onNavigate,
  onQuickSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllServices, setShowAllServices] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  // Promotional Banners with curated healthcare aesthetics
  const promoBanners = [
    {
      tag: 'Special Offer',
      title: '20% OFF First Care Visit',
      subtitle: 'Use code CARE20 • Certified nurses & caregivers',
      cta: 'Claim Discount',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
      action: () => onNavigate('care_request')
    },
    {
      tag: 'Free Assessment',
      title: 'Complimentary Vitals Check',
      subtitle: 'Free care evaluation for elders & post-op patients',
      cta: 'Book Visit',
      image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=400&q=80',
      action: () => onNavigate('care_request')
    }
  ];

  // 8 Specific verified home care categories
  const browseServices = [
    {
      id: 'elder-care' as CareCategoryId,
      title: 'Elder Care',
      image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=300&q=80',
      price: '₹800/hr',
      badge: 'Popular'
    },
    {
      id: 'nursing-care' as CareCategoryId,
      title: 'Nursing',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80',
      price: '₹700/hr',
      badge: 'Clinical'
    },
    {
      id: 'therapy' as CareCategoryId,
      title: 'Physiotherapy',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=300&q=80',
      price: '₹600/hr',
      badge: 'Rehab'
    },
    {
      id: 'daily-care' as CareCategoryId,
      title: 'Daily Care',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=300&q=80',
      price: '₹500/hr',
      badge: 'Assistance'
    },
    {
      id: 'baby-care' as CareCategoryId,
      title: 'Baby Care',
      image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=300&q=80',
      price: '₹750/hr',
      badge: 'Nanny'
    },
    {
      id: 'pregnancy' as CareCategoryId,
      title: 'Pregnancy',
      image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80',
      price: '₹850/hr',
      badge: 'Postnatal'
    },
    {
      id: 'clinical-care' as CareCategoryId,
      title: 'Clinical Care',
      image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=300&q=80',
      price: '₹950/hr',
      badge: 'ICU Staff'
    },
    {
      id: 'patient-care' as CareCategoryId,
      title: 'Companionship',
      image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=300&q=80',
      price: '₹650/hr',
      badge: '24/7'
    },
  ];

  // Top recommended care items
  const recommendedItems = [
    {
      id: 'rec-1',
      title: 'Elderly Companion Care',
      subtitle: 'Mobility support & medication schedule',
      rating: 4.9,
      reviews: 128,
      price: '₹800/hr',
      experience: '8 yrs exp',
      distance: '1.8 km away',
      image: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=500&q=80',
      categoryId: 'elder-care' as CareCategoryId,
      caregiverId: 'cg-1'
    },
    {
      id: 'rec-2',
      title: 'Physiotherapy & Rehab',
      subtitle: 'Post-stroke & orthopedic mobility',
      rating: 4.8,
      reviews: 94,
      price: '₹600/hr',
      experience: '6 yrs exp',
      distance: '2.4 km away',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=500&q=80',
      categoryId: 'therapy' as CareCategoryId,
      caregiverId: 'cg-2'
    },
    {
      id: 'rec-3',
      title: 'Post-Op Clinical Nursing',
      subtitle: 'Wound dressing, IV & vitals tracking',
      rating: 4.9,
      reviews: 210,
      price: '₹950/hr',
      experience: '11 yrs exp',
      distance: '3.1 km away',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=500&q=80',
      categoryId: 'nursing-care' as CareCategoryId,
      caregiverId: 'cg-3'
    },
    {
      id: 'rec-4',
      title: 'Newborn & Infant Care',
      subtitle: 'Night nanny & pediatric support',
      rating: 5.0,
      reviews: 76,
      price: '₹750/hr',
      experience: '7 yrs exp',
      distance: '1.2 km away',
      image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=500&q=80',
      categoryId: 'baby-care' as CareCategoryId,
      caregiverId: 'cg-5'
    }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('find_care');
  };

  const currentPromo = promoBanners[activeSlide];

  return (
    <div className="flex-1 pb-24 bg-[#F8FAFC] font-sans w-full max-w-md mx-auto flex flex-col overflow-x-hidden relative min-h-full">
      {/* 1. Header Top Area (Royal Blue to Deep Cobalt Gradient) with Spacious Padding */}
      <header className="w-full bg-gradient-to-b from-[#0F56C7] via-[#1565D8] to-[#1E74EA] px-4 pt-4 pb-6 rounded-b-[30px] shadow-sm text-white relative overflow-hidden flex flex-col gap-4">
        {/* Soft Ambient Light Glows */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-blue-300/15 rounded-full blur-xl pointer-events-none" />

        {/* Top Profile / Greeting / Location & Notifications */}
        <div className="w-full flex items-center justify-between relative z-10 gap-3 pt-1">
          {/* User Avatar + Greeting */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <button
              type="button"
              onClick={() => onNavigate('profile')}
              className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-white/80 shadow-sm shrink-0 cursor-pointer active:scale-95 transition-transform"
            >
              <img
                src={userAvatar}
                alt={userName}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </button>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[11.5px] font-medium text-blue-100 leading-none">
                  Hello,
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              </div>
              <h1 className="text-base font-bold text-white tracking-tight leading-tight truncate">
                {userName}
              </h1>
              {/* Location Pill */}
              <button
                type="button"
                onClick={() => onNavigate('addresses')}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-100 hover:text-white transition-colors cursor-pointer truncate max-w-full mt-0.5"
              >
                <MapPin size={11} className="text-blue-300 shrink-0" />
                <span className="truncate">
                  {activeAddress.city ? `${activeAddress.city}, ${activeAddress.state || 'TN'}` : 'Coimbatore, TN'}
                </span>
                <ChevronRight size={11} className="text-blue-300 shrink-0" />
              </button>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Safety / Help Center */}
            <button
              type="button"
              onClick={() => onNavigate('safety_center')}
              className="w-9 h-9 rounded-xl bg-white/15 hover:bg-white/25 active:scale-95 border border-white/20 backdrop-blur-md flex items-center justify-center text-white transition-all cursor-pointer shadow-xs"
              aria-label="Safety & Verification"
              title="Verified Care Shield"
            >
              <ShieldCheck size={18} className="text-blue-100" />
            </button>

            {/* Notification Bell */}
            <button
              type="button"
              onClick={() => onNavigate('notifications')}
              className="w-9 h-9 rounded-xl bg-white/15 hover:bg-white/25 active:scale-95 border border-white/20 backdrop-blur-md flex items-center justify-center text-white relative transition-all cursor-pointer shadow-xs"
              aria-label="Notifications"
            >
              <Bell size={18} className="text-white" />
              {unreadNotifsCount > 0 && (
                <span className="w-2.5 h-2.5 bg-[#FF4D4D] rounded-full absolute top-1.5 right-1.5 ring-2 ring-[#1565D8]" />
              )}
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <form onSubmit={handleSearchSubmit} className="w-full relative z-10">
          <div className="w-full bg-white rounded-xl shadow-[0_4px_16px_rgba(15,23,42,0.08)] px-3.5 py-2.5 flex items-center gap-2.5 text-neutral-800 transition-all focus-within:ring-2 focus-within:ring-white">
            <Search size={17} className="text-neutral-400 shrink-0" />
            <input
              type="text"
              placeholder="Search nurses, elder care, therapy..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs font-medium text-neutral-800 placeholder-neutral-400 bg-transparent border-none outline-none focus:ring-0 p-0 min-w-0"
            />
            <button
              type="button"
              onClick={() => onNavigate('find_care')}
              className="w-7 h-7 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#1266DE] flex items-center justify-center transition-colors shrink-0 cursor-pointer"
              aria-label="Filter Caregivers"
            >
              <SlidersHorizontal size={14} />
            </button>
          </div>
        </form>

        {/* Promotional Healthcare Banner Card */}
        <div className="w-full rounded-2xl bg-white/10 backdrop-blur-md p-3.5 text-white relative overflow-hidden border border-white/20 shadow-sm">
          <div className="w-full flex items-center justify-between gap-3 relative z-10">
            <div className="flex-1 min-w-0">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/20 text-[9.5px] font-bold uppercase tracking-wider backdrop-blur-xs mb-1 border border-white/20 text-white">
                <Sparkles size={10} className="text-amber-300" />
                {currentPromo.tag}
              </span>
              <h3 className="text-xs sm:text-[13px] font-bold text-white leading-tight truncate">
                {currentPromo.title}
              </h3>
              <p className="text-[10.5px] text-blue-100 mt-0.5 line-clamp-1">
                {currentPromo.subtitle}
              </p>
              <button
                type="button"
                onClick={currentPromo.action}
                className="mt-2.5 bg-white hover:bg-blue-50 active:scale-95 text-[#0F56C7] font-bold text-[11px] px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <span>{currentPromo.cta}</span>
                <ArrowRight size={12} />
              </button>
            </div>

            {/* Doctor/Nurse Thumbnail Graphic */}
            <div className="w-18 h-18 shrink-0 flex justify-end">
              <div className="w-18 h-18 rounded-xl overflow-hidden ring-2 ring-white/40 shadow-sm">
                <img
                  src={currentPromo.image}
                  alt="Doctor healthcare specialist"
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

          {/* Carousel Pagination Dots */}
          <div className="w-full flex items-center justify-center gap-1.5 mt-2.5">
            {promoBanners.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveSlide(idx)}
                className={`transition-all duration-300 cursor-pointer ${
                  activeSlide === idx ? 'w-4 h-1.5 bg-white rounded-full' : 'w-1.5 h-1.5 bg-white/40 rounded-full'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </header>

      {/* Main Content Layout Container */}
      <main className="w-full px-4 pt-4 flex flex-col gap-5">
        {/* Active Booking Session Card (If session is ongoing) */}
        {activeOrUpcomingBooking && (
          <section
            onClick={() => {
              if (activeOrUpcomingBooking.status === 'active') {
                onNavigate('active_session');
              } else {
                onViewBooking(activeOrUpcomingBooking.id);
              }
            }}
            className="w-full p-3.5 rounded-2xl bg-white border border-blue-100 shadow-[0_2px_12px_rgba(24,114,240,0.06)] hover:shadow-md cursor-pointer transition-all duration-200 flex flex-col gap-2.5"
          >
            {/* Header: Status Pill + Time badge */}
            <div className="w-full flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 text-[#1266DE] border border-blue-100/80">
                <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse shrink-0" />
                <span>{activeOrUpcomingBooking.status === 'active' ? 'Caregiver Arriving Soon' : 'Upcoming Appointment'}</span>
              </span>
              <span className="text-[11px] text-slate-500 font-medium shrink-0 flex items-center gap-1">
                <Clock size={11} className="text-slate-400" />
                {activeOrUpcomingBooking.timeSlot}
              </span>
            </div>

            {/* Main content: Caregiver profile + Call & View button */}
            <div className="w-full flex items-center justify-between gap-2.5">
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className="relative shrink-0">
                  <img
                    src={activeOrUpcomingBooking.caregiverPhoto}
                    alt={activeOrUpcomingBooking.caregiverName}
                    className="w-11 h-11 rounded-xl object-cover ring-1 ring-slate-100 shadow-xs"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#22C55E] rounded-full ring-2 ring-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {activeOrUpcomingBooking.caregiverName}
                  </h4>
                  <p className="text-[11px] text-[#1266DE] font-semibold truncate">
                    {activeOrUpcomingBooking.serviceName}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">
                    {activeOrUpcomingBooking.address.city}, {activeOrUpcomingBooking.address.state || 'TN'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (activeOrUpcomingBooking.status === 'active') {
                      onNavigate('active_session');
                    } else {
                      onViewBooking(activeOrUpcomingBooking.id);
                    }
                  }}
                  className="px-3 py-1.5 bg-[#1266DE] hover:bg-blue-700 active:scale-95 text-white rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer flex items-center gap-1 shrink-0"
                >
                  <span>Track</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </section>
        )}

        {/* 2. Specialized Services Grid Section */}
        <section className="w-full flex flex-col gap-2.5">
          <div className="w-full flex items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">
                Specialized Services
              </h2>
              <p className="text-[11px] text-slate-500">
                Certified home medical & personal care
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAllServices(!showAllServices)}
              className="text-xs font-semibold text-[#1266DE] hover:underline cursor-pointer bg-blue-50/80 px-2.5 py-1 rounded-full shrink-0 transition-colors"
            >
              {showAllServices ? 'Show less' : 'View all (8)'}
            </button>
          </div>

          {/* 4-column Grid layout cleanly constrained within screen width */}
          <div className="w-full grid grid-cols-4 gap-x-2.5 gap-y-3.5">
            {(showAllServices ? browseServices : browseServices.slice(0, 4)).map((srv) => (
              <button
                key={srv.id}
                type="button"
                onClick={() => {
                  onSelectCategory(srv.id);
                  onNavigate('services');
                }}
                className="w-full flex flex-col items-center group cursor-pointer text-center"
              >
                {/* Photo Squircle Card */}
                <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-xs border border-slate-200/80 bg-white group-hover:scale-105 group-hover:border-blue-300 group-active:scale-95 transition-all duration-200 relative shrink-0">
                  <img
                    src={srv.image}
                    alt={srv.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
                </div>
                {/* Service Label */}
                <span className="text-[10.5px] font-bold text-slate-800 mt-1.5 leading-tight line-clamp-1 group-hover:text-[#1266DE] transition-colors w-full text-center">
                  {srv.title}
                </span>
                <span className="text-[9.5px] font-semibold text-slate-400">
                  {srv.price}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* 3. Recommended Care Specialists Horizontal Carousel */}
        <section className="w-full flex flex-col gap-2.5">
          <div className="w-full flex items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">
                Top Rated Caregivers
              </h2>
              <p className="text-[11px] text-slate-500">
                Highly recommended in your locality
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('find_care')}
              className="text-xs font-semibold text-[#1266DE] hover:underline cursor-pointer bg-blue-50/80 px-2.5 py-1 rounded-full shrink-0 transition-colors"
            >
              Explore all
            </button>
          </div>

          {/* Clean Carousel that preserves mobile margins & zero side scrollbar */}
          <div className="w-full overflow-hidden">
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 scroll-smooth">
              {recommendedItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectCategory(item.categoryId);
                    onNavigate('care_request');
                  }}
                  className="w-48 shrink-0 bg-white rounded-2xl border border-slate-200/80 p-2.5 shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer flex flex-col justify-between group"
                >
                  {/* Top Image */}
                  <div className="h-28 rounded-xl overflow-hidden bg-slate-100 relative w-full shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-white/95 backdrop-blur-xs text-[9.5px] font-bold text-slate-800 shadow-xs flex items-center gap-1">
                      <Star size={10} className="text-amber-400 fill-amber-400 shrink-0" />
                      <span>{item.rating.toFixed(1)}</span>
                    </div>

                    <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded-md bg-[#1266DE] text-white text-[9px] font-bold shadow-xs">
                      Verified
                    </div>
                  </div>

                  {/* Info */}
                  <div className="pt-2 px-0.5 w-full flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 leading-snug line-clamp-1 group-hover:text-[#1266DE] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                        {item.subtitle}
                      </p>
                      <div className="flex items-center gap-2 text-[9.5px] text-slate-400 mt-1">
                        <span>{item.experience}</span>
                        <span>•</span>
                        <span>{item.distance}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 w-full">
                      <span className="text-xs font-bold text-[#1266DE]">
                        {item.price}
                      </span>
                      <span className="text-[10px] font-bold text-white bg-[#1266DE] group-hover:bg-blue-700 px-2 py-1 rounded-lg transition-colors shadow-xs">
                        Book →
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Floating Action Button: Quick Book Care (above bottom nav) */}
      <div className="sticky bottom-4 px-4 flex justify-end z-30 pointer-events-none w-full max-w-md mx-auto -mt-2">
        <button
          type="button"
          onClick={() => onNavigate('care_request')}
          className="pointer-events-auto bg-[#1266DE] hover:bg-blue-700 active:scale-95 text-white font-bold text-xs px-4 py-2.5 rounded-full shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all duration-200 cursor-pointer border border-white/20 backdrop-blur-xs ring-4 ring-blue-500/10 shrink-0"
          aria-label="Book care visit now"
        >
          <Plus size={15} strokeWidth={2.5} />
          <span className="tracking-tight">Book Care</span>
        </button>
      </div>
    </div>
  );
};
