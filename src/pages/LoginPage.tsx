import { useEffect, useState, type FormEvent } from 'react'
import type { Session } from '@supabase/supabase-js'
import { ArrowRight, LockKeyhole, LogOut, Mail, UserRound } from 'lucide-react'
import { NativeGroceryIcon } from '../components'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useI18n } from '../i18n'

type CustomerProfile = {
  customer_id: string
  updates_opt_in: boolean
}

function isCustomerProfile(value: unknown): value is CustomerProfile {
  if (!value || typeof value !== 'object') return false
  const profile = value as Partial<CustomerProfile>
  return typeof profile.customer_id === 'string' && typeof profile.updates_opt_in === 'boolean'
}

export default function LoginPage() {
  const { lang } = useI18n()
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<CustomerProfile | null>(null)
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [updatesOptIn, setUpdatesOptIn] = useState(false)
  const [savingUpdates, setSavingUpdates] = useState(false)
  const [loading, setLoading] = useState(Boolean(supabase))
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!supabase) return

    let active = true

    async function loadProfile(userId: string) {
      const { data, error: profileError } = await supabase!.from('customer_profiles')
        .select('customer_id, updates_opt_in')
        .eq('user_id', userId)
        .maybeSingle()
      if (!active) return
      if (profileError) {
        setError(lang === 'ta' ? 'வாடிக்கையாளர் சுயவிவரத்தை ஏற்ற முடியவில்லை.' : 'We could not load your customer profile. Please try again.')
        return
      }
      if (!isCustomerProfile(data)) {
        setError(lang === 'ta' ? 'உங்கள் கணக்கு இன்னும் தயாராகவில்லை. மின்னஞ்சலை உறுதி செய்யவும்.' : 'Your customer profile is not ready yet. If you just signed up, verify your email and sign in again.')
        return
      }
      setProfile(data)
      setUpdatesOptIn(data.updates_opt_in)
      setError('')
    }

    supabase.auth.getSession().then(({ data, error: sessionError }) => {
      if (!active) return
      if (sessionError) setError(sessionError.message)
      setSession(data.session)
      setLoading(false)
      if (data.session) void loadProfile(data.session.user.id)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return
      setSession(nextSession)
      setProfile(null)
      setError('')
      if (nextSession) window.setTimeout(() => { void loadProfile(nextSession.user.id) }, 0)
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [lang])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!supabase) return
    setError('')
    setMessage('')
    setLoading(true)
    try {
      if (mode === 'signup') {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { data: { updates_opt_in: updatesOptIn } },
        })
        if (signUpError) throw signUpError
        if (!data.session) {
          setMessage(lang === 'ta' ? 'உங்கள் மின்னஞ்சலுக்கு சரிபார்ப்பு இணைப்பு அனுப்பப்பட்டுள்ளது.' : 'Check your email for a verification link. Your customer ID will be ready after you verify and sign in.')
        }
      } else {
        const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
        if (signInError) throw signInError
      }
    } catch (authError) {
      setError(authError instanceof Error ? authError.message : 'We could not complete sign-in. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function saveUpdatesPreference() {
    if (!supabase) return
    setSavingUpdates(true)
    setError('')
    setMessage('')
    try {
      const { data, error: preferenceError } = await supabase.rpc('set_customer_updates_opt_in', { enabled: updatesOptIn })
      if (preferenceError) throw preferenceError
      if (!data) throw new Error('Your customer profile was not found. Please sign in again.')
      setProfile((current) => current ? { ...current, updates_opt_in: updatesOptIn } : current)
      setMessage(lang === 'ta' ? 'உங்கள் விருப்பம் சேமிக்கப்பட்டது.' : 'Your email update preference has been saved.')
    } catch (preferenceError) {
      setError(preferenceError instanceof Error ? preferenceError.message : 'We could not save your preference.')
    } finally {
      setSavingUpdates(false)
    }
  }

  async function signOut() {
    if (!supabase) return
    const { error: signOutError } = await supabase.auth.signOut()
    if (signOutError) setError(signOutError.message)
  }

  return (
    <div className="inner-page login-page">
      <section className="login-layout">
        <div className="login-aside">
          <span className="login-leaf"><NativeGroceryIcon size={40} /></span>
          <span className="section-kicker">{lang === 'ta' ? 'நேட்டிவ் மளிகை கணக்கு' : 'A NOTE FOR OUR NEIGHBORS'}</span>
          <h1>{lang === 'ta' ? 'நம்ம ஊர் மளிகை.' : 'Your groceries.'}<br />{lang === 'ta' ? 'உங்கள்' : 'Your'} <em>{lang === 'ta' ? 'கணக்கு.' : 'account.'}</em></h1>
          <p>{lang === 'ta' ? 'மளிகைப் பொருட்களை விரைவாக ஆர்டர் செய்யவும், சிறப்பு சலுகைகளைப் பெறவும் உங்கள் கணக்கில் உள்நுழையவும்.' : 'Create an account to keep your customer ID and receive fresh updates from Native Groceries.'}</p>
          <div className="login-aside-note">
            <span>{lang === 'ta' ? 'உதவி வேண்டுமா?' : 'NEED A HAND?'}</span>
            <Link to="/contact">{lang === 'ta' ? 'எங்கள் குழுவுடன் பேச' : 'Talk to our team'} <ArrowRight size={14} /></Link>
          </div>
        </div>

        <div className="login-form-wrap">
          {session ? (
            <>
              <div className="login-icon"><UserRound size={22} /></div>
              <span className="section-kicker">{lang === 'ta' ? 'வாடிக்கையாளர் கணக்கு' : 'CUSTOMER ACCOUNT'}</span>
              <h2>{lang === 'ta' ? 'உங்கள் சுயவிவரம்' : 'Your account'}</h2>
              <p>{session.user.email}</p>

              {profile ? (
                <div className="customer-account-details">
                  <div className="customer-id-card">
                    <span>{lang === 'ta' ? 'வாடிக்கையாளர் எண்' : 'YOUR CUSTOMER ID'}</span>
                    <strong>{profile.customer_id}</strong>
                  </div>
                  <label className="updates-opt-in">
                    <input type="checkbox" checked={updatesOptIn} onChange={(event) => setUpdatesOptIn(event.target.checked)} />
                    <span>{lang === 'ta' ? 'புதிய தயாரிப்புகள் மற்றும் சலுகைகள் பற்றிய மின்னஞ்சல்களை பெறுகிறேன்.' : 'Email me about new products and store updates.'}</span>
                  </label>
                  <button className="solid-button" type="button" disabled={savingUpdates || updatesOptIn === profile.updates_opt_in} onClick={saveUpdatesPreference}>
                    {savingUpdates ? (lang === 'ta' ? 'சேமிக்கப்படுகிறது...' : 'Saving...') : (lang === 'ta' ? 'விருப்பத்தை சேமிக்கவும்' : 'Save update preference')}
                  </button>
                </div>
              ) : loading ? (
                <p role="status">{lang === 'ta' ? 'சுயவிவரம் ஏற்றப்படுகிறது...' : 'Loading your customer ID...'}</p>
              ) : (
                <p role="alert">{error || (lang === 'ta' ? 'வாடிக்கையாளர் சுயவிவரம் கிடைக்கவில்லை.' : 'Customer profile is unavailable.')}</p>
              )}

              {error && <p className="form-message" role="alert">{error}</p>}
              {message && <p className="form-success" role="status">{message}</p>}
              <button className="account-signout" type="button" onClick={signOut}>
                <LogOut size={15} /> {lang === 'ta' ? 'வெளியேறு' : 'Sign out'}
              </button>
            </>
          ) : (
            <>
              <div className="login-icon">{mode === 'signup' ? <Mail size={22} /> : <LockKeyhole size={22} />}</div>
              <span className="section-kicker">{lang === 'ta' ? 'வாடிக்கையாளர் உள்நுழைவு' : 'CUSTOMER ACCESS'}</span>
              <h2>{mode === 'signup' ? (lang === 'ta' ? 'புதிய கணக்கை உருவாக்கவும்' : 'Create your account') : (lang === 'ta' ? 'மீண்டும் வருக!' : 'Welcome back')}</h2>
              <p>{mode === 'signup' ? (lang === 'ta' ? 'எளிதான மளிகை ஆர்டருக்கு பதிவு செய்யுங்கள்.' : 'Sign up to get your customer ID.') : (lang === 'ta' ? 'உங்கள் கணக்கில் உள்நுழையவும்.' : 'Log in to view your customer ID and preferences.')}</p>

              <form className="auth-form" onSubmit={submit}>
                <label>
                  {lang === 'ta' ? 'மின்னஞ்சல் முகவரி' : 'Email address'}
                  <input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
                </label>
                <label>
                  {lang === 'ta' ? 'கடவுச்சொல்' : 'Password'}
                  <input type="password" autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} minLength={8} required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="At least 8 characters" />
                </label>
                {mode === 'signup' && (
                  <label className="updates-opt-in">
                    <input type="checkbox" checked={updatesOptIn} onChange={(event) => setUpdatesOptIn(event.target.checked)} />
                    <span>{lang === 'ta' ? 'புதிய மளிகைப் பொருட்கள் பற்றிய அறிவிப்புகளை பெறுகிறேன்.' : 'Email me about new products and store updates.'}</span>
                  </label>
                )}
                <button className="solid-button" type="submit" disabled={loading || !supabase}>
                  {loading ? (lang === 'ta' ? 'காத்திருக்கவும்...' : 'Please wait...') : mode === 'signup' ? (lang === 'ta' ? 'கணக்கை உருவாக்க' : 'Create account') : (lang === 'ta' ? 'உள்நுழைய' : 'Log in')}{' '}
                  <ArrowRight size={16} />
                </button>
                {error && <p className="form-message" role="alert">{error}</p>}
                {message && <p className="form-success" role="status">{message}</p>}
              </form>

              <div className="login-help">
                {mode === 'signup' ? (lang === 'ta' ? 'ஏற்கனவே கணக்கு உள்ளதா?' : 'Already have an account?') : (lang === 'ta' ? 'நேட்டிவ் மளிகைக்கு புதியவரா?' : 'New to Native Groceries?')}{' '}
                <button className="auth-mode-toggle" type="button" onClick={() => { setMode((current) => current === 'login' ? 'signup' : 'login'); setMessage(''); setError('') }}>
                  {mode === 'signup' ? (lang === 'ta' ? 'உள்நுழைய' : 'Log in') : (lang === 'ta' ? 'கணக்கு தொடங்க' : 'Create an account')}
                </button>
              </div>
            </>
          )}

          {!supabase && (
            <div className="auth-configuration-error" role="alert">
              Customer login is optional for ordering. You can order groceries directly with Cash on Delivery without an account!
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
