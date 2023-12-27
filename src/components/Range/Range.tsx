import React, { FC } from 'react';
import styles from './Range.module.scss';

interface RangeProps {}

const Range: FC<RangeProps> = () => (
  <div className={styles.Range}>
    Range Component
  </div>
);

export default Range;
