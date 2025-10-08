import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './OurStoryTeaser.css';
import { useResponsive } from '../../../hooks/useResponsive';

// UPDATED: Import all customer images for the slideshow
import image4 from '../../../assets/gallery/Customers1.jpg';
import image2 from '../../../assets/gallery/Customers2.jpg';
import image3 from '../../../assets/gallery/Customers3.jpg';
import image1 from '../../../assets/gallery/Customers4.jpg';

// Create an array of the images to cycle through
const storyImages = [
  { src: image1, alt: "Happy customers dining inside the cafe" },
  { src: image2, alt: "A friendly group of visitors enjoying the outdoor patio" },
  { src: image3, alt: "A wonderful group of customers enjoying the outdoor patio" },
  { src: image4, alt: "Happy guests dining inside the cafe" },
];

const OurStoryTeaser = () => {
  const { isDesktop } = useResponsive();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Effect to handle the automatic cycling of images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % storyImages.length);
    }, 8000); // Change image every 8 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <section className="story-teaser-section">
      <div className="story-teaser-container">
        {/* --- Animated Image Slideshow --- */}
        <motion.div 
          className="story-teaser-image-wrapper"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: isDesktop ? 0.8 : 0.5, ease: 'easeOut' }}
        >
          <AnimatePresence>
            <motion.img
              key={currentIndex}
              src={storyImages[currentIndex].src}
              alt={storyImages[currentIndex].alt}
              className="story-teaser-img"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
          </AnimatePresence>
        </motion.div>

        {/* --- Animated Text Content --- */}
        <motion.div 
          className="story-teaser-text frosted-container"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: isDesktop ? 0.8 : 0.5, ease: 'easeOut' }}
        >
          <h2>Our Story</h2>
          <p>
            From a shared passion for authentic flavors and a love for our community, Viet Kitchen was born. We believe in crafting every dish and drink with heart, creating a place where every visitor feels like family.
          </p>
          <Link to="/our-story" className="hero-button">
            See More
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default OurStoryTeaser;