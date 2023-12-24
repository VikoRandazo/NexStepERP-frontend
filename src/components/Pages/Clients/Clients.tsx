import React, { FC, useEffect, useState } from "react";
import styles from "./Clients.module.scss";
import { useClientHook } from "./useClientHook";
import DataControl from "../../DataControl/DataControl";
import Summary from "../../Summary/Summary";
import { CustomerType } from "../../../models/CustomerType";
import ClientItem from "../../ClientItem/ClientItem";
import { useClientsAnalysis } from "./useClientsAnalysis";

interface ClientsProps {}

const Clients: FC<ClientsProps> = () => {
  const { states, setters, formikBag, dataControl, data } = useClientHook();
  const { mode } = states;
  const { setSelectedClientId } = setters;
  const { clients, fields } = data;
  // const {} = dataControl;
  const { analysisData } = useClientsAnalysis(clients);

  return (
    <div className={styles.Clients}>
      <Summary analysisObject={analysisData}/>
       <DataControl
        data={clients}
        formikbag={formikBag}
        filterFields={[]} filterFunctions={{ "": () => { return []; } }} initStateFormik={{}}      />

      <div className={styles.displayClients}>
        {clients.map((client: CustomerType) => (
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
