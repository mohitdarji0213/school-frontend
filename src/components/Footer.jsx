import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import { GiBookshelf } from 'react-icons/gi';

const Footer = () => {
  return (
    <footer style={{ background: 'var(--navy)', color: 'rgba(255,255,255,0.8)', marginTop: 0 }}>
      {/* CTA Strip */}
      <div style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-light))', padding: '28px 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h3 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--navy)', fontSize: 22, marginBottom: 4 }}>
              Admissions Open for 2024-25 Session
            </h3>
            <p style={{ color: 'var(--navy)', opacity: 0.8, fontSize: 14 }}>Limited seats available. Register now to secure your child's future.</p>
          </div>
          <Link to="/admissions/register" className="btn-navy" style={{ background: 'var(--navy)', flexShrink: 0 }}>
            Register Now →
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div style={{ padding: '60px 0 30px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 40, marginBottom: 48 }}>
            {/* School Info */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{
                  width: 48, height: 48,
                  background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <GiBookshelf size={24} color="var(--navy)" />
                </div>
                <div>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: 16, color: 'white', lineHeight: 1.2 }}>
                    LBS School
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--gold)', letterSpacing: 1 }}>EST. 1975</div>
                </div>
              </div>
              <p style={{ fontSize: 14, lineHeight: 1.8, marginBottom: 20, color: 'rgba(255,255,255,0.65)' }}>
                Lal Bahadur Shastri Senior Secondary School — providing quality education with strong values and character development since 1975.
              </p>
              <div style={{ display: 'flex', gap: 12 }}>
                {[
                  { icon: <FaFacebook />, href: '#' },
                  { icon: <FaYoutube />, href: '#' },
                  { icon: <FaWhatsapp />, href: '#' },
                ].map((s, i) => (
                  <a key={i} href={s.href} style={{
                    width: 36, height: 36, background: 'rgba(255,255,255,0.08)', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--gold)', fontSize: 16, transition: 'all 0.2s'
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.color = 'var(--navy)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'var(--gold)'; }}
                  >{s.icon}</a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ color: 'var(--gold)', fontFamily: 'Playfair Display, serif', marginBottom: 20, fontSize: 18 }}>Quick Links</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { label: 'About School', path: '/about' },
                  { label: "Principal's Message", path: '/about/principal-message' },
                  { label: 'Admissions', path: '/admissions' },
                  { label: 'Fee Structure', path: '/admissions/fee-structure' },
                  { label: 'Our Staff', path: '/staff' },
                  { label: 'Gallery', path: '/gallery' },
                  { label: 'Results', path: '/academics/results' },
                ].map(l => (
                  <li key={l.path}>
                    <Link to={l.path} style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: 8 }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.65)'}
                    >
                      <span style={{ color: 'var(--gold)', fontSize: 10 }}>►</span> {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Classes */}
            <div>
              <h4 style={{ color: 'var(--gold)', fontFamily: 'Playfair Display, serif', marginBottom: 20, fontSize: 18 }}>Classes Offered</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {['Nursery', 'KG', 'Class 1st', 'Class 2nd', 'Class 3rd', 'Class 4th', 'Class 5th', 'Class 6th', 'Class 7th', 'Class 8th'].map(c => (
                  <div key={c} style={{
                    background: 'rgba(255,255,255,0.05)', borderRadius: 8, padding: '6px 12px',
                    fontSize: 13, color: 'rgba(255,255,255,0.75)', border: '1px solid rgba(201,168,76,0.15)'
                  }}>{c}</div>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 style={{ color: 'var(--gold)', fontFamily: 'Playfair Display, serif', marginBottom: 20, fontSize: 18 }}>Contact Us</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { icon: <FaMapMarkerAlt />, text: '123 Education Colony, Near Shastri Park,\nJaipur, Rajasthan - 302001' },
                  { icon: <FaPhone />, text: '+91 98765 43210\n+91 01412 345678' },
                  { icon: <FaEnvelope />, text: 'info@lbsschool.edu.in\nadmin@lbsschool.edu.in' },
                ].map((c, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12 }}>
                    <span style={{ color: 'var(--gold)', marginTop: 2, flexShrink: 0 }}>{c.icon}</span>
                    <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', whiteSpace: 'pre-line', lineHeight: 1.6 }}>{c.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
              © 2024 Lal Bahadur Shastri Senior Secondary School. All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: 20 }}>
              {['Privacy Policy', 'Terms of Use', 'Sitemap'].map(l => (
                <Link key={l} to="#" style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
                >{l}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
