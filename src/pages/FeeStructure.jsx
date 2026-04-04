// FeeStructure.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import API from '../services/api';
import { FaMoneyBillWave, FaCheckCircle } from 'react-icons/fa';

const FeeStructure = () => {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/fees').then(({ data }) => setFees(data)).catch(() => {
      setFees([
        { _id: 1, class: 'Nursery', tuitionFee: 800, examFee: 200, sportsFee: 100, computerFee: 200, totalFee: 1300, frequency: 'Monthly' },
        { _id: 2, class: 'KG', tuitionFee: 900, examFee: 200, sportsFee: 100, computerFee: 200, totalFee: 1400, frequency: 'Monthly' },
        { _id: 3, class: '1st', tuitionFee: 1000, examFee: 250, sportsFee: 150, computerFee: 250, totalFee: 1650, frequency: 'Monthly' },
        { _id: 4, class: '2nd', tuitionFee: 1000, examFee: 250, sportsFee: 150, computerFee: 250, totalFee: 1650, frequency: 'Monthly' },
        { _id: 5, class: '3rd', tuitionFee: 1100, examFee: 300, sportsFee: 150, computerFee: 250, totalFee: 1800, frequency: 'Monthly' },
        { _id: 6, class: '4th', tuitionFee: 1100, examFee: 300, sportsFee: 150, computerFee: 250, totalFee: 1800, frequency: 'Monthly' },
        { _id: 7, class: '5th', tuitionFee: 1200, examFee: 350, sportsFee: 200, computerFee: 300, totalFee: 2050, frequency: 'Monthly' },
        { _id: 8, class: '6th', tuitionFee: 1300, examFee: 350, sportsFee: 200, computerFee: 300, totalFee: 2150, frequency: 'Monthly' },
        { _id: 9, class: '7th', tuitionFee: 1400, examFee: 400, sportsFee: 200, computerFee: 350, totalFee: 2350, frequency: 'Monthly' },
        { _id: 10, class: '8th', tuitionFee: 1500, examFee: 400, sportsFee: 200, computerFee: 350, totalFee: 2450, frequency: 'Monthly' },
      ]);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="page-hero">
        <div className="container text-center">
          <div className="breadcrumb" style={{ justifyContent: 'center' }}><a href="/">Home</a><span>/</span><a href="/admissions">Admissions</a><span>/</span><span>Fee Structure</span></div>
          <h1><FaMoneyBillWave style={{ marginRight: 12 }} />Fee Structure</h1>
          <p>Session 2024-25 | Transparent fee structure for all classes</p>
        </div>
      </div>
      <section className="section-pad"><div className="container">
        <div style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.25)', borderRadius: 14, padding: '20px 28px', marginBottom: 40, display: 'flex', gap: 16 }}>
          <span style={{ fontSize: 24 }}>ℹ️</span>
          <div style={{ fontSize: 14, color: 'var(--navy)', lineHeight: 1.7 }}>
            <strong>Note:</strong> All fees are per month unless specified. One-time Admission fee of ₹2,000 applicable for new admissions.
            Annual examination fee collected once per year. Contact school for transport fee details based on route.
          </div>
        </div>
        {loading ? <p>Loading...</p> : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: 'var(--shadow)' }}>
              <thead>
                <tr style={{ background: 'var(--navy)' }}>
                  {['Class', 'Tuition Fee', 'Exam Fee', 'Sports Fee', 'Computer Fee', 'Total/Month', 'Apply'].map(h => (
                    <th key={h} style={{ padding: '16px 20px', color: 'white', fontSize: 14, fontWeight: 600, textAlign: 'left' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {fees.map((f, i) => (
                  <motion.tr key={f._id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                    style={{ background: i % 2 === 0 ? 'white' : 'var(--cream)' }}
                  >
                    <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--navy)' }}>Class {f.class}</td>
                    {[f.tuitionFee, f.examFee, f.sportsFee, f.computerFee].map((val, j) => (
                      <td key={j} style={{ padding: '14px 20px', color: 'var(--gray)', fontSize: 14 }}>₹{Number(val || 0).toLocaleString('en-IN')}</td>
                    ))}
                    <td style={{ padding: '14px 20px', fontWeight: 700, color: 'var(--gold)', fontSize: 16 }}>₹{Number(f.totalFee).toLocaleString('en-IN')}</td>
                    <td style={{ padding: '14px 20px' }}>
                      <Link to="/admissions/register" style={{ background: 'var(--navy)', color: 'white', borderRadius: 20, padding: '6px 16px', fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap' }}>Apply Now</Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div style={{ marginTop: 40 }}>
          <h3 style={{ color: 'var(--navy)', marginBottom: 20 }}>Includes in Fee</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 14 }}>
            {['Quality CBSE Education', 'Smart Classroom Access', 'Library Membership', 'Annual Function', 'Sports Activities', 'Safety & Security'].map(item => (
              <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '12px 16px', background: 'var(--cream)', borderRadius: 10 }}>
                <FaCheckCircle color="var(--green)" size={16} />
                <span style={{ fontSize: 14, color: 'var(--navy)', fontWeight: 500 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div></section>
    </div>
  );
};

export default FeeStructure;
