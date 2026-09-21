import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineMail,
  HiCheck,
  HiOutlineClipboardCopy,
  HiOutlineLocationMarker,
  HiOutlineSparkles,
} from "react-icons/hi";
import { FaWhatsapp, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { BsTwitter, BsArrowUpRight, BsSend } from "react-icons/bs";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./Footer.scss";

const Footer = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [draftSubject, setDraftSubject] = useState("");
  const [draftMessage, setDraftMessage] = useState("");

  const emailAddress = "koladeore@gmail.com";
  const whatsappNumber = "+2348020918376";

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleLaunchEmail = (e) => {
    e.preventDefault();
    const sub = draftSubject.trim() || "Project Inquiry | Emmanuel Ore";
    const body = draftMessage.trim() || "Hi Emmanuel,\n\nI came across your portfolio and would like to discuss...";
    window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent(sub)}&body=${encodeURIComponent(body)}`;
  };

  const handleOpenGmailWeb = () => {
    const sub = draftSubject.trim() || "Project Inquiry | Emmanuel Ore";
    const body = draftMessage.trim() || "Hi Emmanuel,\n\nI came across your portfolio and would like to discuss...";
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=${encodeURIComponent(sub)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="app__footer-section">
      {/* Header */}
      <div className="section-header">
        <span className="section-badge">
          <HiOutlineSparkles />
          <span>Direct Connect Hub</span>
        </span>
        <h2 className="head-text">
          Let's Build Something <span>Exceptional</span>
        </h2>
        <p className="sub-text">
          Skip the middleman. Reach me directly through your preferred channel for fast,
          direct communication regarding senior roles, contracts, or engineering projects.
        </p>
      </div>

      {/* 4 Direct Connect Action Cards */}
      <div className="connect-hub-grid">
        {/* 1. Direct Email Card */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ duration: 0.3 }}
          className="connect-card card-email"
        >
          <div className="card-top">
            <div className="card-icon-wrap email-icon">
              <HiOutlineMail />
            </div>
            <span className="channel-badge">Primary Channel</span>
          </div>

          <div className="card-info">
            <h3 className="channel-title">Direct Email</h3>
            <p className="channel-detail">{emailAddress}</p>
            <p className="channel-description">
              Send job opportunities, RFP briefs, or project specifications directly to my inbox.
            </p>
          </div>

          <div className="card-actions">
            <a
              href={`mailto:${emailAddress}?subject=Project%20Inquiry%20%7C%20Emmanuel%20Ore`}
              className="hub-btn hub-btn-primary"
            >
              <span>Send Email</span>
              <BsArrowUpRight />
            </a>

            <button
              type="button"
              className="hub-btn hub-btn-secondary"
              onClick={copyEmailToClipboard}
              title="Copy email address"
            >
              {copiedEmail ? (
                <>
                  <HiCheck className="check-green" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <HiOutlineClipboardCopy />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* 2. WhatsApp Direct Card */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ duration: 0.3 }}
          className="connect-card card-whatsapp"
        >
          <div className="card-top">
            <div className="card-icon-wrap whatsapp-icon">
              <FaWhatsapp />
            </div>
            <span className="channel-badge green">⚡ Fast Reply</span>
          </div>

          <div className="card-info">
            <h3 className="channel-title">WhatsApp Chat</h3>
            <p className="channel-detail">+234 802 091 8376</p>
            <p className="channel-description">
              Instant messaging for quick questions, scheduling calls, and urgent project timelines.
            </p>
          </div>

          <div className="card-actions">
            <a
              href={`https://wa.me/${whatsappNumber.replace("+", "")}?text=Hi%20Emmanuel%2C%20I%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project%2Frole.`}
              target="_blank"
              rel="noreferrer"
              className="hub-btn hub-btn-whatsapp"
            >
              <FaWhatsapp />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </motion.div>

        {/* 3. LinkedIn Card */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ duration: 0.3 }}
          className="connect-card card-linkedin"
        >
          <div className="card-top">
            <div className="card-icon-wrap linkedin-icon">
              <FaLinkedinIn />
            </div>
            <span className="channel-badge blue">Professional</span>
          </div>

          <div className="card-info">
            <h3 className="channel-title">LinkedIn Network</h3>
            <p className="channel-detail">Emmanuel Ore</p>
            <p className="channel-description">
              Connect professionally, review career background, and send direct inMail messages.
            </p>
          </div>

          <div className="card-actions">
            <a
              href="https://www.linkedin.com/in/emmmanuel-ore"
              target="_blank"
              rel="noreferrer"
              className="hub-btn hub-btn-linkedin"
            >
              <FaLinkedinIn />
              <span>Message on LinkedIn</span>
            </a>
          </div>
        </motion.div>

        {/* 4. Code & Socials Card */}
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ duration: 0.3 }}
          className="connect-card card-code"
        >
          <div className="card-top">
            <div className="card-icon-wrap code-icon">
              <FaGithub />
            </div>
            <span className="channel-badge">Open Source</span>
          </div>

          <div className="card-info">
            <h3 className="channel-title">Code & Socials</h3>
            <p className="channel-detail">@koladeore • @ore_kolade</p>
            <p className="channel-description">
              Explore public GitHub repositories, code architecture, or follow engineering updates.
            </p>
          </div>

          <div className="card-actions-row">
            <a
              href="https://github.com/koladeore"
              target="_blank"
              rel="noreferrer"
              className="hub-btn hub-btn-secondary"
            >
              <FaGithub />
              <span>GitHub</span>
            </a>
            <a
              href="https://twitter.com/ore_kolade"
              target="_blank"
              rel="noreferrer"
              className="hub-btn hub-btn-secondary"
            >
              <BsTwitter />
              <span>Twitter / X</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Quick Email Composer Helper */}
      <div className="quick-compose-box">
        <div className="compose-header">
          <div className="compose-title-group">
            <h4 className="compose-title">Draft a Message Directly</h4>
            <p className="compose-sub">
              Write your note below to automatically launch it in your default mail app or Gmail Web with zero delivery issues.
            </p>
          </div>
          <div className="location-pill">
            <HiOutlineLocationMarker />
            <span>Lagos, Nigeria • Remote Global</span>
          </div>
        </div>

        <form onSubmit={handleLaunchEmail} className="compose-form">
          <div className="compose-group">
            <label htmlFor="draftSubject">Subject / Role / Project Name</label>
            <input
              id="draftSubject"
              type="text"
              placeholder="e.g. Senior Full-Stack Engineer Role / Mobile App Project"
              value={draftSubject}
              onChange={(e) => setDraftSubject(e.target.value)}
            />
          </div>

          <div className="compose-group">
            <label htmlFor="draftMessage">Message Details</label>
            <textarea
              id="draftMessage"
              rows={4}
              placeholder="Hi Emmanuel, I'm reaching out regarding..."
              value={draftMessage}
              onChange={(e) => setDraftMessage(e.target.value)}
            />
          </div>

          <div className="compose-actions">
            <button type="submit" className="compose-btn btn-mail">
              <BsSend />
              <span>Send via Email App</span>
            </button>

            <button
              type="button"
              onClick={handleOpenGmailWeb}
              className="compose-btn btn-gmail"
            >
              <HiOutlineMail />
              <span>Open in Gmail Web</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__primarybg"
);


