import React, { FC, useEffect } from "react";
import styles from "./Overview.module.scss";
import StatusCard from "../../Cards/StatusCard/StatusCard";
import CustomCard from "../../Cards/CustomCard/CustomCard";
import MidCard from "../../Cards/MidCard/MidCard";
import { useDispatchHook } from "../../../hooks/useDispatch";
import { useSelector } from "react-redux";
import { StoreRootTypes } from "../../../store/store";
import { useOverView } from "./useOverView";

interface OverviewProps {}

const Overview: FC<OverviewProps> = () => {
  const { dispatch } = useDispatchHook();
  const { analysis } = useOverView();

  const { totalSales } = analysis;

  return (
    <div className={styles.Overview}>
      <div className={styles.statusUpdates}>
        <StatusCard data={totalSales} />
      </div>

      <div className={styles.graphs}>
        <CustomCard width={`75%`} />
        <CustomCard width={`25%`} />
      </div>
      <div className={styles.rating}>
        <MidCard />
        <MidCard />
        <MidCard />
      </div>
    </div>
  );
};

export default Overview;
