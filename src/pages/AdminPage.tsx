import { useState, useEffect, type FormEvent, type ChangeEvent } from 'react'
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Image as ImageIcon,
  Layers,
  Lock,
  LogOut,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Trash2,
  Upload,
  X,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { categories, type Product } from '../productData'
import './AdminPage.css'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('native_admin_auth') === 'true'
  })
  const [passcode, setPasscode] = useState('')
  const [authError, setAuthError] = useState('')

  const [activeTab, setActiveTab] = useState<'products' | 'banner' | 'deploy'>('products')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  // Edit / Upload Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [customUrlInput, setCustomUrlInput] = useState<string>('')
  const [isSaving, setIsSaving] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Banner Settings State
  const [heroImage, setHeroImage] = useState('https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=2400&q=90')
  const [bannerInput, setBannerInput] = useState('')
  const [bannerSaving, setBannerSaving] = useState(false)

  // Load products
  function fetchProducts() {
    setLoading(true)
    fetch('/api/products?limit=100')
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Failed to load catalog'))))
      .then((data: { items: Product[] }) => {
        setProducts(data.items || [])
      })
      .catch((err) => {
        console.error(err)
        showToast('Could not load products from server')
      })
      .finally(() => setLoading(false))
  }

  // Load hero settings
  function fetchSettings() {
    fetch('/api/settings')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.heroImage) {
          setHeroImage(data.heroImage)
          setBannerInput(data.heroImage)
        }
      })
      .catch(() => undefined)
  }

  useEffect(() => {
    if (!isAuthenticated) return
    const controller = new AbortController()
    fetch('/api/products?limit=100', { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { items: Product[] } | null) => {
        if (data?.items) setProducts(data.items)
      })
      .catch(() => undefined)

    fetch('/api/settings', { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.heroImage) {
          setHeroImage(data.heroImage)
          setBannerInput(data.heroImage)
        }
      })
      .catch(() => undefined)

    return () => controller.abort()
  }, [isAuthenticated])

  function showToast(msg: string) {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  function handleLogin(e: FormEvent) {
    e.preventDefault()
    // Default admin passcode: native2026
    if (passcode.trim() === 'native2026' || passcode.trim() === 'admin') {
      setIsAuthenticated(true)
      sessionStorage.setItem('native_admin_auth', 'true')
      setAuthError('')
    } else {
      setAuthError('Incorrect passcode. Default passcode is: native2026')
    }
  }

  function handleLogout() {
    setIsAuthenticated(false)
    sessionStorage.removeItem('native_admin_auth')
  }

  function openEditModal(product: Product) {
    setEditingProduct(product)
    setSelectedFile(null)
    setPreviewUrl(product.image || '')
    setCustomUrlInput(product.image || '')
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setSelectedFile(file)
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPreviewUrl(reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  async function handleSaveProductImage() {
    if (!editingProduct) return
    setIsSaving(true)

    try {
      let finalImageUrl = customUrlInput.trim()

      // If a file was selected, upload it via /api/upload
      if (selectedFile && previewUrl.startsWith('data:')) {
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            filename: selectedFile.name,
            base64: previewUrl,
          }),
        })

        if (!uploadRes.ok) {
          throw new Error('Image upload failed on server')
        }

        const uploadData = (await uploadRes.json()) as { url: string }
        finalImageUrl = uploadData.url
      }

      // Update product via PATCH /api/products/:id
      const updateRes = await fetch(`/api/products/${editingProduct.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editingProduct,
          image: finalImageUrl || undefined,
        }),
      })

      if (!updateRes.ok) {
        throw new Error('Failed to update product on server')
      }

      const updatedProduct = (await updateRes.json()) as Product
      setProducts((current) =>
        current.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      )

      showToast(`Updated image for ${editingProduct.name}`)
      setEditingProduct(null)
    } catch (err) {
      console.error(err)
      showToast('Error saving image. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDeleteProductImage(product: Product) {
    if (!confirm(`Reset image for "${product.name}" to authentic brand packaging?`)) return
    setIsSaving(true)

    try {
      const updateRes = await fetch(`/api/products/${product.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...product,
          image: '', // Clears custom image
        }),
      })

      if (!updateRes.ok) throw new Error('Failed to reset image')

      const updated = (await updateRes.json()) as Product
      setProducts((current) => current.map((p) => (p.id === updated.id ? updated : p)))
      if (editingProduct?.id === product.id) {
        setEditingProduct(null)
      }
      showToast(`Reset image for ${product.name} to default packaging.`)
    } catch (err) {
      console.error(err)
      showToast('Error removing image.')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleSaveBanner(e: FormEvent) {
    e.preventDefault()
    setBannerSaving(true)
    try {
      const res = await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ heroImage: bannerInput.trim() }),
      })
      if (!res.ok) throw new Error('Failed to update banner')
      const data = await res.json()
      setHeroImage(data.heroImage)
      showToast('Homepage hero image updated successfully!')
    } catch (err) {
      console.error(err)
      showToast('Failed to update banner image')
    } finally {
      setBannerSaving(false)
    }
  }

  async function handleResetBanner() {
    const defaultHero = 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=2400&q=90'
    setBannerInput(defaultHero)
    setBannerSaving(true)
    try {
      await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ heroImage: defaultHero }),
      })
      setHeroImage(defaultHero)
      showToast('Restored default market hero image.')
    } catch {
      showToast('Failed to reset banner')
    } finally {
      setBannerSaving(false)
    }
  }

  // Filtered products list
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase())
    const matchesCategory =
      selectedCategory === 'All' || p.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // If not authenticated, show passcode login screen
  if (!isAuthenticated) {
    return (
      <div className="admin-page-wrap">
        <div className="admin-login-card">
          <div className="admin-lock-icon">
            <Lock size={28} />
          </div>
          <h1>Native Groceries Admin</h1>
          <p>Enter your store management passcode to add, update, or delete images without touching any code.</p>

          <form onSubmit={handleLogin} className="admin-login-form">
            <input
              type="password"
              placeholder="Enter passcode (default: native2026)"
              className="admin-input"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              autoFocus
            />

            {authError && (
              <div style={{ color: '#B91C1C', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                <AlertCircle size={15} /> {authError}
              </div>
            )}

            <button type="submit" className="admin-btn admin-btn-primary">
              <Lock size={16} /> Access Admin Dashboard
            </button>
          </form>

          <div style={{ marginTop: '20px' }}>
            <Link to="/" style={{ color: '#245C35', fontSize: '0.88rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <ArrowLeft size={14} /> Back to Storefront
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const customPhotoCount = products.filter((p) => Boolean(p.image)).length

  return (
    <div className="admin-page-wrap">
      <div className="admin-container">
        {/* Top Header Bar */}
        <div className="admin-header-bar">
          <div className="admin-title-group">
            <h1>Store Image &amp; Catalog Manager</h1>
            <p className="admin-subtitle">
              Add, replace, or delete product and storefront photos live without modifying any code.
            </p>
          </div>

          <div className="admin-header-actions">
            <Link to="/" className="admin-btn admin-btn-outline">
              <ExternalLink size={16} /> View Live Storefront
            </Link>
            <button type="button" onClick={handleLogout} className="admin-btn admin-btn-secondary">
              <LogOut size={16} /> Lock Admin
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="admin-tabs-nav">
          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'products' ? 'active' : ''}`}
            onClick={() => setActiveTab('products')}
          >
            <ImageIcon size={18} /> Product Photos ({products.length})
          </button>
          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'banner' ? 'active' : ''}`}
            onClick={() => setActiveTab('banner')}
          >
            <SlidersHorizontal size={18} /> Homepage Banner
          </button>
          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'deploy' ? 'active' : ''}`}
            onClick={() => setActiveTab('deploy')}
          >
            <Layers size={18} /> Cloud Deploy Guide
          </button>
        </nav>

        {/* TAB 1: PRODUCT PHOTOS */}
        {activeTab === 'products' && (
          <>
            {/* Metrics */}
            <div className="admin-metrics-row">
              <div className="admin-metric-card">
                <div className="admin-metric-icon">
                  <Layers size={22} />
                </div>
                <div>
                  <span className="admin-metric-num">{products.length}</span>
                  <span className="admin-metric-label">Total Store Products</span>
                </div>
              </div>

              <div className="admin-metric-card">
                <div className="admin-metric-icon" style={{ background: '#FEF3C7', color: '#B45309' }}>
                  <ImageIcon size={22} />
                </div>
                <div>
                  <span className="admin-metric-num">{customPhotoCount}</span>
                  <span className="admin-metric-label">Custom Uploaded Images</span>
                </div>
              </div>

              <div className="admin-metric-card">
                <div className="admin-metric-icon" style={{ background: '#E0F2FE', color: '#0369A1' }}>
                  <CheckCircle2 size={22} />
                </div>
                <div>
                  <span className="admin-metric-num">{products.length - customPhotoCount}</span>
                  <span className="admin-metric-label">Default Brand Packaging</span>
                </div>
              </div>
            </div>

            {/* Search & Category Filter Controls */}
            <div className="admin-controls-card">
              <div className="admin-search-wrap">
                <Search size={18} />
                <input
                  type="text"
                  placeholder="Search by product name or SKU (e.g. Ponni, Atta, TN-RC-001)..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="admin-search-input"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="admin-category-filter"
              >
                <option value="All">All Categories ({products.length})</option>
                {categories
                  .filter((c) => c !== 'All groceries')
                  .map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
              </select>

              <button
                type="button"
                onClick={() => {
                  fetchProducts()
                  fetchSettings()
                }}
                className="admin-btn admin-btn-secondary"
                title="Refresh product list"
              >
                <RefreshCw size={15} /> Refresh
              </button>
            </div>

            {/* Products Grid */}
            {loading ? (
              <div style={{ padding: '60px', textAlign: 'center', color: '#6B6557' }}>
                <RefreshCw className="spin" size={32} />
                <p>Loading products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div style={{ background: '#FFFFFF', padding: '60px', borderRadius: '16px', textAlign: 'center', border: '1.5px solid #EAE2D0' }}>
                <AlertCircle size={36} color="#8C8472" style={{ margin: '0 auto 12px' }} />
                <h3>No products matched your search</h3>
                <p style={{ color: '#6B6557', fontSize: '0.9rem' }}>Try clearing your search query or choosing another category.</p>
              </div>
            ) : (
              <div className="admin-products-grid">
                {filteredProducts.map((product) => {
                  const displayImg =
                    product.image ||
                    `/images/products/${product.sku}.jpg`

                  return (
                    <div className="admin-product-card" key={product.id}>
                      <div className="admin-card-media">
                        <img
                          src={displayImg}
                          alt={product.name}
                          className="admin-card-img"
                          onError={(e) => {
                            // Fallback if image fails
                            e.currentTarget.src = '/images/products/TN-RC-001.jpg'
                          }}
                        />
                        <span
                          className={`admin-card-badge ${
                            product.image ? 'badge-custom' : 'badge-default'
                          }`}
                        >
                          {product.image ? (
                            <>
                              <CheckCircle2 size={12} /> Custom Photo
                            </>
                          ) : (
                            'Default Brand Image'
                          )}
                        </span>
                      </div>

                      <div className="admin-card-body">
                        <div className="admin-card-top">
                          <h2 className="admin-card-title">{product.name}</h2>
                          <span className="admin-card-sku">{product.sku}</span>
                        </div>

                        <div className="admin-card-details">
                          <span>{product.category} · {product.unit}</span>
                          <span className="admin-card-price">₹{product.price}</span>
                        </div>

                        <div className="admin-card-actions">
                          <div className="admin-card-action-row">
                            <button
                              type="button"
                              onClick={() => openEditModal(product)}
                              className="admin-btn admin-btn-primary"
                            >
                              <Upload size={14} /> Change Photo
                            </button>

                            {product.image && (
                              <button
                                type="button"
                                onClick={() => handleDeleteProductImage(product)}
                                className="admin-btn admin-btn-danger"
                                title="Reset back to default authentic packaging"
                              >
                                <Trash2 size={14} /> Reset
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </>
        )}

        {/* TAB 2: HOMEPAGE BANNER MANAGER */}
        {activeTab === 'banner' && (
          <div className="admin-banner-card">
            <h2>Homepage Hero Banner Image</h2>
            <p style={{ color: '#6B6557', fontSize: '0.92rem', marginBottom: '16px' }}>
              Preview and replace the large background image displayed at the very top of your homepage without editing any code.
            </p>

            <div className="admin-banner-preview">
              <img src={heroImage} alt="Current Homepage Hero" />
            </div>

            <form onSubmit={handleSaveBanner} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="admin-url-field-group">
                <label>Direct Image URL (Unsplash, Supabase Storage, CDN, or Cloudinary)</label>
                <input
                  type="url"
                  value={bannerInput}
                  onChange={(e) => setBannerInput(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="admin-input"
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  type="submit"
                  disabled={bannerSaving}
                  className="admin-btn admin-btn-primary"
                >
                  <CheckCircle2 size={16} /> {bannerSaving ? 'Saving...' : 'Update Hero Banner'}
                </button>

                <button
                  type="button"
                  onClick={handleResetBanner}
                  disabled={bannerSaving}
                  className="admin-btn admin-btn-secondary"
                >
                  <RefreshCw size={15} /> Restore Original Market Photo
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: CLOUD DEPLOY GUIDE */}
        {activeTab === 'deploy' && (
          <div className="admin-guide-card">
            <h2>Deploying with Live Image Management</h2>
            <p style={{ color: '#555043', lineHeight: '1.6' }}>
              Because you selected <strong>Render, Railway, or Netlify</strong>, here is how to deploy your website so that the Admin Panel and image uploads work 24/7 without needing to touch code:
            </p>

            <div className="admin-guide-step">
              <h3>1. Deploy to Render (Recommended for Full-Stack Node + React)</h3>
              <p>Render provides a persistent Node environment where your Express API, Vite frontend, and `/images/uploads/` directory work out of the box:</p>
              <ul>
                <li>Create an account at <strong>render.com</strong> and click <strong>New &gt; Web Service</strong>.</li>
                <li>Connect your GitHub repository.</li>
                <li>Set <strong>Build Command</strong>:</li>
                <div className="admin-code-snippet">npm install &amp;&amp; npm run build</div>
                <li>Set <strong>Start Command</strong>:</li>
                <div className="admin-code-snippet">npm run start:api</div>
                <li>Set <strong>Environment Variable</strong>: <code>PORT=3001</code> (or let Render set it automatically).</li>
              </ul>
            </div>

            <div className="admin-guide-step">
              <h3>2. Deploy to Railway</h3>
              <p>Railway automatically detects the Node backend and deploys the entire application in one click:</p>
              <ul>
                <li>Go to <strong>railway.app</strong> and click <strong>New Project &gt; Deploy from GitHub repo</strong>.</li>
                <li>Add a persistent volume mounted at <code>/public/images/uploads</code> if you want uploaded files to persist across deployments.</li>
              </ul>
            </div>

            <div className="admin-guide-step">
              <h3>3. Free Cloud Image Storage via Supabase Storage</h3>
              <p>If you prefer hosting images on the cloud (ideal for Netlify/Vercel):</p>
              <ul>
                <li>Open your <strong>Supabase Dashboard &gt; Storage</strong>.</li>
                <li>Create a <strong>Public Bucket</strong> named <code>product-images</code>.</li>
                <li>Drag and drop any photo into the bucket.</li>
                <li>Click <strong>Copy URL</strong> and paste it into the <strong>"Paste Image URL"</strong> field on any product in this Admin Panel.</li>
              </ul>
            </div>
          </div>
        )}

        {/* MODAL: UPLOAD OR CHANGE PRODUCT IMAGE */}
        {editingProduct && (
          <div className="admin-modal-overlay" onClick={() => setEditingProduct(null)}>
            <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
              <div className="admin-modal-header">
                <div>
                  <h2>Update Product Photo</h2>
                  <small style={{ color: '#6B6557' }}>
                    {editingProduct.name} ({editingProduct.sku})
                  </small>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="admin-modal-close"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Preview Box */}
              <div className="admin-preview-box">
                {previewUrl ? (
                  <img src={previewUrl} alt="Preview" className="admin-preview-img" />
                ) : (
                  <label htmlFor="file-upload" className="admin-dropzone-label">
                    <Upload size={36} color="#6B9B45" />
                    <span>Click to choose image file</span>
                    <small>Supports JPG, PNG, WEBP from your phone or PC</small>
                  </label>
                )}
              </div>

              {/* File Input */}
              <div>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <label
                  htmlFor="file-upload"
                  className="admin-btn admin-btn-secondary"
                  style={{ width: '100%', cursor: 'pointer', textAlign: 'center' }}
                >
                  <Upload size={16} /> Choose File From Device
                </label>
              </div>

              {/* Or Paste Direct Image URL */}
              <div className="admin-url-field-group">
                <label>Or Paste Online Image URL (Supabase, Imgur, Cloudinary, etc.)</label>
                <input
                  type="url"
                  placeholder="https://.../photo.jpg"
                  value={customUrlInput}
                  onChange={(e) => {
                    setCustomUrlInput(e.target.value)
                    setPreviewUrl(e.target.value)
                    setSelectedFile(null)
                  }}
                  className="admin-input"
                />
              </div>

              {/* Modal Actions */}
              <div className="admin-modal-footer">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="admin-btn admin-btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isSaving || (!previewUrl && !customUrlInput)}
                  onClick={handleSaveProductImage}
                  className="admin-btn admin-btn-primary"
                >
                  <CheckCircle2 size={16} /> {isSaving ? 'Saving Photo...' : 'Save & Update Storefront'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Toast Notification */}
        {toastMessage && (
          <div className="admin-toast">
            <CheckCircle2 size={18} />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </div>
  )
}
