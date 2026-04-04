import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import API from '../../services/api';
import { FaCalendarAlt, FaPlus, FaTrash, FaEdit, FaTimes } from 'react-icons/fa';

const categories = ['Academic', 'Sports', 'Cultural', 'Meeting', 'Holiday', 'Exam', 'Other'];
const emptyForm = { title: '', description: '', date: '', endDate: '', venue: 'School Campus', category: 'Other', isActive: true };

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchEvents(); }, []);

  const fetchEvents = async () => {
    try {
      const { data } = await API.get('/events');
      setEvents(data);
    } catch { toast.error('Failed to load events'); }
    finally { setLoading(false); }
  };

  const openAdd = () => { setEditing(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (e) => {
    setEditing(e._id);
    setForm({ ...e, date: e.date?.split('T')[0] || '', endDate: e.endDate?.split('T')[0] || '' });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.date) { toast.error('Title and date are required'); return; }
    setSaving(true);
    try {
      if (editing) {
        await API.put(`/events/${editing}`, form);
        toast.success('Event updated');
      } else {
        await API.post('/events', form);
        toast.success('Event added');
      }
      setShowModal(false);
      fetchEvents();
    } catch { toast.error('Save failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this event?')) return;
    try {
      await API.delete(`/events/${id}`);
      toast.success('Event deleted');
      fetchEvents();
    } catch { toast.error('Delete failed'); }
  };

  const colorMap = { Academic: '#1a5276', Sports: '#e67e22', Cultural: '#7d3c98', Meeting: '#27ae60', Holiday: '#27ae60', Exam: '#c0392b', Other: '#6b7280' };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ color: 'var(--navy)', marginBottom: 4 }}>Events Management</h2>
          <p style={{ color: 'var(--gray)', fontSize: 14 }}>{events.length} events scheduled</p>
        </div>
        <button onClick={openAdd} className="btn-primary"><FaPlus /> Add Event</button>
      </div>

      {loading ? <div style={{ textAlign: 'center', padding: 60, color: 'var(--gray)' }}>Loading events...</div> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 20 }}>
          {events.map((ev, i) => (
            <motion.div key={ev._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              style={{ background: 'white', borderRadius: 14, padding: '22px', boxShadow: 'var(--shadow)', borderTop: `4px solid ${colorMap[ev.category]}` }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14 }}>
                <span style={{ background: colorMap[ev.category], color: 'white', borderRadius: 20, padding: '3px 12px', fontSize: 11, fontWeight: 700 }}>{ev.category}</span>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button onClick={() => openEdit(ev)} style={{ padding: '5px 9px', borderRadius: 7, background: 'rgba(13,33,55,0.07)', border: 'none', cursor: 'pointer', color: 'var(--navy)' }}><FaEdit size={12} /></button>
                  <button onClick={() => handleDelete(ev._id)} style={{ padding: '5px 9px', borderRadius: 7, background: 'rgba(192,57,43,0.09)', border: 'none', cursor: 'pointer', color: 'var(--red-accent)' }}><FaTrash size={12} /></button>
                </div>
              </div>
              <h4 style={{ color: 'var(--navy)', marginBottom: 8, fontSize: 16 }}>{ev.title}</h4>
              <p style={{ color: 'var(--gray)', fontSize: 13, lineHeight: 1.6, marginBottom: 12 }}>{ev.description?.slice(0, 100)}...</p>
              <div style={{ fontSize: 13, color: 'var(--navy)', fontWeight: 500 }}>
                📅 {new Date(ev.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
              <div style={{ fontSize: 13, color: 'var(--gray)', marginTop: 4 }}>📍 {ev.venue}</div>
            </motion.div>
          ))}
          {events.length === 0 && (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px', background: 'white', borderRadius: 16, color: 'var(--gray)' }}>
              <FaCalendarAlt size={40} style={{ opacity: 0.3, marginBottom: 12 }} />
              <p style={{ marginBottom: 16 }}>No events scheduled.</p>
              <button onClick={openAdd} className="btn-primary"><FaPlus /> Add First Event</button>
            </div>
          )}
        </div>
      )}

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: 20 }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            style={{ background: 'white', borderRadius: 20, padding: 36, width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <h3 style={{ color: 'var(--navy)' }}>{editing ? 'Edit Event' : 'Add New Event'}</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: 'var(--gray)' }}><FaTimes /></button>
            </div>
            <div className="form-group">
              <label className="form-label">Event Title *</label>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="form-input" placeholder="e.g. Annual Sports Day 2024" />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Event Date *</label>
                <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">End Date</label>
                <input type="date" value={form.endDate} onChange={e => setForm({ ...form, endDate: e.target.value })} className="form-input" />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="form-input">
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Venue</label>
                <input value={form.venue} onChange={e => setForm({ ...form, venue: e.target.value })} className="form-input" placeholder="School Ground" />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="form-input" rows={4} placeholder="Event details..." style={{ resize: 'vertical' }} />
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '13px', borderRadius: 10, background: 'var(--gray-light)', border: 'none', cursor: 'pointer', fontWeight: 600, color: 'var(--gray)' }}>Cancel</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary" style={{ flex: 2, justifyContent: 'center' }}>
                {saving ? 'Saving...' : (editing ? '✓ Update Event' : '+ Add Event')}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminEvents;
