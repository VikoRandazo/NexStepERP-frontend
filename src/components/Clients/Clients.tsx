import React, { FC } from 'react';
import styles from './Clients.module.scss';

interface ClientsProps {}

const Clients: FC<ClientsProps> = () => (
  <div className={styles.Clients}>
    Clients Component
  </div>
);

export default Clients;
