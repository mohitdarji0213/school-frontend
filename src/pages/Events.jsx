// Events.jsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import API from '../services/api';
import { FaCalendarAlt } from 'react-icons/fa';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    API.get('/events').then(({data})=>setEvents(data)).catch(()=>setEvents([
      {_id:1,title:'Annual Sports Day',date:new Date('2024-11-20'),venue:'School Ground',category:'Sports',description:'Annual sports day celebrating athletic talents. Various competitions including running, jumping, and team sports.'},
      {_id:2,title:'Science Exhibition 2024',date:new Date('2024-12-05'),venue:'School Hall',category:'Academic',description:'Students showcase innovative science projects. Best projects get awards and recognition.'},
      {_id:3,title:'Cultural Programme',date:new Date('2024-12-15'),venue:'School Auditorium',category:'Cultural',description:'Annual cultural evening featuring dance, music, drama and other performances by students.'},
      {_id:4,title:'Republic Day Celebration',date:new Date('2025-01-26'),venue:'School Ground',category:'Academic',description:'Patriotic celebration with flag hoisting, parades, and cultural performances.'},
    ])).finally(()=>setLoading(false));
  },[]);

  const colorMap = {Academic:'#1a5276',Sports:'#e67e22',Cultural:'#7d3c98',Meeting:'#27ae60',Holiday:'#27ae60'};

  return (
    <div>
      <div className="page-hero"><div className="container text-center"><div className="breadcrumb" style={{justifyContent:'center'}}><a href="/">Home</a><span>/</span><span>Events</span></div><h1><FaCalendarAlt style={{marginRight:12}}/>Upcoming Events</h1><p>School events, activities, and important dates</p></div></div>
      <section className="section-pad"><div className="container">
        {loading ? <p>Loading...</p> : (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))',gap:24}}>
            {events.map((ev,i)=>(
              <motion.div key={ev._id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.1}} className="card" style={{padding:'28px'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:16}}>
                  <div style={{background:`${colorMap[ev.category]||'#6b7280'}15`,borderRadius:12,padding:'14px',textAlign:'center',minWidth:64}}>
                    <div style={{fontSize:20,fontWeight:700,color:colorMap[ev.category]||'#6b7280',lineHeight:1}}>{new Date(ev.date).getDate()}</div>
                    <div style={{fontSize:11,color:'var(--gray)',marginTop:2}}>{new Date(ev.date).toLocaleDateString('en-IN',{month:'short'})}</div>
                  </div>
                  <span style={{background:colorMap[ev.category]||'#6b7280',color:'white',borderRadius:20,padding:'3px 12px',fontSize:11,fontWeight:700}}>{ev.category}</span>
                </div>
                <h3 style={{color:'var(--navy)',marginBottom:10,fontSize:18}}>{ev.title}</h3>
                <p style={{color:'var(--gray)',fontSize:14,lineHeight:1.7,marginBottom:14}}>{ev.description}</p>
                <div style={{fontSize:13,color:'var(--navy)',fontWeight:500}}>📍 {ev.venue}</div>
              </motion.div>
            ))}
          </div>
        )}
      </div></section>
    </div>
  );
};
export default Events;
