import React, { useState } from "react";
import "./ContactUs.css";
// 1. Import the function from our apiService
import { sendContactForm } from "../../services/apiService";

const ContactUs = () => {
  // Your state management is perfect, we will keep it.
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState(""); // success/error message

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 2. This is the only part that changes.
  // It now calls our live backend via the apiService.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // Use the sendContactForm function from apiService
      await sendContactForm(form);
      
      setStatus("success");
      setForm({ name: "", phone: "", email: "", message: "" }); // clear form
    } catch (error) {
      setStatus("error");
    }
  };

  // Your JSX structure remains exactly the same to preserve the appearance.
  return (
    <section className="contactUs" id="contact">
      <div className="contact-us">
        {/* Top info cards */}
        <div className="contact-info">
          <div className="info-card">
            <span className="icon">📞</span>
            <h3>+91 9420426774</h3>
            <p>
              Give us a ring. Our Experts are standing by Monday to Friday from
              10am to 6pm IST.
            </p>
          </div>
          <div className="info-card">
            <span className="icon">✉️</span>
            <h3>
              <a href="mailto:admin@dynamicpmc.com">
                admin@dynamicpmc.com
              </a>
            </h3>
            <p>
              Simply drop us an email and you'll receive a reply within 24 hours.
            </p>
          </div>
          <div className="info-card">
            <span className="icon">📍</span>
            <h3>Office address</h3>
            <p>
              Biz Blue Berry Business Center, Near D Y Patil College, Akurdi,
              Ravet-412101
            </p>
          </div>
        </div>

        {/* Form + Map */}
        <div className="contact-main">
          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Get in touch</h2>

            {/* Status message */}
            {status === "success" && (
              <div className="msg success">✅ Mail sent successfully!</div>
            )}
            {status === "error" && (
              <div className="msg error">
                ❌ Failed to send mail. Please try again.
              </div>
            )}
            {status === "loading" && (
              <div className="msg loading">⏳ Sending...</div>
            )}

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Type your message"
              value={form.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? 'SENDING...' : 'SUBMIT'}
            </button>
          </form>

         <div className="map-container">
  <iframe 
    src="http://googleusercontent.com/maps.google.com/7"
    width="100%" 
    height="100%" 
    style={{ border: 0 }} 
    allowFullScreen="" 
    loading="lazy" 
    referrerPolicy="no-referrer-when-downgrade"
    title="Blueberry Biz Location">
  </iframe>
</div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;