// Academics.jsx
import { Link } from 'react-router-dom';
const Academics = () => (
  <div>
    <div className="page-hero"><div className="container text-center"><h1>📚 Academics</h1><p>Excellence in education from Nursery to Class 8th</p></div></div>
    <section className="section-pad"><div className="container">
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))',gap:24,marginBottom:48}}>
        {[{icon:'📖',title:'Curriculum',desc:'CBSE-aligned comprehensive curriculum with focus on conceptual understanding.',link:'/academics/curriculum'},
          {icon:'📅',title:'Time Table',desc:'Well-structured daily timetable ensuring balanced academics and activities.',link:'/academics/timetable'},
          {icon:'📝',title:'Examinations',desc:'Regular unit tests, half-yearly and annual examinations for continuous assessment.',link:'/academics/results'},
          {icon:'🔬',title:'Science Labs',desc:'Well-equipped physics, chemistry and biology labs for hands-on learning.'},
          {icon:'💻',title:'Computer Lab',desc:'30+ computers with internet access for digital literacy and coding.'},
          {icon:'📚',title:'Library',desc:'10,000+ books, newspapers, magazines and digital resources.',link:'/library'},
        ].map((item,i)=>(
          <div key={i} className="card" style={{padding:'28px'}}>
            <div style={{fontSize:36,marginBottom:14}}>{item.icon}</div>
            <h3 style={{color:'var(--navy)',marginBottom:8}}>{item.title}</h3>
            <p style={{color:'var(--gray)',fontSize:14,lineHeight:1.7,marginBottom:16}}>{item.desc}</p>
            {item.link && <Link to={item.link} style={{color:'var(--gold)',fontWeight:600,fontSize:14}}>Learn More →</Link>}
          </div>
        ))}
      </div>
    </div></section>
  </div>
);
export { Academics as default };
