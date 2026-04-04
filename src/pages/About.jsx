// ==========================================
// About.jsx
// ==========================================
export const About = () => {
  return (
    <div>
      <div className="page-hero">
        <div className="container text-center">
          <div className="breadcrumb" style={{ justifyContent: 'center' }}>
            <a href="/">Home</a><span>/</span><span>About Us</span>
          </div>
          <h1>About Our School</h1>
          <p>Learning, Growing, Achieving Together Since 1975</p>
        </div>
      </div>
      <section className="section-pad">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
            <div>
              <div className="badge badge-gold" style={{ marginBottom: 16 }}>Our Story</div>
              <h2 className="section-title">A Legacy of Excellence</h2>
              <div className="gold-line" style={{ margin: '12px 0 24px' }} />
              <p style={{ color: 'var(--gray)', lineHeight: 1.9, marginBottom: 20 }}>
                Lal Bahadur Shastri Senior Secondary School was founded in 1975 with a noble vision: to provide quality education to children of all backgrounds. Named after the great statesman and Prime Minister of India, our school carries forward his legacy of simplicity, integrity, and hard work.
              </p>
              <p style={{ color: 'var(--gray)', lineHeight: 1.9, marginBottom: 20 }}>
                Over 48 years, we have grown from a small school with just 200 students to a thriving institution of 2800+ students. Our CBSE-affiliated curriculum from Nursery to Class 8th ensures a strong academic foundation while our co-curricular programs build character.
              </p>
              <p style={{ color: 'var(--gray)', lineHeight: 1.9 }}>
                We believe every child is unique and deserves individual attention, encouragement, and the opportunity to discover their potential.
              </p>
            </div>
            <div style={{ background: 'linear-gradient(135deg, var(--navy), var(--navy-light))', borderRadius: 20, padding: '48px', color: 'white', textAlign: 'center' }}>
              <div style={{ fontSize: 60, fontFamily: 'Playfair Display, serif', fontWeight: 900, color: 'var(--gold)', lineHeight: 1 }}>1975</div>
              <div style={{ fontSize: 18, marginTop: 8, marginBottom: 32 }}>Year of Establishment</div>
              {[['2800+', 'Students'], ['65+', 'Teachers'], ['48', 'Years'], ['320+', 'Awards']].map(([val, label]) => (
                <div key={label} style={{ marginBottom: 16, padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ color: 'var(--gold)', fontSize: 24, fontWeight: 700 }}>{val}</span>
                  <span style={{ color: 'rgba(255,255,255,0.7)', marginLeft: 12, fontSize: 14 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
