import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import API from '../../services/api';
import { FaBullhorn, FaPlus, FaTrash, FaEdit, FaTimes } from 'react-icons/fa';

const categories = ['General', 'Exam', 'Holiday', 'Fee', 'Admission', 'Sports', 'Cultural', 'Emergency'];
const classes = ['All', 'Nursery', 'KG', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];

const emptyForm = { title: '', content: '', category: 'General', targetClass: 'All', isImportant: false, expiresAt: '' };

const AdminNotices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchNotices(); }, []);

  const fetchNotices = async () => {
    try {
      const { data } = await API.get('/notices');
      setNotices(data);
    } catch { toast.error('Failed to load notices'); }
    finally { setLoading(false); }
  };

  const openAdd = () => { setEditing(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (n) => { setEditing(n._id); setForm({ ...n, expiresAt: n.expiresAt ? n.expiresAt.split('T')[0] : '' }); setShowModal(true); };

  const handleSave = async () => {
    if (!form.title || !form.content) { toast.error('Title and content are required'); return; }
    setSaving(true);
    try {
      if (editing) {
        await API.put(`/notices/${editing}`, form);
        toast.success('Notice updated');
      } else {
        await API.post('/notices', form);
        toast.success('Notice posted successfully');
      }
      setShowModal(false);
      fetchNotices();
    } catch { toast.error('Save failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this notice?')) return;
    try {
      await API.delete(`/notices/${id}`);
      toast.success('Notice deleted');
      fetchNotices();
    } catch { toast.error('Delete failed'); }
  };

  const categoryColor = { Exam: '#c0392b', Holiday: '#27ae60', Admission: '#1a5276', Sports: '#e67e22', Fee: '#7d3c98', Emergency: '#e74c3c', Cultural: '#e91e63', General: '#6b7280' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ color: 'var(--navy)', marginBottom: 4 }}>Notice Board</h2>
          <p style={{ color: 'var(--gray)', fontSize: 14 }}>{notices.length} notices | {notices.filter(n => n.isImportant).length} important</p>
        </div>
        <button onClick={openAdd} className="btn-primary"><FaPlus /> Post Notice</button>
      </div>

      {loading ? <div style={{ textAlign: 'center', padding: 60, color: 'var(--gray)' }}>Loading...</div> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {notices.map((n, i) => (
            <motion.div key={n._id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              style={{ background: 'white', borderRadius: 14, padding: '20px 24px', boxShadow: 'var(--shadow)', borderLeft: `4px solid ${n.isImportant ? 'var(--gold)' : categoryColor[n.category] || '#6b7280'}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8, alignItems: 'center' }}>
                  <span style={{ background: categoryColor[n.category] || '#6b7280', color: 'white', borderRadius: 20, padding: '2px 10px', fontSize: 11, fontWeight: 700 }}>{n.category}</span>
                  {n.isImportant && <span style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--gold)', borderRadius: 20, padding: '2px 10px', fontSize: 11, fontWeight: 700, border: '1px solid rgba(201,168,76,0.3)' }}>⚠ IMPORTANT</span>}
                  <span style={{ fontSize: 11, color: 'var(--gray)', marginLeft: 4 }}>For: Class {n.targetClass}</span>
                </div>
                <h4 style={{ color: 'var(--navy)', marginBottom: 6, fontSize: 16 }}>{n.title}</h4>
                <p style={{ color: 'var(--gray)', fontSize: 13, lineHeight: 1.6 }}>{n.content.length > 140 ? n.content.slice(0, 140) + '...' : n.content}</p>
                <div style={{ fontSize: 11, color: 'var(--gray)', marginTop: 8 }}>Posted: {new Date(n.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
              </div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                <button onClick={() => openEdit(n)} style={{ padding: '7px 10px', borderRadius: 8, background: 'rgba(13,33,55,0.07)', border: 'none', cursor: 'pointer', color: 'var(--navy)' }}><FaEdit size={13} /></button>
                <button onClick={() => handleDelete(n._id)} style={{ padding: '7px 10px', borderRadius: 8, background: 'rgba(192,57,43,0.09)', border: 'none', cursor: 'pointer', color: 'var(--red-accent)' }}><FaTrash size={13} /></button>
              </div>
            </motion.div>
          ))}
          {notices.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: 16, color: 'var(--gray)' }}>
              <FaBullhorn size={40} style={{ opacity: 0.3, marginBottom: 12 }} />
              <p style={{ marginBottom: 16 }}>No notices yet.</p>
              <button onClick={openAdd} className="btn-primary"><FaPlus /> Post First Notice</button>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: 20 }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            style={{ background: 'white', borderRadius: 20, padding: 36, width: '100%', maxWidth: 580, maxHeight: '90vh', overflowY: 'auto' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <h3 style={{ color: 'var(--navy)' }}>{editing ? 'Edit Notice' : 'Post New Notice'}</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: 'var(--gray)' }}><FaTimes /></button>
            </div>
            <div className="form-group">
              <label className="form-label">Notice Title *</label>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="form-input" placeholder="e.g. Half Yearly Exam Schedule" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="form-input">
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Target Class</label>
                <select value={form.targetClass} onChange={e => setForm({ ...form, targetClass: e.target.value })} className="form-input">
                  {classes.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Expires On</label>
                <input type="date" value={form.expiresAt} onChange={e => setForm({ ...form, expiresAt: e.target.value })} className="form-input" />
              </div>
              <div className="form-group" style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: 4 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                  <input type="checkbox" checked={form.isImportant} onChange={e => setForm({ ...form, isImportant: e.target.checked })} />
                  <span style={{ fontSize: 14, color: 'var(--navy)', fontWeight: 500 }}>Mark as Important</span>
                </label>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Notice Content *</label>
              <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} className="form-input" rows={5} placeholder="Write the full notice content here..." style={{ resize: 'vertical' }} />
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '13px', borderRadius: 10, background: 'var(--gray-light)', border: 'none', cursor: 'pointer', fontWeight: 600, color: 'var(--gray)' }}>Cancel</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary" style={{ flex: 2, justifyContent: 'center' }}>
                {saving ? 'Saving...' : (editing ? '✓ Update Notice' : '📢 Post Notice')}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminNotices;
