import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import API from '../../services/api';
import { FaUserGraduate, FaImages, FaChalkboardTeacher, FaBullhorn, FaCalendarAlt, FaTrophy, FaMoneyBillWave, FaClipboardList } from 'react-icons/fa';

const statCards = [
  { key: 'students', icon: <FaUserGraduate />, label: 'Total Registrations', color: '#1a5276', path: '/admin/students' },
  { key: 'pending', icon: <FaClipboardList />, label: 'Pending Admissions', color: '#e67e22', path: '/admin/students?status=Pending' },
  { key: 'staff', icon: <FaChalkboardTeacher />, label: 'Active Staff', color: '#1e8449', path: '/admin/staff' },
  { key: 'gallery', icon: <FaImages />, label: 'Gallery Photos', color: '#7d3c98', path: '/admin/gallery' },
  { key: 'notices', icon: <FaBullhorn />, label: 'Active Notices', color: '#c0392b', path: '/admin/notices' },
  { key: 'events', icon: <FaCalendarAlt />, label: 'Upcoming Events', color: '#2471a3', path: '/admin/events' },
];

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [recentStudents, setRecentStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [studRes, staffRes, galleryRes, noticesRes, eventsRes] = await Promise.allSettled([
        API.get('/students'),
        API.get('/staff'),
        API.get('/gallery'),
        API.get('/notices'),
        API.get('/events'),
      ]);

      const students = studRes.status === 'fulfilled' ? studRes.value.data : [];
      setStats({
        students: students.length,
        pending: students.filter(s => s.status === 'Pending').length,
        staff: staffRes.status === 'fulfilled' ? staffRes.value.data.length : 0,
        gallery: galleryRes.status === 'fulfilled' ? galleryRes.value.data.length : 0,
        notices: noticesRes.status === 'fulfilled' ? noticesRes.value.data.length : 0,
        events: eventsRes.status === 'fulfilled' ? eventsRes.value.data.length : 0,
      });
      setRecentStudents(students.slice(0, 6));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    { label: '+ Add Staff', path: '/admin/staff', color: 'var(--navy)' },
    { label: '+ Upload Photo', path: '/admin/gallery', color: '#7d3c98' },
    { label: '+ Post Notice', path: '/admin/notices', color: '#c0392b' },
    { label: '+ Add Event', path: '/admin/events', color: '#2471a3' },
  ];

  return (
    <div>
      <h2 style={{ color: 'var(--navy)', marginBottom: 6, fontFamily: 'Playfair Display, serif', fontSize: 26 }}>
        Welcome, Admin 👋
      </h2>
      <p style={{ color: 'var(--gray)', marginBottom: 32, fontSize: 14 }}>
        Here's an overview of Lal Bahadur Shastri School — {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20, marginBottom: 32 }}>
        {statCards.map((card, i) => (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Link to={card.path} style={{
              display: 'block', background: 'white', borderRadius: 16, padding: '24px 20px',
              boxShadow: 'var(--shadow)', borderTop: `4px solid ${card.color}`,
              transition: 'all 0.25s'
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontSize: 36, fontWeight: 700, color: card.color, fontFamily: 'Playfair Display, serif', lineHeight: 1 }}>
                    {loading ? '—' : (stats[card.key] ?? 0)}
                  </div>
                  <div style={{ color: 'var(--gray)', fontSize: 13, marginTop: 6 }}>{card.label}</div>
                </div>
                <div style={{ fontSize: 24, color: card.color, opacity: 0.5 }}>{card.icon}</div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Two-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'start' }}>
        {/* Recent Registrations */}
        <div style={{ background: 'white', borderRadius: 16, padding: '24px', boxShadow: 'var(--shadow)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ color: 'var(--navy)', fontSize: 17 }}>Recent Student Registrations</h3>
            <Link to="/admin/students" style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 600 }}>View All →</Link>
          </div>
          {recentStudents.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--gray)' }}>
              <FaUserGraduate size={32} style={{ opacity: 0.3, marginBottom: 8 }} />
              <p>No registrations yet</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Class</th>
                    <th>Parent Phone</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentStudents.map(s => (
                    <tr key={s._id}>
                      <td style={{ fontWeight: 500 }}>{s.studentName}</td>
                      <td>{s.applyingClass}</td>
                      <td>{s.parentPhone}</td>
                      <td style={{ fontSize: 12, color: 'var(--gray)' }}>{new Date(s.createdAt).toLocaleDateString('en-IN')}</td>
                      <td>
                        <span className={`badge badge-${s.status === 'Approved' ? 'green' : s.status === 'Rejected' ? 'red' : 'gold'}`}>
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div style={{ background: 'white', borderRadius: 16, padding: '24px', boxShadow: 'var(--shadow)' }}>
          <h3 style={{ color: 'var(--navy)', fontSize: 17, marginBottom: 20 }}>Quick Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {quickActions.map((action, i) => (
              <Link key={i} to={action.path} style={{
                display: 'block', padding: '12px 16px', background: 'var(--cream)',
                borderRadius: 10, fontWeight: 600, fontSize: 14,
                color: action.color, borderLeft: `3px solid ${action.color}`,
                transition: 'all 0.2s'
              }}
                onMouseEnter={e => { e.currentTarget.style.background = action.color; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--cream)'; e.currentTarget.style.color = action.color; }}
              >{action.label}</Link>
            ))}
          </div>

          {/* Pending Alert */}
          {stats.pending > 0 && (
            <div style={{ marginTop: 20, background: 'rgba(230,126,34,0.08)', border: '1px solid rgba(230,126,34,0.3)', borderRadius: 10, padding: '14px 16px' }}>
              <div style={{ color: '#e67e22', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>⚠ Pending Admissions</div>
              <div style={{ color: 'var(--gray)', fontSize: 13 }}>
                {stats.pending} student application{stats.pending > 1 ? 's' : ''} waiting for review.
              </div>
              <Link to="/admin/students?status=Pending" style={{ color: '#e67e22', fontSize: 12, fontWeight: 600, marginTop: 8, display: 'block' }}>
                Review Now →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
