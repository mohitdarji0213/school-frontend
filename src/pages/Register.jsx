import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import API from '../services/api';
import { FaUserGraduate, FaCheckCircle } from 'react-icons/fa';

const Register = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    studentName: '', dateOfBirth: '', gender: '', applyingClass: '',
    previousSchool: '', fatherName: '', motherName: '',
    parentPhone: '', parentEmail: '', address: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await API.post('/students/register', form);
      setSubmitted(true);
      toast.success('Registration successful! Admin will contact you soon.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--cream)' }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          style={{ background: 'white', borderRadius: 20, padding: '60px 48px', textAlign: 'center', maxWidth: 480, boxShadow: 'var(--shadow-lg)' }}
        >
          <div style={{ width: 80, height: 80, background: 'rgba(39,174,96,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <FaCheckCircle size={40} color="var(--green)" />
          </div>
          <h2 style={{ color: 'var(--navy)', marginBottom: 12 }}>Registration Successful!</h2>
          <p style={{ color: 'var(--gray)', lineHeight: 1.8, marginBottom: 28 }}>
            Thank you for registering <strong style={{ color: 'var(--navy)' }}>{form.studentName}</strong> for Class <strong style={{ color: 'var(--navy)' }}>{form.applyingClass}</strong>.
            Our admin team has been notified and will contact you at <strong>{form.parentPhone}</strong> within 2 working days.
          </p>
          <div style={{ background: 'var(--cream)', borderRadius: 12, padding: '16px 20px', marginBottom: 28, textAlign: 'left' }}>
            <div style={{ fontSize: 14, color: 'var(--navy)', fontWeight: 600, marginBottom: 8 }}>What's Next?</div>
            {['Document verification at school office', 'Entrance assessment (if applicable)', 'Fee payment & admission confirmation'].map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 6, fontSize: 14, color: 'var(--gray)' }}>
                <span style={{ color: 'var(--gold)', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span> {step}
              </div>
            ))}
          </div>
          <a href="/" className="btn-primary" style={{ display: 'inline-flex' }}>Back to Home</a>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-hero">
        <div className="container text-center">
          <div className="breadcrumb" style={{ justifyContent: 'center' }}>
            <a href="/">Home</a><span>/</span><a href="/admissions">Admissions</a><span>/</span><span>Registration</span>
          </div>
          <h1><FaUserGraduate style={{ marginRight: 12 }} />Online Registration</h1>
          <p>Fill in the form below to register your child for admission</p>
        </div>
      </div>

      <section className="section-pad" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            {/* Progress Steps */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 40, gap: 0 }}>
              {[{ n: 1, label: 'Student Info' }, { n: 2, label: 'Parent Info' }, { n: 3, label: 'Review' }].map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: '50%',
                      background: step >= s.n ? 'var(--gold)' : '#e5e7eb',
                      color: step >= s.n ? 'var(--navy)' : 'var(--gray)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: 15, transition: 'all 0.3s'
                    }}>{s.n}</div>
                    <div style={{ fontSize: 12, color: step >= s.n ? 'var(--navy)' : 'var(--gray)', fontWeight: step === s.n ? 600 : 400 }}>{s.label}</div>
                  </div>
                  {i < 2 && <div style={{ width: 80, height: 2, background: step > s.n ? 'var(--gold)' : '#e5e7eb', margin: '0 8px', marginBottom: 24, transition: 'all 0.3s' }} />}
                </div>
              ))}
            </div>

            <div style={{ background: 'white', borderRadius: 20, padding: '40px', boxShadow: 'var(--shadow)' }}>
              {/* Step 1 */}
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h3 style={{ color: 'var(--navy)', marginBottom: 24, fontSize: 22 }}>Student Information</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    <div className="form-group" style={{ gridColumn: '1/-1' }}>
                      <label className="form-label">Student's Full Name *</label>
                      <input name="studentName" value={form.studentName} onChange={handleChange} className="form-input" placeholder="As per birth certificate" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Date of Birth *</label>
                      <input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={handleChange} className="form-input" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Gender *</label>
                      <select name="gender" value={form.gender} onChange={handleChange} className="form-input">
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Applying for Class *</label>
                      <select name="applyingClass" value={form.applyingClass} onChange={handleChange} className="form-input">
                        <option value="">Select Class</option>
                        {['Nursery', 'KG', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'].map(c => (
                          <option key={c} value={c}>Class {c}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Previous School (if any)</label>
                      <input name="previousSchool" value={form.previousSchool} onChange={handleChange} className="form-input" placeholder="Name of previous school" />
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
                    <button
                      onClick={() => {
                        if (!form.studentName || !form.dateOfBirth || !form.gender || !form.applyingClass) {
                          toast.error('Please fill all required fields.');
                          return;
                        }
                        setStep(2);
                      }}
                      className="btn-primary"
                    >Continue →</button>
                  </div>
                </motion.div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h3 style={{ color: 'var(--navy)', marginBottom: 24, fontSize: 22 }}>Parent / Guardian Information</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    <div className="form-group">
                      <label className="form-label">Father's Full Name *</label>
                      <input name="fatherName" value={form.fatherName} onChange={handleChange} className="form-input" placeholder="Father's name" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Mother's Full Name *</label>
                      <input name="motherName" value={form.motherName} onChange={handleChange} className="form-input" placeholder="Mother's name" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Parent's Phone Number *</label>
                      <input name="parentPhone" value={form.parentPhone} onChange={handleChange} className="form-input" placeholder="10-digit mobile number" maxLength={10} />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Parent's Email *</label>
                      <input name="parentEmail" type="email" value={form.parentEmail} onChange={handleChange} className="form-input" placeholder="email@example.com" />
                    </div>
                    <div className="form-group" style={{ gridColumn: '1/-1' }}>
                      <label className="form-label">Complete Address *</label>
                      <textarea name="address" value={form.address} onChange={handleChange} className="form-input" rows={3} placeholder="House No, Street, Area, City, PIN" style={{ resize: 'vertical' }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
                    <button onClick={() => setStep(1)} className="btn-navy">← Back</button>
                    <button onClick={() => {
                      if (!form.fatherName || !form.motherName || !form.parentPhone || !form.parentEmail || !form.address) {
                        toast.error('Please fill all required fields.');
                        return;
                      }
                      setStep(3);
                    }} className="btn-primary">Review & Submit →</button>
                  </div>
                </motion.div>
              )}

              {/* Step 3 - Review */}
              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h3 style={{ color: 'var(--navy)', marginBottom: 24, fontSize: 22 }}>Review Your Application</h3>
                  <div style={{ display: 'grid', gap: 16, marginBottom: 28 }}>
                    {[
                      { label: 'Student Name', value: form.studentName },
                      { label: 'Date of Birth', value: new Date(form.dateOfBirth).toLocaleDateString('en-IN') },
                      { label: 'Gender', value: form.gender },
                      { label: 'Applying for Class', value: form.applyingClass },
                      { label: 'Father\'s Name', value: form.fatherName },
                      { label: 'Mother\'s Name', value: form.motherName },
                      { label: 'Phone', value: form.parentPhone },
                      { label: 'Email', value: form.parentEmail },
                      { label: 'Address', value: form.address },
                    ].map((field, i) => (
                      <div key={i} style={{ display: 'flex', gap: 16, padding: '12px 16px', background: i % 2 === 0 ? 'var(--cream)' : 'white', borderRadius: 8 }}>
                        <span style={{ fontWeight: 600, color: 'var(--navy)', minWidth: 160, fontSize: 14 }}>{field.label}:</span>
                        <span style={{ color: 'var(--gray)', fontSize: 14 }}>{field.value}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 12, padding: '16px 20px', marginBottom: 24, fontSize: 13, color: 'var(--navy)' }}>
                    <strong>Note:</strong> After submission, the admin team will receive your application via email and contact you within 2 working days. Please ensure all details are correct.
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button onClick={() => setStep(2)} className="btn-navy">← Edit</button>
                    <button onClick={handleSubmit} disabled={loading} className="btn-primary">
                      {loading ? 'Submitting...' : '✓ Submit Application'}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
