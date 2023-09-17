import React, { FC } from "react";
import styles from "./ErrorSpan.module.scss";

interface ErrorSpanProps {
  error: string | undefined;
}

const ErrorSpan: FC<ErrorSpanProps> = ({ error }) => (
  <span className={styles.errorComment}>{error}</span>
);

export default ErrorSpan;
