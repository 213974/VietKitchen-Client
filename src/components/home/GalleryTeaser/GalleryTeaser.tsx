import { useEffect, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import './GalleryTeaser.css';
import { useResponsive } from '../../../hooks/useResponsive';

// Import the new, curated images for the teaser.
import glassCoffee from '../../../assets/gallery/Glass_Coffee.jpg';
// import storeFront from '../../../assets/gallery/store_front1.jpg';
import tropicalMangoSmoothie from '../../../assets/gallery/TropicalMangoSmoothie.jpg';
import pinaColada from '../../../assets/gallery/PinaColada.jpg';
import thaiMilkTea from '../../../assets/gallery/ThaiMilkTea.jpg';
import thaiTeaSmoothie from '../../../assets/gallery/ThaiTeaSmoothie.jpg';

// Create the array of images to be displayed in the carousel.
const teaserImages = [glassCoffee, tropicalMangoSmoothie, pinaColada, thaiMilkTea, thaiTeaSmoothie];
const duplicatedImages = [...teaserImages, ...teaserImages];

const GalleryTeaser = () => {
  const controls = useAnimationControls();
  const carouselRef = useRef<HTMLDivElement>(null);
  // Destructuring isMobile to control speed
  const { isMobile } = useResponsive();

  useEffect(() => {
    const carouselWidth = carouselRef.current?.scrollWidth || 0;
    const animationWidth = carouselWidth / 2;
    
    // Conditional animation speed
    const animationDuration = isMobile ? 40 : 80;

    if (animationWidth > 0) {
      controls.start({
        x: -animationWidth,
        transition: {
          duration: animationDuration,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        },
      });
    }
  }, [controls, isMobile]);

  return (
    <section className="gallery-teaser-section">
      <motion.div 
        className="teaser-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Glimpse of Our Beloved Drinks</h2>
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

      {/* The button was removed in a previous step, keeping it removed. */}
    </section>
  );
};

export default GalleryTeaser;