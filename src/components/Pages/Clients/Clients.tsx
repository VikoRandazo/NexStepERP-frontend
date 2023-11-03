import React, { FC, useEffect, useState } from "react";
import styles from "./Clients.module.scss";
import { useClientHook } from "./useClientHook";
import DataControl from "../../DataControl/DataControl";
import Summary from "../../Summary/Summary";
import { CustomerType } from "../../../models/CustomerType";
import { FilterByEnum } from "../../DataControl/TypeGuards";
import ClientItem from "../../ClientItem/ClientItem";

interface ClientsProps {}

const Clients: FC<ClientsProps> = () => {
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const { states, setters, functions, enums, formikBag, dataControl, data } =
    useClientHook(selectedClientId);
  const { mode } = states;
  const {setFilteredClients} = setters
  const { clients, fields, filteredClients } = data;
  const { filterOptions } = dataControl;

  const summary = {
    keys: {
      totalClients: `Total Clients`,
      newClientsThisMonth: `New Clients This Month`,
      unActiveClientsThisMonth: `Unactive Clients This Month`,
    },
    values: {
      totalClients: clients.length,
      newClientsThisMonth: 3,
      unActiveClientsThisMonth: 1,
    },
  };

  return (
    <div className={styles.Clients}>
      <Summary summaryObject={summary} />
      <DataControl
        data={clients}
        filterBy={FilterByEnum.DATE}
        periodMonths={4}
        filterOptions={filterOptions}
        handleSubmit={formikBag.handleSubmit}
        setFilteredData={setFilteredClients}
      />

      <div className={styles.displayClients}>
        {filteredClients.map((client: CustomerType) => (
          <ClientItem
            client={client}
            fields={fields}
            formikBag={formikBag}
            mode={mode}
            setSelectedClientId={setSelectedClientId}
          />
        ))}
      </div>
    </div>
  );
};

export default Clients;
