import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import API from '../../services/api';
import { FaChalkboardTeacher, FaPlus, FaTrash, FaEdit, FaTimes, FaUpload } from 'react-icons/fa';

const departments = ['Management', 'Science', 'Mathematics', 'Languages', 'Social Science', 'Arts', 'Physical Education', 'Computer Science', 'Primary'];
const designations = ['Principal', 'Vice Principal', 'Senior Teacher', 'Teacher', 'PET', 'Librarian', 'Lab Assistant', 'Peon', 'Accountant'];

const emptyForm = { name: '', designation: '', department: '', qualification: '', experience: '', phone: '', email: '', subjects: '', classTeacherOf: '', joiningDate: '', isActive: true, order: 0 };

const AdminStaff = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchStaff(); }, []);

  const fetchStaff = async () => {
    try {
      const { data } = await API.get('/staff');
      setStaff(data);
    } catch { toast.error('Failed to load staff'); }
    finally { setLoading(false); }
  };

  const openAdd = () => { setEditing(null); setForm(emptyForm); setPhotoFile(null); setPhotoPreview(''); setShowModal(true); };
  const openEdit = (s) => {
    setEditing(s._id);
    setForm({ ...s, subjects: Array.isArray(s.subjects) ? s.subjects.join(', ') : s.subjects || '' });
    setPhotoPreview(s.photoUrl || '');
    setPhotoFile(null);
    setShowModal(true);
  };

  const handlePhotoSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = ev => setPhotoPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!form.name || !form.designation || !form.department) { toast.error('Fill required fields'); return; }
    setSaving(true);
    try {
      const formData = new FormData();
      Object.keys(form).forEach(key => formData.append(key, form[key]));
      if (photoFile) formData.append('photo', photoFile);
      if (editing) {
        await API.put(`/staff/${editing}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Staff updated successfully');
      } else {
        await API.post('/staff', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Staff added successfully');
      }
      setShowModal(false);
      fetchStaff();
    } catch { toast.error('Save failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this staff member?')) return;
    try {
      await API.delete(`/staff/${id}`);
      toast.success('Staff deleted');
      fetchStaff();
    } catch { toast.error('Delete failed'); }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ color: 'var(--navy)', marginBottom: 4 }}>Staff Management</h2>
          <p style={{ color: 'var(--gray)', fontSize: 14 }}>{staff.length} staff members</p>
        </div>
        <button onClick={openAdd} className="btn-primary"><FaPlus /> Add Staff</button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 60, color: 'var(--gray)' }}>Loading staff...</div>
      ) : (
        <div style={{ background: 'white', borderRadius: 16, boxShadow: 'var(--shadow)', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Photo</th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Department</th>
                  <th>Qualification</th>
                  <th>Experience</th>
                  <th>Class Teacher</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((s, i) => (
                  <motion.tr key={s._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}>
                    <td>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--cream)', border: '2px solid var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        {s.photoUrl ? <img src={s.photoUrl} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <FaChalkboardTeacher size={16} color="var(--navy)" />}
                      </div>
                    </td>
                    <td style={{ fontWeight: 600, color: 'var(--navy)' }}>{s.name}</td>
                    <td style={{ fontSize: 13 }}>{s.designation}</td>
                    <td><span className="badge badge-navy" style={{ fontSize: 11 }}>{s.department}</span></td>
                    <td style={{ fontSize: 13 }}>{s.qualification}</td>
                    <td style={{ fontSize: 13 }}>{s.experience}</td>
                    <td style={{ fontSize: 13 }}>{s.classTeacherOf || '—'}</td>
                    <td><span className={`badge badge-${s.isActive ? 'green' : 'red'}`}>{s.isActive ? 'Active' : 'Inactive'}</span></td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button onClick={() => openEdit(s)} style={{ padding: '6px 10px', borderRadius: 7, background: 'rgba(13,33,55,0.07)', border: 'none', cursor: 'pointer', color: 'var(--navy)' }}><FaEdit size={12} /></button>
                        <button onClick={() => handleDelete(s._id)} style={{ padding: '6px 10px', borderRadius: 7, background: 'rgba(192,57,43,0.09)', border: 'none', cursor: 'pointer', color: 'var(--red-accent)' }}><FaTrash size={12} /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          {staff.length === 0 && (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--gray)' }}>
              <FaChalkboardTeacher size={40} style={{ opacity: 0.3, marginBottom: 12 }} />
              <p style={{ marginBottom: 16 }}>No staff added yet.</p>
              <button onClick={openAdd} className="btn-primary"><FaPlus /> Add First Staff</button>
            </div>
          )}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: 20 }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            style={{ background: 'white', borderRadius: 20, padding: 36, width: '100%', maxWidth: 640, maxHeight: '92vh', overflowY: 'auto' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ color: 'var(--navy)' }}>{editing ? 'Edit Staff' : 'Add New Staff'}</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: 'var(--gray)', cursor: 'pointer', fontSize: 20 }}><FaTimes /></button>
            </div>

            {/* Photo */}
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ width: 100, height: 100, borderRadius: '50%', margin: '0 auto 12px', background: 'var(--cream)', border: '3px solid var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', cursor: 'pointer' }}
                onClick={() => document.getElementById('staff-photo').click()}>
                {photoPreview ? <img src={photoPreview} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="preview" /> : <FaUpload size={28} color="var(--gray)" />}
              </div>
              <button onClick={() => document.getElementById('staff-photo').click()} style={{ background: 'none', border: '1px solid var(--gold)', borderRadius: 20, padding: '5px 16px', fontSize: 12, color: 'var(--gold)', cursor: 'pointer' }}>
                Upload Photo
              </button>
              <input id="staff-photo" type="file" accept="image/*" onChange={handlePhotoSelect} style={{ display: 'none' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { label: 'Full Name *', key: 'name', type: 'text', placeholder: 'Staff full name' },
                { label: 'Phone', key: 'phone', type: 'tel', placeholder: '10-digit number' },
                { label: 'Email', key: 'email', type: 'email', placeholder: 'staff@email.com' },
                { label: 'Qualification *', key: 'qualification', type: 'text', placeholder: 'e.g. M.Sc., B.Ed.' },
                { label: 'Experience *', key: 'experience', type: 'text', placeholder: 'e.g. 10 years' },
                { label: 'Class Teacher Of', key: 'classTeacherOf', type: 'text', placeholder: 'e.g. 5th A' },
                { label: 'Joining Date', key: 'joiningDate', type: 'date', placeholder: '' },
                { label: 'Order (for sorting)', key: 'order', type: 'number', placeholder: '0' },
              ].map(field => (
                <div key={field.key} className="form-group">
                  <label className="form-label">{field.label}</label>
                  <input type={field.type} value={form[field.key] || ''} onChange={e => setForm({ ...form, [field.key]: e.target.value })} className="form-input" style={{ padding: '10px 14px' }} placeholder={field.placeholder} />
                </div>
              ))}
              <div className="form-group">
                <label className="form-label">Designation *</label>
                <select value={form.designation} onChange={e => setForm({ ...form, designation: e.target.value })} className="form-input" style={{ padding: '10px 14px' }}>
                  <option value="">Select</option>
                  {designations.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Department *</label>
                <select value={form.department} onChange={e => setForm({ ...form, department: e.target.value })} className="form-input" style={{ padding: '10px 14px' }}>
                  <option value="">Select</option>
                  {departments.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div className="form-group" style={{ gridColumn: '1/-1' }}>
                <label className="form-label">Subjects (comma separated)</label>
                <input value={form.subjects || ''} onChange={e => setForm({ ...form, subjects: e.target.value })} className="form-input" style={{ padding: '10px 14px' }} placeholder="e.g. Mathematics, Science" />
              </div>
              <div className="form-group" style={{ gridColumn: '1/-1' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                  <input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} />
                  <span style={{ fontSize: 14, color: 'var(--navy)', fontWeight: 500 }}>Currently Active Staff Member</span>
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '13px', borderRadius: 10, background: 'var(--gray-light)', border: 'none', cursor: 'pointer', fontWeight: 600, color: 'var(--gray)' }}>Cancel</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary" style={{ flex: 2, justifyContent: 'center' }}>
                {saving ? 'Saving...' : (editing ? '✓ Update Staff' : '+ Add Staff')}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminStaff;
