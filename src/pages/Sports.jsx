// Sports.jsx
const Sports = () => (
  <div>
    <div className="page-hero"><div className="container text-center"><h1>🏆 Sports & Athletics</h1><p>Building champions on and off the field</p></div></div>
    <section className="section-pad"><div className="container">
      <div className="text-center"><h2 className="section-title">Our Sports Programme</h2><div className="gold-line"/><p className="section-subtitle">We believe physical fitness is equally important as academic excellence. Our school offers a comprehensive sports programme.</p></div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:20,marginBottom:60}}>
        {[{emoji:'⚽',name:'Football',desc:'District champion team. Training 3 days a week.'},
          {emoji:'🏏',name:'Cricket',desc:'Annual inter-school cricket tournament participation.'},
          {emoji:'🏃',name:'Athletics',desc:'Track & field events, relay races, marathon.'},
          {emoji:'🏸',name:'Badminton',desc:'Indoor courts, state-level players trained here.'},
          {emoji:'🏐',name:'Volleyball',desc:'Team sports building coordination and teamwork.'},
          {emoji:'🤸',name:'Gymnastics',desc:'Flexibility and strength training for all students.'},
        ].map((s,i)=>(
          <div key={i} className="card" style={{padding:'28px',textAlign:'center'}}>
            <div style={{fontSize:48,marginBottom:14}}>{s.emoji}</div>
            <h3 style={{color:'var(--navy)',marginBottom:8,fontSize:18}}>{s.name}</h3>
            <p style={{color:'var(--gray)',fontSize:14,lineHeight:1.7}}>{s.desc}</p>
          </div>
        ))}
      </div>
      <div style={{background:'linear-gradient(135deg,var(--navy),var(--navy-light))',borderRadius:20,padding:'48px',color:'white',textAlign:'center'}}>
        <h3 style={{color:'var(--gold)',fontFamily:'Playfair Display,serif',fontSize:28,marginBottom:12}}>Annual Sports Day</h3>
        <p style={{color:'rgba(255,255,255,0.8)',fontSize:16,lineHeight:1.8,maxWidth:600,margin:'0 auto'}}>Our Annual Sports Day is the most awaited event of the year. Students compete in 30+ events, parents cheer from the stands, and champions are honoured with medals and trophies. Date: November 20, 2024</p>
      </div>
    </div></section>
  </div>
);
export { Sports as default };
