import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './OurStoryTeaser.css';
import { useResponsive } from '../../../hooks/useResponsive';

// Import the specific images used in this teaser section.
import image1 from '../../../assets/gallery/sitting_area1.webp';
import image2 from '../../../assets/menu/PinaColada.jpg';
import image3 from '../../../assets/menu/PinaColada.jpg';

/**
 * A component for the homepage that provides a brief preview of the "Our Story" page.
 * It features an animated image collage and text block.
 */
const OurStoryTeaser = () => {
  // Hook to apply different animations based on the viewport size.
  const { isDesktop } = useResponsive();

  return (
    <section className="story-teaser-section">
      <div className="story-teaser-container">
        {/* --- Animated Image Collage --- */}
        <motion.div 
          className="story-teaser-images"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: isDesktop ? 0.8 : 0.5, ease: 'easeOut' }}
        >
          <img src={image1} alt="Cozy cafe seating" className="teaser-img-1" />
          <img src={image2} alt="Bowl of pho" className="teaser-img-2" />
          <img src={image3} alt="Bubble tea drinks" className="teaser-img-3" />
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