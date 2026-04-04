// Infrastructure.jsx
const Infrastructure = () => (
  <div>
    <div className="page-hero"><div className="container text-center"><h1>🏫 Infrastructure</h1><p>Modern facilities for holistic development</p></div></div>
    <section className="section-pad"><div className="container">
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:24}}>
        {[{emoji:'🏛️',title:'Classrooms',desc:'45 spacious, well-ventilated classrooms with smart boards, projectors, and comfortable seating for 35-40 students each.'},
          {emoji:'🔬',title:'Science Labs',desc:'Fully equipped Physics, Chemistry, and Biology laboratories with modern apparatus for practical learning.'},
          {emoji:'💻',title:'Computer Lab',desc:'State-of-the-art computer lab with 35 systems, high-speed internet, and latest educational software.'},
          {emoji:'📚',title:'Library',desc:'Air-conditioned library with 12,000+ books, periodicals, newspapers, and a digital resource section.'},
          {emoji:'⚽',title:'Sports Ground',desc:'Large multi-purpose sports ground with football pitch, cricket ground, athletic track, and volleyball court.'},
          {emoji:'🎨',title:'Art Room',desc:'Dedicated art and craft room with all materials for developing creativity and artistic talent.'},
          {emoji:'🎵',title:'Music Room',desc:'Sound-proof music room equipped with various instruments for vocal and instrumental training.'},
          {emoji:'🍽️',title:'Canteen',desc:'Clean, hygienic canteen serving nutritious mid-day meals and snacks at affordable prices.'},
          {emoji:'🚌',title:'Transport',desc:'Fleet of 8 school buses covering major routes with GPS tracking and trained drivers.'},
          {emoji:'🔒',title:'Security',desc:'24/7 CCTV surveillance, trained security guards, and controlled entry-exit system for complete safety.'},
        ].map((f,i)=>(
          <div key={i} className="card" style={{padding:'28px'}}>
            <div style={{fontSize:40,marginBottom:14}}>{f.emoji}</div>
            <h3 style={{color:'var(--navy)',marginBottom:10,fontSize:18}}>{f.title}</h3>
            <p style={{color:'var(--gray)',fontSize:14,lineHeight:1.75}}>{f.desc}</p>
          </div>
        ))}
      </div>
    </div></section>
  </div>
);
export { Infrastructure as default };
