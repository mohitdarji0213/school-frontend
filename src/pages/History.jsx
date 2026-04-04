// History.jsx
const History = () => (
  <div>
    <div className="page-hero"><div className="container text-center"><div className="breadcrumb" style={{justifyContent:'center'}}><a href="/">Home</a><span>/</span><a href="/about">About</a><span>/</span><span>History</span></div><h1>School History</h1><p>Our Journey Through the Decades</p></div></div>
    <section className="section-pad"><div className="container" style={{maxWidth:800,margin:'0 auto'}}>
      <div className="text-center"><h2 className="section-title">48 Years of Excellence</h2><div className="gold-line"/><p className="section-subtitle">A journey from humble beginnings to becoming one of the most respected schools in the region.</p></div>
      {[{year:'1975',title:'Foundation',desc:'Lal Bahadur Shastri School was established by the Shastri Education Trust with just 5 classrooms, 12 teachers and 200 students. Classes were offered from Nursery to Class 5.'},
        {year:'1985',title:'Expansion',desc:'The school expanded to 10 classrooms and added Classes 6, 7 and 8. The first science laboratory was set up and sports facilities were introduced.'},
        {year:'1995',title:'CBSE Affiliation',desc:'The school received CBSE affiliation, marking a major milestone. Enrollment crossed 1000 students. A new building wing was constructed.'},
        {year:'2005',title:'Digital Era',desc:'Computer lab established with 30 systems. Library expanded with 10,000+ books. Smart boards introduced in senior classrooms.'},
        {year:'2015',title:'Modern Campus',desc:'New multi-purpose hall, science labs, and sports complex built. School received "Best School Award" from State Government.'},
        {year:'2024',title:'Today',desc:'2800+ students, 65+ teachers, modern infrastructure with CCTV, smart classrooms, and a commitment to providing world-class education.'},
      ].map((item,i)=>(
        <div key={i} style={{display:'flex',gap:24,marginBottom:32,padding:'24px',background:i%2===0?'var(--cream)':'white',borderRadius:16,border:'1px solid rgba(201,168,76,0.1)'}}>
          <div style={{background:'var(--gold)',color:'var(--navy)',borderRadius:12,padding:'12px 16px',fontWeight:700,fontSize:16,height:'fit-content',flexShrink:0}}>{item.year}</div>
          <div><h3 style={{color:'var(--navy)',marginBottom:8,fontSize:18}}>{item.title}</h3><p style={{color:'var(--gray)',lineHeight:1.75}}>{item.desc}</p></div>
        </div>
      ))}
    </div></section>
  </div>
);
export default History;
