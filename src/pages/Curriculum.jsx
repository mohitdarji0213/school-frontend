// Curriculum.jsx
const Curriculum = () => (
  <div>
    <div className="page-hero"><div className="container text-center"><h1>📖 Curriculum</h1><p>CBSE-aligned comprehensive academic programme</p></div></div>
    <section className="section-pad"><div className="container">
      <div style={{maxWidth:900,margin:'0 auto'}}>
        <div className="text-center"><h2 className="section-title">Class-wise Subjects</h2><div className="gold-line"/></div>
        <div style={{display:'flex',flexDirection:'column',gap:16,marginTop:40}}>
          {[{classes:'Nursery & KG',subjects:['Language Development','Number Concepts','Environmental Awareness','Arts & Crafts','Physical Development','Music & Rhymes']},
            {classes:'Class 1st - 2nd',subjects:['Hindi','English','Mathematics','Environmental Science','Drawing & Art','Computer Basics','Physical Education']},
            {classes:'Class 3rd - 5th',subjects:['Hindi','English','Mathematics','Science','Social Studies','Sanskrit','Computer Science','Drawing','Physical Education']},
            {classes:'Class 6th - 8th',subjects:['Hindi','English','Mathematics','Science (Physics+Chemistry+Biology)','Social Science (History+Geography+Civics)','Sanskrit','Computer Science','Physical Education']},
          ].map((row,i)=>(
            <div key={i} style={{background:'white',borderRadius:14,padding:'24px',boxShadow:'var(--shadow)',display:'flex',gap:24,alignItems:'center',flexWrap:'wrap'}}>
              <div style={{background:'var(--navy)',color:'white',borderRadius:10,padding:'12px 20px',fontWeight:700,fontSize:14,minWidth:160,textAlign:'center',flexShrink:0}}>{row.classes}</div>
              <div style={{display:'flex',flexWrap:'wrap',gap:8}}>
                {row.subjects.map(s=><span key={s} style={{background:'var(--cream)',color:'var(--navy)',borderRadius:20,padding:'5px 14px',fontSize:13,border:'1px solid rgba(201,168,76,0.2)'}}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div></section>
  </div>
);
export { Curriculum as default };
