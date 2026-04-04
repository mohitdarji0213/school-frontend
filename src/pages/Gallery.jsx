import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import API from '../services/api';
import { FaImages, FaSearch, FaExpand } from 'react-icons/fa';

const categories = ['All', 'Annual Function', 'Sports Day', 'Republic Day', 'Independence Day', 'Science Fair', 'Cultural', 'Classroom', 'Infrastructure', 'Other'];

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const { data } = await API.get('/gallery');
      setImages(data);
      setFiltered(data);
    } catch {
      // Show demo images if API fails
      const demo = Array.from({ length: 12 }, (_, i) => ({
        _id: i,
        title: `School Photo ${i + 1}`,
        category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1],
        imageUrl: `https://picsum.photos/seed/school${i}/800/600`,
        description: 'School activity photo'
      }));
      setImages(demo);
      setFiltered(demo);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let result = images;
    if (activeCategory !== 'All') result = result.filter(img => img.category === activeCategory);
    if (searchTerm) result = result.filter(img => img.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setFiltered(result);
  }, [activeCategory, images, searchTerm]);

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div>
      {/* Hero */}
      <div className="page-hero">
        <div className="container text-center">
          <div className="breadcrumb" style={{ justifyContent: 'center' }}>
            <a href="/">Home</a><span>/</span><span>Gallery</span>
          </div>
          <h1><FaImages style={{ marginRight: 12 }} />Photo Gallery</h1>
          <p>Moments, Memories & Milestones from our School Life</p>
        </div>
      </div>

      <section className="section-pad">
        <div className="container">
          {/* Search + Filter */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'space-between', alignItems: 'center', marginBottom: 36 }}>
            <div style={{ position: 'relative', flex: '1 1 280px', maxWidth: 380 }}>
              <FaSearch style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--gray)', fontSize: 14 }} />
              <input
                type="text"
                placeholder="Search photos..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="form-input"
                style={{ paddingLeft: 40 }}
              />
            </div>
            <div style={{ color: 'var(--gray)', fontSize: 14 }}>{filtered.length} photos found</div>
          </div>

          {/* Category Filters */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 40 }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 20px', borderRadius: 50, fontSize: 13, fontWeight: 500,
                  border: activeCategory === cat ? '2px solid var(--gold)' : '2px solid #e5e7eb',
                  background: activeCategory === cat ? 'var(--gold)' : 'white',
                  color: activeCategory === cat ? 'var(--navy)' : 'var(--gray)',
                  cursor: 'pointer', transition: 'all 0.2s'
                }}
              >{cat}</button>
            ))}
          </div>

          {/* Grid */}
          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
              {[...Array(9)].map((_, i) => (
                <div key={i} style={{ aspectRatio: '4/3', background: '#e5e7eb', borderRadius: 12, animation: 'pulse 1.5s infinite' }} />
              ))}
            </div>
          ) : (
            <AnimatePresence>
              <motion.div layout style={{ columns: 3, gap: 16 }} className="gallery-masonry">
                {filtered.map((img, i) => (
                  <motion.div
                    key={img._id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: (i % 9) * 0.05 }}
                    style={{
                      breakInside: 'avoid', marginBottom: 16,
                      borderRadius: 12, overflow: 'hidden',
                      position: 'relative', cursor: 'pointer',
                      boxShadow: 'var(--shadow)'
                    }}
                    onClick={() => openLightbox(i)}
                    whileHover={{ scale: 1.02 }}
                  >
                    <img
                      src={img.imageUrl}
                      alt={img.title}
                      style={{ width: '100%', display: 'block', borderRadius: 12 }}
                      loading="lazy"
                    />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(13,33,55,0.85) 0%, transparent 60%)',
                      opacity: 0, transition: 'opacity 0.3s',
                      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                      padding: 16, borderRadius: 12
                    }}
                      className="gallery-overlay"
                      onMouseEnter={e => e.currentTarget.style.opacity = 1}
                      onMouseLeave={e => e.currentTarget.style.opacity = 0}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div>
                          <div style={{ color: 'white', fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{img.title}</div>
                          <span className="badge badge-gold" style={{ fontSize: 10 }}>{img.category}</span>
                        </div>
                        <FaExpand color="white" size={16} />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {filtered.length === 0 && !loading && (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--gray)' }}>
              <FaImages size={48} style={{ marginBottom: 16, opacity: 0.4 }} />
              <p>No photos found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={filtered.map(img => ({ src: img.imageUrl, title: img.title, description: img.category }))}
      />

      <style>{`
        @media (max-width: 768px) { .gallery-masonry { columns: 2 !important; } }
        @media (max-width: 480px) { .gallery-masonry { columns: 1 !important; } }
      `}</style>
    </div>
  );
};

export default Gallery;
