import React, { FC } from 'react';
import styles from './Footer.module.scss';

interface FooterProps {}

const Footer: FC<FooterProps> = () => (
  <div className={styles.LayoutFooter}>
   Footer Component
  </div>
);

export default Footer;
