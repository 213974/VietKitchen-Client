import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { usePromotions, type Promotion } from '../../../hooks/usePromotions';
import { supabase } from '../../../services/supabaseClient';
import './ManagePromotionsPage.css';

const newPromotionInitialState = {
  title: '',
  content: '',
  image_url: '',
  display_type: 'BANNER' as const,
  persistence_type: 'PERMANENT' as const,
  duration_seconds: null,
  is_active: false,
};

const ManagePromotionsPage = () => {
  const { promotions, isLoading, error, refetch } = usePromotions(true);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingPromo, setEditingPromo] = useState<Partial<Promotion> | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [status, setStatus] = useState({ message: '', type: '' });

  useEffect(() => {
    if (!isFormVisible) {
      setEditingPromo(null);
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  }, [isFormVisible]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPromo?.title) return;
    
    setStatus({ message: 'Saving...', type: 'loading' });
    let finalImageUrl = editingPromo.image_url || '';

    // --- New Image Upload Logic ---
    if (selectedFile) {
      const fileName = `${Date.now()}-${selectedFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from('promotions-images')
        .upload(fileName, selectedFile);

      if (uploadError) {
        setStatus({ message: `Storage Error: ${uploadError.message}`, type: 'error' });
        return;
      }

      const { data: urlData } = supabase.storage
        .from('promotions-images')
        .getPublicUrl(fileName);
      
      finalImageUrl = urlData.publicUrl;
    }

    const promoDataToSave = { ...editingPromo, image_url: finalImageUrl };

    const { error: queryError } = promoDataToSave.id
      ? await supabase.from('promotions').update(promoDataToSave).eq('id', promoDataToSave.id)
      : await supabase.from('promotions').insert([promoDataToSave]);

    if (queryError) {
      setStatus({ message: `Error: ${queryError.message}`, type: 'error' });
    } else {
      setStatus({ message: 'Promotion successfully saved!', type: 'success' });
      setIsFormVisible(false);
      refetch();
    }
  };

  const handleDelete = async (promoId: number) => {
    if (window.confirm("Are you sure you want to delete this promotion?")) {
      setStatus({ message: 'Deleting...', type: 'loading' });
      const { error: deleteError } = await supabase.from('promotions').delete().eq('id', promoId);
      if (deleteError) {
        setStatus({ message: `Error: ${deleteError.message}`, type: 'error' });
      } else {
        setStatus({ message: 'Promotion deleted.', type: 'success' });
        refetch();
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setEditingPromo(prev => ({ ...prev, [name]: val }));
  };
  
  const startNewPromo = () => {
    setEditingPromo(newPromotionInitialState);
    setIsFormVisible(true);
  };
  
  const startEditingPromo = (promo: Promotion) => {
    setEditingPromo(promo);
    setPreviewUrl(promo.image_url); // Set existing image as preview
    setIsFormVisible(true);
  };

  return (
    <motion.div className="manage-promotions-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="promotions-header">
        <h1>Manage Promotions</h1>
        {!isFormVisible && <button className="save-button" onClick={startNewPromo}>+ Add New</button>}
      </div>
      <p>Create, edit, and activate banners and side promotions for your website.</p>
      
      {status.message && <div className={`status-message ${status.type}`}>{status.message}</div>}

      {isFormVisible && editingPromo && (
        <div className="admin-card promo-form-card">
          <h3>{editingPromo.id ? 'Edit Promotion' : 'Create New Promotion'}</h3>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group span-2">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" name="title" value={editingPromo.title || ''} onChange={handleInputChange} required />
            </div>

            <div className="form-group span-2">
              <label htmlFor="display_type">Display Type</label>
              <select id="display_type" name="display_type" value={editingPromo.display_type} onChange={handleInputChange}>
                <option value="BANNER">Top Banner</option>
                <option value="SIDE_LEFT">Side - Left</option>
                <option value="SIDE_RIGHT">Side - Right</option>
              </select>
            </div>
            
            {/* --- Conditional fields based on display type --- */}
            {editingPromo.display_type === 'BANNER' ? (
              <>
                <div className="form-group">
                  <label htmlFor="content">Banner Content</label>
                  <textarea id="content" name="content" value={editingPromo.content || ''} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="persistence_type">Banner Behavior</label>
                  <select id="persistence_type" name="persistence_type" value={editingPromo.persistence_type} onChange={handleInputChange}>
                    <option value="PERMANENT">Permanent (Always shows)</option>
                    <option value="SESSION">Session (Dismissible)</option>
                  </select>
                  <label htmlFor="duration_seconds" style={{marginTop: '1rem'}}>Auto-Dismiss (seconds)</label>
                  <input type="number" id="duration_seconds" name="duration_seconds" value={editingPromo.duration_seconds || ''} onChange={handleInputChange} placeholder="e.g., 30 (optional)" />
                </div>
              </>
            ) : (
              <div className="form-group span-2">
                <label htmlFor="imageFile">Upload Image</label>
                <input type="file" id="imageFile" name="imageFile" accept="image/*" onChange={handleFileChange} />
                {previewUrl && <img src={previewUrl} alt="Promotion preview" className="image-preview" />}
              </div>
            )}
            
            <div className="form-group span-2 form-actions-group">
              <div className="toggle-group">
                <label htmlFor="is_active">Active</label>
                <input type="checkbox" id="is_active" name="is_active" checked={editingPromo.is_active || false} onChange={handleInputChange} className="promo-toggle" />
              </div>
              <div className="form-actions">
                <button type="button" className="secondary-button" onClick={() => setIsFormVisible(false)}>Cancel</button>
                <button type="submit" className="save-button">Save Promotion</button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="promo-list-container">
        {isLoading && <p>Loading promotions...</p>}
        {error && <div className="status-message error">{error}</div>}
        {!isLoading && promotions.map(promo => (
          <div key={promo.id} className="admin-card promo-list-item">
            <div className={`status-indicator ${promo.is_active ? 'active' : 'inactive'}`}>{promo.is_active ? 'Active' : 'Inactive'}</div>
            <div className="promo-info">
              <h4>{promo.title}</h4>
              <p>{promo.display_type}</p>
            </div>
            <div className="promo-actions">
              <button className="secondary-button" onClick={() => startEditingPromo(promo)}>Edit</button>
              <button className="delete-button" onClick={() => handleDelete(promo.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ManagePromotionsPage;