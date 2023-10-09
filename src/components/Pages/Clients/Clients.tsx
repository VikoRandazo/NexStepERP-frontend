import React, { FC } from "react";
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

interface ClientsProps {}

const Clients: FC<ClientsProps> = () => {
  const { states, setters, functions, enums, formikBag } = useClientHook();
  const { field } = states;

  const { values, handleChange, handleBlur } = formikBag;

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
      <DataControl data={[]} filterBy={FilterByEnum.DATE} periodMonths={4}/>
      <Table<Partial<CustomerType>>
        data={[]}
        selectedRows={[]}
        hasActionsColumn={false}
        deleteItem={() => {}}
      />
    </div>
  );
};

export default Clients;
