import React, { useState, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  MapPin,
  Star,
  Heart,
  Check,
  RotateCcw,
  Sparkles,
  Map,
  List,
  Calendar,
  X,
  AlertCircle
} from 'lucide-react';
import {
  Caregiver,
  CareCategory,
  CareCategoryId,
  FilterState,
  SortOption,
  AppScreen
} from '../../types';
import { VerifiedBadge } from '../common/Badge';
import { BottomSheet } from '../common/BottomSheet';
import { EmptyState } from '../common/EmptyState';

interface FindCareScreenProps {
  caregivers: Caregiver[];
  categories: CareCategory[];
  favoriteIds: string[];
  initialCategory?: CareCategoryId | 'all';
  onToggleFavorite: (caregiverId: string) => void;
  onSelectCaregiver: (caregiverId: string) => void;
  onRequestCare: (caregiverId: string) => void;
  onNavigate: (screen: AppScreen) => void;
}

const DEFAULT_FILTERS: FilterState = {
  careCategory: 'all',
  searchQuery: '',
  minPrice: 20,
  maxPrice: 60,
  minRating: 0,
  minExperience: 0,
  gender: 'all',
  selectedLanguages: [],
  selectedSkills: [],
  maxDistance: 15,
  onlyAvailableToday: false,
  onlyVerified: false
};

export const FindCareScreen: React.FC<FindCareScreenProps> = ({
  caregivers,
  categories,
  favoriteIds,
  initialCategory = 'all',
  onToggleFavorite,
  onSelectCaregiver,
  onRequestCare,
  onNavigate,
}) => {
  const [filters, setFilters] = useState<FilterState>({
    ...DEFAULT_FILTERS,
    careCategory: initialCategory
  });
  const [sortBy, setSortBy] = useState<SortOption>('recommended');
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [isSortSheetOpen, setIsSortSheetOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [isLoading, setIsLoading] = useState(false);

  // Available filter options
  const allLanguages = ['English', 'Spanish', 'French', 'Mandarin', 'Igbo'];
  const allSkills = [
    'Dementia Care',
    'IV Therapy',
    'Wound Dressing',
    'Mobility Transfer',
    'Medication Management',
    'Hoyer Lift Expert',
    'Stroke Rehabilitation',
    'Alzheimer’s Care',
    'Fall Prevention',
    'Newborn & Infant Care'
  ];

  // Active filter count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.careCategory !== 'all') count++;
    if (filters.maxPrice < 60 || filters.minPrice > 20) count++;
    if (filters.minRating > 0) count++;
    if (filters.minExperience > 0) count++;
    if (filters.gender !== 'all') count++;
    if (filters.selectedLanguages.length > 0) count += filters.selectedLanguages.length;
    if (filters.selectedSkills.length > 0) count += filters.selectedSkills.length;
    if (filters.onlyAvailableToday) count++;
    if (filters.onlyVerified) count++;
    return count;
  }, [filters]);

  // Filter and Sort logic
  const filteredCaregivers = useMemo(() => {
    return caregivers.filter((cg) => {
      // Search query
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchName = cg.name.toLowerCase().includes(query);
        const matchSkill = cg.mainSkill.toLowerCase().includes(query) || cg.skills.some(s => s.toLowerCase().includes(query));
        const matchBio = cg.bio.toLowerCase().includes(query);
        if (!matchName && !matchSkill && !matchBio) return false;
      }

      // Category
      if (filters.careCategory !== 'all') {
        if (!cg.services.includes(filters.careCategory)) return false;
      }

      // Price
      if (cg.hourlyRate < filters.minPrice || cg.hourlyRate > filters.maxPrice) return false;

      // Rating
      if (filters.minRating > 0 && cg.rating < filters.minRating) return false;

      // Experience
      if (filters.minExperience > 0 && cg.experienceYears < filters.minExperience) return false;

      // Gender
      if (filters.gender !== 'all' && cg.gender !== filters.gender) return false;

      // Languages
      if (filters.selectedLanguages.length > 0) {
        const hasLang = filters.selectedLanguages.every(lang => cg.languages.includes(lang));
        if (!hasLang) return false;
      }

      // Skills
      if (filters.selectedSkills.length > 0) {
        const hasSkill = filters.selectedSkills.some(skill => cg.skills.includes(skill));
        if (!hasSkill) return false;
      }

      // Available today
      if (filters.onlyAvailableToday && !cg.availableToday) return false;

      // Verified
      if (filters.onlyVerified && (!cg.verified.identity || !cg.verified.background)) return false;

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'highest_rated':
          return b.rating - a.rating;
        case 'most_experienced':
          return b.experienceYears - a.experienceYears;
        case 'lowest_price':
          return a.hourlyRate - b.hourlyRate;
        case 'nearest':
          return a.distanceMiles - b.distanceMiles;
        case 'available_soon':
          return (b.availableToday ? 1 : 0) - (a.availableToday ? 1 : 0);
        case 'recommended':
        default:
          return b.repeatHireRate - a.repeatHireRate;
      }
    });
  }, [caregivers, filters, sortBy]);

  const handleResetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setIsFilterSheetOpen(false);
  };

  return (
    <div className="flex-1 pb-24 bg-[#F8F9F8] min-h-screen">
      {/* Top Search & Filter Bar */}
      <div className="bg-white px-4 pt-3 pb-3 border-b border-[#E8EEE8] sticky top-0 z-30 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-[#4E6E5D] uppercase tracking-widest block">
              Marketplace
            </span>
            <h1 className="text-base font-bold text-[#1A1C1A] font-serif leading-tight">
              Find Caregivers
            </h1>
          </div>

          {/* Toggle List / Map View */}
          <div className="flex items-center bg-[#F2F4F2] p-0.5 rounded-xl text-xs font-semibold border border-[#E8EEE8]">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`py-1 px-2.5 rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white text-[#4E6E5D] shadow-xs font-bold'
                  : 'text-neutral-500 hover:text-[#1A1C1A]'
              }`}
            >
              <List size={13} />
              <span>List</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('map')}
              className={`py-1 px-2.5 rounded-lg flex items-center gap-1 transition-all cursor-pointer ${
                viewMode === 'map'
                  ? 'bg-white text-[#4E6E5D] shadow-xs font-bold'
                  : 'text-neutral-500 hover:text-[#1A1C1A]'
              }`}
            >
              <Map size={13} />
              <span>Map</span>
            </button>
          </div>
        </div>

        {/* Search Bar Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
            <Search size={15} />
          </div>
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
            placeholder="Search specialists, skills, or care..."
            className="w-full pl-9 pr-9 py-2 rounded-xl bg-[#F8F9F8] border border-[#E8EEE8] text-xs font-medium text-[#1A1C1A] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#4E6E5D] transition-all placeholder:text-neutral-400"
          />
          {filters.searchQuery && (
            <button
              type="button"
              onClick={() => setFilters({ ...filters, searchQuery: '' })}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filter Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-0.5">
          {/* Main Filter Sheet Trigger Button */}
          <button
            type="button"
            onClick={() => setIsFilterSheetOpen(true)}
            className={`py-1.5 px-3 rounded-full text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
              activeFiltersCount > 0
                ? 'bg-[#4E6E5D] text-white shadow-xs'
                : 'bg-[#F2F4F2] hover:bg-[#E8EAE6] text-[#1A1C1A] border border-[#E8EEE8]'
            }`}
          >
            <SlidersHorizontal size={12} />
            <span>Filters</span>
            {activeFiltersCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-white text-[#4E6E5D] text-[10px] font-bold flex items-center justify-center ml-0.5">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {/* Sort Sheet Trigger */}
          <button
            type="button"
            onClick={() => setIsSortSheetOpen(true)}
            className="py-1.5 px-3 rounded-full bg-[#F2F4F2] hover:bg-[#E8EAE6] text-neutral-700 text-xs font-medium flex items-center gap-1.5 shrink-0 transition-colors border border-[#E8EEE8] cursor-pointer"
          >
            <ArrowUpDown size={12} />
            <span className="capitalize">{sortBy.replace('_', ' ')}</span>
          </button>

          {/* Category Quick Chips */}
          <button
            type="button"
            onClick={() => setFilters({ ...filters, careCategory: 'all' })}
            className={`py-1.5 px-3 rounded-full text-xs font-medium shrink-0 transition-all cursor-pointer ${
              filters.careCategory === 'all'
                ? 'bg-[#4E6E5D] text-white font-semibold'
                : 'bg-[#F2F4F2] text-neutral-600 hover:bg-[#E8EAE6] border border-[#E8EEE8]'
            }`}
          >
            All Services
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFilters({ ...filters, careCategory: cat.id })}
              className={`py-1.5 px-3 rounded-full text-xs font-medium shrink-0 transition-all cursor-pointer ${
                filters.careCategory === cat.id
                  ? 'bg-[#4E6E5D] text-white font-semibold'
                  : 'bg-[#F2F4F2] text-neutral-600 hover:bg-[#E8EAE6] border border-[#E8EEE8]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header Count */}
      <div className="px-5 pt-3 pb-2 flex items-center justify-between text-xs text-neutral-500">
        <span>
          Showing <strong className="text-[#1A1C1A]">{filteredCaregivers.length}</strong> verified specialists
        </span>
        {activeFiltersCount > 0 && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="text-[#4E6E5D] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw size={11} />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* MAP VIEW PREVIEW */}
      {viewMode === 'map' && (
        <div className="px-4 py-2">
          <div className="w-full h-80 rounded-2xl bg-[#E8EAE6] border border-[#E8EEE8] relative overflow-hidden shadow-inner flex flex-col justify-between p-4">
            {/* Simulated Map Visual */}
            <div className="absolute inset-0 bg-[#F2F4F2] opacity-90">
              <svg className="w-full h-full text-[#E8EEE8]" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                {/* Simulated Roads */}
                <path d="M 0 120 Q 150 180 400 130" fill="none" stroke="#E8EAE6" strokeWidth="14" />
                <path d="M 180 0 Q 200 150 160 350" fill="none" stroke="#E8EAE6" strokeWidth="12" />
                <path d="M 50 300 Q 250 220 380 280" fill="none" stroke="#E8EAE6" strokeWidth="10" />
              </svg>
            </div>

            {/* Pins on map */}
            <div className="absolute top-20 left-16 z-10 flex flex-col items-center group cursor-pointer" onClick={() => onSelectCaregiver('cg-1')}>
              <div className="bg-[#4E6E5D] text-white text-[11px] font-bold py-1 px-2 rounded-full shadow-md border-2 border-white flex items-center gap-1">
                <span>$38/hr</span>
                <VerifiedBadge size="sm" showLabel={false} className="bg-transparent border-0 p-0 text-white" />
              </div>
              <div className="w-2 h-2 bg-[#4E6E5D] rotate-45 -mt-1" />
            </div>

            <div className="absolute top-36 right-20 z-10 flex flex-col items-center group cursor-pointer" onClick={() => onSelectCaregiver('cg-2')}>
              <div className="bg-[#3E584A] text-white text-[11px] font-bold py-1 px-2 rounded-full shadow-md border-2 border-white flex items-center gap-1">
                <span>$32/hr</span>
              </div>
              <div className="w-2 h-2 bg-[#3E584A] rotate-45 -mt-1" />
            </div>

            <div className="absolute bottom-16 left-32 z-10 flex flex-col items-center group cursor-pointer" onClick={() => onSelectCaregiver('cg-3')}>
              <div className="bg-[#4E6E5D] text-white text-[11px] font-bold py-1 px-2 rounded-full shadow-md border-2 border-white flex items-center gap-1">
                <span>$29/hr</span>
              </div>
              <div className="w-2 h-2 bg-[#4E6E5D] rotate-45 -mt-1" />
            </div>

            {/* User location pin */}
            <div className="absolute top-32 left-36 z-10 flex flex-col items-center">
              <div className="w-4 h-4 bg-[#1A1C1A] rounded-full ring-4 ring-[#4E6E5D]/20 shadow-md flex items-center justify-center text-white">
                <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
              <span className="text-[10px] font-bold bg-white text-[#1A1C1A] px-1.5 py-0.5 rounded shadow-xs mt-1 border border-[#E8EEE8]">
                You
              </span>
            </div>

            {/* Bottom floating map info */}
            <div className="relative z-20 mt-auto bg-white/95 backdrop-blur-md p-3 rounded-xl border border-[#E8EEE8] shadow-xs">
              <p className="text-xs font-semibold text-[#1A1C1A]">
                📍 Showing {filteredCaregivers.length} nearby caregivers in your service area.
              </p>
              <p className="text-[11px] text-neutral-500 mt-0.5">
                Tap on any pin or switch back to List view to compare details.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* LIST VIEW CAREGIVER CARDS */}
      <div className="px-4 space-y-3 pt-1">
        {filteredCaregivers.length === 0 ? (
          <EmptyState
            title="No caregivers match your filters"
            description="Try loosening your price range, removing required special skills, or searching for all services."
            actionLabel="Reset All Filters"
            onAction={handleResetFilters}
            className="py-12"
          />
        ) : (
          filteredCaregivers.map((cg) => {
            const isFav = favoriteIds.includes(cg.id);
            return (
              <div
                key={cg.id}
                className="bg-white rounded-2xl border border-[#E8EEE8] shadow-xs hover:shadow-sm transition-all overflow-hidden"
              >
                <div className="p-4">
                  {/* Top row: Avatar + Name + Rating + Fav */}
                  <div className="flex items-start gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={cg.photo}
                        alt={cg.name}
                        className="w-15 h-15 rounded-xl object-cover ring-1 ring-[#E8EEE8]"
                        referrerPolicy="no-referrer"
                      />
                      {cg.availableToday && (
                        <span className="absolute -bottom-1 -right-1 bg-[#4E6E5D] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full ring-1 ring-white">
                          Today
                        </span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <h3 className="text-xs font-bold text-[#1A1C1A] truncate">
                            {cg.name}
                          </h3>
                          <p className="text-[11px] font-medium text-[#4E6E5D] truncate mt-0.5">
                            {cg.mainSkill}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => onToggleFavorite(cg.id)}
                          className="w-7 h-7 rounded-full bg-[#F2F4F2] hover:bg-[#E8EAE6] active:scale-90 flex items-center justify-center text-neutral-400 hover:text-rose-500 transition-all shrink-0 cursor-pointer"
                          aria-label="Save"
                        >
                          <Heart
                            size={14}
                            className={isFav ? 'fill-rose-500 text-rose-500' : ''}
                          />
                        </button>
                      </div>

                      {/* Ratings & Experience */}
                      <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-1.5">
                        <div className="flex items-center gap-1 font-bold text-[#1A1C1A]">
                          <Star size={11} className="text-amber-400 fill-amber-400" />
                          <span>{cg.rating.toFixed(1)}</span>
                          <span className="text-neutral-400 font-normal">({cg.reviewsCount})</span>
                        </div>
                        <span>•</span>
                        <span>{cg.experienceYears} yrs exp</span>
                        <span>•</span>
                        <span className="text-neutral-400">{cg.distanceMiles} mi</span>
                      </div>
                    </div>
                  </div>

                  {/* Verified & Badges Row */}
                  <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-2.5 border-t border-[#F2F4F2]">
                    <VerifiedBadge size="sm" showLabel={true} />
                    
                    {cg.certifications[0] && (
                      <span className="text-[10px] font-medium bg-[#F2F4F2] text-neutral-700 px-2 py-0.5 rounded-md truncate max-w-[170px] border border-[#E8EEE8]">
                        {cg.certifications[0].name}
                      </span>
                    )}

                    <span className="text-[10px] font-medium bg-[#F2F4F2] text-neutral-600 px-2 py-0.5 rounded-md border border-[#E8EEE8]">
                      {cg.repeatHireRate}% Repeat Hire
                    </span>
                  </div>

                  {/* Skills Chips */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {cg.skills.slice(0, 3).map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-medium bg-[#F8F9F8] text-neutral-600 px-2 py-0.5 rounded-md border border-[#E8EEE8]"
                      >
                        {skill}
                      </span>
                    ))}
                    {cg.skills.length > 3 && (
                      <span className="text-[10px] text-neutral-400 py-0.5">
                        +{cg.skills.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Short Bio Snippet */}
                  <p className="text-[11px] text-neutral-500 mt-2 line-clamp-2 leading-relaxed">
                    {cg.bio}
                  </p>

                  {/* Pricing and Action Buttons */}
                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-[#F2F4F2]">
                    <div>
                      <span className="text-[10px] text-neutral-400 uppercase font-semibold block">Rate</span>
                      <div className="text-sm font-bold text-[#4E6E5D] leading-tight">
                        ${cg.hourlyRate}<span className="text-[10px] font-normal text-neutral-400">/hr</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onSelectCaregiver(cg.id)}
                        className="py-1.5 px-3 rounded-xl bg-[#F2F4F2] hover:bg-[#E8EAE6] active:scale-95 text-[#1A1C1A] text-[11px] font-semibold transition-all cursor-pointer border border-[#E8EEE8]"
                      >
                        View Profile
                      </button>
                      <button
                        type="button"
                        onClick={() => onRequestCare(cg.id)}
                        className="py-1.5 px-3.5 rounded-xl bg-[#4E6E5D] hover:bg-[#3E584A] active:scale-95 text-white text-[11px] font-bold shadow-xs transition-all cursor-pointer"
                      >
                        Request Care
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* FILTER BOTTOM SHEET (11 Filters) */}
      <BottomSheet
        isOpen={isFilterSheetOpen}
        onClose={() => setIsFilterSheetOpen(false)}
        title="Filter Caregivers"
        subtitle="Narrow down to your family's exact requirements"
      >
        <div className="space-y-5 pb-6">
          {/* 1. Care Category */}
          <div>
            <label className="text-xs font-bold text-[#1A1C1A] mb-2 block">
              Care Category
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFilters({ ...filters, careCategory: 'all' })}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border text-left transition-all ${
                  filters.careCategory === 'all'
                    ? 'bg-[#F2F4F2] border-[#4E6E5D] text-[#4E6E5D]'
                    : 'bg-[#F8F9F8] border-[#E8EEE8] text-[#1A1C1A] hover:bg-[#F2F4F2]'
                }`}
              >
                All Categories
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setFilters({ ...filters, careCategory: c.id })}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold border text-left truncate transition-all ${
                    filters.careCategory === c.id
                      ? 'bg-[#F2F4F2] border-[#4E6E5D] text-[#4E6E5D]'
                      : 'bg-[#F8F9F8] border-[#E8EEE8] text-[#1A1C1A] hover:bg-[#F2F4F2]'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Hourly Price Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-[#1A1C1A]">
                Max Hourly Rate: <span className="text-[#4E6E5D] font-extrabold">${filters.maxPrice}/hr</span>
              </label>
              <span className="text-xs text-neutral-400">$20 - $80/hr</span>
            </div>
            <input
              type="range"
              min={20}
              max={80}
              step={2}
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
              className="w-full accent-[#4E6E5D] cursor-pointer"
            />
          </div>

          {/* 3. Minimum Rating */}
          <div>
            <label className="text-xs font-bold text-[#1A1C1A] mb-2 block">
              Minimum Rating
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[0, 4.5, 4.8, 4.9].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setFilters({ ...filters, minRating: r })}
                  className={`py-2 rounded-xl text-xs font-semibold border text-center transition-all ${
                    filters.minRating === r
                      ? 'bg-[#F2F4F2] border-[#4E6E5D] text-[#4E6E5D]'
                      : 'bg-[#F8F9F8] border-[#E8EEE8] text-[#1A1C1A] hover:bg-[#F2F4F2]'
                  }`}
                >
                  {r === 0 ? 'Any' : `${r}+ ⭐`}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Minimum Experience */}
          <div>
            <label className="text-xs font-bold text-[#1A1C1A] mb-2 block">
              Experience Level
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[0, 3, 5, 8].map((exp) => (
                <button
                  key={exp}
                  type="button"
                  onClick={() => setFilters({ ...filters, minExperience: exp })}
                  className={`py-2 rounded-xl text-xs font-semibold border text-center transition-all ${
                    filters.minExperience === exp
                      ? 'bg-[#F2F4F2] border-[#4E6E5D] text-[#4E6E5D]'
                      : 'bg-[#F8F9F8] border-[#E8EEE8] text-[#1A1C1A] hover:bg-[#F2F4F2]'
                  }`}
                >
                  {exp === 0 ? 'Any' : `${exp}+ yrs`}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Caregiver Gender */}
          <div>
            <label className="text-xs font-bold text-[#1A1C1A] mb-2 block">
              Gender Preference
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['all', 'Female', 'Male'] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setFilters({ ...filters, gender: g })}
                  className={`py-2 rounded-xl text-xs font-semibold border text-center transition-all ${
                    filters.gender === g
                      ? 'bg-[#F2F4F2] border-[#4E6E5D] text-[#4E6E5D]'
                      : 'bg-[#F8F9F8] border-[#E8EEE8] text-[#1A1C1A] hover:bg-[#F2F4F2]'
                  }`}
                >
                  {g === 'all' ? 'No Preference' : g}
                </button>
              ))}
            </div>
          </div>

          {/* 6. Spoken Languages */}
          <div>
            <label className="text-xs font-bold text-[#1A1C1A] mb-2 block">
              Languages
            </label>
            <div className="flex flex-wrap gap-2">
              {allLanguages.map((lang) => {
                const isSelected = filters.selectedLanguages.includes(lang);
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        setFilters({
                          ...filters,
                          selectedLanguages: filters.selectedLanguages.filter((l) => l !== lang)
                        });
                      } else {
                        setFilters({
                          ...filters,
                          selectedLanguages: [...filters.selectedLanguages, lang]
                        });
                      }
                    }}
                    className={`py-1.5 px-3 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#4E6E5D] border-[#4E6E5D] text-white'
                        : 'bg-[#F8F9F8] border-[#E8EEE8] text-[#1A1C1A] hover:bg-[#F2F4F2]'
                    }`}
                  >
                    {lang}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 7. Special Clinical Skills */}
          <div>
            <label className="text-xs font-bold text-[#1A1C1A] mb-2 block">
              Specialized Skills
            </label>
            <div className="flex flex-wrap gap-1.5">
              {allSkills.map((skill) => {
                const isSelected = filters.selectedSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        setFilters({
                          ...filters,
                          selectedSkills: filters.selectedSkills.filter((s) => s !== skill)
                        });
                      } else {
                        setFilters({
                          ...filters,
                          selectedSkills: [...filters.selectedSkills, skill]
                        });
                      }
                    }}
                    className={`py-1 px-2.5 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#F2F4F2] border-[#4E6E5D] text-[#4E6E5D]'
                        : 'bg-[#F8F9F8] border-[#E8EEE8] text-neutral-600 hover:bg-[#F2F4F2]'
                    }`}
                  >
                    {skill}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 8. Availability & Verification Toggles */}
          <div className="space-y-3 pt-2 border-t border-[#E8EEE8]">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="text-xs font-bold text-[#1A1C1A] block">Available Today</span>
                <span className="text-[11px] text-neutral-500">Only show caregivers ready for immediate care</span>
              </div>
              <input
                type="checkbox"
                checked={filters.onlyAvailableToday}
                onChange={(e) => setFilters({ ...filters, onlyAvailableToday: e.target.checked })}
                className="w-4 h-4 rounded text-[#4E6E5D] focus:ring-[#4E6E5D] accent-[#4E6E5D]"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="text-xs font-bold text-[#1A1C1A] block">Verified Pros Only</span>
                <span className="text-[11px] text-neutral-500">Background, identity & license verified</span>
              </div>
              <input
                type="checkbox"
                checked={filters.onlyVerified}
                onChange={(e) => setFilters({ ...filters, onlyVerified: e.target.checked })}
                className="w-4 h-4 rounded text-[#4E6E5D] focus:ring-[#4E6E5D] accent-[#4E6E5D]"
              />
            </label>
          </div>

          {/* Bottom Action Buttons */}
          <div className="flex items-center gap-3 pt-3 border-t border-[#E8EEE8]">
            <button
              type="button"
              onClick={handleResetFilters}
              className="py-2.5 px-4 rounded-xl bg-[#F2F4F2] hover:bg-[#E8EAE6] text-neutral-700 text-xs font-bold transition-all cursor-pointer"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => setIsFilterSheetOpen(false)}
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#4E6E5D] hover:bg-[#3E584A] active:scale-[0.98] text-white text-xs font-bold shadow-sm transition-all text-center cursor-pointer"
            >
              Show {filteredCaregivers.length} Results
            </button>
          </div>
        </div>
      </BottomSheet>

      {/* SORT BOTTOM SHEET (6 Options) */}
      <BottomSheet
        isOpen={isSortSheetOpen}
        onClose={() => setIsSortSheetOpen(false)}
        title="Sort Caregivers By"
      >
        <div className="space-y-1.5 pb-4">
          {[
            { id: 'recommended', label: 'Recommended & Top Repeat Hire' },
            { id: 'highest_rated', label: 'Highest Rated (5.0 Stars)' },
            { id: 'most_experienced', label: 'Most Experienced (Years)' },
            { id: 'lowest_price', label: 'Lowest Hourly Rate' },
            { id: 'nearest', label: 'Nearest Distance (Miles)' },
            { id: 'available_soon', label: 'Available Today First' },
          ].map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => {
                setSortBy(option.id as SortOption);
                setIsSortSheetOpen(false);
              }}
              className={`w-full p-3 rounded-xl text-left flex items-center justify-between text-xs font-semibold transition-all cursor-pointer ${
                sortBy === option.id
                  ? 'bg-[#F2F4F2] text-[#4E6E5D] border border-[#4E6E5D]/30'
                  : 'text-neutral-700 hover:bg-[#F8F9F8]'
              }`}
            >
              <span>{option.label}</span>
              {sortBy === option.id && <Check size={16} className="text-[#4E6E5D]" />}
            </button>
          ))}
        </div>
      </BottomSheet>
    </div>
  );
};
