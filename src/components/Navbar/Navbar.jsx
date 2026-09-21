import React, { useState, useEffect } from "react";
import "./Navbar.scss";
import { HiMenuAlt4, HiX } from "react-icons/hi";
import { BsArrowRight } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#work" },
    { name: "Skills & Exp", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className={`app__navbar ${scrolled ? "app__navbar--scrolled" : ""}`}>
      <a href="#home" className="app__navbar-brand">
        <div className="app__navbar-brand-badge">EO</div>
        <div className="app__navbar-brand-text">
          <span className="name">Emmanuel Ore</span>
          <span className="role">Full-Stack & Mobile</span>
        </div>
      </a>

      <ul className="app__navbar-links">
        {navLinks.map((link) => (
          <li key={`nav-${link.name}`} className="app__flex">
            <a href={link.href}>{link.name}</a>
          </li>
        ))}
      </ul>

      <div className="app__navbar-actions">
        <a href="#contact" className="app__navbar-cta">
          <span>Let's Talk</span>
          <BsArrowRight />
        </a>

        <div className="app__navbar-menu">
          <button
            type="button"
            className="menu-toggle-btn"
            onClick={() => setToggle(true)}
            aria-label="Open menu"
          >
            <HiMenuAlt4 />
          </button>

          <AnimatePresence>
            {toggle && (
              <motion.div
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="app__navbar-drawer"
              >
                <button
                  type="button"
                  className="drawer-close-btn"
                  onClick={() => setToggle(false)}
                  aria-label="Close menu"
                >
                  <HiX />
                </button>
                <div className="drawer-brand">
                  <span className="name">Emmanuel Ore</span>
                  <span className="role">Senior Software Engineer</span>
                </div>
                <ul>
                  {navLinks.map((link) => (
                    <li key={`mobile-${link.name}`}>
                      <a href={link.href} onClick={() => setToggle(false)}>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="drawer-cta"
                  onClick={() => setToggle(false)}
                >
                  Get In Touch
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

