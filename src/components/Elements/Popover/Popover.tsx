import React, { FC, ReactElement, useEffect } from 'react';
import styles from './Popover.module.scss';
import { PopoverTitleEnum } from './PopoverTitleEnum';

interface PopoverProps {
  children: ReactElement
  title: PopoverTitleEnum
}

const Popover: FC<PopoverProps> = ({children, title}) => {

  useEffect(() => {
  },[])
  return (
    <div className={styles.Popover}>
      <div className={styles.title}>
        {title}
      </div>
      <hr />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default Popover;
