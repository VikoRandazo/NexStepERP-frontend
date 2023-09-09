import React, { FC } from 'react';
import styles from './Register.module.scss';

interface RegisterProps {}

const Register: FC<RegisterProps> = () => (
  <div className={styles.Register}>
    Register Component
  </div>
);

export default Register;
