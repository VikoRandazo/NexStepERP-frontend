import React, { FC } from 'react';
import styles from './BigCard.module.scss';

interface BigCardProps {}

const BigCard: FC<BigCardProps> = () => (
  <div className={styles.BigCard}>
    BigCard Component
  </div>
);

export default BigCard;
