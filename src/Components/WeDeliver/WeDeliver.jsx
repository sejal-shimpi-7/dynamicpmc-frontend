import React, { useEffect } from "react";
import "./WeDeliver.css";
import { FaProjectDiagram, FaPencilRuler } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const WeDeliver = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: true,     // animate only once when scrolled into view
    });
  }, []);

  return (
    <div className="we-deliver-container" id="we-deliver">
      <h2 className="section-title">WE DELIVER</h2>
      <div className="services-container">
        <div className="service-box" data-aos="fade-up">
          <div className="icon-heading">
            <FaProjectDiagram className="box-icon" />
            <h3>PROJECT MANAGEMENT SERVICES</h3>
          </div>
          <ul>
            <li>Feasibility reports</li>
            <li>Appointment of consultant</li>
            <li>Estimation and cost analysis</li>
            <li>Tendering process</li>
            <li>Project planning and scheduling</li>
            <li>Project supervision and management</li>
            <li>Certification of bills</li>
            <li>Quality management</li>
            <li>Project coordination</li>
            <li>Project monitoring &amp; control</li>
            <li>Project closure</li>
            <li>Valuation report</li>
          </ul>
        </div>

        <div className="service-box" data-aos="fade-up" data-aos-delay="200">
          <div className="icon-heading">
            <FaPencilRuler className="box-icon" />
            <h3>DESIGN SERVICES</h3>
          </div>
          <ul>
            <li>Concept designing</li>
            <li>Preliminary designing</li>
            <li>Drawing for statutory approvals</li>
            <li>MEP drawings</li>
            <li>Fire fighting &amp; security system drawing</li>
            <li>Working drawings &amp; tender documents</li>
            <li>Bill of quantities with specification</li>
            <li>Appointment of contractors</li>
            <li>Occasional site monitoring &amp; visit</li>
            <li>Completion and Handover</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WeDeliver;
