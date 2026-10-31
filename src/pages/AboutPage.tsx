import { useRef } from 'react'
import { ArrowLeft, ArrowRight, Heart, Leaf, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'
import localFestivalOne from '../image/Image 1.jpeg'
import localFestivalTwo from '../image/image 2.jpeg'
import localFestivalThree from '../image/image 3.jpeg'

export default function AboutPage() {
  const { lang } = useI18n()
  const galleryRef = useRef<HTMLDivElement>(null)

  function scrollGallery(direction: -1 | 1) {
    galleryRef.current?.scrollBy({ left: direction * 360, behavior: 'smooth' })
  }

  return (
    <div className="inner-page about-page">
      {/* Intro */}
      <section className="page-intro">
        <span className="section-kicker">
          <Leaf size={14} /> {lang === 'ta' ? 'எங்களைப் பற்றி' : 'A LITTLE ABOUT US'}
        </span>
        <h1>
          {lang === 'ta' ? 'நம்ம ஊர் மளிகை,' : 'Good food.'}
          <br />
          <em>{lang === 'ta' ? 'உங்கள் வீட்டு வாசலில்!' : 'From our village to your home.'}</em>
        </h1>
        <p>
          {lang === 'ta'
            ? 'பாரம்பரிய தமிழ் மண்ணின் மணம் மாறாத தூய அரிசி, பருப்பு, நாட்டு காய்கறிகள் மற்றும் குடும்பங்கள் விரும்பும் அசல் பிராண்டட் பொருட்கள்.'
            : 'We bring Tamil Nadu’s everyday groceries, authentic Indian brands, and regional farm harvests closer to your family.'}
        </p>
      </section>

      {/* Festival Gallery */}
      <section className="about-gallery-section" aria-label="Scenes from our Tamil Nadu community">
        <div className="about-gallery-heading">
          <div>
            <span className="section-kicker">
              {lang === 'ta' ? 'நமது கிராமத்து வாழ்வியல்' : 'ROOTED IN OUR HOME'}
            </span>
            <h2>
              {lang === 'ta'
                ? 'நம்ம ஊர் திருவிழாக்களும் மக்கள் பண்பாடும்'
                : 'Traditions woven into everyday village life.'}
            </h2>
          </div>
          <div className="about-gallery-controls">
            <button
              type="button"
              aria-label="Scroll gallery left"
              onClick={() => scrollGallery(-1)}
            >
              <ArrowLeft size={16} />
            </button>
            <button
              type="button"
              aria-label="Scroll gallery right"
              onClick={() => scrollGallery(1)}
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div
          className="about-gallery"
          ref={galleryRef}
          tabIndex={0}
          aria-label="Scrollable photos of local Tamil Nadu festivals"
        >
          <figure>
            <img
              src={localFestivalOne}
              alt="A colorful local temple festival with the community gathered"
              loading="lazy"
            />
            <figcaption>
              {lang === 'ta'
                ? 'ஊர் கூடி கொண்டாடும் கிராமத்து திருவிழா'
                : 'Celebrations that bring neighbors together'}
            </figcaption>
          </figure>
          <figure>
            <img
              src={localFestivalTwo}
              alt="Temple festival chariot beneath a decorated canopy"
              loading="lazy"
            />
            <figcaption>
              {lang === 'ta'
                ? 'பாரம்பரிய கோயில் தேர் பவனி'
                : 'Traditions woven into everyday life'}
            </figcaption>
          </figure>
          <figure>
            <img
              src={localFestivalThree}
              alt="A vibrant Tamil Nadu procession and flower-decorated chariots"
              loading="lazy"
            />
            <figcaption>
              {lang === 'ta'
                ? 'தமிழ் பண்பாடும் மண்ணின் நற்பண்புகளும்'
                : 'A little of home, wherever you are'}
            </figcaption>
          </figure>
        </div>
        <p className="about-gallery-hint">
          {lang === 'ta' ? 'படங்களை பார்க்க உருட்டவும்' : 'Swipe or scroll to explore'}{' '}
          <span aria-hidden="true">→</span>
        </p>
      </section>

      {/* Story section */}
      <section className="about-story">
        <div className="about-photo">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1400&q=88"
            alt="Seasonal produce from local farms"
          />
          <span>
            {lang === 'ta'
              ? 'கலசப்பாக்கம், திருவண்ணாமலை மாவட்டம்'
              : 'Picked with care, brought to your neighborhood.'}
          </span>
        </div>

        <div className="about-copy">
          <span className="section-kicker">
            {lang === 'ta' ? 'எங்கள் நோக்கம்' : 'OUR LITTLE CORNER OF THE WORLD'}
          </span>
          <h2>{lang === 'ta' ? 'தமிழ்நாட்டு மண்ணின் உண்மை சுவை.' : 'Native to Tamil Nadu.'}</h2>
          <p>
            {lang === 'ta'
              ? 'நேட்டிவ் மளிகை ஒரு எளிய சிந்தனையுடன் தொடங்கியது: நமது கிராமத்து வீடுகளில் நாம் உண்டு வளர்ந்த தூய பொருட்கள், நல்ல பிராண்டுகள் மற்றும் உள்ளூர் விளைபொருட்கள் அனைவருக்கும் எளிதாக கிடைக்க வேண்டும்.'
              : 'Native Groceries began with a simple thought: the everyday essentials we grew up with should be authentic, affordable, and easy to order from home.'}
          </p>
          <p>
            {lang === 'ta'
              ? 'காவிரி டெல்டா பொன்னி அரிசி, சேலம் சிறுதானியங்கள், பொள்ளாச்சி நாட்டு பழங்கள், ஆவின் பால் மற்றும் டாடா, ஆசீர்வாத் போன்ற முன்னணி பிராண்டுகளை ஒரே இடத்தில் உங்கள் வீட்டு வாசலில் சேர்க்கிறோம்.'
              : 'We bring together Ponni rice from the Cauvery Delta, millets from Salem, country greens and fruits, alongside trusted household names like Aashirvaad, Tata Sampann, and Aavin.'}
          </p>
          <Link className="text-link" to="/products">
            {lang === 'ta' ? 'எங்கள் பொருட்களைப் பாருங்கள்' : "Meet what's on our shelves"}{' '}
            <ArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* Values */}
      <section className="values-section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">
              {lang === 'ta' ? 'எங்கள் கோட்பாடுகள்' : 'THE WAY WE LIKE IT'}
            </span>
            <h2>{lang === 'ta' ? 'நம்பிக்கை மற்றும் கிராமத்து நேர்மை' : 'Small choices, good roots.'}</h2>
          </div>
        </div>

        <div className="values-grid">
          <article>
            <span>
              <Leaf size={24} />
            </span>
            <h3>{lang === 'ta' ? 'உள்ளூர் விவசாயிகள்' : 'Close to the source'}</h3>
            <p>
              {lang === 'ta'
                ? 'இடைத்தரகர்கள் இன்றி கிராமத்து விவசாயிகளிடம் இருந்து நியாயமான விலையில் நேரடி கொள்முதல்.'
                : 'Direct relationships with farming families in Cauvery Delta, Salem, Pollachi, and Ooty.'}
            </p>
          </article>

          <article>
            <span>
              <ShieldCheck size={24} />
            </span>
            <h3>{lang === 'ta' ? '100% அசல் பிராண்டுகள்' : 'Authentic Packaging'}</h3>
            <p>
              {lang === 'ta'
                ? 'போலி தயாரிப்புகள் இன்றி உத்தரவாதமான முன்னணி நிறுவனங்களின் அசல் பேக்கிங் மட்டுமே.'
                : 'Every branded packaged item is sourced from authorized distributors and verified.'}
            </p>
          </article>

          <article>
            <span>
              <Heart size={24} />
            </span>
            <h3>{lang === 'ta' ? 'வாடிக்கையாளர் பாசம்' : 'Village Hospitality'}</h3>
            <p>
              {lang === 'ta'
                ? 'வயதானவர்களுக்கும் கிராமத்து மக்களுக்கும் உதவும் வகையில் வாட்ஸ்அப் மற்றும் தொலைபேசி ஆர்டர் சேவை.'
                : 'Compassionate assistance for senior citizens and rural shoppers via phone and WhatsApp.'}
            </p>
          </article>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <span className="section-kicker">
          {lang === 'ta' ? 'உங்கள் ஆதரவை வரவேற்கிறோம்' : 'COME ON IN'}
        </span>
        <h2>
          {lang === 'ta' ? 'நம்ம ஊர் மளிகைக்கு வாருங்கள்!' : "There's always room at our table."}
        </h2>
        <Link className="hero-button light-button" to="/contact">
          {lang === 'ta' ? 'தொடர்பு கொள்ள' : 'Say hello'} <ArrowRight size={16} />
        </Link>
      </section>
    </div>
  )
}
