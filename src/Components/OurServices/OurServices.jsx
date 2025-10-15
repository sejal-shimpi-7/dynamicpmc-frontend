import React from "react";
import "./Ourservices.css";

const Ourservices = () => {


  return (
    <section className="ourservices" id="services">
      <h2 className="ourservices-title">OUR SERVICES</h2>
      <div className="ourservices-container">
        
        {/* Project Management */}
        <div className="ourservices-card">
          <h3>PROJECT MANAGEMENT</h3>
          <p>Comprehensive Planning with Clear objectives, deliverables & milestones.</p>
          <p><strong>Resource Optimization:</strong> Balanced allocation for time & cost efficiency.</p>
          <p><strong>Smart Tools:</strong> Progress tracking, risk monitoring & insightful reporting.</p>
          <p><strong>Real-Time Dashboards:</strong> Instant updates with full project visibility</p>
        </div>

        {/* Architecture */}
        <div className="ourservices-card">
          <h3>ARCHITECTURE</h3>
          <p>Crafting innovative, functional, and sustainable building designs compliant with regulatory norms.</p>
          <p><strong>Space Planning & Layouts:</strong> Optimizing layouts for maximum utility tailored for residential, commercial, and industrial spaces.</p>
          <p><strong>Sustainable & Innovative Solutions:</strong> Incorporating energy-efficient modern technologies, and eco-friendly materials.</p>
        </div>

        {/* Interior */}
        <div className="ourservices-card">
          <h3>INTERIOR</h3>
          <p>Designing interiors that blend style with functionality.</p>
          <p><strong>Functional & trending design:</strong> Focus on space planning, material selection, 
            color schemes, lighting, and detailing. Create environments comfortable, elegant, and aligned with the client’s vision.</p>
          <p><strong>3D Visualization:</strong> 3D renders, and walkthroughs to help clients visualize the project.</p>
        </div>
      </div>

     
    </section>
  );
};

export default Ourservices;
