// Uniform.jsx
const Uniform = () => (
  <div>
    <div className="page-hero"><div className="container text-center"><h1>👕 School Uniform</h1><p>Dress code and uniform guidelines</p></div></div>
    <section className="section-pad"><div className="container" style={{maxWidth:800,margin:'0 auto'}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:32,marginBottom:48}}>
        {[{title:'Boys Uniform (Classes 1–8)',items:['White shirt with school logo','Navy blue trousers','Black leather shoes and white socks','Navy blue tie with golden stripe','White PT uniform for sports days'],day:'Monday to Saturday'},
          {title:'Girls Uniform (Classes 1–8)',items:['White salwar-kameez with navy blue dupatta','Navy blue shoes with white socks','Hair should be neatly tied with navy blue ribbon','White PT uniform for sports days','No jewellery except small earrings'],day:'Monday to Saturday'},
        ].map((u,i)=>(
          <div key={i} style={{background:'white',borderRadius:16,padding:'28px',boxShadow:'var(--shadow)',borderTop:`4px solid ${i===0?'#2471a3':'#e91e63'}`}}>
            <h3 style={{color:'var(--navy)',marginBottom:6}}>{u.title}</h3>
            <div style={{fontSize:12,color:'var(--gold)',marginBottom:16,fontWeight:600}}>{u.day}</div>
            {u.items.map((item,j)=>(
              <div key={j} style={{display:'flex',gap:10,alignItems:'flex-start',marginBottom:10}}>
                <span style={{color:'var(--gold)',fontWeight:700,flexShrink:0}}>✓</span>
                <span style={{fontSize:14,color:'var(--gray)',lineHeight:1.6}}>{item}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{background:'var(--navy)',borderRadius:16,padding:'28px',color:'white'}}>
        <h3 style={{color:'var(--gold)',marginBottom:16}}>Uniform Guidelines</h3>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
          {['Uniform must be neat, clean and ironed daily','School badge/logo must be clearly visible','Coloured clothes are not permitted on school days','Uniform available at school cooperative store','Contact office for uniform sizing assistance','Students not in proper uniform may be sent home'].map((g,i)=>(
            <div key={i} style={{fontSize:14,color:'rgba(255,255,255,0.8)',display:'flex',gap:8}}><span style={{color:'var(--gold)'}}>•</span>{g}</div>
          ))}
        </div>
      </div>
    </div></section>
  </div>
);
export { Uniform as default };
