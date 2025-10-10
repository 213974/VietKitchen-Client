import { motion, AnimatePresence } from 'framer-motion';
import './Lightbox.css';
import { type GalleryImage } from '../../../hooks/useGallery';

// Import Icons
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg';
import { ReactComponent as ArrowLeftIcon } from '../../../assets/icons/arrow-left.svg';
import { ReactComponent as ArrowRightIcon } from '../../../assets/icons/arrow-right.svg';
import { ReactComponent as XLogoIcon } from '../../../assets/icons/x-logo.svg';
import { ReactComponent as FacebookIcon } from '../../../assets/icons/facebook-logo.svg';
import { ReactComponent as LinkedInLogoIcon } from '../../../assets/icons/linkedin-logo.svg';
import { ReactComponent as PinterestLogoIcon } from '../../../assets/icons/pinterest-logo.svg';
import { ReactComponent as TumblrIcon } from '../../../assets/icons/tumblr-logo.svg';
import { ReactComponent as RedditLogoIcon } from '../../../assets/icons/reddit-logo.svg';
import { ReactComponent as EmailIcon } from '../../../assets/icons/email.svg';

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onJump: (index: number) => void;
}

const Lightbox = ({ images, currentIndex, onClose, onNext, onPrev, onJump }: LightboxProps) => {
  const currentImage = images[currentIndex];
  if (!currentImage) return null;

  const shareText = `Check out this photo from Viet Kitchen & Tea House: ${currentImage.altText}`;
  const encodedShareText = encodeURIComponent(shareText);
  const encodedImageUrl = encodeURIComponent(currentImage.imageUrl);

  const sharePlatforms = [
    { name: 'Facebook', Icon: FacebookIcon, url: `https://www.facebook.com/sharer/sharer.php?u=${encodedImageUrl}` },
    { name: 'X', Icon: XLogoIcon, url: `https://twitter.com/intent/tweet?url=${encodedImageUrl}&text=${encodedShareText}` },
    { name: 'Pinterest', Icon: PinterestLogoIcon, url: `https://pinterest.com/pin/create/button/?url=${encodedImageUrl}&media=${encodedImageUrl}&description=${encodedShareText}` },
    { name: 'LinkedIn', Icon: LinkedInLogoIcon, url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedImageUrl}` },
    { name: 'Tumblr', Icon: TumblrIcon, url: `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${encodedImageUrl}&caption=${encodedShareText}` },
    { name: 'Reddit', Icon: RedditLogoIcon, url: `https://www.reddit.com/submit?url=${encodedImageUrl}&title=${encodedShareText}` },
    { name: 'Email', Icon: EmailIcon, url: `mailto:?subject=Viet Kitchen Photo&body=${shareText}%0A%0A${encodedImageUrl}` },
  ];

  const handleShareClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
  };
  
  const fadeVariants = {
    enter: { opacity: 0 },
    center: { zIndex: 1, opacity: 1 },
    exit: { zIndex: 0, opacity: 0 },
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <motion.div 
      className="lightbox-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleBackdropClick}
    >
      <button className="lightbox-close" onClick={onClose} title="Close (Esc)"><CloseIcon /></button>
      
      <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
        <div className="lightbox-main-view">
          <motion.div className="lightbox-content">
            <AnimatePresence initial={false}>
              <motion.img
                key={currentIndex}
                src={currentImage.imageUrl}
                alt={currentImage.altText}
                variants={fadeVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  opacity: { duration: 0.3 },
                }}
              />
            </AnimatePresence>
          </motion.div>
          
          <div className="lightbox-share">
            <div className="share-platforms">
              {sharePlatforms.map(p => (
                <button key={p.name} onClick={(e) => handleShareClick(e, p.url)} title={`Share on ${p.name}`}>
                  <p.Icon />
                </button>
              ))}
            </div>
          </div>
        </div>

        <aside className="lightbox-filmstrip-wrapper">
          <div className="lightbox-filmstrip">
            {images.map((image, index) => (
              <button 
                key={image._id} 
                className={`thumbnail ${index === currentIndex ? 'active' : ''}`}
                onClick={() => onJump(index)}
              >
                <img src={image.imageUrl} alt={image.altText} />
              </button>
            ))}
          </div>
        </aside>
      </div>

      <button className="lightbox-nav lightbox-prev" onClick={onPrev} title="Previous (Left Arrow)"><ArrowLeftIcon /></button>
      <button className="lightbox-nav lightbox-next" onClick={onNext} title="Next (Right Arrow)"><ArrowRightIcon /></button>
    </motion.div>
  );
};

export default Lightbox;