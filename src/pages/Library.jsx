const Library = () => (
  <div>
    <div className="page-hero"><div className="container text-center"><h1>📚 Library</h1><p>A world of knowledge awaits</p></div></div>
    <section className="section-pad"><div className="container" style={{maxWidth:900,margin:'0 auto'}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:48,alignItems:'center',marginBottom:60}}>
        <div>
          <h2 className="section-title">Our School Library</h2><div className="gold-line" style={{margin:'12px 0 24px'}}/>
          <p style={{color:'var(--gray)',lineHeight:1.9,marginBottom:16}}>The LBS School Library is a treasure trove of knowledge with over 12,000 books covering all subjects, fiction, non-fiction, biographies, encyclopedias, and reference materials. It is the intellectual heart of our school.</p>
          <p style={{color:'var(--gray)',lineHeight:1.9,marginBottom:24}}>Students can borrow up to 2 books at a time for a period of 14 days. The library also subscribes to 15+ educational magazines and 5 daily newspapers.</p>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
            {[['12,000+','Total Books'],['500+','Reference Books'],['15+','Magazines'],['8 AM–4 PM','Timings']].map(([val,label])=>(
              <div key={label} style={{textAlign:'center',padding:'16px',background:'var(--cream)',borderRadius:12,border:'1px solid rgba(201,168,76,0.15)'}}>
                <div style={{fontFamily:'Playfair Display,serif',fontSize:24,fontWeight:700,color:'var(--gold)'}}>{val}</div>
                <div style={{fontSize:12,color:'var(--gray)',marginTop:4}}>{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{background:'linear-gradient(135deg,var(--navy),var(--navy-light))',borderRadius:20,padding:'48px',color:'white'}}>
          <h3 style={{color:'var(--gold)',marginBottom:20}}>Library Rules</h3>
          {['Maintain silence in the library at all times','Handle books with care, do not damage','Return books on time to avoid fine','No food or drinks allowed inside','Mobile phones must be on silent mode','Sign the register when borrowing books'].map((rule,i)=>(
            <div key={i} style={{display:'flex',gap:10,alignItems:'flex-start',marginBottom:12}}>
              <span style={{color:'var(--gold)',flexShrink:0,fontWeight:700}}>{i+1}.</span>
              <span style={{color:'rgba(255,255,255,0.8)',fontSize:14,lineHeight:1.6}}>{rule}</span>
            </div>
          ))}
        </div>
      </div>
    </div></section>
  </div>
);
export { Library as default };
