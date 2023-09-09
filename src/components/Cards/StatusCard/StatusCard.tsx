import React, { FC } from 'react';
import styles from './StatusCard.module.scss';
import { HiSquare3Stack3D } from 'react-icons/hi2';

interface StatusCardProps {}

const StatusCard: FC<StatusCardProps> = () => (
  <div className={styles.StatusCard}>
    <div className={styles.header}>
      <div className={styles.categoryIcon}>
        <HiSquare3Stack3D />
      </div>
      <div className={styles.category}>
        <h3>Stock</h3>
        <span className={styles.description}>21% more than last week</span>
      </div>
    </div>
    <div className={styles.main}></div>
    <div className={styles.footer}><h3>21 Remains</h3></div>
  </div>
);

export default StatusCard;
