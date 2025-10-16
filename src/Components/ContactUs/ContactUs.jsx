import React, { useState } from 'react';
import './ContactUs.css';
import { sendContactForm } from '../../services/apiService';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
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
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (err) {
      setStatus({ loading: false, success: false, error: true, message: 'Failed to send message. Please try again.' });
    }
  };

  return (
    <div className="contact-page-container">
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.498844835154!2d73.75479237492167!3d18.6198514825126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9e76cf13a63%3A0x8e1b5595b1b46571!2sBlueberry%20Biz!5e0!3m2!1sen!2sin!4v1678886412345"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;