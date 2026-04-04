import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import API from '../../services/api';
import { FaUserGraduate, FaSearch, FaCheck, FaTimes, FaEye, FaDownload } from 'react-icons/fa';

const classes = ['All', 'Nursery', 'KG', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];
const statuses = ['All', 'Pending', 'Approved', 'Rejected'];

const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeClass, setActiveClass] = useState('All');
  const [activeStatus, setActiveStatus] = useState('All');
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => { fetchStudents(); }, []);

  useEffect(() => {
    let result = students;
    if (activeClass !== 'All') result = result.filter(s => s.applyingClass === activeClass);
    if (activeStatus !== 'All') result = result.filter(s => s.status === activeStatus);
    if (search) result = result.filter(s =>
      s.studentName.toLowerCase().includes(search.toLowerCase()) ||
      s.parentPhone.includes(search) ||
      (s.admissionNumber || '').includes(search)
    );
    setFiltered(result);
  }, [students, activeClass, activeStatus, search]);

  const fetchStudents = async () => {
    try {
      const { data } = await API.get('/students');
      setStudents(data);
    } catch { toast.error('Failed to load students'); }
    finally { setLoading(false); }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/students/${id}`, { status });
      toast.success(`Student ${status.toLowerCase()}`);
      fetchStudents();
      setSelectedStudent(null);
    } catch { toast.error('Update failed'); }
  };

  const deleteStudent = async (id) => {
    if (!confirm('Delete this student record?')) return;
    try {
      await API.delete(`/students/${id}`);
      toast.success('Deleted');
      fetchStudents();
      setSelectedStudent(null);
    } catch { toast.error('Delete failed'); }
  };

  const pendingCount = students.filter(s => s.status === 'Pending').length;

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ color: 'var(--navy)', marginBottom: 4 }}>Student Registrations</h2>
        <p style={{ color: 'var(--gray)', fontSize: 14 }}>
          Total: {students.length} | Pending: <span style={{ color: '#e67e22', fontWeight: 700 }}>{pendingCount}</span>
        </p>
      </div>

      {pendingCount > 0 && (
        <div style={{ background: 'rgba(230,126,34,0.08)', border: '1px solid rgba(230,126,34,0.3)', borderRadius: 12, padding: '14px 20px', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#e67e22', fontWeight: 600, fontSize: 14 }}>⚠ {pendingCount} pending admission{pendingCount > 1 ? 's' : ''} need your review</span>
          <button onClick={() => setActiveStatus('Pending')} style={{ background: '#e67e22', color: 'white', border: 'none', borderRadius: 8, padding: '6px 16px', cursor: 'pointer', fontSize: 13 }}>View Pending</button>
        </div>
      )}

      {/* Filters */}
      <div style={{ background: 'white', borderRadius: 16, padding: '20px', boxShadow: 'var(--shadow)', marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 16 }}>
          <div style={{ position: 'relative', flex: '1 1 240px' }}>
            <FaSearch style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray)', fontSize: 13 }} />
            <input type="text" placeholder="Search by name, phone, admission no..." value={search} onChange={e => setSearch(e.target.value)} className="form-input" style={{ paddingLeft: 40, padding: '10px 10px 10px 40px' }} />
          </div>
          <select value={activeStatus} onChange={e => setActiveStatus(e.target.value)} className="form-input" style={{ maxWidth: 150, padding: '10px 14px' }}>
            {statuses.map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={activeClass} onChange={e => setActiveClass(e.target.value)} className="form-input" style={{ maxWidth: 150, padding: '10px 14px' }}>
            {classes.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div style={{ fontSize: 13, color: 'var(--gray)' }}>Showing {filtered.length} records</div>
      </div>

      {/* Table */}
      <div style={{ background: 'white', borderRadius: 16, boxShadow: 'var(--shadow)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--gray)' }}>Loading students...</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', color: 'var(--gray)' }}>
            <FaUserGraduate size={40} style={{ opacity: 0.3, marginBottom: 12 }} />
            <p>No students found</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Student Name</th>
                  <th>Class</th>
                  <th>Father's Name</th>
                  <th>Phone</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s, i) => (
                  <motion.tr key={s._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}>
                    <td style={{ color: 'var(--gray)', fontSize: 12 }}>{i + 1}</td>
                    <td style={{ fontWeight: 600, color: 'var(--navy)' }}>{s.studentName}</td>
                    <td><span className="badge badge-navy">{s.applyingClass}</span></td>
                    <td>{s.fatherName}</td>
                    <td style={{ fontSize: 13 }}>{s.parentPhone}</td>
                    <td style={{ fontSize: 12, color: 'var(--gray)' }}>{new Date(s.createdAt).toLocaleDateString('en-IN')}</td>
                    <td>
                      <span className={`badge badge-${s.status === 'Approved' ? 'green' : s.status === 'Rejected' ? 'red' : 'gold'}`}>
                        {s.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button onClick={() => setSelectedStudent(s)} style={{ padding: '5px 8px', borderRadius: 6, background: 'rgba(13,33,55,0.06)', border: 'none', cursor: 'pointer', color: 'var(--navy)' }} title="View Details"><FaEye size={12} /></button>
                        {s.status !== 'Approved' && (
                          <button onClick={() => updateStatus(s._id, 'Approved')} style={{ padding: '5px 8px', borderRadius: 6, background: 'rgba(39,174,96,0.1)', border: 'none', cursor: 'pointer', color: 'var(--green)' }} title="Approve"><FaCheck size={12} /></button>
                        )}
                        {s.status !== 'Rejected' && (
                          <button onClick={() => updateStatus(s._id, 'Rejected')} style={{ padding: '5px 8px', borderRadius: 6, background: 'rgba(192,57,43,0.1)', border: 'none', cursor: 'pointer', color: 'var(--red-accent)' }} title="Reject"><FaTimes size={12} /></button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedStudent && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: 20 }}>
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} style={{ background: 'white', borderRadius: 20, padding: 36, width: '100%', maxWidth: 580, maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <h3 style={{ color: 'var(--navy)' }}>Student Details</h3>
              <button onClick={() => setSelectedStudent(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: 'var(--gray)' }}><FaTimes /></button>
            </div>
            <div style={{ display: 'grid', gap: 12 }}>
              {[
                ['Student Name', selectedStudent.studentName],
                ['Date of Birth', new Date(selectedStudent.dateOfBirth).toLocaleDateString('en-IN')],
                ['Gender', selectedStudent.gender],
                ['Applying for Class', selectedStudent.applyingClass],
                ['Previous School', selectedStudent.previousSchool],
                ['Father\'s Name', selectedStudent.fatherName],
                ['Mother\'s Name', selectedStudent.motherName],
                ['Phone', selectedStudent.parentPhone],
                ['Email', selectedStudent.parentEmail],
                ['Address', selectedStudent.address],
                ['Registered On', new Date(selectedStudent.createdAt).toLocaleString('en-IN')],
                ['Status', selectedStudent.status],
              ].map(([label, value], i) => (
                <div key={i} style={{ display: 'flex', gap: 16, padding: '10px 14px', background: i % 2 === 0 ? 'var(--cream)' : 'white', borderRadius: 8 }}>
                  <span style={{ fontWeight: 600, color: 'var(--navy)', minWidth: 150, fontSize: 13 }}>{label}:</span>
                  <span style={{ color: 'var(--gray)', fontSize: 13 }}>{value}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              {selectedStudent.status !== 'Approved' && (
                <button onClick={() => updateStatus(selectedStudent._id, 'Approved')} style={{ flex: 1, padding: '12px', background: 'var(--green)', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 600 }}>✓ Approve</button>
              )}
              {selectedStudent.status !== 'Rejected' && (
                <button onClick={() => updateStatus(selectedStudent._id, 'Rejected')} style={{ flex: 1, padding: '12px', background: 'var(--red-accent)', color: 'white', border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 600 }}>✗ Reject</button>
              )}
              <button onClick={() => deleteStudent(selectedStudent._id)} style={{ padding: '12px 20px', background: 'var(--gray-light)', color: 'var(--gray)', border: 'none', borderRadius: 10, cursor: 'pointer', fontWeight: 600 }}>Delete</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminStudents;
