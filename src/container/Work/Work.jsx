import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsGithub, BsArrowUpRight } from 'react-icons/bs';
import { FiFigma } from 'react-icons/fi';
import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import './Work.scss';

// Tech stack heuristics based on project title and description
const inferTechStack = (work) => {
  const text = `${work.title} ${work.description} ${(work.tags || []).join(' ')}`.toLowerCase();
  const tags = [];

  if (text.includes('react native') || text.includes('expo') || text.includes('deliveroo') || text.includes('mealstogo')) {
    tags.push('React Native', 'Expo');
  } else if (text.includes('next') || text.includes('next.js')) {
    tags.push('Next.js', 'React');
  } else if (text.includes('react') || text.includes('movie') || text.includes('amazon')) {
    tags.push('React.js');
  }

  if (text.includes('node') || text.includes('restful') || text.includes('api') || text.includes('library')) {
    tags.push('Node.js', 'Express');
  }

  if (text.includes('typescript')) tags.push('TypeScript');
  if (text.includes('socket') || text.includes('chat')) tags.push('Socket.IO');
  if (text.includes('stripe')) tags.push('Stripe');
  if (text.includes('sanity')) tags.push('Sanity CMS');
  if (text.includes('figma') || work.tags?.includes('UI/UX')) tags.push('Figma', 'UI/UX');
  if (text.includes('ci/cd') || text.includes('cicd') || text.includes('pipeline') || text.includes('github actions')) tags.push('CI/CD');

  // Fallback defaults
  if (tags.length === 0) {
    if (work.tags?.includes('Mobile App')) tags.push('React Native', 'Mobile');
    else if (work.tags?.includes('UI/UX')) tags.push('Figma', 'Design');
    else tags.push('React', 'JavaScript');
  }

  return Array.from(new Set(tags)).slice(0, 4);
};

// Clean project titles
const formatTitle = (title) => {
  if (!title) return '';
  return title
    .replace(/LIBRARY MANAGEMENT SYSTEM\s*/gi, 'Library Management System')
    .replace(/^\s*church website\s*$/gi, 'Community Church Platform')
    .replace(/Restuarants/gi, 'Gourmet Restaurant App')
    .replace(/Movie_Hub/gi, 'MovieHub Explorer')
    .replace(/chat application/gi, 'Real-Time Chat Engine')
    .replace(/Deliveroo-clone/gi, 'Deliveroo Food Delivery')
    .replace(/Amazon Clone/gi, 'Amazon Prime E-Commerce')
    .trim();
};

const Work = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = '*[_type == "works"]';
    client
      .fetch(query)
      .then((data) => {
        setWorks(data);
        setFilterWork(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    if (item === 'All') {
      setFilterWork(works);
    } else {
      setFilterWork(works.filter((work) => work.tags && work.tags.includes(item)));
    }
  };

  const filterCategories = ['All', 'Web App', 'Mobile App', 'UI/UX'];

  return (
    <div className="app__work-section">
      <div className="section-header">
        <span className="section-badge">Portfolio Showcase</span>
        <h2 className="head-text">
          Featured <span>Engineering Projects</span>
        </h2>
        <p className="sub-text">
          A curated selection of production web platforms, cross-platform mobile apps,
          and interactive UI/UX prototypes engineered with modern best practices.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="app__work-filter">
        {filterCategories.map((item, index) => (
          <button
            key={`filter-${index}`}
            onClick={() => handleWorkFilter(item)}
            className={`filter-btn ${activeFilter === item ? 'filter-btn-active' : ''}`}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div layout className="app__work-portfolio">
        <AnimatePresence>
          {filterWork.map((work, index) => {
            const techPills = inferTechStack(work);
            const isFigma = work.tags?.includes('UI/UX') || (work.projectLink && work.projectLink.includes('figma.com'));
            const displayTitle = formatTitle(work.title);
            const categoryTag = work.tags?.find((t) => t !== 'All') || 'Web App';

            return (
              <motion.article
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                className="project-card"
                key={work._id || work.title + index}
              >
                {/* Image Container */}
                <div className="project-card-image-wrap">
                  {work.imgUrl ? (
                    <img src={urlFor(work.imgUrl)} alt={displayTitle} loading="lazy" />
                  ) : (
                    <div className="image-placeholder">
                      <span>{displayTitle}</span>
                    </div>
                  )}

                  <span className="category-badge">{categoryTag}</span>
                </div>

                {/* Content */}
                <div className="project-card-content">
                  <h3 className="project-title" title={displayTitle}>
                    {displayTitle}
                  </h3>

                  <p className="project-desc">
                    {work.description}
                  </p>

                  {/* Tech stack tags */}
                  <div className="project-tech-tags">
                    {techPills.map((tech, i) => (
                      <span className="tech-tag" key={`tech-${index}-${i}`}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Link Buttons */}
                  <div className="project-actions">
                    {work.projectLink && (
                      <a
                        href={work.projectLink}
                        target="_blank"
                        rel="noreferrer"
                        className="action-btn action-primary"
                        aria-label={`View live demo of ${displayTitle}`}
                      >
                        {isFigma ? (
                          <>
                            <FiFigma />
                            <span>Figma Prototype</span>
                          </>
                        ) : (
                          <>
                            <span>Live Preview</span>
                            <BsArrowUpRight />
                          </>
                        )}
                      </a>
                    )}

                    {work.codeLink && (
                      <a
                        href={work.codeLink}
                        target="_blank"
                        rel="noreferrer"
                        className="action-btn action-secondary"
                        aria-label={`View source code of ${displayTitle}`}
                      >
                        <BsGithub />
                        <span>Source</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default AppWrap(
  MotionWrap(Work, 'app__works'),
  'work',
  'app__primarybg'
);