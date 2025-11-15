import { motion } from 'framer-motion';

// --- Component Imports ---
import GalleryTeaser from '@/components/home/GalleryTeaser/GalleryTeaser';
import OurStoryTeaser from '@/components/home/OurStoryTeaser/OurStoryTeaser';
import ContactTeaser from '@/components/home/ContactTeaser/ContactTeaser';
import MenuTeaser from '@/components/home/MenuTeaser/MenuTeaser';
import NovemberSpecials from '@/components/home/NovemberSpecials/NovemberSpecials';
// SEO component is no longer needed here.

// --- Hook Imports ---
import { useResponsive } from '@/hooks/useResponsive';
import { useStoreInfo } from '@/hooks/useStoreInfo';
import { usePromotions } from '@/hooks/usePromotions';

// --- Styles ---
import '@/pages/Home/HomePage.css';


// Note: In Next.js App router, this is a Server Component by default.
// We can't use hooks directly here. We will refactor this to be a client component
// to maintain functionality without a major rewrite for now.
// A future optimization could be to pass server-fetched data as props.

function HomePageContent() {
  'use client'; // This component needs hooks, so it must be a client component.
  
  const { isDesktop } = useResponsive();
  const { promotions, isLoading: promotionsLoading } = usePromotions();

  const sidePromoLeft = promotions.find(p => p.display_type === 'SIDE_LEFT' && p.is_active);
  const sidePromoRight = promotions.find(p => p.display_type === 'SIDE_RIGHT' && p.is_active);

  return (
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

              <NovemberSpecials />
            </motion.div>
          </header>
        </div>

        {/* --- Menu Teaser Section with Integrated Promotions --- */}
        <div className="promo-section-layout">
          <div className="side-promo-container">
            {!promotionsLoading && sidePromoLeft && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                <h4 className="side-promo-title">{sidePromoLeft.title}</h4>
                <div className="side-promo-card">
                  <img src={sidePromoLeft.image_url!} alt={sidePromoLeft.title} />
                </div>
              </motion.div>
            )}
          </div>

          <div className="home-section-wrapper menu-bg">
            <MenuTeaser />
          </div>
          
          <div className="side-promo-container">
            {!promotionsLoading && sidePromoRight && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
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
        <div className="home-section-wrapper contact-bg">
          <ContactTeaser />
        </div>
      </main>
  );
}


// The Page itself remains a Server Component, but it renders the client component.
export default function HomePage() {
  // We can add server-side data fetching here in the future.
  // For now, we render the client component that fetches its own data.
  return <HomePageContent />;
}