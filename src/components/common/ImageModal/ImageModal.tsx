import { motion, AnimatePresence } from 'framer-motion';
import './ImageModal.css';
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  altText: string;
}

const ImageModal = ({ isOpen, onClose, imageUrl, altText }: ImageModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="image-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // Close when clicking the backdrop
        >
          <motion.div
            className="image-modal-content"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
          >
            <button className="image-modal-close" onClick={onClose} title="Close">
              <CloseIcon />
            </button>
            <img src={imageUrl} alt={altText} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageModal;