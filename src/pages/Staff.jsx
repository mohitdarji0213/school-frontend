import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import API from '../services/api';
import { FaChalkboardTeacher, FaEnvelope, FaPhone, FaSearch } from 'react-icons/fa';

const departments = ['All', 'Management', 'Science', 'Mathematics', 'Languages', 'Social Science', 'Arts', 'Physical Education', 'Computer Science', 'Primary'];

const Staff = () => {
  const [staff, setStaff] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeDept, setActiveDept] = useState('All');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => { fetchStaff(); }, []);

  const fetchStaff = async () => {
    try {
      const { data } = await API.get('/staff');
      setStaff(data);
      setFiltered(data);
    } catch {
      // Demo data
      const demo = [
        { _id: 1, name: 'Dr. Ramesh Kumar Sharma', designation: 'Principal', department: 'Management', qualification: 'Ph.D. Education', experience: '25 years', photoUrl: '', subjects: ['School Administration'], classTeacherOf: '' },
        { _id: 2, name: 'Mrs. Sunita Verma', designation: 'Vice Principal', department: 'Management', qualification: 'M.Ed.', experience: '18 years', photoUrl: '', subjects: ['Hindi', 'Sanskrit'], classTeacherOf: '8th' },
        { _id: 3, name: 'Mr. Anil Kumar Gupta', designation: 'Senior Teacher', department: 'Science', qualification: 'M.Sc. Physics', experience: '14 years', photoUrl: '', subjects: ['Physics', 'Science'], classTeacherOf: '7th' },
        { _id: 4, name: 'Mrs. Priya Sharma', designation: 'Teacher', department: 'Mathematics', qualification: 'M.Sc. Maths', experience: '10 years', photoUrl: '', subjects: ['Mathematics'], classTeacherOf: '6th' },
        { _id: 5, name: 'Mr. Suresh Yadav', designation: 'Teacher', department: 'Languages', qualification: 'M.A. English', experience: '12 years', photoUrl: '', subjects: ['English'], classTeacherOf: '5th' },
        { _id: 6, name: 'Mrs. Kavita Singh', designation: 'Teacher', department: 'Social Science', qualification: 'M.A. History', experience: '8 years', photoUrl: '', subjects: ['History', 'Geography', 'Social Science'], classTeacherOf: '4th' },
        { _id: 7, name: 'Mr. Raj Kishore', designation: 'PET', department: 'Physical Education', qualification: 'B.P.Ed.', experience: '11 years', photoUrl: '', subjects: ['Physical Education', 'Sports'], classTeacherOf: '' },
        { _id: 8, name: 'Mrs. Meena Joshi', designation: 'Teacher', department: 'Primary', qualification: 'B.Ed.', experience: '7 years', photoUrl: '', subjects: ['All Subjects'], classTeacherOf: '3rd' },
      ];
      setStaff(demo);
      setFiltered(demo);
    } finally { setLoading(false); }
  };

  useEffect(() => {
    let result = staff;
    if (activeDept !== 'All') result = result.filter(s => s.department === activeDept);
    if (search) result = result.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.designation.toLowerCase().includes(search.toLowerCase()));
    setFiltered(result);
  }, [activeDept, staff, search]);

  return (
    <div>
      <div className="page-hero">
        <div className="container text-center">
          <div className="breadcrumb" style={{ justifyContent: 'center' }}>
            <a href="/">Home</a><span>/</span><span>Our Staff</span>
          </div>
          <h1><FaChalkboardTeacher style={{ marginRight: 12 }} />Our Teaching Staff</h1>
          <p>Meet the dedicated educators shaping the future of our students</p>
        </div>
      </div>

      <section className="section-pad">
        <div className="container">
          {/* Search */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 28, alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ position: 'relative', flex: '1 1 280px', maxWidth: 360 }}>
              <FaSearch style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray)', fontSize: 14 }} />
              <input type="text" placeholder="Search staff..." value={search} onChange={e => setSearch(e.target.value)} className="form-input" style={{ paddingLeft: 40 }} />
            </div>
            <div style={{ color: 'var(--gray)', fontSize: 14 }}>{filtered.length} staff members</div>
          </div>

          {/* Department Filter */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 40 }}>
            {departments.map(d => (
              <button key={d} onClick={() => setActiveDept(d)} style={{
                padding: '7px 18px', borderRadius: 50, fontSize: 13, fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s',
                border: activeDept === d ? '2px solid var(--gold)' : '2px solid #e5e7eb',
                background: activeDept === d ? 'var(--gold)' : 'white',
                color: activeDept === d ? 'var(--navy)' : 'var(--gray)'
              }}>{d}</button>
            ))}
          </div>

          {/* Staff Grid */}
          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24 }}>
              {[...Array(8)].map((_, i) => <div key={i} style={{ height: 300, background: '#e5e7eb', borderRadius: 16 }} />)}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24 }}>
              {filtered.map((s, i) => (
                <motion.div
                  key={s._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.5 }}
                  className="card"
                  style={{ textAlign: 'center', overflow: 'hidden' }}
                >
                  {/* Photo */}
                  <div style={{ height: 180, background: 'linear-gradient(135deg, var(--navy), var(--navy-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    {s.photoUrl ? (
                      <img src={s.photoUrl} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: 80, height: 80, background: 'rgba(201,168,76,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '3px solid var(--gold)' }}>
                        <FaChalkboardTeacher size={36} color="var(--gold)" />
                      </div>
                    )}
                    {s.classTeacherOf && (
                      <div style={{ position: 'absolute', top: 12, right: 12, background: 'var(--gold)', color: 'var(--navy)', fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20 }}>
                        Class {s.classTeacherOf}
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div style={{ padding: '20px 18px' }}>
                    <h3 style={{ fontSize: 16, color: 'var(--navy)', marginBottom: 4 }}>{s.name}</h3>
                    <div style={{ color: 'var(--gold)', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{s.designation}</div>
                    <div className="badge badge-navy" style={{ marginBottom: 12, fontSize: 11 }}>{s.department}</div>
                    <div style={{ fontSize: 12, color: 'var(--gray)', lineHeight: 1.8 }}>
                      <div><strong>Qualification:</strong> {s.qualification}</div>
                      <div><strong>Experience:</strong> {s.experience}</div>
                      {s.subjects?.length > 0 && (
                        <div><strong>Subjects:</strong> {s.subjects.join(', ')}</div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {filtered.length === 0 && !loading && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--gray)' }}>
              <FaChalkboardTeacher size={40} style={{ marginBottom: 16, opacity: 0.4 }} />
              <p>No staff found.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Staff;
