import React, { useState, useEffect } from 'react';
import './Hero.css';
import Home1 from '../../assets/Home1.jpg';
import Home2 from '../../assets/Home2.jpg';


const images = [Home1,Home2];

const Hero = ({ title }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000); // change every 3 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="hero"
      id="home"
      style={{ backgroundImage: `url(${images[index]})` }}
    >
      <div className="hero-text">
        <h1>
          {title ? (
            title
          ) : (
            <>
<h1>
  Where <br></br><span className="hero-text-highlight">DESIGN</span> <br></br>Meets<br></br> <span className="hero-text-highlight">DISCIPLINE</span>
</h1>
            
            </>
            



          )}
        </h1>
      </div>
    
    </section>
  );
};

export default Hero;
