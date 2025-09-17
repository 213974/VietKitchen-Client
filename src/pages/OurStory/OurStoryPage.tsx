import { motion } from 'framer-motion';
import './OurStoryPage.css';
// import OurStoryWelcome from '../../assets/Misc/OurStoryWelcome.png';
import StoryImage from '../../assets/gallery/store_front1.jpg';

const OurStoryPage = () => {
  return (
    <div className="our-story-page">
        {/* <header className="story-hero">
            <img src={OurStoryWelcome} alt="Our Story" />
        </header> */}
      <motion.div 
        className="story-content-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="story-image-column">
          <div className="story-image-wrapper">
            <img src={StoryImage} alt="Inside Viet Kitchen" />
            <div className="image-caption">
              A caption for the image can go here, perhaps describing a significant moment or the founders.
            </div>
          </div>
        </div>

        <div className="story-text-column">
          <div className="story-section">
            <h3>Our Story</h3>
            <p>
              <strong>[This is where you can share the journey of the restaurant.]</strong>
              <br />
              Talk about when and why it was founded. What was the original inspiration? Share a brief anecdote about the early days, the challenges faced, and the milestones achieved. This helps customers connect on a personal level.
            </p>
          </div>

          <div className="story-section">
            <h3>Our Philosophy</h3>
            <p>
              <strong>[Describe the core values and mission of the restaurant.]</strong>
              <br />
              What is the commitment to the customer? This could be about using fresh ingredients, providing exceptional service, creating a welcoming atmosphere, or a combination of these. What makes the dining experience unique?
            </p>
          </div>

          <div className="story-section">
            <h3>Cultural Story</h3>
            <p>
              <strong>[Explain the cultural inspiration behind the food and ambiance.]</strong>
              <br />
              Share details about the culinary traditions that influence the menu. This could be about specific regions, family recipes, or the philosophy of Asian fusion cuisine. It helps customers appreciate the authenticity and thought behind each dish.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default OurStoryPage;