import React, { FC } from 'react';
import styles from './MidCard.module.scss';

interface MidCardProps {}

const MidCard: FC<MidCardProps> = () => (
  <div className={styles.MidCard}>
    MidCard Component
  </div>
);

export default MidCard;
