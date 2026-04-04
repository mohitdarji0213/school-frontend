import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import API from '../../services/api';
import { FaClipboardList, FaPlus, FaTrash, FaTimes } from 'react-icons/fa';

const classes = ['Nursery', 'KG', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];
const examTypes = ['Half Yearly', 'Annual', 'Unit Test 1', 'Unit Test 2', 'Pre-Board'];
const subjectsList = ['Hindi', 'English', 'Mathematics', 'Science', 'Social Science', 'Sanskrit', 'Computer', 'Drawing', 'Physical Education'];

const emptySubject = { name: '', maxMarks: 100, obtainedMarks: 0, grade: '' };

const AdminResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    studentName: '', admissionNo: '', class: '', section: 'A',
    session: '2024-25', examType: 'Annual', subjects: [{ ...emptySubject }], remarks: ''
  });

  useEffect(() => { fetchResults(); }, []);

  const fetchResults = async () => {
    try {
      const { data } = await API.get('/results');
      setResults(data);
    } catch { toast.error('Failed to load results'); }
    finally { setLoading(false); }
  };

  const addSubject = () => setForm({ ...form, subjects: [...form.subjects, { ...emptySubject }] });
  const removeSubject = (i) => setForm({ ...form, subjects: form.subjects.filter((_, idx) => idx !== i) });
  const updateSubject = (i, field, val) => {
    const subs = [...form.subjects];
    subs[i] = { ...subs[i], [field]: val };
    const grade = (s) => {
      const pct = (s.obtainedMarks / s.maxMarks) * 100;
      if (pct >= 91) return 'A1'; if (pct >= 81) return 'A2';
      if (pct >= 71) return 'B1'; if (pct >= 61) return 'B2';
      if (pct >= 51) return 'C1'; if (pct >= 41) return 'C2';
      if (pct >= 33) return 'D'; return 'F';
    };
    subs[i].grade = grade(subs[i]);
    setForm({ ...form, subjects: subs });
  };

  const handleSave = async () => {
    if (!form.studentName || !form.admissionNo || !form.class) { toast.error('Fill all required fields'); return; }
    setSaving(true);
    try {
      const totalMarks = form.subjects.reduce((a, s) => a + Number(s.maxMarks), 0);
      const obtainedTotal = form.subjects.reduce((a, s) => a + Number(s.obtainedMarks), 0);
      const percentage = ((obtainedTotal / totalMarks) * 100).toFixed(2);
      const pct = parseFloat(percentage);
      const grade = pct >= 91 ? 'A1' : pct >= 81 ? 'A2' : pct >= 71 ? 'B1' : pct >= 61 ? 'B2' : pct >= 51 ? 'C1' : pct >= 41 ? 'C2' : pct >= 33 ? 'D' : 'F';
      await API.post('/results', { ...form, totalMarks, obtainedTotal, percentage, grade });
      toast.success('Result added successfully');
      setShowModal(false);
      setForm({ studentName: '', admissionNo: '', class: '', section: 'A', session: '2024-25', examType: 'Annual', subjects: [{ ...emptySubject }], remarks: '' });
      fetchResults();
    } catch { toast.error('Save failed'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this result?')) return;
    try {
      await API.delete(`/results/${id}`);
      toast.success('Result deleted');
      fetchResults();
    } catch { toast.error('Delete failed'); }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ color: 'var(--navy)', marginBottom: 4 }}>Results Management</h2>
          <p style={{ color: 'var(--gray)', fontSize: 14 }}>{results.length} results uploaded</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary"><FaPlus /> Add Result</button>
      </div>

      <div style={{ background: 'white', borderRadius: 16, boxShadow: 'var(--shadow)', overflow: 'hidden' }}>
        {loading ? <div style={{ padding: 60, textAlign: 'center', color: 'var(--gray)' }}>Loading...</div> : (
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Student Name</th><th>Admission No</th><th>Class</th><th>Exam</th>
                  <th>Session</th><th>Total</th><th>Percentage</th><th>Grade</th><th>Action</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={r._id}>
                    <td style={{ fontWeight: 600 }}>{r.studentName}</td>
                    <td style={{ fontSize: 13 }}>{r.admissionNo}</td>
                    <td><span className="badge badge-navy" style={{ fontSize: 11 }}>{r.class}</span></td>
                    <td style={{ fontSize: 13 }}>{r.examType}</td>
                    <td style={{ fontSize: 13 }}>{r.session}</td>
                    <td style={{ fontSize: 13 }}>{r.obtainedTotal}/{r.totalMarks}</td>
                    <td style={{ fontWeight: 600, color: parseFloat(r.percentage) >= 60 ? 'var(--green)' : 'var(--red-accent)' }}>{r.percentage}%</td>
                    <td><span className={`badge badge-${r.grade?.startsWith('A') ? 'green' : r.grade === 'F' ? 'red' : 'gold'}`}>{r.grade}</span></td>
                    <td><button onClick={() => handleDelete(r._id)} style={{ padding: '5px 9px', borderRadius: 7, background: 'rgba(192,57,43,0.09)', border: 'none', cursor: 'pointer', color: 'var(--red-accent)' }}><FaTrash size={12} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {results.length === 0 && <div style={{ padding: '60px', textAlign: 'center', color: 'var(--gray)' }}><FaClipboardList size={40} style={{ opacity: 0.3, marginBottom: 12 }} /><p>No results added.</p></div>}
          </div>
        )}
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: 20 }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            style={{ background: 'white', borderRadius: 20, padding: 36, width: '100%', maxWidth: 700, maxHeight: '92vh', overflowY: 'auto' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <h3 style={{ color: 'var(--navy)' }}>Add Student Result</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 20, color: 'var(--gray)' }}><FaTimes /></button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
              {[['Student Name *', 'studentName', 'text', 'Full name'], ['Admission No *', 'admissionNo', 'text', 'Admission number'], ['Section', 'section', 'text', 'A'], ['Session', 'session', 'text', '2024-25']].map(([label, key, type, ph]) => (
                <div key={key} className="form-group">
                  <label className="form-label">{label}</label>
                  <input type={type} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} className="form-input" placeholder={ph} style={{ padding: '10px 14px' }} />
                </div>
              ))}
              <div className="form-group">
                <label className="form-label">Class *</label>
                <select value={form.class} onChange={e => setForm({ ...form, class: e.target.value })} className="form-input" style={{ padding: '10px 14px' }}>
                  <option value="">Select Class</option>
                  {classes.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Exam Type</label>
                <select value={form.examType} onChange={e => setForm({ ...form, examType: e.target.value })} className="form-input" style={{ padding: '10px 14px' }}>
                  {examTypes.map(e => <option key={e}>{e}</option>)}
                </select>
              </div>
            </div>

            <h4 style={{ color: 'var(--navy)', marginBottom: 12 }}>Subject Marks</h4>
            {form.subjects.map((sub, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: 10, marginBottom: 10, alignItems: 'flex-end' }}>
                <div>
                  {i === 0 && <label className="form-label">Subject</label>}
                  <select value={sub.name} onChange={e => updateSubject(i, 'name', e.target.value)} className="form-input" style={{ padding: '9px 12px' }}>
                    <option value="">Select</option>
                    {subjectsList.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  {i === 0 && <label className="form-label">Max</label>}
                  <input type="number" value={sub.maxMarks} onChange={e => updateSubject(i, 'maxMarks', e.target.value)} className="form-input" style={{ padding: '9px 12px' }} />
                </div>
                <div>
                  {i === 0 && <label className="form-label">Obtained</label>}
                  <input type="number" value={sub.obtainedMarks} onChange={e => updateSubject(i, 'obtainedMarks', e.target.value)} className="form-input" style={{ padding: '9px 12px' }} />
                </div>
                <div>
                  {i === 0 && <label className="form-label">Grade</label>}
                  <input value={sub.grade} readOnly className="form-input" style={{ padding: '9px 12px', background: 'var(--cream)', fontWeight: 700, color: 'var(--navy)' }} />
                </div>
                <button onClick={() => removeSubject(i)} style={{ padding: '9px', borderRadius: 8, background: 'rgba(192,57,43,0.1)', border: 'none', cursor: 'pointer', color: 'var(--red-accent)', marginBottom: 0 }}><FaTrash size={12} /></button>
              </div>
            ))}
            <button onClick={addSubject} style={{ background: 'none', border: '1px dashed var(--gold)', borderRadius: 8, padding: '8px 16px', color: 'var(--gold)', cursor: 'pointer', fontSize: 13, marginBottom: 20 }}>+ Add Subject</button>

            <div className="form-group">
              <label className="form-label">Teacher's Remarks</label>
              <input value={form.remarks} onChange={e => setForm({ ...form, remarks: e.target.value })} className="form-input" placeholder="e.g. Excellent performance, keep it up!" />
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '13px', borderRadius: 10, background: 'var(--gray-light)', border: 'none', cursor: 'pointer', fontWeight: 600, color: 'var(--gray)' }}>Cancel</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary" style={{ flex: 2, justifyContent: 'center' }}>
                {saving ? 'Saving...' : '+ Save Result'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminResults;
