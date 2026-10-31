import { useState, type FormEvent } from 'react'
import { ArrowRight, Clock3, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { useI18n } from '../i18n'

export default function ContactPage() {
  const { lang } = useI18n()
  const [sending, setSending] = useState(false)
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSending(true)
    setMessage('')
    const formElement = event.currentTarget
    const form = new FormData(formElement)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.get('name'),
          email: form.get('email'),
          topic: form.get('topic'),
          message: form.get('message'),
        }),
      })
      if (!response.ok) throw new Error('We could not send your note. Please try again.')
      setSent(true)
      formElement.reset()
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="inner-page contact-page">
      <section className="contact-intro">
        <span className="section-kicker">
          {lang === 'ta' ? 'நாங்கள் உங்கள் அருகில்' : "WE'RE AROUND THE CORNER"}
        </span>
        <h1>
          {lang === 'ta' ? 'எங்களை எளிதாக' : 'Come say'}
          <br />
          <em>{lang === 'ta' ? 'தொடர்பு கொள்ளுங்கள்.' : 'hello.'}</em>
        </h1>
        <p>
          {lang === 'ta'
            ? 'மளிகை ஆர்டர், ஏதேனும் சந்தேகம் அல்லது வாட்ஸ்அப் உதவி வேண்டுமா? நாங்கள் உதவ எப்போதும் தயாராக உள்ளோம்.'
            : 'Have a question about products, delivery locations, or need help ordering on WhatsApp? We are right here.'}
        </p>
      </section>

      <section className="contact-layout">
        <div className="contact-details">
          <div className="contact-detail">
            <span>
              <MapPin size={20} />
            </span>
            <div>
              <strong>{lang === 'ta' ? 'எங்கள் கடை முகவரி' : 'Our Village Market'}</strong>
              <p>
                கலசப்பாக்கம் மெயின் ரோடு<br />
                திருவண்ணாமலை மாவட்டம், தமிழ்நாடு - 606751
              </p>
            </div>
          </div>

          <div className="contact-detail">
            <span>
              <Clock3 size={20} />
            </span>
            <div>
              <strong>{lang === 'ta' ? 'கடை திறந்திருக்கும் நேரம்' : 'Store Hours'}</strong>
              <p>
                {lang === 'ta' ? 'திங்கள் - சனி: காலை 7:00 - இரவு 9:00' : 'Monday - Saturday: 7am - 9pm'}
                <br />
                {lang === 'ta' ? 'ஞாயிறு: காலை 7:00 - மதியம் 2:00' : 'Sunday: 7am - 2pm'}
              </p>
            </div>
          </div>

          <div className="contact-detail wa-contact-detail">
            <span>
              <MessageCircle size={20} />
            </span>
            <div>
              <strong>{lang === 'ta' ? 'வாட்ஸ்அப் உதவி & நேரடி ஆர்டர்' : 'WhatsApp Order & Help'}</strong>
              <p>
                <a
                  href="https://wa.me/919655082236?text=Vanakkam%20Native%20Groceries"
                  target="_blank"
                  rel="noreferrer"
                  className="wa-link-highlight"
                >
                  +91 96550 82236 ↗
                </a>
              </p>
              <small>{lang === 'ta' ? 'பட்டியலை போட்டோ எடுத்து அனுப்பலாம்' : 'Send handwritten lists directly'}</small>
            </div>
          </div>

          <div className="contact-detail">
            <span>
              <Phone size={20} />
            </span>
            <div>
              <strong>{lang === 'ta' ? 'தொலைபேசி அழைப்பு' : 'Direct Helpline'}</strong>
              <p>
                <a href="tel:+919655082236">+91 96550 82236</a>
              </p>
            </div>
          </div>

          <div className="contact-detail">
            <span>
              <Mail size={20} />
            </span>
            <div>
              <strong>{lang === 'ta' ? 'மின்னஞ்சல்' : 'Email Us'}</strong>
              <p>
                <a href="mailto:hello@nativegroceries.in">hello@nativegroceries.in</a>
              </p>
            </div>
          </div>

          <div className="contact-photo">
            <img
              src="https://images.unsplash.com/photo-1557844352-761f2565b576?auto=format&fit=crop&w=950&q=82"
              alt="Fresh vegetables at Tamil Nadu market"
            />
            <span>{lang === 'ta' ? 'தமிழ்நாட்டு கிராமத்து மண்மணம் மாறாத நற்பொருட்கள்' : 'Fresh from our local markets.'}</span>
          </div>
        </div>

        <form className="contact-form" onSubmit={submit}>
          <span className="section-kicker">
            {lang === 'ta' ? 'செய்தி அனுப்ப' : 'SEND US A NOTE'}
          </span>
          <h2>{lang === 'ta' ? 'எங்களுக்கு செய்தி அனுப்புங்கள்' : "What's on your mind?"}</h2>

          <div className="form-row">
            <label>
              {lang === 'ta' ? 'உங்கள் பெயர் *' : 'Your name *'}
              <input name="name" required placeholder={lang === 'ta' ? 'பெயர்' : 'Your name'} />
            </label>
            <label>
              {lang === 'ta' ? 'மின்னஞ்சல் / தொலைபேசி *' : 'Email or Phone *'}
              <input name="email" required placeholder={lang === 'ta' ? 'you@example.com / 9876543210' : 'you@example.com'} />
            </label>
          </div>

          <label>
            {lang === 'ta' ? 'விசயம் என்ன?' : "What's this about?"}
            <select name="topic" defaultValue="A little question">
              <option value="A little question">
                {lang === 'ta' ? 'மளிகை ஆர்டர் சந்தேகம்' : 'Order or Delivery Question'}
              </option>
              <option value="Product suggestion">
                {lang === 'ta' ? 'புதிய பொருள் பரிந்துரை' : 'Product / Brand Request'}
              </option>
              <option value="Store partnership">
                {lang === 'ta' ? 'விவசாயிகள் நேரடி தொடர்பு' : 'Farmer / Local Producer'}
              </option>
              <option value="Something else">
                {lang === 'ta' ? 'இதர காரணங்கள்' : 'Other'}
              </option>
            </select>
          </label>

          <label>
            {lang === 'ta' ? 'உங்கள் கருத்து அல்லது தேவை *' : 'Your message *'}
            <textarea
              name="message"
              rows={5}
              required
              minLength={8}
              placeholder={lang === 'ta' ? 'உங்கள் கருத்தை விரிவாக எழுதவும்...' : 'Tell us a little more...'}
            />
          </label>

          <button className="solid-button send-note-btn" type="submit" disabled={sending}>
            {sending ? (
              lang === 'ta' ? 'அனுப்பப்படுகிறது...' : 'Sending...'
            ) : (
              <>
                <span>{lang === 'ta' ? 'செய்தியை அனுப்புக' : 'Send your note'}</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>

          {sent && (
            <p className="form-message success-message" role="status">
              ✓ {lang === 'ta' ? 'மிக்க நன்றி! உங்கள் செய்தி பெறப்பட்டது.' : 'Thanks for reaching out! We will contact you soon.'}
            </p>
          )}

          {message && (
            <p className="form-message error-message" role="alert">
              {message}
            </p>
          )}
        </form>
      </section>
    </div>
  )
}
