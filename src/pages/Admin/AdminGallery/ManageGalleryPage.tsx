import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGallery, type GalleryImage, type GalleryCategory } from '../../../hooks/useGallery';
import ConfirmationModal from '../../../components/common/ConfirmationModal/ConfirmationModal';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core'; // <-- FIX: Use type-only import
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './ManageGalleryPage.css';
import DragHandleIcon from '../../../assets/icons/drag-handle.svg';

// New component for a single sortable category item
const SortableCategoryItem = ({ category, onInitiateDelete }: { category: GalleryCategory; onInitiateDelete: (cat: GalleryCategory) => void; }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: category._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li ref={setNodeRef} style={style} className="category-list-item">
      <button className="drag-handle" {...attributes} {...listeners}>
        <DragHandleIcon />
      </button>
      <span>{category.name}</span>
      <button onClick={() => onInitiateDelete(category)} className="delete-btn">×</button>
    </li>
  );
};


const ManageGalleryPage = () => {
  const { 
    images, 
    categories,
    setCategories, // get setter for optimistic updates
    isLoading, 
    error,
    addImage,
    deleteImage,
    addCategory,
    deleteCategory,
    reorderCategories
  } = useGallery();

  const [newCategoryName, setNewCategoryName] = useState('');
  const [uploadData, setUploadData] = useState({ file: null as File | null, preview: '', altText: '', categoryId: '' });
  const [status, setStatus] = useState({ message: '', type: '' });
  
  const [itemToDelete, setItemToDelete] = useState<{ type: 'image' | 'category'; data: GalleryImage | GalleryCategory } | null>(null);

  const groupedImages = useMemo(() => {
    // Also sort the groups based on category order
    const sortedCategoryNames = categories.map(c => c.name);
    const unsortedGroups = images.reduce((acc, image) => {
      const categoryName = image.category?.name || 'Uncategorized';
      if (!acc[categoryName]) acc[categoryName] = [];
      acc[categoryName].push(image);
      return acc;
    }, {} as Record<string, GalleryImage[]>);
    
    return sortedCategoryNames.reduce((acc, name) => {
      if(unsortedGroups[name]) acc[name] = unsortedGroups[name];
      return acc;
    }, {} as Record<string, GalleryImage[]>);

  }, [images, categories]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadData(prev => ({ ...prev, file, preview: URL.createObjectURL(file) }));
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadData.file || !uploadData.altText || !uploadData.categoryId) {
      setStatus({ message: 'Please fill all fields and select an image.', type: 'error' });
      return;
    }
    setStatus({ message: 'Uploading...', type: 'loading' });
    const formData = new FormData();
    formData.append('image', uploadData.file);
    formData.append('altText', uploadData.altText);
    formData.append('category', uploadData.categoryId);

    try {
      await addImage(formData);
      setStatus({ message: 'Image uploaded successfully!', type: 'success' });
      setUploadData({ file: null, preview: '', altText: '', categoryId: '' });
    } catch (err) {
      if (err instanceof Error) setStatus({ message: err.message, type: 'error' });
      else setStatus({ message: 'An unknown error occurred.', type: 'error' });
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    setStatus({ message: 'Adding category...', type: 'loading' });
    try {
      await addCategory(newCategoryName);
      setStatus({ message: `Category '${newCategoryName}' added.`, type: 'success' });
      setNewCategoryName('');
    } catch (err) {
      if (err instanceof Error) setStatus({ message: err.message, type: 'error' });
      else setStatus({ message: 'An unknown error occurred.', type: 'error' });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;
    setStatus({ message: 'Deleting...', type: 'loading' });
    try {
      if (itemToDelete.type === 'image') await deleteImage(itemToDelete.data._id);
      else await deleteCategory(itemToDelete.data._id);
      setStatus({ message: `${itemToDelete.type} deleted successfully.`, type: 'success' });
    } catch (err) {
      if (err instanceof Error) setStatus({ message: err.message, type: 'error' });
      else setStatus({ message: 'An unknown error occurred.', type: 'error' });
    } finally {
      setItemToDelete(null);
    }
  };
  
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = categories.findIndex(c => c._id === active.id);
      const newIndex = categories.findIndex(c => c._id === over.id);
      
      const newOrder = arrayMove(categories, oldIndex, newIndex);
      setCategories(newOrder); // Optimistic update
      
      const orderedIds = newOrder.map(c => c._id);
      reorderCategories(orderedIds).catch(() => {
        setStatus({ message: 'Failed to save new order. Reverting.', type: 'error' });
        // Revert UI on failure - could also just refetch from the hook
      });
    }
  };

  if (isLoading) return <div>Loading gallery...</div>;
  if (error) return <div className="status-message error">{error}</div>;

  return (
    <>
      <ConfirmationModal
        isOpen={!!itemToDelete}
        title={`Delete ${itemToDelete?.type}`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setItemToDelete(null)}
      >
        {itemToDelete && (
          <>
            <p>Are you sure you want to permanently delete <strong>{itemToDelete.type === 'image' ? (itemToDelete.data as GalleryImage).altText : (itemToDelete.data as GalleryCategory).name}</strong>?</p>
            {itemToDelete.type === 'image' && <img src={(itemToDelete.data as GalleryImage).imageUrl} alt="Delete confirmation" className="delete-preview-image"/>}
            <p>This action cannot be undone.</p>
          </>
        )}
      </ConfirmationModal>

      <motion.div 
        className="manage-gallery-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1>Manage Gallery</h1>
        {status.message && <div className={`status-message ${status.type}`}>{status.message}</div>}

        <div className="gallery-admin-layout">
          <aside className="gallery-forms-column">
            <div className="admin-card">
              <h3>Upload New Image</h3>
              <form onSubmit={handleUpload}>
                <div className="form-group">
                  <label htmlFor="image-upload">Image File</label>
                  <input type="file" id="image-upload" accept="image/*" onChange={handleFileChange} />
                  {uploadData.preview && <img src={uploadData.preview} alt="Preview" className="upload-preview-image" />}
                </div>
                <div className="form-group">
                  <label htmlFor="altText">Alt Text (Description)</label>
                  <input type="text" id="altText" value={uploadData.altText} onChange={e => setUploadData(prev => ({...prev, altText: e.target.value}))} placeholder="e.g., A bowl of delicious pho" required />
                </div>
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select id="category" value={uploadData.categoryId} onChange={e => setUploadData(prev => ({...prev, categoryId: e.target.value}))} required>
                    <option value="" disabled>Select a category</option>
                    {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                  </select>
                </div>
                <button type="submit" className="save-button">Upload Image</button>
              </form>
            </div>
            <div className="admin-card">
              <h3>Manage Categories</h3>
              <form onSubmit={handleAddCategory}>
                <div className="form-group">
                  <label htmlFor="newCategoryName">New Category Name</label>
                  <input type="text" id="newCategoryName" value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} placeholder="e.g., Our Cozy Cafe" />
                </div>
                <button type="submit" className="secondary-button">Add Category</button>
              </form>
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={categories.map((c: GalleryCategory) => c._id)} strategy={verticalListSortingStrategy}>
                  <ul className="category-list">
                    {categories.map(cat => (
                      <SortableCategoryItem 
                        key={cat._id} 
                        category={cat}
                        onInitiateDelete={(c) => setItemToDelete({type: 'category', data: c})}
                      />
                    ))}
                  </ul>
                </SortableContext>
              </DndContext>
            </div>
          </aside>
          <main className="gallery-grid-column">
            {Object.keys(groupedImages).length === 0 ? <p>No images uploaded yet.</p> :
              Object.entries(groupedImages).map(([categoryName, imagesInCategory]) => (
                <section key={categoryName} className="gallery-category-section">
                  <h2>{categoryName}</h2>
                  <div className="image-grid">
                    <AnimatePresence>
                      {imagesInCategory.map(image => (
                        <motion.div 
                          key={image._id} 
                          className="image-card"
                          layout
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                        >
                          <img src={image.imageUrl} alt={image.altText} />
                          <div className="image-overlay">
                            <p>{image.altText}</p>
                            <button onClick={() => setItemToDelete({type: 'image', data: image})} className="delete-btn large">Delete</button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </section>
              ))}
          </main>
        </div>
      </motion.div>
    </>
  );
};

export default ManageGalleryPage;