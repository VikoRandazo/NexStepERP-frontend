import React, { FC } from 'react';
import styles from './Btn-Outline.module.scss';

interface BtnOutlineProps {}

const BtnOutline: FC<BtnOutlineProps> = () => (
  <div className={styles.BtnOutline}>
    BtnOutline Component
  </div>
);

export default BtnOutline;
