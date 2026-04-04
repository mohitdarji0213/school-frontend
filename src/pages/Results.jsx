import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import API from '../services/api';
import { FaClipboardList, FaSearch, FaCheckCircle } from 'react-icons/fa';

const Results = () => {
  const [form, setForm] = useState({ admissionNo: '', session: '2024-25', examType: 'Annual' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const { data } = await API.get(`/results/check?admissionNo=${form.admissionNo}&session=${form.session}&examType=${form.examType}`);
      setResult(data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Result not found. Contact school.');
    } finally { setLoading(false); }
  };

  const gradeColor = (g) => ({ A1: '#1e8449', A2: '#27ae60', B1: '#2471a3', B2: '#1a5276', C1: '#e67e22', C2: '#ca8a04', D: '#7d3c98', F: '#c0392b' }[g] || '#6b7280');

  return (
    <div>
      <div className="page-hero">
        <div className="container text-center">
          <div className="breadcrumb" style={{ justifyContent: 'center' }}><a href="/">Home</a><span>/</span><a href="/academics">Academics</a><span>/</span><span>Results</span></div>
          <h1><FaClipboardList style={{ marginRight: 12 }} />Check Results</h1>
          <p>Enter your admission number to view your examination results</p>
        </div>
      </div>
      <section className="section-pad"><div className="container" style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ background: 'white', borderRadius: 20, padding: '40px', boxShadow: 'var(--shadow)', marginBottom: 36 }}>
          <h3 style={{ color: 'var(--navy)', marginBottom: 24 }}>Search Result</h3>
          <form onSubmit={handleSearch}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div className="form-group" style={{ gridColumn: '1/-1' }}>
                <label className="form-label">Admission Number *</label>
                <input value={form.admissionNo} onChange={e => setForm({ ...form, admissionNo: e.target.value })} className="form-input" placeholder="Enter your admission number" required />
              </div>
              <div className="form-group">
                <label className="form-label">Session</label>
                <select value={form.session} onChange={e => setForm({ ...form, session: e.target.value })} className="form-input">
                  {['2024-25', '2023-24', '2022-23'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Exam Type</label>
                <select value={form.examType} onChange={e => setForm({ ...form, examType: e.target.value })} className="form-input">
                  {['Annual', 'Half Yearly', 'Unit Test 1', 'Unit Test 2', 'Pre-Board'].map(e => <option key={e}>{e}</option>)}
                </select>
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
              {loading ? 'Searching...' : <><FaSearch /> Check Result</>}
            </button>
          </form>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              style={{ background: 'white', borderRadius: 20, padding: '36px', boxShadow: 'var(--shadow)' }}
            >
              <div style={{ textAlign: 'center', marginBottom: 28 }}>
                <div style={{ width: 64, height: 64, background: 'rgba(39,174,96,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <FaCheckCircle size={30} color="var(--green)" />
                </div>
                <h2 style={{ color: 'var(--navy)', marginBottom: 4 }}>{result.studentName}</h2>
                <div style={{ color: 'var(--gray)', fontSize: 14 }}>Class {result.class} | {result.examType} | {result.session}</div>
              </div>

              <div style={{ overflowX: 'auto', marginBottom: 24 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: 'var(--navy)' }}>
                      {['Subject', 'Max Marks', 'Obtained', 'Grade'].map(h => (
                        <th key={h} style={{ padding: '12px 16px', color: 'white', fontSize: 13, textAlign: 'left' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.subjects?.map((s, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? 'white' : 'var(--cream)' }}>
                        <td style={{ padding: '12px 16px', fontWeight: 500 }}>{s.name}</td>
                        <td style={{ padding: '12px 16px' }}>{s.maxMarks}</td>
                        <td style={{ padding: '12px 16px', fontWeight: 600 }}>{s.obtainedMarks}</td>
                        <td style={{ padding: '12px 16px' }}><span style={{ background: `${gradeColor(s.grade)}15`, color: gradeColor(s.grade), borderRadius: 20, padding: '3px 12px', fontWeight: 700, fontSize: 13 }}>{s.grade}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ background: 'var(--cream)', borderRadius: 14, padding: '20px 24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, textAlign: 'center' }}>
                  {[
                    { label: 'Total Marks', value: `${result.obtainedTotal}/${result.totalMarks}` },
                    { label: 'Percentage', value: `${result.percentage}%` },
                    { label: 'Grade', value: result.grade },
                    { label: 'Rank', value: result.rank ? `#${result.rank}` : '—' },
                  ].map((item, i) => (
                    <div key={i}>
                      <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 22, fontWeight: 700, color: 'var(--navy)' }}>{item.value}</div>
                      <div style={{ fontSize: 12, color: 'var(--gray)', marginTop: 4 }}>{item.label}</div>
                    </div>
                  ))}
                </div>
                {result.remarks && <div style={{ marginTop: 16, padding: '12px 16px', background: 'white', borderRadius: 10, fontSize: 14, color: 'var(--navy)', borderLeft: '3px solid var(--gold)' }}>
                  <strong>Teacher's Remarks:</strong> {result.remarks}
                </div>}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div></section>
    </div>
  );
};

export default Results;
