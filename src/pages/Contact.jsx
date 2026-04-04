import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill all required fields.');
      return;
    }
    setLoading(true);
    try {
      // Using EmailJS
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, phone: form.phone, subject: form.subject, message: form.message, to_name: 'LBS School Admin' },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      toast.success('Message sent successfully! We will reply soon.');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      toast.error('Failed to send message. Please call us directly.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: <FaMapMarkerAlt size={22} />, label: 'Address', value: '123 Education Colony, Near Shastri Park,\nJaipur, Rajasthan - 302001' },
    { icon: <FaPhone size={22} />, label: 'Phone', value: '+91 98765 43210\n+91 01412 345678' },
    { icon: <FaEnvelope size={22} />, label: 'Email', value: 'info@lbsschool.edu.in\nadmin@lbsschool.edu.in' },
    { icon: <FaClock size={22} />, label: 'Office Hours', value: 'Mon – Sat: 8:00 AM – 4:00 PM\nSunday: Closed' },
  ];

  return (
    <div>
      <div className="page-hero">
        <div className="container text-center">
          <div className="breadcrumb" style={{ justifyContent: 'center' }}>
            <a href="/">Home</a><span>/</span><span>Contact Us</span>
          </div>
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Reach out for admissions, queries, or feedback.</p>
        </div>
      </div>

      <section className="section-pad">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 48, alignItems: 'start' }}>
            {/* Contact Info */}
            <div>
              <h2 style={{ color: 'var(--navy)', marginBottom: 8 }}>Get In Touch</h2>
              <div className="gold-line" style={{ margin: '12px 0 28px' }} />
              <p style={{ color: 'var(--gray)', lineHeight: 1.8, marginBottom: 32 }}>
                Have questions about admissions, fees, academics, or school activities?
                Our team is ready to help. Visit us at school or reach out via any channel below.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {contactInfo.map((info, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    style={{ display: 'flex', gap: 16, padding: '20px', background: 'var(--cream)', borderRadius: 14, border: '1px solid rgba(201,168,76,0.15)' }}
                  >
                    <div style={{ color: 'var(--gold)', flexShrink: 0, marginTop: 2 }}>{info.icon}</div>
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: 4, fontSize: 14 }}>{info.label}</div>
                      <div style={{ color: 'var(--gray)', fontSize: 14, lineHeight: 1.8, whiteSpace: 'pre-line' }}>{info.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div style={{ background: 'white', borderRadius: 20, padding: '40px', boxShadow: 'var(--shadow)' }}>
              <h3 style={{ color: 'var(--navy)', marginBottom: 24, fontSize: 22 }}>Send Us a Message</h3>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div className="form-group">
                    <label className="form-label">Your Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} className="form-input" placeholder="Full name" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} className="form-input" placeholder="email@example.com" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input name="phone" value={form.phone} onChange={handleChange} className="form-input" placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <select name="subject" value={form.subject} onChange={handleChange} className="form-input">
                      <option value="">Select subject</option>
                      <option>Admission Inquiry</option>
                      <option>Fee Structure</option>
                      <option>Academic Query</option>
                      <option>Transport</option>
                      <option>Complaint</option>
                      <option>General Inquiry</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ gridColumn: '1/-1' }}>
                    <label className="form-label">Your Message *</label>
                    <textarea name="message" value={form.message} onChange={handleChange} className="form-input" rows={5} placeholder="Type your message here..." style={{ resize: 'vertical' }} />
                  </div>
                </div>
                <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: 16, padding: '16px' }}>
                  {loading ? 'Sending...' : <><FaPaperPlane /> Send Message</>}
                </button>
              </form>
            </div>
          </div>

          {/* Map */}
          <div style={{ marginTop: 60, borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--shadow)', height: 400 }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3558.2!2d75.7873!3d26.9124!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDU0JzQ0LjYiTiA3NcKwNDcnMTQuMyJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%" height="400" style={{ border: 0 }} allowFullScreen loading="lazy"
              title="School Location"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
