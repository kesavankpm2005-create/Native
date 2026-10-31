// Hyperlocal Delivery Configuration for Kalasapakkam, Tiruvannamalai District, Tamil Nadu
// Store owners can configure approved delivery villages, timing, fees, and thresholds here.

export type DeliveryVillage = {
  id: string
  nameEn: string
  nameTa: string
  pincode: string
  distanceFromHub: string
  deliverySlotsEn: string
  deliverySlotsTa: string
  isApproved: boolean // Configured by store owner: true = active delivery, false = not yet serviceable
  deliveryFee: number
  freeDeliveryThreshold: number
  popularLandmarksEn: string
  popularLandmarksTa: string
}

export const STORE_LOCATION = {
  storeName: 'Native Groceries',
  localBrandNameEn: 'Native Groceries – Namma Kalasapakkam',
  localBrandNameTa: 'நேட்டிவ் மளிகை – நம்ம கலசப்பாக்கம்',
  hubNameEn: 'Kalasapakkam Main Hub',
  hubNameTa: 'கலசப்பாக்கம் முதன்மை அங்காடி',
  townEn: 'Kalasapakkam',
  townTa: 'கலசப்பாக்கம்',
  talukEn: 'Kalasapakkam Taluk',
  talukTa: 'கலசப்பாக்கம் தாலுகா',
  districtEn: 'Tiruvannamalai',
  districtTa: 'திருவண்ணாமலை மாவட்டம்',
  stateEn: 'Tamil Nadu',
  stateTa: 'தமிழ்நாடு',
  pincode: '606751',
  streetAddressEn: 'Kalasapakkam Main Road, Near Sivan Temple & Bus Stand',
  streetAddressTa: 'கலசப்பாக்கம் மெயின் ரோடு, சிவன் கோவில் & பேருந்து நிலையம் அருகில்',
  phoneDisplay: '96550 82236',
  phoneRaw: '919655082236',
  whatsappUrl: 'https://wa.me/919655082236',
  operatingHoursEn: 'Mon - Sat: 7:00 AM - 9:00 PM | Sun: 7:00 AM - 2:00 PM',
  operatingHoursTa: 'திங்கள் - சனி: காலை 7:00 - இரவு 9:00 | ஞாயிறு: காலை 7:00 - மதியம் 2:00',
  defaultDeliveryFee: 40,
  freeDeliveryThreshold: 50,
}

// Approved nearby villages in Kalasapakkam Taluk & surrounding area
// Store owner can toggle isApproved: true/false at any time
export const CONFIGURED_VILLAGES: DeliveryVillage[] = [
  {
    id: 'kalasapakkam-town',
    nameEn: 'Kalasapakkam (Town & Main Road)',
    nameTa: 'கலசப்பாக்கம் (நகரம் & மெயின் ரோடு)',
    pincode: '606751',
    distanceFromHub: '0 - 2 km',
    deliverySlotsEn: 'Morning 8am - 12pm · Evening 4pm - 8pm',
    deliverySlotsTa: 'காலை 8:00 - 12:00 · மாலை 4:00 - 8:00',
    isApproved: true,
    deliveryFee: 0,
    freeDeliveryThreshold: 50,
    popularLandmarksEn: 'Bus Stand, BDO Office, Sivan Temple, Govt Hospital',
    popularLandmarksTa: 'பேருந்து நிலையம், பிடிஓ அலுவலகம், சிவன் கோவில், அரசு மருத்துவமனை',
  },
  {
    id: 'padavedu',
    nameEn: 'Padavedu (Renugambal Temple Area)',
    nameTa: 'படவேடு (ரேணுகாம்பாள் கோவில் பகுதி)',
    pincode: '606905',
    distanceFromHub: '8 km',
    deliverySlotsEn: 'Afternoon 12pm - 3pm · Evening 5pm - 8pm',
    deliverySlotsTa: 'மதியம் 12:00 - 3:00 · மாலை 5:00 - 8:00',
    isApproved: true,
    deliveryFee: 40,
    freeDeliveryThreshold: 200,
    popularLandmarksEn: 'Sri Renugambal Temple, Kottai Malai Road, Bazaar',
    popularLandmarksTa: 'ஸ்ரீ ரேணுகாம்பாள் கோவில், கோட்டை மலை சாலை, பஜார்',
  },
  {
    id: 'adamangalam',
    nameEn: 'Adamangalam',
    nameTa: 'ஆடமங்கலம்',
    pincode: '606901',
    distanceFromHub: '5 km',
    deliverySlotsEn: 'Morning 9am - 1pm · Evening 4pm - 7pm',
    deliverySlotsTa: 'காலை 9:00 - 1:00 · மாலை 4:00 - 7:00',
    isApproved: true,
    deliveryFee: 30,
    freeDeliveryThreshold: 150,
    popularLandmarksEn: 'Mariamman Kovil, Govt Higher Secondary School',
    popularLandmarksTa: 'மாரியம்மன் கோவில், அரசு மேல்நிலைப் பள்ளி',
  },
  {
    id: 'kadaladi',
    nameEn: 'Kadaladi',
    nameTa: 'கடலாடி',
    pincode: '606908',
    distanceFromHub: '7 km',
    deliverySlotsEn: 'Morning 10am - 1pm · Evening 5pm - 8pm',
    deliverySlotsTa: 'காலை 10:00 - 1:00 · மாலை 5:00 - 8:00',
    isApproved: true,
    deliveryFee: 35,
    freeDeliveryThreshold: 180,
    popularLandmarksEn: 'Market Junction, Panchayat Union Office',
    popularLandmarksTa: 'சந்தை முக்கூடல், ஊராட்சி ஒன்றிய அலுவலகம்',
  },
  {
    id: 'melchozhandipuram',
    nameEn: 'Melchozhandipuram',
    nameTa: 'மேல்சோழந்திபுரம்',
    pincode: '606751',
    distanceFromHub: '3 km',
    deliverySlotsEn: 'Morning 9am - 12pm · Evening 4pm - 7pm',
    deliverySlotsTa: 'காலை 9:00 - 12:00 · மாலை 4:00 - 7:00',
    isApproved: true,
    deliveryFee: 20,
    freeDeliveryThreshold: 100,
    popularLandmarksEn: 'Vinayagar Kovil Street, River Bridge Road',
    popularLandmarksTa: 'விநாயகர் கோவில் தெரு, ஆற்றுப் பாலம் ரோடு',
  },
  {
    id: 'thenpallipattu',
    nameEn: 'Thenpallipattu',
    nameTa: 'தென்பள்ளிப்பட்டு',
    pincode: '606751',
    distanceFromHub: '4 km',
    deliverySlotsEn: 'Morning 9am - 12pm · Evening 4pm - 7pm',
    deliverySlotsTa: 'காலை 9:00 - 12:00 · மாலை 4:00 - 7:00',
    isApproved: true,
    deliveryFee: 25,
    freeDeliveryThreshold: 120,
    popularLandmarksEn: 'Co-op Society, Middle School Lane',
    popularLandmarksTa: 'கூட்டுறவு சங்கம், நடுநிலைப் பள்ளி சந்து',
  },
  {
    id: 'poondi',
    nameEn: 'Poondi',
    nameTa: 'பூண்டி',
    pincode: '606751',
    distanceFromHub: '3.5 km',
    deliverySlotsEn: 'Morning 10am - 1pm · Evening 4pm - 7pm',
    deliverySlotsTa: 'காலை 10:00 - 1:00 · மாலை 4:00 - 7:00',
    isApproved: true,
    deliveryFee: 25,
    freeDeliveryThreshold: 120,
    popularLandmarksEn: 'Lake Bund Road, Pillaiyar Kovil',
    popularLandmarksTa: 'ஏரிக்கரை சாலை, பிள்ளையார் கோவில்',
  },
  {
    id: 'sengaputhoor',
    nameEn: 'Sengaputhoor',
    nameTa: 'செங்கபுத்தூர்',
    pincode: '606751',
    distanceFromHub: '4.5 km',
    deliverySlotsEn: 'Morning 10am - 1pm · Evening 4pm - 7pm',
    deliverySlotsTa: 'காலை 10:00 - 1:00 · மாலை 4:00 - 7:00',
    isApproved: true,
    deliveryFee: 25,
    freeDeliveryThreshold: 120,
    popularLandmarksEn: 'Panchayat Office, Village Arch',
    popularLandmarksTa: 'ஊராட்சி மன்ற அலுவலகம், கிராம வளைவு',
  },
  {
    id: 'mottur',
    nameEn: 'Mottur',
    nameTa: 'மோட்டூர்',
    pincode: '606751',
    distanceFromHub: '3 km',
    deliverySlotsEn: 'Morning 9am - 12pm · Evening 3pm - 6pm',
    deliverySlotsTa: 'காலை 9:00 - 12:00 · மாலை 3:00 - 6:00',
    isApproved: true,
    deliveryFee: 20,
    freeDeliveryThreshold: 100,
    popularLandmarksEn: 'Water Overhead Tank, Mariamman Temple',
    popularLandmarksTa: 'மேல்நிலை நீர்த்தேக்க தொட்டி, மாரியம்மன் கோவில்',
  },
  {
    id: 'polur-road',
    nameEn: 'Polur Road / Bypass Area',
    nameTa: 'போளூர் ரோடு / பைபாஸ் பகுதி',
    pincode: '606751',
    distanceFromHub: '2 km',
    deliverySlotsEn: 'Morning 8am - 11am · Evening 4pm - 8pm',
    deliverySlotsTa: 'காலை 8:00 - 11:00 · மாலை 4:00 - 8:00',
    isApproved: true,
    deliveryFee: 15,
    freeDeliveryThreshold: 80,
    popularLandmarksEn: 'Petrol Bunk, New Bridge Junction, Bypass Circle',
    popularLandmarksTa: 'பெட்ரோல் பங்க், புதிய பாலம் சந்திப்பு, பைபாஸ் வட்டம்',
  },
  {
    id: 'alangaramangalam',
    nameEn: 'Alangaramangalam',
    nameTa: 'அலங்காரமங்கலம்',
    pincode: '606901',
    distanceFromHub: '6 km',
    deliverySlotsEn: 'Afternoon 12pm - 3pm · Evening 5pm - 8pm',
    deliverySlotsTa: 'மதியம் 12:00 - 3:00 · மாலை 5:00 - 8:00',
    isApproved: true,
    deliveryFee: 30,
    freeDeliveryThreshold: 150,
    popularLandmarksEn: 'Village Mandapam, Colony Cross',
    popularLandmarksTa: 'கிராம மண்டபம், காலனி சாலை முக்கூடல்',
  },
  {
    id: 'pattiyandal',
    nameEn: 'Pattiyandal',
    nameTa: 'பட்டியந்தல்',
    pincode: '606751',
    distanceFromHub: '4 km',
    deliverySlotsEn: 'Morning 9am - 12pm · Evening 4pm - 7pm',
    deliverySlotsTa: 'காலை 9:00 - 12:00 · மாலை 4:00 - 7:00',
    isApproved: true,
    deliveryFee: 25,
    freeDeliveryThreshold: 120,
    popularLandmarksEn: 'Bus Shelter, Vinayagar Temple',
    popularLandmarksTa: 'பஸ் நிழற்குடை, விநாயகர் கோவில்',
  },
]

// Helper function to return all approved delivery villages
export function getApprovedVillages(): DeliveryVillage[] {
  return CONFIGURED_VILLAGES.filter((v) => v.isApproved)
}

// Helper to check if a village/location string is in the approved delivery coverage
export type DeliveryCheckResult = {
  isApproved: boolean
  matchedVillage?: DeliveryVillage
  feedbackMessageEn: string
  feedbackMessageTa: string
}

export function validateDeliveryLocation(locationInput: string): DeliveryCheckResult {
  const query = locationInput.trim().toLowerCase()
  if (!query) {
    return {
      isApproved: false,
      feedbackMessageEn: 'Please choose or enter your delivery village in Kalasapakkam zone.',
      feedbackMessageTa: 'கலசப்பாக்கம் பகுதியில் உங்கள் டெலிவரி கிராமத்தை தேர்ந்தெடுக்கவும்.',
    }
  }

  const approved = getApprovedVillages()

  // 1. Direct match by ID
  const byId = approved.find((v) => v.id.toLowerCase() === query)
  if (byId) {
    return {
      isApproved: true,
      matchedVillage: byId,
      feedbackMessageEn: `✓ Doorstep delivery available for ${byId.nameEn} (${byId.distanceFromHub} from Kalasapakkam hub).`,
      feedbackMessageTa: `✓ ${byId.nameTa} பகுதிக்கு கலசப்பாக்கம் அங்காடியிலிருந்து நேரடி வீட்டு டெலிவரி உண்டு (${byId.distanceFromHub}).`,
    }
  }

  // 2. Match by English or Tamil name or Pincode
  const matched = approved.find((v) => {
    const en = v.nameEn.toLowerCase()
    const ta = v.nameTa.toLowerCase()
    const pin = v.pincode
    return en.includes(query) || ta.includes(query) || query.includes(en) || query.includes(ta) || query.includes(pin)
  })

  if (matched) {
    return {
      isApproved: true,
      matchedVillage: matched,
      feedbackMessageEn: `✓ Doorstep delivery approved for ${matched.nameEn}.`,
      feedbackMessageTa: `✓ ${matched.nameTa} பகுதிக்கு நேரடி வீட்டு டெலிவரி உண்டு.`,
    }
  }

  // Check if Kalasapakkam is mentioned at all
  if (query.includes('kalasapakkam') || query.includes('கலசப்பாக்கம்') || query.includes('606751')) {
    const mainHub = approved.find((v) => v.id === 'kalasapakkam-town') || approved[0]
    return {
      isApproved: true,
      matchedVillage: mainHub,
      feedbackMessageEn: '✓ Primary Hub: Doorstep delivery active across Kalasapakkam.',
      feedbackMessageTa: '✓ கலசப்பாக்கம் முழுவதும் நேரடி வீட்டு டெலிவரி வசதி உண்டு.',
    }
  }

  // If outside approved villages
  return {
    isApproved: false,
    feedbackMessageEn:
      'Currently, direct doorstep delivery is restricted to Kalasapakkam and approved surrounding villages. Contact us on WhatsApp (96550 82236) to check special delivery for your hamlet.',
    feedbackMessageTa:
      'தற்போது கலசப்பாக்கம் மற்றும் அனுமதிக்கப்பட்ட சுற்றுவட்டார கிராமங்களுக்கு மட்டுமே நேரடி டெலிவரி உண்டு. உங்கள் பகுதிக்கு டெலிவரி பெற வாட்ஸ்அப்பில் (96550 82236) தொடர்பு கொள்ளவும்.',
  }
}

