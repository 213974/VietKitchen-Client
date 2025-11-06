import './HomePage.css';
import { motion } from 'framer-motion';

// ------------------- Component Imports -------------------
import GalleryTeaser from '../../components/home/GalleryTeaser/GalleryTeaser';
import OurStoryTeaser from '../../components/home/OurStoryTeaser/OurStoryTeaser';
import ContactTeaser from '../../components/home/ContactTeaser/ContactTeaser';
import MenuTeaser from '../../components/home/MenuTeaser/MenuTeaser';
/* import WeeklySpecialDisplay from '../../components/home/WeeklySpecial/WeeklySpecial'; */
import SEO from '../../components/common/SEO/SEO';

// ------------------- Hook Imports -------------------
import { useResponsive } from '../../hooks/useResponsive';
import { useStoreInfo } from '../../hooks/useStoreInfo';
import { usePromotions } from '../../hooks/usePromotions';

const HomePage = () => {
  // ------------------- Hooks -------------------
  const { isDesktop } = useResponsive();
  const { hours } = useStoreInfo();
  const { promotions, isLoading: promotionsLoading } = usePromotions();

  // ------------------- Data Filtering -------------------
  const sidePromoLeft = promotions.find(p => p.display_type === 'SIDE_LEFT' && p.is_active);
  const sidePromoRight = promotions.find(p => p.display_type === 'SIDE_RIGHT' && p.is_active);

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
        <script type="application/ld+json">{JSON.stringify(restaurantSchema)}</script>
      </SEO>

      <main>
        {/* --- Hero Section --- */}
        <div className="home-section-wrapper hero-bg">
          <header className="hero-section">
            <motion.div
              className="hero-content-wrapper"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: isDesktop ? 0.75 : 0.2 }}
            >
              {/* --- New group for details and paragraph --- */}
              <div className="hero-details-group">
                <div className="restaurant-details">
                  <span>Asian Fusion</span>
                  <span className="separator">·</span>
                  <span>$10 – $20</span>
                  <span className="separator">·</span>
                  <span>Fast-Casual</span>
                </div>
                <p>Serving up delightful bubble tea, tantalizing Asian fusion fare, and scrumptious snacks in Sterling, VA.</p>
              </div>

              {/* <WeeklySpecialDisplay /> */}
            </motion.div>
          </header>
        </div>

        {/* --- Menu Teaser Section with Integrated Promotions --- */}
        <div className="promo-section-layout">
          {/* Left Side Promotion */}
          <div className="side-promo-container">
            {!promotionsLoading && sidePromoLeft && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                {/* --- FIX: Title is now rendered OUTSIDE the card --- */}
                <h4 className="side-promo-title">{sidePromoLeft.title}</h4>
                <div className="side-promo-card">
                  <img src={sidePromoLeft.image_url!} alt={sidePromoLeft.title} />
                </div>
              </motion.div>
            )}
          </div>

          {/* Menu Teaser (Center) */}
          <div className="home-section-wrapper menu-bg">
            <MenuTeaser />
          </div>

          {/* Right Side Promotion */}
          <div className="side-promo-container">
            {!promotionsLoading && sidePromoRight && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                 {/* --- FIX: Title is now rendered OUTSIDE the card --- */}
                <h4 className="side-promo-title">{sidePromoRight.title}</h4>
                <div className="side-promo-card">
                  <img src={sidePromoRight.image_url!} alt={sidePromoRight.title} />
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* --- Other Page Sections --- */}
        <div className="home-section-wrapper story-bg">
          <OurStoryTeaser />
        </div>
        <GalleryTeaser />
        {/* --- Re-added the ContactTeaser component --- */}
        <div className="home-section-wrapper contact-bg">
          {/* --- FIX: Uncommented ContactTeaser component --- */}
          <ContactTeaser />
        </div>
      </main>
    </>
  );
};

export default HomePage;