import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaChevronDown, FaPhone, FaEnvelope } from 'react-icons/fa';
import { GiBookshelf } from 'react-icons/gi';

const navItems = [
  {
    label: 'Home', path: '/'
  },
  {
    label: 'About Us', path: '/about',
    children: [
      { label: "Principal's Message", path: '/about/principal-message' },
      { label: 'School History', path: '/about/history' },
      { label: 'Vision & Mission', path: '/about/vision-mission' },
      { label: 'Infrastructure', path: '/infrastructure' },
    ]
  },
  {
    label: 'Academics', path: '/academics',
    children: [
      { label: 'Curriculum', path: '/academics/curriculum' },
      { label: 'Time Table', path: '/academics/timetable' },
      { label: 'Results', path: '/academics/results' },
      { label: 'Library', path: '/library' },
    ]
  },
  {
    label: 'Admissions', path: '/admissions',
    children: [
      { label: 'Admission Process', path: '/admissions' },
      { label: 'Online Registration', path: '/admissions/register' },
      { label: 'Fee Structure', path: '/admissions/fee-structure' },
      { label: 'Rules & Regulations', path: '/rules-regulations' },
      { label: 'Uniform', path: '/uniform' },
    ]
  },
  {
    label: 'Activities', path: '/sports',
    children: [
      { label: 'Sports', path: '/sports' },
      { label: 'Achievements', path: '/achievements' },
      { label: 'Events', path: '/events' },
    ]
  },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Our Staff', path: '/staff' },
  { label: 'Notices', path: '/notices' },
  { label: 'Transport', path: '/transport' },
  { label: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const location = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location]);

  return (
    <>
      {/* Top Bar */}
      <div style={{
        background: 'var(--navy)',
        color: 'rgba(255,255,255,0.8)',
        padding: '6px 0',
        fontSize: '13px'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <FaPhone size={11} style={{ color: 'var(--gold)' }} />
              +91 98765 43210
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <FaEnvelope size={11} style={{ color: 'var(--gold)' }} />
              info@lbsschool.edu.in
            </span>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <span>Session 2024-25 | Admissions Open</span>
            <span style={{ color: 'var(--gold)', fontWeight: 600 }}>
              <Link to="/admissions/register" style={{ color: 'var(--gold)' }}>Apply Now →</Link>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <motion.nav
        ref={navRef}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          background: scrolled ? 'rgba(255,255,255,0.98)' : 'white',
          boxShadow: scrolled ? '0 2px 30px rgba(0,0,0,0.12)' : '0 1px 0 rgba(0,0,0,0.06)',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px' }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 52, height: 52,
              background: 'linear-gradient(135deg, var(--navy), var(--navy-light))',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '3px solid var(--gold)',
              flexShrink: 0
            }}>
              <GiBookshelf size={26} color="var(--gold)" />
            </div>
            <div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 18, color: 'var(--navy)', lineHeight: 1.2 }}>
                Lal Bahadur Shastri
              </div>
              <div style={{ fontSize: 11, color: 'var(--gray)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                Senior Secondary School
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }} className="desktop-nav">
            {navItems.map(item => (
              <div
                key={item.path}
                style={{ position: 'relative' }}
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.path}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 4,
                    padding: '8px 12px',
                    fontSize: 14, fontWeight: 500,
                    color: location.pathname === item.path ? 'var(--gold)' : 'var(--navy)',
                    borderRadius: 8,
                    transition: 'all 0.2s',
                    background: location.pathname === item.path ? 'rgba(201,168,76,0.08)' : 'transparent',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {item.label}
                  {item.children && <FaChevronDown size={10} style={{ transition: 'transform 0.2s', transform: activeDropdown === item.label ? 'rotate(180deg)' : 'none' }} />}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {item.children && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      style={{
                        position: 'absolute', top: '100%', left: 0,
                        background: 'white',
                        borderRadius: 12,
                        boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
                        padding: 8,
                        minWidth: 200,
                        border: '1px solid rgba(201,168,76,0.15)'
                      }}
                    >
                      {item.children.map(child => (
                        <Link
                          key={child.path}
                          to={child.path}
                          style={{
                            display: 'block',
                            padding: '10px 16px',
                            fontSize: 14,
                            color: location.pathname === child.path ? 'var(--gold)' : 'var(--navy)',
                            borderRadius: 8,
                            transition: 'all 0.15s',
                            background: location.pathname === child.path ? 'rgba(201,168,76,0.08)' : 'transparent',
                            fontWeight: location.pathname === child.path ? 600 : 400
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = 'var(--cream)'; e.currentTarget.style.color = 'var(--gold)'; }}
                          onMouseLeave={e => {
                            e.currentTarget.style.background = location.pathname === child.path ? 'rgba(201,168,76,0.08)' : 'transparent';
                            e.currentTarget.style.color = location.pathname === child.path ? 'var(--gold)' : 'var(--navy)';
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ display: 'none', background: 'none', border: 'none', color: 'var(--navy)', padding: 8 }}
            className="mobile-toggle"
          >
            {mobileOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{ overflow: 'hidden', borderTop: '1px solid rgba(201,168,76,0.2)', background: 'white' }}
            >
              <div style={{ padding: '12px 20px 20px' }}>
                {navItems.map(item => (
                  <div key={item.path}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Link to={item.path} style={{ padding: '10px 0', display: 'block', color: 'var(--navy)', fontWeight: 500, fontSize: 15 }}>
                        {item.label}
                      </Link>
                      {item.children && (
                        <button
                          onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                          style={{ background: 'none', border: 'none', color: 'var(--gray)', padding: 8 }}
                        >
                          <FaChevronDown size={12} style={{ transform: mobileExpanded === item.label ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                        </button>
                      )}
                    </div>
                    <AnimatePresence>
                      {item.children && mobileExpanded === item.label && (
                        <motion.div
                          initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                          style={{ overflow: 'hidden', paddingLeft: 16 }}
                        >
                          {item.children.map(child => (
                            <Link key={child.path} to={child.path} style={{ display: 'block', padding: '8px 0', color: 'var(--gray)', fontSize: 14 }}>
                              → {child.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
