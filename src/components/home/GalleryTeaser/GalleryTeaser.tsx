import { useEffect, useRef } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import './GalleryTeaser.css';
import { Link } from 'react-router-dom';
import { useResponsive } from '../../../hooks/useResponsive';

// Import the specific images for the teaser.
import image1 from '../../../assets/gallery/cafe_seat_decoration1.webp';
import image2 from '../../../assets/gallery/store_section1.webp';
import image3 from '../../../assets/gallery/store_front1.jpg';
import image4 from '../../../assets/gallery/sitting_area1.webp';

// Create the array of images to be displayed in the carousel.
const teaserImages = [image1, image2, image3, image4];
// Duplicate the array to create a seamless looping effect.
const duplicatedImages = [...teaserImages, ...teaserImages];

/**
 * A component for the homepage that showcases a preview of the gallery.
 * It features an infinitely scrolling horizontal carousel of images.
 */
const GalleryTeaser = () => {
  // ------------------- Hooks -------------------
  // Animation controls allow us to start the animation manually in an effect.
  const controls = useAnimationControls();
  // A ref to the carousel element to measure its width.
  const carouselRef = useRef<HTMLDivElement>(null);
  const { isDesktop } = useResponsive();

  // Effect to start the infinite scroll animation once the component has mounted.
  useEffect(() => {
    // Get the total width of the carousel content.
    const carouselWidth = carouselRef.current?.scrollWidth || 0;
    // The animation will translate the carousel by half its width (the length of the original images array).
    const animationWidth = carouselWidth / 2;

    if (animationWidth > 0) {
      controls.start({
        x: -animationWidth, // Animate to the halfway point.
        transition: {
          duration: 80, // A long duration for a slow, smooth scroll.
          ease: "linear",
          repeat: Infinity, // Loop the animation forever.
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
              <img src={image} alt={`Teaser image ${index + 1}`} />
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