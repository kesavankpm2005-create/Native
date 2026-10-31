import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  HeartHandshake,
  MapPin,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Sprout,
  Star,
  Truck,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { NativeGroceryIcon, ProductCard } from '../components'
import { type Product, categoryImages } from '../productData'
import { localProductsCatalog } from '../catalogData'
import { useI18n } from '../i18n'
import { getApprovedVillages } from '../deliveryConfig'
import './HomePage.css'

const categoryTiles = [
  { key: 'Rice & Grains', nameTa: 'அரிசி & தானியங்கள்', nameEn: 'Rice & Grains', image: categoryImages['Rice & Grains'], count: '8 items' },
  { key: 'Pulses', nameTa: 'பருப்பு வகைகள்', nameEn: 'Dals & Pulses', image: categoryImages['Pulses'], count: '5 items' },
  { key: 'Wheat & Flours', nameTa: 'கோதுமை & மாவுகள்', nameEn: 'Wheat & Flours', image: categoryImages['Wheat & Flours'], count: '6 items' },
  { key: 'Dairy Products', nameTa: 'பால், தயிர் & நெய்', nameEn: 'Dairy & Ghee', image: categoryImages['Dairy Products'], count: '5 items' },
  { key: 'Beverages', nameTa: 'டீ, காபி & குளிர்பானங்கள்', nameEn: 'Tea, Coffee & Drinks', image: categoryImages['Beverages'], count: '6 items' },
  { key: 'Biscuits', nameTa: 'பிஸ்கட் & ரஸ்க்', nameEn: 'Biscuits & Rusks', image: categoryImages['Biscuits'], count: '3 items' },
  { key: 'Cookies', nameTa: 'குக்கீஸ் & பேக்கரி', nameEn: 'Cookies & Bakery', image: categoryImages['Cookies'], count: '3 items' },
  { key: 'Chocolate', nameTa: 'சாக்லேட்ஸ் & இனிப்புகள்', nameEn: 'Chocolates & Sweets', image: categoryImages['Chocolate'], count: '9 items' },
  { key: 'Home Care', nameTa: 'சோப்புத் தூள் & கிளீனர்கள்', nameEn: 'Home & Laundry Care', image: categoryImages['Home Care'], count: '4 items' },
  { key: 'Toiletries', nameTa: 'குளியல் சோப் & பேஸ்ட்', nameEn: 'Toiletries & Soaps', image: categoryImages['Toiletries'], count: '4 items' },
  { key: 'Beauty Products', nameTa: 'கூந்தல் எண்ணெய் & பராமரிப்பு', nameEn: 'Hair Oil & Care', image: categoryImages['Beauty Products'], count: '4 items' },
  { key: 'Leafy Greens', nameTa: 'கிராமத்துக் கீரைகள்', nameEn: 'Village Fresh Greens', image: categoryImages['Leafy Greens'], count: '5 items' },
  { key: 'Fruits', nameTa: 'நாட்டுப் பழங்கள்', nameEn: 'Fresh Fruits', image: categoryImages['Fruits'], count: '7 items' },
  { key: 'Vegetables', nameTa: 'தோட்டத்துக் காய்கறிகள்', nameEn: 'Farm Fresh Vegetables', image: categoryImages['Vegetables'], count: '8 items' },
]

const regionalProduceOrigins = [
  {
    region: 'Cauvery Delta (தஞ்சை)',
    produce: 'Ponni Boiled & Idli Rice',
    desc: 'Pure river-irrigated paddy directly milled and packaged without artificial polish.',
    image: '/images/products/TN-RC-001.jpg',
  },
  {
    region: 'Pollachi (பொள்ளாச்சி)',
    produce: 'Poovan Bananas & Coconuts',
    desc: 'Sweet country bananas and fresh tender coconuts harvested fresh each week.',
    image: '/images/products/TN-FR-001.jpg',
  },
  {
    region: 'Salem (சேலம்)',
    produce: 'Traditional Millets & Ragi',
    desc: 'Nutrient-dense Ragi and Foxtail Millet (Thinai) sourced from trusted regional growers.',
    image: '/images/products/TN-WF-005.jpg',
  },
  {
    region: 'Ooty & Nilgiris (நீலகிரி)',
    produce: 'Mountain Carrots & Fresh Greens',
    desc: 'Crisp valley vegetables harvested at dawn and sent fresh to our Kalasapakkam hub.',
    image: '/images/products/TN-VG-005.jpg',
  },
]

export default function HomePage({ onAdd }: { onAdd: (product: Product) => void }) {
  const { lang, t } = useI18n()
  const [featured, setFeatured] = useState<Product[]>(() => {
    const produceCategories = ['Leafy Greens', 'Vegetables', 'Fruits']
    return localProductsCatalog.filter((p) => !produceCategories.includes(p.category)).slice(0, 12)
  })
  const [freshProduce, setFreshProduce] = useState<Product[]>(() => {
    const produceCategories = ['Leafy Greens', 'Vegetables', 'Fruits']
    return localProductsCatalog.filter((p) => produceCategories.includes(p.category))
  })
  const [heroImage, setHeroImage] = useState('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=2400&q=90')

  const approvedVillages = getApprovedVillages()

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/products?page=1&limit=24', { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Unable to load products'))))
      .then((data: { items: Product[] }) => {
        const produceCategories = ['Leafy Greens', 'Vegetables', 'Fruits']
        const farm = data.items.filter((p) => produceCategories.includes(p.category))
        const branded = data.items.filter((p) => !produceCategories.includes(p.category))
        setFreshProduce(farm)
        setFeatured(branded.slice(0, 12))
      })
      .catch(() => undefined)

    fetch('/api/settings', { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((settings) => {
        if (settings?.heroImage) setHeroImage(settings.heroImage)
      })
      .catch(() => undefined)
    return () => controller.abort()
  }, [])

  return (
    <div className="home-page-wrap">
      {/* Hyperlocal Welcome Hero Section */}
      <section className="home-hero">
        <img
          className="hero-image"
          src={heroImage}
          alt="Tamil Nadu village produce and grocery market"
        />
        <div className="hero-shade" />

        <div className="hero-content">
          {/* Prominent Hyperlocal Location Badge */}
          <div className="hero-local-badge-wrap">
            <span className="hero-local-badge">
              <NativeGroceryIcon size={18} />
              <strong>{lang === 'ta' ? 'கலசப்பாக்கம் & சுற்றுவட்டார கிராமங்கள்' : 'Proudly Serving Kalasapakkam'}</strong>
            </span>
            <span className="hero-local-tagline">
              {lang === 'ta' ? 'நேட்டிவ் மளிகை – நம்ம கலசப்பாக்கம்' : 'Native Groceries – Namma Kalasapakkam'}
            </span>
          </div>

          <h1 className="hero-heading">
            {lang === 'ta' ? (
              <>
                <span className="hero-head-lead">நம்ம ஊரு மளிகை,</span>
                <span className="hero-head-accent">இனி உங்கள் வீட்டு வாசலில்!</span>
              </>
            ) : (
              <>
                <span className="hero-head-lead">நம்ம ஊரு மளிகை,</span>
                <span className="hero-head-accent">இனி உங்கள் வீட்டு வாசலில்!</span>
              </>
            )}
          </h1>

          <div className="hero-supporting-block">
            <strong className="hero-supporting-lead">
              {lang === 'ta'
                ? 'கலசப்பாக்கம் மக்களுக்கான நம்பிக்கையான மளிகை கடை.'
                : 'கலசப்பாக்கம் மக்களுக்கான நம்பிக்கையான மளிகை கடை.'}
            </strong>
            <p className="hero-subtitle">
              {lang === 'ta' ? (
                <>
                  கலசப்பாக்கம் மெயின் ரோடு அங்காடியிலிருந்து — ஆசீர்வாத், டாடா சம்பன், ஆவின், சர்ஃப் எக்செல், விம் உட்பட <br className="hero-sub-break" />
                  <strong>100% அசல் பிராண்டட் மளிகை</strong> மற்றும் பண்ணை விளைச்சல்கள் உங்கள் இல்லம் தேடி வரும்.
                </>
              ) : (
                <>
                  Trusted grocery store made for the people of Kalasapakkam and approved nearby villages. <br className="hero-sub-break" />
                  Authentic sealed Indian brands, pure cooking staples, and farm harvests delivered to your doorstep with <strong>Cash on Delivery</strong>.
                </>
              )}
            </p>
          </div>

          <div className="hero-actions">
            <Link className="hero-button primary-hero-btn" to="/products">
              <span>{t.shopNow}</span> <ArrowRight size={17} />
            </Link>
            <a className="hero-button secondary-hero-btn" href="#delivery-villages">
              <span>{lang === 'ta' ? 'டெலிவரி கிராமங்களைப் பார்' : 'View Delivery Villages'}</span>
            </a>
          </div>

          <div className="hero-trust-tags">
            <span className="hero-trust-item">
              <CheckCircle2 size={15} /> {lang === 'ta' ? 'கலசப்பாக்கம் நேரடி டெலிவரி' : 'Kalasapakkam Doorstep Delivery'}
            </span>
            <span className="hero-trust-item">
              <CheckCircle2 size={15} /> {lang === 'ta' ? '100% அசல் சீல் செய்யப்பட்ட பிராண்டுகள்' : '100% Genuine Branded Packs'}
            </span>
            <span className="hero-trust-item">
              <CheckCircle2 size={15} /> {lang === 'ta' ? 'பொருளைப் பெற்றவுடன் பணம் (COD)' : 'Cash on Delivery (COD)'}
            </span>
            <span className="hero-trust-item">
              <CheckCircle2 size={15} /> {lang === 'ta' ? 'வாட்ஸ்அப் நேரடி ஆர்டர்: 96550 82236' : 'WhatsApp Order: 96550 82236'}
            </span>
          </div>
        </div>

        {/* Hero Pick Card: Local Harvest */}
        <aside className="hero-pick-card">
          <img src="/images/products/TN-FR-001.jpg" alt="Pollachi Poovan Bananas" />
          <div>
            <span className="pick-badge">
              <Sparkles size={12} /> {lang === 'ta' ? 'இந்த வார சிறப்புத் தேர்வு' : "THIS WEEK'S VILLAGE PICK"}
            </span>
            <strong>{lang === 'ta' ? 'நாட்டு பூவன் வாழைப்பழம்' : 'Country Poovan Bananas'}</strong>
            <small>₹48/bunch · Fresh Village Harvest</small>
          </div>
          <Link to="/products?category=Fruits" aria-label="Shop fresh fruit">
            <ArrowRight size={17} />
          </Link>
        </aside>
      </section>

      {/* Promise & Value Proposition Strip */}
      <section className="promise-strip" aria-label="Our values">
        <div className="promise-card">
          <Sprout size={24} />
          <div>
            <strong>{lang === 'ta' ? 'நம்ம ஊர் விவசாயம்' : 'Good things, grown close'}</strong>
            <small>{lang === 'ta' ? 'விவசாயக் குடும்பங்களின் நேரடி விளைச்சல்' : 'From regional farming families'}</small>
          </div>
        </div>
        <div className="promise-card">
          <PackageCheck size={24} />
          <div>
            <strong>{lang === 'ta' ? 'அசல் இந்திய பிராண்டுகள்' : 'Authentic Indian Brands'}</strong>
            <small>{lang === 'ta' ? 'ஆசீர்வாத், டாடா, ஆவின், அமுல் & பல' : 'Aashirvaad, Tata, Aavin, Amul & more'}</small>
          </div>
        </div>
        <div className="promise-card">
          <ShieldCheck size={24} />
          <div>
            <strong>{lang === 'ta' ? 'பொருளைப் பெற்றவுடன் ரொக்கம்' : 'Cash on Delivery Always'}</strong>
            <small>{lang === 'ta' ? 'பொருளைப் பார்த்து பணத்தைக் கொடுங்கள்' : 'Pay only after inspecting your bag'}</small>
          </div>
        </div>
        <div className="promise-card">
          <Truck size={24} />
          <div>
            <strong>{lang === 'ta' ? 'கலசப்பாக்கம் நேரடி டெலிவரி' : 'Local Kalasapakkam Delivery'}</strong>
            <small>{lang === 'ta' ? 'தினசரி காலை & மாலை நேரங்களில்' : 'Daily morning & evening doorstep runs'}</small>
          </div>
        </div>
      </section>

      {/* SECTION 1: SHOP BY CATEGORY */}
      <section id="categories" className="content-section categories-section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">{t.categoriesTitle}</span>
            <h2>{lang === 'ta' ? 'எங்கள் மளிகைப் பிரிவுகள்' : 'Shop by Category'}</h2>
            <p className="section-subtext">{t.categoriesSubtitle}</p>
          </div>
          <Link className="text-link" to="/products">
            {t.viewAllCategories} <ArrowRight size={15} />
          </Link>
        </div>

        <div className="department-grid">
          {categoryTiles.map((tile, index) => (
            <Link
              className="department-tile"
              to={`/products?category=${encodeURIComponent(tile.key)}`}
              key={tile.key}
            >
              <img src={tile.image} alt={tile.nameEn} loading="lazy" />
              <span className="department-number">0{index + 1}</span>
              <div className="department-name-block">
                <span className="department-name">
                  {lang === 'ta' ? tile.nameTa : tile.nameEn}
                </span>
                <span className="department-count">{tile.count}</span>
              </div>
              <ArrowRight size={16} />
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 2: FEATURED AUTHENTIC BRANDED GROCERIES */}
      <section className="featured-section">
        <div className="content-section">
          <div className="section-heading">
            <div>
              <span className="section-kicker">100% GENUINE PACKAGING</span>
              <h2>{t.featuredTitle}</h2>
              <p className="section-subtext">
                {lang === 'ta'
                  ? 'கலசப்பாக்க இல்லங்கள் அன்றாடம் பயன்படுத்தும் அசல் சீல் செய்யப்பட்ட பிராண்டட் மளிகைப் பொருட்கள்'
                  : 'Trusted sealed branded groceries Kalasapakkam households use every day.'}
              </p>
            </div>
            <Link className="text-link" to="/products">
              {lang === 'ta' ? 'அனைத்து மளிகை' : 'See all groceries'} <ArrowRight size={15} />
            </Link>
          </div>

          <div className="product-grid">
            {featured.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} onAdd={onAdd} />
            ))}
          </div>

          <div className="brand-logos-banner">
            <span className="brand-marquee-title">
              {lang === 'ta' ? 'கலசப்பாக்கம் இருப்பில் உள்ள அசல் பிராண்டுகள்:' : 'Authentic Brands in Kalasapakkam Store:'}
            </span>
            <div className="brand-pills-row">
              <span className="brand-pill">Aashirvaad</span>
              <span className="brand-pill">Tata Sampann</span>
              <span className="brand-pill">Amul</span>
              <span className="brand-pill">Aavin</span>
              <span className="brand-pill">Britannia</span>
              <span className="brand-pill">Sunfeast</span>
              <span className="brand-pill">Cadbury</span>
              <span className="brand-pill">Surf Excel</span>
              <span className="brand-pill">Vim</span>
              <span className="brand-pill">Colgate</span>
              <span className="brand-pill">Parachute</span>
              <span className="brand-pill">India Gate</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: VILLAGE FARM FRESH PRODUCE */}
      <section className="content-section village-fresh-section">
        <div className="village-fresh-header">
          <div className="section-heading">
            <div>
              <span className="section-kicker village-kicker">
                <Sprout size={14} /> {t.villageFreshBadge}
              </span>
              <h2>{t.villageFreshTitle}</h2>
              <p className="section-subtext">
                {lang === 'ta'
                  ? 'காவிரி டெல்டா மற்றும் பிராந்திய தோட்டங்களில் இருந்து கலசப்பாக்கம் அங்காடிக்கு நேரடியாக வரவழைக்கப்படுபவை'
                  : 'Directly sourced from regional farming communities and brought fresh to Kalasapakkam.'}
              </p>
            </div>
            <Link className="text-link" to="/products?category=Vegetables">
              {lang === 'ta' ? 'காய்கறி, கீரைகள் வாங்க' : 'Shop Farm Produce'} <ArrowRight size={15} />
            </Link>
          </div>

          {/* Farm Regions Grid */}
          <div className="village-origins-grid">
            {regionalProduceOrigins.map((vh) => (
              <div className="village-origin-card" key={vh.region}>
                <img src={vh.image} alt={vh.produce} />
                <div className="origin-info">
                  <span className="origin-badge">{vh.region}</span>
                  <strong>{vh.produce}</strong>
                  <p>{vh.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Fresh vegetables & greens cards */}
          <div className="fresh-produce-heading">
            <h3>{lang === 'ta' ? 'இன்று காலை அறுவடை செய்த நாட்டு காய்கறிகள்' : 'Harvested This Morning'}</h3>
          </div>
          <div className="product-grid">
            {freshProduce.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} onAdd={onAdd} />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: LOCAL IDENTITY & COMMUNITY */}
      <section className="content-section local-identity-section">
        <div className="local-identity-banner">
          <div className="local-identity-header">
            <span className="section-kicker">
              <MapPin size={14} /> {lang === 'ta' ? 'நமது கலசப்பாக்கம் அடையாளம்' : 'OUR KALASAPAKKAM IDENTITY'}
            </span>
            <h2>
              {lang === 'ta'
                ? 'கலசப்பாக்கத்தின் சொந்த மளிகை அங்காடி'
                : 'Kalasapakkam’s Very Own Grocery Store'}
            </h2>
            <p className="local-identity-motto">
              &ldquo;{lang === 'ta' ? 'கலசப்பாக்கம் மக்களுக்கான நம்பிக்கையான மளிகை கடை.' : 'Trusted grocery store made for the people of Kalasapakkam.'}&rdquo;
            </p>
          </div>

          <div className="local-identity-grid">
            <article className="local-identity-card">
              <span className="identity-card-num">01</span>
              <h3>{lang === 'ta' ? 'தூரத்து மார்க்கெட் அலைச்சல் வேண்டாம்' : 'No Need To Travel To Crowded Towns'}</h3>
              <p>
                {lang === 'ta'
                  ? 'கலசப்பாக்கம் மற்றும் சுற்றுவட்டார கிராம மக்கள் கனமான மளிகைப் பைகளை தூக்கிக்கொண்டு பஸ்ஸில் அலையத் தேவையில்லை. ஒரு போன் காலில் அல்லது ஆன்லைனில் உங்கள் வீட்டு வாசலுக்கே கொண்டு வருகிறோம்.'
                  : 'Families in Kalasapakkam no longer need to travel to distant towns or carry heavy grocery bags on crowded buses. Everything comes directly to your village doorstep.'}
              </p>
            </article>

            <article className="local-identity-card">
              <span className="identity-card-num">02</span>
              <h3>{lang === 'ta' ? '100% அசல் சீல் செய்யப்பட்ட பேக்கிங்' : 'Sealed Authentic Packaging Only'}</h3>
              <p>
                {lang === 'ta'
                  ? 'ஆசீர்வாத் கோதுமை மாவு, டாடா சம்பன் பருப்பு, ஆவின் தூய நெய், சர்ஃப் எக்செல், விம் போன்ற நம்பிக்கையான நிறுவனங்களின் அசல் பேக்கிங் மட்டுமே நியாயமான விலையில் விற்கப்படுகிறது.'
                  : 'We strictly stock genuine, sealed packaged groceries from India’s leading trusted household brands at transparent and honest village prices.'}
              </p>
            </article>

            <article className="local-identity-card">
              <span className="identity-card-num">03</span>
              <h3>{lang === 'ta' ? 'முதியோர்களுக்கு வாட்ஸ்அப் எளிய ஆர்டர்' : 'Easy WhatsApp Ordering For Elders'}</h3>
              <p>
                {lang === 'ta'
                  ? 'ஆன்லைனில் ஆர்டர் செய்ய தெரியாத பெரியவர்கள், ஒரு தாளில் மளிகைப் பட்டியலை எழுதி வாட்ஸ்அப்பில் (+91 96550 82236) அனுப்பினாலே போதும்; நாங்கள் பேக் செய்து தருகிறோம்.'
                  : 'Elderly village residents can simply write their grocery items on paper and WhatsApp a photo to 96550 82236. Our local Kalasapakkam staff will take care of the rest.'}
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* SECTION 5: OUR DELIVERY AREAS (Kalasapakkam & Approved Nearby Villages) */}
      <section id="delivery-villages" className="content-section delivery-villages-section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">
              <Truck size={14} /> {lang === 'ta' ? 'அங்கீகரிக்கப்பட்ட டெலிவரி எல்லை' : 'VERIFIED DELIVERY COVERAGE'}
            </span>
            <h2>{lang === 'ta' ? 'எங்கள் டெலிவரி பகுதிகள் & கிராமங்கள்' : 'Our Approved Delivery Villages'}</h2>
            <p className="section-subtext">
              {lang === 'ta'
                ? 'கலசப்பாக்கம் முதன்மை அங்காடியிலிருந்து கீழ்கண்ட அனுமதிக்கப்பட்ட கிராமங்களுக்கு தினசரி வீட்டு டெலிவரி செய்யப்படுகிறது.'
                : 'Direct doorstep delivery from our Kalasapakkam Main Road hub to approved surrounding hamlets.'}
            </p>
          </div>
          <a
            href="https://wa.me/919655082236?text=Vanakkam%2C%20is%20delivery%20available%20to%20my%20village%20near%20Kalasapakkam%3F"
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            <MessageCircle size={15} />
            <span>{lang === 'ta' ? 'உங்கள் ஊருக்கு டெலிவரியை உறுதி செய்ய' : 'Confirm Village Delivery on WhatsApp'}</span>
          </a>
        </div>

        <div className="villages-card-grid">
          {approvedVillages.map((village) => (
            <div
              key={village.id}
              className={`village-coverage-card ${village.id === 'kalasapakkam-town' ? 'primary-hub-card' : ''}`}
            >
              <div className="village-card-top">
                <span className="village-status-pill">
                  <CheckCircle2 size={12} /> {lang === 'ta' ? 'நேரடி டெலிவரி உண்டு' : 'Active Delivery'}
                </span>
                <span className="village-distance">{village.distanceFromHub}</span>
              </div>

              <h3 className="village-name">{lang === 'ta' ? village.nameTa : village.nameEn}</h3>
              <span className="village-pincode">PIN: {village.pincode}</span>

              <div className="village-timing-row">
                <Clock size={13} />
                <span>{lang === 'ta' ? village.deliverySlotsTa : village.deliverySlotsEn}</span>
              </div>

              <div className="village-landmarks-info">
                <small className="landmarks-title">{lang === 'ta' ? 'முக்கிய அடையாளங்கள்:' : 'Key Areas / Landmarks:'}</small>
                <p>{lang === 'ta' ? village.popularLandmarksTa : village.popularLandmarksEn}</p>
              </div>

              <div className="village-card-footer">
                <span className="delivery-fee-badge">
                  {village.deliveryFee === 0
                    ? lang === 'ta' ? 'இலவச டெலிவரி (₹50+)' : 'Free Delivery (₹50+)'
                    : lang === 'ta' ? `ரூ.${village.deliveryFee} டெலிவரி கட்டணம்` : `₹${village.deliveryFee} Delivery Fee`}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Clear Policy Notice */}
        <div className="delivery-policy-callout">
          <div className="callout-content">
            <strong>
              {lang === 'ta'
                ? '⚠️ எங்கள் டெலிவரி உறுதிமொழி:'
                : '⚠️ Store Delivery Assurance:'}
            </strong>
            <p>
              {lang === 'ta'
                ? 'கலசப்பாக்கம் அங்காடி உரிமையாளரால் அங்கீகரிக்கப்பட்ட கிராமங்களுக்கு மட்டுமே நாங்கள் டெலிவரி உறுதியளிக்கிறோம். உங்கள் பகுதி அருகில் இருந்து பட்டியலில் இல்லையென்றால், வாட்ஸ்அப்பில் (+91 96550 82236) பேசி சிறப்பு டெலிவரியை உறுதி செய்து கொள்ளலாம்.'
                : 'We only commit to doorstep delivery in villages approved by our store owner to ensure on-time service. If your hamlet is located nearby, please contact our Kalasapakkam hub on WhatsApp to arrange special delivery.'}
            </p>
          </div>
          <a
            href="https://wa.me/919655082236?text=Vanakkam%20Native%20Groceries%2C%20I%20want%20to%20check%20delivery%20for%20my%20village"
            target="_blank"
            rel="noreferrer"
            className="callout-wa-btn"
          >
            <MessageCircle size={16} />
            <span>{lang === 'ta' ? 'வாட்ஸ்அப்பில் விசாரிக்க' : 'Enquire on WhatsApp'}</span>
          </a>
        </div>
      </section>

      {/* SECTION 6: LOCAL TRUST (Why Kalasapakkam Families Trust Us) */}
      <section className="content-section why-choose-section">
        <div className="section-heading centered-heading">
          <span className="section-kicker">LOCAL TRUST</span>
          <h2>{lang === 'ta' ? 'ஏன் கலசப்பாக்கம் மக்கள் நம்மை நம்புகிறார்கள்?' : 'Why Kalasapakkam Families Trust Us'}</h2>
          <p className="section-subtext">
            {lang === 'ta'
              ? 'கலசப்பாக்கம் மக்களுக்கு எளிய, நேர்மையான மற்றும் பாசமான மளிகை சேவை.'
              : 'Honest, convenient, and traditional village grocery shopping you can rely on.'}
          </p>
        </div>

        <div className="why-grid">
          <article className="why-card">
            <span className="why-icon-wrap"><Award size={26} /></span>
            <h3>{lang === 'ta' ? '1. 100% அசல் பிராண்டுகள்' : '1. Genuine Branded Groceries'}</h3>
            <p>
              {lang === 'ta'
                ? 'எங்களின் அனைத்து மளிகைப் பொருட்களும் அசல் பேக்கேஜிங் மற்றும் தர உத்தரவாதத்துடன் நேரடியாக பெறப்படுகின்றன.'
                : 'Authentic packaging from trusted manufacturers like Aashirvaad, Tata, Amul, Aavin, Surf Excel and Vim.'}
            </p>
          </article>

          <article className="why-card">
            <span className="why-icon-wrap"><Truck size={26} /></span>
            <h3>{lang === 'ta' ? '2. உங்கள் கிராமத் தெருவுக்கே டெலிவரி' : '2. Direct To Village Street'}</h3>
            <p>
              {lang === 'ta'
                ? 'கலசப்பாக்கம், படவேடு, ஆடமங்கலம், கடலாடி உட்பட அனுமதிக்கப்பட்ட கிராமங்களின் தெரு முகவரிக்கே நேரடியாக டெலிவரி.'
                : 'Direct delivery right to doorsteps and temple lanes in Kalasapakkam, Padavedu, Adamangalam, Kadaladi, and nearby villages.'}
            </p>
          </article>

          <article className="why-card">
            <span className="why-icon-wrap"><ShieldCheck size={26} /></span>
            <h3>{lang === 'ta' ? '3. பொருளைப் பெற்றவுடன் பணம் (COD)' : '3. Cash on Delivery (COD)'}</h3>
            <p>
              {lang === 'ta'
                ? 'முன்பணம் செலுத்த வேண்டிய அவசியமில்லை. உங்கள் வீட்டு வாசலில் பொருட்களைப் பார்த்து சரிபார்த்து பணம் கொடுங்கள்.'
                : 'No upfront online payment needed. Inspect your grocery bag at your doorstep and pay with cash or UPI.'}
            </p>
          </article>

          <article className="why-card">
            <span className="why-icon-wrap"><MessageCircle size={26} /></span>
            <h3>{lang === 'ta' ? '4. வாட்ஸ்அப்பில் லிஸ்ட் அனுப்பலாம்' : '4. WhatsApp List Ordering'}</h3>
            <p>
              {lang === 'ta'
                ? 'ஆர்டர் செய்ய சிரமமாக உள்ளதா? உங்கள் மளிகைப் பட்டியலை பேப்பரில் எழுதி போட்டோ எடுத்து வாட்ஸ்அப்பில் அனுப்புங்கள்!'
                : 'Struggling with typing? Just snap a photo of your handwritten grocery list and send it to our WhatsApp (+91 96550 82236)!'}
            </p>
          </article>

          <article className="why-card">
            <span className="why-icon-wrap"><HeartHandshake size={26} /></span>
            <h3>{lang === 'ta' ? '5. கலசப்பாக்கம் சொந்தக் குழு' : '5. Local Kalasapakkam Staff'}</h3>
            <p>
              {lang === 'ta'
                ? 'கலசப்பாக்கம் மெயின் ரோடு பகுதியில் இயங்கும் நமது ஊர் இளைஞர்களின் பாசமான மற்றும் நம்பகமான சேவை.'
                : 'Friendly local staff who know every street, school, and temple in Kalasapakkam Taluk.'}
            </p>
          </article>
        </div>
      </section>

      {/* SECTION 7: REAL VILLAGE TESTIMONIALS */}
      <section className="content-section testimonials-section">
        <div className="section-heading centered-heading">
          <span className="section-kicker">LOCAL TESTIMONIALS</span>
          <h2>{lang === 'ta' ? 'கலசப்பாக்கம் மக்களின் அனுபவங்கள்' : 'Voices From Our Local Customers'}</h2>
        </div>

        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="stars">
              <Star size={16} fill="#E8B84A" stroke="#E8B84A" />
              <Star size={16} fill="#E8B84A" stroke="#E8B84A" />
              <Star size={16} fill="#E8B84A" stroke="#E8B84A" />
              <Star size={16} fill="#E8B84A" stroke="#E8B84A" />
              <Star size={16} fill="#E8B84A" stroke="#E8B84A" />
            </div>
            <p>
              &ldquo;
              {lang === 'ta'
                ? 'வயதான எனக்கு டவுனுக்கு பஸ் ஏறி போய் மளிகை வாங்க சிரமமாக இருந்தது. வாட்ஸ்அப்பில் லிஸ்ட் அனுப்பினேன், கலசப்பாக்கத்திலிருந்து உடனே வீட்டிற்கே கொண்டு வந்து கொடுத்தார்கள். அருமையான சேவை!'
                : 'Being elderly, I found it hard to take the bus to town for groceries. Native Groceries took my handwritten list on WhatsApp and delivered to my doorstep in Kalasapakkam on the same day!'}
              &rdquo;
            </p>
            <div className="customer-info">
              <strong>சுப்பையா பிள்ளை (Subbaiah Pillai)</strong>
              <span>சிவன் கோவில் தெரு, கலசப்பாக்கம்</span>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="stars">
              <Star size={16} fill="#E8B84A" stroke="#E8B84A" />
              <Star size={16} fill="#E8B84A" stroke="#E8B84A" />
              <Star size={16} fill="#E8B84A" stroke="#E8B84A" />
              <Star size={16} fill="#E8B84A" stroke="#E8B84A" />
              <Star size={16} fill="#E8B84A" stroke="#E8B84A" />
            </div>
            <p>
              &ldquo;
              {lang === 'ta'
                ? 'படவேடு ரேணுகாம்பாள் கோவில் பகுதியில் இருக்கிறோம். டாட்டா சம்பன் பருப்பு, ஆசீர்வாத் மாவு மற்றும் ஆவின் பால் எல்லாமே அசல் சீல் பேக்கிங். சரியான நேரத்தில் டெலிவரி வந்தது.'
                : 'We live near Padavedu Renugambal temple. Tata Sampann dal, Aashirvaad atta, and Aavin milk all came in fresh original packaging on time.'}
              &rdquo;
            </p>
            <div className="customer-info">
              <strong>ரேவதி அண்ணாமலை (Revathi Annamalai)</strong>
              <span>படவேடு (ரேணுகாம்பாள் கோவில் பகுதி)</span>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="stars">
              <Star size={16} fill="#E8B84A" stroke="#E8B84A" />
              <Star size={16} fill="#E8B84A" stroke="#E8B84A" />
              <Star size={16} fill="#E8B84A" stroke="#E8B84A" />
              <Star size={16} fill="#E8B84A" stroke="#E8B84A" />
              <Star size={16} fill="#E8B84A" stroke="#E8B84A" />
            </div>
            <p>
              &ldquo;
              {lang === 'ta'
                ? 'பொருளைப் பெற்றவுடன் பணம் கொடுக்க முடிவது ரொம்ப வசதியாக இருக்கிறது. ஆடமங்கலம் பகுதிக்கு இலவசமாகவே டெலிவரி செய்து கொடுத்தார்கள். கலசப்பாக்கத்திற்கு ஒரு நல்ல மளிகை கடை!'
                : 'Cash on delivery is very convenient. Delivered directly to our house in Adamangalam. Very proud to have this store in Kalasapakkam!'}
              &rdquo;
            </p>
            <div className="customer-info">
              <strong>முருகன் பெரியசாமி (Murugan Periyasamy)</strong>
              <span>ஆடமங்கலம், கலசப்பாக்கம் தாலுகா</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: WHATSAPP QUICK ORDER BANNER */}
      <section className="whatsapp-banner-section content-section">
        <div className="wa-banner-card">
          <div className="wa-banner-left">
            <span className="wa-badge">
              <MessageCircle size={18} /> {lang === 'ta' ? 'வாட்ஸ்அப் நேரடி ஆர்டர்' : 'WhatsApp Express Order'}
            </span>
            <h2>{lang === 'ta' ? 'மளிகைப் பட்டியலை வாட்ஸ்அப்பில் அனுப்புங்கள்!' : 'Send Your Grocery List on WhatsApp!'}</h2>
            <p>
              {lang === 'ta'
                ? 'ஒரு தாளில் உங்களுக்கு தேவையான பொருட்களை எழுதி, போட்டோ எடுத்து எங்களின் கலசப்பாக்கம் வாட்ஸ்அப் எண்ணிற்கு (+91 96550 82236) அனுப்புங்கள். நாங்கள் பேக் செய்து உங்கள் வீட்டு வாசலில் தருகிறோம்.'
                : 'Write your grocery list on paper, snap a photo, and send it directly to our Kalasapakkam WhatsApp (+91 96550 82236). We will pack and deliver to your doorstep!'}
            </p>
          </div>
          <div className="wa-banner-right">
            <a
              href="https://wa.me/919655082236?text=Vanakkam%20Native%20Groceries%2C%20Kalasapakkam%2C%20I%20want%20to%20send%20my%20grocery%20list"
              target="_blank"
              rel="noreferrer"
              className="wa-large-btn"
            >
              <MessageCircle size={22} />
              <span>{lang === 'ta' ? 'வாட்ஸ்அப்பில் ஆர்டர் செய்ய' : 'Order on WhatsApp Now'}</span>
            </a>
            <small>{lang === 'ta' ? 'பொருளைப் பெற்றவுடன் ரொக்கப் பணம் (COD)' : 'Cash on Delivery Available'}</small>
          </div>
        </div>
      </section>
    </div>
  )
}
