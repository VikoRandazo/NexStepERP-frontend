import React, { FC, useEffect, useState } from "react";
import styles from "./ClientItem.module.scss";
import { HiChevronRight, HiOutlineBellAlert, HiOutlineCreditCard } from "react-icons/hi2";
import ClientCardOption from "../ClientCardOption/ClientCardOption";
import { ClientOption } from "../../models/ClientOption";
import { CustomerType } from "../../models/CustomerType";
import { useDispatchHook } from "../../hooks/useDispatch";
import { UiActions } from "../../store/slices/ui";
import { ComponentCaseEnum } from "../../models/ComponentCase";
import { InteractionsModeEnum } from "../../models/shared/InteractionsMode";
import Modal from "../Modal/Modal";
import ClientForm from "../Pages/Clients/ClientForm/ClientForm";

interface ClientItemProps {
  client: CustomerType;
}

const ClientItem: FC<ClientItemProps> = ({ client }) => {
  const { _id, firstName, lastName, email } = client;

  const { dispatch } = useDispatchHook();
  const [isActive, setIsActive] = useState<boolean>(false);
  const clientOptions = [
    { icon: <HiOutlineBellAlert />, text: `Notifications`, action: () => {} },
    { icon: <HiOutlineCreditCard />, text: `Purchase History`, action: () => {} },
  ];

  const openEditClientModal = () => {
    dispatch(UiActions.setIsOpen(true));
    dispatch(UiActions.setModalType(ComponentCaseEnum.Client));
    dispatch(UiActions.setMode(InteractionsModeEnum.Edit));
  };

  return (
    <div className={styles.ClientItem}>
      <Modal children={<ClientForm mode={InteractionsModeEnum.Edit} client={client} />} />
      <div className={styles.clientName}>
        <h4 className={styles.name}>
          {firstName} {lastName}
        </h4>
        <span className={styles.email}>{email}</span>
        <a href="#" onClick={openEditClientModal} className={styles.editClient}>
          Edit Client
        </a>
      </div>

      <div className={styles.clientOptions}>
        {clientOptions.map((option: ClientOption) => {
          return (
            <ClientCardOption
              key={option.text}
              icon={option.icon}
              text={option.text}
              action={option.action}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ClientItem;
