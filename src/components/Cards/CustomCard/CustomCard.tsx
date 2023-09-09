import React, { FC } from "react";
import styles from "./CustomCard.module.scss";

interface CustomCardProps {
  width: string;
}

const CustomCard: FC<CustomCardProps> = ({ width }) => (
  <div className={styles.CustomCard} style={{ width: width }}>
    CustomCard Component
  </div>
);

export default CustomCard;
