import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import styles from "./ClientItem.module.scss";
import { HiChevronRight, HiOutlineBellAlert, HiOutlineCreditCard, HiPencil } from "react-icons/hi2";
import ClientCardOption from "../ClientCardOption/ClientCardOption";
import { ClientOption } from "../../models/ClientOption";
import { CustomerType } from "../../models/CustomerType";
import { useDispatchHook } from "../../hooks/useDispatch";
import { UiActions } from "../../store/slices/ui";
import { EntityEnum } from "../../models/EntityEnum";
import { InteractionsModeEnum } from "../../models/shared/InteractionsMode";
import Form from "../Form/Form";
import Modal from "../Modal/Modal";
import { InputField } from "../Elements/Input/InputField";
import { useSelector } from "react-redux";
import { StoreRootTypes } from "../../store/store";

interface ClientItemProps {
  client: CustomerType;
  fields: InputField[];
  formikBag: any;
  mode: InteractionsModeEnum;
  setSelectedClientId: React.Dispatch<React.SetStateAction<string>>;
}

const ClientItem: FC<ClientItemProps> = ({
  client,
  fields,
  formikBag,
  mode,
  setSelectedClientId,
}) => {
  const { _id, firstName, lastName, email } = client;

  const [isActiveModal, setIsActiveModal] = useState<boolean>(false);

  const { dispatch } = useDispatchHook();

  const clientOptions = useMemo(
    () => [
      { icon: <HiOutlineBellAlert />, text: `Notifications`, action: () => {} },
      { icon: <HiOutlineCreditCard />, text: `Purchase History`, action: () => {} },
    ],
    []
  );

  const openEditClientModal = useCallback(() => {
    setSelectedClientId(client._id ? client._id : "");
    dispatch(UiActions.setMode(InteractionsModeEnum.Edit));
    dispatch(UiActions.setEntity(EntityEnum.Clients));
    setIsActiveModal(true);
  }, [dispatch, setSelectedClientId]);

  return (
    <div className={styles.ClientItem}>
      <Modal
        isActive={isActiveModal}
        setIsActiveModal={setIsActiveModal}
        children={
          <Form
            mode={mode}
            fields={fields}
            formikBag={formikBag}
            setIsActiveModal={setIsActiveModal}
          />
        }
      />
      <div className={styles.clientName}>
        <h4 className={styles.name}>
          {firstName} {lastName}
        </h4>
        <span className={styles.email}>{email}</span>
        <span onClick={openEditClientModal} className={styles.link}>
          <HiPencil /> Edit Client
        </span>
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
