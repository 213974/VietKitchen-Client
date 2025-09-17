import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import './GalleryPage.css';
import GalleryImageCard from '../../components/common/GalleryImageCard/GalleryImageCard';
import Lightbox from '../../components/common/Lightbox/Lightbox';
import SEO from '../../components/common/SEO/SEO';

// Import the new, curated gallery images
import glassCoffee from '../../assets/gallery/Glass_Coffee.jpg';
import storeFront from '../../assets/gallery/store_front1.jpg';
import tropicalMangoSmoothie from '../../assets/gallery/TropicalMangoSmoothie.jpg';
import pinaColada from '../../assets/gallery/PinaColada.jpg';
import thaiMilkTea from '../../assets/gallery/ThaiMilkTea.jpg';
import thaiTeaSmoothie from '../../assets/gallery/ThaiTeaSmoothie.jpg';

// A simple, flat array defining our gallery, now matching the Lightbox's expected type
const galleryImages = [
  { _id: 'drink1', imageUrl: glassCoffee, altText: 'Iced coffee in a glass on an outdoor table' },
  { _id: 'drink2', imageUrl: tropicalMangoSmoothie, altText: 'A vibrant tropical mango smoothie' },
  { _id: 'store', imageUrl: storeFront, altText: 'The welcoming storefront of Viet Kitchen & Tea House' },
  { _id: 'drink3', imageUrl: thaiMilkTea, altText: 'A cup of classic Thai milk tea with boba' },
  { _id: 'drink4', imageUrl: pinaColada, altText: 'A refreshing pina colada smoothie' },
  { _id: 'drink5', imageUrl: thaiTeaSmoothie, altText: 'A delicious Thai tea smoothie' },
].map(img => ({ ...img, category: { name: 'Gallery', _id: 'gallery', order: 0 } })); // Add a dummy category to satisfy the type

const GalleryPage = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const navigateLightbox = useCallback((direction: 'next' | 'prev') => {
    if (selectedImageIndex === null) return;
    const totalImages = galleryImages.length;
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (selectedImageIndex + 1) % totalImages;
    } else {
      nextIndex = (selectedImageIndex - 1 + totalImages) % totalImages;
    }
    setSelectedImageIndex(nextIndex);
  }, [selectedImageIndex]);
  
  const jumpToImage = (index: number) => {
    setSelectedImageIndex(index);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex !== null) {
        if (e.key === 'ArrowRight') navigateLightbox('next');
        if (e.key === 'ArrowLeft') navigateLightbox('prev');
        if (e.key === 'Escape') closeLightbox();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, navigateLightbox]);

  const gridContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const gridItemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <>
      <SEO 
        title="Gallery"
        description="Explore photos of our delicious food, refreshing bubble tea, and the cozy ambiance of our cafe in Sterling, VA."
      />
      <div className="gallery-page-container">
        <motion.h1 
          className="gallery-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Our Gallery
        </motion.h1>

        <motion.div
          className="image-grid"
          variants={gridContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {galleryImages.map((image, index) => (
            <GalleryImageCard
              key={image._id}
              src={image.imageUrl}
              alt={image.altText}
              variants={gridItemVariants}
              onImageClick={() => openLightbox(index)}
            />
          ))}
        </motion.div>
      </div>
      
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <Lightbox 
            images={galleryImages}
            currentIndex={selectedImageIndex}
            onClose={closeLightbox}
            onNext={() => navigateLightbox('next')}
            onPrev={() => navigateLightbox('prev')}
            onJump={jumpToImage}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default GalleryPage;