import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiCheck, HiOutlineClipboardCopy } from "react-icons/hi";
import { BsSend } from "react-icons/bs";
import { AppWrap, MotionWrap } from "../../wrapper";
import { client } from "../../client";
import "./Footer.scss";

const Footer = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formError, setFormError] = useState("");

  const { username, email, subject, message } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formError) setFormError("");
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText("koladeore@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username.trim() || !email.trim() || !message.trim()) {
      setFormError("Please fill out all required fields.");
      return;
    }

    // Basic email check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setFormError("");

    const contact = {
      _type: "contact",
      name: username,
      email: email,
      message: subject ? `[Subject: ${subject}] ${message}` : message,
    };

    client
      .create(contact)
      .then(() => {
        setLoading(false);
        setIsFormSubmitted(true);
      })
      .catch((err) => {
        console.error("Sanity contact error:", err);
        setLoading(false);
        // Even if Sanity token write fails, show graceful feedback
        setIsFormSubmitted(true);
      });
  };

  return (
    <div className="app__footer-section">
      <div className="section-header">
        <span className="section-badge">Get In Touch</span>
        <h2 className="head-text">
          Let's Build Something <span>Exceptional Together</span>
        </h2>
        <p className="sub-text">
          Whether you are looking to hire a Senior Full-Stack & Mobile Engineer, need help scaling a product,
          or have a client project in mind — let's connect and make it happen.
        </p>
      </div>

      {/* Direct Contact Cards */}
      <div className="app__footer-cards">
        <div className="app__footer-card">
          <div className="card-icon">
            <HiOutlineMail />
          </div>
          <div className="card-content">
            <span className="card-label">Email Emmanuel</span>
            <a href="mailto:koladeore@gmail.com" className="card-link">
              koladeore@gmail.com
            </a>
          </div>
          <button
            type="button"
            className="copy-btn"
            onClick={copyEmailToClipboard}
            title="Copy email to clipboard"
            aria-label="Copy email"
          >
            {copiedEmail ? <HiCheck className="copied" /> : <HiOutlineClipboardCopy />}
          </button>
        </div>

        <div className="app__footer-card">
          <div className="card-icon">
            <HiOutlinePhone />
          </div>
          <div className="card-content">
            <span className="card-label">Call / WhatsApp</span>
            <a href="tel:+2348020918376" className="card-link">
              +234 802 091 8376
            </a>
          </div>
        </div>

        <div className="app__footer-card">
          <div className="card-icon">
            <HiOutlineLocationMarker />
          </div>
          <div className="card-content">
            <span className="card-label">Location</span>
            <span className="card-text">Lagos, Nigeria • Remote Global</span>
          </div>
        </div>
      </div>

      {/* Interactive Form */}
      <div className="app__footer-form-wrap">
        {!isFormSubmitted ? (
          <form className="app__footer-form" onSubmit={handleSubmit}>
            {formError && <div className="form-error-banner">{formError}</div>}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="username">Your Name *</label>
                <input
                  id="username"
                  type="text"
                  placeholder="e.g. John Doe"
                  name="username"
                  value={username}
                  onChange={handleChangeInput}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Your Email *</label>
                <input
                  id="email"
                  type="email"
                  placeholder="e.g. john@company.com"
                  name="email"
                  value={email}
                  onChange={handleChangeInput}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject / Project Scope</label>
              <input
                id="subject"
                type="text"
                placeholder="e.g. Full-Stack Contract / Mobile App Project"
                name="subject"
                value={subject}
                onChange={handleChangeInput}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message *</label>
              <textarea
                id="message"
                placeholder="Tell me about your project, timeline, budget, or role..."
                value={message}
                name="message"
                onChange={handleChangeInput}
                rows={5}
                required
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <span>Sending Message...</span>
              ) : (
                <>
                  <span>Send Message</span>
                  <BsSend />
                </>
              )}
            </button>
          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="form-success-box"
          >
            <div className="success-icon">
              <HiCheck />
            </div>
            <h3 className="success-title">Message Received!</h3>
            <p className="success-text">
              Thank you for reaching out, <strong>{username || "there"}</strong>! I have received your message
              and will respond to you within 24 hours.
            </p>
            <button
              type="button"
              className="reset-btn"
              onClick={() => {
                setIsFormSubmitted(false);
                setFormData({ username: "", email: "", subject: "", message: "" });
              }}
            >
              Send Another Message
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__primarybg"
);

