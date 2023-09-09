import React, { FC } from "react";
import styles from "./Overview.module.scss";
import StatusCard from "../../Cards/StatusCard/StatusCard";
import CustomCard from "../../Cards/CustomCard/CustomCard";

interface OverviewProps {}

const Overview: FC<OverviewProps> = () => (
  <div className={styles.Overview}>
    <div className={styles.statusUpdates}>
      <StatusCard />
      <StatusCard />
      <StatusCard />
      <StatusCard />
      <StatusCard />
    </div>

    <div className={styles.graphs}>
      <CustomCard width={`75%`} />
      <CustomCard width={`25%`} />
    </div>
    <div className={styles.rating}></div>
  </div>
);

export default Overview;
