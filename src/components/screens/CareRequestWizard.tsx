import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  User,
  ShieldCheck,
  Sparkles,
  Heart,
  Plus,
  Info
} from 'lucide-react';
import {
  CareCategory,
  CareCategoryId,
  Caregiver,
  CareRecipient,
  CustomerAddress,
  Booking
} from '../../types';
import { HeaderBar } from '../common/HeaderBar';

interface CareRequestWizardProps {
  categories: CareCategory[];
  caregivers: Caregiver[];
  recipients: CareRecipient[];
  addresses: CustomerAddress[];
  preselectedCaregiverId?: string;
  preselectedCategoryId?: CareCategoryId;
  onBack: () => void;
  onSubmitBooking: (bookingData: Partial<Booking>) => void;
}

export const CareRequestWizard: React.FC<CareRequestWizardProps> = ({
  categories,
  caregivers,
  recipients,
  addresses,
  preselectedCaregiverId,
  preselectedCategoryId,
  onBack,
  onSubmitBooking,
}) => {
  const [step, setStep] = useState(1);
  const totalSteps = 11;

  // Wizard state
  const [selectedService, setSelectedService] = useState<CareCategoryId>(
    preselectedCategoryId || 'elder-care'
  );
  const [recipientRelationship, setRecipientRelationship] = useState<string>('Parent');
  const [selectedRecipientId, setSelectedRecipientId] = useState<string>(
    recipients[0]?.id || 'rec-1'
  );
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([
    'Mobility Transfer Assistance',
    'Medication Reminders'
  ]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    addresses[0]?.id || 'addr-1'
  );
  const [selectedDate, setSelectedDate] = useState<string>('Today, Aug 30');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('2:00 PM - 5:00 PM');
  const [durationHours, setDurationHours] = useState<number>(3);
  const [specialPreferences, setSpecialPreferences] = useState<string>(
    'Please ring the doorbell. Mom likes tea before her gentle walk.'
  );
  const [selectedCaregiverId, setSelectedCaregiverId] = useState<string>(
    preselectedCaregiverId || 'cg-1'
  );

  const selectedCategoryObj = categories.find((c) => c.id === selectedService) || categories[0];
  const selectedCaregiverObj = caregivers.find((cg) => cg.id === selectedCaregiverId) || caregivers[0];
  const selectedRecipientObj = recipients.find((r) => r.id === selectedRecipientId) || recipients[0];
  const selectedAddressObj = addresses.find((a) => a.id === selectedAddressId) || addresses[0];

  // Price calculations
  const hourlyRate = selectedCaregiverObj ? selectedCaregiverObj.hourlyRate : selectedCategoryObj.startingPrice;
  const serviceFee = hourlyRate * durationHours;
  const platformFee = Number((serviceFee * 0.08).toFixed(2));
  const taxes = Number((serviceFee * 0.075).toFixed(2));
  const discount = 15.00; // First-time discount
  const total = Number((serviceFee + platformFee + taxes - discount).toFixed(2));

  const requirementOptions = [
    'Mobility Transfer Assistance',
    'Medication Reminders',
    'Personal Hygiene & Bathing',
    'Nutritious Meal Preparation',
    'Cognitive Puzzles & Companionship',
    'Vital Signs / Blood Pressure Log',
    'Wound Dressing & Clinical Support',
    'Light Housekeeping & Linen Change'
  ];

  const handleToggleRequirement = (req: string) => {
    if (selectedRequirements.includes(req)) {
      setSelectedRequirements(selectedRequirements.filter((r) => r !== req));
    } else {
      setSelectedRequirements([...selectedRequirements, req]);
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Complete Request & Proceed to Payment/Summary
      const newBooking: Partial<Booking> = {
        bookingNumber: `HC-${Math.floor(10000 + Math.random() * 90000)}`,
        caregiverId: selectedCaregiverObj.id,
        caregiverName: selectedCaregiverObj.name,
        caregiverPhoto: selectedCaregiverObj.photo,
        caregiverPhone: '+1 (555) 349-8821',
        caregiverRating: selectedCaregiverObj.rating,
        serviceId: selectedService,
        serviceName: selectedCategoryObj.name,
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        durationHours: durationHours,
        recipientId: selectedRecipientObj.id,
        recipientName: selectedRecipientObj.name,
        recipientRelationship: recipientRelationship,
        address: selectedAddressObj,
        specialRequirements: selectedRequirements,
        customNotes: specialPreferences,
        status: 'upcoming',
        sessionStatus: 'on_the_way',
        price: {
          hourlyRate,
          durationHours,
          serviceFee,
          platformFee,
          taxes,
          discount,
          total
        },
        paymentStatus: 'paid',
        paymentMethodLabel: 'Visa ending 4242',
        createdAt: '2026-08-30'
      };
      onSubmitBooking(newBooking);
    }
  };

  return (
    <div className="flex-1 pb-24 bg-[#F8F9F8] min-h-screen flex flex-col justify-between">
      <div>
        <HeaderBar
          title="Request Care"
          subtitle={`Step ${step} of ${totalSteps}`}
          showBack={true}
          onBack={() => {
            if (step > 1) {
              setStep(step - 1);
            } else {
              onBack();
            }
          }}
        />

        {/* Top Progress Bar */}
        <div className="w-full bg-[#E8EEE8] h-1">
          <div
            className="bg-[#4E6E5D] h-full transition-all duration-300 rounded-r-full"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>

        {/* Step Content */}
        <div className="px-5 py-5 max-w-sm mx-auto w-full">
          {/* STEP 1: SELECT SERVICE */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-[#1A1C1A] font-serif">
                Select Care Service
              </h2>
              <p className="text-xs text-neutral-500">
                Choose the primary type of care you need for this session.
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedService(cat.id)}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      selectedService === cat.id
                        ? 'bg-[#F2F4F2] border-[#4E6E5D] ring-1 ring-[#4E6E5D]/30'
                        : 'bg-white border-[#E8EEE8] hover:bg-[#F8F9F8]'
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-bold text-[#1A1C1A] leading-tight">
                        {cat.name}
                      </h4>
                      <p className="text-[11px] text-neutral-500 mt-1 line-clamp-2">
                        {cat.shortDesc}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#4E6E5D] mt-2 block">
                      ${cat.startingPrice}/hr
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: WHO NEEDS CARE */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-[#1A1C1A] font-serif">
                Who Needs Care?
              </h2>
              <p className="text-xs text-neutral-500">
                Tell us who this service will be provided for.
              </p>
              <div className="space-y-2">
                {[
                  { id: 'Parent', label: 'My Parent (Mother / Father)', desc: 'Senior support, mobility & memory care' },
                  { id: 'Myself', label: 'Myself', desc: 'Post-op recovery, injury or physical aide' },
                  { id: 'Spouse', label: 'My Spouse or Partner', desc: 'Rehabilitation or daily support' },
                  { id: 'Child', label: 'My Child', desc: 'Pediatric care or developmental support' },
                  { id: 'Family Member', label: 'Other Family Member', desc: 'Extended family or friend' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setRecipientRelationship(item.id)}
                    className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      recipientRelationship === item.id
                        ? 'bg-[#F2F4F2] border-[#4E6E5D] text-[#1A1C1A] font-bold'
                        : 'bg-white border-[#E8EEE8] text-neutral-700 hover:bg-[#F8F9F8]'
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-bold">{item.label}</h4>
                      <p className="text-[11px] text-neutral-500 font-normal mt-0.5">{item.desc}</p>
                    </div>
                    {recipientRelationship === item.id && (
                      <CheckCircle2 size={16} className="text-[#4E6E5D] shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: CARE REQUIREMENTS */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-[#1A1C1A] font-serif">
                Care Requirements
              </h2>
              <p className="text-xs text-neutral-500">
                Select all specific tasks and assistance required.
              </p>
              <div className="space-y-2">
                {requirementOptions.map((req) => {
                  const isChecked = selectedRequirements.includes(req);
                  return (
                    <button
                      key={req}
                      type="button"
                      onClick={() => handleToggleRequirement(req)}
                      className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#F2F4F2] border-[#4E6E5D] text-[#4E6E5D] font-semibold'
                          : 'bg-white border-[#E8EEE8] text-neutral-700 hover:bg-[#F8F9F8]'
                      }`}
                    >
                      <span className="text-xs">{req}</span>
                      {isChecked && <CheckCircle2 size={15} className="text-[#4E6E5D]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 4: SELECT CARE RECIPIENT */}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-[#1A1C1A] font-serif">
                Select Care Recipient
              </h2>
              <p className="text-xs text-neutral-500">
                Choose a saved family profile or use standard profile details.
              </p>
              <div className="space-y-2.5">
                {recipients.map((rec) => (
                  <div
                    key={rec.id}
                    onClick={() => setSelectedRecipientId(rec.id)}
                    className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                      selectedRecipientId === rec.id
                        ? 'bg-[#F2F4F2] border-[#4E6E5D]'
                        : 'bg-white border-[#E8EEE8] hover:bg-[#F8F9F8]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {rec.photo ? (
                        <img
                          src={rec.photo}
                          alt={rec.name}
                          className="w-10 h-10 rounded-full object-cover border border-[#E8EEE8]"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#F2F4F2] text-[#4E6E5D] font-bold flex items-center justify-center text-xs">
                          {rec.name[0]}
                        </div>
                      )}
                      <div>
                        <h4 className="text-xs font-bold text-[#1A1C1A]">{rec.name}</h4>
                        <p className="text-[11px] text-neutral-500">
                          {rec.age} yrs • {rec.careTypeNeeded}
                        </p>
                      </div>
                    </div>
                    {selectedRecipientId === rec.id && (
                      <CheckCircle2 size={16} className="text-[#4E6E5D]" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: SERVICE LOCATION */}
          {step === 5 && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-[#1A1C1A] font-serif">
                Service Location
              </h2>
              <p className="text-xs text-neutral-500">
                Where should the caregiver arrive?
              </p>
              <div className="space-y-2.5">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    onClick={() => setSelectedAddressId(addr.id)}
                    className={`p-3.5 rounded-2xl border cursor-pointer flex items-start justify-between transition-all ${
                      selectedAddressId === addr.id
                        ? 'bg-[#F2F4F2] border-[#4E6E5D]'
                        : 'bg-white border-[#E8EEE8] hover:bg-[#F8F9F8]'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <MapPin size={15} className="text-[#4E6E5D] shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-[#1A1C1A]">{addr.label}</h4>
                        <p className="text-xs text-neutral-600 mt-0.5">
                          {addr.street} {addr.apt}, {addr.city}
                        </p>
                        {addr.landmark && (
                          <p className="text-[11px] text-neutral-400 mt-0.5">
                            Note: {addr.landmark}
                          </p>
                        )}
                      </div>
                    </div>
                    {selectedAddressId === addr.id && (
                      <CheckCircle2 size={16} className="text-[#4E6E5D] shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 6: DATE SELECTION */}
          {step === 6 && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-[#1A1C1A] font-serif">
                Select Date
              </h2>
              <p className="text-xs text-neutral-500">
                When would you like the care session to begin?
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {['Today, Aug 30', 'Tomorrow, Aug 31', 'Monday, Sep 01', 'Tuesday, Sep 02'].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setSelectedDate(d)}
                    className={`p-3.5 rounded-2xl border text-center font-semibold text-xs transition-all cursor-pointer ${
                      selectedDate === d
                        ? 'bg-[#F2F4F2] border-[#4E6E5D] text-[#4E6E5D] shadow-xs'
                        : 'bg-white border-[#E8EEE8] text-neutral-700 hover:bg-[#F8F9F8]'
                    }`}
                  >
                    <Calendar size={16} className="mx-auto mb-1 text-[#4E6E5D]" />
                    <span>{d}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 7: TIME WINDOW */}
          {step === 7 && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-[#1A1C1A] font-serif">
                Select Time Window
              </h2>
              <p className="text-xs text-neutral-500">
                Choose the caregiver's arrival and shift window.
              </p>
              <div className="space-y-2">
                {[
                  { time: '9:00 AM - 12:00 PM', label: 'Morning Session' },
                  { time: '2:00 PM - 5:00 PM', label: 'Afternoon Session (Recommended)' },
                  { time: '5:30 PM - 8:30 PM', label: 'Evening Bedtime Session' },
                  { time: '9:00 PM - 7:00 AM', label: 'Full Overnight Care (10 hrs)' },
                ].map((t) => (
                  <button
                    key={t.time}
                    type="button"
                    onClick={() => setSelectedTimeSlot(t.time)}
                    className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      selectedTimeSlot === t.time
                        ? 'bg-[#F2F4F2] border-[#4E6E5D] text-[#4E6E5D] font-bold'
                        : 'bg-white border-[#E8EEE8] text-neutral-700 hover:bg-[#F8F9F8]'
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-bold">{t.time}</h4>
                      <span className="text-[11px] text-neutral-500 font-normal">{t.label}</span>
                    </div>
                    {selectedTimeSlot === t.time && <CheckCircle2 size={16} className="text-[#4E6E5D]" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 8: DURATION (HOURS) */}
          {step === 8 && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-[#1A1C1A] font-serif">
                Session Duration
              </h2>
              <p className="text-xs text-neutral-500">
                How many hours of care will be needed?
              </p>
              <div className="grid grid-cols-3 gap-2.5">
                {[2, 3, 4, 6, 8, 10].map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setDurationHours(h)}
                    className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                      durationHours === h
                        ? 'bg-[#F2F4F2] border-[#4E6E5D] text-[#4E6E5D] font-bold shadow-xs'
                        : 'bg-white border-[#E8EEE8] text-neutral-700 hover:bg-[#F8F9F8]'
                    }`}
                  >
                    <span className="text-base font-bold block">{h}</span>
                    <span className="text-[10px] text-neutral-500">Hours</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 9: SPECIAL PREFERENCES & NOTES */}
          {step === 9 && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-[#1A1C1A] font-serif">
                Care Preferences & Notes
              </h2>
              <p className="text-xs text-neutral-500">
                Any gate codes, parking instructions, or recipient preferences?
              </p>
              <textarea
                rows={4}
                value={specialPreferences}
                onChange={(e) => setSpecialPreferences(e.target.value)}
                placeholder="e.g. Lockbox code is 1234. Mom prefers tea before walking..."
                className="w-full p-3.5 rounded-2xl bg-white border border-[#E8EEE8] text-xs text-[#1A1C1A] focus:outline-none focus:ring-1 focus:ring-[#4E6E5D] focus:border-[#4E6E5D] leading-relaxed shadow-xs"
              />
            </div>
          )}

          {/* STEP 10: SELECT CAREGIVER */}
          {step === 10 && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-[#1A1C1A] font-serif">
                Preferred Caregiver
              </h2>
              <p className="text-xs text-neutral-500">
                Select your preferred verified pro or let us assign the best match.
              </p>
              <div className="space-y-2.5">
                {caregivers.slice(0, 3).map((cg) => (
                  <div
                    key={cg.id}
                    onClick={() => setSelectedCaregiverId(cg.id)}
                    className={`p-3.5 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                      selectedCaregiverId === cg.id
                        ? 'bg-[#F2F4F2] border-[#4E6E5D]'
                        : 'bg-white border-[#E8EEE8] hover:bg-[#F8F9F8]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={cg.photo}
                        alt={cg.name}
                        className="w-12 h-12 rounded-xl object-cover border border-[#E8EEE8]"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-[#1A1C1A]">{cg.name}</h4>
                        <p className="text-[11px] text-[#4E6E5D] font-medium">{cg.mainSkill}</p>
                        <span className="text-[11px] font-bold text-[#1A1C1A]">${cg.hourlyRate}/hr</span>
                      </div>
                    </div>
                    {selectedCaregiverId === cg.id && <CheckCircle2 size={16} className="text-[#4E6E5D]" />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 11: REVIEW SUMMARY */}
          {step === 11 && (
            <div className="space-y-4">
              <h2 className="text-base font-bold text-[#1A1C1A] font-serif">
                Review Care Request
              </h2>
              <p className="text-xs text-neutral-500">
                Please double-check all booking details before confirmation.
              </p>

              {/* Caregiver & Service Card */}
              <div className="p-4 bg-white rounded-2xl border border-[#E8EEE8] space-y-3 shadow-xs">
                <div className="flex items-center gap-3 pb-3 border-b border-[#F2F4F2]">
                  <img
                    src={selectedCaregiverObj.photo}
                    alt={selectedCaregiverObj.name}
                    className="w-11 h-11 rounded-xl object-cover border border-[#E8EEE8]"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-[#1A1C1A]">
                      {selectedCaregiverObj.name}
                    </h4>
                    <p className="text-[11px] text-[#4E6E5D] font-medium">{selectedCategoryObj.name}</p>
                    <span className="text-[11px] text-neutral-500">
                      ★ {selectedCaregiverObj.rating.toFixed(1)} ({selectedCaregiverObj.reviewsCount} reviews)
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-neutral-700">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">Recipient:</span>
                    <span className="font-semibold text-[#1A1C1A]">{selectedRecipientObj.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">Schedule:</span>
                    <span className="font-semibold text-[#1A1C1A]">{selectedDate} ({selectedTimeSlot})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">Duration:</span>
                    <span className="font-semibold text-[#1A1C1A]">{durationHours} Hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-400">Address:</span>
                    <span className="font-semibold text-[#1A1C1A] truncate max-w-[180px]">{selectedAddressObj.street}</span>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="p-4 bg-white rounded-2xl border border-[#E8EEE8] space-y-2 text-xs shadow-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Caregiver Rate ({durationHours} hrs × ${hourlyRate})</span>
                  <span className="font-medium text-[#1A1C1A]">${serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Platform & Insurance Fee</span>
                  <span className="font-medium text-[#1A1C1A]">${platformFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Estimated Taxes</span>
                  <span className="font-medium text-[#1A1C1A]">${taxes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#4E6E5D] font-medium">
                  <span>Welcome Discount (NEWCARE)</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-[#F2F4F2] flex justify-between text-sm font-bold text-[#1A1C1A]">
                  <span>Total Amount</span>
                  <span className="text-[#4E6E5D] font-bold">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* STICKY BOTTOM BUTTONS */}
      <div className="sticky bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E8EEE8] px-5 py-3 pb-6 flex items-center justify-between gap-3 shadow-lg mt-auto">
        {step > 1 && (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="py-3 px-4 rounded-xl bg-[#F2F4F2] hover:bg-[#E8EEE8] text-[#1A1C1A] text-xs font-semibold transition-all cursor-pointer border border-[#E8EEE8]"
          >
            Back
          </button>
        )}

        <button
          type="button"
          onClick={handleNext}
          className="flex-1 py-3 px-5 rounded-xl bg-[#4E6E5D] hover:bg-[#3E584A] active:scale-[0.98] text-white font-medium text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>{step === totalSteps ? `Confirm & Pay $${total.toFixed(2)}` : 'Continue'}</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};
