import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Award,
  HeartHandshake,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Sprout,
  Star,
  Truck,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProductCard } from '../components'
import { type Product, categoryImages } from '../productData'
import { useI18n } from '../i18n'
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

const villageHighlights = [
  {
    region: 'Cauvery Delta (தஞ்சை)',
    produce: 'Ponni Boiled & Idli Rice',
    desc: 'Pure river-irrigated paddy directly milled and packaged without artificial polish.',
    image: '/images/products/TN-RC-001.jpg',
  },
  {
    region: 'Pollachi (பொள்ளாச்சி)',
    produce: 'Poovan Bananas & Coconuts',
    desc: 'Sweet country bananas and fresh sweet tender coconuts harvested weekly.',
    image: '/images/products/TN-FR-001.jpg',
  },
  {
    region: 'Salem (சேலம்)',
    produce: 'Traditional Millets & Mangoes',
    desc: 'Nutrient-rich Ragi, Little Millet (Samai), and naturally tree-ripened Salem mangoes.',
    image: '/images/products/TN-WF-005.jpg',
  },
  {
    region: 'Ooty & Nilgiris (நீலகிரி)',
    produce: 'Mountain Carrots & Fresh Greens',
    desc: 'Crisp high-altitude valley vegetables harvested at dawn and sent fresh.',
    image: '/images/products/TN-VG-005.jpg',
  },
]

export default function HomePage({ onAdd }: { onAdd: (product: Product) => void }) {
  const { lang, t, location } = useI18n()
  const [featured, setFeatured] = useState<Product[]>([])
  const [freshProduce, setFreshProduce] = useState<Product[]>([])

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/products?page=1&limit=24', { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Unable to load products'))))
      .then((data: { items: Product[] }) => {
        // Separate branded groceries and fresh farm produce
        const produceCategories = ['Leafy Greens', 'Vegetables', 'Fruits']
        const farm = data.items.filter((p) => produceCategories.includes(p.category))
        const branded = data.items.filter((p) => !produceCategories.includes(p.category))
        setFreshProduce(farm)
        setFeatured(branded.slice(0, 12))
      })
      .catch(() => undefined)
    return () => controller.abort()
  }, [])

  return (
    <div className="home-page-wrap">
      {/* Hero Section */}
      <section className="home-hero">
        <img
          className="hero-image"
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=2400&q=90"
          alt="Tamil Nadu village produce and grocery market"
        />
        <div className="hero-shade" />

        <div className="hero-content">
          <span className="hero-eyebrow">
            <span className="eyebrow-line" /> {t.heroEyebrow}
          </span>
          <h1 className="hero-heading">
            {lang === 'ta' ? (
              <>
                <span className="hero-head-lead">நம்ம ஊர் மளிகை,</span>
                <span className="hero-head-accent">இனி உங்கள் வீட்டு வாசலில்!</span>
              </>
            ) : (
              <>
                <span className="hero-head-lead">Native Groceries,</span>
                <span className="hero-head-accent">From Our Village to Your Home!</span>
              </>
            )}
          </h1>
          <p className="hero-subtitle">
            {lang === 'ta' ? (
              <>
                காவிரி டெல்டா பொன்னி அரிசி முதல் ஆசீர்வாத், டாடா, ஆவின் வரை — <br className="hero-sub-break" />
                <strong>100% அசல் பிராண்டுகள்</strong> மற்றும் இயற்கை விளைச்சல் உங்கள் இல்லம் தேடி வரும்.
              </>
            ) : (
              <>
                Fresh groceries, authentic branded packaging, and farm-fresh produce <br className="hero-sub-break" />
                delivered straight to your home across Tamil Nadu with <strong>Cash on Delivery</strong>.
              </>
            )}
          </p>

          <div className="hero-actions">
            <Link className="hero-button primary-hero-btn" to="/products">
              <span>{t.shopNow}</span> <ArrowRight size={17} />
            </Link>
            <a className="hero-button secondary-hero-btn" href="#categories">
              <span>{t.exploreProducts}</span>
            </a>
          </div>

          <div className="hero-trust-tags">
            <span className="hero-trust-item">✓ {lang === 'ta' ? 'அசல் இந்திய பிராண்டுகள்' : '100% Genuine Branded Packs'}</span>
            <span className="hero-trust-item">✓ {lang === 'ta' ? 'பொருளைப் பெற்றவுடன் ரொக்கம்' : 'Cash on Delivery (COD)'}</span>
            <span className="hero-trust-item">✓ {lang === 'ta' ? 'வாட்ஸ்அப் எளிய ஆர்டர்' : 'WhatsApp Easy Ordering'}</span>
          </div>
        </div>

        {/* Hero Pick Card */}
        <aside className="hero-pick-card">
          <img src="/images/products/TN-FR-001.jpg" alt="Pollachi Poovan Bananas" />
          <div>
            <span className="pick-badge">{t.heroPickTitle}</span>
            <strong>{t.heroPickSub}</strong>
            <small>₹65/dozen · Pollachi Harvest</small>
          </div>
          <Link to="/products?category=Fruits" aria-label="Shop fresh fruit">
            <ArrowRight size={17} />
          </Link>
        </aside>
      </section>

      {/* Promise & Value Proposition Strip */}
      <section className="promise-strip" aria-label="Our values">
        <div className="promise-card">
          <Sprout size={22} />
          <div>
            <strong>{t.value1Title}</strong>
            <small>{t.value1Sub}</small>
          </div>
        </div>
        <div className="promise-card">
          <PackageCheck size={22} />
          <div>
            <strong>{t.value2Title}</strong>
            <small>{t.value2Sub}</small>
          </div>
        </div>
        <div className="promise-card">
          <ShieldCheck size={22} />
          <div>
            <strong>{t.value3Title}</strong>
            <small>{t.value3Sub}</small>
          </div>
        </div>
        <div className="promise-card">
          <Truck size={22} />
          <div>
            <strong>{t.value4Title}</strong>
            <small>{lang === 'ta' ? `${location.nameTa} சுற்றுவட்டாரம்` : `Around ${location.nameEn}`}</small>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
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

      {/* Featured Authentic Branded Groceries */}
      <section className="featured-section">
        <div className="content-section">
          <div className="section-heading">
            <div>
              <span className="section-kicker">100% GENUINE PACKAGING</span>
              <h2>{t.featuredTitle}</h2>
              <p className="section-subtext">{t.featuredSubtitle}</p>
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
              {lang === 'ta' ? 'நம்பகமான பிராண்டுகள்:' : 'Trusted Brands in Stock:'}
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

      {/* Village Farm Fresh Section */}
      <section className="content-section village-fresh-section">
        <div className="village-fresh-header">
          <div className="section-heading">
            <div>
              <span className="section-kicker village-kicker">
                <Sprout size={14} /> {t.villageFreshBadge}
              </span>
              <h2>{t.villageFreshTitle}</h2>
              <p className="section-subtext">{t.villageFreshSubtitle}</p>
            </div>
            <Link className="text-link" to="/products?category=Vegetables">
              {lang === 'ta' ? 'காய்கறி, கீரைகள் வாங்க' : 'Shop Farm Produce'} <ArrowRight size={15} />
            </Link>
          </div>

          {/* Farm Regions Grid */}
          <div className="village-origins-grid">
            {villageHighlights.map((vh) => (
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
            <h3>{lang === 'ta' ? 'இன்று காலை அறுவடை செய்தவை' : 'Harvested This Morning'}</h3>
          </div>
          <div className="product-grid">
            {freshProduce.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} onAdd={onAdd} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Native Groceries? (Rural Trust Grid) */}
      <section className="content-section why-choose-section">
        <div className="section-heading centered-heading">
          <span className="section-kicker">WHY CHOOSE US</span>
          <h2>{lang === 'ta' ? 'ஏன் நேட்டிவ் மளிகையை தேர்ந்தெடுக்க வேண்டும்?' : 'Why Choose Native Groceries?'}</h2>
          <p className="section-subtext">
            {lang === 'ta'
              ? 'கிராமத்து வாடிக்கையாளர்களுக்கு எளிய, நேர்மையான மற்றும் விரைவான மளிகை சேவை'
              : 'Honest, convenient, and traditional village grocery shopping you can rely on.'}
          </p>
        </div>

        <div className="why-grid">
          <article className="why-card">
            <span className="why-icon-wrap"><Award size={26} /></span>
            <h3>{lang === 'ta' ? '1. 100% அசல் பிராண்டுகள்' : '1. Genuine Branded Groceries'}</h3>
            <p>{lang === 'ta' ? 'எங்களின் அனைத்து மளிகைப் பொருட்களும் அசல் பேக்கேஜிங் மற்றும் தர உத்தரவாதத்துடன் நேரடியாக பெறப்படுகின்றன.' : 'Authentic packaging from trusted manufacturers like Aashirvaad, Tata, Amul, Aavin, Surf Excel and Vim.'}</p>
          </article>

          <article className="why-card">
            <span className="why-icon-wrap"><Sprout size={26} /></span>
            <h3>{lang === 'ta' ? '2. கிராமத்து நேரடி விளைபொருட்கள்' : '2. Fresh Village Harvests'}</h3>
            <p>{lang === 'ta' ? 'காவிரி பாசன பொன்னி அரிசி, பொள்ளாச்சி நாட்டு வாழைப்பழம், நீலகிரி காய்கறிகள் நேரடியாக விவசாயிகளிடம் இருந்து.' : 'Sourced directly from Cauvery Delta, Pollachi, Salem, and Nilgiri farming communities.'}</p>
          </article>

          <article className="why-card">
            <span className="why-icon-wrap"><ShieldCheck size={26} /></span>
            <h3>{lang === 'ta' ? '3. பொருளைப் பெற்றவுடன் பணம்' : '3. Cash on Delivery (COD)'}</h3>
            <p>{lang === 'ta' ? 'முன்பணம் செலுத்த வேண்டிய அவசியமில்லை. உங்கள் வீட்டு வாசலில் பொருட்களைப் பார்த்து சரிபார்த்து பணம் கொடுங்கள்.' : 'No upfront online payment needed. Inspect your grocery bag at your doorstep and pay with cash.'}</p>
          </article>

          <article className="why-card">
            <span className="why-icon-wrap"><MessageCircle size={26} /></span>
            <h3>{lang === 'ta' ? '4. வாட்ஸ்அப் எளிய ஆர்டர்' : '4. WhatsApp Easy Order'}</h3>
            <p>{lang === 'ta' ? 'ஆர்டர் செய்ய சிரமமாக உள்ளதா? உங்கள் மளிகைப் பட்டியலை போட்டோ எடுத்து வாட்ஸ்அப்பில் அனுப்புங்கள்!' : 'Struggling with typing? Just snap a photo of your handwritten grocery list and send it on WhatsApp!'}</p>
          </article>

          <article className="why-card">
            <span className="why-icon-wrap"><HeartHandshake size={26} /></span>
            <h3>{lang === 'ta' ? '5. உள்ளூர் மக்கள் சேவை' : '5. Dedicated Local Support'}</h3>
            <p>{lang === 'ta' ? 'கலசப்பாக்கம் மற்றும் திருவண்ணாமலை பகுதியில் இயங்கும் சொந்த மனிதர்களின் பாசமான வாடிக்கையாளர் சேவை.' : 'Friendly Tamil-speaking village support staff ready to assist elderly and rural shoppers anytime.'}</p>
          </article>
        </div>
      </section>

      {/* Village Testimonials */}
      <section className="content-section testimonials-section">
        <div className="section-heading centered-heading">
          <span className="section-kicker">CUSTOMER VOICES</span>
          <h2>{lang === 'ta' ? 'நமது ஊர் மக்களின் கருத்துக்கள்' : 'What Our Customers Say'}</h2>
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
            <p>&ldquo;{lang === 'ta' ? 'வயதான எனக்கு போனில் தட்டச்சு செய்ய தெரியாது. வாட்ஸ்அப்பில் லிஸ்ட் அனுப்பினேன், அதே நாளில் வீட்டிற்கே வந்து கொடுத்தார்கள். அருமையான சேவை!' : 'Being elderly, I found it hard to use online apps. Native Groceries took my handwritten list on WhatsApp and delivered to my doorstep on the same day!'}&rdquo;</p>
            <div className="customer-info">
              <strong>சுப்பையா பிள்ளை (Subbaiah Pillai)</strong>
              <span>கலசப்பாக்கம், திருவண்ணாமலை</span>
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
            <p>&ldquo;{lang === 'ta' ? 'டாடா சம்பன் பருப்பு, ஆசீர்வாத் மாவு மற்றும் ஆவின் பால் எல்லாமே அசல் பிராண்ட் பேக்கிங். விலை நியாயமாக உள்ளது.' : 'Aashirvaad atta, Tata dal, and Aavin milk all came in genuine fresh packaging. Pricing is very fair!'}&rdquo;</p>
            <div className="customer-info">
              <strong>கல்பனா செல்வம் (Kalpana Selvam)</strong>
              <span>சேலம்</span>
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
            <p>&ldquo;{lang === 'ta' ? 'மணத்தக்காளி கீரை மற்றும் நாட்டு தக்காளி மிகவும் பிரஷ்ஷாக இருந்தது. கிராமத்து மண் மணம் மாறவில்லை.' : 'The Manathakkali greens and country tomatoes tasted truly fresh from the village farms. Highly recommended!'}&rdquo;</p>
            <div className="customer-info">
              <strong>முத்துக்கிருஷ்ணன் (Muthukrishnan)</strong>
              <span>தஞ்சாவூர்</span>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Quick Order Call-To-Action */}
      <section className="whatsapp-banner-section content-section">
        <div className="wa-banner-card">
          <div className="wa-banner-left">
            <span className="wa-badge">
              <MessageCircle size={18} /> {lang === 'ta' ? 'வாட்ஸ்அப் நேரடி ஆர்டர்' : 'WhatsApp Express Order'}
            </span>
            <h2>{lang === 'ta' ? 'மளிகைப் பட்டியலை வாட்ஸ்அப்பில் அனுப்புங்கள்!' : 'Send Your Grocery List on WhatsApp!'}</h2>
            <p>
              {lang === 'ta'
                ? 'ஒரு தாளில் உங்களுக்கு தேவையான பொருட்களை எழுதி, போட்டோ எடுத்து எங்களின் வாட்ஸ்அப் எண்ணிற்கு (+91 96550 82236) அனுப்புங்கள். நாங்கள் பேக் செய்து உங்கள் வீட்டு வாசலில் தருகிறோம்.'
                : 'Write your grocery list on paper, snap a photo, and send it directly to our WhatsApp (+91 96550 82236). We will pack and deliver to your doorstep!'}
            </p>
          </div>
          <div className="wa-banner-right">
            <a
              href="https://wa.me/919655082236?text=Vanakkam%20Native%20Groceries%2C%20I%20want%20to%20send%20my%20grocery%20list"
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
