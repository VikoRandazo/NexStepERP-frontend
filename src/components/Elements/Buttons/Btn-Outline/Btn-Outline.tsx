import React, { FC, ReactElement } from 'react';
import styles from './Btn-Outline.module.scss';

interface BtnOutlineProps {
  icon?: ReactElement;
  text: string;
  action: () => void;

}

const BtnOutline: FC<BtnOutlineProps> = ({icon, text, action}) => (
  <button className={styles.BtnOutline} onClick={action}>
      <span className={styles.icon}>{icon}</span>
      <span className={styles.text}>{text}</span>
    </button>  
);

export default BtnOutline;
