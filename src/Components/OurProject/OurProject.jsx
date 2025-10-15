import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCategories } from '../../services/apiService'; 
import './OurProject.css';

const OurProject = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await getAllCategories();
        setCategories(response.data);
      } catch (err) {
        setError('Could not load project categories.');
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const categoryLinks = {
    'Architectural Projects': '/architecture',
    'Consultancy Projects': '/consultancy',
    'Interior Projects': '/interior'
  };

  if (loading) return <p className="text-center">Loading Categories...</p>;
  if (error) return <p className="text-center" style={{ color: 'red' }}>{error}</p>;

  return (
    // THIS IS THE ONLY CHANGE - ADDING id="projects"
    <section id="projects" className="projects-section">
      <h2>Our Projects</h2>
      <div className="projects-container">
        {categories.map((category) => (
          <div className="project-card" key={category.id}>
            <h3>{category.name}</h3>
            <Link to={categoryLinks[category.name] || '/'} className="explore-btn">
              Explore projects &rarr;
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurProject;