import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart, Truck, Instagram, Facebook } from 'lucide-react';

const brandLogo = '/images/Naati Dosa Logo-01.png';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    if (!isHomePage) {
      setActiveSection(location.pathname === '/menu' ? 'menu' : 'home');
      return undefined;
    }

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sections = ['home', 'about', 'gallery', 'reviews', 'events', 'visit'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHomePage, location.pathname]);

  useEffect(() => {
    if (location.pathname === '/menu') {
      setActiveSection('menu');
      return;
    }

    if (location.pathname === '/' && location.hash) {
      setActiveSection(location.hash.replace('#', ''));
      return;
    }

    if (location.pathname === '/') {
      setActiveSection('home');
    }
  }, [location.hash, location.pathname]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
    setActiveSection(id);
  };

  const navigateToSection = (id: string) => {
    if (id === 'menu') {
      navigate('/menu');
      setIsMenuOpen(false);
      setActiveSection('menu');
      return;
    }

    if (isHomePage) {
      scrollToSection(id);
      return;
    }

    if (id === 'home') {
      navigate('/');
    } else {
      navigate({ pathname: '/', hash: `#${id}` });
    }

    setIsMenuOpen(false);
    setActiveSection(id);
  };

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'menu', label: 'Menu' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'events', label: 'Events' },
  ];

  return (
    <nav className="sticky-nav">
      <div className="container nav-content">
        <Link
          to="/"
          className="brand-group"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setIsMenuOpen(false);
            setActiveSection('home');
          }}
        >
          <img src={brandLogo} alt="Naati Dosa Logo" className="nav-brand-logo" />
        </Link>

        {/* Desktop Links */}
        <div className="nav-links desktop-only">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => navigateToSection(item.id)}
              className={activeSection === item.id ? 'active' : ''}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Action Buttons & Toggle */}
        <div className="nav-actions">
          <div className="nav-cta desktop-only">
            <button onClick={() => window.dispatchEvent(new Event('openOrderPopup'))} className="btn-order">
              Order Online
            </button>
          </div>

          <button className={`mobile-toggle ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mobile-drawer"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="drawer-bg-logo">
              <img src={brandLogo} alt="" />
            </div>

            <div className="drawer-content">
              <div className="drawer-links">
                {menuItems.map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    onClick={() => navigateToSection(item.id)}
                    className={activeSection === item.id ? 'active' : ''}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>

              <div className="drawer-footer">
                <div className="drawer-cta">
                  <button onClick={() => { window.dispatchEvent(new Event('openOrderPopup')); setIsMenuOpen(false); }} className="btn-order full-btn">
                    Order Online
                  </button>
                  <button onClick={() => navigateToSection('visit')} className="full-btn secondary">
                    Find Our Truck
                  </button>
                </div>

                <div className="drawer-socials">
                  <a href="https://www.instagram.com/naati_Dosa" target="_blank" rel="noopener noreferrer"><Instagram size={20} /></a>
                  <a href="https://www.facebook.com/people/Naati-Dosa/61587689076429/" target="_blank" rel="noopener noreferrer"><Facebook size={20} /></a>
                  <a href="#"><Truck size={20} /></a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{
        __html: `
        .sticky-nav {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: rgba(253, 246, 236, 0.94);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid rgba(107, 58, 31, 0.08);
          height: 85px;
          display: flex;
          align-items: center;
          transition: all 0.4s ease;
        }
        .nav-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 1002;
        }
        .brand-group {
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          position: relative;
          z-index: 10;
          width: 140px;
          height: 100%;
        }
        .nav-brand-logo {
          height: 135px;
          width: auto;
          object-fit: contain;
          filter: drop-shadow(0 4px 15px rgba(0,0,0,0.1));
          transition: 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .nav-links {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          margin: 0 1.5rem;
        }
        .nav-links button {
          font-family: inherit;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.8px;
          font-size: 0.8rem;
          color: #5C3A1E;
          background: none;
          border: none;
          cursor: pointer;
          transition: 0.3s;
          position: relative;
        }
        .nav-links button:hover, .nav-links button.active {
          color: #F0A500;
        }
        .nav-links button::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: #F0A500;
          transition: 0.3s;
        }
        .nav-links button.active::after {
          width: 100%;
        }
        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .nav-cta {
          display: flex;
          gap: 1rem;
        }
        .nav-cta button {
          background: #F0A500;
          color: white;
          padding: 0.72rem 1.45rem;
          border-radius: 50px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 1.3px;
          font-size: 0.74rem;
          border: none;
          cursor: pointer;
          transition: 0.3s ease;
          white-space: nowrap;
        }
        .btn-order {
          background: var(--brown) !important;
          color: white !important;
          box-shadow: 0 8px 20px rgba(107, 58, 31, 0.22);
        }
        .btn-order:hover {
          transform: translateY(-1px);
          box-shadow: 0 12px 26px rgba(107, 58, 31, 0.28);
        }
        .mobile-toggle {
          display: none;
          background: var(--brown);
          border: none;
          color: white;
          cursor: pointer;
          width: 50px;
          height: 50px;
          border-radius: 15px;
          align-items: center;
          justify-content: center;
          transition: 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 0 8px 20px rgba(62,31,0,0.15);
        }
        .mobile-toggle.active {
          background: var(--orange);
          transform: rotate(90deg);
        }

        /* Mobile Drawer */
        .mobile-drawer {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: #FDF6EC;
          z-index: 1001;
          display: flex;
          flex-direction: column;
          padding-top: 100px;
          overflow: hidden;
        }
        .drawer-bg-logo {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-15deg);
          opacity: 0.04;
          width: 80%;
          max-width: 400px;
          pointer-events: none;
        }
        .drawer-bg-logo img {
          width: 100%;
          height: auto;
        }
        .drawer-content {
          padding: 3rem 2.5rem;
          display: flex;
          flex-direction: column;
          height: calc(100vh - 100px);
          justify-content: space-between;
          position: relative;
          z-index: 2;
        }
        .drawer-links {
          display: flex;
          flex-direction: column;
          gap: 1.8rem;
        }
        .drawer-links button {
          font-family: var(--font-heading);
          font-size: 2.8rem;
          font-weight: 900;
          text-transform: italic;
          font-style: italic;
          color: var(--brown);
          background: none;
          border: none;
          text-align: left;
          letter-spacing: -1px;
          transition: 0.3s;
          opacity: 0.8;
        }
        .drawer-links button.active {
          opacity: 1;
          color: var(--orange);
          padding-left: 10px;
        }
        .drawer-footer {
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          padding-bottom: 2rem;
        }
        .drawer-cta {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .full-btn {
          width: 100%;
          padding: 1.2rem !important;
          font-size: 1rem !important;
          border-radius: 20px !important;
          font-family: var(--font-heading) !important;
        }
        .full-btn.secondary {
          background: white !important;
          color: var(--brown) !important;
          border: 2px solid var(--brown) !important;
        }
        .drawer-socials {
          display: flex;
          gap: 2rem;
          justify-content: center;
          color: var(--brown);
          opacity: 0.6;
        }
        .drawer-socials a:hover {
          color: var(--orange);
          opacity: 1;
        }

        @media (max-width: 1100px) {
          .nav-brand-logo { height: 110px; }
          .brand-group { width: 110px; }
          .nav-links { display: none; }
          .desktop-only { display: none; }
          .mobile-toggle { display: flex; }
          .sticky-nav { height: 80px; }
        }
        @media (max-width: 768px) {
          .nav-brand-logo { height: 95px; }
          .brand-group { width: 95px; }
          .nav-content { padding: 0 1.2rem; }
          .sticky-nav { height: 75px; }
          .drawer-links button { font-size: 2.2rem; }
        }
      `}} />
    </nav>
  );
};

export default Navbar;
