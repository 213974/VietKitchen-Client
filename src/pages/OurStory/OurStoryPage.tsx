// src/pages/OurStory/OurStoryPage.tsx

import { motion } from 'framer-motion';
import './OurStoryPage.css';
import StoryImage from '../../assets/gallery/store_front1.jpg';
import CafeShowcaseVideo from '../../assets/gallery/CafeShowcase.mp4';
import SEO from '../../components/common/SEO/SEO';

const OurStoryPage = () => {
  // --- 1. Define the Video Schema ---
  // This object explicitly describes your video for Google.
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": "A Glimpse of the Viet Kitchen & Tea House Experience",
    "description": "Experience the warm and welcoming atmosphere of our restaurant, from our friendly staff to our delicious Vietnamese cuisine and bubble tea.",
    // Use an absolute URL for the thumbnail. The main storefront image is a great choice.
    "thumbnailUrl": `https://www.vietkitchenteahouse.com${StoryImage}`,
    // Set this to the date you published the page or video.
    "uploadDate": "2025-10-20T08:00:00+00:00",
    // IMPORTANT: Update this to the video's actual duration (PT<minutes>M<seconds>S format).
    "duration": "PT0M15S", // This means 0 minutes and 15 seconds.
    // The direct, absolute URL to the video file itself.
    "contentUrl": `https://www.vietkitchenteahouse.com${CafeShowcaseVideo}`,
  };

  return (
    <>
      {/* --- 2. Inject the Schema into the SEO Component --- */}
      <SEO
        title="Our Story"
        description="Learn about the passion and tradition behind Viet Kitchen & Tea House. Discover our story, our philosophy, and the cultural inspiration for our authentic Vietnamese cuisine."
      >
        {/* This script tag makes the schema available to search engine crawlers */}
        <script type="application/ld+json">{JSON.stringify(videoSchema)}</script>
      </SEO>
      <div className="our-story-page">
        <div className="story-video-container">
          {/* --- 3. Add a poster image to the video tag --- */}
          {/* The poster provides a fallback image and helps with load performance. */}
          <video
            src={CafeShowcaseVideo}
            autoPlay
            loop
            muted
            playsInline
            className="story-hero-video"
            poster={StoryImage}
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
            <img src={StoryImage} alt="The welcoming storefront of Viet Kitchen" />
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

export default OurStoryPage;