import React, { FC, useCallback, useEffect, useState } from "react";
import styles from "./Clients.module.scss";
import { useClientHook } from "./useClientHook";
import DataControl from "../../DataControl/DataControl";
import Summary from "../../Summary/Summary";
import { CustomerType } from "../../../models/CustomerType";
import { FilterByEnum } from "../../DataControl/TypeGuards";
import ClientItem from "../../ClientItem/ClientItem";
import { useClientsAnalysis } from "./useClientsAnalysis";
import Modal from "../../Modal/Modal";
import { useSelector } from "react-redux";
import { StoreRootTypes } from "../../../store/store";
import Form from "../../Form/Form";
import { EntityEnum } from "../../../models/EntityEnum";
import { InteractionsModeEnum } from "../../../models/shared/InteractionsMode";
import { UiActions } from "../../../store/slices/ui";
import { useDispatchHook } from "../../../hooks/useDispatch";

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
      <Summary analysisObject={analysisData} />
      <DataControl
        data={clients}
        filterBy={FilterByEnum.DATE}
        periodMonths={4}
        fields={fields}
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
