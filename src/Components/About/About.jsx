import React, { useEffect } from 'react';
import './About.css';
import About_Us from '../../assets/About_us.svg';

const About = () => {
  useEffect(() => {
    const section = document.querySelector(".about");
    const counters = document.querySelectorAll(".stat-item h3");
    let animated = false; // to prevent replay every scroll

    const runCounter = () => {
      counters.forEach((counter) => {
        const target = parseInt(counter.innerText);
        let count = 0;
        const duration = 2000;
        const stepTime = Math.max(Math.floor(duration / target), 20);

        const update = () => {
          count++;
          counter.innerText = count + "+";
          counter.classList.add("pop");
          if (count < target) {
            setTimeout(update, stepTime);
          } else {
            counter.innerText = target + "+";
          }
        };

        update();
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animated) {
          runCounter();
          animated = true; // run only once
        }
      },
      { threshold: 0.5 } // 50% of section visible
    );

    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  return (
    <section className="about" id="about">
      <div className="about-container">
        
        <div className="about-image">
           <img src={About_Us} alt='About_us'/>
        </div>

        <div className="about-text">
          <h2>About Us</h2>
          <p>
           At <span style={{color:'red'}}>Dynamic Project Management Consultancy</span>, we specialize in providing expert project management consultancy services that help businesses navigate complex projects with efficiency and precision. 
           Our team of experienced professionals works closely with clients to design tailored solutions that align with their goals,
           ensuring successful project delivery.
          </p>

          <div className="stats-bar">
            <div className="stat-item">
              <h3>25+</h3>
              <p>years of Experience<br />as Architect</p>
            </div>
            <div className="stat-item">
              <h3>100+</h3>
              <p>Projects</p>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
