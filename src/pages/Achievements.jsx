import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import API from '../services/api';
import { FaTrophy } from 'react-icons/fa';

const categories = ['All', 'Academic', 'Sports', 'Cultural', 'National', 'State', 'District', 'School'];

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [cat, setCat] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/achievements').then(({ data }) => { setAchievements(data); setFiltered(data); })
      .catch(() => {
        const demo = [
          { _id: 1, title: '1st Place - State Science Olympiad', description: 'Our student won first place in the State Level Science Olympiad 2024, competing against 500+ participants.', studentName: 'Aryan Sharma', class: '8th', category: 'State', date: '2024-09-15', isFeatured: true },
          { _id: 2, title: 'District Football Champions', description: 'LBS School Football team won the District Championship Trophy 2024.', category: 'Sports', date: '2024-08-20', isFeatured: true },
          { _id: 3, title: 'Best School Award - State Government', description: 'Received the prestigious Best School Award from State Education Minister for excellence in academics.', category: 'School', date: '2024-07-10', isFeatured: false },
          { _id: 4, title: 'Cultural Excellence Award', description: 'Won first place in District Level Cultural Competition with outstanding dance and drama performances.', category: 'Cultural', date: '2024-06-05', isFeatured: false },
        ];
        setAchievements(demo); setFiltered(demo);
      }).finally(() => setLoading(false));
  }, []);

  useEffect(() => setFiltered(cat === 'All' ? achievements : achievements.filter(a => a.category === cat)), [cat, achievements]);

  const catColors = { Academic: '#1a5276', Sports: '#e67e22', Cultural: '#7d3c98', National: '#c0392b', State: '#27ae60', District: '#2471a3', School: '#5d6d7e' };

  return (
    <div>
      <div className="page-hero"><div className="container text-center"><div className="breadcrumb" style={{ justifyContent: 'center' }}><a href="/">Home</a><span>/</span><span>Achievements</span></div><h1><FaTrophy style={{ marginRight: 12 }} />Our Achievements</h1><p>Celebrating excellence and proud moments of our students</p></div></div>
      <section className="section-pad"><div className="container">
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 36 }}>
          {categories.map(c => (
            <button key={c} onClick={() => setCat(c)} style={{ padding: '7px 18px', borderRadius: 50, fontSize: 13, fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s', border: cat === c ? `2px solid ${catColors[c] || 'var(--gold)'}` : '2px solid #e5e7eb', background: cat === c ? (catColors[c] || 'var(--gold)') : 'white', color: cat === c ? 'white' : 'var(--gray)' }}>{c}</button>
          ))}
        </div>
        {loading ? <p style={{ color: 'var(--gray)' }}>Loading...</p> : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 24 }}>
            {filtered.map((a, i) => (
              <motion.div key={a._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="card" style={{ padding: '28px' }}>
                <div style={{ display: 'flex', gap: 14, marginBottom: 16, alignItems: 'flex-start' }}>
                  <div style={{ width: 48, height: 48, background: `${catColors[a.category] || '#6b7280'}15`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FaTrophy size={22} color={catColors[a.category] || '#6b7280'} />
                  </div>
                  <div>
                    <span style={{ background: catColors[a.category] || '#6b7280', color: 'white', borderRadius: 20, padding: '2px 10px', fontSize: 11, fontWeight: 700 }}>{a.category}</span>
                    <div style={{ fontSize: 11, color: 'var(--gray)', marginTop: 4 }}>{new Date(a.date).toLocaleDateString('en-IN')}</div>
                  </div>
                </div>
                <h3 style={{ color: 'var(--navy)', marginBottom: 8, fontSize: 16 }}>{a.title}</h3>
                {a.studentName && <div style={{ color: 'var(--gold)', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>🎓 {a.studentName} {a.class && `| Class ${a.class}`}</div>}
                <p style={{ color: 'var(--gray)', fontSize: 14, lineHeight: 1.7 }}>{a.description}</p>
              </motion.div>
            ))}
            {filtered.length === 0 && <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px', color: 'var(--gray)' }}><FaTrophy size={40} style={{ opacity: 0.3, marginBottom: 12 }} /><p>No achievements in this category.</p></div>}
          </div>
        )}
      </div></section>
    </div>
  );
};
export default Achievements;
