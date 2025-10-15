import React from 'react';
import { useInView } from 'react-intersection-observer';
import './IntImg.css';

// A sub-component for each row to handle its own animation
const GalleryRow = ({ img, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Animate only once
    threshold: 0.1,    // Trigger when 10% of the item is visible
  });

  return (
    <div
      ref={ref}
      className={`gallery-row ${index % 2 === 0 ? 'image-left' : 'image-right'} ${inView ? 'is-visible' : ''}`}
    >
      <div className="image-container">
        <img src={img.imageUrl.startsWith('http') ? img.imageUrl : `http://localhost:3344${img.imageUrl}`} alt={img.description || `Interior ${index + 1}`} />
      </div>
      <div className="description-container">
        <p>{img.description}</p>
      </div>
    </div>
  );
};

const IntImg = ({ images = [] }) => {
  return (
    <div className="interior-gallery">
      {images.map((img, index) => (
        <GalleryRow img={img} index={index} key={img.id} />
      ))}
    </div>
  );
};

export default IntImg;