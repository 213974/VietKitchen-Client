import { useEffect, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import './GalleryTeaser.css';
import { Link } from 'react-router-dom';
import { useResponsive } from '../../../hooks/useResponsive';

// UPDATED: Import the new, curated images for the teaser.
import glassCoffee from '../../../assets/gallery/Glass_Coffee.jpg';
import storeFront from '../../../assets/gallery/store_front1.jpg';
import tropicalMangoSmoothie from '../../../assets/gallery/TropicalMangoSmoothie.jpg';
import pinaColada from '../../../assets/gallery/PinaColada.jpg';
import thaiMilkTea from '../../../assets/gallery/ThaiMilkTea.jpg';
import thaiTeaSmoothie from '../../../assets/gallery/ThaiTeaSmoothie.jpg';
import customers1 from '../../../assets/gallery/Customers1.jpg';
import customers2 from '../../../assets/gallery/Customers2.jpg';

// Create the array of images to be displayed in the carousel.
const teaserImages = [glassCoffee, storeFront, tropicalMangoSmoothie, pinaColada, thaiMilkTea, thaiTeaSmoothie, customers1, customers2];
// Duplicate the array to create a seamless looping effect.
const duplicatedImages = [...teaserImages, ...teaserImages];

/**
 * A component for the homepage that showcases a preview of the gallery.
 * It features an infinitely scrolling horizontal carousel of images.
 */
const GalleryTeaser = () => {
  // ------------------- Hooks -------------------
  const controls = useAnimationControls();
  const carouselRef = useRef<HTMLDivElement>(null);
  const { isDesktop } = useResponsive();

  // Effect to start the infinite scroll animation once the component has mounted.
  useEffect(() => {
    const carouselWidth = carouselRef.current?.scrollWidth || 0;
    const animationWidth = carouselWidth / 2;

    if (animationWidth > 0) {
      controls.start({
        x: -animationWidth,
        transition: {
          duration: 40, // Shortened duration for a more engaging scroll speed
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        },
      });
    }
  }, [controls]);

  // ------------------- Render Method -------------------
  return (
    <section className="gallery-teaser-section">
      <motion.div 
        className="teaser-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: isDesktop ? 1 : 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <h2>A Glimpse of Our Cafe</h2>
      </motion.div>

      <div className="teaser-carousel-container">
        <motion.div
          ref={carouselRef}
          className="teaser-carousel"
          animate={controls}
        >
          {duplicatedImages.map((image, index) => (
            <div className="teaser-image-card" key={index}>
              <img src={image} alt={`A glimpse into Viet Kitchen & Tea House ${index + 1}`} />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="teaser-button-container">
        <Link to="/gallery" className="hero-button">View Gallery</Link>
      </div>
    </section>
  );
};

export default GalleryTeaser;