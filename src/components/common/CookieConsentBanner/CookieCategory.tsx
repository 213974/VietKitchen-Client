import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ReactComponent as ArrowRightIcon } from '../../../assets/icons/arrow-right.svg';

interface CookieCategoryProps {
  title: string;
  description: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

const CookieCategory = ({ title, description, checked, onChange, disabled = false }: CookieCategoryProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="cookie-category">
      <div className="category-header">
        <button className="category-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          <motion.div animate={{ rotate: isOpen ? 90 : 0 }}>
            <ArrowRightIcon />
          </motion.div>
          <span>{title}</span>
        </button>
        <div className="category-control">
          {disabled ? (
            <span className="always-active-text">Always Active</span>
          ) : (
            <label className="switch">
              <input type="checkbox" checked={checked} onChange={(e) => onChange?.(e.target.checked)} />
              <span className="slider"></span>
            </label>
          )}
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="category-description"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <p>{description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CookieCategory;