import React, { useState } from "react";
import "./ContactUs.css";
import { sendContactForm } from "../../services/apiService";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'; // Import icons

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [status, setStatus] = useState({ loading: false, success: false, error: false, message: '' });

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: false, message: '' });
    try {
      await sendContactForm(formData);
      setStatus({ loading: false, success: true, error: false, message: 'Your message has been sent successfully!' });
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (err) {
      setStatus({ loading: false, success: false, error: true, message: 'Failed to send message. Please try again.' });
    }
  };

  return (
    <section className="contact-page">
      <div className="contact-info-grid">
        <div className="info-card">
          <FaPhone className="info-icon" />
          <h3>+91 9420426774</h3>
          <p>Give us a ring. Our Experts are standing by Monday to Friday from 10am to 6pm IST.</p>
        </div>
        <div className="info-card">
          <FaEnvelope className="info-icon" />
          <h3><a href="mailto:admin@dynamicpmc.com">admin@dynamicpmc.com</a></h3>
          <p>Simply drop us an email and you'll receive a reply within 24 hours.</p>
        </div>
        <div className="info-card">
          <FaMapMarkerAlt className="info-icon" />
          <h3>Office address</h3>
          <p>BIZ Blue Berry Business Center, Near D Y Patil College, Akurdi, Ravet-412101</p>
        </div>
      </div>

      <div className="contact-main-grid">
        <div className="contact-form-card">
          <h2>Get in touch</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleInputChange} required />
            <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} required />
            <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} required />
            <textarea name="message" placeholder="Type your message" value={formData.message} onChange={handleInputChange} required />
            <button type="submit" disabled={status.loading}>
              {status.loading ? 'Sending...' : 'SUBMIT'}
            </button>
          </form>
          {status.message && (
            <p className={`status-message ${status.success ? 'success' : 'error'}`}>
              {status.message}
            </p>
          )}
        </div>
        <div className="map-container">
          <iframe
            src="http://googleusercontent.com/maps.google.com/7"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;