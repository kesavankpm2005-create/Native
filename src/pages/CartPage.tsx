import { useState, type FormEvent } from 'react'
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  MapPin,
  MessageCircle,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBasket,
  Trash2,
  Truck,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import type { CartEntry } from '../cart'
import {
  money,
  productBrand,
  productDisplayName,
  productImage,
} from '../productData'
import { useI18n } from '../i18n'
import {
  STORE_LOCATION,
  getApprovedVillages,
  validateDeliveryLocation,
  type DeliveryCheckResult,
} from '../deliveryConfig'
import './CartPage.css'

type PlacedOrder = {
  orderNumber: string
  total: number
  customerName: string
  phone: string
  village: string
  address: string
  whatsappUrl: string
}

type CartPageProps = {
  items: CartEntry[]
  onQuantityChange: (productId: string, quantity: number) => void
  onOrderPlaced: () => void
}

export default function CartPage({
  items,
  onQuantityChange,
  onOrderPlaced,
}: CartPageProps) {
  const { lang, location } = useI18n()
  const approvedVillages = getApprovedVillages()

  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null)

  // Hyperlocal Form states for Kalasapakkam checkout
  const [customerName, setCustomerName] = useState('')
  const [phone, setPhone] = useState('')

  const [selectedVillageId, setSelectedVillageId] = useState<string>(() => {
    const matched = approvedVillages.find((v) => v.id === location.id)
    return matched ? matched.id : approvedVillages[0].id
  })
  const [customVillage, setCustomVillage] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [landmark, setLandmark] = useState('')

  const activeVillage = approvedVillages.find((v) => v.id === selectedVillageId)
  const [pincode, setPincode] = useState(activeVillage ? activeVillage.pincode : '606751')

  const [deliveryValidation, setDeliveryValidation] = useState<DeliveryCheckResult>(() => {
    return validateDeliveryLocation(approvedVillages[0].nameEn)
  })

  function handleVillageSelect(villageId: string) {
    setSelectedVillageId(villageId)
    setError('')
    if (villageId === 'other') {
      const check = validateDeliveryLocation(customVillage)
      setDeliveryValidation(check)
    } else {
      const v = approvedVillages.find((item) => item.id === villageId)
      if (v) {
        setPincode(v.pincode)
        setDeliveryValidation(validateDeliveryLocation(v.nameEn))
      }
    }
  }

  function handleCustomVillageChange(val: string) {
    setCustomVillage(val)
    setError('')
    setDeliveryValidation(validateDeliveryLocation(val))
  }

  const subtotal = items.reduce(
    (total, entry) => total + entry.product.price * entry.quantity,
    0
  )
  const deliveryFee = subtotal === 0 || subtotal >= 50 ? 0 : 40
  const total = subtotal + deliveryFee

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSending(true)
    setError('')

    const finalVillageName =
      selectedVillageId === 'other'
        ? customVillage.trim() || 'Nearby Hamlet'
        : (lang === 'ta' ? activeVillage?.nameTa : activeVillage?.nameEn) ?? 'Kalasapakkam'

    const checkResult =
      selectedVillageId === 'other'
        ? validateDeliveryLocation(customVillage)
        : validateDeliveryLocation(activeVillage?.nameEn ?? 'Kalasapakkam')

    // Enforce store owner approved delivery villages policy
    if (!checkResult.isApproved) {
      setError(
        lang === 'ta'
          ? 'மன்னிக்கவும்! தற்போதைக்கு கலசப்பாக்கம் மற்றும் அனுமதிக்கப்பட்ட சுற்றுவட்டார கிராமங்களுக்கு மட்டுமே நேரடி வீட்டு டெலிவரி செய்யப்படுகிறது. உங்கள் பகுதிக்கு சிறப்பு டெலிவரி பெற வாட்ஸ்அப்பில் (96550 82236) தொடர்பு கொள்ளவும்.'
          : 'Direct doorstep delivery is currently restricted to Kalasapakkam and approved surrounding villages. Please WhatsApp our store at 96550 82236 to verify delivery.'
      )
      setSending(false)
      return
    }

    const fullAddress = [
      streetAddress.trim(),
      landmark.trim() ? `(Landmark: ${landmark.trim()})` : '',
      finalVillageName,
      'Kalasapakkam Taluk, Tiruvannamalai Dist',
      `PIN: ${pincode.trim() || '606751'}`,
    ]
      .filter(Boolean)
      .join(', ')

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: customerName.trim(),
          phone: phone.trim(),
          address: fullAddress,
          instructions: landmark.trim(),
          items: items.map(({ product, quantity }) => ({
            productId: product.id,
            quantity,
          })),
        }),
      })

      const result = (await response.json()) as { orderNumber: string; total: number; error?: string }

      if (!response.ok) {
        throw new Error(result.error ?? 'We could not place your order. Please try again.')
      }

      const itemLines = items.map(
        ({ product, quantity }) =>
          `• ${product.name} [${productBrand(product)}] x ${quantity} ${product.unit} = ${money(
            product.price * quantity
          )}`
      )

      const orderMessage = [
        '🙏 வணக்கம் Native Groceries – நம்ம கலசப்பாக்கம்! நான் புதிய மளிகை ஆர்டர் செய்துள்ளேன்.',
        `📦 ஆர்டர் எண் (Order ID): ${result.orderNumber}`,
        '',
        `👤 வாடிக்கையாளர் பெயர்: ${customerName}`,
        `📞 தொலைபேசி எண்: ${phone}`,
        `📍 டெலிவரி ஊர்: ${finalVillageName} (கலசப்பாக்கம் தாலுகா)`,
        `🏠 முழு முகவரி: ${fullAddress}`,
        ...(landmark.trim() ? [`🏷️ அடையாளக் குறிப்பு: ${landmark.trim()}`] : []),
        '',
        '🛒 மளிகைப் பொருட்கள் (Items):',
        ...itemLines,
        '',
        `💵 மளிகைத் தொகை: ${money(subtotal)}`,
        `🚚 டெலிவரி கட்டணம்: ${deliveryFee ? money(deliveryFee) : 'இலவசம் (Free - Above ₹50)'}`,
        `💰 மொத்த தொகை (Pay on Delivery): ${money(result.total)}`,
        '✓ கட்டணம் செலுத்தும் முறை: பொருளைப் பெற்றவுடன் ரொக்கம் (Cash on Delivery / UPI)',
      ].join('\n')

      setPlacedOrder({
        orderNumber: result.orderNumber,
        total: result.total,
        customerName: customerName.trim(),
        phone: phone.trim(),
        village: finalVillageName,
        address: fullAddress,
        whatsappUrl: `https://wa.me/919655082236?text=${encodeURIComponent(orderMessage)}`,
      })

      onOrderPlaced()
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'We could not place your order. Please try again.'
      )
    } finally {
      setSending(false)
    }
  }

  // If order is placed successfully
  if (placedOrder) {
    return (
      <div className="cart-page-wrap">
        <section className="cart-page order-success-page">
          <div className="order-confirmation-card">
            <div className="order-check-ring">
              <CheckCircle2 size={44} />
            </div>

            <span className="order-success-kicker">
              {lang === 'ta' ? 'கலசப்பாக்கம் ஆர்டர் வெற்றிகரமாக பெறப்பட்டது!' : 'KALASAPAKKAM ORDER CONFIRMED'}
            </span>
            <h1 className="order-success-heading">
              {lang === 'ta'
                ? 'நன்றி! உங்கள் ஆர்டர் பதிவு செய்யப்பட்டது.'
                : 'Thank You! Your Grocery Order is Confirmed.'}
            </h1>
            <p className="order-success-sub">
              {lang === 'ta'
                ? 'எங்கள் கலசப்பாக்கம் மெயின் ரோடு அங்காடியிலிருந்து விரைவில் பேக் செய்யப்பட்டு உங்கள் இல்லத்திற்கு கொண்டு வரப்படும்.'
                : 'Your groceries will be packed from our Kalasapakkam hub and delivered to your doorstep shortly.'}
            </p>

            <div className="order-receipt-box">
              <div className="receipt-row">
                <span>{lang === 'ta' ? 'ஆர்டர் எண் (Order ID):' : 'Order Number:'}</span>
                <strong>{placedOrder.orderNumber}</strong>
              </div>
              <div className="receipt-row">
                <span>{lang === 'ta' ? 'மொத்த தொகை (Pay on Delivery):' : 'Total on Delivery:'}</span>
                <strong className="receipt-total">{money(placedOrder.total)}</strong>
              </div>
              <div className="receipt-row">
                <span>{lang === 'ta' ? 'வாடிக்கையாளர் பெயர்:' : 'Customer Name:'}</span>
                <span>{placedOrder.customerName}</span>
              </div>
              <div className="receipt-row">
                <span>{lang === 'ta' ? 'டெலிவரி ஊர்:' : 'Delivery Village:'}</span>
                <span>{placedOrder.village}</span>
              </div>
              <div className="receipt-row">
                <span>{lang === 'ta' ? 'டெலிவரி முகவரி:' : 'Delivery Address:'}</span>
                <span className="receipt-address">{placedOrder.address}</span>
              </div>
            </div>

            <p className="order-cod-notice">
              <ShieldCheck size={18} />
              <span>
                {lang === 'ta'
                  ? 'பொருட்களைப் பெற்றவுடன் ரொக்கமாக அல்லது UPI மூலம் பணம் செலுத்தலாம்.'
                  : 'Pay with Cash on Delivery or UPI after inspecting your items.'}
              </span>
            </p>

            <div className="order-actions">
              <a
                className="solid-button wa-receipt-btn"
                href={placedOrder.whatsappUrl}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={18} />
                <span>{lang === 'ta' ? 'ஆர்டர் ரசீதை வாட்ஸ்அப்பில் அனுப்ப' : 'Share Order to WhatsApp'}</span>
              </a>

              <Link className="outline-button back-shop-btn" to="/products">
                <ArrowLeft size={16} />
                <span>{lang === 'ta' ? 'மீண்டும் பொருட்கள் வாங்க' : 'Continue Shopping'}</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    )
  }

  // If cart is empty
  if (items.length === 0) {
    return (
      <div className="cart-page-wrap">
        <section className="cart-page empty-cart-page">
          <div className="empty-cart-card">
            <span className="empty-cart-icon">
              <ShoppingBasket size={48} />
            </span>
            <h1>{lang === 'ta' ? 'உங்கள் மளிகைக் கூடை காலியாக உள்ளது' : 'Your Basket is Empty'}</h1>
            <p>
              {lang === 'ta'
                ? 'கலசப்பாக்கத்தின் தரமான பிராண்டட் மளிகைப் பொருட்கள் மற்றும் தோட்டத்து காய்கறிகளை கூடையில் சேர்க்கவும்.'
                : 'Explore authentic branded groceries and village farm harvests for your household.'}
            </p>
            <Link className="solid-button empty-shop-btn" to="/products">
              <span>{lang === 'ta' ? 'மளிகைப் பொருட்களைப் பார்க்க' : 'Browse Groceries'}</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </div>
    )
  }

  // Cart with items
  return (
    <div className="cart-page-wrap">
      <section className="cart-page">
        {/* Cart Page Title */}
        <div className="cart-header">
          <div className="cart-header-left">
            <span className="section-kicker">
              <MapPin size={13} /> {STORE_LOCATION.localBrandNameTa}
            </span>
            <h1>{lang === 'ta' ? 'உங்கள் மளிகைக் கூடை' : 'Your Grocery Basket'}</h1>
            <p className="cart-header-sub">
              {lang === 'ta'
                ? 'கலசப்பாக்கம் மற்றும் அனுமதிக்கப்பட்ட கிராமங்களுக்கு நேரடி வீட்டு டெலிவரி'
                : 'Direct doorstep delivery across Kalasapakkam and approved villages'}
            </p>
          </div>

          <div className="cart-header-badge">
            <ShieldCheck size={16} />
            <span>{lang === 'ta' ? 'பொருளைப் பெற்றவுடன் பணம்' : 'Cash on Delivery Available'}</span>
          </div>
        </div>

        <div className="cart-layout">
          {/* Cart Items List */}
          <div className="cart-items-column">
            <div className="cart-table-head">
              <span>{lang === 'ta' ? 'பொருட்கள் (Items)' : 'Items in Basket'}</span>
              <span>{lang === 'ta' ? 'விலை (Price)' : 'Total'}</span>
            </div>

            <div className="cart-items-list">
              {items.map(({ product, quantity }) => (
                <article className="cart-item-row" key={product.id}>
                  <div className="cart-item-img-wrap">
                    <img
                      src={productImage(product)}
                      alt={product.name}
                      onError={(e) => {
                        e.currentTarget.src = '/images/products/TN-RC-001.jpg'
                      }}
                    />
                  </div>

                  <div className="cart-item-info">
                    <div className="cart-item-brand-row">
                      <span className="cart-item-brand">{productBrand(product)}</span>
                      <span className="cart-item-cat">{product.category}</span>
                    </div>

                    <h3 className="cart-item-name">{productDisplayName(product, lang)}</h3>
                    <p className="cart-item-meta">
                      {product.unit} · {product.supplier}
                    </p>

                    {/* Stepper Controls */}
                    <div className="cart-item-stepper">
                      <button
                        type="button"
                        aria-label={`Reduce quantity of ${product.name}`}
                        onClick={() => onQuantityChange(product.id, quantity - 1)}
                      >
                        <Minus size={13} />
                      </button>
                      <span className="stepper-count">{quantity}</span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${product.name}`}
                        disabled={quantity >= product.stock}
                        onClick={() => onQuantityChange(product.id, quantity + 1)}
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </div>

                  <div className="cart-item-end">
                    <strong className="cart-item-total">{money(product.price * quantity)}</strong>
                    <span className="cart-item-each">{money(product.price)} each</span>
                    <button
                      className="cart-remove-btn"
                      type="button"
                      aria-label={`Remove ${product.name} from basket`}
                      onClick={() => onQuantityChange(product.id, 0)}
                    >
                      <Trash2 size={13} /> {lang === 'ta' ? 'நீக்கு' : 'Remove'}
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="cart-table-foot">
              <Link to="/products" className="continue-shopping-link">
                <ArrowLeft size={16} />
                <span>{lang === 'ta' ? 'மேலும் மளிகை சேர்க்க' : 'Add more items'}</span>
              </Link>
            </div>
          </div>

          {/* Hyperlocal Kalasapakkam Checkout Panel */}
          <aside className="checkout-panel">
            <div className="checkout-title">
              <span className="section-kicker">
                <Truck size={14} /> {lang === 'ta' ? 'கலசப்பாக்கம் நேரடி டெலிவரி' : 'KALASAPAKKAM DOORSTEP DELIVERY'}
              </span>
              <h2>{lang === 'ta' ? 'டெலிவரி விபரங்கள்' : 'Delivery & Payment'}</h2>
            </div>

            <form onSubmit={submit} className="village-checkout-form">
              {/* Customer Name */}
              <label className="checkout-field">
                <span className="field-label">
                  {lang === 'ta' ? 'உங்கள் பெயர் (Full Name) *' : 'Full Name *'}
                </span>
                <input
                  name="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  autoComplete="name"
                  placeholder={lang === 'ta' ? 'எ.கா: சுந்தரபாண்டியன்' : 'e.g. Sundarapandian'}
                />
              </label>

              {/* Mobile Number */}
              <label className="checkout-field">
                <span className="field-label">
                  {lang === 'ta' ? 'தொலைபேசி எண் (10-Digit Mobile) *' : '10-Digit Mobile Number *'}
                </span>
                <div className="phone-input-wrap">
                  <span className="country-code">+91</span>
                  <input
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    pattern="[6-9][0-9]{9}"
                    title="Enter a valid 10-digit Indian mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="98765 43210"
                  />
                </div>
              </label>

              {/* Delivery Village / Town (Kalasapakkam & Approved Hamlets) */}
              <div className="checkout-village-group">
                <label className="checkout-field">
                  <span className="field-label">
                    <MapPin size={14} />
                    {lang === 'ta' ? 'டெலிவரி கிராமம் / பகுதி (Delivery Village) *' : 'Delivery Village / Area *'}
                  </span>
                  <select
                    name="villageSelect"
                    value={selectedVillageId}
                    onChange={(e) => handleVillageSelect(e.target.value)}
                    required
                  >
                    <optgroup label={lang === 'ta' ? 'அங்கீகரிக்கப்பட்ட கிராமங்கள் (கலசப்பாக்கம் தாலுகா)' : 'Approved Delivery Villages (Kalasapakkam Taluk)'}>
                      {approvedVillages.map((v) => (
                        <option key={v.id} value={v.id}>
                          {lang === 'ta' ? v.nameTa : v.nameEn} ({v.distanceFromHub})
                        </option>
                      ))}
                    </optgroup>
                    <option value="other">
                      {lang === 'ta' ? 'மற்ற கிராமம் / பகுதி (பிற பகுதி)' : 'Other Village / Hamlet'}
                    </option>
                  </select>
                </label>

                {selectedVillageId === 'other' && (
                  <label className="checkout-field custom-village-field">
                    <span className="field-label">
                      {lang === 'ta' ? 'உங்கள் கிராமத்தின் பெயர் (Village Name) *' : 'Enter Your Village Name *'}
                    </span>
                    <input
                      name="customVillage"
                      value={customVillage}
                      onChange={(e) => handleCustomVillageChange(e.target.value)}
                      required
                      placeholder={lang === 'ta' ? 'எ.கா: படவேடு, ஆடமங்கலம்...' : 'e.g. Padavedu, Adamangalam...'}
                    />
                  </label>
                )}

                {/* Validation Status Badge */}
                {deliveryValidation && (
                  <div
                    className={`delivery-check-pill ${deliveryValidation.isApproved ? 'is-valid' : 'is-unapproved'}`}
                    role="status"
                  >
                    {deliveryValidation.isApproved ? (
                      <CheckCircle2 size={16} />
                    ) : (
                      <AlertCircle size={16} />
                    )}
                    <span>
                      {lang === 'ta' ? deliveryValidation.feedbackMessageTa : deliveryValidation.feedbackMessageEn}
                    </span>
                  </div>
                )}
              </div>

              {/* Street Address */}
              <label className="checkout-field">
                <span className="field-label">
                  {lang === 'ta' ? 'தெரு / கதவு எண் (Street Address) *' : 'Street & Door No. *'}
                </span>
                <textarea
                  name="streetAddress"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  required
                  minLength={8}
                  rows={2}
                  placeholder={lang === 'ta' ? 'வீட்டு எண், தெரு பெயர், பகுதி' : 'House no, Street name, Area'}
                />
              </label>

              {/* Landmark & Pincode */}
              <div className="form-fields-row">
                <label className="checkout-field">
                  <span className="field-label">
                    {lang === 'ta' ? 'அடையாளக் குறிப்பு (Landmark)' : 'Landmark (Optional)'}
                  </span>
                  <input
                    name="landmark"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    placeholder={
                      activeVillage
                        ? lang === 'ta' ? activeVillage.popularLandmarksTa.slice(0, 30) : activeVillage.popularLandmarksEn.slice(0, 30)
                        : lang === 'ta' ? 'கோவில் அருகில், பள்ளி எதிரில்' : 'Near temple / school'
                    }
                  />
                </label>

                <label className="checkout-field">
                  <span className="field-label">
                    {lang === 'ta' ? 'அஞ்சல் குறியீடு (Pincode) *' : 'Pincode *'}
                  </span>
                  <input
                    name="pincode"
                    type="text"
                    inputMode="numeric"
                    pattern="[1-9][0-9]{5}"
                    title="Enter 6-digit Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    required
                    placeholder="606751"
                  />
                </label>
              </div>

              {/* Payment Mode (Cash on Delivery Prominent) */}
              <div className="payment-box">
                <div className="payment-title">
                  <ShieldCheck size={18} className="shield-green" />
                  <strong>
                    {lang === 'ta' ? 'பொருளைப் பெற்றவுடன் ரொக்கம் (COD)' : 'Cash on Delivery (COD)'}
                  </strong>
                  <span className="payment-badge">
                    {lang === 'ta' ? 'பரிந்துரைக்கப்படுகிறது' : 'Recommended'}
                  </span>
                </div>
                <p className="payment-desc">
                  {lang === 'ta'
                    ? 'முன்பணம் செலுத்த வேண்டியதில்லை. கலசப்பாக்கம் அங்காடியிலிருந்து பொருட்கள் உங்கள் வீட்டு வாசலுக்கு வரும் போது சரிபார்த்து ரொக்கமாக அல்லது UPI மூலம் செலுத்தலாம்.'
                    : 'No advance payment needed. Pay in cash or via UPI at your doorstep after inspecting the items.'}
                </p>
              </div>

              {/* Order Totals */}
              <div className="order-totals">
                <div className="total-row">
                  <span>{lang === 'ta' ? 'பொருட்களின் தொகை:' : 'Items Subtotal:'}</span>
                  <strong>{money(subtotal)}</strong>
                </div>

                <div className="total-row">
                  <span>{lang === 'ta' ? 'டெலிவரி கட்டணம்:' : 'Delivery Fee:'}</span>
                  <strong>
                    {deliveryFee === 0 ? (
                      <span className="free-tag">{lang === 'ta' ? 'இலவசம் (₹50+)' : 'Free (₹50+)'}</span>
                    ) : (
                      money(deliveryFee)
                    )}
                  </strong>
                </div>

                <div className="total-row total-highlight">
                  <span>{lang === 'ta' ? 'மொத்த தொகை (COD):' : 'Total on Delivery:'}</span>
                  <strong className="grand-total">{money(total)}</strong>
                </div>
              </div>

              {/* Error Alert */}
              {error && (
                <p className="checkout-error" role="alert">
                  <AlertCircle size={15} />
                  <span>{error}</span>
                </p>
              )}

              {/* Submit Button */}
              <button
                className="solid-button place-order-btn"
                type="submit"
                disabled={sending}
              >
                <span>
                  {sending
                    ? lang === 'ta'
                      ? 'ஆர்டர் பதிவு செய்யப்படுகிறது...'
                      : 'Placing your order...'
                    : lang === 'ta'
                      ? `ஆர்டரை உறுதி செய் · ${money(total)}`
                      : `Place Order · ${money(total)}`}
                </span>
                <ArrowRight size={17} />
              </button>

              <p className="order-guarantee-note">
                ✓ {lang === 'ta' ? 'கலசப்பாக்கம் & சுற்றுவட்டார கிராமங்களுக்கு நேரடி சேவை' : 'Direct delivery to Kalasapakkam & approved hamlets'}
              </p>
            </form>
          </aside>
        </div>
      </section>
    </div>
  )
}
