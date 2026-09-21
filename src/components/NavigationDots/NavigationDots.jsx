/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';

const NavigationDots = ({ active }) => {
  const sections = ['home', 'about', 'work', 'skills', 'contact'];

  return (
    <nav className='app__navigation' aria-label="Page navigation">
      {sections.map((item, index) => (
        <a
          href={`#${item}`}
          key={item + index}
          aria-label={`Scroll to ${item} section`}
          title={item.charAt(0).toUpperCase() + item.slice(1)}
          className={`app__navigation-dot ${active === item ? 'active' : ''}`}
        />
      ))}
    </nav>
  );
};

export default NavigationDots;