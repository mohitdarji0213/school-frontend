import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import API from '../../services/api';
import { FaClock, FaPlus, FaTrash, FaTimes } from 'react-icons/fa';

const classes = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const subjects = ['Hindi', 'English', 'Mathematics', 'Science', 'Social Science', 'Sanskrit', 'Computer', 'Drawing', 'PT', 'Library', 'Activity'];

const AdminTimetable = () => {
  const [timetables, setTimetables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [selectedClass, setSelectedClass] = useState('1st');
  const [form, setForm] = useState({
    class: '1st', section: 'A', day: 'Monday', session: '2024-25',
    periods: Array.from({ length: 7 }, (_, i) => ({
      periodNo: i + 1, subject: '', teacher: '',
      startTime: `0${8 + i}:00`.slice(-5), endTime: `0${9 + i}:00`.slice(-5)
    }))
  });

  useEffect(() => { fetchTimetable(); }, [selectedClass]);

  const fetchTimetable = async () => {
    setLoading(true);
    try {
      const { data } = await API.get(`/timetable?class=${selectedClass}&session=2024-25`);
      setTimetables(data);
    } catch { toast.error('Failed to load timetable'); }
    finally { setLoading(false); }
  };

  const updatePeriod = (i, field, val) => {
    const periods = [...form.periods];
    periods[i] = { ...periods[i], [field]: val };
    setForm({ ...form, periods });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await API.post('/timetable', form);
      toast.success('Timetable saved');
      setShowModal(false);
      fetchTimetable();
    } catch { toast.error('Save failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this timetable entry?')) return;
    try {
      await API.delete(`/timetable/${id}`);
      toast.success('Deleted');
      fetchTimetable();
    } catch { toast.error('Delete failed'); }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ color: 'var(--navy)', marginBottom: 4 }}>Timetable Management</h2>
          <p style={{ color: 'var(--gray)', fontSize: 14 }}>Manage class timetables</p>
        </div>
        <button onClick={() => { setForm({ ...form, class: selectedClass }); setShowModal(true); }} className="btn-primary"><FaPlus /> Add Timetable</button>
      </div>

      {/* Class selector */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
        {classes.map(cls => (
          <button key={cls} onClick={() => setSelectedClass(cls)} style={{
            padding: '8px 20px', borderRadius: 50, fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
            border: selectedClass === cls ? '2px solid var(--gold)' : '2px solid #e5e7eb',
            background: selectedClass === cls ? 'var(--gold)' : 'white',
            color: selectedClass === cls ? 'var(--navy)' : 'var(--gray)'
          }}>Class {cls}</button>
        ))}
      </div>

      {loading ? <div style={{ textAlign: 'center', padding: 60, color: 'var(--gray)' }}>Loading...</div> : (
        timetables.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: 16, color: 'var(--gray)' }}>
            <FaClock size={40} style={{ opacity: 0.3, marginBottom: 12 }} />
            <p style={{ marginBottom: 16 }}>No timetable for Class {selectedClass}.</p>
            <button onClick={() => setShowModal(true)} className="btn-primary"><FaPlus /> Create Timetable</button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {timetables.map((tt) => (
              <div key={tt._id} style={{ background: 'white', borderRadius: 14, padding: '20px 24px', boxShadow: 'var(--shadow)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div>
                    <span style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 16 }}>{tt.day}</span>
                    <span style={{ marginLeft: 12, fontSize: 13, color: 'var(--gray)' }}>Class {tt.class} | Section {tt.section}</span>
                  </div>
                  <button onClick={() => handleDelete(tt._id)} style={{ padding: '6px 10px', borderRadius: 7, background: 'rgba(192,57,43,0.09)', border: 'none', cursor: 'pointer', color: 'var(--red-accent)' }}><FaTrash size={12} /></button>
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {tt.periods?.map((p, i) => (
                    <div key={i} style={{ background: 'var(--cream)', borderRadius: 10, padding: '10px 14px', minWidth: 100, textAlign: 'center', border: '1px solid rgba(201,168,76,0.15)' }}>
                      <div style={{ fontSize: 10, color: 'var(--gray)', marginBottom: 4 }}>Period {p.periodNo}</div>
                      <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: 13 }}>{p.subject || '—'}</div>
                      <div style={{ fontSize: 10, color: 'var(--gold)', marginTop: 3 }}>{p.startTime}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: 20 }}>
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}
            style={{ background: 'white', borderRadius: 20, padding: 36, width: '100%', maxWidth: 720, maxHeight: '92vh', overflowY: 'auto' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <h3 style={{ color: 'var(--navy)' }}>Add Timetable Entry</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: 'var(--gray)' }}><FaTimes /></button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
              {[{ label: 'Class', key: 'class', options: classes }, { label: 'Day', key: 'day', options: days }].map(sel => (
                <div key={sel.key} className="form-group">
                  <label className="form-label">{sel.label}</label>
                  <select value={form[sel.key]} onChange={e => setForm({ ...form, [sel.key]: e.target.value })} className="form-input" style={{ padding: '9px 12px' }}>
                    {sel.options.map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
              <div className="form-group">
                <label className="form-label">Section</label>
                <input value={form.section} onChange={e => setForm({ ...form, section: e.target.value })} className="form-input" style={{ padding: '9px 12px' }} placeholder="A" />
              </div>
              <div className="form-group">
                <label className="form-label">Session</label>
                <input value={form.session} onChange={e => setForm({ ...form, session: e.target.value })} className="form-input" style={{ padding: '9px 12px' }} placeholder="2024-25" />
              </div>
            </div>
            <h4 style={{ color: 'var(--navy)', marginBottom: 12 }}>Periods</h4>
            {form.periods.map((p, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: 'auto 2fr 2fr 1fr 1fr', gap: 10, marginBottom: 10, alignItems: 'flex-end' }}>
                <div style={{ background: 'var(--navy)', color: 'var(--gold)', borderRadius: 8, padding: '9px 12px', fontWeight: 700, fontSize: 13, textAlign: 'center', minWidth: 36 }}>P{p.periodNo}</div>
                <div>
                  {i === 0 && <label className="form-label">Subject</label>}
                  <select value={p.subject} onChange={e => updatePeriod(i, 'subject', e.target.value)} className="form-input" style={{ padding: '9px 12px' }}>
                    <option value="">Select</option>
                    {subjects.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  {i === 0 && <label className="form-label">Teacher</label>}
                  <input value={p.teacher} onChange={e => updatePeriod(i, 'teacher', e.target.value)} className="form-input" style={{ padding: '9px 12px' }} placeholder="Teacher name" />
                </div>
                <div>
                  {i === 0 && <label className="form-label">Start</label>}
                  <input type="time" value={p.startTime} onChange={e => updatePeriod(i, 'startTime', e.target.value)} className="form-input" style={{ padding: '9px 12px' }} />
                </div>
                <div>
                  {i === 0 && <label className="form-label">End</label>}
                  <input type="time" value={p.endTime} onChange={e => updatePeriod(i, 'endTime', e.target.value)} className="form-input" style={{ padding: '9px 12px' }} />
                </div>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '13px', borderRadius: 10, background: 'var(--gray-light)', border: 'none', cursor: 'pointer', fontWeight: 600, color: 'var(--gray)' }}>Cancel</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary" style={{ flex: 2, justifyContent: 'center' }}>
                {saving ? 'Saving...' : '💾 Save Timetable'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminTimetable;
