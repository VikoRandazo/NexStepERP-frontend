import React, { FC } from 'react';
import styles from './ForgotPassword.module.scss';

interface ForgotPasswordProps {}

const ForgotPassword: FC<ForgotPasswordProps> = () => (
  <div className={styles.ForgotPassword}>
    ForgotPassword Component
  </div>
);

export default ForgotPassword;
