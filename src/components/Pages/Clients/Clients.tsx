import React, { FC, useEffect, useState } from "react";
import styles from "./Clients.module.scss";
import { useClientHook } from "./useClientHook";
import DataControl from "../../DataControl/DataControl";
import Summary from "../../Summary/Summary";
import { CustomerType } from "../../../models/CustomerType";
import { FilterByEnum } from "../../DataControl/TypeGuards";
import ClientItem from "../../ClientItem/ClientItem";
import { useClientsAnalysis } from "./useClientsAnalysis";

interface ClientsProps {}

const Clients: FC<ClientsProps> = () => {
  const { states, setters, formikBag, dataControl, data } = useClientHook();
  const { mode } = states;
  const { setFilteredClients, setSelectedClientId } = setters;
  const { clients, fields, filteredClients } = data;
  const { filterOptions } = dataControl;
  const { analysisData } = useClientsAnalysis(clients);

  return (
    <div className={styles.Clients}>
      <Summary analysisObject={analysisData}/>
      <DataControl
        data={clients}
        filterBy={FilterByEnum.DATE}
        fields={fields}
        formikbagClient={formikBag}
        filterOptions={filterOptions}
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
