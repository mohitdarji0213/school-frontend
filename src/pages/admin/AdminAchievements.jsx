import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import API from '../../services/api';
import { FaTrophy, FaPlus, FaTrash, FaEdit, FaTimes, FaStar } from 'react-icons/fa';

const categories = ['Academic', 'Sports', 'Cultural', 'National', 'State', 'District', 'School'];
const emptyForm = { title: '', description: '', studentName: '', class: '', category: 'School', date: '', imageUrl: '', isFeatured: false };

const AdminAchievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchAchievements(); }, []);

  const fetchAchievements = async () => {
    try {
      const { data } = await API.get('/achievements');
      setAchievements(data);
    } catch { toast.error('Failed to load achievements'); }
    finally { setLoading(false); }
  };

  const openAdd = () => { setEditing(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (a) => { setEditing(a._id); setForm({ ...a, date: a.date?.split('T')[0] || '' }); setShowModal(true); };

  const handleSave = async () => {
    if (!form.title || !form.description || !form.date) { toast.error('Fill required fields'); return; }
    setSaving(true);
    try {
      if (editing) {
        await API.put(`/achievements/${editing}`, form);
        toast.success('Achievement updated');
      } else {
        await API.post('/achievements', form);
        toast.success('Achievement added');
      }
      setShowModal(false);
      fetchAchievements();
    } catch { toast.error('Save failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this achievement?')) return;
    try {
      await API.delete(`/achievements/${id}`);
      toast.success('Deleted');
      fetchAchievements();
    } catch { toast.error('Delete failed'); }
  };

  const catColors = { Academic: '#1a5276', Sports: '#e67e22', Cultural: '#7d3c98', National: '#c0392b', State: '#27ae60', District: '#2471a3', School: '#5d6d7e' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ color: 'var(--navy)', marginBottom: 4 }}>Achievements</h2>
          <p style={{ color: 'var(--gray)', fontSize: 14 }}>{achievements.length} achievements recorded</p>
        </div>
        <button onClick={openAdd} className="btn-primary"><FaPlus /> Add Achievement</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 20 }}>
        {achievements.map((a, i) => (
          <motion.div key={a._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            style={{ background: 'white', borderRadius: 14, padding: '22px', boxShadow: 'var(--shadow)', position: 'relative' }}
          >
            {a.isFeatured && <div style={{ position: 'absolute', top: 14, right: 14 }}><FaStar color="var(--gold)" size={16} /></div>}
            <div style={{ display: 'flex', gap: 12, marginBottom: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 44, height: 44, background: `${catColors[a.category]}15`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <FaTrophy size={20} color={catColors[a.category]} />
              </div>
              <div>
                <span style={{ background: catColors[a.category], color: 'white', borderRadius: 20, padding: '2px 10px', fontSize: 11, fontWeight: 700 }}>{a.category}</span>
                <div style={{ fontSize: 11, color: 'var(--gray)', marginTop: 3 }}>{new Date(a.date).toLocaleDateString('en-IN')}</div>
              </div>
            </div>
            <h4 style={{ color: 'var(--navy)', marginBottom: 6, fontSize: 15 }}>{a.title}</h4>
            {a.studentName && <div style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 600, marginBottom: 6 }}>Student: {a.studentName} {a.class && `| Class ${a.class}`}</div>}
            <p style={{ color: 'var(--gray)', fontSize: 13, lineHeight: 1.6, marginBottom: 14 }}>{a.description?.slice(0, 100)}...</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => openEdit(a)} style={{ flex: 1, padding: '7px', borderRadius: 8, background: 'rgba(13,33,55,0.07)', border: 'none', cursor: 'pointer', color: 'var(--navy)', fontSize: 13 }}><FaEdit size={12} /> Edit</button>
              <button onClick={() => handleDelete(a._id)} style={{ padding: '7px 12px', borderRadius: 8, background: 'rgba(192,57,43,0.09)', border: 'none', cursor: 'pointer', color: 'var(--red-accent)' }}><FaTrash size={12} /></button>
            </div>
          </motion.div>
        ))}
        {achievements.length === 0 && !loading && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px', background: 'white', borderRadius: 16, color: 'var(--gray)' }}>
            <FaTrophy size={40} style={{ opacity: 0.3, marginBottom: 12 }} />
            <p style={{ marginBottom: 16 }}>No achievements yet.</p>
            <button onClick={openAdd} className="btn-primary"><FaPlus /> Add Achievement</button>
          </div>
        )}
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: 20 }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            style={{ background: 'white', borderRadius: 20, padding: 36, width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <h3 style={{ color: 'var(--navy)' }}>{editing ? 'Edit' : 'Add'} Achievement</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: 'var(--gray)' }}><FaTimes /></button>
            </div>
            <div className="form-group">
              <label className="form-label">Achievement Title *</label>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="form-input" placeholder="e.g. 1st Place in State Science Olympiad" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="form-input">
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Date *</label>
                <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Student Name</label>
                <input value={form.studentName} onChange={e => setForm({ ...form, studentName: e.target.value })} className="form-input" placeholder="If individual achievement" />
              </div>
              <div className="form-group">
                <label className="form-label">Class</label>
                <input value={form.class} onChange={e => setForm({ ...form, class: e.target.value })} className="form-input" placeholder="e.g. 8th" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Description *</label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="form-input" rows={3} placeholder="Describe the achievement..." style={{ resize: 'vertical' }} />
            </div>
            <div className="form-group">
              <label className="form-label">Image URL (optional)</label>
              <input value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} className="form-input" placeholder="https://..." />
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', marginBottom: 24 }}>
              <input type="checkbox" checked={form.isFeatured} onChange={e => setForm({ ...form, isFeatured: e.target.checked })} />
              <span style={{ fontSize: 14, color: 'var(--navy)', fontWeight: 500 }}>⭐ Feature on homepage</span>
            </label>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '13px', borderRadius: 10, background: 'var(--gray-light)', border: 'none', cursor: 'pointer', fontWeight: 600, color: 'var(--gray)' }}>Cancel</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary" style={{ flex: 2, justifyContent: 'center' }}>
                {saving ? 'Saving...' : (editing ? '✓ Update' : '🏆 Add Achievement')}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminAchievements;
