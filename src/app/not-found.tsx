'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import '@/pages/NotFound/NotFoundPage.css';

export default function NotFound() {
  return (
    <motion.div 
      className="not-found-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>Sorry, the page you are looking for does not exist or has been moved.</p>
        <Link href="/" className="hero-button">
          Go Back Home
        </Link>
      </div>
    </motion.div>
  );
}