import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import OrderPopup from '../components/OrderPopup';
import {
  getMenuCategorySlug,
  getMenuExplainer,
  getMenuImage,
  menuCategories,
  type MenuItem,
} from '../data/menu';
import { useOrderPopup } from '../hooks/useOrderPopup';

type MenuSection = {
  category: string;
  items: MenuItem[];
  slug: string;
};

const MenuPage = () => {
  const navigate = useNavigate();
  const { closePopup, openPopup, selectedMenuItem, showPopup } = useOrderPopup();
  const [searchTerm, setSearchTerm] = useState('');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const allSections: MenuSection[] = Object.entries(menuCategories).map(([category, items]) => ({
    category,
    items,
    slug: getMenuCategorySlug(category),
  }));

  const normalizedQuery = searchTerm.trim().toLowerCase();

  const filteredSections = allSections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => {
        // Search term filter
        const matchesSearch = !normalizedQuery || [
          section.category,
          item.name,
          item.desc,
        ]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery);

        return matchesSearch;
      }),
    }))
    .filter((section) => section.items.length > 0);

  const [activeCategory, setActiveCategory] = useState(filteredSections[0]?.slug || allSections[0]?.slug || '');

  useEffect(() => {
    if (!filteredSections.some((section) => section.slug === activeCategory)) {
      setActiveCategory(filteredSections[0]?.slug || '');
    }
  }, [activeCategory, filteredSections]);

  useEffect(() => {
    if (filteredSections.length === 0) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleSections.length === 0) {
          return;
        }

        setActiveCategory(visibleSections[0].target.id.replace('menu-', ''));
      },
      {
        root: null,
        rootMargin: '-180px 0px -55% 0px',
        threshold: [0.12, 0.3, 0.65],
      },
    );

    filteredSections.forEach((section) => {
      const target = sectionRefs.current[section.slug];

      if (target) {
        observer.observe(target);
      }
    });

    return () => observer.disconnect();
  }, [filteredSections]);

  const handleCategoryClick = (slug: string) => {
    setActiveCategory(slug);

    const targetSection = sectionRefs.current[slug];

    if (!targetSection) {
      return;
    }

    const navOffset = 180;
    const top = targetSection.getBoundingClientRect().top + window.scrollY - navOffset;

    window.scrollTo({
      top,
      behavior: 'smooth',
    });
  };

  return (
    <div className="menu-page">
      <OrderPopup
        show={showPopup}
        selectedMenuItem={selectedMenuItem}
        onClose={closePopup}
        onPickup={() => {
          closePopup();
          navigate({ pathname: '/', hash: '#visit' });
        }}
      />

      <section className="menu-list-shell">
        <div className="container">
          <div className="menu-mobile-top" aria-label="Browse menu categories on mobile">
            <div className="mobile-search-shell">
              <Search size={16} className="side-search-icon" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search menu"
                className="side-search-input"
              />
            </div>

            <nav className="mobile-category-strip">
              {filteredSections.map((section) => (
                <button
                  key={`mobile-${section.slug}`}
                  type="button"
                  className={`mobile-category-chip ${activeCategory === section.slug ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(section.slug)}
                  aria-pressed={activeCategory === section.slug}
                >
                  {section.category.split('(')[0].trim()}
                </button>
              ))}
            </nav>
          </div>

          <div className="menu-layout">
            <aside className="menu-side-panel" aria-label="Browse menu categories">
              <div className="side-search-shell">
                <Search size={16} className="side-search-icon" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search menu"
                  className="side-search-input"
                />
              </div>

              <nav className="side-category-list">
                {filteredSections.map((section) => (
                  <button
                    key={`side-${section.slug}`}
                    type="button"
                    className={`side-category-btn ${activeCategory === section.slug ? 'active' : ''}`}
                    onClick={() => handleCategoryClick(section.slug)}
                    aria-pressed={activeCategory === section.slug}
                  >
                    {section.category.split('(')[0].trim()}
                  </button>
                ))}
              </nav>
            </aside>

            <div className="menu-board-content">
              {filteredSections.length === 0 && (
                <div className="menu-empty-state">
                  <h2>No matching menu items</h2>
                  <p>Try changing your diet filters or search term.</p>
                  <button onClick={() => { setSearchTerm(''); }} className="clear-filters">
                    Clear All Filters
                  </button>
                </div>
              )}

              {filteredSections.map((section, sectionIndex) => (
                <motion.section
                  key={section.slug}
                  id={`menu-${section.slug}`}
                  className="menu-group"
                  ref={(node) => {
                    sectionRefs.current[section.slug] = node;
                  }}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.42, delay: sectionIndex * 0.03 }}
                >
                  <div className="menu-group-heading">
                    <h2 className="serif-font">{section.category}</h2>
                    {getMenuExplainer(section.category) && (
                      <p className="category-explainer">{getMenuExplainer(section.category)}</p>
                    )}
                  </div>

                  <div className="menu-group-grid">
                    {section.items.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className="menu-item-card"
                        onClick={() => openPopup(item.name)}
                        aria-label={`Order ${item.name}`}
                      >
                        <div className="menu-item-copy">
                          <div className="menu-item-title-block">
                            <h3>{item.name}</h3>
                          </div>

                          <div className="dietary-badges-row">
                            {item.isVegan && <span className="badge-v2 vegan" title="Vegan">V</span>}
                            {item.isGlutenFree && <span className="badge-v2 gf" title="Gluten Free">GF</span>}
                          </div>

                          <p className="menu-item-desc">{item.desc}</p>

                          <div className="menu-item-add" aria-hidden="true">
                            <Plus size={18} />
                          </div>
                        </div>

                        {getMenuImage(item.id) && (
                          <div className="menu-item-media">
                            <img
                              src={getMenuImage(item.id)}
                              alt={item.name}
                              onError={(event) => {
                                event.currentTarget.src = '/menu%20images/Plain%20DOAsa.jpg';
                              }}
                            />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.section>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style
        dangerouslySetInnerHTML={{
          __html: `
          .menu-page {
            min-height: 100vh;
            background: var(--cream);
            color: var(--espresso);
            padding-bottom: 80px;
          }

          .menu-list-shell {
            padding: 0 0 3rem;
          }

          .menu-layout {
            display: grid;
            grid-template-columns: 280px minmax(0, 1fr);
            gap: 1.5rem;
            align-items: start;
          }

          .menu-mobile-top {
            display: none;
          }

          .menu-side-panel {
            position: sticky;
            top: 200px;
            background: #fff;
            border-radius: 18px;
            border: 1px solid rgba(107, 58, 31, 0.14);
            padding: 0.85rem;
            max-height: calc(100vh - 220px);
            overflow: hidden;
            box-shadow: 0 12px 30px rgba(107, 58, 31, 0.1);
          }

          .side-search-shell {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            background: #fff;
            border: 1px solid rgba(107, 58, 31, 0.2);
            border-radius: 12px;
            padding: 0.6rem 0.7rem;
            margin-bottom: 0.8rem;
          }

          .side-search-icon {
            color: rgba(107, 58, 31, 0.65);
            flex-shrink: 0;
          }

          .side-search-input {
            width: 100%;
            border: none;
            outline: none;
            background: transparent;
            color: var(--espresso);
            font-size: 0.88rem;
          }

          .side-search-input::placeholder {
            color: rgba(107, 58, 31, 0.5);
          }

          .side-category-list {
            display: flex;
            flex-direction: column;
            gap: 0.9rem;
            max-height: calc(100vh - 300px);
            overflow-y: auto;
            padding-right: 4px;
          }

          .side-category-list::-webkit-scrollbar {
            width: 5px;
          }

          .side-category-list::-webkit-scrollbar-thumb {
            background: rgba(107, 58, 31, 0.25);
            border-radius: 999px;
          }

          .side-category-btn {
            width: 100%;
            text-align: left;
            background: transparent;
            color: var(--espresso);
            border-radius: 10px;
            padding: 0.95rem 0.9rem;
            font-size: 0.97rem;
            font-weight: 600;
            line-height: 1.4;
            font-family: var(--font-body);
          }

          .side-category-btn:hover {
            background: rgba(107, 58, 31, 0.08);
          }

          .side-category-btn.active {
            background: var(--brown);
            color: #fff;
            font-weight: 700;
          }

          .menu-board-content {
            min-width: 0;
          }

          .menu-empty-state {
            text-align: center;
            padding: 4rem 1rem;
          }

          .clear-filters {
            margin-top: 1.5rem;
            padding: 0.8rem 2rem;
            background: var(--brown);
            color: #fff;
            border-radius: 50px;
            font-weight: 700;
            font-size: 0.9rem;
          }

          .menu-group {
            margin-bottom: 4rem;
            scroll-margin-top: 200px;
          }

          .menu-group-heading {
            margin-bottom: 2.5rem;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }

          .menu-group-heading h2 {
            font-size: 2.2rem;
            color: var(--brown);
            margin-bottom: 0.25rem;
          }

          .serif-font {
            font-family: 'Playfair Display', serif;
            font-weight: 700;
          }

          .category-explainer {
            font-size: 1rem;
            color: #6B3A1F;
            max-width: 600px;
            line-height: 1.5;
            margin-bottom: 0;
            opacity: 0.8;
          }

          .heading-underline {
            width: 60px;
            height: 3px;
            background: var(--orange);
            margin-top: 0.5rem;
            border-radius: 2px;
          }

          .menu-group-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }

          .menu-item-card {
            display: flex;
            gap: 1rem;
            padding: 1.5rem;
            border-radius: 20px;
            background: #fff;
            border: 1px solid rgba(107, 58, 31, 0.08);
            text-align: left;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 4px 15px rgba(107, 58, 31, 0.03);
            position: relative;
            min-height: 160px;
          }

          .menu-item-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 35px rgba(107, 58, 31, 0.1);
            border-color: rgba(107, 58, 31, 0.2);
          }

          .menu-item-copy {
            flex: 1;
            display: flex;
            flex-direction: column;
            min-width: 0;
            padding-right: 20px;
          }

          .menu-item-title-block h3 {
            font-size: 1.2rem;
            font-weight: 800;
            color: var(--espresso);
            margin-bottom: 0.25rem;
          }

          .dietary-badges-row {
            display: flex;
            gap: 6px;
            margin-bottom: 0.75rem;
          }

          .menu-item-desc {
            font-size: 0.95rem;
            color: #777;
            line-height: 1.5;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
            margin-bottom: 0.5rem;
          }

          .badge-v2 {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 3px 8px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 900;
            letter-spacing: 0.05em;
          }

          .badge-v2.vegan { background: #E9F5EE; color: #2D6A4F; border: 1px solid #C7E9D9; }
          .badge-v2.gf { background: #F6F1EE; color: #B08968; border: 1px solid #E6D9CF; }

          .menu-item-add {
            position: absolute;
            bottom: 15px;
            right: 15px;
            width: 36px;
            height: 36px;
            background: rgba(107, 58, 31, 0.05);
            color: var(--brown);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(107, 58, 31, 0.1);
            transition: all 0.2s;
            z-index: 5;
          }

          .menu-item-card:hover .menu-item-add {
            background: var(--brown);
            color: white;
            transform: scale(1.1);
          }

          .menu-item-media {
            width: 140px;
            height: 120px;
            flex-shrink: 0;
            overflow: hidden;
            border-radius: 14px;
          }

          .menu-item-media img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .menu-item-card:hover .menu-item-media img {
            transform: scale(1.15);
          }

          @media (max-width: 1100px) {
            .menu-group {
              scroll-margin-top: 210px;
            }

            .menu-mobile-top {
              display: flex;
              flex-direction: column;
              gap: 0.7rem;
              position: sticky;
              top: 72px;
              z-index: 45;
              background: var(--cream);
              padding: 0.6rem 0 0.6rem;
              margin-bottom: 0.8rem;
            }

            .mobile-search-shell {
              display: flex;
              align-items: center;
              gap: 0.5rem;
              background: #fff;
              border: 1px solid rgba(107, 58, 31, 0.2);
              border-radius: 12px;
              padding: 0.58rem 0.7rem;
            }

            .mobile-category-strip {
              display: flex;
              gap: 0.5rem;
              overflow-x: auto;
              padding: 0.1rem 0;
              scrollbar-width: none;
            }

            .mobile-category-strip::-webkit-scrollbar {
              display: none;
            }

            .mobile-category-chip {
              flex-shrink: 0;
              border-radius: 999px;
              padding: 0.5rem 0.85rem;
              border: 1px solid rgba(107, 58, 31, 0.2);
              background: #fff;
              color: var(--espresso);
              font-size: 0.82rem;
              font-weight: 700;
              line-height: 1;
              white-space: nowrap;
              font-family: var(--font-body);
            }

            .mobile-category-chip.active {
              background: var(--brown);
              color: #fff;
              border-color: var(--brown);
            }

            .menu-layout {
              grid-template-columns: 1fr;
            }

            .menu-side-panel {
              display: none;
            }
          }

          @media (max-width: 900px) {
            .menu-group-grid {
              grid-template-columns: 1fr;
            }
          }

          @media (max-width: 600px) {
            .menu-item-card {
               padding: 1rem;
            }
            .menu-item-media {
              width: 90px;
              height: 80px;
            }
            .menu-group {
              scroll-margin-top: 140px;
            }
          }
          `,
        }}
      />
    </div>
  );
};

export default MenuPage;
