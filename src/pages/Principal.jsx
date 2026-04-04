const Principal = () => (
  <div>
    <div className="page-hero">
      <div className="container text-center">
        <div className="breadcrumb" style={{ justifyContent: 'center' }}>
          <a href="/">Home</a><span>/</span><a href="/about">About</a><span>/</span><span>Principal's Message</span>
        </div>
        <h1>Principal's Message</h1>
        <p>A word from our respected school principal</p>
      </div>
    </div>
    <section className="section-pad">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 48, alignItems: 'start', maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: 220, height: 280, background: 'linear-gradient(135deg, var(--navy), var(--navy-light))', borderRadius: 20, margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '4px solid var(--gold)' }}>
              <span style={{ fontSize: 80, color: 'var(--gold)' }}>👨‍🎓</span>
            </div>
            <h3 style={{ color: 'var(--navy)', marginBottom: 6 }}>Dr. Ramesh Kumar Sharma</h3>
            <div style={{ color: 'var(--gold)', fontSize: 14, fontWeight: 600 }}>Principal</div>
            <div style={{ color: 'var(--gray)', fontSize: 13, marginTop: 8 }}>M.Ed., Ph.D. | 25 years experience</div>
          </div>
          <div>
            <h2 className="section-title" style={{ marginBottom: 8 }}>Dear Students & Parents,</h2>
            <div className="gold-line" style={{ margin: '12px 0 28px' }} />
            {[
              `Welcome to Lal Bahadur Shastri Senior Secondary School. It is my privilege and honour to lead this institution that has been shaping young minds for nearly five decades. We are committed to providing an education that goes beyond textbooks — one that builds character, instills values, and prepares our students for the challenges of tomorrow.`,
              `At LBS School, we believe that every child has immense potential. Our experienced and dedicated team of teachers works tirelessly to identify each student's unique strengths and nurture them in a supportive, encouraging environment. We maintain a healthy balance between academic rigor and co-curricular activities.`,
              `Our school provides a safe, disciplined, and child-friendly atmosphere where learning is a joyful experience. We regularly update our teaching methodologies to align with the latest educational standards while remaining rooted in our Indian values and culture.`,
              `I warmly invite you to visit our campus, meet our faculty, and experience the LBS difference firsthand. Together, let us build a brighter future for your child.`,
              `Jai Hind! Jai Bharat!`
            ].map((para, i) => (
              <p key={i} style={{ color: 'var(--gray)', lineHeight: 1.9, marginBottom: 18, fontSize: 15 }}>{para}</p>
            ))}
            <div style={{ borderLeft: '3px solid var(--gold)', paddingLeft: 20, marginTop: 28 }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, color: 'var(--navy)', fontStyle: 'italic' }}>Dr. Ramesh Kumar Sharma</div>
              <div style={{ color: 'var(--gray)', fontSize: 13, marginTop: 4 }}>Principal, LBS Senior Secondary School</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);
export default Principal;
