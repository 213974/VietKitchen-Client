import { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useClickOutside } from '../../../hooks/useClickOutside';
import ArrowDownIcon from '../../../assets/icons/arrow-down.svg';
import './NavDropdown.css';

interface NavDropdownProps {
  title: string;
  items: { path: string; label: string }[];
  isHomePage: boolean;
}

const NavDropdown = ({ title, items, isHomePage }: NavDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const popoverVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
    exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.15, ease: 'easeIn' } },
  } as const;

  const dropdownMenuClasses = `nav-dropdown-menu ${isHomePage ? 'is-home' : ''}`;

  return (
    <div 
      className="nav-dropdown" 
      ref={dropdownRef}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="nav-dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
        <span>{title}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ArrowDownIcon />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={dropdownMenuClasses}
            variants={popoverVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {items.map(item => (
              <NavLink key={item.path} to={item.path} onClick={() => setIsOpen(false)}>
                {item.label}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavDropdown;