import './Footer.css';
import { useStoreInfo } from '../../../hooks/useStoreInfo';
import PhoneIcon from '../../../assets/icons/phone.svg?react';
import LocationIcon from '../../../assets/icons/location-pin.svg?react';
import InstagramIcon from '../../../assets/icons/instagram.svg?react';
import TiktokIcon from '../../../assets/icons/tiktok.svg?react';
import EmailIcon from '../../../assets/icons/email.svg?react';
import FacebookIcon from '../../../assets/icons/facebook-logo.svg?react';

const Footer = () => {
  const { phoneNumber } = useStoreInfo();
  const currentYear = new Date().getFullYear();
  const email = "vietkitchenteahouse@gmail.com";
  const address = "20789 Great Falls Plaza #174, Sterling, VA 20165";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-info">
          <h3>Viet Kitchen & Tea House</h3>
          <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="info-item">
            {/* REVERTED: Use the component directly */}
            <LocationIcon className="footer-icon" />
            <p>{address}</p>
          </a>
          <a href={`tel:${phoneNumber}`} className="info-item">
            {/* REVERTED: Use the component directly */}
            <PhoneIcon className="footer-icon" />
            <p>{phoneNumber || 'Loading...'}</p>
          </a>
          <a href={`mailto:${email}`} className="info-item">
            {/* REVERTED: Use the component directly */}
            <EmailIcon className="footer-icon" />
            <p>{email}</p>
          </a>
        </div>
        <div className="footer-right-section">
          <div className="footer-socials">
            <a href="https://www.instagram.com/vietkitchenandteahouse/?hl=en" target="_blank" rel="noopener noreferrer" className="social-item">
              {/* REVERTED: Use the component directly */}
              <InstagramIcon className="social-icon instagram-icon" />
              <span>@vietkitchenandteahouse</span>
            </a>
            <a href="https://www.tiktok.com/@vietkitchenteahouse" target="_blank" rel="noopener noreferrer" className="social-item">
              {/* REVERTED: Use the component directly */}
              <TiktokIcon className="social-icon tiktok-icon" />
              <span>@vietkitchenandteahouse</span>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61575199565412" target="_blank" rel="noopener noreferrer" className="social-item">
              {/* REVERTED: Use the component directly */}
              <FacebookIcon className="social-icon facebook-icon" />
              <span>@vietkitchenandteahouse</span>
            </a>
          </div>
          <div className="footer-copyright">
            <p>&copy; {currentYear} Viet Kitchen & Tea House. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;