import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import API from '../../services/api';
import { FaMoneyBillWave, FaPlus, FaTrash, FaEdit, FaTimes } from 'react-icons/fa';

const classes = ['Nursery', 'KG', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];
const emptyForm = { class: '', session: '2024-25', tuitionFee: '', admissionFee: '', examFee: '', sportsFee: '', computerFee: '', transportFee: '', frequency: 'Monthly' };

const AdminFees = () => {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchFees(); }, []);

  const fetchFees = async () => {
    try {
      const { data } = await API.get('/fees');
      setFees(data);
    } catch { toast.error('Failed to load fees'); }
    finally { setLoading(false); }
  };

  const calcTotal = (f) => (Number(f.tuitionFee) || 0) + (Number(f.admissionFee) || 0) + (Number(f.examFee) || 0) + (Number(f.sportsFee) || 0) + (Number(f.computerFee) || 0) + (Number(f.transportFee) || 0);

  const openAdd = () => { setEditing(null); setForm(emptyForm); setShowModal(true); };
  const openEdit = (f) => { setEditing(f._id); setForm(f); setShowModal(true); };

  const handleSave = async () => {
    if (!form.class || !form.tuitionFee) { toast.error('Class and tuition fee are required'); return; }
    setSaving(true);
    try {
      if (editing) {
        await API.put(`/fees/${editing}`, form);
        toast.success('Fee structure updated');
      } else {
        await API.post('/fees', form);
        toast.success('Fee structure added');
      }
      setShowModal(false);
      fetchFees();
    } catch { toast.error('Save failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this fee structure?')) return;
    try {
      await API.delete(`/fees/${id}`);
      toast.success('Deleted');
      fetchFees();
    } catch { toast.error('Delete failed'); }
  };

  const feeFields = [
    { key: 'tuitionFee', label: 'Tuition Fee' },
    { key: 'admissionFee', label: 'Admission Fee' },
    { key: 'examFee', label: 'Exam Fee' },
    { key: 'sportsFee', label: 'Sports Fee' },
    { key: 'computerFee', label: 'Computer Fee' },
    { key: 'transportFee', label: 'Transport Fee' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ color: 'var(--navy)', marginBottom: 4 }}>Fee Structure</h2>
          <p style={{ color: 'var(--gray)', fontSize: 14 }}>{fees.length} classes configured</p>
        </div>
        <button onClick={openAdd} className="btn-primary"><FaPlus /> Add Fee Structure</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 20 }}>
        {fees.map((f, i) => (
          <motion.div key={f._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            style={{ background: 'white', borderRadius: 16, padding: '24px', boxShadow: 'var(--shadow)', borderTop: '4px solid var(--gold)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <div>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, color: 'var(--navy)' }}>Class {f.class}</div>
                <div style={{ fontSize: 12, color: 'var(--gray)' }}>Session: {f.session} | {f.frequency}</div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button onClick={() => openEdit(f)} style={{ padding: '6px 10px', borderRadius: 7, background: 'rgba(13,33,55,0.07)', border: 'none', cursor: 'pointer' }}><FaEdit size={12} /></button>
                <button onClick={() => handleDelete(f._id)} style={{ padding: '6px 10px', borderRadius: 7, background: 'rgba(192,57,43,0.09)', border: 'none', cursor: 'pointer', color: 'var(--red-accent)' }}><FaTrash size={12} /></button>
              </div>
            </div>
            {feeFields.filter(ff => f[ff.key] > 0).map(ff => (
              <div key={ff.key} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid #f0f0f0', fontSize: 13 }}>
                <span style={{ color: 'var(--gray)' }}>{ff.label}</span>
                <span style={{ color: 'var(--navy)', fontWeight: 500 }}>₹{Number(f[ff.key]).toLocaleString('en-IN')}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0 0', marginTop: 8, borderTop: '2px solid var(--gold)' }}>
              <span style={{ fontWeight: 700, color: 'var(--navy)' }}>Total ({f.frequency})</span>
              <span style={{ fontWeight: 700, color: 'var(--gold)', fontSize: 18 }}>₹{Number(f.totalFee || calcTotal(f)).toLocaleString('en-IN')}</span>
            </div>
          </motion.div>
        ))}
        {fees.length === 0 && !loading && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px', background: 'white', borderRadius: 16, color: 'var(--gray)' }}>
            <FaMoneyBillWave size={40} style={{ opacity: 0.3, marginBottom: 12 }} />
            <p style={{ marginBottom: 16 }}>No fee structure added.</p>
            <button onClick={openAdd} className="btn-primary"><FaPlus /> Add Fee Structure</button>
          </div>
        )}
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: 20 }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            style={{ background: 'white', borderRadius: 20, padding: 36, width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <h3 style={{ color: 'var(--navy)' }}>{editing ? 'Edit' : 'Add'} Fee Structure</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: 'var(--gray)' }}><FaTimes /></button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Class *</label>
                <select value={form.class} onChange={e => setForm({ ...form, class: e.target.value })} className="form-input">
                  <option value="">Select Class</option>
                  {classes.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Session</label>
                <input value={form.session} onChange={e => setForm({ ...form, session: e.target.value })} className="form-input" placeholder="2024-25" />
              </div>
              <div className="form-group">
                <label className="form-label">Frequency</label>
                <select value={form.frequency} onChange={e => setForm({ ...form, frequency: e.target.value })} className="form-input">
                  {['Monthly', 'Quarterly', 'Half Yearly', 'Annual'].map(f => <option key={f}>{f}</option>)}
                </select>
              </div>
              {feeFields.map(ff => (
                <div key={ff.key} className="form-group">
                  <label className="form-label">{ff.label} (₹)</label>
                  <input type="number" value={form[ff.key]} onChange={e => setForm({ ...form, [ff.key]: e.target.value })} className="form-input" placeholder="0" />
                </div>
              ))}
            </div>
            <div style={{ background: 'var(--cream)', borderRadius: 12, padding: '14px 20px', marginBottom: 20, display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 700, color: 'var(--navy)' }}>Calculated Total:</span>
              <span style={{ fontWeight: 700, color: 'var(--gold)', fontSize: 18 }}>₹{calcTotal(form).toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '13px', borderRadius: 10, background: 'var(--gray-light)', border: 'none', cursor: 'pointer', fontWeight: 600, color: 'var(--gray)' }}>Cancel</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary" style={{ flex: 2, justifyContent: 'center' }}>
                {saving ? 'Saving...' : (editing ? '✓ Update' : '+ Add Fee Structure')}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminFees;
