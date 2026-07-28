import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight, Star, MapPin, MousePointerClick,
  Clock, Calendar, Instagram,
  Facebook, Mail, Phone, ExternalLink,
  MessageCircle, ArrowUp
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
// import OrderPopup from '../components/OrderPopup';
import { useOrderPopup } from '../hooks/useOrderPopup';

// Images
const heroDosa = '/images/hero_dosa_idli_platter.png';
const foodTruck = '/images/food-truck.jpg';
const galleryImg = '/images/gallery.png';
const eventsImg = '/images/events.png';
const g1 = '/images/g1.png';
const g2 = '/images/g2.png';
const g3 = '/images/g3.png';
const logo01 = '/images/Naati Dosa Logo-01.png';
const logo02 = '/images/Naati Dosa Logo-02.png';

const heroSlides = [
  { src: '/images/hero-dosa.jpg', alt: 'Signature dosa closeup' },
  { src: '/menu%20images/Ghee%20pudi%20thatte%20idli.jpg', alt: 'Ghee pudi thatte idli' },
  { src: '/menu%20images/dahi-puri.jpg', alt: 'Dahi puri chaat' },
  { src: '/menu%20images/chkn_momos.jpg', alt: 'Chicken momos' },
  { src: '/menu%20images/Bun_Maska.jpg', alt: 'Bun maska' },
];

const reviewsData = [
  { id: 1, name: "Varun Reddy", text: "The most authentic Dosa I've had in Florida. The Mysore Masala is a must-try! Spicy and flavorful.", rating: 5, date: "2 days ago" },
  { id: 2, name: "Sarah J.", text: "Softest Idlis ever! Their food truck is such a vibe in Delray Beach. Friendly service too!", rating: 5, date: "1 week ago" },
  { id: 3, name: "Rahul S.", text: "The Benne Dosa took me straight back to Davangere. Absolutely delicious and crispy!", rating: 5, date: "3 days ago" },
];

const LandingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { closePopup, selectedMenuItem, showPopup } = useOrderPopup(location.hash ? undefined : 1500);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);

  const activeHeroSlide = heroSlides[heroSlideIndex];

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!location.hash) {
      return undefined;
    }

    const hashTarget = location.hash.replace('#', '');
    const timerId = window.setTimeout(() => {
      document.getElementById(hashTarget)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);

    return () => window.clearTimeout(timerId);
  }, [location.hash]);

  useEffect(() => {
    const slideTimer = window.setInterval(() => {
      setHeroSlideIndex((prevIndex) => (prevIndex + 1) % heroSlides.length);
    }, 5000);

    return () => window.clearInterval(slideTimer);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-page">
      <OrderPopup
        show={showPopup}
        selectedMenuItem={selectedMenuItem}
        onClose={closePopup}
        onPickup={() => {
          closePopup();
          scrollToSection('visit');
        }}
      />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/15616695387?text=I'd%20like%20to%20book%20an%20event%20with%20Naati%20Dosa"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp"
      >
        <span className="wa-label">Book an Event</span>
        <div className="wa-icon">
          <MessageCircle size={32} fill="white" color="var(--whatsapp)" />
        </div>
      </a>

      {/* Hero Section */}
      <section id="home" className="hero-section bg-cream">
        <div className="hero-bg-media" aria-hidden="true">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={activeHeroSlide.src}
              src={activeHeroSlide.src}
              alt={activeHeroSlide.alt}
              className="hero-bg-image"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
            />
          </AnimatePresence>
        </div>
        <div className="hero-overlay"></div>

        <div className="container hero-container">
          <div className="hero-content">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: 'easeOut' }}
            >
              <div className="hero-badge">
                <span>Best Indian Food in Florida</span>
              </div>

              <h1 className="hero-headline">
                <span className="line-1">Fresh South Indian Flavors</span>
                <span className="line-2"><span className="text-stroke">Naati Dosa, Made with Heart</span></span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="hero-cta-group"
            >
              <button onClick={() => window.dispatchEvent(new Event('openOrderPopup'))} className="cta-primary">
                Order online <ArrowRight size={16} />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Ticker */}
      <div className="hero-ticker bg-espresso">
        <div className="ticker-inner ticker-scroll">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="ticker-item">
              CRISPY DOSA <span className="text-orange">✦</span> FRESH CHUTNEY <span className="text-orange">✦</span> AUTHENTIC SPICES <span className="text-orange">✦</span> BOCA RATON <span className="text-orange">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="about-section bg-white overflow-hidden">
        <div className="container about-grid">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="about-image-wrap"
          >
            <div className="about-blob bg-orange"></div>
            <img src={foodTruck} alt="Naati Dosa Truck" className="about-img" />
            <div className="about-badge">
              <strong>ESTD 2026</strong>
              <span>FLORIDA</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="about-text-wrap"
          >
            <span className="sub-tag">Our Story</span>
            <h2 className="text-brown">Born from Tradition, Served with <span className="text-orange italic">Passion.</span></h2>
            <p className="about-desc">
              Founded on the belief that the best food comes from recipes passed down through generations.
              Our journey started in the heart of Karnataka, where the art of the perfect dosa is a daily ritual.
              Now, we've brought those authentic flavors to the vibrant food scene in Boca Raton.
            </p>
            <div className="about-features">
              <div className="a-feat">
                <span className="feat-icon">✨</span>
                <div>
                  <strong>Fresh Daily</strong>
                  <p>Our batter is fermented for 12 hours and made fresh every single morning.</p>
                </div>
              </div>
              <div className="a-feat">
                <span className="feat-icon">🌶️</span>
                <div>
                  <strong>Real Spices</strong>
                  <p>We source our spices directly from small farmers in South India.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="gallery-section bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header text-center"
          >
            <span className="sub-tag">Visual Feast</span>
            <h2 className="text-brown">Taste with Your <span className="text-orange italic">Eyes</span></h2>
          </motion.div>

          <div className="gallery-grid-v2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="g-item g-large"
            >
              <img src={g1} alt="Crispy Dosa" />
              <div className="g-info">
                <h4>Signature Masala Dosa</h4>
                <p>Crispy perfection with spiced potato</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="g-item"
            >
              <img src={g2} alt="South Indian Spread" />
              <div className="g-info">
                <h4>Authentic Spread</h4>
                <p>A variety of chutneys & sambar</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="g-item"
            >
              <img src={g3} alt="Community Scene" />
              <div className="g-info">
                <h4>Bringing Joy</h4>
                <p>Happy faces at our truck</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="reviews-section">
        <div className="container">
          <motion.div
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="sub-tag accent-font">Guest Experiences</span>
            <h2 className="text-brown">What people are <span className="text-orange italic">saying</span></h2>
          </motion.div>

          <div className="reviews-grid">
            {reviewsData.map((rev, i) => (
              <motion.div
                key={rev.id}
                className="review-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="quote-icon">“</div>
                <div className="rating-stars">
                  {[...Array(rev.rating)].map((_, idx) => <Star key={idx} size={16} fill="var(--orange)" color="var(--orange)" />)}
                </div>
                <p className="review-text">"{rev.text}"</p>
                <div className="review-footer">
                  <div className="user-avatar">{rev.name.charAt(0)}</div>
                  <div className="user-info">
                    <strong>{rev.name}</strong>
                    <span>{rev.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="events-section bg-espresso text-cream">
        <div className="container events-grid">
          <div className="events-text">
            <span className="sub-tag text-orange">Upcoming</span>
            <h2 className="text-white">Join the <span className="text-orange italic">Celebration</span></h2>
            <p>Catch us at local festivals, community markets, and private events across South Florida.</p>

            <div className="event-list">
              <div className="event-item">
                <div className="event-date">
                  <span className="day">15</span>
                  <span className="month">MAR</span>
                </div>
                <div className="event-info">
                  <h3>Delray Seafood Festival</h3>
                  <p>Downtown Delray • 12PM - 8PM</p>
                </div>
              </div>
              <div className="event-item">
                <div className="event-date">
                  <span className="day">22</span>
                  <span className="month">MAR</span>
                </div>
                <div className="event-info">
                  <h3>West Palm Beach GreenMarket</h3>
                  <p>WPB Waterfront • 9AM - 1PM</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="events-image-wrap"
          >
            <img src={eventsImg} alt="Food Truck Event" className="events-img" />
          </motion.div>
        </div>
      </section>

      <section id="visit" className="visit-section bg-cream">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-header text-center"
          >
            <span className="sub-tag">Find Us</span>
            <h2 className="text-brown">Visit the <span className="text-orange italic">Truck</span></h2>
          </motion.div>

          <div className="visit-layout-v2">
            <div className="visit-cards-grid">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="visit-info-card"
              >
                <MapPin className="card-icon text-orange" size={32} />
                <h3>Location</h3>
                <p>2121, W Atlantic Avenue, Delray Beach, FL 33445</p>
                <p className="detail">Florida, United States</p>
                <a href="https://www.google.com/maps/place/2121+W+Atlantic+Ave,+Delray+Beach,+FL+33445" target="_blank" rel="noopener noreferrer" className="nav-link-v2">Open in Maps <ExternalLink size={16} /></a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="visit-info-card"
              >
                <Clock className="card-icon text-orange" size={32} />
                <h3>Trading Hours</h3>
                <div className="hours-v2">
                  <div className="h-row"><span>All Days</span> <strong>6PM - 12AM</strong></div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="visit-info-card"
              >
                <Phone className="card-icon text-orange" size={32} />
                <h3>Order Ahead</h3>
                <p>Call us to skip the line</p>
                <a href="tel:+15616695387" className="phone-link">+1 (561) 669-5387</a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="visit-map-v2"
            >
              <iframe
                src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=2121 W Atlantic Ave, Delray Beach, FL 33445&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                allowFullScreen={true}
                loading="lazy"
                title="Google Maps Location"
              ></iframe>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="footer-v3 bg-espresso text-cream">
        <div className="container">
          <div className="footer-main-area">
            <div className="footer-branding">
              <img src={logo01} alt="Naati Dosa Logo" className="footer-giant-logo" />
              <p className="footer-tagline">Authentic Karnataka Heritage in Every Bite.</p>
              <div className="footer-social-wrap">
                <a href="https://www.instagram.com/naati_Dosa" target="_blank" rel="noopener noreferrer" className="footer-soc-link"><Instagram size={22} /></a>
                <a href="https://www.facebook.com/people/Naati-Dosa/61587689076429/" target="_blank" rel="noopener noreferrer" className="footer-soc-link"><Facebook size={22} /></a>
                <a href="#" className="footer-soc-link">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
                </a>
              </div>
            </div>

            <div className="footer-grid-v3">
              <div className="footer-col">
                <h3>Our Story</h3>
                <p>Born from traditional recipes and served with passion in the heart of South Florida. Experience the soul of Karnataka.</p>
              </div>
              <div className="footer-col">
                <h3>Quick Links</h3>
                <ul className="footer-nav-list">
                  <li><button onClick={() => scrollToSection('home')}>Home</button></li>
                  <li><button onClick={() => navigate('/menu')}>The Menu</button></li>
                  <li><button onClick={() => scrollToSection('about')}>Our Journey</button></li>
                  <li><button onClick={() => scrollToSection('visit')}>Find Our Truck</button></li>
                </ul>
              </div>
              <div className="footer-col">
                <h3>Contact</h3>
                <div className="footer-contact-info">
                  <p><Phone size={16} className="text-orange" /> +1 (561) 669-5387</p>
                  <p><MapPin size={16} className="text-orange" /> 2121, W Atlantic Avenue, Delray Beach, FL 33445</p>
                  <p><Clock size={16} className="text-orange" /> All Days: 6PM - 12AM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-legal">
            <div className="legal-left">
              <span>&copy; 2026 Naati Dosa Florida. All Rights Reserved.</span>
            </div>
            <div className="legal-right">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{
        __html: `
        :root {
          --brown: #6B3A1F;
          --orange: #F0A500;
          --espresso: #3d2b1f;
          --cream: #FDF6EC;
        }

        .scroll-to-top {
          position: fixed;
          bottom: 120px;
          right: 30px;
          z-index: 998;
          background: var(--brown);
          color: white;
          width: 55px;
          height: 55px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .scroll-to-top:hover {
          background: var(--orange);
          transform: translateY(-5px) scale(1.1);
          box-shadow: 0 15px 30px rgba(0,0,0,0.2);
        }

        @media (max-width: 768px) {
          .scroll-to-top {
            right: 20px;
            bottom: 110px;
            width: 50px;
            height: 50px;
          }
        }

        .landing-page { color: var(--espresso); font-family: var(--font-body); }
        .bg-cream { background-color: var(--cream); }
        .bg-white { background-color: var(--white); }
        .bg-brown { background-color: var(--brown); }
        .bg-espresso { background-color: var(--espresso); }
        .text-brown { color: var(--brown); }
        .text-orange { color: var(--orange); }
        .text-white { color: var(--white); }

        .accent-font { font-family: var(--font-accent); font-style: italic; }
        .heading-font { font-family: var(--font-heading); }
        .italic { font-style: italic; }

        .container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 2rem;
        }

        .section-header { margin-bottom: 5rem; }
        .section-header h2 { font-size: 4rem; line-height: 1.1; margin-bottom: 1.5rem; }
        .section-desc { font-size: 1.2rem; opacity: 0.7; max-width: 600px; margin: 0 auto; }
        .sub-tag { font-family: var(--font-accent); font-weight: 600; font-style: italic; text-transform: none; letter-spacing: 1px; font-size: 1.35rem; margin-bottom: 1rem; display: block; color: var(--orange); opacity: 0.95; }

        /* Hero */
        .hero-section {
          position: relative;
          padding: 0;
          min-height: calc(100vh - 82px);
          display: flex;
          align-items: flex-end;
          overflow: hidden;
          isolation: isolate;
          background:
            radial-gradient(120% 80% at 10% 100%, rgba(240, 165, 0, 0.3) 0%, rgba(240, 165, 0, 0) 56%),
            radial-gradient(90% 70% at 100% 0%, rgba(107, 58, 31, 0.42) 0%, rgba(107, 58, 31, 0) 62%),
            linear-gradient(135deg, #2f1809 0%, #5e3117 38%, #8a4f20 100%);
        }
        .hero-bg-media {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .hero-bg-media::after {
          content: '';
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(circle at 85% 15%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 34%),
            linear-gradient(120deg, rgba(0, 0, 0, 0.06) 0%, rgba(0, 0, 0, 0) 42%);
          z-index: 1;
        }
        .hero-bg-image {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 44%;
          transform-origin: center;
          filter: brightness(1.02) saturate(1.08) contrast(1.06);
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.24) 55%, rgba(0, 0, 0, 0.58) 100%),
            linear-gradient(90deg, rgba(22, 12, 6, 0.74) 0%, rgba(22, 12, 6, 0.45) 40%, rgba(22, 12, 6, 0.16) 72%, rgba(22, 12, 6, 0) 100%),
            radial-gradient(80% 140% at 0% 100%, rgba(240, 165, 0, 0.26) 0%, rgba(240, 165, 0, 0) 58%);
          z-index: 1;
        }
        .hero-container {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          align-items: end;
          position: relative;
          z-index: 2;
          padding-bottom: clamp(2rem, 5.5vh, 3.4rem);
        }
        .hero-content {
          color: #fff;
          max-width: 690px;
          background: transparent;
          border: none;
          border-radius: 0;
          padding: 0;
          box-shadow: none;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          width: fit-content;
          color: rgba(255,255,255,0.98);
          font-size: clamp(0.72rem, 1vw, 0.88rem);
          font-weight: 700;
          margin-bottom: 0.55rem;
          text-shadow: 0 4px 16px rgba(0,0,0,0.55);
        }
        .hero-headline { font-size: clamp(2.15rem, 4.7vw, 4.6rem); line-height: 0.96; font-weight: 900; font-style: normal; margin-bottom: 1.05rem; color: #fff; letter-spacing: -0.7px; text-shadow: 0 10px 20px rgba(0,0,0,0.5); }
        .hero-headline .line-1,
        .hero-headline .line-2 { display: block; }
        .hero-headline .line-1 { margin-bottom: 0.1rem; }
        .text-stroke { color: #fff; -webkit-text-stroke: 0; }
        .hero-cta-group { display: flex; gap: 0.85rem; margin-bottom: 0; flex-wrap: wrap; }
        .cta-primary { background: #f59e0b; color: #1d1208; padding: 0.55rem 1rem; border-radius: 9px; font-weight: 800; font-size: 0.86rem; display: inline-flex; align-items: center; gap: 0.35rem; box-shadow: 0 8px 24px rgba(240,165,0,0.24); border: none; cursor: pointer; transition: 0.25s; text-transform: none; }
        .cta-primary:hover { background: #ffb93a; transform: translateY(-2px); }

        /* Ticker */
        .hero-ticker { padding: 1.5rem 0; overflow: hidden; white-space: nowrap; }
        .ticker-inner { display: inline-block; animation: ticker-scroll 30s linear infinite; }
        .ticker-item { color: white; font-family: var(--font-heading); font-weight: 800; margin-right: 3rem; font-size: 1.1rem; }
        @keyframes ticker-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        /* About */
        .about-section { padding: 140px 0; }
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: center; }
        .about-image-wrap { position: relative; }
        .about-img { width: 100%; border-radius: 30px; position: relative; z-index: 2; height: 600px; object-fit: cover; }
        .about-blob { position: absolute; inset: -20px; border-radius: 40px; opacity: 0.15; z-index: 1; }
        .about-badge { position: absolute; bottom: 30px; right: -20px; background: white; padding: 1.5rem; border-radius: 20px; z-index: 3; box-shadow: 0 15px 40px rgba(0,0,0,0.1); text-align: center; }
        .about-badge strong { display: block; color: var(--orange); font-size: 1.4rem; }
        .about-desc { font-size: 1.2rem; line-height: 1.8; margin-bottom: 3rem; opacity: 0.8; }
        .about-features { display: grid; gap: 2rem; }
        .a-feat { display: flex; gap: 1.5rem; }
        .feat-icon { font-size: 1.5rem; background: var(--cream); width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; border-radius: 12px; }

        /* POS Menu Section */
        .menu-section-pos { background: var(--cream); padding: 80px 0 100px; }
        .menu-pos-header { max-width: 1300px; margin: 0 auto; padding: 0 2rem 3rem; text-align: center; }
        .menu-pos-body { max-width: 1300px; margin: 0 auto; padding: 0 2rem; display: flex; gap: 0; height: 80vh; }
        .menu-pos-sidebar { width: 180px; flex-shrink: 0; overflow-y: auto; padding-right: 16px; padding-top: 4px; scrollbar-width: none; }
        .menu-pos-sidebar::-webkit-scrollbar { display: none; }
        .menu-sidebar-link { display: block; padding: 10px 14px; border-radius: 8px; font-size: 14px; font-weight: 500; color: #8E8E93; text-decoration: none; transition: 0.2s; border-left: 3px solid transparent; line-height: 1.3; }
        .menu-sidebar-link:hover { background: rgba(107,58,31,0.08); border-left-color: var(--brown); color: var(--brown); font-weight: 600; }
        .menu-pos-content { flex: 1; min-width: 0; overflow-y: auto; display: flex; flex-direction: column; gap: 48px; padding-bottom: 40px; scrollbar-width: thin; scrollbar-color: rgba(107,58,31,0.2) transparent; }
        .menu-pos-cat-heading { display: flex; flex-direction: column; align-items: center; margin-bottom: 20px; }
        .menu-pos-cat-heading span { font-family: Georgia, 'Playfair Display', serif; font-size: 28px; color: var(--brown); font-style: italic; font-weight: 700; line-height: 1.2; }
        .menu-pos-cat-underline { width: 60px; height: 2px; background: var(--orange); margin-top: 8px; border-radius: 2px; }
        .menu-pos-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .menu-pos-card { height: 130px; padding: 14px 16px; border-radius: 14px; background: #fff; border: 1px solid rgba(107,58,31,0.07); display: flex; align-items: center; justify-content: space-between; gap: 14px; transition: 0.2s; box-shadow: 0 2px 8px rgba(107,58,31,0.04); }
        .menu-pos-card:hover { background: #fffaf4; box-shadow: 0 6px 20px rgba(107,58,31,0.09); }
        .menu-pos-card-left { display: flex; flex-direction: column; justify-content: center; gap: 5px; flex: 1; min-width: 0; overflow: hidden; }
        .menu-pos-name { font-size: 16px; font-weight: 600; color: var(--espresso); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
        .menu-pos-price { font-size: 15px; font-weight: 600; color: var(--brown); }
        .menu-pos-desc { font-size: 12.5px; color: #8E8E93; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .menu-pos-card-right { position: relative; flex-shrink: 0; }
        .menu-pos-img { width: 100px; height: 90px; border-radius: 10px; object-fit: cover; display: block; }
        .menu-pos-add { position: absolute; bottom: -6px; right: -6px; width: 28px; height: 28px; border-radius: 50%; background: var(--brown); color: white; font-size: 18px; line-height: 1; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; font-weight: 400; transition: 0.2s; box-shadow: 0 2px 8px rgba(107,58,31,0.3); }
        .menu-pos-add:hover { background: var(--espresso); transform: scale(1.1); }

        /* Gallery Section */
        .gallery-section { padding: 120px 0; }
        .gallery-grid-v2 { display: grid; grid-template-columns: repeat(2, 1fr); grid-template-rows: repeat(2, 350px); gap: 2rem; margin-top: 4rem; }
        .g-item { position: relative; border-radius: 35px; overflow: hidden; box-shadow: 0 15px 40px rgba(0,0,0,0.1); }
        .g-large { grid-row: span 2; }
        .g-item img { width: 100%; height: 100%; object-fit: cover; transition: 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
        .g-item:hover img { transform: scale(1.08); }
        .g-info { position: absolute; bottom: 0; left: 0; right: 0; padding: 3rem 2rem; background: linear-gradient(transparent, rgba(62,31,8,0.95)); color: white; opacity: 0; transform: translateY(20px); transition: 0.4s; }
        .g-item:hover .g-info { opacity: 1; transform: translateY(0); }
        .g-info h4 { font-size: 1.8rem; margin-bottom: 0.5rem; font-family: var(--font-heading); }
        .g-info p { font-size: 1rem; opacity: 0.8; }

        /* Events Section */
        .events-section { padding: 120px 0; }
        .events-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: center; }
        .event-list { margin-top: 4rem; display: flex; flex-direction: column; gap: 2.5rem; }
        .event-item { display: flex; gap: 2rem; align-items: center; padding-bottom: 2.5rem; border-bottom: 1px solid rgba(255,166,35,0.2); }
        .event-item:last-child { border-bottom: none; }
        .event-date { background: var(--orange); color: white; padding: 1.2rem; border-radius: 20px; text-align: center; min-width: 90px; }
        .event-date .day { display: block; font-size: 2rem; font-weight: 900; line-height: 1; }
        .event-date .month { display: block; font-size: 0.8rem; font-weight: 800; text-transform: uppercase; margin-top: 5px; }
        .event-info h3 { font-size: 1.8rem; margin-bottom: 0.5rem; color: white; font-family: var(--font-heading); }
        .event-info p { opacity: 0.7; font-size: 1.1rem; }
        .events-image-wrap { position: relative; }
        .events-img { width: 100%; border-radius: 40px; height: 500px; object-fit: cover; box-shadow: 0 20px 50px rgba(0,0,0,0.3); }

        /* Reviews Section */
        .reviews-section { padding: 120px 0; background: #fffcf8; }
        .reviews-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2.5rem; margin-top: 4rem; }
        .review-card { background: white; padding: 3.5rem 2.5rem 3rem; border-radius: 35px; box-shadow: 0 15px 45px rgba(107,58,31,0.05); position: relative; border: 1px solid rgba(107,58,31,0.03); }
        .quote-icon { position: absolute; top: 20px; right: 30px; font-size: 5rem; font-family: var(--font-heading); color: var(--orange); opacity: 0.12; line-height: 1; pointer-events: none; }
        .rating-stars { display: flex; gap: 4px; margin-bottom: 1.5rem; }
        .review-text { font-size: 1.15rem; line-height: 1.8; color: var(--espresso); margin-bottom: 2rem; font-style: italic; font-family: var(--font-body); opacity: 0.9; }
        .review-footer { display: flex; align-items: center; gap: 1rem; border-top: 1px solid rgba(107,58,31,0.08); padding-top: 1.8rem; }
        .user-avatar { width: 50px; height: 50px; background: var(--brown); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-family: var(--font-heading); font-size: 1.2rem; }
        .user-info { display: flex; flex-direction: column; line-height: 1.4; }
        .user-info strong { color: var(--brown); font-size: 1.1rem; font-family: var(--font-heading); }
        .user-info span { font-size: 0.9rem; opacity: 0.5; font-family: var(--font-body); }

        /* Updated Visit v2 */
        .visit-section { padding: 120px 0; }
        .visit-layout-v2 { display: grid; grid-template-columns: 0.8fr 1.2fr; gap: 4rem; margin-top: 2rem; align-items: start; }
        .visit-cards-grid { display: flex; flex-direction: column; gap: 2rem; }
        .visit-info-card { background: white; padding: 2.5rem; border-radius: 35px; box-shadow: 0 15px 45px rgba(0,0,0,0.03); text-align: center; display: flex; flex-direction: column; align-items: center; border: 1px solid rgba(107,58,31,0.03); }
        .card-icon { margin-bottom: 1.5rem; background: var(--cream); width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; border-radius: 50%; }
        .visit-info-card h3 { font-size: 1.6rem; margin-bottom: 0.8rem; color: var(--brown); font-family: var(--font-heading); }
        .visit-info-card p { opacity: 0.7; font-size: 1rem; line-height: 1.5; }
        .hours-v2 { margin-top: 1.5rem; display: flex; flex-direction: column; gap: 0.8rem; width: 100%; max-width: 280px; }
        .h-row { display: flex; justify-content: space-between; font-size: 1rem; padding-bottom: 0.8rem; border-bottom: 1px dashed rgba(107,58,31,0.1); }
        .h-row:last-child { border-bottom: none; }
        .h-row span { opacity: 0.6; font-weight: 600; }
        .h-row strong { color: var(--brown); font-weight: 800; }
        .nav-link-v2 { display: inline-flex; align-items: center; gap: 0.8rem; margin-top: 2rem; color: var(--orange); font-weight: 800; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1.5px; text-decoration: none; border: 2px solid var(--orange); padding: 0.8rem 1.5rem; border-radius: 50px; transition: 0.3s; }
        .nav-link-v2:hover { background: var(--orange); color: white; }
        .phone-link { display: block; margin-top: 1.2rem; font-size: 1.8rem; font-weight: 900; color: var(--brown); text-decoration: none; transition: 0.3s; }
        .phone-link:hover { color: var(--orange); transform: scale(1.05); }
        .visit-map-v2 { height: 600px; box-shadow: 0 30px 60px rgba(107,58,31,0.1); border-radius: 40px; overflow: hidden; border: 8px solid white; position: relative; background: #eee; }
        .visit-map-v2 iframe { width: 100%; height: 100%; border: 0; display: block; filter: saturate(0.7) contrast(1.1) brightness(1.02); }

        /* Footer v3 Redesign */
        .footer-v3 { padding: 100px 0 40px; background: #2a1a0f; color: var(--cream); position: relative; overflow: hidden; }
        .footer-main-area { display: flex; flex-direction: column; align-items: center; margin-bottom: 100px; }
        .footer-branding { text-align: center; margin-bottom: 80px; width: 100%; max-width: 800px; }
        .footer-giant-logo { 
          height: 240px; 
          width: auto; 
          margin-bottom: 2rem; 
          filter: drop-shadow(0 15px 30px rgba(0,0,0,0.3));
          transition: 0.5s ease;
        }
        .footer-giant-logo:hover { transform: scale(1.05); }
        .footer-tagline { font-family: var(--font-heading); font-size: 1.6rem; font-style: italic; opacity: 0.8; margin-bottom: 2.5rem; letter-spacing: 0.5px; }
        .footer-social-wrap { display: flex; gap: 1.5rem; justify-content: center; }
        .footer-soc-link { background: rgba(255,255,255,0.06); width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: 0.4s; color: white; border: 1px solid rgba(255,255,255,0.1); }
        .footer-soc-link:hover { background: var(--orange); border-color: var(--orange); transform: translateY(-5px); color: #fff; }
        
        .footer-grid-v3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6rem; width: 100%; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 80px; }
        .footer-col h3 { color: white; font-size: 1.1rem; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 2rem; font-weight: 800; font-family: var(--font-heading); }
        .footer-col p { opacity: 0.6; line-height: 1.8; font-size: 1rem; }
        .footer-nav-list { display: flex; flex-direction: column; gap: 1rem; }
        .footer-nav-list button { background: none; border: none; color: white; opacity: 0.5; text-align: left; padding: 0; font-size: 1.05rem; cursor: pointer; transition: 0.3s; }
        .footer-nav-list button:hover { opacity: 1; color: var(--orange); padding-left: 8px; }
        .footer-contact-info { display: flex; flex-direction: column; gap: 1.2rem; }
        .footer-contact-info p { display: flex; align-items: flex-start; gap: 1rem; text-align: left; opacity: 0.7; }
        
        .footer-legal { border-top: 1px solid rgba(255,255,255,0.05); padding-top: 40px; display: flex; justify-content: space-between; align-items: center; opacity: 0.4; font-size: 0.88rem; font-weight: 500; }
        .legal-right { display: flex; gap: 2.5rem; }
        .legal-right a { color: white; text-decoration: none; transition: 0.3s; }
        .legal-right a:hover { color: var(--orange); }



        :root {
          --whatsapp: #25D366;
        }

        /* Order Popup */
        .order-popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 2rem;
        }
        .order-popup {
          background: linear-gradient(135deg, #FDF6EC 0%, #FFFDF9 100%);
          width: 100%;
          max-width: 440px;
          border-radius: 40px;
          padding: 3.5rem 2.5rem 3rem;
          position: relative;
          text-align: center;
          box-shadow: 0 40px 100px rgba(62,31,8,0.25);
          border: 1px solid rgba(107,58,31,0.08);
        }
        .close-popup {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(0,0,0,0.05);
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: 0.3s;
          color: var(--brown);
        }
        .close-popup:hover {
          background: var(--brown);
          color: white;
          transform: rotate(90deg);
        }
        .popup-logo {
          height: 90px;
          margin-bottom: 1.5rem;
        }
        .popup-header h3 {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          margin-bottom: 0.8rem;
          color: var(--brown);
        }
        .popup-header p {
          opacity: 0.7;
          margin-bottom: 2rem;
          line-height: 1.4;
          font-size: 0.95rem;
        }
        .popup-options {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .popup-btn {
          display: flex;
          align-items: center;
          padding: 1.2rem 2.5rem;
          border-radius: 20px;
          font-weight: 800;
          font-size: 1.1rem;
          text-decoration: none;
          transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          border: none;
          cursor: pointer;
          font-family: var(--font-heading);
          text-transform: uppercase;
          letter-spacing: 1.5px;
          position: relative;
          overflow: hidden;
        }
        .popup-btn.centered { justify-content: center; text-align: center; }
        .popup-btn.dd { background: #FF3008; color: white; box-shadow: 0 12px 24px rgba(255, 48, 8, 0.25); }
        .popup-btn.ue { background: #06C167; color: white; box-shadow: 0 12px 24px rgba(6, 193, 103, 0.25); }
        .popup-btn.dine { 
          background: white; 
          color: var(--brown); 
          border: 2px solid var(--brown);
          justify-content: center;
          padding: 1.2rem;
        }
        .popup-btn.dine .brand-icon-wrap { margin-right: 0.8rem; width: 24px; }
        .popup-btn img[alt="UberEats"], .popup-btn img[alt="DoorDash"] {
          filter: brightness(0) invert(1); /* Make black SVG logos white */
        }
        .popup-btn:hover { 
          transform: translateY(-5px) scale(1.02); 
          box-shadow: 0 15px 30px rgba(0,0,0,0.15); 
        }
        .popup-btn.dd:hover { background: #E22A07; }
        .popup-btn.ue:hover { background: #05a357; }
        .popup-btn.dine:hover { background: var(--brown); color: white; }
        
        .popup-divider {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin: 0.5rem 0;
          opacity: 0.3;
        }
        .popup-divider::before, .popup-divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: currentColor;
        }
        .popup-divider span { font-size: 0.8rem; font-weight: 900; font-family: var(--font-heading); color: var(--brown); }

        /* Floating WhatsApp */
        .floating-whatsapp {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 999;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background: white;
          padding: 8px 8px 8px 18px;
          border-radius: 50px;
          box-shadow: 0 12px 28px rgba(0,0,0,0.14);
          text-decoration: none;
          transition: 0.25s ease;
        }
        .wa-label {
          color: var(--espresso);
          font-weight: 700;
          font-family: var(--font-heading);
          text-transform: uppercase;
          letter-spacing: 1.2px;
          font-size: 0.72rem;
        }
        .wa-icon {
          background: var(--whatsapp);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: wa-pulse 2.4s infinite;
        }
        .floating-whatsapp:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 32px rgba(37, 211, 102, 0.25);
        }
        @keyframes wa-pulse {
          0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.4); }
          70% { box-shadow: 0 0 0 20px rgba(37, 211, 102, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }

        @media (max-width: 768px) {
          .floating-whatsapp { 
            padding: 6px; 
            right: 14px; 
            bottom: 14px; 
            box-shadow: 0 10px 22px rgba(0,0,0,0.18);
          }
          .wa-label { display: none; }
          .wa-icon {
            width: 46px;
            height: 46px;
          }
          
          .order-popup { 
            padding: 2.5rem 1.5rem 2rem; 
            max-width: 92%;
            border-radius: 30px;
          }
          .popup-logo { height: 75px; }
          .popup-header h3 { font-size: 1.6rem; }
          .popup-btn { padding: 1.1rem 1.5rem; font-size: 0.95rem; }

          .container { padding: 0 1.5rem; }
          
          /* Section Basics */
          .section-header { margin-bottom: 2rem; text-align: center !important; }
          .section-header h2 { font-size: 2.4rem; line-height: 1.1; margin-bottom: 0.8rem; }
          .sub-tag { font-size: 1rem; margin-bottom: 0.2rem; text-transform: uppercase; letter-spacing: 2px; }
          .about-section, .gallery-section, .events-section, .visit-section, .reviews-section { padding: 60px 0; }

          /* Hero Mobile Fix */
          .hero-section { min-height: calc(100svh - 68px); }
          .hero-bg-image { object-position: center; }
          .hero-overlay { background: linear-gradient(180deg, rgba(15, 10, 6, 0.02) 0%, rgba(15, 10, 6, 0.46) 48%, rgba(15, 10, 6, 0.84) 100%); }
          .hero-container { grid-template-columns: 1fr; gap: 2rem; padding-bottom: 6rem; }
          .hero-headline { font-size: 1.9rem; line-height: 0.95; }
          .hero-cta-group { justify-content: flex-start; }

          /* About Mobile */
          .about-grid { grid-template-columns: 1fr !important; gap: 3rem; text-align: center; }
          .about-image-wrap { order: 2; margin: 0 auto; width: 100%; max-width: 450px; }
          .about-text-wrap { order: 1; display: flex; flex-direction: column; align-items: center; }
          .about-img { height: 350px; border-radius: 25px; }
          .about-desc { font-size: 1.1rem; margin-bottom: 2rem; line-height: 1.7; }
          .about-features { gap: 1.5rem; width: 100%; }
          .a-feat { flex-direction: column; align-items: center; text-align: center; gap: 0.6rem; }
          .about-badge { right: 10px; bottom: 20px; padding: 1rem; box-shadow: 0 10px 30px rgba(0,0,0,0.15); }

          /* POS Menu Mobile */
          .menu-pos-sidebar { display: none; }
          .menu-pos-body { padding: 0 1rem; height: auto; }
          .menu-pos-content { overflow-y: visible; gap: 36px; }
          .menu-pos-grid { grid-template-columns: 1fr; gap: 10px; }
          .menu-pos-card { height: auto; padding: 12px; }
          .menu-pos-img { width: 85px; height: 85px; }

          /* Gallery Grid */
          .gallery-grid-v2 { grid-template-columns: 1fr !important; grid-template-rows: auto !important; gap: 1.5rem; margin-top: 1.5rem; }
          .g-item { height: 320px; border-radius: 20px; }

          .g-large { height: 320px; grid-row: auto !important; }
          .g-info { opacity: 1; transform: translateY(0); padding: 2.2rem 1.5rem 1.5rem; background: linear-gradient(transparent, rgba(62,31,0,0.85)); }
          .g-info h4 { font-size: 1.45rem; }


          /* Reviews Mobile - Swipeable Cards */
          .reviews-grid { 
            display: flex; 
            overflow-x: auto; 
            scroll-snap-type: x mandatory; 
            gap: 1.25rem; 
            margin: 0 -1.5rem;
            padding: 1rem 1.5rem 3.5rem;
            scrollbar-width: none; 
          }
          .reviews-grid::-webkit-scrollbar { display: none; }
          .review-card { 
            min-width: 285px; 
            max-width: 285px;
            flex: 0 0 auto; 
            scroll-snap-align: center;
            padding: 2.5rem 1.8rem 2rem;
            border-radius: 30px;
          }

          /* Events Mobile */
          .events-grid { grid-template-columns: 1fr !important; gap: 3.5rem; text-align: center; }
          .events-text { display: flex; flex-direction: column; align-items: center; }
          .event-list { margin-top: 2.5rem; gap: 1.5rem; width: 100%; }
          .event-item { flex-direction: column; text-align: center; gap: 1rem; padding-bottom: 2rem; }
          .event-date { min-width: 85px; padding: 0.8rem; border-radius: 18px; margin: 0 auto; }
          .event-info h3 { font-size: 1.5rem; margin-bottom: 0.4rem; }
          .events-img { height: 320px; border-radius: 30px; }

          /* Visit Mobile */
          .visit-layout-v2 { grid-template-columns: 1fr !important; gap: 2.5rem; }
          .visit-info-card { padding: 2.5rem 1.5rem; border-radius: 30px; }
          .phone-link { font-size: 1.6rem; }
          .visit-map-v2 { height: 380px; border-radius: 30px; border-width: 4px; }
          
          /* Footer Mobile */
          .footer-v3 { padding: 80px 0 40px; }
          .footer-main-area { margin-bottom: 60px; }
          .footer-giant-logo { height: 160px; margin-bottom: 1.5rem; }
          .footer-branding { margin-bottom: 50px; }
          .footer-tagline { font-size: 1.3rem; margin-bottom: 2rem; }
          .footer-grid-v3 { grid-template-columns: 1fr !important; gap: 3.5rem; text-align: center; padding-top: 50px; }
          .footer-col h3 { margin-bottom: 1.2rem; font-size: 1rem; }
          .footer-nav-list { align-items: center; }
          .footer-contact-info p { justify-content: center; }
          .footer-legal { flex-direction: column; gap: 1.2rem; text-align: center; padding-top: 30px; }
          .legal-right { gap: 1.5rem; }
        }
        `}} />
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="scroll-to-top"
          >
            <ArrowUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div >
  );
};

export default LandingPage;
