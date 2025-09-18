import './ContactTeaser.css';
import { Link } from 'react-router-dom';
import { motion, useAnimationControls } from 'framer-motion';
import ContactWelcome from '../../../assets/Misc/ContactWelcome.png';
import { useResponsive } from '../../../hooks/useResponsive';

/**
 * A component for the homepage that encourages users to get in touch.
 * It links to the main contact page and features a coordinated animation effect.
 */
const ContactTeaser = () => {
  // ------------------- Hooks -------------------
  // Animation controls allow one element's animation to trigger another's.
  const imageControls = useAnimationControls();
  const { isDesktop } = useResponsive();

  /**
   * A handler that is called when the main text box scrolls into view.
   * It manually starts the animation for the "Let's get in touch" image.
   */
  const handleBoxInView = () => {
    imageControls.start({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: 'easeOut' }
    });
  };

  // ------------------- Render Method -------------------
  return (
    <section className="contact-teaser-section">
      <div className="contact-teaser-content">
        {/* --- "Let's get in touch" Image --- */}
        <motion.img 
          src={ContactWelcome} 
          alt="Let's get in touch, we'd love to hear from you" 
          className="contact-welcome-img"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={imageControls} // This animation is controlled by the box below.
        />
        {/* --- Main Text Box --- */}
        <motion.div 
          className="contact-teaser-box frosted-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: isDesktop ? 0.8 : 0.3 }}
          transition={{ duration: 0.5 }}
          onViewportEnter={handleBoxInView} // When this comes into view, it triggers the image animation.
        >
          <h3>CUSTOMER INQUIRIES</h3>
          <p>
            Share an experience you had, ask a question about our restaurant, or anything else you'd like to ask or share? We're all ears!
          </p>
          <Link to="/contact" className="contact-teaser-btn">
            Customer Inquiries
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactTeaser;