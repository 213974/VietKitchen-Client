import { motion, type Variants } from 'framer-motion';
import './GalleryImageCard.css';

// Import Primary Share Icons
import XLogoIcon from '../../../assets/icons/x-logo.svg?react';
import FacebookIcon from '../../../assets/icons/facebook-logo.svg?react';
import PinterestLogoIcon from '../../../assets/icons/pinterest-logo.svg?react';

interface GalleryImageCardProps {
  src: string;
  alt: string;
  variants: Variants;
  onImageClick?: () => void; // Prop is now optional
}

const GalleryImageCard = ({ src, alt, variants, onImageClick }: GalleryImageCardProps) => {
  const shareText = `Check out this photo from Viet Kitchen & Tea House: ${alt}`;
  const encodedShareText = encodeURIComponent(shareText);
  const encodedImageUrl = encodeURIComponent(src);

  const primarySharePlatforms = [
    { name: 'Facebook', Icon: FacebookIcon, url: `https://www.facebook.com/sharer/sharer.php?u=${encodedImageUrl}` },
    { name: 'X', Icon: XLogoIcon, url: `https://twitter.com/intent/tweet?url=${encodedImageUrl}&text=${encodedShareText}` },
    { name: 'Pinterest', Icon: PinterestLogoIcon, url: `https://pinterest.com/pin/create/button/?url=${encodedImageUrl}&media=${encodedImageUrl}&description=${encodedShareText}` },
  ];

  const handleShareClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation(); // Prevent lightbox from opening when clicking a share icon
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  // Only attach the onClick handler if it's provided
  const clickHandler = onImageClick ? onImageClick : undefined;

  return (
    <motion.div
      className="gallery-image-card"
      onClick={clickHandler}
      variants={variants}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      <div className="card-hover-overlay">
        <div className="primary-share-bar">
          {primarySharePlatforms.map(p => (
            <button key={p.name} onClick={(e) => handleShareClick(e, p.url)} title={`Share on ${p.name}`}>
              <p.Icon />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default GalleryImageCard;