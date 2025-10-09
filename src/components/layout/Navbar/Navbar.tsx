import { useState, useEffect, useRef, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import ClockIcon from '../../../assets/icons/clock.svg?react';
import HamburgerIcon from '../../../assets/icons/hamburger-menu.svg?react';
import CloseIcon from '../../../assets/icons/close.svg?react';

import HoursModal from '../../common/HoursModal/HoursModal';
import NavDropdown from './NavDropdown';
import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { useStoreInfo } from '../../../hooks/useStoreInfo';
import { useResponsive } from '../../../hooks/useResponsive';
import { useClickOutside } from '../../../hooks/useClickOutside';
import logo from '/vietkitchenteahouse.png';

interface NavbarProps {
  isHomePage: boolean;
}

const Navbar = ({ isHomePage }: NavbarProps) => {
  const { hours, isLoading } = useStoreInfo();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const { isMobile } = useResponsive();
  const hoursModalRef = useRef<HTMLDivElement>(null);
  useClickOutside(hoursModalRef, () => setIsModalOpen(false));

  const getStoreStatus = useCallback(() => {
    if (!hours || hours.length === 0) {
      return { text: "Hours Unavailable", color: "#b91c1c" };
    }

    const now = new Date();
    const currentDay = now.getDay();
    const todayIndex = currentDay === 0 ? 6 : currentDay - 1;
    const todayHours = hours[todayIndex];

    if (!todayHours || todayHours.time.toLowerCase() === 'closed') {
      return { text: "Currently Closed", color: "#b91c1c" };
    }

    const [openTimeStr, closeTimeStr] = todayHours.time.split('–').map(t => t.trim());

    const parseTime = (timeStr: string) => {
      const [time, modifier] = timeStr.split(' ');
      let h: number;
      const [parsedH, m] = time.split(':').map(Number);
      h = parsedH;

      if (modifier === 'PM' && h < 12) h += 12;
      if (modifier === 'AM' && h === 12) h = 0;
      const date = new Date();
      date.setHours(h, m, 0, 0);
      return date;
    };

    const openTime = parseTime(openTimeStr);
    const closeTime = parseTime(closeTimeStr);
    const openingSoonTime = new Date(openTime.getTime() - 30 * 60000);
    const closingSoonTime = new Date(closeTime.getTime() - 30 * 60000);

    if (now >= openTime && now < closingSoonTime) {
      return { text: `Open until ${closeTimeStr}`, color: "#4C7C6D" };
    }
    if (now >= closingSoonTime && now < closeTime) {
      return { text: "Closing Soon", color: "#f97316" };
    }
    if (now >= openingSoonTime && now < openTime) {
      return { text: `Opening at ${openTimeStr}`, color: "#f59e0b" };
    }
    
    return { text: "Currently Closed", color: "#b91c1c" };
  }, [hours]);
  
  const storeStatus = getStoreStatus();

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const orderPickupUrl = 'https://online.skytab.com/38bdc873ed00c1a08c9bb35ce20ee7be';
  const handleLinkClick = () => setMobileMenuOpen(false);
  
  const mobileMenuVariants: Variants = {
    hidden: { x: "100%" },
    visible: { x: "0%", transition: { type: 'spring', stiffness: 300, damping: 30 } },
    exit: { x: "100%", transition: { duration: 0.2 } },
  };

  const isKitchenNoteRelevant = storeStatus.text.includes('Open') || storeStatus.text.includes('Closing Soon');
  const displayText = isModalOpen && isKitchenNoteRelevant ? 'Kitchen closes 8:45 PM' : storeStatus.text;
  const displayColor = isModalOpen && isKitchenNoteRelevant ? '#777' : storeStatus.color;

  const navbarClasses = `navbar ${isHomePage ? 'navbar-home' : 'navbar-sticky'}`;

  const dropdownItems = [
    { path: '/our-story', label: 'Our Story' },
    { path: '/contact', label: 'Contact Us' }
  ];

  return (
    <>
      <nav className={navbarClasses}>
        <div className="navbar-container">
          <NavLink to="/" className="navbar-brand">
            <img src={logo} alt="Viet Kitchen Logo" className="navbar-logo" />
            <span>
              {isMobile ? 'Viet Kitchen' : 'Viet Kitchen & Tea House'}
            </span>
          </NavLink>
          <div className="navbar-links-desktop">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/menu">Menu</NavLink>
            <NavDropdown title="About Us" items={dropdownItems} isHomePage={isHomePage} />
          </div>
          <div className="navbar-info-desktop">
            <div className="hours-modal-wrapper" ref={hoursModalRef}>
              <button className="info-item-btn" onClick={() => setIsModalOpen(!isModalOpen)}>
                <ClockIcon className="nav-icon" style={{ fill: storeStatus.color, transition: 'fill 0.3s ease' }} />
                <div className="status-text-container">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={displayText}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{ color: displayColor, fontWeight: '600' }}
                    >
                      {displayText}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </button>
              <AnimatePresence>
                {isModalOpen && <HoursModal hours={hours} isLoading={isLoading} isPreview={false} isHomePage={isHomePage} />}
              </AnimatePresence>
            </div>
            <a href={orderPickupUrl} target="_blank" rel="noopener noreferrer" className="navbar-cta-button">
              Order Pickup
            </a>
          </div>
          <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(true)}>
             <HamburgerIcon />
          </button>
        </div>
      </nav>
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="mobile-menu-header">
              <NavLink to="/" className="mobile-menu-brand" onClick={handleLinkClick}>
                <img src={logo} alt="Viet Kitchen Logo"/>
              </NavLink>
              <button className="mobile-menu-close" onClick={() => setMobileMenuOpen(false)}>
                <CloseIcon />
              </button>
            </div>
            <div className="mobile-menu-links">
              <NavLink to="/" onClick={handleLinkClick}>Home</NavLink>
              <NavLink to="/menu" onClick={handleLinkClick}>Menu</NavLink>
              <NavLink to="/our-story" onClick={handleLinkClick}>Our Story</NavLink>
              <NavLink to="/contact" onClick={handleLinkClick}>Contact</NavLink>
              <a href={orderPickupUrl} target="_blank" rel="noopener noreferrer" className="mobile-cta-link">
                Order Pickup
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;