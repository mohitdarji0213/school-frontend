import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => (
  <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)' }}>
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ textAlign: 'center', padding: '40px 20px' }}
    >
      <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 120, fontWeight: 900, color: 'var(--navy)', lineHeight: 1, opacity: 0.08, marginBottom: -40 }}>404</div>
      <div style={{ fontSize: 60, marginBottom: 16 }}>🏫</div>
      <h1 style={{ color: 'var(--navy)', fontFamily: 'Playfair Display, serif', marginBottom: 12, fontSize: 32 }}>Page Not Found</h1>
      <p style={{ color: 'var(--gray)', marginBottom: 32, fontSize: 16 }}>
        The page you are looking for does not exist or has been moved.
      </p>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/" className="btn-primary">🏠 Go to Home</Link>
        <Link to="/contact" className="btn-navy">📞 Contact Us</Link>
      </div>
    </motion.div>
  </div>
);

export default NotFound;
