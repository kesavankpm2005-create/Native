import { useEffect, useRef, useState, type FormEvent } from 'react'
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Filter,
  Leaf,
  MessageCircle,
  Mic,
  RotateCcw,
  Search,
  X,
} from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import type { CartEntry } from '../cart'
import { Pagination, ProductCard, VoiceSearchModal } from '../components'
import {
  categories,
  money,
  productBrand,
  type Product,
  type ProductPage,
} from '../productData'
import { useI18n } from '../i18n'
import { translateCategory } from '../i18nData'
import { getLocalProductPage } from '../catalogData'



const topBrands = [
  'All Brands',
  'Aashirvaad',
  'Tata Sampann',
  'Amul',
  'Aavin',
  'Britannia',
  'Sunfeast',
  'Cadbury',
  'Surf Excel',
  'Vim',
  'Colgate',
  'Parachute',
  'India Gate',
  '24 Mantra',
  'Farm Fresh Produce',
]

export default function ProductsPage({
  items,
  onAdd,
}: {
  items: CartEntry[]
  onAdd: (product: Product, quantity: number) => void
}) {
  const { lang, t } = useI18n()
  const [searchParams, setSearchParams] = useSearchParams()

  const requestedCategory = searchParams.get('category') ?? 'All groceries'
  const category = categories.includes(requestedCategory) ? requestedCategory : 'All groceries'
  const initialSearch = searchParams.get('search') ?? ''

  const [search, setSearch] = useState(initialSearch)
  const [selectedBrand, setSelectedBrand] = useState('All Brands')
  const [sort, setSort] = useState('name-asc')
  const [availability, setAvailability] = useState('all')
  const [page, setPage] = useState(1)
  const [serverData, setServerData] = useState<{ key: string; page: ProductPage } | null>(null)
  const currentKey = `${page}|${search}|${category}|${sort}|${availability}`
  const localData = getLocalProductPage({
    page,
    limit: 12,
    search,
    category,
    sort,
    availability,
  })
  const result = serverData?.key === currentKey ? serverData.page : localData
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [voiceOpen, setVoiceOpen] = useState(false)

  const [selectionNotice, setSelectionNotice] = useState<{
    name: string
    quantity: number
    unit: string
  } | null>(null)

  const categoryListRef = useRef<HTMLDivElement>(null)
  const [categoryScroll, setCategoryScroll] = useState({ left: false, right: false })

  function updateCategoryScroll() {
    const list = categoryListRef.current
    if (!list) return
    setCategoryScroll({
      left: list.scrollLeft > 0,
      right: list.scrollLeft + list.clientWidth < list.scrollWidth - 1,
    })
  }

  // Synchronize when search query parameter changes
  useEffect(() => {
    const urlSearch = searchParams.get('search') ?? ''
    if (urlSearch !== search) {
      window.queueMicrotask(() => setSearch(urlSearch))
    }
  }, [searchParams, search])

  useEffect(() => {
    const controller = new AbortController()

    const params = new URLSearchParams({
      page: String(page),
      limit: '12',
      search: search.trim(),
    })

    if (category !== 'All groceries') {
      params.set('category', category)
    }
    params.set('sort', sort)
    if (availability === 'in-stock') {
      params.set('availability', availability)
    }

    fetch(`/api/products?${params}`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error('We could not load groceries right now.')
        return response.json() as Promise<ProductPage>
      })
      .then((data) => {
        setServerData({ key: currentKey, page: data })
        setError('')
      })
      .catch((requestError: unknown) => {
        if (!controller.signal.aborted) {
          if (localData.items.length === 0) {
            setError(
              requestError instanceof Error
                ? requestError.message
                : 'Unable to load products.'
            )
          }
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [page, search, category, sort, availability, currentKey, localData.items.length])

  useEffect(() => {
    updateCategoryScroll()
    window.addEventListener('resize', updateCategoryScroll)
    return () => window.removeEventListener('resize', updateCategoryScroll)
  }, [])

  useEffect(() => {
    if (!selectionNotice) return
    const timeout = window.setTimeout(() => setSelectionNotice(null), 4000)
    return () => window.clearTimeout(timeout)
  }, [selectionNotice])

  function chooseCategory(nextCategory: string) {
    setPage(1)
    const nextParams = new URLSearchParams(searchParams)
    if (nextCategory === 'All groceries') {
      nextParams.delete('category')
    } else {
      nextParams.set('category', nextCategory)
    }
    setSearchParams(nextParams)
  }

  function scrollCategories(direction: -1 | 1) {
    categoryListRef.current?.scrollBy({ left: direction * 240, behavior: 'smooth' })
  }

  function handleSearchSubmit(e: FormEvent) {
    e.preventDefault()
    setPage(1)
    const nextParams = new URLSearchParams(searchParams)
    if (search.trim()) {
      nextParams.set('search', search.trim())
    } else {
      nextParams.delete('search')
    }
    setSearchParams(nextParams)
  }

  function resetAllFilters() {
    setSearch('')
    setSelectedBrand('All Brands')
    setSort('name-asc')
    setAvailability('all')
    setPage(1)
    setSearchParams({})
  }

  // Filter items in memory by brand if a specific brand pill is clicked
  const displayedItems = result.items.filter((product) => {
    if (selectedBrand === 'All Brands') return true
    if (selectedBrand === 'Farm Fresh Produce') {
      return ['Leafy Greens', 'Vegetables', 'Fruits'].includes(product.category)
    }
    const brand = productBrand(product).toLowerCase()
    return brand.includes(selectedBrand.toLowerCase())
  })

  function handleOrder(product: Product, quantity: number) {
    onAdd(product, quantity)
    setSelectionNotice({
      name: product.name,
      quantity,
      unit: product.unit,
    })
  }

  const itemCount = items.reduce((count, entry) => count + entry.quantity, 0)
  const subtotal = items.reduce(
    (total, entry) => total + entry.product.price * entry.quantity,
    0
  )

  return (
    <div className="inner-page products-page-wrap">
      {/* Intro Header */}
      <section className="products-intro">
        <div className="products-intro-content">
          <span className="section-kicker">
            <Leaf size={14} /> {lang === 'ta' ? 'நம்ம ஊர் மளிகைக் கடை' : 'OUR VILLAGE STORE'}
          </span>
          <h1>
            {lang === 'ta' ? 'அனைத்து மளிகைப் பொருட்கள்' : 'Pure Groceries,'}
            <br />
            <em>{lang === 'ta' ? 'உண்மை பிராண்டுகள் & இயற்கை விளைச்சல்' : 'Honest Packaging.'}</em>
          </h1>
          <p>
            {lang === 'ta'
              ? 'ஆசீர்வாத், டாடா, அமுல், ஆவின் போன்ற முன்னணி பிராண்டுகள் மற்றும் காவிரி டெல்டா முதல் நீலகிரி வரையிலான கிராமத்து காய்கறிகள்.'
              : 'Authentic Indian grocery brands and fresh village harvests delivered straight to your home across Tamil Nadu.'}
          </p>
        </div>

        <div className="products-intro-stamp">
          <span>TAMIL NADU</span>
          <strong>100%</strong>
          <span>GENUINE</span>
        </div>
      </section>

      {/* Main Catalog Section */}
      <section className="catalog-section">
        {/* Category Scroll Filter */}
        <div className="catalog-category-bar">
          <button
            type="button"
            className="category-scroll-btn"
            disabled={!categoryScroll.left}
            onClick={() => scrollCategories(-1)}
            aria-label="Scroll categories left"
          >
            <ChevronLeft size={18} />
          </button>

          <div
            className="category-tabs-scroll"
            ref={categoryListRef}
            onScroll={updateCategoryScroll}
          >
            {categories.map((cat) => {
              const active = cat === category
              const translated = translateCategory(cat, lang)
              return (
                <button
                  key={cat}
                  type="button"
                  className={`category-tab-btn ${active ? 'active' : ''}`}
                  onClick={() => chooseCategory(cat)}
                >
                  {translated}
                </button>
              )
            })}
          </div>

          <button
            type="button"
            className="category-scroll-btn"
            disabled={!categoryScroll.right}
            onClick={() => scrollCategories(1)}
            aria-label="Scroll categories right"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Brand Filter Pills */}
        <div className="brand-filter-strip">
          <span className="filter-label">
            <Filter size={13} /> {lang === 'ta' ? 'பிராண்டு வாரியாக:' : 'Filter by Brand:'}
          </span>
          <div className="brand-pills-scroll">
            {topBrands.map((brandName) => (
              <button
                key={brandName}
                type="button"
                className={`brand-pill-btn ${selectedBrand === brandName ? 'active' : ''}`}
                onClick={() => setSelectedBrand(brandName)}
              >
                {brandName}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Toolbar (Search + Sort + In-Stock) */}
        <div className="catalog-toolbar">
          <form className="catalog-search" onSubmit={handleSearchSubmit}>
            <Search size={16} />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search catalog"
            />
            {search && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => {
                  setSearch('')
                  const nextParams = new URLSearchParams(searchParams)
                  nextParams.delete('search')
                  setSearchParams(nextParams)
                }}
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
            <button
              type="button"
              className="voice-search-btn-toolbar"
              onClick={() => setVoiceOpen(true)}
              aria-label="Voice search"
              title="Voice search"
            >
              <Mic size={16} />
            </button>
          </form>

          <div className="catalog-tools">
            <label className="catalog-select">
              <span>{lang === 'ta' ? 'வரிசைப்படுத்து:' : 'Sort:'}</span>
              <select value={sort} onChange={(e) => { setPage(1); setSort(e.target.value) }}>
                <option value="name-asc">{lang === 'ta' ? 'பெயர் (A to Z)' : 'Name (A to Z)'}</option>
                <option value="name-desc">{lang === 'ta' ? 'பெயர் (Z to A)' : 'Name (Z to A)'}</option>
                <option value="price-asc">{lang === 'ta' ? 'விலை: குறைந்தது முதல்' : 'Price: Low to High'}</option>
                <option value="price-desc">{lang === 'ta' ? 'விலை: அதிகம் முதல்' : 'Price: High to Low'}</option>
              </select>
            </label>

            <label className="catalog-select">
              <span>{lang === 'ta' ? 'இருப்பு:' : 'Stock:'}</span>
              <select
                value={availability}
                onChange={(e) => { setPage(1); setAvailability(e.target.value) }}
              >
                <option value="all">{lang === 'ta' ? 'அனைத்தும்' : 'All Items'}</option>
                <option value="in-stock">{lang === 'ta' ? 'இருப்பில் உள்ளவை' : 'In Stock Only'}</option>
              </select>
            </label>

            {(search || category !== 'All groceries' || selectedBrand !== 'All Brands' || availability !== 'all') && (
              <button
                type="button"
                className="reset-filters-btn"
                onClick={resetAllFilters}
                title="Reset all filters"
              >
                <RotateCcw size={14} />
                <span>{lang === 'ta' ? 'மீட்டமை' : 'Reset'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Results summary line */}
        <div className="catalog-result-line">
          <span>
            {loading ? (
              lang === 'ta' ? 'மளிகைப் பொருட்களை ஏற்றுகிறது...' : 'Loading groceries...'
            ) : (
              lang === 'ta' ? (
                <>காட்டப்படும் பொருட்கள்: <strong>{displayedItems.length}</strong> (பக்கம் {result.page} / {result.totalPages})</>
              ) : (
                <>Found <strong>{displayedItems.length}</strong> products (Page {result.page} of {result.totalPages})</>
              )
            )}
          </span>
          {category !== 'All groceries' && (
            <button type="button" onClick={() => chooseCategory('All groceries')}>
              {translateCategory(category, lang)} <span>×</span>
            </button>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div className="catalog-state error-message" role="alert">
            <p>{error}</p>
            <button className="solid-button" type="button" onClick={() => setPage(1)}>
              {lang === 'ta' ? 'மீண்டும் முயற்சிக்கவும்' : 'Retry'}
            </button>
          </div>
        )}

        {/* Loading skeleton / products grid */}
        {loading ? (
          <div className="catalog-loading-grid">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div key={idx} className="product-skeleton-card" />
            ))}
          </div>
        ) : displayedItems.length === 0 ? (
          <div className="catalog-state empty-state">
            <h3>{lang === 'ta' ? 'பொருட்கள் எதுவும் கிடைக்கவில்லை' : 'No groceries match your search'}</h3>
            <p>
              {lang === 'ta'
                ? 'வேறு சொல்லைத் தேடவும் அல்லது உங்கள் மளிகைப் பட்டியலை வாட்ஸ்அப்பில் அனுப்பவும்.'
                : 'Try adjusting your filters or request the item via our village WhatsApp desk.'}
            </p>
            <button className="solid-button" type="button" onClick={resetAllFilters}>
              {lang === 'ta' ? 'அனைத்து பொருட்களையும் பார்க்க' : 'View All Groceries'}
            </button>
          </div>
        ) : (
          <div className="product-grid catalog-grid">
            {displayedItems.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOrder={handleOrder}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && result.totalPages > 1 && (
          <Pagination
            page={result.page}
            totalPages={result.totalPages}
            total={result.total}
            limit={result.limit}
            onPageChange={(nextPage) => {
              setPage(nextPage)
              window.scrollTo({ top: 320, behavior: 'smooth' })
            }}
          />
        )}

        {/* Live Cart Floating Summary Bar if items are added */}
        {itemCount > 0 && (
          <div className="catalog-order-summary" role="region" aria-label="Cart summary">
            <div>
              <strong>
                {itemCount} {lang === 'ta' ? 'பொருட்கள் கூடையில் உள்ளன' : 'items in your basket'}
              </strong>
              <span>
                {lang === 'ta' ? 'மொத்த தொகை:' : 'Basket total:'}{' '}
                <strong>{money(subtotal)}</strong> ·{' '}
                {subtotal >= 50
                  ? lang === 'ta' ? 'இலவச டெலிவரி!' : 'Free Delivery eligible!'
                  : lang === 'ta' ? `இன்னும் ${money(50 - subtotal)} சேர்த்தால் இலவச டெலிவரி` : `Add ${money(50 - subtotal)} for free delivery`}
              </span>
            </div>
            <Link to="/cart" className="solid-button proceed-cart-btn">
              {lang === 'ta' ? 'கூடைக்கு செல்ல' : 'Proceed to Basket'} ({money(subtotal)}) →
            </Link>
          </div>
        )}

        {/* Special Village Request Card */}
        <div className="custom-product-request">
          <div>
            <strong>
              {lang === 'ta'
                ? 'நீங்கள் தேடும் பொருள் கிடைக்கவில்லையா?'
                : 'Looking for a specific grocery brand or item?'}
            </strong>
            <span>
              {lang === 'ta'
                ? 'எங்கள் உள்ளூர் கிராமக் கடையில் நீங்கள் கேட்கும் எந்த மளிகைப் பொருளையும் கொண்டு வந்து சேர்க்கிறோம்.'
                : 'Send your handwritten grocery list on WhatsApp, and we will source and deliver it directly.'}
            </span>
          </div>
          <a
            href="https://wa.me/919655082236?text=Vanakkam%20Native%20Groceries%2C%20I%20need%20an%20item%20not%20listed%20on%20the%20website"
            target="_blank"
            rel="noreferrer"
            className="custom-request-toggle"
          >
            <MessageCircle size={16} />
            <span>{lang === 'ta' ? 'வாட்ஸ்அப்பில் கேட்க' : 'Request on WhatsApp'}</span>
          </a>
        </div>
      </section>

      {/* Selection Toast */}
      {selectionNotice && (
        <aside
          className="product-selection-toast"
          role="status"
          aria-live="polite"
        >
          <span className="product-selection-check">
            <Check size={18} />
          </span>
          <div>
            <strong>
              {selectionNotice.quantity} × {selectionNotice.name}
            </strong>
            <span>
              {lang === 'ta' ? 'கூடையில் சேர்க்கப்பட்டது' : 'added to your basket.'}
            </span>
          </div>
          <button
            type="button"
            aria-label="Close notification"
            onClick={() => setSelectionNotice(null)}
          >
            <X size={16} />
          </button>
        </aside>
      )}

      {/* Voice Search Modal */}
      {voiceOpen && (
        <VoiceSearchModal
          onClose={() => setVoiceOpen(false)}
          onQuery={(query) => {
            setSearch(query)
            setVoiceOpen(false)
            setPage(1)
            const nextParams = new URLSearchParams(searchParams)
            nextParams.set('search', query)
            setSearchParams(nextParams)
          }}
        />
      )}
    </div>
  )
}
