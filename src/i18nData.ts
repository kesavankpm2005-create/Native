export type Language = 'ta' | 'en'
export type FontSize = 'normal' | 'large' | 'xlarge'

export type LocationInfo = {
  id: string
  nameTa: string
  nameEn: string
  pincode: string
}

// Hyperlocal Service Villages in Kalasapakkam Taluk, Tiruvannamalai District
export const tamilNaduLocations: LocationInfo[] = [
  { id: 'kalasapakkam-town', nameTa: 'கலசப்பாக்கம் (முதன்மை அங்காடி)', nameEn: 'Kalasapakkam (Main Town Hub)', pincode: '606751' },
  { id: 'padavedu', nameTa: 'படவேடு (ரேணுகாம்பாள் கோவில்)', nameEn: 'Padavedu (Renugambal Area)', pincode: '606905' },
  { id: 'adamangalam', nameTa: 'ஆடமங்கலம்', nameEn: 'Adamangalam', pincode: '606901' },
  { id: 'kadaladi', nameTa: 'கடலாடி', nameEn: 'Kadaladi', pincode: '606908' },
  { id: 'melchozhandipuram', nameTa: 'மேல்சோழந்திபுரம்', nameEn: 'Melchozhandipuram', pincode: '606751' },
  { id: 'thenpallipattu', nameTa: 'தென்பள்ளிப்பட்டு', nameEn: 'Thenpallipattu', pincode: '606751' },
  { id: 'poondi', nameTa: 'பூண்டி', nameEn: 'Poondi', pincode: '606751' },
  { id: 'sengaputhoor', nameTa: 'செங்கபுத்தூர்', nameEn: 'Sengaputhoor', pincode: '606751' },
  { id: 'mottur', nameTa: 'மோட்டூர்', nameEn: 'Mottur', pincode: '606751' },
  { id: 'polur-road', nameTa: 'போளூர் ரோடு / பைபாஸ் பகுதி', nameEn: 'Polur Road / Bypass Area', pincode: '606751' },
  { id: 'alangaramangalam', nameTa: 'அலங்காரமங்கலம்', nameEn: 'Alangaramangalam', pincode: '606901' },
  { id: 'pattiyandal', nameTa: 'பட்டியந்தல்', nameEn: 'Pattiyandal', pincode: '606751' },
  { id: 'tvm-other', nameTa: 'திருவண்ணாமலை மாவட்டம் (இதர பகுதி)', nameEn: 'Tiruvannamalai District (Other)', pincode: '606601' },
]

export const translations = {
  en: {
    // Top banner & Header
    localBrandName: 'Native Groceries – Namma Kalasapakkam',
    locationBadge: 'Proudly Serving Kalasapakkam',
    tagline: 'Native Groceries – Namma Kalasapakkam',
    searchPlaceholder: 'Search rice, dal, oil, vegetables, brands...',
    voiceSearchTitle: 'Voice Search',
    voiceSearchListening: 'Listening... Please speak now',
    voiceSearchPrompt: 'Say product name like "Ponni rice", "Toor dal", "Milk"...',
    voiceSearchError: 'Could not catch that. Please try typing.',
    voiceSearchUnsupported: 'Voice search not supported on this browser. Please type to search.',
    locationLabel: 'Delivery Village:',
    myAccount: 'My Account',
    cart: 'Basket',
    items: 'items',
    shopNow: 'Shop Now',
    exploreProducts: 'Explore Groceries',
    language: 'Language',
    fontSize: 'Text Size',
    home: 'Home',
    about: 'Our Village Story',
    products: 'All Groceries',
    contact: 'Help & Contact',
    login: 'Login / Sign Up',
    logout: 'Log Out',
    whatsappHelp: 'WhatsApp Help',

    // Hero
    heroEyebrow: "KALASAPAKKAM'S OWN GROCERY STORE",
    heroHeadline: 'நம்ம ஊரு மளிகை, இனி உங்கள் வீட்டு வாசலில்!',
    heroSubtitle: 'கலசப்பாக்கம் மக்களுக்கான நம்பிக்கையான மளிகை கடை.',
    heroSubDesc: 'Fresh groceries, authentic branded packaging, and regional farm produce delivered straight to your doorstep across Kalasapakkam and approved nearby villages.',
    heroDeliveryNote: 'Same-day doorstep delivery to Kalasapakkam & approved villages · Cash on Delivery available',
    heroPickTitle: "THIS WEEK'S VILLAGE PICK",
    heroPickSub: 'Pollachi Poovan Bananas',
    previous: 'Previous',
    next: 'Next',

    // Values strip
    value1Title: 'Good things, grown close',
    value1Sub: 'Direct from regional farming families',
    value2Title: 'Authentic Indian Brands',
    value2Sub: 'Aashirvaad, Tata, Amul, Aavin & more',
    value3Title: 'Cash on Delivery',
    value3Sub: 'Pay only after receiving your bag',
    value4Title: 'Local Kalasapakkam Delivery',
    value4Sub: 'Directly to your doorstep and village street',

    // Local Identity Section
    localIdentityKicker: 'OUR KALASAPAKKAM IDENTITY',
    localIdentityTitle: 'A Grocery Store Built For Kalasapakkam',
    localIdentityDesc: 'We created Native Groceries so the families of Kalasapakkam and nearby villages never have to travel far to crowded town markets or carry heavy bags in local buses. We bring sealed, authentic branded packaging, fresh cooking staples, and farm-fresh greens directly to your home.',
    localServingTag: 'Serving Kalasapakkam Town & Approved Surrounding Villages',

    // Delivery Areas Section
    deliveryAreasTitle: 'Our Approved Delivery Areas',
    deliveryAreasSubtitle: 'Doorstep grocery delivery directly to Kalasapakkam and store-owner approved surrounding villages',
    deliveryAreasBadge: 'VERIFIED VILLAGE COVERAGE',
    deliveryAreasNote: 'Only villages approved by our store owner receive active daily delivery. If your hamlet is nearby, message our Kalasapakkam team on WhatsApp to confirm delivery.',
    viewDeliveryAreas: 'Explore Delivery Villages',

    // Categories
    categoriesTitle: 'Shop by Category',
    categoriesSubtitle: 'Pure, fresh, and everyday essentials for Kalasapakkam households',
    viewAllCategories: 'View all categories',

    // Category names
    catAll: 'All Groceries',
    catRice: 'Rice & Grains',
    catPulses: 'Dals & Pulses',
    catFlour: 'Wheat & Flours',
    catChocolate: 'Chocolates & Sweets',
    catBiscuits: 'Biscuits & Rusks',
    catCookies: 'Cookies & Bakery',
    catBeverages: 'Coffee, Tea & Drinks',
    catDairy: 'Dairy, Curd & Ghee',
    catHomeCare: 'Home Care & Detergents',
    catToiletries: 'Soaps & Toothpaste',
    catBeauty: 'Hair Oil & Personal Care',
    catLeafyGreens: 'Village Fresh Greens',
    catFruits: 'Fresh Seasonal Fruits',
    catVegetables: 'Farm Fresh Vegetables',

    // Village Fresh Section
    villageFreshTitle: 'Village Farm Fresh',
    villageFreshSubtitle: 'Naturally harvested vegetables, greens and fruits from Cauvery Delta & regional farms',
    villageFreshBadge: '100% FARM FRESH',
    farmerStory: 'Directly sourced from farming families in Thanjavur, Pollachi, Ooty and Madurai. No cold-storage chemicals, no artificial ripening.',

    // Featured section
    featuredTitle: 'Authentic Branded Groceries',
    featuredSubtitle: 'Trusted household brands Kalasapakkam families know and love',
    addToCart: 'Add to Cart',
    addedToCart: 'Added to Bag',
    outOfStock: 'Out of Stock',
    inStock: 'In Stock',
    onlyLeft: 'only left',
    from: 'from',

    // Why Choose Us
    whyTitle: 'Why Kalasapakkam Families Trust Us',
    whySubtitle: 'The warmth, quality, and honesty of our local village store',
    why1Title: '100% Genuine & Trusted Products',
    why1Desc: 'We stock only authentic, sealed branded packages from Aashirvaad, Tata Sampann, Aavin, Surf Excel, and Vim.',
    why2Title: 'Extremely Simple for Everyone',
    why2Desc: 'Large buttons, clear pictures, and full Tamil interface designed for rural and elderly shoppers in our village.',
    why3Title: 'Cash on Delivery Always',
    why3Desc: 'No complicated online payments required. Inspect your groceries and pay with cash at your door.',
    why4Title: 'Friendly WhatsApp Support',
    why4Desc: 'Need help placing an order? Message us on WhatsApp (+91 96550 82236) and our local team will take your order directly.',
    why5Title: 'Local Kalasapakkam Delivery Team',
    why5Desc: 'Delivered by our own village staff who know every street, school, and temple landmark.',

    // Catalog page
    catalogHeading: 'Kalasapakkam Grocery Market',
    catalogSubheading: 'Search and filter authentic groceries, farm harvest, and staple foods',
    filterCategory: 'Category',
    filterBrand: 'Brand',
    allBrands: 'All Brands',
    sortBy: 'Sort by',
    sortNameAsc: 'Name (A to Z)',
    sortNameDesc: 'Name (Z to A)',
    sortPriceLow: 'Price: Low to High',
    sortPriceHigh: 'Price: High to Low',
    inStockOnly: 'In-stock only',
    allProducts: 'All items',
    showing: 'Showing',
    of: 'of',
    noProductsFound: 'No products matched your search. Try another word or clear filters.',
    clearFilters: 'Clear Filters',
    customRequestHeading: 'Looking for a specific grocery item or brand?',
    customRequestDesc: 'Let our Kalasapakkam sourcing team know what you need and we will arrange it for you.',
    requestItemBtn: 'Request Special Item',

    // Cart page
    cartHeading: 'Your Grocery Basket',
    emptyCartHeading: 'Your basket is taking a breather.',
    emptyCartSubtitle: 'Fresh harvests and trusted staples are waiting for you.',
    exploreCatalog: 'Explore Groceries',
    orderSummary: 'Order Summary',
    subtotal: 'Subtotal',
    deliveryFee: 'Delivery Fee',
    freeDelivery: 'Free Delivery (Above ₹50)',
    totalToPay: 'Total to Pay on Delivery',
    placeOrder: 'Place Order',
    placingOrder: 'Placing order...',
    fullName: 'Your Full Name',
    phoneNumber: 'Mobile Phone Number',
    address: 'Detailed Address',
    deliveryInstructions: 'Special delivery note or nearby landmark',
    codNotice: 'Pay with cash upon delivery. Inspect your package first.',
    orderConfirmed: 'Thank you! Your Kalasapakkam grocery order is placed.',
    orderNumberLabel: 'Order Number',
    sendWhatsAppReceipt: 'Send Order Summary on WhatsApp',

    // Footer & info
    footerAbout: 'Native Groceries – Namma Kalasapakkam. Dedicated grocery platform for Kalasapakkam and approved nearby villages in Tiruvannamalai District.',
    deliveryAreas: 'Approved Delivery Villages: Kalasapakkam Town, Padavedu, Adamangalam, Kadaladi, Melchozhandipuram, Thenpallipattu, Poondi, Sengaputhoor, Mottur, Polur Road.',
    storeHours: 'Monday - Saturday: 7:00 AM - 9:00 PM | Sunday: 7:00 AM - 2:00 PM',
    copyright: 'Native Groceries – Namma Kalasapakkam. Pure. Local. Honest.',
  },
  ta: {
    // Top banner & Header
    localBrandName: 'நேட்டிவ் மளிகை – நம்ம கலசப்பாக்கம்',
    locationBadge: 'கலசப்பாக்கம் & சுற்றுவட்டார கிராமங்கள்',
    tagline: 'நம்ம ஊரு மளிகை, இனி உங்கள் வீட்டு வாசலில்!',
    searchPlaceholder: 'அரிசி, பருப்பு, எண்ணெய், காய்கறி, பிராண்டுகள் தேட...',
    voiceSearchTitle: 'குரல் தேடல் (Voice Search)',
    voiceSearchListening: 'கேட்கிறது... இப்போது பேசவும்',
    voiceSearchPrompt: '"பொன்னி அரிசி", "துவரம் பருப்பு", "பால்" என்று கூறவும்...',
    voiceSearchError: 'குரல் புரியவில்லை. தட்டச்சு செய்து தேடவும்.',
    voiceSearchUnsupported: 'இந்த உலாவியில் குரல் தேடல் வசதி இல்லை. தட்டச்சு செய்யவும்.',
    locationLabel: 'டெலிவரி ஊர்:',
    myAccount: 'எனது கணக்கு',
    cart: 'கூடை',
    items: 'பொருட்கள்',
    shopNow: 'இப்போதே வாங்க',
    exploreProducts: 'மளிகைப் பொருட்கள்',
    language: 'மொழி',
    fontSize: 'எழுத்து அளவு',
    home: 'முகப்பு',
    about: 'எங்கள் கதை',
    products: 'மளிகைப் பொருட்கள்',
    contact: 'உதவி & தொடர்பு',
    login: 'உள்நுழை / பதிவு',
    logout: 'வெளியேறு',
    whatsappHelp: 'வாட்ஸ்அப் உதவி',

    // Hero
    heroEyebrow: 'கலசப்பாக்கத்தின் சொந்த மளிகை அங்காடி',
    heroHeadline: 'நம்ம ஊரு மளிகை, இனி உங்கள் வீட்டு வாசலில்!',
    heroSubtitle: 'கலசப்பாக்கம் மக்களுக்கான நம்பிக்கையான மளிகை கடை.',
    heroSubDesc: 'கலசப்பாக்கம் மற்றும் சுற்றுவட்டார கிராம மக்களுக்கு தினசரி தேவையான அசல் பிராண்டட் மளிகைப் பொருட்கள் மற்றும் தூய பண்ணை விளைச்சல்கள் உங்கள் இல்லம் தேடி வரும்.',
    heroDeliveryNote: 'கலசப்பாக்கம் & அனுமதிக்கப்பட்ட கிராமங்களுக்கு நேரடி வீட்டு டெலிவரி · பொருளைப் பெற்று பணம் செலுத்தலாம் (COD)',
    heroPickTitle: 'இந்த வார கிராமத்து சிறப்பு தேர்வு',
    heroPickSub: 'பொள்ளாச்சி பூவன் பழம்',
    previous: 'முந்தையது',
    next: 'அடுத்தது',

    // Values strip
    value1Title: 'நம்ம ஊர் விவசாயம்',
    value1Sub: 'நேரடியாக தமிழக விவசாயிகளிடமிருந்து',
    value2Title: 'நம்பகமான பிராண்டுகள்',
    value2Sub: 'ஆசீர்வாத், டாட்டா, அமுல், ஆவின் மற்றும் பல',
    value3Title: 'பொருளைப் பெற்று பணம்',
    value3Sub: 'பொருளைப் பார்த்து பணத்தைக் கொடுங்கள்',
    value4Title: 'கலசப்பாக்கம் நேரடி டெலிவரி',
    value4Sub: 'உங்கள் தெரு மற்றும் வீட்டு வாசலுக்கே வரும்',

    // Local Identity Section
    localIdentityKicker: 'நமது கலசப்பாக்கம் அடையாளம்',
    localIdentityTitle: 'கலசப்பாக்கம் மக்களுக்காகவே உருவாக்கப்பட்ட மளிகை கடை',
    localIdentityDesc: 'கலசப்பாக்கம் மற்றும் சுற்றுவட்டார கிராம மக்கள் தூரத்து டவுன் மார்க்கெட்டுகளுக்கு சென்று அவதிப்பட வேண்டியதில்லை. ஆசீர்வாத், டாடா சம்பன், ஆவின், சர்ஃப் எக்செல், விம் போன்ற அசல் பிராண்டுகளும், தூய விளைபொருட்களும் நியாயமான விலையில் உங்கள் வீட்டு வாசலிலேயே கிடைக்கும்.',
    localServingTag: 'கலசப்பாக்கம் நகரம் & அனுமதிக்கப்பட்ட சுற்றுவட்டார கிராமங்கள்',

    // Delivery Areas Section
    deliveryAreasTitle: 'எங்கள் டெலிவரி கிராமங்கள்',
    deliveryAreasSubtitle: 'கலசப்பாக்கம் முதன்மை அங்காடியிலிருந்து தினசரி உங்கள் வீட்டு வாசலுக்கே நேரடி டெலிவரி',
    deliveryAreasBadge: 'அங்கீகரிக்கப்பட்ட கிராமங்கள்',
    deliveryAreasNote: 'எங்கள் அங்காடியால் அங்கீகரிக்கப்பட்ட கிராமங்களுக்கு மட்டுமே தினசரி நேரடி டெலிவரி உண்டு. உங்கள் கிராமத்திற்கு டெலிவரி பெற வாட்ஸ்அப்பில் தொடர்பு கொள்ளவும்.',
    viewDeliveryAreas: 'டெலிவரி கிராமங்களைப் பார்',

    // Categories
    categoriesTitle: 'பிரிவுகள் வாரியாக மளிகை',
    categoriesSubtitle: 'கலசப்பாக்க இல்லங்களுக்கு தேவையான தினசரி சமையல் மளிகைப் பொருட்கள்',
    viewAllCategories: 'அனைத்துப் பிரிவுகளையும் பார்',

    // Category names
    catAll: 'அனைத்து மளிகை',
    catRice: 'அரிசி & தானியங்கள்',
    catPulses: 'பருப்பு வகைகள்',
    catFlour: 'கோதுமை & மாவு வகைகள்',
    catChocolate: 'சாக்லேட் & மிட்டாய்',
    catBiscuits: 'பிஸ்கட் & ரஸ்க்',
    catCookies: 'குக்கீஸ் & பேக்கரி',
    catBeverages: 'காபி, டீ & பானங்கள்',
    catDairy: 'பால், தயிர் & தூய நெய்',
    catHomeCare: 'வீட்டு பராமரிப்பு சோப்புகள்',
    catToiletries: 'குளியல் சோப்பு & பற்பசை',
    catBeauty: 'தேங்காய் எண்ணெய் & பராமரிப்பு',
    catLeafyGreens: 'கிராமத்து பசுமை கீரைகள்',
    catFruits: 'இயற்கை நற்பழங்கள்',
    catVegetables: 'தோட்டத்துக் காய்கறிகள்',

    // Village Fresh Section
    villageFreshTitle: 'கிராமத்து பண்ணை பசுமை',
    villageFreshSubtitle: 'காவிரி டெல்டா மற்றும் பிராந்திய தோட்டங்களில் இயற்கை முறையில் விளைந்தவை',
    villageFreshBadge: '100% பண்ணை பசுமை',
    farmerStory: 'தஞ்சாவூர், பொள்ளாச்சி, நீலகிரி மற்றும் மதுரை விவசாய குடும்பங்களிடம் இருந்து நேரடியாக கொள்முதல். ரசாயன பழுக்க வைப்பு இல்லை.',

    // Featured section
    featuredTitle: 'அசல் பிராண்டட் மளிகைப் பொருட்கள்',
    featuredSubtitle: 'நமது குடும்பங்கள் பல வருடங்களாக நம்பும் தரமான நிறுவனங்களின் பேக்கிங்',
    addToCart: 'கூடையில் சேர்க்க',
    addedToCart: 'சேர்க்கப்பட்டது!',
    outOfStock: 'இருப்பு இல்லை',
    inStock: 'இருப்பில் உள்ளது',
    onlyLeft: 'மட்டுமே உள்ளது',
    from: 'இருந்து',

    // Why Choose Us
    whyTitle: 'ஏன் கலசப்பாக்கம் மக்கள் நம்மை நம்புகிறார்கள்?',
    whySubtitle: 'நம் ஊர் கடையின் அன்பும், நேர்மையும், தரமான பொருட்களும்',
    why1Title: '100% அசல் மற்றும் தூய பொருட்கள்',
    why1Desc: 'உத்தரவாதமான அசல் பிராண்டட் பேக்கிங் மற்றும் விவசாயிகளின் நேரடி விளைபொருட்கள் மட்டுமே.',
    why2Title: 'அனைவருக்கும் எளிய பயன்பாடு',
    why2Desc: 'பெரிய எழுத்துக்கள், தெளிவான படங்கள் மற்றும் முழுமையான தமிழ் வழி கொண்டு உருவாக்கப்பட்டுள்ளது.',
    why3Title: 'பொருளைப் பெற்றவுடன் பணம் (COD)',
    why3Desc: 'முன்பணம் தேவையில்லை. உங்கள் வீட்டு வாசலில் பொருட்களை சரிபார்த்து ரொக்கமாக பணம் தரலாம்.',
    why4Title: 'வாட்ஸ்அப் நேரடி உதவி',
    why4Desc: 'ஆர்டர் செய்ய சிரமமா? வாட்ஸ்அப்பில் (+91 96550 82236) மெசேஜ் செய்தால் எங்கள் கலசப்பாக்கம் குழுவே உதவி செய்யும்.',
    why5Title: 'நம்ம ஊர் டெலிவரி குழு',
    why5Desc: 'கலசப்பாக்கத்தின் அனைத்து தெருக்கள், பள்ளிகள் மற்றும் கோவில் வழிகளை நன்கு அறிந்த சொந்த மனிதர்கள்.',

    // Catalog page
    catalogHeading: 'கலசப்பாக்கம் மளிகை சந்தை',
    catalogSubheading: 'அசல் பிராண்டுகள் மற்றும் விவசாய விளைபொருட்களை தேடி வாங்கவும்',
    filterCategory: 'பிரிவு',
    filterBrand: 'பிராண்ட்',
    allBrands: 'அனைத்து பிராண்டுகள்',
    sortBy: 'வரிசைப்படுத்து',
    sortNameAsc: 'பெயர் (அ முதல் ஔ)',
    sortNameDesc: 'பெயர் (ஔ முதல் அ)',
    sortPriceLow: 'விலை: குறைந்தது முதல்',
    sortPriceHigh: 'விலை: அதிகம் முதல்',
    inStockOnly: 'இருப்பில் உள்ளவை மட்டும்',
    allProducts: 'அனைத்துப் பொருட்கள்',
    showing: 'காட்டப்படுவது',
    of: 'மொத்தம்',
    noProductsFound: 'பொருட்கள் எதுவும் கிடைக்கவில்லை. வேறு சொல்லைப் பயன்படுத்தி தேடவும்.',
    clearFilters: 'வடிகட்டிகளை நீக்கு',
    customRequestHeading: 'குறிப்பிட்ட கிராமத்து மளிகைப் பொருள் வேண்டுமா?',
    customRequestDesc: 'உங்களுக்கு என்ன பொருள் தேவையோ சொல்லுங்கள், எங்கள் கலசப்பாக்கம் குழு வாங்கி தருகிறது.',
    requestItemBtn: 'பொருள் கேட்க',

    // Cart page
    cartHeading: 'உங்கள் மளிகைக் கூடை',
    emptyCartHeading: 'உங்கள் கூடை காலியாக உள்ளது.',
    emptyCartSubtitle: 'நமது ஊரின் தூய விளைபொருட்களை கூடையில் சேர்க்கவும்.',
    exploreCatalog: 'மளிகைப் பொருட்களைப் பார்',
    orderSummary: 'ஆர்டர் விவரம்',
    subtotal: 'பொருட்களின் விலை',
    deliveryFee: 'டெலிவரி கட்டணம்',
    freeDelivery: 'இலவச டெலிவரி (₹50க்கு மேல்)',
    totalToPay: 'மொத்த தொகை (பொருளைப் பெற்றதும் செலுத்தவும்)',
    placeOrder: 'ஆர்டரை உறுதி செய்',
    placingOrder: 'ஆர்டர் செய்யப்படுகிறது...',
    fullName: 'உங்கள் முழு பெயர்',
    phoneNumber: 'தொலைபேசி எண் (10 இலக்கம்)',
    address: 'முழு முகவரி (வீட்டு எண், தெரு, ஊர்)',
    deliveryInstructions: 'அடையாளக் குறிப்பு அல்லது சிறப்பு வழிகாட்டல்',
    codNotice: 'பொருட்களைப் பெற்றுக்கொண்டு ரொக்கமாக பணம் செலுத்தவும்.',
    orderConfirmed: 'மிக்க நன்றி! உங்கள் கலசப்பாக்கம் மளிகை ஆர்டர் பதிவு செய்யப்பட்டது.',
    orderNumberLabel: 'ஆர்டர் எண்',
    sendWhatsAppReceipt: 'ஆர்டர் ரசீதை வாட்ஸ்அப்பில் அனுப்ப',

    // Footer & info
    footerAbout: 'நேட்டிவ் மளிகை – நம்ம கலசப்பாக்கம். கலசப்பாக்கம் மற்றும் சுற்றுவட்டார கிராம மக்களுக்கான பிரத்யேக மளிகை சேவை. திருவண்ணாமலை மாவட்டம்.',
    deliveryAreas: 'அங்கீகரிக்கப்பட்ட டெலிவரி கிராமங்கள்: கலசப்பாக்கம் நகரம், படவேடு, ஆடமங்கலம், கடலாடி, மேல்சோழந்திபுரம், தென்பள்ளிப்பட்டு, பூண்டி, செங்கபுத்தூர், மோட்டூர், போளூர் ரோடு.',
    storeHours: 'திங்கள் - சனி: காலை 7:00 - இரவு 9:00 | ஞாயிறு: காலை 7:00 - மதியம் 2:00',
    copyright: 'நேட்டிவ் மளிகை – நம்ம கலசப்பாக்கம். தூய்மை. அன்பு. நேர்மை.',
  },
} as const

export function translateCategory(cat: string, lang: Language): string {
  const t = translations[lang]
  switch (cat) {
    case 'Rice & Grains':
      return t.catRice
    case 'Pulses':
      return t.catPulses
    case 'Wheat & Flours':
      return t.catFlour
    case 'Chocolate':
      return t.catChocolate
    case 'Biscuits':
      return t.catBiscuits
    case 'Cookies':
      return t.catCookies
    case 'Beverages':
      return t.catBeverages
    case 'Dairy Products':
      return t.catDairy
    case 'Home Care':
      return t.catHomeCare
    case 'Toiletries':
      return t.catToiletries
    case 'Beauty Products':
      return t.catBeauty
    case 'Leafy Greens':
      return t.catLeafyGreens
    case 'Fruits':
      return t.catFruits
    case 'Vegetables':
      return t.catVegetables
    default:
      return cat
  }
}
