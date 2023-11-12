import React, { FC, useEffect } from "react";
import styles from "./Overview.module.scss";
import StatusCard from "../../Cards/StatusCard/StatusCard";
import CustomCard from "../../Cards/CustomCard/CustomCard";
import MidCard from "../../Cards/MidCard/MidCard";
import instance from "../../../api/axiosInstance";
import { useDispatchHook } from "../../../hooks/useDispatch";
import { entitiesAction } from "../../../store/slices/entities";
import { useSelector } from "react-redux";
import { StoreRootTypes } from "../../../store/store";

interface OverviewProps {}

const Overview: FC<OverviewProps> = () => {
  const {dispatch} = useDispatchHook()
  const clients = useSelector((state:StoreRootTypes) => state.entities.clients)
  const products = useSelector((state:StoreRootTypes) => state.entities.stock)

  const getClients = async () => {
    try {
        const response = await instance.get(`/clients/all`)
        console.log(response.data);

        dispatch(entitiesAction.setClients(response.data))
    } catch (error) {
      console.log(error);
    }
  }
  const getProducts = async () => {
    try {
        const response = await instance.get(`/products/all`)
        console.log(response.data);
        dispatch(entitiesAction.setStock(response.data))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (clients.length === 0 ) {
        getClients()
    } 
    if (products.length === 0) {
      getProducts()
    }
  },[])

  return (
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
      <div className={styles.rating}>
        <MidCard />
        <MidCard />
        <MidCard />
      </div>
    </div>
  );
};

export default Overview;
