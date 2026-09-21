import React from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { BsTwitter } from 'react-icons/bs';
import { HiMail } from 'react-icons/hi';

const SocialMedia = () => {
  return (
    <div className='app__social'>
      <div title="GitHub">
        <a href="https://github.com/koladeore" target="_blank" rel="noreferrer" aria-label="GitHub Profile">
          <FaGithub />
        </a>
      </div>
      <div title="LinkedIn">
        <a href="https://www.linkedin.com/in/kolade-oreoluwa/" target="_blank" rel="noreferrer" aria-label="LinkedIn Profile">
          <FaLinkedinIn />
        </a>
      </div>
      <div title="Twitter / X">
        <a href="https://twitter.com/ore_kolade" target="_blank" rel="noreferrer" aria-label="Twitter Profile">
          <BsTwitter />
        </a>
      </div>
      <div title="Email Emmanuel">
        <a href="mailto:koladeore@gmail.com" aria-label="Send Email">
          <HiMail />
        </a>
      </div>
    </div>
  );
};

export default SocialMedia;