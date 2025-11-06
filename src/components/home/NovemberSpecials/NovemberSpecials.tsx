import { useState } from 'react';
import './NovemberSpecials.css';
import ImageModal from '../../common/ImageModal/ImageModal';

// Import the new special posters
import inStoreSpecial from '../../../assets/specials/Nov_Special-1.png';
import deliverySpecial from '../../../assets/specials/Nov_special-Uber.png';

const NovemberSpecials = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* --- Image Preloading Section --- */}
      <div style={{ display: 'none' }}>
        <img src={inStoreSpecial} alt="Preload in-store specials" />
        <img src={deliverySpecial} alt="Preload delivery specials" />
      </div>

      <div className="specials-container">
        <h3 className="specials-title">Weekly Specials</h3>
        <div className="specials-buttons-wrapper">
          <button
            className="special-button"
            onClick={() => openModal(inStoreSpecial)}
          >
            In-Store & Phone Orders
          </button>
          <button
            className="special-button"
            onClick={() => openModal(deliverySpecial)}
          >
            DoorDash & UberEats
          </button>
        </div>
      </div>

      {selectedImage && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          imageUrl={selectedImage}
          altText="November Weekly Specials Poster"
        />
      )}
    </>
  );
};

export default NovemberSpecials;