import React, { FC } from 'react';
import styles from './CustomRadio.module.scss';

interface CustomRadioProps {}

const CustomRadio: FC<CustomRadioProps> = () => (
  <div className={styles.CustomRadio}>
    CustomRadio Component
  </div>
);

export default CustomRadio;
