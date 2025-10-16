import React, { useState } from "react";
import "./ContactUs.css";

const ContactUs = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState(""); // ✅ success/error message

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("http://localhost:8080/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setStatus("success");
        setForm({ name: "", phone: "", email: "", message: "" }); // clear form
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

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

            {/* ✅ Status message */}
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
              placeholder="Your Name  "
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number "
              value={form.phone}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address "
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
            <button type="submit">SUBMIT</button>
          </form>

          <div className="map-container">
            <iframe
              title="Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7560.901425104985!2d73.74627789357908!3d18.643760100000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b94c6ba87eeb%3A0xd6545931e4e4de2a!2sBlueberry%20Biz!5e0!3m2!1sen!2sin!4v1755183668122!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
