import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import {
  FaTachometerAlt, FaUserGraduate, FaImages, FaChalkboardTeacher,
  FaBullhorn, FaCalendarAlt, FaClipboardList, FaMoneyBillWave,
  FaTrophy, FaClock, FaSignOutAlt, FaBars, FaTimes, FaSchool
} from 'react-icons/fa';

const sidebarLinks = [
  { path: '/admin', icon: <FaTachometerAlt />, label: 'Dashboard' },
  { path: '/admin/students', icon: <FaUserGraduate />, label: 'Students' },
  { path: '/admin/staff', icon: <FaChalkboardTeacher />, label: 'Staff' },
  { path: '/admin/gallery', icon: <FaImages />, label: 'Gallery' },
  { path: '/admin/notices', icon: <FaBullhorn />, label: 'Notices' },
  { path: '/admin/events', icon: <FaCalendarAlt />, label: 'Events' },
  { path: '/admin/results', icon: <FaClipboardList />, label: 'Results' },
  { path: '/admin/timetable', icon: <FaClock />, label: 'Timetable' },
  { path: '/admin/fees', icon: <FaMoneyBillWave />, label: 'Fee Structure' },
  { path: '/admin/achievements', icon: <FaTrophy />, label: 'Achievements' },
];

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f0f4f8' }}>
      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 240 : 64 }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'var(--navy)',
          height: '100vh',
          position: 'sticky',
          top: 0,
          overflow: 'hidden',
          flexShrink: 0,
          zIndex: 100
        }}
      >
        {/* Logo */}
        <div style={{ padding: '20px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36, height: 36,
            background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
          }}>
            <FaSchool size={18} color="var(--navy)" />
          </div>
          {sidebarOpen && (
            <div>
              <div style={{ color: 'white', fontWeight: 700, fontSize: 14, fontFamily: 'Playfair Display, serif' }}>LBS School</div>
              <div style={{ color: 'var(--gold)', fontSize: 10, letterSpacing: 1 }}>ADMIN PANEL</div>
            </div>
          )}
        </div>

        {/* Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            position: 'absolute', top: 22, right: 12,
            background: 'rgba(255,255,255,0.08)', border: 'none', color: 'rgba(255,255,255,0.6)',
            borderRadius: 6, padding: 6, cursor: 'pointer', display: 'flex', alignItems: 'center'
          }}
        >
          {sidebarOpen ? <FaTimes size={12} /> : <FaBars size={12} />}
        </button>

        {/* Nav Links */}
        <nav style={{ padding: '16px 8px', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {sidebarLinks.map(link => {
            const isActive = location.pathname === link.path;
            return (
              <Link key={link.path} to={link.path} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 14px', borderRadius: 10,
                color: isActive ? 'var(--navy)' : 'rgba(255,255,255,0.7)',
                background: isActive ? 'var(--gold)' : 'transparent',
                fontSize: 14, fontWeight: isActive ? 600 : 400,
                transition: 'all 0.2s', whiteSpace: 'nowrap',
                overflow: 'hidden'
              }}>
                <span style={{ fontSize: 16, flexShrink: 0 }}>{link.icon}</span>
                {sidebarOpen && <span>{link.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {sidebarOpen && (
            <div style={{ marginBottom: 12, padding: '10px 14px', background: 'rgba(255,255,255,0.05)', borderRadius: 10 }}>
              <div style={{ color: 'white', fontWeight: 600, fontSize: 13 }}>{user?.name}</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>{user?.email}</div>
            </div>
          )}
          <button onClick={handleLogout} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            width: '100%', padding: '10px 14px', borderRadius: 10,
            background: 'rgba(192,57,43,0.15)', color: '#e74c3c',
            border: '1px solid rgba(192,57,43,0.2)', cursor: 'pointer', fontSize: 14, fontWeight: 500
          }}>
            <FaSignOutAlt />
            {sidebarOpen && 'Logout'}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {/* Top bar */}
        <div style={{ background: 'white', padding: '14px 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: 18, color: 'var(--navy)', fontFamily: 'Playfair Display, serif' }}>
            {sidebarLinks.find(l => l.path === location.pathname)?.label || 'Admin Panel'}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Link to="/" target="_blank" style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 500 }}>View Website →</Link>
          </div>
        </div>

        <div style={{ padding: 24 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
