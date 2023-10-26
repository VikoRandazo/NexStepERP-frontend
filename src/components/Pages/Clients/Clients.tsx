import React, { FC, useEffect, useMemo, useState } from "react";
import styles from "./Clients.module.scss";
import Input from "../../Elements/Input/Input";
import { useClientHook } from "./useClientHook";
import BtnPrimary from "../../Elements/Buttons/Btn-Primary/Btn-Primary";
import { BtnActionsTextEnum } from "../../Elements/Buttons/BtnActionsText";
import DataControl from "../../DataControl/DataControl";
import Summary from "../../Summary/Summary";
import Table from "../../Table/Table";
import { CustomerType } from "../../../models/CustomerType";
import { useSummaryHook } from "../../Summary/UseSummaryHook";
import { FilterByEnum } from "../../DataControl/TypeGuards";
import ClientItem from "../../ClientItem/ClientItem";
import { HiOutlineBellAlert, HiOutlineCreditCard } from "react-icons/hi2";

interface ClientsProps {}

const Clients: FC<ClientsProps> = () => {
  const { states, setters, functions, enums, formikBag, dataControl, data } = useClientHook();
  const { field } = states;
  const { clients } = data;
  const { values, handleChange, handleBlur } = formikBag;
  const { filterOptions } = dataControl;

  const summary = {
    keys: {
      totalClients: `Total Clients`,
      newClientsThisMonth: `New Clients This Month`,
      unActiveClientsThisMonth: `Unactive Clients This Month`,
    },
    values: {
      totalClients: 36,
      newClientsThisMonth: 3,
      unActiveClientsThisMonth: 1,
    },
  };



  return (
    <div className={styles.Clients}>
      <Summary summaryObject={summary} />
      <DataControl
        data={[]}
        filterBy={FilterByEnum.DATE}
        periodMonths={4}
        filterOptions={filterOptions}
      />
      <div className={styles.displayClients}>
        {clients.map((client:CustomerType) => <ClientItem client={client} />
        )}
      </div>
    </div>
  );
};

export default Clients;
