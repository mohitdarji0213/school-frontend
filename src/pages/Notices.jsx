import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import API from '../services/api';
import { FaBullhorn, FaFilter } from 'react-icons/fa';

const categories = ['All', 'General', 'Exam', 'Holiday', 'Fee', 'Admission', 'Sports', 'Cultural', 'Emergency'];

const Notices = () => {
  const [notices, setNotices] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchNotices(); }, []);
  useEffect(() => {
    setFiltered(category === 'All' ? notices : notices.filter(n => n.category === category));
  }, [category, notices]);

  const fetchNotices = async () => {
    try {
      const { data } = await API.get('/notices');
      setNotices(data);
      setFiltered(data);
    } catch {
      const demo = [
        { _id: 1, title: 'Half Yearly Examination Schedule 2024-25', content: 'Half yearly examinations will commence from 15th October 2024. Students must carry their admit cards. Syllabus is available on the school notice board.', category: 'Exam', isImportant: true, createdAt: new Date() },
        { _id: 2, title: 'Diwali Holiday Notice', content: 'School will remain closed from October 28 to November 2 on account of Diwali festival. Classes will resume from November 4, 2024.', category: 'Holiday', isImportant: false, createdAt: new Date() },
        { _id: 3, title: 'Admissions Open for Session 2025-26', content: 'Admissions for the academic session 2025-26 are now open. Parents are requested to fill the online form available on our website. Limited seats available.', category: 'Admission', isImportant: true, createdAt: new Date() },
        { _id: 4, title: 'Annual Sports Day - November 20, 2024', content: 'Annual Sports Day will be held on November 20, 2024. All students must participate. Parents are cordially invited to attend the event.', category: 'Sports', isImportant: false, createdAt: new Date() },
        { _id: 5, title: 'Fee Submission Reminder', content: 'October month fee is due. Parents are requested to pay the fee before October 31 to avoid late charges. Fee can be submitted at school reception or online.', category: 'Fee', isImportant: true, createdAt: new Date() },
      ];
      setNotices(demo);
      setFiltered(demo);
    } finally { setLoading(false); }
  };

  const getCategoryColor = (cat) => {
    const colors = { Exam: '#c0392b', Holiday: '#27ae60', Admission: '#1a5276', Sports: '#e67e22', Fee: '#7d3c98', Emergency: '#e74c3c', Cultural: '#e91e63', General: '#6b7280' };
    return colors[cat] || '#6b7280';
  };

  return (
    <div>
      <div className="page-hero"><div className="container text-center"><div className="breadcrumb" style={{justifyContent:'center'}}><a href="/">Home</a><span>/</span><span>Notices</span></div><h1><FaBullhorn style={{marginRight:12}}/>Notice Board</h1><p>Stay updated with all school announcements and notices</p></div></div>
      <section className="section-pad">
        <div className="container">
          <div style={{display:'flex',gap:10,flexWrap:'wrap',marginBottom:36}}>
            {categories.map(cat=>(
              <button key={cat} onClick={()=>setCategory(cat)} style={{padding:'7px 18px',borderRadius:50,fontSize:13,fontWeight:500,cursor:'pointer',transition:'all 0.2s',border:category===cat?`2px solid ${getCategoryColor(cat)}`:'2px solid #e5e7eb',background:category===cat?getCategoryColor(cat):'white',color:category===cat?'white':'var(--gray)'}}>{cat}</button>
            ))}
          </div>
          {loading ? <p style={{color:'var(--gray)'}}>Loading notices...</p> : (
            <div style={{display:'flex',flexDirection:'column',gap:16}}>
              {filtered.map((notice,i)=>(
                <motion.div key={notice._id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.07}}
                  style={{background:'white',borderRadius:14,padding:'24px 28px',boxShadow:'var(--shadow)',borderLeft:`4px solid ${notice.isImportant?'var(--gold)':getCategoryColor(notice.category)}`}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:12,marginBottom:12}}>
                    <div style={{display:'flex',gap:10,alignItems:'center',flexWrap:'wrap'}}>
                      <span style={{background:getCategoryColor(notice.category),color:'white',borderRadius:20,padding:'3px 12px',fontSize:11,fontWeight:700}}>{notice.category}</span>
                      {notice.isImportant && <span style={{background:'rgba(201,168,76,0.15)',color:'var(--gold)',borderRadius:20,padding:'3px 12px',fontSize:11,fontWeight:700,border:'1px solid rgba(201,168,76,0.3)'}}>⚠ IMPORTANT</span>}
                    </div>
                    <span style={{fontSize:12,color:'var(--gray)'}}>{new Date(notice.createdAt).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}</span>
                  </div>
                  <h3 style={{color:'var(--navy)',marginBottom:10,fontSize:18}}>{notice.title}</h3>
                  <p style={{color:'var(--gray)',lineHeight:1.75,fontSize:15}}>{notice.content}</p>
                  {notice.targetClass && notice.targetClass!=='All' && <div style={{marginTop:12,fontSize:13,color:'var(--navy)',fontWeight:600}}>For: Class {notice.targetClass}</div>}
                </motion.div>
              ))}
              {filtered.length===0 && <div style={{textAlign:'center',padding:'60px',color:'var(--gray)'}}><FaBullhorn size={36} style={{opacity:0.3,marginBottom:12}}/><p>No notices in this category.</p></div>}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
export default Notices;
