import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import {
  FaGraduationCap, FaUsers, FaTrophy, FaBookOpen,
  FaArrowRight, FaPlay, FaStar, FaBullhorn,
  FaCalendarAlt, FaChalkboardTeacher, FaShieldAlt, FaBus
} from 'react-icons/fa';
import { GiBookshelf, GiMedal } from 'react-icons/gi';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: <FaGraduationCap />, value: 2800, label: 'Students Enrolled', suffix: '+' },
  { icon: <FaChalkboardTeacher />, value: 65, label: 'Expert Teachers', suffix: '+' },
  { icon: <FaTrophy />, value: 48, label: 'Years of Excellence', suffix: '' },
  { icon: <GiMedal />, value: 320, label: 'Awards Won', suffix: '+' },
];

const features = [
  { icon: <FaBookOpen size={28} />, title: 'Quality Education', desc: 'CBSE curriculum with focus on holistic development and academic excellence from Nursery to Class 8.' },
  { icon: <FaShieldAlt size={28} />, title: 'Safe Campus', desc: 'CCTV surveillance, trained security staff, and child-friendly environment for complete safety.' },
  { icon: <FaUsers size={28} />, title: 'Expert Faculty', desc: '65+ highly qualified and experienced teachers dedicated to student success.' },
  { icon: <GiMedal size={28} />, title: 'Co-curricular', desc: 'Sports, arts, science fairs, cultural events ensuring all-round personality development.' },
  { icon: <FaBus size={28} />, title: 'Transport', desc: 'Safe and comfortable school bus service covering major routes in the city.' },
  { icon: <FaGraduationCap size={28} />, title: 'Smart Classes', desc: 'Digital classrooms, projectors, and modern teaching aids for interactive learning.' },
];

const notices = [
  { type: 'Exam', title: 'Half Yearly Examination Schedule 2024', date: 'Oct 15, 2024', important: true },
  { type: 'Holiday', title: 'Diwali Holiday Notice - School closed Oct 28-Nov 2', date: 'Oct 10, 2024', important: false },
  { type: 'Admission', title: 'Admissions open for session 2025-26', date: 'Oct 5, 2024', important: true },
  { type: 'Sports', title: 'Annual Sports Day - November 20, 2024', date: 'Oct 1, 2024', important: false },
];

const Home = () => {
  const heroRef = useRef(null);
  const { ref: statsRef, inView: statsInView } = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text animation
      gsap.fromTo('.hero-badge', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.2 });
      gsap.fromTo('.hero-title', { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 0.4 });
      gsap.fromTo('.hero-subtitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.7 });
      gsap.fromTo('.hero-btns', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, delay: 0.9 });
      gsap.fromTo('.hero-decoration', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1.2, delay: 0.3, ease: 'power3.out' });

      // Feature cards scroll animation
      gsap.fromTo('.feature-card', {
        opacity: 0, y: 60
      }, {
        opacity: 1, y: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.features-section',
          start: 'top 75%',
        }
      });

      // Notice items
      gsap.fromTo('.notice-item', { opacity: 0, x: -30 }, {
        opacity: 1, x: 0, stagger: 0.1, duration: 0.6,
        scrollTrigger: { trigger: '.notices-section', start: 'top 80%' }
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef}>
      {/* ====== HERO ====== */}
      <section style={{
        minHeight: '92vh',
        background: 'linear-gradient(135deg, var(--navy) 0%, #1a3a5c 50%, #0d2137 100%)',
        display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Background pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(201,168,76,0.08) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(201,168,76,0.05) 0%, transparent 40%)`,
        }} />
        {/* Decorative circles */}
        <div className="hero-decoration" style={{
          position: 'absolute', right: '-5%', top: '50%', transform: 'translateY(-50%)',
          width: 600, height: 600,
          border: '1px solid rgba(201,168,76,0.1)',
          borderRadius: '50%', pointerEvents: 'none'
        }} />
        <div className="hero-decoration" style={{
          position: 'absolute', right: '5%', top: '50%', transform: 'translateY(-50%)',
          width: 400, height: 400,
          border: '1px solid rgba(201,168,76,0.08)',
          borderRadius: '50%', pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 720 }}>
            <div className="hero-badge" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(201,168,76,0.15)',
              border: '1px solid rgba(201,168,76,0.3)',
              borderRadius: 50, padding: '8px 20px',
              marginBottom: 24
            }}>
              <FaStar size={12} color="var(--gold)" />
              <span style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 500, letterSpacing: 1 }}>
                EXCELLENCE IN EDUCATION SINCE 1975
              </span>
            </div>

            <h1 className="hero-title" style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(36px, 6vw, 68px)',
              color: 'white', lineHeight: 1.15,
              marginBottom: 24
            }}>
              Lal Bahadur Shastri<br />
              <span style={{ color: 'var(--gold)' }}>Senior Secondary School</span>
            </h1>

            <p className="hero-subtitle" style={{
              fontSize: 18, color: 'rgba(255,255,255,0.72)',
              lineHeight: 1.75, marginBottom: 40, maxWidth: 560
            }}>
              Nurturing young minds with quality education, strong values, and holistic development.
              Classes Nursery to 8th | CBSE Affiliated | Admissions Open for 2025-26.
            </p>

            <div className="hero-btns" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/admissions/register" className="btn-primary">
                Apply for Admission <FaArrowRight />
              </Link>
              <Link to="/about" className="btn-secondary">
                <FaPlay size={12} /> Explore School
              </Link>
            </div>
          </div>
        </div>

        {/* Floating school card */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', right: '8%', bottom: '12%',
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 20, padding: '20px 24px',
            display: 'flex', alignItems: 'center', gap: 16,
            maxWidth: 280
          }}
          className="hero-floating"
        >
          <div style={{ width: 48, height: 48, background: 'var(--gold)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <GiBookshelf size={24} color="var(--navy)" />
          </div>
          <div>
            <div style={{ color: 'white', fontWeight: 700, fontSize: 15 }}>Admissions 2025-26</div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>Now accepting applications</div>
          </div>
        </motion.div>

        {/* Wave bottom */}
        <div style={{ position: 'absolute', bottom: -1, left: 0, right: 0 }}>
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 30C1200 0 960 60 720 30C480 0 240 60 0 30L0 60Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ====== STATS ====== */}
      <section style={{ padding: '60px 0', background: 'white' }} ref={statsRef}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                style={{
                  textAlign: 'center', padding: '32px 20px',
                  background: 'var(--cream)', borderRadius: 16,
                  border: '1px solid rgba(201,168,76,0.15)'
                }}
              >
                <div style={{ color: 'var(--gold)', fontSize: 32, marginBottom: 12 }}>{stat.icon}</div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 40, fontWeight: 700, color: 'var(--navy)', lineHeight: 1 }}>
                  {statsInView ? <CountUp end={stat.value} duration={2.5} /> : '0'}{stat.suffix}
                </div>
                <div style={{ color: 'var(--gray)', fontSize: 14, marginTop: 8 }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== FEATURES ====== */}
      <section className="features-section section-pad" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div className="text-center">
            <div className="badge badge-gold" style={{ marginBottom: 16 }}>Why Choose Us</div>
            <h2 className="section-title">Building Tomorrow's Leaders</h2>
            <div className="gold-line" />
            <p className="section-subtitle">We provide comprehensive education that goes beyond textbooks — developing character, skills, and lifelong values.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {features.map((f, i) => (
              <div key={i} className="feature-card card" style={{ padding: '32px 28px' }}>
                <div style={{
                  width: 60, height: 60,
                  background: 'linear-gradient(135deg, rgba(13,33,55,0.08), rgba(13,33,55,0.04))',
                  borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--navy)', marginBottom: 20
                }}>{f.icon}</div>
                <h3 style={{ fontSize: 20, marginBottom: 12, color: 'var(--navy)' }}>{f.title}</h3>
                <p style={{ color: 'var(--gray)', fontSize: 14, lineHeight: 1.75 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== NOTICE BOARD ====== */}
      <section className="notices-section section-pad " style={{ background: 'white' }}>
        <div className="container column-on-tablat">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
            {/* Notices */}
            <div>
              <div className="badge badge-navy" style={{ marginBottom: 16 }}>Latest Updates</div>
              <h2 className="section-title" style={{ marginBottom: 8 }}>Notice Board</h2>
              <div className="gold-line" style={{ margin: '12px 0 28px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {notices.map((n, i) => (
                  <div key={i} className="notice-item" style={{
                    display: 'flex', gap: 16, padding: '16px 20px',
                    background: n.important ? 'rgba(201,168,76,0.06)' : 'var(--gray-light)',
                    borderRadius: 12,
                    borderLeft: `4px solid ${n.important ? 'var(--gold)' : '#e5e7eb'}`
                  }}>
                    <div style={{ flexShrink: 0 }}>
                      <span className={`badge badge-${n.important ? 'gold' : 'navy'}`} style={{ fontSize: 10 }}>{n.type}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 500, fontSize: 14, color: 'var(--navy)', marginBottom: 4 }}>{n.title}</div>
                      <div style={{ fontSize: 12, color: 'var(--gray)' }}>{n.date}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/notices" className="btn-navy" style={{ marginTop: 24, display: 'inline-flex' }}>
                View All Notices <FaArrowRight />
              </Link>
            </div>

            {/* Quick Links Panel */}
            <div>
              <div className="badge badge-gold" style={{ marginBottom: 16 }}>Quick Access</div>
              <h2 className="section-title" style={{ marginBottom: 8 }}>Important Links</h2>
              <div className="gold-line" style={{ margin: '12px 0 28px' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  { icon: <FaGraduationCap />, label: 'Admissions', path: '/admissions', color: '#1a5276' },
                  { icon: <FaClipboardList />, label: 'Results', path: '/academics/results', color: '#1e8449' },
                  { icon: <FaCalendarAlt />, label: 'Events', path: '/events', color: '#7d3c98' },
                  { icon: <FaImages />, label: 'Gallery', path: '/gallery', color: '#b9770e' },
                  { icon: <FaChalkboardTeacher />, label: 'Our Staff', path: '/staff', color: '#1a5276' },
                  { icon: <FaBullhorn />, label: 'Notices', path: '/notices', color: '#c0392b' },
                ].map((item, i) => (
                  <Link key={i} to={item.path} style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
                    padding: '24px 16px', background: 'var(--cream)', borderRadius: 12,
                    color: item.color, fontWeight: 600, fontSize: 14,
                    border: '1px solid rgba(0,0,0,0.06)',
                    transition: 'all 0.25s'
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = item.color; e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'var(--cream)'; e.currentTarget.style.color = item.color; e.currentTarget.style.transform = 'none'; }}
                  >
                    <span style={{ fontSize: 28 }}>{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== PRINCIPAL QUOTE ====== */}
      <section style={{ background: 'linear-gradient(135deg, var(--navy), var(--navy-light))', padding: '80px 0' }}>
        <div className="container text-center">
          <div style={{ maxWidth: 700, margin: '0 auto' }}>
            <div style={{ fontSize: 60, color: 'var(--gold)', fontFamily: 'Playfair Display, serif', lineHeight: 0.5, marginBottom: 24 }}>"</div>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 20, lineHeight: 1.8, fontStyle: 'italic', fontFamily: 'Playfair Display, serif', marginBottom: 32 }}>
              Education is not just about acquiring knowledge; it is about igniting a passion for learning
              and building the character to use that knowledge wisely for the betterment of society.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 60, height: 60, background: 'var(--gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                <FaChalkboardTeacher size={26} color="var(--navy)" />
              </div>
              <strong style={{ color: 'var(--gold)', fontSize: 16 }}>Dr. Ramesh Kumar Sharma</strong>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>Principal, LBS Senior Secondary School</span>
            </div>
          </div>
        </div>
      </section>

      {/* ====== CTA ====== */}
      <section style={{ background: 'var(--cream)', padding: '80px 0' }}>
        <div className="container text-center">
          <h2 className="section-title" style={{ marginBottom: 16 }}>
            Begin Your Child's Journey With Us
          </h2>
          <p style={{ color: 'var(--gray)', fontSize: 17, marginBottom: 36, maxWidth: 500, margin: '0 auto 36px' }}>
            Admissions for session 2025-26 are now open. Limited seats available. Register today!
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/admissions/register" className="btn-primary" style={{ fontSize: 16, padding: '16px 36px' }}>
              Register Now <FaArrowRight />
            </Link>
            <Link to="/contact" className="btn-navy" style={{ fontSize: 16, padding: '16px 36px' }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

// Missing import fix
const FaClipboardList = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size || 20} height={size || 20} fill="currentColor" viewBox="0 0 16 16">
    <path d="M5 2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2h3a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4zm3-1a1 1 0 0 0-1 1h2a1 1 0 0 0-1-1zm-3 2H1v12h14V3H5z"/>
  </svg>
);

const FaImages = ({ size }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size||20} height={size||20} fill="currentColor" viewBox="0 0 16 16">
    <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
    <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z"/>
  </svg>
);
