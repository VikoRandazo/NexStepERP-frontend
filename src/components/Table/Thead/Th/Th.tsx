import React, { FC } from 'react';
import styles from './Th.module.scss';
import { TableColumn } from '../../TableColumn';

interface ThProps {
  column:string
}

const Th: FC<ThProps> = ({column}) => (
  <th className={styles.Th}>
    {column}
  </th>
);

export default Th;
