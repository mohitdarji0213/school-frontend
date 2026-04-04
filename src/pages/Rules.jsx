// Rules.jsx
const Rules = () => (
  <div>
    <div className="page-hero"><div className="container text-center"><h1>📋 Rules & Regulations</h1><p>Guidelines for a disciplined and productive school environment</p></div></div>
    <section className="section-pad"><div className="container" style={{maxWidth:900,margin:'0 auto'}}>
      {[{title:'General Conduct',rules:['Students must greet all teachers respectfully','Use polite language at all times','Maintain cleanliness in classrooms and school premises','Respect school property and fellow students','No ragging, bullying, or misbehavior of any kind','Fighting or violent behavior will lead to immediate suspension']},
        {title:'Attendance & Punctuality',rules:['75% minimum attendance is mandatory for appearing in examinations','Gates close at 8:00 AM sharp; late-comers need Principal\'s permission','Inform school in advance for planned absences','Medical leave requires doctor\'s certificate','3 consecutive unexplained absences will be reported to parents']},
        {title:'Academic Rules',rules:['Complete all homework and assignments on time','Carry all required books and materials daily','Mobile phones are strictly prohibited in school','Cheating in examinations will result in cancellation of paper','Maintain notes and notebooks neatly']},
        {title:'Parents & Visitors',rules:['Parents can meet teachers only during designated parent-teacher meetings','Prior appointment required to meet Principal','Visitors must register at the gate and carry valid ID','Parents should not contact teachers directly on personal phones during school hours']},
      ].map((section,i)=>(
        <div key={i} style={{background:'white',borderRadius:16,padding:'28px',boxShadow:'var(--shadow)',marginBottom:24,borderLeft:'4px solid var(--gold)'}}>
          <h3 style={{color:'var(--navy)',marginBottom:20,fontSize:20}}>{section.title}</h3>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {section.rules.map((rule,j)=>(
              <div key={j} style={{display:'flex',gap:12,alignItems:'flex-start',padding:'10px 14px',background:'var(--cream)',borderRadius:10}}>
                <span style={{color:'var(--gold)',fontWeight:700,flexShrink:0,marginTop:1}}>→</span>
                <span style={{color:'var(--navy)',fontSize:14,lineHeight:1.6}}>{rule}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div></section>
  </div>
);
export { Rules as default };
