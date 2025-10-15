import React, { useState, useEffect } from "react";
import "./Consultancy.css";
// import Hero from "../../Hero/Hero";
import PageHero from "../../PageHero/PageHero";
import ConImg from "./consimg/ConImg";
import { getProjectsByCategory } from "../../../services/apiService";

const Consultancy = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const CONSULTANCY_CATEGORY_ID = 1; // ID from your database

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchConsultancyImages = async () => {
      try {
        setLoading(true);
        const response = await getProjectsByCategory(CONSULTANCY_CATEGORY_ID);
        // THIS LINE IS NOW MORE ROBUST
        const allImages = response.data.flatMap(project => project.images || []).filter(Boolean);
        setImages(allImages);
      } catch (err) {
        setError("Could not load consultancy images.");
      } finally {
        setLoading(false);
      }
    };
    fetchConsultancyImages();
  }, []);

  return (
    <>
      <PageHero title="Consultancy Projects" />
      {loading && <p style={{ textAlign: 'center', padding: '50px' }}>Loading Images...</p>}
      {error && <p style={{ textAlign: 'center', padding: '50px', color: 'red' }}>{error}</p>}
      {!loading && !error && <ConImg images={images} />}
    </>
  );
};

export default Consultancy;