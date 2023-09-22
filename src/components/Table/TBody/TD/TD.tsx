import React, { FC, ReactNode } from 'react';
import styles from './TD.module.scss';

interface TdProps<T> {
  value?:T
  children?: ReactNode
}

const Td = <T extends ReactNode>({value, children}:TdProps<T>) => (
  <td className={styles.Td}>
    <div className={styles.container}>
     {children ? children : value} 
    </div>
  </td>
);

export default Td;
