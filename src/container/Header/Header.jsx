import React from "react";
import { motion } from "framer-motion";
import { BsArrowRight, BsGithub } from "react-icons/bs";
import { HiSparkles, HiOutlineMail } from "react-icons/hi";
import { images } from "../../constants";
import { AppWrap } from "../../wrapper";
import "./Header.scss";

const Header = () => {
  const techPills = [
    { name: "React & Next.js", icon: images.react },
    { name: "React Native", icon: images.flutter || images.react },
    { name: "Node.js • NestJS • Express", icon: images.node },
    { name: "TypeScript", icon: images.typescript },
  ];

  const metrics = [
    { count: "5+", label: "Years Experience" },
    { count: "15+", label: "Shipped Projects" },
    { count: "100%", label: "Client Satisfaction" },
    { count: "Full-Stack", label: "Web & Mobile Focus" },
  ];


  return (
    <div className="app__header app__flex">
      {/* Left Column: Intro & Value Proposition */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="app__header-content"
      >
        {/* Availability Pill */}
        <div className="app__header-status">
          <span className="status-dot"></span>
          <span className="status-text">Available for Senior Roles & High-Impact Contracts</span>
        </div>

        {/* Commanding Headline */}
        <h1 className="app__header-title">
          Building Scalable <br />
          <span className="gradient-text">Web & Mobile Products</span> <br />
          That Drive Impact.
        </h1>

        {/* Clear Subtitle */}
        <p className="app__header-bio">
          Hi, I'm <strong className="highlight">Emmanuel Ore</strong> — a Senior Full-Stack & Mobile Engineer.
          I specialize in building production-ready web platforms with <strong>React</strong> & <strong>Next.js</strong>,
          and robust mobile applications with <strong>React Native</strong> and <strong>Node.js</strong> backends.
        </p>

        {/* CTA Actions */}
        <div className="app__header-ctas">
          <a href="#work" className="btn btn-primary">
            <span>Explore Projects</span>
            <BsArrowRight />
          </a>
          <a href="#contact" className="btn btn-secondary">
            <HiOutlineMail />
            <span>Get In Touch</span>
          </a>
          <a
            href="https://github.com/koladeore"
            target="_blank"
            rel="noreferrer"
            className="btn btn-glass"
            title="GitHub Profile"
          >
            <BsGithub />
            <span>GitHub</span>
          </a>
        </div>

        {/* Metrics Grid */}
        <div className="app__header-metrics">
          {metrics.map((m, idx) => (
            <div className="metric-card" key={`metric-${idx}`}>
              <span className="metric-number">{m.count}</span>
              <span className="metric-label">{m.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Right Column: Visual Portrait & Floating Tech Badges */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="app__header-visual"
      >
        <div className="portrait-frame">
          <div className="portrait-glow"></div>
          <div className="portrait-inner">
            <img src={images.profile} alt="Emmanuel Ore - Full-Stack Engineer" className="portrait-img" />
          </div>

          {/* Floating Badges */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="floating-badge top-left"
          >
            <div className="badge-icon">
              <img src={images.react} alt="React" />
            </div>
            <div className="badge-text">
              <span className="badge-title">Frontend</span>
              <span className="badge-sub">React / Next.js</span>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
            className="floating-badge bottom-right"
          >
            <div className="badge-icon">
              <img src={images.node} alt="Node.js" />
            </div>
            <div className="badge-text">
              <span className="badge-title">Backend & APIs</span>
              <span className="badge-sub">Node.js • NestJS • Express</span>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            className="floating-badge bottom-left"
          >
            <div className="badge-icon star">
              <HiSparkles />
            </div>
            <div className="badge-text">
              <span className="badge-title">Cross-Platform</span>
              <span className="badge-sub">React Native Mobile</span>
            </div>
          </motion.div>
        </div>

        {/* Orbiting / Supporting Stack Strip */}
        <div className="tech-strip">
          <span className="strip-title">Core Stack</span>
          <div className="strip-icons">
            {techPills.map((tech, i) => (
              <div className="strip-pill" key={`pill-${i}`} title={tech.name}>
                <img src={tech.icon} alt={tech.name} />
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AppWrap(Header, "home");

