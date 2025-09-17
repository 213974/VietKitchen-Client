import { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import './GalleryPage.css';
import GalleryImageCard from '../../components/common/GalleryImageCard/GalleryImageCard';
import GalleryImageCardSkeleton from '../../components/common/GalleryImageCard/GalleryImageCardSkeleton';
import Lightbox from '../../components/common/Lightbox/Lightbox';
import { useResponsive } from '../../hooks/useResponsive';
import SEO from '../../components/common/SEO/SEO';
import { useGallery, type GalleryImage } from '../../hooks/useGallery';

// Static Fallback Data
import sittingArea1 from '../../assets/gallery/sitting_area1.webp';
import storeSection1 from '../../assets/gallery/store_section1.webp';
import storeFront1 from '../../assets/gallery/store_front1.jpg';
import cafeSeatDecoration1 from '../../assets/gallery/cafe_seat_decoration1.webp';

const staticGalleryData = {
  title: 'Our Cozy Cafe',
  images: [sittingArea1, storeSection1, storeFront1, cafeSeatDecoration1],
};

type StaticImage = {
  _id: string;
  imageUrl: string;
  altText: string;
  category: { name: string; order: number; _id: string; };
};

const GalleryPage = () => {
  const { isDesktop } = useResponsive();
  const { images, categories, isLoading, error } = useGallery();
  const [selectedImage, setSelectedImage] = useState<{ list: (StaticImage | GalleryImage)[], index: number } | null>(null);

  const flatImages = useMemo(() => images, [images]);
  
  const flatStaticImages: StaticImage[] = useMemo(() => {
    return staticGalleryData.images.map((imgSrc, imgIndex) => ({
      _id: imgSrc,
      imageUrl: imgSrc,
      altText: `Gallery image ${imgIndex + 1} for ${staticGalleryData.title}`,
      category: { name: staticGalleryData.title, order: 0, _id: staticGalleryData.title }
    }));
  }, []);

  const openLightbox = (image: GalleryImage) => {
    const imageIndex = flatImages.findIndex(img => img._id === image._id);
    if (imageIndex !== -1) {
      setSelectedImage({ list: flatImages, index: imageIndex });
    }
  };

  const openStaticLightbox = (imageSrc: string) => {
    const imageIndex = flatStaticImages.findIndex(img => img.imageUrl === imageSrc);
    if (imageIndex !== -1) {
      setSelectedImage({ list: flatStaticImages, index: imageIndex });
    }
  };

  const closeLightbox = () => setSelectedImage(null);

  const navigateLightbox = useCallback((direction: 'next' | 'prev') => {
    if (selectedImage === null) return;
    const { list, index } = selectedImage;
    const totalImages = list.length;
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (index + 1) % totalImages;
    } else {
      nextIndex = (index - 1 + totalImages) % totalImages;
    }
    setSelectedImage({ list, index: nextIndex });
  }, [selectedImage]);
  
  const jumpToImage = (index: number) => {
    if (selectedImage) {
      setSelectedImage({ ...selectedImage, index });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage !== null) {
        if (e.key === 'ArrowRight') navigateLightbox('next');
        if (e.key === 'ArrowLeft') navigateLightbox('prev');
        if (e.key === 'Escape') closeLightbox();
      }
    };
    
    // Scroll navigation is removed as per the new design focus
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage, navigateLightbox]);


  const groupedImages = useMemo(() => {
    if (!images) return {};
    return images.reduce((acc, image) => {
      const categoryName = image.category?.name || 'Uncategorized';
      if (!acc[categoryName]) acc[categoryName] = [];
      acc[categoryName].push(image);
      return acc;
    }, {} as Record<string, GalleryImage[]>);
  }, [images]);

  const gridContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: isDesktop ? 0.15 : 0.08 } },
  };

  const gridItemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <section className="gallery-section">
          <div className="skeleton-title"></div>
          <div className="image-grid">
            {Array.from({ length: 4 }).map((_, index) => <GalleryImageCardSkeleton key={index} />)}
          </div>
        </section>
      );
    }

    if (!error && images.length > 0) {
      return categories.map((category) => {
        const imagesInCategory = groupedImages[category.name];
        if (!imagesInCategory || imagesInCategory.length === 0) {
          return null;
        }
        return (
          <section key={category._id} className="gallery-section">
            <h2>{category.name}</h2>
            <motion.div
              className="image-grid"
              variants={gridContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {imagesInCategory.map((image) => (
                <GalleryImageCard
                  key={image._id}
                  src={image.imageUrl}
                  alt={image.altText}
                  variants={gridItemVariants}
                  onImageClick={() => openLightbox(image)}
                />
              ))}
            </motion.div>
          </section>
        )
      });
    }
    
    return (
      <section className="gallery-section">
        <h2>{staticGalleryData.title}</h2>
        <motion.div
          className="image-grid"
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {staticGalleryData.images.map((image, index) => (
            <GalleryImageCard
              key={index}
              src={image}
              alt={`Gallery image ${index + 1} for ${staticGalleryData.title}`}
              variants={gridItemVariants}
              onImageClick={() => openStaticLightbox(image)}
            />
          ))}
        </motion.div>
      </section>
    );
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
          A Glimpse of Coco Bay
        </motion.h1>

        {renderContent()}
      </div>
      
      <AnimatePresence>
        {selectedImage !== null && (
          <Lightbox 
            images={selectedImage.list as GalleryImage[]}
            currentIndex={selectedImage.index}
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