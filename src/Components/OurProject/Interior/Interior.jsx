import React, { useState, useEffect } from "react";
import "./Interior.css";
// import Hero from "../../Hero/Hero";
import PageHero from "../../PageHero/PageHero";
import IntImg from "./intimg/IntImg";
import { getProjectsByCategory } from "../../../services/apiService";

const Interior = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const INTERIOR_CATEGORY_ID = 3; // ID from your database

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchInteriorImages = async () => {
      try {
        setLoading(true);
        const response = await getProjectsByCategory(INTERIOR_CATEGORY_ID);
        // THIS LINE IS NOW MORE ROBUST
        const allImages = response.data.flatMap(project => project.images || []).filter(Boolean);
        setImages(allImages);
      } catch (err) {
        setError("Could not load interior images.");
      } finally {
        setLoading(false);
      }
    };
    fetchInteriorImages();
  }, []);

  return (
    <div className="interior-page">
      <PageHero title="Interior Projects" />
      {loading && <p style={{ textAlign: 'center', padding: '50px' }}>Loading Images...</p>}
      {error && <p style={{ textAlign: 'center', padding: '50px', color: 'red' }}>{error}</p>}
      {!loading && !error && <IntImg images={images} />}
    </div>
  );
};

export default Interior;