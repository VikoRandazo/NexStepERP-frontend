import React, { FC } from 'react';
import styles from './Btn-Secondary.module.scss';

interface BtnSecondaryProps {}

const BtnSecondary: FC<BtnSecondaryProps> = () => (
  <div className={styles.BtnSecondary}>
    BtnSecondary Component
  </div>
);

export default BtnSecondary;
