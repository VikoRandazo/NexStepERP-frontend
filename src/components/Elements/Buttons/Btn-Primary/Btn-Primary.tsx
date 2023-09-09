import React, { FC } from 'react';
import styles from './Btn-Primary.module.scss';

interface BtnPrimaryProps {}

const BtnPrimary: FC<BtnPrimaryProps> = () => (
  <div className={styles.BtnPrimary}>
    BtnPrimary Component
  </div>
);

export default BtnPrimary;
