export type CareCategoryId = 
  | 'elder-care'
  | 'nursing-care'
  | 'therapy'
  | 'daily-care'
  | 'baby-care'
  | 'pregnancy'
  | 'clinical-care'
  | 'patient-care'
  | 'child-care'
  | 'companion-care'
  | 'personal-care'
  | 'post-surgery'
  | 'disability-support'
  | 'respite-care';

export interface CareCategory {
  id: CareCategoryId;
  name: string;
  shortDesc: string;
  iconName: string;
  startingPrice: number;
  badge?: string;
  accentColor: string;
  image?: string;
}

export interface Certification {
  name: string;
  issuingOrg: string;
  issueYear: number;
  verified: boolean;
  licenseNumber?: string;
}

export interface ReviewItem {
  id: string;
  authorName: string;
  authorPhoto?: string;
  rating: number;
  date: string;
  serviceName: string;
  comment: string;
  helpfulCount?: number;
  qualityRating?: number;
  communicationRating?: number;
  punctualityRating?: number;
}

export interface Caregiver {
  id: string;
  name: string;
  photo: string;
  gender: 'Female' | 'Male' | 'Non-binary';
  verified: {
    identity: boolean;
    background: boolean;
    certification: boolean;
    experience: boolean;
  };
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  mainSkill: string;
  services: CareCategoryId[];
  skills: string[];
  languages: string[];
  location: string;
  distanceMiles: number;
  hourlyRate: number;
  dailyRate: number;
  overnightRate: number;
  bio: string;
  certifications: Certification[];
  availableToday: boolean;
  availableSlots: { date: string; slots: string[] }[];
  ratingBreakdown: { 5: number; 4: number; 3: number; 2: number; 1: number };
  recentReviews: ReviewItem[];
  completedBookingsCount: number;
  repeatHireRate: number;
  responseTime: string;
}

export interface CareService {
  id: CareCategoryId;
  name: string;
  shortDesc: string;
  overview: string;
  iconName: string;
  startingPrice: number;
  whatIncluded: string[];
  whoNeedsThis: string[];
  requirements: string[];
  faqs: { question: string; answer: string }[];
}

export interface CareRecipient {
  id: string;
  name: string;
  relationship: string;
  age: number;
  gender: string;
  careTypeNeeded: string;
  mobilityRequirements?: string;
  mobilityLevel?: string;
  dietaryRequirements?: string;
  importantNotes?: string;
  specialNotes?: string;
  medicalConditions?: string[];
  allergies?: string[];
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  photo?: string;
  isPrimary?: boolean;
}

export interface CustomerAddress {
  id: string;
  label: string;
  street: string;
  apt?: string;
  city: string;
  state: string;
  zipCode?: string;
  zip?: string;
  landmark?: string;
  gateCode?: string;
  contactPerson?: string;
  contactPhone?: string;
  isDefault: boolean;
}

export type PaymentType = 'card' | 'upi' | 'wallet' | 'apple_pay';

export interface PaymentMethod {
  id: string;
  type: PaymentType;
  label: string;
  last4?: string;
  brand?: 'visa' | 'mastercard' | 'amex' | 'Mastercard' | 'Visa';
  expiry?: string;
  expiryMonth?: number;
  expiryYear?: number;
  upiId?: string;
  balance?: number;
  isDefault: boolean;
}

export type BookingStatus = 'upcoming' | 'active' | 'completed' | 'cancelled';
export type SessionLiveStatus = 'on_the_way' | 'arrived' | 'in_progress' | 'completed';

export interface BookingPrice {
  hourlyRate: number;
  durationHours: number;
  serviceFee: number;
  platformFee: number;
  taxes: number;
  discount: number;
  total: number;
}

export interface Booking {
  id: string;
  bookingNumber: string;
  caregiverId: string;
  caregiverName: string;
  caregiverPhoto: string;
  caregiverPhone: string;
  caregiverRating: number;
  serviceId: CareCategoryId;
  serviceName: string;
  date: string;
  timeSlot: string;
  durationHours: number;
  recipientId: string;
  recipientName: string;
  recipientRelationship: string;
  address: CustomerAddress;
  specialRequirements: string[];
  customNotes?: string;
  status: BookingStatus;
  sessionStatus?: SessionLiveStatus;
  etaMinutes?: number;
  sessionStartTime?: string;
  sessionEndTime?: string;
  price: BookingPrice;
  paymentStatus: 'paid' | 'pending' | 'refunded';
  paymentMethodLabel: string;
  invoiceId?: string;
  ratingGiven?: number;
  reviewComment?: string;
  reviewGiven?: {
    rating: number;
    comment: string;
    date: string;
  };
  cancellationDetails?: {
    reason: string;
    refundAmount: number;
    cancelledAt: string;
  };
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  bookingIdRef?: string;
  senderId: string;
  senderName: string;
  senderType?: 'customer' | 'caregiver' | 'system';
  text: string;
  timestamp: string;
  isRead?: boolean;
  isMe?: boolean;
  status?: 'sent' | 'delivered' | 'read';
  attachment?: {
    type: 'image' | 'doc' | 'prescription';
    name: string;
    url?: string;
  };
}

export interface Conversation {
  id: string;
  caregiverId: string;
  caregiverName: string;
  caregiverPhoto: string;
  caregiverRole?: string;
  isOnline: boolean;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  bookingContext?: string;
  activeBookingId?: string;
  messages: ChatMessage[];
}

export type ChatThread = Conversation;

export interface NotificationItem {
  id: string;
  type: 'booking' | 'message' | 'payment' | 'refund' | 'reminder' | 'safety' | 'health';
  title: string;
  description?: string;
  body?: string;
  timestamp: string;
  isRead: boolean;
  bookingId?: string;
  actionScreen?: string;
}

export interface InvoiceItem {
  id: string;
  invoiceNumber: string;
  bookingId: string;
  serviceName: string;
  caregiverName: string;
  recipientName?: string;
  date: string;
  amount: number;
  total?: number;
  status: 'Paid' | 'Pending' | 'Refunded' | 'paid';
  subtotal: number;
  platformFee: number;
  tax: number;
  taxes?: number;
  discount: number;
  paymentMethod: string;
  hourlyRate?: number;
  hours?: number;
}

export type PaymentInvoice = InvoiceItem;

export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  photo: string;
  walletBalance: number;
  totalCompletedCareHours: number;
}

export interface FilterState {
  careCategory: CareCategoryId | 'all';
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  minExperience: number;
  gender: 'all' | 'Female' | 'Male' | 'Non-binary';
  selectedLanguages: string[];
  selectedSkills: string[];
  maxDistance: number;
  onlyAvailableToday: boolean;
  onlyVerified: boolean;
}

export type SortOption = 
  | 'recommended'
  | 'highest_rated'
  | 'most_experienced'
  | 'lowest_price'
  | 'nearest'
  | 'available_soon';

export type AppScreen = 
  | 'splash'
  | 'onboarding'
  | 'auth'
  | 'login'
  | 'signup'
  | 'otp'
  | 'forgot_password'
  | 'home'
  | 'find_care'
  | 'caregiver_profile'
  | 'services'
  | 'service_detail'
  | 'care_request'
  | 'care_request_wizard'
  | 'booking_flow'
  | 'booking_summary'
  | 'payment'
  | 'booking_confirmed'
  | 'booking_confirmation'
  | 'bookings'
  | 'booking_detail'
  | 'active_session'
  | 'review'
  | 'reschedule'
  | 'cancel_booking'
  | 'messages'
  | 'chat_detail'
  | 'chat_conversation'
  | 'favorites'
  | 'notifications'
  | 'profile'
  | 'care_recipients'
  | 'add_care_recipient'
  | 'addresses'
  | 'add_address'
  | 'payments_history'
  | 'payment_methods'
  | 'invoices'
  | 'reviews'
  | 'write_review'
  | 'help_center'
  | 'support'
  | 'safety_center'
  | 'settings';
