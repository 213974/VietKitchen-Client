import './HomePage.css';
import { motion } from 'framer-motion';
import GalleryTeaser from '../../components/home/GalleryTeaser/GalleryTeaser';
import OurStoryTeaser from '../../components/home/OurStoryTeaser/OurStoryTeaser';
import ContactTeaser from '../../components/home/ContactTeaser/ContactTeaser';
// import MenuTeaser from '../../components/home/MenuTeaser/MenuTeaser'; // Kept commented out
import { useResponsive } from '../../hooks/useResponsive';
import SEO from '../../components/common/SEO/SEO';
import { useStoreInfo } from '../../hooks/useStoreInfo';

const HomePage = () => {
  // ------------------- Hooks -------------------
  const { isDesktop } = useResponsive();
  const { hours } = useStoreInfo();

  // ------------------- SEO & Schema Data -------------------
  const formatHoursForSchema = () => {
    const dayMapping: { [key: string]: string } = {
      'Monday': 'Mo', 'Tuesday': 'Tu', 'Wednesday': 'We',
      'Thursday': 'Th', 'Friday': 'Fr', 'Saturday': 'Sa', 'Sunday': 'Su'
    };
    return hours.map(h => {
      if (h.time.toLowerCase() === 'closed') return null;
      const [openStr, closeStr] = h.time.split('–').map(t => t.trim());
      const formatTime = (timeStr: string) => {
        const [time, modifier] = timeStr.split(' ');
        const [hour, minute] = time.split(':');
        let hourNum = parseInt(hour);
        if (modifier.toLowerCase() === 'pm' && hourNum < 12) hourNum += 12;
        if (modifier.toLowerCase() === 'am' && hourNum === 12) hourNum = 0;
        return `${hourNum.toString().padStart(2, '0')}:${minute}`;
      };
      return `${dayMapping[h.day]} ${formatTime(openStr)}-${formatTime(closeStr)}`;
    }).filter(Boolean);
  };

  const restaurantSchema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "name": "Viet Kitchen & Tea House",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "20789 Great Falls Plaza #174",
      "addressLocality": "Sterling",
      "addressRegion": "VA",
      "postalCode": "20165",
      "addressCountry": "US"
    },
    "telephone": "+1-571-918-0641",
    "servesCuisine": "Vietnamese",
    "priceRange": "$10 – $20",
    "openingHours": formatHoursForSchema(),
  };

  // ------------------- Render Method -------------------
  return (
    <>
      <SEO
        title="Home"
        description="Authentic Asian fusion cuisine and bubble tea in Sterling, VA. Serving delicious Vietnamese specialties, boba, and snacks in a welcoming, fast-casual setting."
      >
        <script type="application/ld+json">
          {JSON.stringify(restaurantSchema)}
        </script>
      </SEO>

      {/* --- Hero Section --- */}
      <div className="home-section-wrapper hero-bg">
        <header className="hero-section">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: isDesktop ? 0.75 : 0.2 }}
          >
            <div className="restaurant-details">
              <span>Asian Fusion</span>
              <span className="separator">·</span>
              <span>$10 – $20</span>
              <span className="separator">·</span>
              <span>Fast-Casual</span>
            </div>
            <p>Serving up delightful bubble tea, tantalizing Asian fusion fare, and scrumptious snacks in Sterling, VA.</p>
          </motion.div>
        </header>
      </div>
      
      {/* --- Page Content Sections --- */}
      {/* --- FIX: Ensure the MenuTeaser section is the one that's disabled --- */}
      {/* <div className="home-section-wrapper menu-bg">
        <MenuTeaser />
      </div> TEMPORARILY DISABLED */}
      <div className="home-section-wrapper story-bg">
        <OurStoryTeaser />
      </div>
      <GalleryTeaser />
      {/* --- FIX: Ensure the ContactTeaser is active --- */}
      <div className="home-section-wrapper contact-bg">
        <ContactTeaser />
      </div>
    </>
  );
};

export default HomePage;