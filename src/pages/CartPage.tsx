import { useState, type FormEvent } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
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
import { tamilNaduLocations } from '../i18nData'
import './CartPage.css'

type PlacedOrder = {
  orderNumber: string
  total: number
  customerName: string
  phone: string
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
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null)

  // Form states for village checkout
  const [customerName, setCustomerName] = useState('')
  const [phone, setPhone] = useState('')
  const [villageTown, setVillageTown] = useState('')
  const [district, setDistrict] = useState(location.nameTa)
  const [streetAddress, setStreetAddress] = useState('')
  const [landmark, setLandmark] = useState('')
  const [pincode, setPincode] = useState(location.pincode)

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

    const fullAddress = [
      streetAddress.trim(),
      landmark.trim() ? `(Landmark: ${landmark.trim()})` : '',
      villageTown.trim(),
      district.trim(),
      `PIN: ${pincode.trim()}`,
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
        '🙏 வணக்கம் Native Groceries! நான் புதிய மளிகை ஆர்டர் செய்துள்ளேன்.',
        `📦 ஆர்டர் எண் (Order ID): ${result.orderNumber}`,
        '',
        `👤 வாடிக்கையாளர் பெயர்: ${customerName}`,
        `📞 தொலைபேசி எண்: ${phone}`,
        `📍 டெலிவரி முகவரி: ${fullAddress}`,
        ...(landmark.trim() ? [`🏷️ அடையாளக் குறிப்பு: ${landmark.trim()}`] : []),
        '',
        '🛒 மளிகைப் பொருட்கள் (Items):',
        ...itemLines,
        '',
        `💵 மளிகைத் தொகை: ${money(subtotal)}`,
        `🚚 டெலிவரி கட்டணம்: ${deliveryFee ? money(deliveryFee) : 'இலவசம் (Free)'}`,
        `💰 மொத்த தொகை (Pay on Delivery): ${money(result.total)}`,
        '✓ கட்டணம் செலுத்தும் முறை: பொருளைப் பெற்றவுடன் ரொக்கம் (Cash on Delivery / UPI)',
      ].join('\n')

      setPlacedOrder({
        orderNumber: result.orderNumber,
        total: result.total,
        customerName: customerName.trim(),
        phone: phone.trim(),
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
      <section className="cart-page order-success-page">
        <div className="order-confirmation-card">
          <div className="order-check-ring">
            <CheckCircle2 size={56} className="success-icon" />
          </div>

          <span className="order-success-kicker">
            {lang === 'ta' ? 'ஆர்டர் வெற்றிகரமாக பெறப்பட்டது!' : 'ORDER CONFIRMED'}
          </span>

          <h1>
            {lang === 'ta' ? 'மிக்க நன்றி!' : 'Thank You!'}
            <br />
            <em>{lang === 'ta' ? 'உங்கள் மளிகைப் பொருட்கள் தயாராகின்றன.' : 'Your village groceries are on the way.'}</em>
          </h1>

          <div className="order-receipt-box">
            <div className="receipt-row">
              <span>{lang === 'ta' ? 'ஆர்டர் எண்:' : 'Order Number:'}</span>
              <strong>{placedOrder.orderNumber}</strong>
            </div>
            <div className="receipt-row">
              <span>{lang === 'ta' ? 'செலுத்த வேண்டிய தொகை:' : 'Amount to Pay:'}</span>
              <strong className="receipt-total">{money(placedOrder.total)}</strong>
            </div>
            <div className="receipt-row">
              <span>{lang === 'ta' ? 'பணம் செலுத்தும் முறை:' : 'Payment Mode:'}</span>
              <span className="receipt-cod-tag">
                ✓ {lang === 'ta' ? 'பொருளைப் பெற்றவுடன் ரொக்கம் (COD)' : 'Cash on Delivery'}
              </span>
            </div>
            <div className="receipt-row">
              <span>{lang === 'ta' ? 'டெலிவரி முகவரி:' : 'Delivery Address:'}</span>
              <span className="receipt-address">{placedOrder.address}</span>
            </div>
          </div>

          <p className="order-cod-notice">
            {lang === 'ta'
              ? 'பொருட்களை உங்கள் வீட்டு வாசலில் பெற்று, சரிபார்த்த பிறகு ரொக்கமாக அல்லது UPI (Google Pay / PhonePe) மூலம் பணம் செலுத்தலாம்.'
              : 'Our delivery person will arrive shortly. Please verify your items and pay by Cash or UPI at your doorstep.'}
          </p>

          <div className="order-actions">
            <a
              className="solid-button wa-receipt-btn"
              href={placedOrder.whatsappUrl}
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle size={20} />
              <span>{lang === 'ta' ? 'ஆர்டர் ரசீதை வாட்ஸ்அப்பில் அனுப்ப' : 'Share Order to WhatsApp'}</span>
            </a>

            <Link className="outline-button continue-btn" to="/products">
              <ArrowLeft size={16} /> {lang === 'ta' ? 'மீண்டும் மளிகை வாங்க' : 'Continue Shopping'}
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <div className="cart-page">
      {/* Header */}
      <section className="cart-heading">
        <div>
          <span className="section-kicker">
            <ShoppingBasket size={14} /> {lang === 'ta' ? 'உங்கள் மளிகைக் கூடை' : 'NATIVE GROCERIES BASKET'}
          </span>
          <h1>{lang === 'ta' ? 'மளிகைக் கூடை' : 'Your Shopping Basket'}</h1>
          <p>
            {items.length
              ? lang === 'ta'
                ? `${items.reduce((count, item) => count + item.quantity, 0)} பொருட்கள் கூடையில் உள்ளன.`
                : `${items.reduce((count, item) => count + item.quantity, 0)} items picked with care.`
              : lang === 'ta'
              ? 'கூடையில் இன்னும் பொருட்கள் சேர்க்கப்படவில்லை.'
              : 'Your basket is waiting for fresh groceries.'}
          </p>
        </div>
        <Link className="text-link" to="/products">
          <ArrowLeft size={15} /> {lang === 'ta' ? 'மேலும் மளிகை வாங்க' : 'Continue shopping'}
        </Link>
      </section>

      {/* Empty basket state */}
      {items.length === 0 ? (
        <section className="empty-cart-card">
          <span className="empty-cart-icon">
            <ShoppingBasket size={48} />
          </span>
          <h2>{lang === 'ta' ? 'உங்கள் கூடை காலியாக உள்ளது' : 'Your basket is empty'}</h2>
          <p>
            {lang === 'ta'
              ? 'அரிசி, பருப்பு, ஆவின் பால், நாட்டு காய்கறிகள் மற்றும் முன்னணி பிராண்டட் பொருட்களைப் பார்க்கவும்.'
              : 'Browse genuine branded groceries, Cauvery Delta rice, pulses, and fresh village vegetables.'}
          </p>
          <Link className="solid-button shop-empty-btn" to="/products">
            {lang === 'ta' ? 'மளிகைப் பொருட்களைப் பார்க்க' : 'Explore Groceries'} <ArrowRight size={16} />
          </Link>
        </section>
      ) : (
        <div className="cart-layout">
          {/* Basket items list */}
          <section className="cart-items" aria-label="Items in your basket">
            <div className="cart-list-heading">
              <h2>{lang === 'ta' ? 'கூடையில் உள்ள பொருட்கள்' : 'Basket Items'}</h2>
              <span className="cart-item-count-badge">
                {items.length} {lang === 'ta' ? 'வகைகள்' : 'types'}
              </span>
            </div>

            <div className="cart-items-container">
              {items.map(({ product, quantity }) => {
                const brand = productBrand(product)
                const name = productDisplayName(product, lang)
                return (
                  <article className="cart-item-row" key={product.id}>
                    <div className="cart-item-thumb">
                      <img src={productImage(product)} alt={product.name} />
                    </div>

                    <div className="cart-item-info">
                      <span className="cart-item-brand">{brand}</span>
                      <h3>{name}</h3>
                      <span className="cart-item-meta">
                        {product.unit} · {product.supplier}
                      </span>

                      {/* Quantity Stepper with large touch targets */}
                      <div className="quantity-stepper" aria-label={`Quantity of ${product.name}`}>
                        <button
                          type="button"
                          aria-label={`Remove one ${product.name}`}
                          onClick={() => onQuantityChange(product.id, quantity - 1)}
                        >
                          <Minus size={16} />
                        </button>
                        <span aria-label={`${quantity} in basket`}>{quantity}</span>
                        <button
                          type="button"
                          aria-label={`Add one ${product.name}`}
                          disabled={quantity >= product.stock}
                          onClick={() => onQuantityChange(product.id, quantity + 1)}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="cart-item-pricing">
                      <strong>{money(product.price * quantity)}</strong>
                      <span className="each-price">{money(product.price)} each</span>
                      <button
                        className="remove-item-btn"
                        type="button"
                        aria-label={`Remove ${product.name}`}
                        onClick={() => onQuantityChange(product.id, 0)}
                      >
                        <Trash2 size={15} />
                        <span>{lang === 'ta' ? 'நீக்கு' : 'Remove'}</span>
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>

            <div className="cart-footer-actions">
              <Link className="cart-back-link" to="/products">
                <ArrowLeft size={15} /> {lang === 'ta' ? 'மேலும் பொருட்கள் சேர்க்க' : 'Add more groceries'}
              </Link>
            </div>
          </section>

          {/* Simple Village Checkout Panel */}
          <aside className="checkout-panel">
            <div className="checkout-title">
              <span className="section-kicker">
                <Truck size={14} /> {lang === 'ta' ? 'வீட்டு வாசலில் டெலிவரி' : 'VILLAGE DOORSTEP DELIVERY'}
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

              {/* Village / Town */}
              <div className="form-fields-row">
                <label className="checkout-field">
                  <span className="field-label">
                    {lang === 'ta' ? 'கிராமம் / ஊர் (Village/Town) *' : 'Village / Town *'}
                  </span>
                  <input
                    name="villageTown"
                    value={villageTown}
                    onChange={(e) => setVillageTown(e.target.value)}
                    required
                    placeholder={lang === 'ta' ? 'எ.கா: கலசப்பாக்கம்' : 'e.g. Kalasapakkam'}
                  />
                </label>

                <label className="checkout-field">
                  <span className="field-label">
                    {lang === 'ta' ? 'மாவட்டம் (District) *' : 'District *'}
                  </span>
                  <select
                    name="district"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    required
                  >
                    {tamilNaduLocations.map((loc) => (
                      <option key={loc.id} value={lang === 'ta' ? loc.nameTa : loc.nameEn}>
                        {lang === 'ta' ? loc.nameTa : loc.nameEn}
                      </option>
                    ))}
                    <option value="Other District">
                      {lang === 'ta' ? 'மற்ற மாவட்டம் (Other TN District)' : 'Other Tamil Nadu District'}
                    </option>
                  </select>
                </label>
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
                    placeholder={lang === 'ta' ? 'கோவில் அருகில், பள்ளி எதிரில்' : 'Near temple / school'}
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
                    {lang === 'ta' ? 'பொருளைப் பெற்றவுடன் ரொக்கம்' : 'Cash on Delivery (COD)'}
                  </strong>
                  <span className="payment-badge">
                    {lang === 'ta' ? 'பரிந்துரைக்கப்படுகிறது' : 'Recommended'}
                  </span>
                </div>
                <p className="payment-desc">
                  {lang === 'ta'
                    ? 'மளிகைப் பொருட்களை உங்கள் வீட்டு வாசலில் பெற்று, பரிசோதித்த பின் ரொக்கமாகவோ அல்லது UPI (GPay / PhonePe) மூலமாகவோ பணம் செலுத்தலாம்.'
                    : 'Pay with cash or UPI when your groceries arrive at your doorstep. Zero upfront risk.'}
                </p>
              </div>

              {/* Order Totals */}
              <div className="order-totals">
                <div className="totals-row">
                  <span>{lang === 'ta' ? 'மளிகைத் தொகை (Subtotal)' : 'Subtotal'}</span>
                  <strong>{money(subtotal)}</strong>
                </div>
                <div className="totals-row">
                  <span>{lang === 'ta' ? 'டெலிவரி கட்டணம் (Delivery)' : 'Delivery Fee'}</span>
                  <strong className={deliveryFee === 0 ? 'free-delivery-tag' : ''}>
                    {deliveryFee ? money(deliveryFee) : lang === 'ta' ? 'இலவசம் (Free)' : 'Free'}
                  </strong>
                </div>
                <div className="totals-row grand-total-row">
                  <span>{lang === 'ta' ? 'மொத்த தொகை (Total)' : 'Total Amount'}</span>
                  <strong className="grand-total-amount">{money(total)}</strong>
                </div>
              </div>

              {subtotal > 0 && subtotal < 50 && (
                <div className="delivery-free-hint">
                  {lang === 'ta'
                    ? `இன்னும் ${money(50 - subtotal)} மதிப்பிலான பொருட்கள் சேர்த்தால் இலவச டெலிவரி!`
                    : `Add ${money(50 - subtotal)} more for free delivery!`}
                </div>
              )}

              {error && (
                <p className="checkout-error" role="alert">
                  {error}
                </p>
              )}

              <button
                className="solid-button place-order-btn"
                type="submit"
                disabled={sending}
              >
                {sending ? (
                  lang === 'ta' ? 'ஆர்டர் பதிவு செய்யப்படுகிறது...' : 'Placing your order...'
                ) : (
                  <>
                    <span>
                      {lang === 'ta'
                        ? `ஆர்டரை உறுதி செய் · ${money(total)}`
                        : `Place Order · ${money(total)}`}
                    </span>
                    <ArrowRight size={17} />
                  </>
                )}
              </button>

              <p className="order-guarantee-note">
                <ShieldCheck size={14} />
                <span>
                  {lang === 'ta'
                    ? '100% நம்பகமான அசல் பிராண்டுகள் · எளிய வாட்ஸ்அப் உதவி'
                    : '100% Genuine Branded Groceries · Instant WhatsApp Support'}
                </span>
              </p>
            </form>
          </aside>
        </div>
      )}
    </div>
  )
}
