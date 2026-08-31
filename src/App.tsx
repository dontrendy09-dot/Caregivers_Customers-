import React, { useState, useEffect } from 'react';
import {
  AppScreen,
  Caregiver,
  CareCategory,
  CareService,
  Booking,
  CareRecipient,
  CustomerAddress,
  PaymentInvoice,
  Conversation,
  NotificationItem,
  CustomerProfile,
  CareCategoryId
} from './types';
import {
  MOCK_CARE_CATEGORIES,
  MOCK_CARE_SERVICES,
  MOCK_CAREGIVERS,
  MOCK_RECIPIENTS,
  MOCK_ADDRESSES,
  MOCK_BOOKINGS,
  MOCK_INVOICES,
  MOCK_CONVERSATIONS,
  MOCK_NOTIFICATIONS,
  MOCK_USER_PROFILE
} from './data/mockData';
import { MobileFrame } from './components/common/MobileFrame';
import { BottomNav } from './components/common/BottomNav';

// Screens
import { SplashScreen } from './components/screens/SplashScreen';
import { OnboardingScreen } from './components/screens/OnboardingScreen';
import { AuthScreen } from './components/screens/AuthScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { FindCareScreen } from './components/screens/FindCareScreen';
import { CaregiverProfileScreen } from './components/screens/CaregiverProfileScreen';
import { ServicesScreen } from './components/screens/ServicesScreen';
import { ServiceDetailScreen } from './components/screens/ServiceDetailScreen';
import { CareRequestWizard } from './components/screens/CareRequestWizard';
import { BookingConfirmationScreen } from './components/screens/BookingConfirmationScreen';
import { BookingsScreen } from './components/screens/BookingsScreen';
import { BookingDetailScreen } from './components/screens/BookingDetailScreen';
import { ActiveSessionTrackingScreen } from './components/screens/ActiveSessionTrackingScreen';
import { ReviewScreen } from './components/screens/ReviewScreen';
import { MessagesScreen } from './components/screens/MessagesScreen';
import { ChatDetailScreen } from './components/screens/ChatDetailScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { CareRecipientsScreen } from './components/screens/CareRecipientsScreen';
import { FavoritesScreen } from './components/screens/FavoritesScreen';
import { AddressesScreen } from './components/screens/AddressesScreen';
import { PaymentsManagementScreen } from './components/screens/PaymentsManagementScreen';
import { NotificationsScreen } from './components/screens/NotificationsScreen';
import { SafetyCenterScreen } from './components/screens/SafetyCenterScreen';
import { SupportScreen } from './components/screens/SupportScreen';

export default function App() {
  // Navigation & session state
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('home');
  const [screenHistory, setScreenHistory] = useState<AppScreen[]>(['home']);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // App domain state
  const [userProfile, setUserProfile] = useState<CustomerProfile>(MOCK_USER_PROFILE);
  const [caregivers, setCaregivers] = useState<Caregiver[]>(MOCK_CAREGIVERS);
  const [categories] = useState<CareCategory[]>(MOCK_CARE_CATEGORIES);
  const [services] = useState<CareService[]>(MOCK_CARE_SERVICES);
  const [recipients, setRecipients] = useState<CareRecipient[]>(MOCK_RECIPIENTS);
  const [addresses, setAddresses] = useState<CustomerAddress[]>(MOCK_ADDRESSES);
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [invoices, setInvoices] = useState<PaymentInvoice[]>(MOCK_INVOICES);
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(['cg-1', 'cg-3']);

  // Selected Entities
  const [selectedCaregiverId, setSelectedCaregiverId] = useState<string>('cg-1');
  const [selectedCategoryId, setSelectedCategoryId] = useState<CareCategoryId>('elder-care');
  const [selectedBookingId, setSelectedBookingId] = useState<string>('bk-1');
  const [selectedConversationId, setSelectedConversationId] = useState<string>('conv-1');
  const [activeBookingForReview, setActiveBookingForReview] = useState<Booking | null>(null);

  // Toast banner notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const navigateTo = (screen: AppScreen) => {
    setScreenHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
  };

  const navigateBack = () => {
    if (screenHistory.length > 1) {
      const newHistory = [...screenHistory];
      newHistory.pop();
      const prevScreen = newHistory[newHistory.length - 1];
      setScreenHistory(newHistory);
      setCurrentScreen(prevScreen || 'home');
    } else {
      setCurrentScreen('home');
    }
  };

  const toggleFavorite = (caregiverId: string) => {
    if (favoriteIds.includes(caregiverId)) {
      setFavoriteIds(favoriteIds.filter((id) => id !== caregiverId));
      showToast('Removed from favorites');
    } else {
      setFavoriteIds([...favoriteIds, caregiverId]);
      showToast('Saved to favorite caregivers');
    }
  };

  const activeAddress = addresses.find((a) => a.isDefault) || addresses[0];
  const activeOrUpcomingBooking = bookings.find((b) => b.status === 'active' || b.status === 'upcoming');
  const selectedCaregiver = caregivers.find((cg) => cg.id === selectedCaregiverId) || caregivers[0];
  const selectedCategory = categories.find((c) => c.id === selectedCategoryId) || categories[0];
  const selectedServiceObj = services.find((s) => s.id === selectedCategoryId) || services[0];
  const selectedBooking = bookings.find((b) => b.id === selectedBookingId) || bookings[0];
  const selectedConversation = conversations.find((c) => c.id === selectedConversationId) || conversations[0];
  const unreadNotifsCount = notifications.filter((n) => !n.isRead).length;
  const unreadMessagesCount = conversations.reduce((acc, c) => acc + c.unreadCount, 0);

  // Bottom Navigation visibility
  const mainTabScreens: AppScreen[] = ['home', 'find_care', 'bookings', 'messages', 'profile'];
  const showBottomNav = mainTabScreens.includes(currentScreen);

  // Handlers
  const handleBookingSubmit = (bookingData: Partial<Booking>) => {
    const fullBooking: Booking = {
      id: `bk-${Date.now()}`,
      bookingNumber: bookingData.bookingNumber || `HC-${Math.floor(10000 + Math.random() * 90000)}`,
      caregiverId: bookingData.caregiverId || selectedCaregiver.id,
      caregiverName: bookingData.caregiverName || selectedCaregiver.name,
      caregiverPhoto: bookingData.caregiverPhoto || selectedCaregiver.photo,
      caregiverPhone: bookingData.caregiverPhone || '+1 (555) 349-8821',
      caregiverRating: bookingData.caregiverRating || selectedCaregiver.rating,
      serviceId: bookingData.serviceId || 'elder-care',
      serviceName: bookingData.serviceName || 'Elder Care & Daily Living',
      date: bookingData.date || 'Today, Aug 30',
      timeSlot: bookingData.timeSlot || '2:00 PM - 5:00 PM',
      durationHours: bookingData.durationHours || 3,
      recipientId: bookingData.recipientId || recipients[0].id,
      recipientName: bookingData.recipientName || recipients[0].name,
      recipientRelationship: bookingData.recipientRelationship || 'Parent',
      address: bookingData.address || activeAddress,
      specialRequirements: bookingData.specialRequirements || ['Medication reminder', 'Mobility support'],
      customNotes: bookingData.customNotes || '',
      status: 'upcoming',
      sessionStatus: 'on_the_way',
      price: bookingData.price || {
        hourlyRate: 38,
        durationHours: 3,
        serviceFee: 114,
        platformFee: 9.12,
        taxes: 8.55,
        discount: 15.00,
        total: 116.67
      },
      paymentStatus: 'paid',
      paymentMethodLabel: 'Visa ending 4242',
      invoiceId: `inv-${Date.now()}`,
      createdAt: '2026-08-30'
    };

    setBookings([fullBooking, ...bookings]);
    setSelectedBookingId(fullBooking.id);

    // Add corresponding invoice
    const newInvoice: PaymentInvoice = {
      id: fullBooking.invoiceId!,
      bookingId: fullBooking.id,
      invoiceNumber: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: 'Aug 30, 2026',
      serviceName: fullBooking.serviceName,
      caregiverName: fullBooking.caregiverName,
      recipientName: fullBooking.recipientName,
      hourlyRate: fullBooking.price.hourlyRate,
      hours: fullBooking.durationHours,
      amount: fullBooking.price.total,
      subtotal: fullBooking.price.serviceFee,
      tax: fullBooking.price.taxes,
      platformFee: fullBooking.price.platformFee,
      discount: fullBooking.price.discount || 0,
      total: fullBooking.price.total,
      paymentMethod: 'Visa •••• 4242',
      status: 'paid'
    };
    setInvoices([newInvoice, ...invoices]);

    navigateTo('booking_confirmed');
  };

  const handleStartChatWithCaregiver = (caregiverId: string) => {
    const cg = caregivers.find((c) => c.id === caregiverId);
    let conv = conversations.find((c) => c.caregiverId === caregiverId);
    if (!conv && cg) {
      conv = {
        id: `conv-${Date.now()}`,
        caregiverId: cg.id,
        caregiverName: cg.name,
        caregiverPhoto: cg.photo,
        lastMessage: 'Hi Eleanor! Looking forward to helping with care.',
        lastMessageTime: 'Just now',
        unreadCount: 0,
        isOnline: true,
        messages: [
          {
            id: 'm1',
            senderId: cg.id,
            senderName: cg.name,
            text: `Hello Eleanor! Thank you for connecting. I am available for your loved one.`,
            timestamp: 'Just now',
            isMe: false,
            status: 'read'
          }
        ]
      };
      setConversations([conv, ...conversations]);
    }
    if (conv) {
      setSelectedConversationId(conv.id);
      navigateTo('chat_detail');
    }
  };

  return (
    <MobileFrame currentScreen={currentScreen}>
      <div className="flex flex-col flex-1 min-h-full bg-[#F8FAFC] text-[#0F172A] font-sans relative">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 bg-[#1A1C1A]/95 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg backdrop-blur-md animate-fade-in border border-white/20 whitespace-nowrap">
            {toastMessage}
          </div>
        )}

        {/* Screen Routing */}
        {currentScreen === 'splash' && (
          <SplashScreen
            onFinish={() => navigateTo('onboarding')}
            onComplete={() => navigateTo('onboarding')}
          />
        )}

        {currentScreen === 'onboarding' && (
          <OnboardingScreen
            onGetStarted={() => navigateTo('auth')}
            onSignIn={() => navigateTo('auth')}
            onFinish={() => navigateTo('auth')}
            onSkip={() => navigateTo('auth')}
          />
        )}

        {currentScreen === 'auth' && (
          <AuthScreen
            onSuccess={() => {
              setIsAuthenticated(true);
              navigateTo('home');
            }}
            onAuthSuccess={(userData) => {
              setUserProfile((prev) => ({
                ...prev,
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
              }));
              setIsAuthenticated(true);
              navigateTo('home');
            }}
            onBackToOnboarding={() => navigateTo('onboarding')}
          />
        )}

        {currentScreen === 'home' && (
          <HomeScreen
            userName={userProfile.name.split(' ')[0]}
            userAvatar={userProfile.photo}
            activeAddress={activeAddress}
            categories={categories}
            recommendedCaregivers={caregivers}
            activeOrUpcomingBooking={activeOrUpcomingBooking}
            unreadNotifsCount={unreadNotifsCount}
            favoriteIds={favoriteIds}
            onToggleFavorite={toggleFavorite}
            onSelectCategory={(catId) => {
              setSelectedCategoryId(catId);
              navigateTo('service_detail');
            }}
            onSelectCaregiver={(cgId) => {
              setSelectedCaregiverId(cgId);
              navigateTo('caregiver_profile');
            }}
            onViewBooking={(bkId) => {
              setSelectedBookingId(bkId);
              navigateTo('booking_detail');
            }}
            onNavigate={(screen) => navigateTo(screen)}
            onQuickSearch={({ category }) => {
              if (category !== 'all') {
                setSelectedCategoryId(category);
              }
              navigateTo('find_care');
            }}
          />
        )}

        {currentScreen === 'find_care' && (
          <FindCareScreen
            caregivers={caregivers}
            categories={categories}
            favoriteIds={favoriteIds}
            initialCategory={selectedCategoryId}
            onToggleFavorite={toggleFavorite}
            onSelectCaregiver={(cgId) => {
              setSelectedCaregiverId(cgId);
              navigateTo('caregiver_profile');
            }}
            onRequestCare={(cgId) => {
              setSelectedCaregiverId(cgId);
              navigateTo('care_request');
            }}
            onNavigate={(screen) => navigateTo(screen)}
          />
        )}

        {currentScreen === 'caregiver_profile' && (
          <CaregiverProfileScreen
            caregiver={selectedCaregiver}
            categories={categories}
            isFavorite={favoriteIds.includes(selectedCaregiver.id)}
            onToggleFavorite={toggleFavorite}
            onBack={navigateBack}
            onRequestCare={(cgId) => {
              setSelectedCaregiverId(cgId);
              navigateTo('care_request');
            }}
            onStartChat={(cgId) => handleStartChatWithCaregiver(cgId)}
          />
        )}

        {currentScreen === 'services' && (
          <ServicesScreen
            categories={categories}
            onSelectCategory={(catId) => {
              setSelectedCategoryId(catId);
              navigateTo('service_detail');
            }}
            onBack={navigateBack}
          />
        )}

        {currentScreen === 'service_detail' && (
          <ServiceDetailScreen
            service={selectedServiceObj}
            category={selectedCategory}
            caregivers={caregivers}
            onBack={navigateBack}
            onFindCaregivers={() => navigateTo('find_care')}
            onSelectCaregiver={(cgId) => {
              setSelectedCaregiverId(cgId);
              navigateTo('caregiver_profile');
            }}
          />
        )}

        {currentScreen === 'care_request' && (
          <CareRequestWizard
            categories={categories}
            caregivers={caregivers}
            recipients={recipients}
            addresses={addresses}
            preselectedCaregiverId={selectedCaregiverId}
            preselectedCategoryId={selectedCategoryId}
            onBack={navigateBack}
            onSubmitBooking={handleBookingSubmit}
          />
        )}

        {currentScreen === 'booking_confirmed' && (
          <BookingConfirmationScreen
            booking={selectedBooking}
            onViewBooking={(bkId) => {
              setSelectedBookingId(bkId);
              navigateTo('booking_detail');
            }}
            onStartChat={(cgId) => handleStartChatWithCaregiver(cgId)}
            onGoHome={() => navigateTo('home')}
          />
        )}

        {currentScreen === 'bookings' && (
          <BookingsScreen
            bookings={bookings}
            onViewBooking={(bkId) => {
              setSelectedBookingId(bkId);
              navigateTo('booking_detail');
            }}
            onTrackActiveSession={(bkId) => {
              setSelectedBookingId(bkId);
              navigateTo('active_session');
            }}
            onRebook={(cgId) => {
              setSelectedCaregiverId(cgId);
              navigateTo('care_request');
            }}
            onLeaveReview={(bk) => {
              setActiveBookingForReview(bk);
              navigateTo('review');
            }}
            onFindCare={() => navigateTo('find_care')}
          />
        )}

        {currentScreen === 'booking_detail' && (
          <BookingDetailScreen
            booking={selectedBooking}
            onBack={navigateBack}
            onTrackSession={() => navigateTo('active_session')}
            onStartChat={(cgId) => handleStartChatWithCaregiver(cgId)}
            onCancelBooking={(bkId) => {
              setBookings(
                bookings.map((b) => (b.id === bkId ? { ...b, status: 'cancelled' } : b))
              );
              showToast('Booking cancelled & full refund issued');
              navigateTo('bookings');
            }}
            onViewInvoice={() => navigateTo('payments_history')}
          />
        )}

        {currentScreen === 'active_session' && (
          <ActiveSessionTrackingScreen
            booking={selectedBooking}
            onBack={navigateBack}
            onStartChat={(cgId) => handleStartChatWithCaregiver(cgId)}
          />
        )}

        {currentScreen === 'review' && activeBookingForReview && (
          <ReviewScreen
            booking={activeBookingForReview}
            onBack={navigateBack}
            onSubmitReview={({ rating, comment }) => {
              setBookings(
                bookings.map((b) =>
                  b.id === activeBookingForReview.id
                    ? { ...b, ratingGiven: rating, reviewComment: comment }
                    : b
                )
              );
              showToast('Review submitted! Thank you.');
              navigateTo('bookings');
            }}
          />
        )}

        {currentScreen === 'messages' && (
          <MessagesScreen
            conversations={conversations}
            caregivers={caregivers}
            onSelectConversation={(convId) => {
              setSelectedConversationId(convId);
              navigateTo('chat_detail');
            }}
            onContactSupport={() => navigateTo('support')}
          />
        )}

        {currentScreen === 'chat_detail' && (
          <ChatDetailScreen
            conversation={selectedConversation}
            caregiver={caregivers.find((cg) => cg.id === selectedConversation.caregiverId)}
            onBack={navigateBack}
            onViewProfile={(cgId) => {
              setSelectedCaregiverId(cgId);
              navigateTo('caregiver_profile');
            }}
          />
        )}

        {currentScreen === 'profile' && (
          <ProfileScreen
            profile={userProfile}
            favoritesCount={favoriteIds.length}
            recipientsCount={recipients.length}
            unreadNotifsCount={unreadNotifsCount}
            onNavigate={(screen) => navigateTo(screen)}
            onLogout={() => {
              setIsAuthenticated(false);
              navigateTo('auth');
            }}
          />
        )}

        {currentScreen === 'care_recipients' && (
          <CareRecipientsScreen
            recipients={recipients}
            onBack={navigateBack}
            onAddRecipient={(newRec) => {
              setRecipients([...recipients, newRec]);
              showToast('Family care recipient added');
            }}
            onDeleteRecipient={(recId) => {
              setRecipients(recipients.filter((r) => r.id !== recId));
              showToast('Recipient removed');
            }}
          />
        )}

        {currentScreen === 'favorites' && (
          <FavoritesScreen
            favoriteCaregivers={caregivers.filter((cg) => favoriteIds.includes(cg.id))}
            onToggleFavorite={toggleFavorite}
            onSelectCaregiver={(cgId) => {
              setSelectedCaregiverId(cgId);
              navigateTo('caregiver_profile');
            }}
            onRequestCare={(cgId) => {
              setSelectedCaregiverId(cgId);
              navigateTo('care_request');
            }}
            onFindCare={() => navigateTo('find_care')}
            onBack={navigateBack}
          />
        )}

        {currentScreen === 'addresses' && (
          <AddressesScreen
            addresses={addresses}
            onBack={navigateBack}
            onSetDefault={(addrId) => {
              setAddresses(
                addresses.map((a) => ({ ...a, isDefault: a.id === addrId }))
              );
              showToast('Primary address updated');
            }}
            onAddAddress={(newAddr) => {
              setAddresses([...addresses, newAddr]);
              showToast('Service address saved');
            }}
            onDeleteAddress={(addrId) => {
              setAddresses(addresses.filter((a) => a.id !== addrId));
              showToast('Address deleted');
            }}
          />
        )}

        {currentScreen === 'payments_history' && (
          <PaymentsManagementScreen
            invoices={invoices}
            walletBalance={userProfile.walletBalance}
            onBack={navigateBack}
          />
        )}

        {currentScreen === 'notifications' && (
          <NotificationsScreen
            notifications={notifications}
            onBack={navigateBack}
            onMarkAsRead={(id) => {
              setNotifications(
                notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n))
              );
            }}
            onClearAll={() => {
              setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
              showToast('All notifications marked as read');
            }}
            onNotificationClick={(notif) => {
              if (notif.type === 'booking') {
                navigateTo('bookings');
              } else if (notif.type === 'message') {
                navigateTo('messages');
              }
            }}
          />
        )}

        {currentScreen === 'safety_center' && (
          <SafetyCenterScreen onBack={navigateBack} />
        )}

        {currentScreen === 'support' && (
          <SupportScreen
            onBack={navigateBack}
            onStartChat={() => {
              setSelectedConversationId('conv-1');
              navigateTo('chat_detail');
            }}
          />
        )}

        {/* Global Bottom Navigation Bar for Main Tabs */}
        {showBottomNav && (
          <BottomNav
            currentScreen={currentScreen}
            onNavigate={(screen) => navigateTo(screen)}
            unreadMessagesCount={unreadMessagesCount}
            activeBookingsCount={bookings.filter(b => b.status === 'active' || b.status === 'upcoming').length}
            userAvatar={userProfile.photo}
          />
        )}
      </div>
    </MobileFrame>
  );
}
