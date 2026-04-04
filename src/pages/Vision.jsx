// Vision.jsx
const Vision = () => (
  <div>
    <div className="page-hero"><div className="container text-center"><h1>Vision & Mission</h1><p>Our guiding principles and educational philosophy</p></div></div>
    <section className="section-pad"><div className="container" style={{maxWidth:900,margin:'0 auto'}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:32,marginBottom:48}}>
        {[{emoji:'🎯',title:'Our Vision',content:'To be a centre of excellence that produces globally competent, culturally rooted, morally upright, and socially responsible citizens who contribute meaningfully to the nation and the world.'},
          {emoji:'🚀',title:'Our Mission',content:'To provide a safe, nurturing, and intellectually stimulating environment where every child can discover their potential, develop critical thinking, and build the skills and values needed for a fulfilling life.'}
        ].map((item,i)=>(
          <div key={i} style={{background:i===0?'var(--navy)':'var(--cream)',borderRadius:20,padding:'40px',color:i===0?'white':'var(--navy)',border:i===1?'1px solid rgba(201,168,76,0.2)':'none'}}>
            <div style={{fontSize:48,marginBottom:16}}>{item.emoji}</div>
            <h2 style={{fontFamily:'Playfair Display,serif',marginBottom:16,color:i===0?'var(--gold)':'var(--navy)'}}>{item.title}</h2>
            <p style={{lineHeight:1.9,color:i===0?'rgba(255,255,255,0.8)':'var(--gray)'}}>{item.content}</p>
          </div>
        ))}
      </div>
      <h3 style={{textAlign:'center',color:'var(--navy)',marginBottom:32,fontSize:24,fontFamily:'Playfair Display,serif'}}>Our Core Values</h3>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:20}}>
        {['Integrity','Excellence','Discipline','Respect','Creativity','Compassion'].map((val,i)=>(
          <div key={i} style={{textAlign:'center',padding:'24px 16px',background:'var(--cream)',borderRadius:14,border:'2px solid transparent',transition:'all 0.2s'}}
            onMouseEnter={e=>{e.currentTarget.style.border='2px solid var(--gold)';e.currentTarget.style.background='white'}}
            onMouseLeave={e=>{e.currentTarget.style.border='2px solid transparent';e.currentTarget.style.background='var(--cream)'}}>
            <div style={{fontSize:32,marginBottom:12}}>{'🌟💎📚🤝✨❤️'[i]}</div>
            <div style={{fontWeight:700,color:'var(--navy)',fontSize:15}}>{val}</div>
          </div>
        ))}
      </div>
    </div></section>
  </div>
);
export default Vision;
