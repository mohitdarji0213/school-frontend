// Timetable.jsx (public)
import { useState, useEffect } from 'react';
import API from '../services/api';
const TimetablePage = () => {
  const [cls, setCls] = useState('1st');
  const [data, setData] = useState([]);
  const classes = ['1st','2nd','3rd','4th','5th','6th','7th','8th'];
  const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  useEffect(()=>{ API.get(`/timetable?class=${cls}&session=2024-25`).then(r=>setData(r.data)).catch(()=>setData([])); },[cls]);
  return (
    <div>
      <div className="page-hero"><div className="container text-center"><h1>⏰ Time Table</h1><p>Daily class schedule for session 2024-25</p></div></div>
      <section className="section-pad"><div className="container">
        <div style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:32}}>
          {classes.map(c=><button key={c} onClick={()=>setCls(c)} style={{padding:'8px 20px',borderRadius:50,fontSize:13,fontWeight:600,cursor:'pointer',border:cls===c?'2px solid var(--gold)':'2px solid #e5e7eb',background:cls===c?'var(--gold)':'white',color:cls===c?'var(--navy)':'var(--gray)'}}>Class {c}</button>)}
        </div>
        {data.length===0 ? <div style={{textAlign:'center',padding:'60px',color:'var(--gray)',background:'white',borderRadius:16}}>Timetable for Class {cls} not uploaded yet. Please contact the school office.</div>
        : days.map(day=>{const dayData=data.find(d=>d.day===day); return dayData?(
          <div key={day} style={{background:'white',borderRadius:14,padding:'20px',boxShadow:'var(--shadow)',marginBottom:16}}>
            <h4 style={{color:'var(--navy)',marginBottom:14,fontSize:16,borderBottom:'2px solid var(--gold)',paddingBottom:8}}>{day}</h4>
            <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
              {dayData.periods?.map((p,i)=><div key={i} style={{background:'var(--cream)',borderRadius:10,padding:'10px 16px',textAlign:'center',minWidth:100,border:'1px solid rgba(201,168,76,0.15)'}}>
                <div style={{fontSize:10,color:'var(--gray)'}}>P{p.periodNo} | {p.startTime}</div>
                <div style={{fontWeight:700,color:'var(--navy)',fontSize:14,marginTop:4}}>{p.subject||'—'}</div>
                {p.teacher&&<div style={{fontSize:11,color:'var(--gold)',marginTop:3}}>{p.teacher}</div>}
              </div>)}
            </div>
          </div>
        ):null;})}
      </div></section>
    </div>
  );
};
export { TimetablePage as default };
