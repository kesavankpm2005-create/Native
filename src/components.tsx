import { useState, useEffect, type FormEvent } from 'react'
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Home,
  Leaf,
  MapPin,
  Menu,
  MessageCircle,
  Mic,
  MicOff,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  ShoppingBasket,
  Type,
  User,
  X,
} from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  currentYear,
  money,
  productBrand,
  productDisplayName,
  productImage,
  type Product,
} from './productData'
import { useI18n } from './i18n'
import { tamilNaduLocations, translateCategory, type FontSize } from './i18nData'

export function SiteHeader({ cartCount }: { cartCount: number }) {
  const { lang, setLang, fontSize, setFontSize, location, setLocation, t } = useI18n()
  const [menuOpen, setMenuOpen] = useState(false)
  const [voiceOpen, setVoiceOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [locationOpen, setLocationOpen] = useState(false)
  const navigate = useNavigate()

  function handleSearchSubmit(e: FormEvent) {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setMenuOpen(false)
    }
  }

  function cycleFontSize() {
    const sequence: FontSize[] = ['normal', 'large', 'xlarge']
    const nextIdx = (sequence.indexOf(fontSize) + 1) % sequence.length
    setFontSize(sequence[nextIdx])
  }

  return (
    <>
      <header className="site-header">
        {/* Top utility bar for rural accessibility & localization */}
        <div className="header-top-bar">
          <div className="header-top-inner">
            <div className="header-top-left">
              <span className="village-badge">
                <Leaf size={13} /> {t.tagline}
              </span>

              {/* Location Selector */}
              <div className="location-picker-wrap">
                <button
                  type="button"
                  className="location-pill"
                  onClick={() => setLocationOpen((o) => !o)}
                  aria-label={t.locationLabel}
                  aria-expanded={locationOpen}
                >
                  <MapPin size={13} />
                  <span className="location-name">
                    {lang === 'ta' ? location.nameTa : location.nameEn}
                  </span>
                  <ChevronDown size={12} />
                </button>

                {locationOpen && (
                  <div className="location-dropdown" role="menu">
                    <div className="location-dropdown-header">
                      <strong>{lang === 'ta' ? 'டெலிவரி செய்யும் ஊர்' : 'Choose Delivery Town'}</strong>
                    </div>
                    {tamilNaduLocations.map((loc) => (
                      <button
                        key={loc.id}
                        type="button"
                        className={`location-option ${location.id === loc.id ? 'active' : ''}`}
                        onClick={() => {
                          setLocation(loc)
                          setLocationOpen(false)
                        }}
                      >
                        <span className="loc-name">{lang === 'ta' ? loc.nameTa : loc.nameEn}</span>
                        <span className="loc-pin">PIN: {loc.pincode}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="header-top-right">
              {/* Text Size Scaler */}
              <button
                type="button"
                className="font-size-toggle"
                onClick={cycleFontSize}
                title={t.fontSize}
                aria-label={`Current text size ${fontSize}. Click to enlarge`}
              >
                <Type size={13} />
                <span className="font-size-label">
                  {fontSize === 'normal' ? 'A' : fontSize === 'large' ? 'A+' : 'A++'}
                </span>
              </button>

              {/* Language Switcher */}
              <div className="lang-switcher" role="group" aria-label="Language selection">
                <button
                  type="button"
                  className={`lang-btn ${lang === 'ta' ? 'active' : ''}`}
                  onClick={() => setLang('ta')}
                >
                  தமிழ்
                </button>
                <span className="lang-sep">|</span>
                <button
                  type="button"
                  className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                  onClick={() => setLang('en')}
                >
                  ENG
                </button>
              </div>

              {/* WhatsApp Quick Link */}
              <a
                href="https://wa.me/919655082236?text=Vanakkam%20Native%20Groceries%2C%20I%20would%20like%20to%20order%20groceries"
                target="_blank"
                rel="noreferrer"
                className="header-whatsapp-link"
                title="WhatsApp Order"
              >
                <MessageCircle size={13} />
                <span>96550 82236</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="header-inner">
          <Link
            className="brand"
            to="/"
            aria-label="Native Groceries home"
            onClick={() => setMenuOpen(false)}
          >
            <span className="brand-mark">
              <Leaf size={22} strokeWidth={2.4} />
            </span>
            <div className="brand-titles">
              <span className="brand-name">
                Native Groceries<span>.</span>
              </span>
              <span className="brand-tamil-subtitle">நம்ம ஊர் மளிகை</span>
            </div>
          </Link>

          {/* Quick Search with Voice Search button */}
          <form className="header-search-form" onSubmit={handleSearchSubmit}>
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label={t.searchPlaceholder}
            />
            <button
              type="button"
              className="voice-search-btn"
              onClick={() => setVoiceOpen(true)}
              aria-label={t.voiceSearchTitle}
              title={t.voiceSearchTitle}
            >
              <Mic size={16} />
            </button>
          </form>

          {/* Navigation Links */}
          <nav
            className={`main-nav ${menuOpen ? 'is-open' : ''}`}
            aria-label="Main navigation"
          >
            {/* Mobile Utility Controls inside Drawer */}
            <div className="mobile-nav-utilities">
              <div className="mobile-nav-util-item">
                <span className="mobile-util-label">{t.language}:</span>
                <div className="lang-switcher">
                  <button
                    type="button"
                    className={`lang-btn ${lang === 'ta' ? 'active' : ''}`}
                    onClick={() => setLang('ta')}
                  >
                    தமிழ்
                  </button>
                  <span className="lang-sep">|</span>
                  <button
                    type="button"
                    className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                    onClick={() => setLang('en')}
                  >
                    ENG
                  </button>
                </div>
              </div>

              <div className="mobile-nav-util-item">
                <span className="mobile-util-label">{t.fontSize}:</span>
                <button
                  type="button"
                  className="font-size-toggle"
                  onClick={cycleFontSize}
                  title={t.fontSize}
                  aria-label={`Current text size ${fontSize}. Click to enlarge`}
                >
                  <Type size={13} />
                  <span className="font-size-label">
                    {fontSize === 'normal' ? 'A' : fontSize === 'large' ? 'A+' : 'A++'}
                  </span>
                </button>
              </div>
            </div>

            <NavLink
              to="/"
              end
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {t.home}
            </NavLink>
            <NavLink
              to="/products"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {t.products}
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {t.about}
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {t.contact}
            </NavLink>
            <NavLink
              to="/login"
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => `nav-link nav-account-link ${isActive ? 'active' : ''}`}
            >
              <User size={15} />
              <span>{t.myAccount}</span>
            </NavLink>

            <Link
              className="nav-cta"
              to="/products"
              onClick={() => setMenuOpen(false)}
            >
              <span>{t.shopNow}</span>
              <ArrowRight size={14} />
            </Link>
          </nav>

          {/* Basket Link with Live Count */}
          <Link
            className="bag-link"
            to="/cart"
            aria-label={`Shopping basket, ${cartCount} ${t.items}`}
          >
            <ShoppingBasket size={20} />
            <span className="bag-badge" aria-live="polite">
              {cartCount}
            </span>
          </Link>

          {/* Mobile hamburger menu toggle */}
          <button
            className="mobile-menu-button"
            type="button"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Voice Search Modal */}
      {voiceOpen && (
        <VoiceSearchModal
          onClose={() => setVoiceOpen(false)}
          onQuery={(query) => {
            setSearchQuery(query)
            setVoiceOpen(false)
            navigate(`/products?search=${encodeURIComponent(query)}`)
          }}
        />
      )}
    </>
  )
}

export function VoiceSearchModal({
  onClose,
  onQuery,
}: {
  onClose: () => void
  onQuery: (query: string) => void
}) {
  const { lang, t } = useI18n()
  const [listening, setListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    // Check Web Speech API support
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: any }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: any }).webkitSpeechRecognition

    if (!SpeechRecognition) {
      const timer = window.setTimeout(() => setErrorMsg(t.voiceSearchUnsupported), 0)
      return () => window.clearTimeout(timer)
    }

    try {
      const recognition = new SpeechRecognition()
      recognition.lang = lang === 'ta' ? 'ta-IN' : 'en-IN'
      recognition.continuous = false
      recognition.interimResults = true

      recognition.onstart = () => {
        setListening(true)
        setErrorMsg('')
      }

      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript
        setTranscript(text)
      }

      recognition.onerror = () => {
        setListening(false)
        setErrorMsg(t.voiceSearchError)
      }

      recognition.onend = () => {
        setListening(false)
      }

      recognition.start()

      return () => {
        try {
          recognition.abort()
        } catch {
          // ignore
        }
      }
    } catch {
      const timer = window.setTimeout(() => setErrorMsg(t.voiceSearchUnsupported), 0)
      return () => window.clearTimeout(timer)
    }
  }, [lang, t])

  return (
    <div className="voice-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="voice-modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="voice-modal-close"
          onClick={onClose}
          aria-label="Close voice search"
        >
          <X size={20} />
        </button>

        <div className={`voice-pulse-ring ${listening ? 'is-listening' : ''}`}>
          {listening ? <Mic size={36} /> : <MicOff size={36} />}
        </div>

        <h3>{listening ? t.voiceSearchListening : t.voiceSearchTitle}</h3>
        <p className="voice-prompt-sub">{t.voiceSearchPrompt}</p>

        {transcript && (
          <div className="voice-transcript-box">
            <strong>&ldquo;{transcript}&rdquo;</strong>
          </div>
        )}

        {errorMsg && <p className="voice-error-text">{errorMsg}</p>}

        <div className="voice-modal-actions">
          {transcript ? (
            <button
              type="button"
              className="solid-button"
              onClick={() => onQuery(transcript)}
            >
              {t.searchPlaceholder.slice(0, 15)} &ldquo;{transcript}&rdquo;
            </button>
          ) : (
            <button
              type="button"
              className="outline-button"
              onClick={onClose}
            >
              {lang === 'ta' ? 'தட்டச்சு செய்து தேடவும்' : 'Type Search Instead'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export function SiteFooter() {
  const { lang } = useI18n()

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand-block">
          <Link className="brand footer-brand" to="/">
            <span className="brand-mark">
              <Leaf size={20} />
            </span>
            <div className="brand-titles">
              <span className="brand-name">
                Native Groceries<span>.</span>
              </span>
              <span className="brand-tamil-subtitle">நம்ம ஊர் மளிகை</span>
            </div>
          </Link>
          <p>
            {lang === 'ta'
              ? 'நம்ம ஊர் மளிகை, உங்கள் வீட்டு வாசலில்! தரமான பிராண்டட் பொருட்கள் மற்றும் உள்ளூர் விவசாயிகளின் விளைபொருட்கள்.'
              : 'From our village to your home. Authentic Indian branded groceries & fresh harvests delivered with care.'}
          </p>
          <div className="footer-villages-served">
            <strong>{lang === 'ta' ? 'விநியோக மாவட்டங்கள்:' : 'Delivery Coverage:'}</strong>
            <span>திருவண்ணாமலை · தஞ்சாவூர் · மதுரை · கோவை · சேலம் · திருச்சி · சென்னை · நெல்லை · நீலகிரி</span>
          </div>
        </div>

        <div className="footer-column">
          <h2>{lang === 'ta' ? 'விரைவு இணைப்புகள்' : 'Quick Links'}</h2>
          <Link to="/">{lang === 'ta' ? 'முகப்பு' : 'Home'}</Link>
          <Link to="/products">{lang === 'ta' ? 'அனைத்து மளிகைப் பொருட்கள்' : 'Shop All Groceries'}</Link>
          <Link to="/about">{lang === 'ta' ? 'எங்கள் கதை' : 'Our Story'}</Link>
          <Link to="/contact">{lang === 'ta' ? 'உதவி & தொடர்பு' : 'Contact Us'}</Link>
          <Link to="/login">{lang === 'ta' ? 'எனது கணக்கு' : 'My Account'}</Link>
        </div>

        <div className="footer-column footer-contact">
          <h2>{lang === 'ta' ? 'தொடர்புக்கு' : 'Customer Support'}</h2>
          <a href="tel:+919655082236">📞 +91 96550 82236</a>
          <a
            href="https://wa.me/919655082236?text=Vanakkam%20Native%20Groceries"
            target="_blank"
            rel="noreferrer"
            className="footer-wa"
          >
            💬 WhatsApp: +91 96550 82236
          </a>
          <a href="mailto:hello@nativegroceries.in">✉️ hello@nativegroceries.in</a>
          <p className="footer-cod-badge">
            ✓ {lang === 'ta' ? 'பொருளைப் பெற்றவுடன் பணம் (Cash on Delivery)' : 'Cash on Delivery Available'}
          </p>
        </div>

        <div className="footer-hours">
          <span className="footer-kicker">
            {lang === 'ta' ? 'கடை இயங்கும் நேரம்' : 'STORE HOURS'}
          </span>
          <strong>{lang === 'ta' ? 'திங்கள் - சனி: காலை 7:00 - இரவு 9:00' : 'Mon - Sat: 7:00 AM - 9:00 PM'}</strong>
          <span>{lang === 'ta' ? 'ஞாயிறு: காலை 7:00 - மதியம் 2:00' : 'Sunday: 7:00 AM - 2:00 PM'}</span>
          <span className="footer-village-address">
            📍 கலசப்பாக்கம், திருவண்ணாமலை மாவட்டம், தமிழ்நாடு - 606751
          </span>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {currentYear} Native Groceries. All Rights Reserved.</span>
        <span>
          {lang === 'ta'
            ? 'நம்ம ஊர் மண்மணம் மாறாத நற்பொருட்கள்'
            : 'Locally rooted. Thoughtfully stocked.'}
        </span>
        <Link to="/contact">{lang === 'ta' ? 'உதவி தேவைப்படுகிறதா?' : 'Need Help?'}</Link>
      </div>
    </footer>
  )
}

type ProductCardProps =
  | { product: Product; onAdd: (product: Product) => void; onOrder?: never }
  | { product: Product; onOrder: (product: Product, quantity: number) => void; onAdd?: never }

export function ProductCard(props: ProductCardProps) {
  const { product } = props
  const { lang, t } = useI18n()
  const [quantity, setQuantity] = useState(1)
  const [imgSrc, setImgSrc] = useState(productImage(product))
  const [isAdded, setIsAdded] = useState(false)

  const brand = productBrand(product)
  const displayName = productDisplayName(product, lang)
  const translatedCat = translateCategory(product.category, lang)

  function handleAdd() {
    if (props.onOrder) {
      props.onOrder(product, quantity)
    } else {
      props.onAdd(product)
    }
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 1200)
  }

  return (
    <article className="product-card" id={`product-${product.sku}`}>
      <div className="product-image-wrap">
        {/* Brand Badge */}
        <span className="product-brand-tag" title={brand}>
          {brand}
        </span>

        {/* Product Packaging Image */}
        <img
          src={imgSrc}
          alt={product.name}
          loading="lazy"
          onError={() => {
            // Graceful fallback to category image or default
            setImgSrc('/images/products/TN-RC-001.jpg')
          }}
        />

        {/* Stock tag */}
        {product.stock <= 5 && product.stock > 0 && (
          <span className="product-stock-low">
            {lang === 'ta' ? `கடைசி ${product.stock} மட்டும்` : `Only ${product.stock} left`}
          </span>
        )}
        {product.stock === 0 && (
          <span className="product-stock-out">
            {lang === 'ta' ? 'இருப்பு இல்லை' : 'Out of Stock'}
          </span>
        )}

        {/* Category Pill */}
        <span className="product-category">{translatedCat}</span>
      </div>

      <div className="product-card-info">
        <div className="product-card-heading">
          <h3 title={product.name}>
            <span className="product-name-main">{displayName}</span>
            {lang === 'ta' && <span className="product-sub-english">{product.name}</span>}
          </h3>
        </div>

        <div className="product-price-row">
          <div className="product-price-block">
            <strong className="product-price">{money(product.price)}</strong>
            <span className="product-unit">/{product.unit}</span>
          </div>
          <span className="product-supplier-tag" title={product.supplier}>
            {product.supplier}
          </span>
        </div>

        {props.onOrder ? (
          <div className="product-order-actions">
            <div
              className="product-order-quantity"
              aria-label={`Quantity of ${product.name}`}
            >
              <button
                type="button"
                aria-label={`Remove one ${product.name}`}
                disabled={quantity <= 1 || product.stock < 1}
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
              >
                <Minus size={15} />
              </button>
              <span aria-live="polite">{quantity}</span>
              <button
                type="button"
                aria-label={`Add one ${product.name}`}
                disabled={quantity >= product.stock}
                onClick={() => setQuantity((current) => Math.min(product.stock, current + 1))}
              >
                <Plus size={15} />
              </button>
            </div>
            <button
              className={`add-to-bag ${isAdded ? 'added' : ''}`}
              type="button"
              disabled={product.stock < 1}
              onClick={handleAdd}
            >
              <ShoppingBasket size={16} />
              <span>
                {product.stock < 1
                  ? t.outOfStock
                  : isAdded
                  ? t.addedToCart
                  : t.addToCart}
              </span>
            </button>
          </div>
        ) : (
          <button
            className={`add-to-bag ${isAdded ? 'added' : ''}`}
            type="button"
            disabled={product.stock < 1}
            onClick={handleAdd}
          >
            <ShoppingBasket size={16} />
            <span>
              {product.stock < 1
                ? t.outOfStock
                : isAdded
                ? t.addedToCart
                : t.addToCart}
            </span>
          </button>
        )}
      </div>
    </article>
  )
}

export function Pagination({
  page,
  totalPages,
  total,
  limit,
  onPageChange,
}: {
  page: number
  totalPages: number
  total: number
  limit: number
  onPageChange: (page: number) => void
}) {
  const { lang, t } = useI18n()
  const first = total ? (page - 1) * limit + 1 : 0
  const last = Math.min(page * limit, total)

  return (
    <div className="pagination">
      <span>
        {lang === 'ta' ? (
          <>
            மொத்தம் <strong>{total}</strong> பொருட்களில்{' '}
            <strong>{first}-{last}</strong> காட்டப்படுகிறது
          </>
        ) : (
          <>
            Showing <strong>{first}-{last}</strong> of <strong>{total}</strong> products
          </>
        )}
      </span>
      <div className="page-controls">
        <button
          className="page-arrow"
          type="button"
          aria-label={t.previous}
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft size={18} />
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
          <button
            key={number}
            className={`page-number ${page === number ? 'active' : ''}`}
            type="button"
            aria-current={page === number ? 'page' : undefined}
            onClick={() => onPageChange(number)}
          >
            {number}
          </button>
        ))}
        <button
          className="page-arrow"
          type="button"
          aria-label={t.next}
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}

export function FloatingWhatsAppButton() {
  const { lang } = useI18n()
  return (
    <aside aria-label="Customer WhatsApp assistance">
      <a
        href="https://wa.me/919655082236?text=Vanakkam%20Native%20Groceries%2C%20I%20need%20help%20ordering%20groceries"
        target="_blank"
        rel="noreferrer"
        className="floating-whatsapp-btn"
        aria-label="Order or chat on WhatsApp"
      >
        <span className="wa-icon-wrap">
          <MessageCircle size={24} />
        </span>
        <span className="wa-btn-text">
          <strong>{lang === 'ta' ? 'வாட்ஸ்அப் உதவி' : 'WhatsApp Order'}</strong>
          <small>{lang === 'ta' ? 'நேரடி ஆர்டர்' : 'Click to chat'}</small>
        </span>
      </a>
    </aside>
  )
}

export function MobileBottomNav({ cartCount }: { cartCount: number }) {
  const { lang } = useI18n()

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
      <NavLink
        to="/"
        end
        className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
      >
        <Home size={20} />
        <span>{lang === 'ta' ? 'முகப்பு' : 'Home'}</span>
      </NavLink>

      <NavLink
        to="/products"
        className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
      >
        <ShoppingBag size={20} />
        <span>{lang === 'ta' ? 'மளிகை' : 'Groceries'}</span>
      </NavLink>

      <a
        href="https://wa.me/919655082236?text=Vanakkam%20Native%20Groceries"
        target="_blank"
        rel="noreferrer"
        className="bottom-nav-item wa-item"
      >
        <MessageCircle size={20} />
        <span>{lang === 'ta' ? 'வாட்ஸ்அப்' : 'WhatsApp'}</span>
      </a>

      <NavLink
        to="/login"
        className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
      >
        <User size={20} />
        <span>{lang === 'ta' ? 'கணக்கு' : 'Account'}</span>
      </NavLink>

      <NavLink
        to="/cart"
        className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
      >
        <div className="bottom-cart-icon-wrap">
          <ShoppingBasket size={20} />
          {cartCount > 0 && <span className="bottom-cart-badge">{cartCount}</span>}
        </div>
        <span>{lang === 'ta' ? 'கூடை' : 'Basket'}</span>
      </NavLink>
    </nav>
  )
}
