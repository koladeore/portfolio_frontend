import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AppWrap, MotionWrap } from "../../wrapper";
import "./About.scss";
import { urlFor, client } from "../../client";
import { images } from "../../constants";

// Capability metadata mappings for enhanced presentation
const capabilityMeta = {
  "frontend": {
    displayTitle: "Frontend Engineering",
    pills: ["Next.js", "React", "TypeScript", "Tailwind / SCSS"],
    fallbackImg: images.about01,
  },
  "backend": {
    displayTitle: "Backend & System APIs",
    pills: ["Node.js", "Express", "RESTful APIs", "Socket.IO"],
    fallbackImg: images.about02,
  },
  "mobile": {
    displayTitle: "Cross-Platform Mobile",
    pills: ["React Native", "Expo", "iOS & Android", "Native Modules"],
    fallbackImg: images.about04,
  },
  "ui/ux": {
    displayTitle: "UI/UX & Product Design",
    pills: ["Figma", "Design Systems", "Prototyping", "User Experience"],
    fallbackImg: images.about03,
  },
};

const sanitizeDescription = (text) => {
  if (!text) return "";
  return text
    .replace(/passsion/gi, "passion")
    .replace(/funtional/gi, "functional")
    .replace(/dveloper/gi, "developer")
    .trim();
};

const getMetaForAbout = (title) => {
  const lower = (title || "").toLowerCase();
  if (lower.includes("front")) return capabilityMeta.frontend;
  if (lower.includes("back")) return capabilityMeta.backend;
  if (lower.includes("mobile")) return capabilityMeta.mobile;
  if (lower.includes("ui") || lower.includes("ux")) return capabilityMeta["ui/ux"];
  return {
    displayTitle: title,
    pills: ["Scalability", "Clean Code", "Modern Stack"],
    fallbackImg: images.about01,
  };
};

const About = () => {
  const [abouts, setAbouts] = useState([]);

  useEffect(() => {
    const query = '*[_type == "abouts"]';
    client
      .fetch(query)
      .then((data) => setAbouts(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="app__about-section">
      <div className="section-header">
        <span className="section-badge">Core Capabilities</span>
        <h2 className="head-text">
          I Know That <span>Good Apps</span> <br /> Means <span>Good Business</span>
        </h2>
        <p className="sub-text">
          Combining engineering rigor with intuitive user experiences to deliver resilient,
          high-performance digital products that drive commercial value.
        </p>
      </div>

      <div className="app__profiles-bento">
        {abouts.map((about, index) => {
          const meta = getMetaForAbout(about.title);
          const imgSrc = about.imgUrl ? urlFor(about.imgUrl) : meta.fallbackImg;
          const cleanDesc = sanitizeDescription(about.description);

          return (
            <motion.div
              whileInView={{ opacity: [0, 1], y: [20, 0] }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bento-card"
              key={about.title + index}
            >
              <div className="bento-card-image-wrap">
                <img src={imgSrc} alt={meta.displayTitle} />
                <div className="bento-card-glow"></div>
              </div>

              <div className="bento-card-body">
                <h3 className="bento-title">{meta.displayTitle}</h3>
                <p className="bento-desc">{cleanDesc}</p>

                <div className="bento-pills">
                  {meta.pills.map((pill, i) => (
                    <span className="pill" key={`pill-${index}-${i}`}>
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AppWrap(
  MotionWrap(About, "app__about"),
  "about",
  "app__whitebg"
);

