// Transport.jsx
const Transport = () => (
  <div>
    <div className="page-hero"><div className="container text-center"><h1>🚌 School Transport</h1><p>Safe, reliable transport service for our students</p></div></div>
    <section className="section-pad"><div className="container">
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:48,alignItems:'start',marginBottom:48}}>
        <div>
          <h2 className="section-title">Bus Service</h2><div className="gold-line" style={{margin:'12px 0 24px'}}/>
          <p style={{color:'var(--gray)',lineHeight:1.9,marginBottom:20}}>LBS School provides a safe and comfortable bus service covering major areas of the city. Our fleet of 8 GPS-enabled school buses is maintained regularly and driven by experienced, verified drivers.</p>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            {[['8','School Buses'],['25+','Routes Covered'],['GPS','Tracking Available'],['Verified','Drivers & Attendants']].map(([val,label])=>(
              <div key={label} style={{display:'flex',justifyContent:'space-between',padding:'12px 16px',background:'var(--cream)',borderRadius:10,fontSize:14}}>
                <span style={{color:'var(--gray)'}}>{label}</span><span style={{fontWeight:700,color:'var(--gold)'}}>{val}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="section-title">Routes & Timings</h2><div className="gold-line" style={{margin:'12px 0 24px'}}/>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            {[{route:'Route A – Civil Lines',morning:'7:15 AM',afternoon:'3:00 PM',fee:'₹800/month'},
              {route:'Route B – Malviya Nagar',morning:'7:00 AM',afternoon:'3:15 PM',fee:'₹900/month'},
              {route:'Route C – Mansarovar',morning:'6:45 AM',afternoon:'3:30 PM',fee:'₹1,000/month'},
              {route:'Route D – Vaishali Nagar',morning:'7:00 AM',afternoon:'3:10 PM',fee:'₹950/month'},
              {route:'Route E – Sodala',morning:'7:20 AM',afternoon:'3:00 PM',fee:'₹750/month'},
            ].map((r,i)=>(
              <div key={i} style={{background:'white',borderRadius:12,padding:'16px',boxShadow:'0 2px 8px rgba(0,0,0,0.06)'}}>
                <div style={{fontWeight:700,color:'var(--navy)',marginBottom:8,fontSize:14}}>{r.route}</div>
                <div style={{display:'flex',gap:16,fontSize:13,color:'var(--gray)',flexWrap:'wrap'}}>
                  <span>🌅 Pick-up: {r.morning}</span>
                  <span>🌆 Drop: {r.afternoon}</span>
                  <span style={{color:'var(--gold)',fontWeight:600}}>{r.fee}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{background:'rgba(201,168,76,0.08)',border:'1px solid rgba(201,168,76,0.25)',borderRadius:14,padding:'20px 28px',fontSize:14,color:'var(--navy)',lineHeight:1.8}}>
        <strong>Important:</strong> Transport fee is separate from tuition fee and must be paid at the beginning of each month. For new transport registration or route enquiries, contact the school office or call: +91 98765 43210.
      </div>
    </div></section>
  </div>
);
export { Transport as default };
