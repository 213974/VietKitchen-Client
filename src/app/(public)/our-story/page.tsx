'use client';

import { motion } from 'framer-motion';
import SEO from '@/components/common/SEO/SEO';

// --- Styles & Assets ---
import '@/pages/OurStory/OurStoryPage.css';
import StoryImage from '@/assets/gallery/store_front1.jpg';
import CafeShowcaseVideo from '@/assets/gallery/CafeShowcase.mp4';

export default function OurStoryPage() {
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "A Glimpse of the Viet Kitchen & Tea House Experience",
    "description": "Experience the warm and welcoming atmosphere of our restaurant, from our friendly staff to our delicious Vietnamese cuisine and bubble tea.",
    "thumbnailUrl": `https://www.vietkitchenteahouse.com${StoryImage.src}`,
    "uploadDate": "2025-10-20T08:00:00+00:00",
    "duration": "PT0M15S",
    "contentUrl": `https://www.vietkitchenteahouse.com${CafeShowcaseVideo}`,
  };

  return (
    <>
      <SEO
        title="Our Story"
        description="Learn about the passion and tradition behind Viet Kitchen & Tea House. Discover our story, our philosophy, and the cultural inspiration for our authentic Vietnamese cuisine."
      >
        <script type="application/ld+json">{JSON.stringify(videoSchema)}</script>
      </SEO>
      <div className="our-story-page">
        <div className="story-video-container">
          <video
            src={CafeShowcaseVideo}
            autoPlay
            loop
            muted
            playsInline
            className="story-hero-video"
            poster={StoryImage.src}
          />
          <div className="video-overlay-text">
            <h1>Our Story</h1>
          </div>
        </div>

        <main className="story-content-container">
          <motion.div
            className="story-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h3>Our Journey</h3>
            <p>
              Viet Kitchen & Tea House began with a simple idea: to create a warm, inviting space where the vibrant flavors of Vietnamese tradition could meet the modern tastes of our Sterling community. Founded by a family with a deep love for authentic cuisine, our journey started with cherished recipes passed down through generations. We envisioned a place that felt like more than just a restaurant—a place for connection, comfort, and the shared joy of a delicious meal.
            </p>
          </motion.div>

          <motion.div
            className="story-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h3>Our Philosophy</h3>
            <p>
              We believe in flavor without compromise. For us, that means sourcing the freshest ingredients, crafting our broths and sauces from scratch daily, and never cutting corners. Our philosophy is rooted in hospitality; we strive to make every guest feel like family from the moment they walk through our doors. It’s about creating an experience that is as nourishing for the soul as it is for the body.
            </p>
          </motion.div>

          <motion.div
            className="story-image-container"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            {/* Note: In Next.js, imported images are objects with a .src property */}
            <img src={StoryImage.src} alt="The welcoming storefront of Viet Kitchen" />
            <div className="image-caption">
              Our home in Sterling, VA – built to bring people together.
            </div>
          </motion.div>
          
          <motion.div
            className="story-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h3>The Viet Kitchen Experience</h3>
            <p>
              From the rich, aromatic steam of a classic bowl of Pho to the delightful chew of boba in our artisanal milk teas, every item on our menu is a labor of love. We blend the timeless techniques of Vietnamese cooking with a fresh, contemporary approach. Whether you’re stopping by for a quick lunch, a comforting dinner, or a refreshing bubble tea, we invite you to relax, savor the moment, and become a part of our story.
            </p>
          </motion.div>
        </main>
      </div>
    </>
  );
};