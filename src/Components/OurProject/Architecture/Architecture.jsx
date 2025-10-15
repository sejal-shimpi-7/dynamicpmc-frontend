import React, { useState, useEffect } from "react";
import "./Architecture.css";
// import Hero from "../../Hero/Hero";
import PageHero from "../../PageHero/PageHero";
import ArcImg from "./archimg/ArcImg";
import { getProjectsByCategory } from "../../../services/apiService";

const Architecture = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // The ID for "Architectural Projects" is 2 from your database
  const ARCHITECTURE_CATEGORY_ID = 2;

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchArchitecturalImages = async () => {
      try {
        setLoading(true);
        const response = await getProjectsByCategory(ARCHITECTURE_CATEGORY_ID);
        
        // THIS IS THE CRITICAL SAFETY CHECK
        // It ensures we only process valid image arrays and filters out any null/undefined entries.
        const allImages = response.data
          .flatMap(project => project.images || []) // Use an empty array if project.images is missing
          .filter(Boolean); // Remove any null or undefined items from the final list

        setImages(allImages);
      } catch (err) {
        setError("Could not load architectural images.");
      } finally {
        setLoading(false);
      }
    };
    fetchArchitecturalImages();
  }, []);

  return (
    <>
      <PageHero title="Architecture Projects" />
      {loading && <p style={{ textAlign: 'center', padding: '50px' }}>Loading Images...</p>}
      {error && <p style={{ textAlign: 'center', padding: '50px', color: 'red' }}>{error}</p>}
      {/* This will now only render if there are actual images to show */}
      {!loading && !error && images.length > 0 && <ArcImg images={images} />}
      {!loading && !error && images.length === 0 && <p style={{ textAlign: 'center', padding: '50px' }}>No images found for this category.</p>}
    </>
  );
};

export default Architecture;