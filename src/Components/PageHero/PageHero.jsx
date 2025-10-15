import React from 'react';
import './PageHero.css';

const PageHero = ({ title }) => {
  return (
    <div className="page-hero-section">
      <h1 className="page-hero-title">{title}</h1>
    </div>
  );
};

export default PageHero;