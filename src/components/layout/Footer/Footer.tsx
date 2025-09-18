import './Footer.css';
import { useStoreInfo } from '../../../hooks/useStoreInfo';
import PhoneIcon from '../../../assets/icons/phone.svg';
import LocationIcon from '../../../assets/icons/location-pin.svg';
import InstagramIcon from '../../../assets/icons/instagram.svg';
import TiktokIcon from '../../../assets/icons/tiktok.svg';
import EmailIcon from '../../../assets/icons/email.svg';
import FacebookIcon from '../../../assets/icons/facebook-logo.svg';

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
            {/* CORRECTED: Use a div with the mask technique */}
            <div className="footer-icon" style={{ WebkitMaskImage: `url(${LocationIcon})`, maskImage: `url(${LocationIcon})` }} />
            <p>{address}</p>
          </a>
          <a href={`tel:${phoneNumber}`} className="info-item">
            {/* CORRECTED: Use a div with the mask technique */}
            <div className="footer-icon" style={{ WebkitMaskImage: `url(${PhoneIcon})`, maskImage: `url(${PhoneIcon})` }} />
            <p>{phoneNumber || 'Loading...'}</p>
          </a>
          <a href={`mailto:${email}`} className="info-item">
            {/* CORRECTED: Use a div with the mask technique */}
            <div className="footer-icon" style={{ WebkitMaskImage: `url(${EmailIcon})`, maskImage: `url(${EmailIcon})` }} />
            <p>{email}</p>
          </a>
        </div>
        <div className="footer-right-section">
          <div className="footer-socials">
            <a href="https://www.instagram.com/vietkitchenandteahouse/?hl=en" target="_blank" rel="noopener noreferrer" className="social-item">
              {/* CORRECTED: Use a div with the mask technique */}
              <div className="social-icon instagram-icon" style={{ WebkitMaskImage: `url(${InstagramIcon})`, maskImage: `url(${InstagramIcon})` }} />
              <span>@vietkitchenandteahouse</span>
            </a>
            <a href="https://www.tiktok.com/@vietkitchenteahouse" target="_blank" rel="noopener noreferrer" className="social-item">
              {/* CORRECTED: Use a div with the mask technique */}
              <div className="social-icon tiktok-icon" style={{ WebkitMaskImage: `url(${TiktokIcon})`, maskImage: `url(${TiktokIcon})` }} />
              <span>@vietkitchenandteahouse</span>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61575199565412" target="_blank" rel="noopener noreferrer" className="social-item">
              {/* CORRECTED: Use a div with the mask technique */}
              <div className="social-icon facebook-icon" style={{ WebkitMaskImage: `url(${FacebookIcon})`, maskImage: `url(${FacebookIcon})` }} />
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