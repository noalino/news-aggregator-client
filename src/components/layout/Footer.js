/* eslint-disable no-shadow */
import React from 'react';

import styleGrid from '../../styles/helpers/_layout.scss';
import styles from '../../styles/layout/Footer.scss';

const Footer = () => (
  <footer className={`${styleGrid.footer} ${styles.footer}`}>
    <p>
      Powered by
      {' '}
      <a href="https://newsapi.org/" target="_blank" rel="noreferrer noopener">
        News API
      </a>
    </p>
  </footer>
);

export default Footer;
