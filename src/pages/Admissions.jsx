// Admissions.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserGraduate, FaFileAlt, FaCheckCircle, FaArrowRight } from 'react-icons/fa';

const Admissions = () => (
  <div>
    <div className="page-hero"><div className="container text-center"><div className="breadcrumb" style={{justifyContent:'center'}}><a href="/">Home</a><span>/</span><span>Admissions</span></div><h1>Admissions 2024-25</h1><p>Begin your child's journey of excellence at LBS School</p></div></div>
    <section className="section-pad"><div className="container">
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:48,marginBottom:60,alignItems:'start'}}>
        <div>
          <h2 className="section-title">Admission Process</h2><div className="gold-line" style={{margin:'12px 0 28px'}}/>
          {[{step:1,title:'Fill Online Form',desc:'Complete the online registration form with your child\'s details and parent information.'},
            {step:2,title:'Document Submission',desc:'Submit required documents at the school office within 3 days of registration.'},
            {step:3,title:'Entrance Assessment',desc:'Child appears for a basic age-appropriate assessment (applicable for Class 1 and above).'},
            {step:4,title:'Admission Confirmation',desc:'Receive admission letter and pay the fee to confirm your child\'s seat.'},
          ].map((s,i)=>(
            <motion.div key={i} initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} transition={{delay:i*0.1}}
              style={{display:'flex',gap:20,marginBottom:24,padding:'20px',background:'var(--cream)',borderRadius:14}}>
              <div style={{width:44,height:44,background:'var(--gold)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,color:'var(--navy)',flexShrink:0}}>{s.step}</div>
              <div><h4 style={{color:'var(--navy)',marginBottom:6}}>{s.title}</h4><p style={{color:'var(--gray)',fontSize:14,lineHeight:1.7}}>{s.desc}</p></div>
            </motion.div>
          ))}
          <Link to="/admissions/register" className="btn-primary" style={{marginTop:8}}><FaUserGraduate/> Apply Now <FaArrowRight/></Link>
        </div>
        <div>
          <h2 className="section-title">Documents Required</h2><div className="gold-line" style={{margin:'12px 0 28px'}}/>
          <div style={{display:'flex',flexDirection:'column',gap:12,marginBottom:32}}>
            {['Birth Certificate (Original + Photocopy)','Aadhar Card of Child (Photocopy)','Previous School Transfer Certificate','Last Year Report Card','4 Passport Size Photographs','Address Proof (Electricity bill / Rent agreement)','Parent Aadhar Card (Photocopy)'].map((doc,i)=>(
              <div key={i} style={{display:'flex',gap:12,alignItems:'center',padding:'12px 16px',background:'white',borderRadius:10,boxShadow:'0 1px 4px rgba(0,0,0,0.06)'}}>
                <FaCheckCircle color="var(--green)" size={16}/><span style={{fontSize:14,color:'var(--navy)'}}>{doc}</span>
              </div>
            ))}
          </div>
          <h3 style={{color:'var(--navy)',marginBottom:16}}>Age Eligibility</h3>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
            {[['Nursery','3-4 years'],['KG','4-5 years'],['Class 1st','5-6 years'],['Class 2-8th','As per class']].map(([cls,age])=>(
              <div key={cls} style={{padding:'12px 16px',background:'var(--cream)',borderRadius:10,display:'flex',justifyContent:'space-between',fontSize:14}}>
                <span style={{fontWeight:600,color:'var(--navy)'}}>{cls}</span><span style={{color:'var(--gray)'}}>{age}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{textAlign:'center',background:'linear-gradient(135deg,var(--navy),var(--navy-light))',borderRadius:20,padding:'48px',color:'white'}}>
        <h2 style={{color:'var(--gold)',fontFamily:'Playfair Display,serif',marginBottom:12,fontSize:32}}>Ready to Join LBS Family?</h2>
        <p style={{color:'rgba(255,255,255,0.75)',marginBottom:28,fontSize:16}}>Register online now. Admin will contact you within 2 working days.</p>
        <div style={{display:'flex',gap:16,justifyContent:'center',flexWrap:'wrap'}}>
          <Link to="/admissions/register" className="btn-primary" style={{fontSize:16,padding:'16px 36px'}}>Register Now →</Link>
          <Link to="/admissions/fee-structure" className="btn-secondary" style={{fontSize:16,padding:'16px 36px'}}>View Fee Structure</Link>
        </div>
      </div>
    </div></section>
  </div>
);
export default Admissions;
