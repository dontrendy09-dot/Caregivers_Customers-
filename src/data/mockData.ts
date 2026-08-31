import {
  CareCategory,
  Caregiver,
  CareService,
  CareRecipient,
  CustomerAddress,
  PaymentMethod,
  Booking,
  ChatThread,
  NotificationItem,
  InvoiceItem,
  ReviewItem
} from '../types';

export const INITIAL_CATEGORIES: CareCategory[] = [
  {
    id: 'elder-care',
    name: 'Elder Care',
    shortDesc: 'Daily living assistance & companionship',
    iconName: 'HeartHandshake',
    startingPrice: 800,
    badge: 'Popular',
    accentColor: 'from-blue-500 to-indigo-600',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'nursing-care',
    name: 'Nursing',
    shortDesc: 'Licensed RN/LPN medical & wound support',
    iconName: 'Stethoscope',
    startingPrice: 700,
    badge: 'Clinical',
    accentColor: 'from-blue-600 to-cyan-600',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'therapy',
    name: 'Therapy',
    shortDesc: 'Physiotherapy & rehabilitation sessions',
    iconName: 'Activity',
    startingPrice: 600,
    badge: 'Certified',
    accentColor: 'from-amber-500 to-orange-500',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'daily-care',
    name: 'Daily Care',
    shortDesc: 'Mobility, hygiene & routine assistance',
    iconName: 'Smile',
    startingPrice: 500,
    accentColor: 'from-emerald-500 to-teal-600',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'baby-care',
    name: 'Baby Care',
    shortDesc: 'Newborn infant & child specialized support',
    iconName: 'Baby',
    startingPrice: 750,
    accentColor: 'from-rose-400 to-pink-600',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'pregnancy',
    name: 'Pregnancy',
    shortDesc: 'Maternal wellness, prenatal & postnatal',
    iconName: 'Heart',
    startingPrice: 850,
    accentColor: 'from-purple-500 to-indigo-600',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'clinical-care',
    name: 'Clinical Care',
    shortDesc: 'ICU monitoring & specialized bedside care',
    iconName: 'ShieldCheck',
    startingPrice: 950,
    badge: 'Critical',
    accentColor: 'from-cyan-600 to-blue-700',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'patient-care',
    name: 'Patient Care',
    shortDesc: 'General bed patient recovery & assistance',
    iconName: 'Clock',
    startingPrice: 650,
    accentColor: 'from-teal-600 to-cyan-700',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=300&q=80'
  },
];

export const INITIAL_SERVICES: CareService[] = [
  {
    id: 'elder-care',
    name: 'Elder Care & Senior Living',
    shortDesc: 'Compassionate assistance enabling seniors to age with dignity in their own homes.',
    overview: 'Our certified elder care specialists provide holistic non-medical and light medical support tailored for seniors with mobility constraints, dementia, or daily living challenges.',
    iconName: 'HeartHandshake',
    startingPrice: 28,
    whatIncluded: [
      'Daily mobility & transfer assistance',
      'Medication reminders & log keeping',
      'Nutritious meal preparation & hydration tracking',
      'Light housekeeping & linen changes',
      'Cognitive engagement & gentle strolls',
      'Doctor appointment escort & family updates'
    ],
    whoNeedsThis: [
      'Seniors living alone needing daily supervision',
      'Individuals with mild-to-moderate memory decline',
      'Elderly family members requiring fall prevention'
    ],
    requirements: [
      'Safe home environment assessment',
      'Emergency contact details on file',
      'Current prescription list provided'
    ],
    faqs: [
      {
        question: 'Are all elder caregivers CPR and First Aid certified?',
        answer: 'Yes, 100% of our elder care specialists hold active CPR/AED certifications and undergo annual recertification.'
      },
      {
        question: 'Can I book overnight or 24-hour elder care?',
        answer: 'Absolutely. We offer hourly, day shifts (4-8 hours), and flat-rate overnight care.'
      }
    ]
  },
  {
    id: 'nursing-care',
    name: 'Skilled Nursing & Medical Support',
    shortDesc: 'Clinical care delivered by verified Registered Nurses (RN) and Licensed Practical Nurses (LPN).',
    overview: 'Professional clinical intervention including IV therapy, catheter management, wound dressing, vital signs monitoring, and chronic disease management under physician guidance.',
    iconName: 'Stethoscope',
    startingPrice: 42,
    whatIncluded: [
      'Post-operative wound dressing & drainage care',
      'Injections, IV administration & tube feeding',
      'Vital signs tracking (BP, Blood Glucose, SpO2)',
      'Catheter, ostomy & tracheostomy maintenance',
      'Pain management protocol execution',
      'Digital clinical documentation for your doctor'
    ],
    whoNeedsThis: [
      'Patients transitioning home after hospital discharge',
      'Individuals requiring sterile medical procedures',
      'Patients managing diabetes, COPD, or cardiac conditions'
    ],
    requirements: [
      'Physician order / prescription protocol',
      'Prescribed medical supplies available at residence'
    ],
    faqs: [
      {
        question: 'How do you verify nursing licenses?',
        answer: 'We verify state nursing board credentials directly with real-time registry checks prior to listing every nurse.'
      }
    ]
  },
  {
    id: 'companion-care',
    name: 'Companion & Social Care',
    shortDesc: 'Enriching companionship, social engagement, and cognitive stimulation.',
    overview: 'Designed to combat isolation and promote emotional wellness through stimulating conversations, board games, reading, and accompanied community outings.',
    iconName: 'Smile',
    startingPrice: 24,
    whatIncluded: [
      'Friendly conversation & active listening',
      'Accompaniment on walks, parks & grocery trips',
      'Arts, crafts, puzzles & memory games',
      'Tech assistance (tablets, video calling family)',
      'Pet care assistance & garden strolls'
    ],
    whoNeedsThis: [
      'Seniors experiencing social isolation',
      'Individuals whose family members work during the day',
      'Anyone seeking an energetic, caring companion'
    ],
    requirements: ['Comfortable seating and safe indoor/outdoor walking areas'],
    faqs: [
      {
        question: 'Can companion caregivers drive my parent to church or grocery store?',
        answer: 'Yes, companion caregivers with verified clean driving records can provide transportation services.'
      }
    ]
  },
  {
    id: 'post-surgery',
    name: 'Post-Surgery & Rehab Recovery',
    shortDesc: 'Dedicated recovery support following orthopedic, cardiac, or general surgical procedures.',
    overview: 'Specialized support to accelerate safe recovery, prevent hospital readmission, manage surgical drains, and encourage prescribed physical therapy routines.',
    iconName: 'Activity',
    startingPrice: 38,
    whatIncluded: [
      'Incision inspection & dressing changes',
      'Safe transfer assistance (bed to wheelchair/walker)',
      'Ice pack / compression therapy application',
      'Medication schedule compliance',
      'Assistance with gentle PT prescribed exercises'
    ],
    whoNeedsThis: [
      'Patients post hip/knee replacement',
      'Post-cardiac or abdominal surgery patients',
      'Outpatient surgery patients requiring 24-48hr observation'
    ],
    requirements: ['Discharge instructions document from surgical center'],
    faqs: [
      {
        question: 'How early should I book prior to my surgery date?',
        answer: 'We recommend scheduling 3 to 7 days before your procedure to reserve your preferred caregiver.'
      }
    ]
  },
  {
    id: 'personal-care',
    name: 'Personal Hygiene & Daily Care',
    shortDesc: 'Discreet, respectful assistance with personal hygiene, bathing, and dressing.',
    overview: 'Empathetic personal care aides assisting with daily morning and evening hygiene rituals while preserving dignity and autonomy.',
    iconName: 'Sparkles',
    startingPrice: 26,
    whatIncluded: [
      'Assisted shower, sponge bath, or tub bath',
      'Hair washing, brushing & oral hygiene',
      'Toileting & incontinence care',
      'Skin integrity checks & moisturizing',
      'Dressing & footwear assistance'
    ],
    whoNeedsThis: [
      'Individuals with arthritis, stroke, or Parkinson’s',
      'Bed-bound or chair-bound patients',
      'Anyone recovering from joint injuries'
    ],
    requirements: ['Non-slip bathroom mats or shower chair recommended'],
    faqs: [
      {
        question: 'Can I request a female or male caregiver?',
        answer: 'Yes, you can filter caregivers by gender preference at any time.'
      }
    ]
  },
  {
    id: 'child-care',
    name: 'Pediatric & Special Needs Child Care',
    shortDesc: 'Warm, qualified childcare professionals including infant care specialists.',
    overview: 'Certified childcare providers experienced with developmental support, sensory sensitivities, and busy family routines.',
    iconName: 'Baby',
    startingPrice: 25,
    whatIncluded: [
      'Infant feeding, burping & soothing routines',
      'Age-appropriate educational play & reading',
      'Safe school pickup & homework monitoring',
      'Bedtime routines & healthy snack prep',
      'Sensory-friendly interaction'
    ],
    whoNeedsThis: [
      'Parents needing reliable home support',
      'Families with children with neurodivergent needs',
      'New parents seeking night nanny support'
    ],
    requirements: ['Parental contact information & house safety rules'],
    faqs: [
      {
        question: 'Are caregivers trained in pediatric First Aid?',
        answer: 'Yes, all pediatric caregivers hold active Pediatric First Aid and CPR certifications.'
      }
    ]
  },
  {
    id: 'disability-support',
    name: 'Adaptive Disability Support',
    shortDesc: 'Empowering support for adults and children with physical or developmental disabilities.',
    overview: 'Tailored assistance utilizing assistive technologies, sensory tools, and physical aids to maximize independence.',
    iconName: 'ShieldCheck',
    startingPrice: 32,
    whatIncluded: [
      'Hoyer lift & sliding board transfers',
      'Adaptive equipment assistance & wheelchair maintenance',
      'Community integration & vocational escort',
      'Communication board & AAC device support',
      'Range of motion physical exercises'
    ],
    whoNeedsThis: [
      'Individuals with cerebral palsy, spinal injuries, or ALS',
      'Adults on the autism spectrum living independently'
    ],
    requirements: ['Details on specific mobility or communication equipment'],
    faqs: [
      {
        question: 'Are caregivers trained on mechanical lifts?',
        answer: 'Yes, our disability support specialists receive verified hands-on transfer training.'
      }
    ]
  },
  {
    id: 'respite-care',
    name: 'Respite Care for Family Caregivers',
    shortDesc: 'Short-term relief allowing primary family caregivers to rest, recharge, or travel.',
    overview: 'Seamless care handover so you can take a well-deserved break knowing your loved one is in attentive, professional hands.',
    iconName: 'Clock',
    startingPrice: 30,
    whatIncluded: [
      'Full continuity of daily schedule & routines',
      '24/7 or custom block coverage (4-72 hours)',
      'Regular SMS & photo updates to family',
      'Comprehensive medication & meal administration',
      'Emergency response readiness'
    ],
    whoNeedsThis: [
      'Family caregivers needing rest or attending personal events',
      'Caregivers feeling burnout or exhaustion'
    ],
    requirements: ['Complete daily routine guide & emergency contact list'],
    faqs: [
      {
        question: 'Can I schedule recurring weekly respite sessions?',
        answer: 'Yes, you can set recurring weekly or bi-weekly bookings with the same primary caregiver.'
      }
    ]
  }
];

export const INITIAL_CAREGIVERS: Caregiver[] = [
  {
    id: 'cg-1',
    name: 'Elena Rostova, RN',
    photo: 'https://images.unsplash.com/photo-1594824813583-b3c078028ff7?auto=format&fit=crop&w=400&q=80',
    gender: 'Female',
    verified: {
      identity: true,
      background: true,
      certification: true,
      experience: true
    },
    rating: 4.96,
    reviewsCount: 128,
    experienceYears: 8,
    mainSkill: 'Registered Nurse • Dementia & Post-Op',
    services: ['nursing-care', 'elder-care', 'post-surgery', 'personal-care'],
    skills: [
      'Dementia Care',
      'IV Therapy',
      'Wound Dressing',
      'Vital Monitoring',
      'Mobility Transfer',
      'Medication Management'
    ],
    languages: ['English', 'Spanish'],
    location: 'Downtown, 2.4 miles away',
    distanceMiles: 2.4,
    hourlyRate: 38,
    dailyRate: 260,
    overnightRate: 190,
    bio: 'Compassionate Registered Nurse with 8+ years experience in geriatric hospital wards and private in-home recovery. I focus on gentle, patient-first care, ensuring seniors maintain autonomy while receiving rigorous clinical support.',
    certifications: [
      {
        name: 'Registered Nurse (RN) License',
        issuingOrg: 'State Board of Nursing',
        issueYear: 2018,
        verified: true,
        licenseNumber: 'RN-884920'
      },
      {
        name: 'Certified Dementia Practitioner (CDP)',
        issuingOrg: 'National Council of Dementia Practitioners',
        issueYear: 2020,
        verified: true
      },
      {
        name: 'Advanced Cardiac Life Support (ACLS / BLS)',
        issuingOrg: 'American Heart Association',
        issueYear: 2024,
        verified: true
      }
    ],
    availableToday: true,
    availableSlots: [
      { date: 'Today', slots: ['9:00 AM', '11:30 AM', '2:00 PM', '5:00 PM'] },
      { date: 'Tomorrow', slots: ['8:30 AM', '1:00 PM', '4:30 PM'] },
      { date: 'Aug 31', slots: ['9:00 AM', '10:00 AM', '3:00 PM'] }
    ],
    ratingBreakdown: { 5: 122, 4: 5, 3: 1, 2: 0, 1: 0 },
    recentReviews: [
      {
        id: 'rev-101',
        authorName: 'Sarah Jenkins',
        authorPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        date: '3 days ago',
        serviceName: 'Elder Care',
        comment: 'Elena cared for my 82-year-old father after his discharge. She was extraordinarily gentle, punctual, and kept our whole family at ease with daily logs. Cannot recommend her enough!',
        helpfulCount: 14,
        qualityRating: 5,
        communicationRating: 5,
        punctualityRating: 5
      },
      {
        id: 'rev-102',
        authorName: 'David Chen',
        rating: 5,
        date: '1 week ago',
        serviceName: 'Post-Surgery Care',
        comment: 'Top tier clinical professional. Handled complex surgical dressing changes with surgical precision and immense warmth.',
        helpfulCount: 9,
        qualityRating: 5,
        communicationRating: 5,
        punctualityRating: 5
      }
    ],
    completedBookingsCount: 342,
    repeatHireRate: 97,
    responseTime: '< 5 mins'
  },
  {
    id: 'cg-2',
    name: 'Marcus Vance, CNA',
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    gender: 'Male',
    verified: {
      identity: true,
      background: true,
      certification: true,
      experience: true
    },
    rating: 4.92,
    reviewsCount: 94,
    experienceYears: 6,
    mainSkill: 'Certified Nursing Assistant • Mobility & Physical Therapy',
    services: ['elder-care', 'personal-care', 'disability-support', 'respite-care'],
    skills: [
      'Hoyer Lift Expert',
      'Stroke Rehabilitation',
      'Personal Hygiene',
      'Range of Motion',
      'Safe Transfers',
      'Meal Prep'
    ],
    languages: ['English'],
    location: 'Westside, 3.8 miles away',
    distanceMiles: 3.8,
    hourlyRate: 32,
    dailyRate: 220,
    overnightRate: 160,
    bio: 'Dedicated CNA and former physical therapy aide. I specialize in helping individuals with Parkinson’s, stroke recovery, and limited mobility regain confidence and stay active at home.',
    certifications: [
      {
        name: 'Certified Nursing Assistant (CNA)',
        issuingOrg: 'Dept of Health Services',
        issueYear: 2019,
        verified: true
      },
      {
        name: 'CPR & First Aid Specialist',
        issuingOrg: 'Red Cross',
        issueYear: 2024,
        verified: true
      }
    ],
    availableToday: true,
    availableSlots: [
      { date: 'Today', slots: ['10:00 AM', '1:30 PM', '4:00 PM'] },
      { date: 'Tomorrow', slots: ['9:00 AM', '11:00 AM', '2:00 PM'] }
    ],
    ratingBreakdown: { 5: 86, 4: 7, 3: 1, 2: 0, 1: 0 },
    recentReviews: [
      {
        id: 'rev-201',
        authorName: 'Michael Thorne',
        rating: 5,
        date: '2 weeks ago',
        serviceName: 'Disability Support',
        comment: 'Marcus has been a blessing for my brother. Strong, respectful, and brings immense positive energy to every single session.',
        helpfulCount: 8
      }
    ],
    completedBookingsCount: 215,
    repeatHireRate: 94,
    responseTime: '< 10 mins'
  },
  {
    id: 'cg-3',
    name: 'Amara Okafor',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    gender: 'Female',
    verified: {
      identity: true,
      background: true,
      certification: true,
      experience: true
    },
    rating: 4.98,
    reviewsCount: 162,
    experienceYears: 10,
    mainSkill: 'Companion & Alzheimer’s Memory Specialist',
    services: ['companion-care', 'elder-care', 'respite-care'],
    skills: [
      'Alzheimer’s Care',
      'Art & Music Therapy',
      'Medication Tracking',
      'Cognitive Stimulation',
      'Gentle Outings',
      'Dietary Cooking'
    ],
    languages: ['English', 'French', 'Igbo'],
    location: 'North Suburbs, 4.1 miles away',
    distanceMiles: 4.1,
    hourlyRate: 29,
    dailyRate: 195,
    overnightRate: 145,
    bio: 'With over a decade of geriatric companionship and memory support, I focus on bringing joy, calmness, and cognitive stimulation to seniors dealing with loneliness or cognitive decline.',
    certifications: [
      {
        name: 'Senior Companion & Memory Care Specialist',
        issuingOrg: 'Alzheimer’s Foundation Training',
        issueYear: 2016,
        verified: true
      },
      {
        name: 'Food Safety & Nutrition in Geriatrics',
        issuingOrg: 'National Safety Council',
        issueYear: 2021,
        verified: true
      }
    ],
    availableToday: false,
    availableSlots: [
      { date: 'Tomorrow', slots: ['9:00 AM', '1:00 PM', '3:30 PM'] },
      { date: 'Aug 31', slots: ['10:00 AM', '2:00 PM', '5:00 PM'] }
    ],
    ratingBreakdown: { 5: 158, 4: 4, 3: 0, 2: 0, 1: 0 },
    recentReviews: [
      {
        id: 'rev-301',
        authorName: 'Claire Robertson',
        rating: 5,
        date: '5 days ago',
        serviceName: 'Companion Care',
        comment: 'Amara played classical piano and helped my mother bake cookies safely. My mom had a huge smile the entire afternoon.',
        helpfulCount: 22
      }
    ],
    completedBookingsCount: 420,
    repeatHireRate: 98,
    responseTime: '< 8 mins'
  },
  {
    id: 'cg-4',
    name: 'Dr. Julian Reyes, PT & Caregiver',
    photo: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
    gender: 'Male',
    verified: {
      identity: true,
      background: true,
      certification: true,
      experience: true
    },
    rating: 4.89,
    reviewsCount: 77,
    experienceYears: 7,
    mainSkill: 'Post-Op Physical Therapy & Mobility Aide',
    services: ['post-surgery', 'disability-support', 'elder-care'],
    skills: [
      'Fall Prevention',
      'Joint Replacement Recovery',
      'Gait Training',
      'Bed Positioning',
      'Adaptive Equipment'
    ],
    languages: ['English', 'Spanish'],
    location: 'Midtown, 1.9 miles away',
    distanceMiles: 1.9,
    hourlyRate: 45,
    dailyRate: 310,
    overnightRate: 210,
    bio: 'Physical Therapy trained caregiver passionate about restoring functional independence for post-operative orthopedic patients and neurological rehabilitation clients.',
    certifications: [
      {
        name: 'Physical Therapy Assistant (PTA)',
        issuingOrg: 'State Board of Allied Health',
        issueYear: 2017,
        verified: true
      },
      {
        name: 'Geriatric Fall Prevention Specialist',
        issuingOrg: 'American Geriatrics Society',
        issueYear: 2022,
        verified: true
      }
    ],
    availableToday: true,
    availableSlots: [
      { date: 'Today', slots: ['2:30 PM', '4:30 PM', '6:00 PM'] },
      { date: 'Tomorrow', slots: ['8:00 AM', '10:30 AM', '1:00 PM'] }
    ],
    ratingBreakdown: { 5: 70, 4: 6, 3: 1, 2: 0, 1: 0 },
    recentReviews: [
      {
        id: 'rev-401',
        authorName: 'Arthur Morgan',
        rating: 5,
        date: '3 weeks ago',
        serviceName: 'Post-Surgery Care',
        comment: 'Julian assisted me with hip replacement recovery. His knowledge of safe biomechanics was invaluable.',
        helpfulCount: 11
      }
    ],
    completedBookingsCount: 180,
    repeatHireRate: 91,
    responseTime: '< 15 mins'
  },
  {
    id: 'cg-5',
    name: 'Maya Lin, LPN',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
    gender: 'Female',
    verified: {
      identity: true,
      background: true,
      certification: true,
      experience: true
    },
    rating: 4.95,
    reviewsCount: 112,
    experienceYears: 9,
    mainSkill: 'Licensed Practical Nurse • Pediatric & Infant Care',
    services: ['child-care', 'nursing-care', 'respite-care'],
    skills: [
      'Newborn & Infant Care',
      'Pediatric CPR',
      'Sensory Processing Support',
      'G-Tube Administration',
      'Sleep Training',
      'Developmental Play'
    ],
    languages: ['English', 'Mandarin'],
    location: 'East Bay, 5.2 miles away',
    distanceMiles: 5.2,
    hourlyRate: 35,
    dailyRate: 240,
    overnightRate: 180,
    bio: 'Experienced pediatric LPN and certified infant night specialist. I provide loving, meticulous care for newborns, toddlers, and children with complex health or sensory needs.',
    certifications: [
      {
        name: 'Licensed Practical Nurse (LPN)',
        issuingOrg: 'State Board of Nursing',
        issueYear: 2016,
        verified: true
      },
      {
        name: 'Pediatric Advanced Life Support (PALS)',
        issuingOrg: 'American Heart Association',
        issueYear: 2023,
        verified: true
      }
    ],
    availableToday: true,
    availableSlots: [
      { date: 'Today', slots: ['1:00 PM', '3:00 PM', '6:00 PM'] },
      { date: 'Tomorrow', slots: ['9:00 AM', '12:00 PM', '4:00 PM'] }
    ],
    ratingBreakdown: { 5: 107, 4: 5, 3: 0, 2: 0, 1: 0 },
    recentReviews: [
      {
        id: 'rev-501',
        authorName: 'Jessica Taylor',
        rating: 5,
        date: '4 days ago',
        serviceName: 'Child Care',
        comment: 'Maya was incredible with our 4-month old twins. She gave us our first full night of peaceful sleep in months!',
        helpfulCount: 17
      }
    ],
    completedBookingsCount: 290,
    repeatHireRate: 96,
    responseTime: '< 5 mins'
  }
];

export const INITIAL_RECIPIENTS: CareRecipient[] = [
  {
    id: 'rec-1',
    name: 'Margaret Vance (Mom)',
    relationship: 'Parent',
    age: 78,
    gender: 'Female',
    careTypeNeeded: 'Elder Care & Mobility Support',
    mobilityRequirements: 'Uses walker, needs one-person assist for transfers.',
    dietaryRequirements: 'Low sodium, diabetic friendly, soft food textures.',
    importantNotes: 'Mild morning disorientation, prefers gentle reminders for BP medicine at 9:00 AM. Loves herbal tea and listening to 60s jazz.',
    emergencyContact: {
      name: 'Eleanor Vance (Daughter)',
      phone: '+1 (555) 234-5678',
      relationship: 'Daughter / Power of Attorney'
    },
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    isPrimary: true
  },
  {
    id: 'rec-2',
    name: 'Robert Vance (Dad)',
    relationship: 'Parent',
    age: 81,
    gender: 'Male',
    careTypeNeeded: 'Companion Care & Light Exercise',
    mobilityRequirements: 'Fully ambulatory with cane, gets tired after 20 mins of walking.',
    dietaryRequirements: 'Heart healthy diet.',
    importantNotes: 'Enjoys outdoor patio walks and reading the morning newspaper.',
    emergencyContact: {
      name: 'Eleanor Vance',
      phone: '+1 (555) 234-5678',
      relationship: 'Daughter'
    },
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    isPrimary: false
  },
  {
    id: 'rec-3',
    name: 'Myself (Eleanor)',
    relationship: 'Myself',
    age: 44,
    gender: 'Female',
    careTypeNeeded: 'Post-Surgery Knee Rehab',
    mobilityRequirements: 'Crutches after arthroscopic knee surgery.',
    dietaryRequirements: 'None',
    importantNotes: 'Ice pack rotation every 2 hours.',
    emergencyContact: {
      name: 'Mark Vance (Spouse)',
      phone: '+1 (555) 876-5432',
      relationship: 'Spouse'
    },
    isPrimary: false
  }
];

export const INITIAL_ADDRESSES: CustomerAddress[] = [
  {
    id: 'addr-1',
    label: 'Home',
    street: '14/2 Race Course Road',
    apt: 'Block C, Flat 302',
    city: 'Coimbatore',
    state: 'TN',
    zip: '641018',
    landmark: 'Near Thomas Park, Coimbatore',
    contactPerson: 'Balakrishnan',
    contactPhone: '+91 98765 43210',
    isDefault: true
  },
  {
    id: 'addr-2',
    label: 'Parent\'s House',
    street: '88 Avinashi Road',
    apt: 'Green Villa',
    city: 'Coimbatore',
    state: 'TN',
    zip: '641004',
    landmark: 'Opposite PSG Tech',
    contactPerson: 'Balakrishnan',
    contactPhone: '+91 98765 43210',
    isDefault: false
  }
];

export const INITIAL_PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'pm-1',
    type: 'card',
    label: 'Chase Sapphire Preferred',
    last4: '4242',
    brand: 'visa',
    expiry: '09/28',
    isDefault: true
  },
  {
    id: 'pm-2',
    type: 'apple_pay',
    label: 'Apple Pay (Quick Checkout)',
    isDefault: false
  },
  {
    id: 'pm-3',
    type: 'wallet',
    label: 'HavenCare Wallet',
    balance: 145.00,
    isDefault: false
  },
  {
    id: 'pm-4',
    type: 'upi',
    label: 'Instant UPI / Direct Pay',
    upiId: 'eleanor.vance@bank',
    isDefault: false
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bk-101',
    bookingNumber: 'HC-89211',
    caregiverId: 'cg-1',
    caregiverName: 'Elena Rostova, RN',
    caregiverPhoto: 'https://images.unsplash.com/photo-1594824813583-b3c078028ff7?auto=format&fit=crop&w=400&q=80',
    caregiverPhone: '+1 (555) 349-8821',
    caregiverRating: 4.96,
    serviceId: 'elder-care',
    serviceName: 'Elder Care & Daily Support',
    date: 'Today, Aug 30',
    timeSlot: '2:00 PM - 5:00 PM',
    durationHours: 3,
    recipientId: 'rec-1',
    recipientName: 'Margaret Vance (Mom)',
    recipientRelationship: 'Parent',
    address: INITIAL_ADDRESSES[0],
    specialRequirements: ['Blood pressure check', 'Transfer assistance', 'Medication log'],
    customNotes: 'Key is in lockbox 1234 or ring the bell. Mom is resting in living room.',
    status: 'active',
    sessionStatus: 'in_progress',
    etaMinutes: 0,
    sessionStartTime: '2:02 PM',
    price: {
      hourlyRate: 38,
      durationHours: 3,
      serviceFee: 114,
      platformFee: 9.50,
      taxes: 8.75,
      discount: 15.00,
      total: 117.25
    },
    paymentStatus: 'paid',
    paymentMethodLabel: 'Visa ending 4242',
    createdAt: '2026-08-29'
  },
  {
    id: 'bk-102',
    bookingNumber: 'HC-89304',
    caregiverId: 'cg-3',
    caregiverName: 'Amara Okafor',
    caregiverPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    caregiverPhone: '+1 (555) 482-9901',
    caregiverRating: 4.98,
    serviceId: 'companion-care',
    serviceName: 'Companion & Social Care',
    date: 'Tomorrow, Aug 31',
    timeSlot: '10:00 AM - 1:00 PM',
    durationHours: 3,
    recipientId: 'rec-1',
    recipientName: 'Margaret Vance (Mom)',
    recipientRelationship: 'Parent',
    address: INITIAL_ADDRESSES[0],
    specialRequirements: ['Gentle outdoor walk', 'Memory puzzle session', 'Herbal tea prep'],
    status: 'upcoming',
    sessionStatus: 'on_the_way',
    price: {
      hourlyRate: 29,
      durationHours: 3,
      serviceFee: 87,
      platformFee: 7.50,
      taxes: 6.80,
      discount: 0,
      total: 101.30
    },
    paymentStatus: 'paid',
    paymentMethodLabel: 'Visa ending 4242',
    createdAt: '2026-08-30'
  },
  {
    id: 'bk-103',
    bookingNumber: 'HC-88741',
    caregiverId: 'cg-2',
    caregiverName: 'Marcus Vance, CNA',
    caregiverPhoto: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    caregiverPhone: '+1 (555) 771-4019',
    caregiverRating: 4.92,
    serviceId: 'disability-support',
    serviceName: 'Mobility & Physical Support',
    date: 'Aug 24, 2026',
    timeSlot: '1:00 PM - 4:00 PM',
    durationHours: 3,
    recipientId: 'rec-1',
    recipientName: 'Margaret Vance (Mom)',
    recipientRelationship: 'Parent',
    address: INITIAL_ADDRESSES[0],
    specialRequirements: ['Hoyer lift transfer', 'Range of motion'],
    status: 'completed',
    sessionStatus: 'completed',
    price: {
      hourlyRate: 32,
      durationHours: 3,
      serviceFee: 96,
      platformFee: 8.00,
      taxes: 7.45,
      discount: 0,
      total: 111.45
    },
    paymentStatus: 'paid',
    paymentMethodLabel: 'Apple Pay',
    reviewGiven: {
      rating: 5,
      comment: 'Marcus was punctual, attentive, and extremely thorough with physical mobility exercises.',
      date: 'Aug 24, 2026'
    },
    createdAt: '2026-08-22'
  },
  {
    id: 'bk-104',
    bookingNumber: 'HC-87910',
    caregiverId: 'cg-4',
    caregiverName: 'Dr. Julian Reyes, PT',
    caregiverPhoto: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
    caregiverPhone: '+1 (555) 902-1244',
    caregiverRating: 4.89,
    serviceId: 'post-surgery',
    serviceName: 'Post-Surgery Knee Rehab',
    date: 'Aug 18, 2026',
    timeSlot: '3:00 PM - 5:00 PM',
    durationHours: 2,
    recipientId: 'rec-3',
    recipientName: 'Myself (Eleanor)',
    recipientRelationship: 'Myself',
    address: INITIAL_ADDRESSES[1],
    specialRequirements: ['Knee icing protocol', 'Gait training'],
    status: 'completed',
    sessionStatus: 'completed',
    price: {
      hourlyRate: 45,
      durationHours: 2,
      serviceFee: 90,
      platformFee: 7.50,
      taxes: 7.10,
      discount: 0,
      total: 104.60
    },
    paymentStatus: 'paid',
    paymentMethodLabel: 'Visa ending 4242',
    createdAt: '2026-08-16'
  },
  {
    id: 'bk-105',
    bookingNumber: 'HC-86419',
    caregiverId: 'cg-1',
    caregiverName: 'Elena Rostova, RN',
    caregiverPhoto: 'https://images.unsplash.com/photo-1594824813583-b3c078028ff7?auto=format&fit=crop&w=400&q=80',
    caregiverPhone: '+1 (555) 349-8821',
    caregiverRating: 4.96,
    serviceId: 'nursing-care',
    serviceName: 'Clinical Wound Check',
    date: 'Aug 10, 2026',
    timeSlot: '9:00 AM - 11:00 AM',
    durationHours: 2,
    recipientId: 'rec-1',
    recipientName: 'Margaret Vance (Mom)',
    recipientRelationship: 'Parent',
    address: INITIAL_ADDRESSES[0],
    specialRequirements: ['Wound dressing check'],
    status: 'cancelled',
    price: {
      hourlyRate: 38,
      durationHours: 2,
      serviceFee: 76,
      platformFee: 6.50,
      taxes: 6.10,
      discount: 0,
      total: 88.60
    },
    paymentStatus: 'refunded',
    paymentMethodLabel: 'Visa ending 4242',
    cancellationDetails: {
      reason: 'Doctor rescheduled in-clinic consultation',
      refundAmount: 88.60,
      cancelledAt: 'Aug 09, 2026'
    },
    createdAt: '2026-08-08'
  }
];

export const INITIAL_CHAT_THREADS: ChatThread[] = [
  {
    id: 'thread-1',
    caregiverId: 'cg-1',
    caregiverName: 'Elena Rostova, RN',
    caregiverPhoto: 'https://images.unsplash.com/photo-1594824813583-b3c078028ff7?auto=format&fit=crop&w=400&q=80',
    caregiverRole: 'Registered Nurse • Active Session',
    isOnline: true,
    lastMessage: 'Your mom just had her herbal tea and BP is steady at 122/78. She is doing wonderful!',
    lastMessageTime: '2:24 PM',
    unreadCount: 1,
    activeBookingId: 'bk-101',
    messages: [
      {
        id: 'msg-1',
        senderId: 'cg-1',
        senderName: 'Elena Rostova, RN',
        senderType: 'caregiver',
        text: 'Hello Eleanor! I am on my way to your mom’s house. ETA is around 1:55 PM.',
        timestamp: '1:42 PM',
        isRead: true
      },
      {
        id: 'msg-2',
        senderId: 'user-1',
        senderName: 'Eleanor Vance',
        senderType: 'customer',
        text: 'Thank you Elena! The lockbox code is 1234. I left her fresh medication box on the kitchen island.',
        timestamp: '1:45 PM',
        isRead: true
      },
      {
        id: 'msg-3',
        senderId: 'cg-1',
        senderName: 'Elena Rostova, RN',
        senderType: 'caregiver',
        text: 'Got it! I arrived safely. Margaret was smiling and ready for our session.',
        timestamp: '2:01 PM',
        isRead: true
      },
      {
        id: 'msg-4',
        senderId: 'cg-1',
        senderName: 'Elena Rostova, RN',
        senderType: 'caregiver',
        text: 'Your mom just had her herbal tea and BP is steady at 122/78. She is doing wonderful!',
        timestamp: '2:24 PM',
        isRead: false
      }
    ]
  },
  {
    id: 'thread-2',
    caregiverId: 'cg-3',
    caregiverName: 'Amara Okafor',
    caregiverPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    caregiverRole: 'Companion Specialist',
    isOnline: false,
    lastMessage: 'Looking forward to tomorrow at 10 AM! I will bring the watercolor painting kit.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
    activeBookingId: 'bk-102',
    messages: [
      {
        id: 'msg-201',
        senderId: 'cg-3',
        senderName: 'Amara Okafor',
        senderType: 'caregiver',
        text: 'Hi Eleanor, looking forward to tomorrow’s companionship session with Margaret!',
        timestamp: 'Yesterday 4:15 PM',
        isRead: true
      },
      {
        id: 'msg-202',
        senderId: 'user-1',
        senderName: 'Eleanor Vance',
        senderType: 'customer',
        text: 'She is so excited Amara. She was practicing her favorite songs this morning.',
        timestamp: 'Yesterday 4:20 PM',
        isRead: true
      },
      {
        id: 'msg-203',
        senderId: 'cg-3',
        senderName: 'Amara Okafor',
        senderType: 'caregiver',
        text: 'Looking forward to tomorrow at 10 AM! I will bring the watercolor painting kit.',
        timestamp: 'Yesterday 4:22 PM',
        isRead: true
      }
    ]
  },
  {
    id: 'thread-3',
    caregiverId: 'cg-2',
    caregiverName: 'Marcus Vance, CNA',
    caregiverPhoto: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
    caregiverRole: 'Certified Nursing Assistant',
    isOnline: true,
    lastMessage: 'Thank you for the wonderful 5-star review Eleanor! Have a great week.',
    lastMessageTime: 'Aug 24',
    unreadCount: 0,
    messages: [
      {
        id: 'msg-301',
        senderId: 'cg-2',
        senderName: 'Marcus Vance, CNA',
        senderType: 'caregiver',
        text: 'Thank you for the wonderful 5-star review Eleanor! Have a great week.',
        timestamp: 'Aug 24, 5:30 PM',
        isRead: true
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'booking',
    title: 'Care Session Active',
    description: 'Elena Rostova, RN started care session with Margaret Vance at 2:02 PM.',
    timestamp: '28m ago',
    isRead: false,
    bookingId: 'bk-101',
    actionScreen: 'active_session'
  },
  {
    id: 'notif-2',
    type: 'message',
    title: 'New Message from Elena, RN',
    description: '"Your mom just had her herbal tea and BP is steady at 122/78..."',
    timestamp: '6m ago',
    isRead: false,
    actionScreen: 'messages'
  },
  {
    id: 'notif-3',
    type: 'reminder',
    title: 'Upcoming Caregiver Visit Tomorrow',
    description: 'Amara Okafor will arrive tomorrow at 10:00 AM for Companion Care.',
    timestamp: '2h ago',
    isRead: true,
    bookingId: 'bk-102',
    actionScreen: 'booking_detail'
  },
  {
    id: 'notif-4',
    type: 'payment',
    title: 'Payment Receipt Confirmed',
    description: '$117.25 successfully processed for booking #HC-89211.',
    timestamp: '1d ago',
    isRead: true,
    actionScreen: 'invoices'
  },
  {
    id: 'notif-5',
    type: 'safety',
    title: 'Caregiver Background Check Re-verified',
    description: 'Annual criminal & registry verification for all your active caregivers completed with 100% clean record.',
    timestamp: '3d ago',
    isRead: true,
    actionScreen: 'safety_center'
  }
];

export const INITIAL_INVOICES: InvoiceItem[] = [
  {
    id: 'inv-101',
    invoiceNumber: 'INV-2026-0891',
    bookingId: 'bk-101',
    serviceName: 'Elder Care & Daily Support',
    caregiverName: 'Elena Rostova, RN',
    date: 'Aug 30, 2026',
    amount: 117.25,
    status: 'Paid',
    subtotal: 114.00,
    platformFee: 9.50,
    tax: 8.75,
    discount: 15.00,
    paymentMethod: 'Visa •••• 4242'
  },
  {
    id: 'inv-102',
    invoiceNumber: 'INV-2026-0842',
    bookingId: 'bk-102',
    serviceName: 'Companion & Social Care',
    caregiverName: 'Amara Okafor',
    date: 'Aug 30, 2026',
    amount: 101.30,
    status: 'Paid',
    subtotal: 87.00,
    platformFee: 7.50,
    tax: 6.80,
    discount: 0.00,
    paymentMethod: 'Visa •••• 4242'
  },
  {
    id: 'inv-103',
    invoiceNumber: 'INV-2026-0798',
    bookingId: 'bk-103',
    serviceName: 'Mobility & Physical Support',
    caregiverName: 'Marcus Vance, CNA',
    date: 'Aug 24, 2026',
    amount: 111.45,
    status: 'Paid',
    subtotal: 96.00,
    platformFee: 8.00,
    tax: 7.45,
    discount: 0.00,
    paymentMethod: 'Apple Pay'
  },
  {
    id: 'inv-104',
    invoiceNumber: 'INV-2026-0711',
    bookingId: 'bk-105',
    serviceName: 'Clinical Wound Check',
    caregiverName: 'Elena Rostova, RN',
    date: 'Aug 09, 2026',
    amount: 88.60,
    status: 'Refunded',
    subtotal: 76.00,
    platformFee: 6.50,
    tax: 6.10,
    discount: 0.00,
    paymentMethod: 'Visa •••• 4242'
  }
];

export const SAFETY_GUIDELINES = [
  {
    title: '100% Multi-Tier Background Checks',
    desc: 'Every caregiver undergoes nationwide criminal history, sex offender registry checks, driving record analysis, and social security verification before stepping into any client home.'
  },
  {
    title: 'License & Clinical Verification',
    desc: 'All RNs, LPNs, and CNAs have active state medical licenses verified directly with the State Department of Public Health.'
  },
  {
    title: '$2M Comprehensive Liability Insurance',
    desc: 'Every care session booked through HavenCare is automatically bonded and covered by our comprehensive commercial liability policy.'
  },
  {
    title: 'Real-time GPS Check-In & Check-Out',
    desc: 'Caregivers check in with geofenced GPS verification. You receive live alerts when they arrive and depart.'
  },
  {
    title: '24/7 Dedicated Care Concierge & SOS',
    desc: 'Our clinical triage specialists and safety hotline are on standby 24 hours a day, 7 days a week.'
  }
];

export const FAQ_LIST = [
  {
    category: 'Booking & Schedule',
    q: 'How quickly can I get a caregiver to my home?',
    a: 'Caregivers with the "Available Today" badge can arrive within 90 minutes. For planned visits, you can book up to 30 days in advance.'
  },
  {
    category: 'Booking & Schedule',
    q: 'Can I interview or chat with a caregiver before booking?',
    a: 'Yes! You can message any caregiver directly from their profile to discuss your family’s specific needs before confirming.'
  },
  {
    category: 'Payments & Pricing',
    q: 'Are there any hidden subscription or agency fees?',
    a: 'No hidden fees. You only pay for the exact hours booked, with transparent itemized breakdowns showing the caregiver rate, platform fee, and local taxes.'
  },
  {
    category: 'Payments & Pricing',
    q: 'What is the cancellation and refund policy?',
    a: 'Free cancellation with a 100% instant refund up to 12 hours prior to scheduled start time. Cancellations within 12 hours receive an 80% refund.'
  },
  {
    category: 'Care Quality & Safety',
    q: 'What happens if my assigned caregiver is feeling sick?',
    a: 'Our automatic backup protocol immediately alerts you and pairs you with a verified substitute of equal or higher certification.'
  }
];

export const MOCK_USER_PROFILE = {
  id: 'user-1',
  name: 'Balakrishnan',
  email: 'balakrishnan@example.com',
  phone: '+91 98765 43210',
  photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  walletBalance: 12500.00,
  totalCompletedCareHours: 36
};

export const MOCK_CARE_CATEGORIES = INITIAL_CATEGORIES;
export const MOCK_CARE_SERVICES = INITIAL_SERVICES;
export const MOCK_CAREGIVERS = INITIAL_CAREGIVERS;
export const MOCK_RECIPIENTS = INITIAL_RECIPIENTS;
export const MOCK_ADDRESSES = INITIAL_ADDRESSES;
export const MOCK_PAYMENT_METHODS = INITIAL_PAYMENT_METHODS;
export const MOCK_BOOKINGS = INITIAL_BOOKINGS;
export const MOCK_CONVERSATIONS = INITIAL_CHAT_THREADS;
export const MOCK_NOTIFICATIONS = INITIAL_NOTIFICATIONS;
export const MOCK_INVOICES = INITIAL_INVOICES;
