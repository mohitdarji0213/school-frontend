import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { FaLock, FaEnvelope, FaSchool, FaEye, FaEyeSlash } from 'react-icons/fa';

const AdminLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(form.email, form.password);
    console.log(form)
    if (result.success) {
      toast.success('Welcome back, Admin!');
      navigate('/admin');
    } else {
      toast.error(result.message);
      console.log("hellooooooooooooooooooooo")
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--navy) 0%, #1a3a5c 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px',
      position: 'relative', overflow: 'hidden'
    }}>
      {/* Background decoration */}
      <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: 600, height: 600, border: '1px solid rgba(201,168,76,0.08)', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: 400, height: 400, border: '1px solid rgba(201,168,76,0.06)', borderRadius: '50%' }} />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ background: 'white', borderRadius: 24, padding: '48px 44px', width: '100%', maxWidth: 440, position: 'relative', zIndex: 1, boxShadow: '0 25px 80px rgba(0,0,0,0.3)' }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            width: 72, height: 72,
            background: 'linear-gradient(135deg, var(--navy), var(--navy-light))',
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px', border: '4px solid var(--gold)'
          }}>
            <FaSchool size={32} color="var(--gold)" />
          </div>
          <h2 style={{ color: 'var(--navy)', fontFamily: 'Playfair Display, serif', fontSize: 26, marginBottom: 6 }}>Admin Panel</h2>
          <p style={{ color: 'var(--gray)', fontSize: 14 }}>Lal Bahadur Shastri School</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <FaEnvelope style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray)', fontSize: 14 }} />
              <input
                type="email" required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="form-input"
                style={{ paddingLeft: 42 }}
                placeholder="admin@lbsschool.com"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <FaLock style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray)', fontSize: 14 }} />
              <input
                type={showPass ? 'text' : 'password'} required
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                className="form-input"
                style={{ paddingLeft: 42, paddingRight: 44 }}
                placeholder="Enter password"
              />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--gray)', cursor: 'pointer' }}>
                {showPass ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 8, fontSize: 15, padding: '15px' }}>
            {loading ? 'Signing in...' : '🔐 Sign In to Admin Panel'}
          </button>
        </form>

        <div style={{ marginTop: 24, padding: '14px 16px', background: 'var(--cream)', borderRadius: 12, border: '1px solid rgba(201,168,76,0.2)' }}>
          <div style={{ fontSize: 12, color: 'var(--gray)', textAlign: 'center' }}>
            <strong style={{ color: 'var(--navy)' }}>Default credentials:</strong><br />
            Email: admin@lbsschool.com | Password: Admin@123<br />
            <span style={{ color: 'var(--red-accent)', fontSize: 11 }}>⚠ Change password after first login</span>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <a href="/" style={{ fontSize: 13, color: 'var(--gray)' }}>← Back to School Website</a>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
