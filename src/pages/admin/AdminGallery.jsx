import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import API from '../../services/api';
import { FaImages, FaPlus, FaTrash, FaUpload, FaTimes, FaStar } from 'react-icons/fa';

const categories = ['Annual Function', 'Sports Day', 'Republic Day', 'Independence Day', 'Science Fair', 'Cultural', 'Classroom', 'Infrastructure', 'Other'];

const AdminGallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [form, setForm] = useState({ title: '', description: '', category: 'Other', featured: false });

  useEffect(() => { fetchGallery(); }, []);

  const fetchGallery = async () => {
    try {
      const { data } = await API.get('/gallery');
      setImages(data);
    } catch { toast.error('Failed to load gallery'); }
    finally { setLoading(false); }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { toast.error('Please select an image file'); return; }
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile || !form.title) { toast.error('Please select an image and enter a title'); return; }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('category', form.category);
      formData.append('featured', form.featured);
      await API.post('/gallery', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      toast.success('Image uploaded successfully!');
      setShowModal(false);
      setSelectedFile(null);
      setPreview('');
      setForm({ title: '', description: '', category: 'Other', featured: false });
      fetchGallery();
    } catch { toast.error('Upload failed. Check Cloudinary settings.'); }
    finally { setUploading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this image?')) return;
    try {
      await API.delete(`/gallery/${id}`);
      toast.success('Deleted');
      setImages(prev => prev.filter(img => img._id !== id));
    } catch { toast.error('Delete failed'); }
  };

  const toggleFeatured = async (img) => {
    try {
      await API.put(`/gallery/${img._id}`, { featured: !img.featured });
      fetchGallery();
    } catch { toast.error('Failed to update'); }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ color: 'var(--navy)', marginBottom: 4 }}>Gallery Management</h2>
          <p style={{ color: 'var(--gray)', fontSize: 14 }}>{images.length} photos uploaded</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary">
          <FaPlus /> Upload Photo
        </button>
      </div>

      {/* Image Grid */}
      {loading ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
          {[...Array(8)].map((_, i) => <div key={i} style={{ height: 200, background: '#e5e7eb', borderRadius: 12 }} />)}
        </div>
      ) : images.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--gray)' }}>
          <FaImages size={48} style={{ opacity: 0.3, marginBottom: 16 }} />
          <p style={{ marginBottom: 16 }}>No photos yet. Upload your first photo!</p>
          <button onClick={() => setShowModal(true)} className="btn-primary"><FaPlus /> Upload Photo</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
          {images.map((img, i) => (
            <motion.div key={img._id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
              style={{ borderRadius: 12, overflow: 'hidden', background: 'white', boxShadow: 'var(--shadow)', position: 'relative' }}
            >
              <div style={{ position: 'relative', height: 160 }}>
                <img src={img.imageUrl} alt={img.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                {img.featured && (
                  <div style={{ position: 'absolute', top: 8, left: 8, background: 'var(--gold)', borderRadius: 20, padding: '3px 8px', fontSize: 11, color: 'var(--navy)', fontWeight: 700 }}>
                    ⭐ Featured
                  </div>
                )}
              </div>
              <div style={{ padding: '12px 14px' }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--navy)', marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{img.title}</div>
                <div className="badge badge-navy" style={{ fontSize: 10, marginBottom: 10 }}>{img.category}</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => toggleFeatured(img)} style={{
                    flex: 1, padding: '7px', borderRadius: 8, fontSize: 13, cursor: 'pointer',
                    background: img.featured ? 'rgba(201,168,76,0.15)' : 'var(--gray-light)',
                    border: `1px solid ${img.featured ? 'var(--gold)' : '#e5e7eb'}`,
                    color: img.featured ? 'var(--gold)' : 'var(--gray)'
                  }}>
                    <FaStar size={11} /> {img.featured ? 'Unfeature' : 'Feature'}
                  </button>
                  <button onClick={() => handleDelete(img._id)} style={{
                    padding: '7px 10px', borderRadius: 8, background: 'rgba(192,57,43,0.08)',
                    border: '1px solid rgba(192,57,43,0.2)', color: 'var(--red-accent)', cursor: 'pointer', fontSize: 13
                  }}><FaTrash size={11} /></button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 2000, padding: 20
        }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            style={{ background: 'white', borderRadius: 20, padding: 36, width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ color: 'var(--navy)' }}>Upload New Photo</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: 'var(--gray)', cursor: 'pointer', fontSize: 18 }}><FaTimes /></button>
            </div>

            {/* File picker */}
            <div style={{ border: '2px dashed #e5e7eb', borderRadius: 12, padding: '32px', textAlign: 'center', marginBottom: 20, cursor: 'pointer', background: 'var(--cream)' }}
              onClick={() => document.getElementById('img-upload').click()}
            >
              {preview ? (
                <img src={preview} alt="Preview" style={{ maxHeight: 180, borderRadius: 8, margin: '0 auto' }} />
              ) : (
                <>
                  <FaUpload size={32} color="var(--gray)" style={{ marginBottom: 12 }} />
                  <p style={{ color: 'var(--gray)', fontSize: 14 }}>Click to select image<br /><span style={{ fontSize: 12 }}>JPG, PNG, WEBP accepted</span></p>
                </>
              )}
              <input id="img-upload" type="file" accept="image/*" onChange={handleFileSelect} style={{ display: 'none' }} />
            </div>

            <div className="form-group">
              <label className="form-label">Photo Title *</label>
              <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="form-input" placeholder="e.g. Annual Sports Day 2024" />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="form-input">
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="form-input" rows={2} />
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', marginBottom: 24 }}>
              <input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} />
              <span style={{ fontSize: 14, color: 'var(--navy)' }}>Mark as Featured (shown on homepage)</span>
            </label>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '13px', borderRadius: 10, background: 'var(--gray-light)', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
              <button onClick={handleUpload} disabled={uploading} className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                {uploading ? 'Uploading...' : <><FaUpload /> Upload Photo</>}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
