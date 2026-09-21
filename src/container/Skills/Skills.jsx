import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BsBriefcase, BsCheck2Circle } from 'react-icons/bs';
import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import { images } from '../../constants';
import './Skills.scss';

// Comprehensive local skill catalog to enrich Sanity data
const defaultSkills = [
  { name: 'React.js', icon: images.react, category: 'Frontend' },
  { name: 'Next.js', icon: images.react, category: 'Frontend' },
  { name: 'React Native', icon: images.flutter || images.react, category: 'Mobile' },
  { name: 'TypeScript', icon: images.typescript, category: 'Frontend' },
  { name: 'JavaScript', icon: images.javascript, category: 'Frontend' },
  { name: 'Node.js', icon: images.node, category: 'Backend' },
  { name: 'REST APIs', icon: images.api, category: 'Backend' },
  { name: 'Redux Toolkit', icon: images.redux, category: 'Frontend' },
  { name: 'SCSS / CSS3', icon: images.sass, category: 'Frontend' },
  { name: 'Figma UI/UX', icon: images.figma, category: 'Design' },
  { name: 'Git & GitHub', icon: images.git, category: 'Tools' },
  { name: 'GraphQL', icon: images.graphql, category: 'Backend' },
  { name: 'Python', icon: images.python, category: 'Backend' },
];

const parseYearForSorting = (yearStr) => {
  if (!yearStr) return 0;
  const match = yearStr.match(/\d{4}/g);
  if (!match) return 0;
  return Math.max(...match.map((y) => parseInt(y, 10)));
};

const extractExpTech = (desc) => {
  const text = (desc || '').toLowerCase();
  const tech = [];
  if (text.includes('react native')) tech.push('React Native');
  if (text.includes('next.js') || text.includes('next')) tech.push('Next.js');
  if (text.includes('tailwind')) tech.push('Tailwind CSS');
  if (text.includes('node.js') || text.includes('node')) tech.push('Node.js');
  if (text.includes('typescript')) tech.push('TypeScript');
  if (text.includes('react') && !tech.includes('React Native')) tech.push('React');
  if (text.includes('edtech') || text.includes('ai')) tech.push('AI Integration');
  return tech;
};

const Skills = () => {
  const [experiences, setExperiences] = useState([]);
  const [sanitySkills, setSanitySkills] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const query = '*[_type == "experiences"]';
    const skillsQuery = '*[_type == "skills"]';

    client
      .fetch(query)
      .then((data) => {
        // Filter out empty experiences and sort chronologically (most recent first)
        const validExps = (data || [])
          .filter((exp) => exp.works && exp.works.length > 0)
          .sort((a, b) => parseYearForSorting(b.year) - parseYearForSorting(a.year));
        setExperiences(validExps);
      })
      .catch((err) => console.log(err));

    client
      .fetch(skillsQuery)
      .then((data) => {
        setSanitySkills(data || []);
      })
      .catch((err) => console.log(err));
  }, []);

  // Merge Sanity skills with default skills, ensuring icons and categories
  const mergedSkills = React.useMemo(() => {
    const map = new Map();
    defaultSkills.forEach((s) => map.set(s.name.toLowerCase().replace(/\s+/g, ''), s));

    sanitySkills.forEach((s) => {
      const key = s.name.toLowerCase().replace(/\s+/g, '');
      const existing = map.get(key);
      map.set(key, {
        name: s.name,
        icon: s.icon ? urlFor(s.icon) : existing?.icon || images.react,
        category: existing?.category || 'Engineering',
        bgColor: s.bgColor,
      });
    });

    return Array.from(map.values());
  }, [sanitySkills]);

  const categories = ['All', 'Frontend', 'Mobile', 'Backend', 'Tools'];

  const filteredSkills =
    activeCategory === 'All'
      ? mergedSkills
      : mergedSkills.filter((s) => s.category === activeCategory || (activeCategory === 'Tools' && s.category === 'Design'));

  return (
    <div className="app__skills-section">
      <div className="section-header">
        <span className="section-badge">Expertise & Career Track Record</span>
        <h2 className="head-text">
          Technical Skills & <span>Work Experience</span>
        </h2>
        <p className="sub-text">
          A proven track record spanning over 5 years of architecting web apps, shipping mobile applications,
          and delivering resilient software solutions for businesses worldwide.
        </p>
      </div>

      <div className="app__skills-container">
        {/* Left: Skills Showcase */}
        <div className="app__skills-column">
          <div className="column-header">
            <h3 className="column-title">Tech Stack & Tools</h3>
            <div className="skills-filter-pills">
              {categories.map((cat) => (
                <button
                  key={`cat-${cat}`}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`cat-pill ${activeCategory === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="app__skills-grid">
            {filteredSkills.map((skill, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5, scale: 1.03 }}
                transition={{ duration: 0.25 }}
                className="skill-card"
                key={`skill-${skill.name}-${index}`}
              >
                <div className="skill-icon-wrap">
                  <img src={skill.icon} alt={skill.name} />
                </div>
                <span className="skill-name">{skill.name}</span>
                <span className="skill-cat-tag">{skill.category}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right: Career Experience Timeline */}
        <div className="app__exp-column">
          <div className="column-header">
            <h3 className="column-title">
              <BsBriefcase />
              <span>Career Milestones</span>
            </h3>
          </div>

          <div className="timeline-track">
            {experiences.map((exp, expIdx) => (
              <div className="timeline-entry" key={exp._id || `exp-${expIdx}`}>
                <div className="timeline-marker">
                  <div className="timeline-dot"></div>
                  <div className="timeline-line"></div>
                </div>

                <div className="timeline-content">
                  <div className="timeline-header">
                    <span className="timeline-year-pill">{exp.year}</span>
                  </div>

                  {exp.works?.map((work, workIdx) => {
                    const techStack = extractExpTech(work.desc);

                    return (
                      <motion.div
                        whileInView={{ opacity: [0, 1], y: [15, 0] }}
                        transition={{ duration: 0.4 }}
                        className="timeline-card"
                        key={work._key || `work-${expIdx}-${workIdx}`}
                      >
                        <div className="card-top">
                          <h4 className="role-name">{work.name}</h4>
                          <span className="company-name">{work.company}</span>
                        </div>

                        {work.desc && (
                          <p className="role-desc">
                            {work.desc}
                          </p>
                        )}

                        {techStack.length > 0 && (
                          <div className="role-tags">
                            {techStack.map((tech, tIdx) => (
                              <span className="role-tag" key={`exp-tech-${expIdx}-${tIdx}`}>
                                <BsCheck2Circle />
                                <span>{tech}</span>
                              </span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppWrap(
  MotionWrap(Skills, 'app__skills'),
  'skills',
  'app__whitebg'
);

