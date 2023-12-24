import React, { FC } from 'react';
import styles from './StatusCard.module.scss';
import { HiSquare3Stack3D } from 'react-icons/hi2';
import { AnalysisObject } from '../../../models/shared/AnalysisObject';

interface StatusCardProps {
  data: AnalysisObject
}

const StatusCard: FC<StatusCardProps> = ({data}) => {

  const {title, value} = data
  return (
    <div className={styles.StatusCard}>
      <div className={styles.header}>
        <div className={styles.categoryIcon}>
          <HiSquare3Stack3D />
        </div>
        <div className={styles.category}>
          <h3>{title}</h3>
          <span className={styles.description}>21% more than last week</span>
        </div>
      </div>
      <div className={styles.main}></div>
      <div className={styles.footer}><h3>{value}</h3></div>
    </div>
  );
};

export default StatusCard;
