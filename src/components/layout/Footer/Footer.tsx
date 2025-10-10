import './Footer.css';
import { useStoreInfo } from '../../../hooks/useStoreInfo';

// --- FIX: Change all SVG imports to the correct Create React App syntax ---
import { ReactComponent as PhoneIcon } from '../../../assets/icons/phone.svg';
import { ReactComponent as LocationIcon } from '../../../assets/icons/location-pin.svg';
import { ReactComponent as InstagramIcon } from '../../../assets/icons/instagram.svg';
import { ReactComponent as TiktokIcon } from '../../../assets/icons/tiktok.svg';
import { ReactComponent as EmailIcon } from '../../../assets/icons/email.svg';
import { ReactComponent as FacebookIcon } from '../../../assets/icons/facebook-logo.svg';

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
            {/* Now this will work because LocationIcon is a component */}
            <LocationIcon className="footer-icon" />
            <p>{address}</p>
          </a>
          <a href={`tel:${phoneNumber}`} className="info-item">
            {/* Now this will work because PhoneIcon is a component */}
            <PhoneIcon className="footer-icon" />
            <p>{phoneNumber || 'Loading...'}</p>
          </a>
          <a href={`mailto:${email}`} className="info-item">
            {/* Now this will work because EmailIcon is a component */}
            <EmailIcon className="footer-icon" />
            <p>{email}</p>
          </a>
        </div>
        <div className="footer-right-section">
          <div className="footer-socials">
            <a href="https://www.instagram.com/vietkitchenandteahouse/?hl=en" target="_blank" rel="noopener noreferrer" className="social-item">
              {/* Now this will work because InstagramIcon is a component */}
              <InstagramIcon className="social-icon instagram-icon" />
              <span>@vietkitchenandteahouse</span>
            </a>
            <a href="https://www.tiktok.com/@vietkitchenteahouse" target="_blank" rel="noopener noreferrer" className="social-item">
              {/* Now this will work because TiktokIcon is a component */}
              <TiktokIcon className="social-icon tiktok-icon" />
              <span>@vietkitchenandteahouse</span>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61575199565412" target="_blank" rel="noopener noreferrer" className="social-item">
              {/* Now this will work because FacebookIcon is a component */}
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