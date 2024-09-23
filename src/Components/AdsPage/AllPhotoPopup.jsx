import React, { useState, useEffect, useRef } from 'react';
import { Pannellum } from 'pannellum-react';
import { FaTimes, FaArrowLeft, FaArrowRight } from 'react-icons/fa';


const AllPhotosPopup = ({ images, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const thumbnailRef = useRef(null);

  useEffect(() => {
    if (thumbnailRef.current) {
      const activeThumbnail = thumbnailRef.current.querySelector('.thumbnaillx.active');
      if (activeThumbnail) {
        activeThumbnail.scrollIntoView({ behavior: 'smooth', inline: 'center' });
      }
    }
  }, [currentIndex]);

  if (!isOpen) return null;

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const isEquirectangular = (image) => image.includes('images360');

  return (
    <div className="popup-overlayx">
      <div className="popup-contentx">
        <button className="close-buttonx" onClick={onClose}>
          <FaTimes />
        </button>
        <div className="main-image-containerrrx">
          <button className="arrow-button left-arrow" onClick={handlePrevClick}>
            <FaArrowLeft />
          </button>
          {isEquirectangular(images[currentIndex]) ? (
            <Pannellum
              width="80%"
              height="100%"
              image={`http://124.43.179.118:8081/uploads/${images[currentIndex].split('\\').pop()}`}
              pitch={10}
              yaw={180}
              hfov={110}
              autoLoad
            />
          ) : (
            <img
              src={`http://124.43.179.118:8081/uploads/${images[currentIndex].split('\\').pop()}`}
              alt={`Slide ${currentIndex}`}
              className="main-imagex"
            />
          )}
          <button className="arrow-button right-arrow" onClick={handleNextClick}>
            <FaArrowRight />
          </button>
        </div>

        <div className="thumbnaill-sliderx" ref={thumbnailRef}>
          {images.map((image, index) => (
            <img
              key={index}
              src={`http://124.43.179.118:8081/uploads/${image.split('\\').pop()}`}
              alt={`Thumbnail ${index}`}
              className={`thumbnaillx ${currentIndex === index ? 'active' : ''}`}
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllPhotosPopup;