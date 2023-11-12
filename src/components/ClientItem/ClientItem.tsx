import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import styles from "./ClientItem.module.scss";
import {
  HiChevronRight,
  HiOutlineBellAlert,
  HiOutlineCreditCard,
  HiPencil,
  HiPlus,
} from "react-icons/hi2";
import { CustomerType } from "../../models/CustomerType";
import { useDispatchHook } from "../../hooks/useDispatch";
import { UiActions } from "../../store/slices/ui";
import { EntityEnum } from "../../models/EntityEnum";
import { InteractionsModeEnum } from "../../models/shared/InteractionsMode";
import Form from "../Form/Form";
import Modal from "../Modal/Modal";
import { InputField } from "../Elements/Input/InputField";
import { ModalTitleEnum } from "../../models/ModalTitleEnum";
import { ModalDescriptionEnum } from "../../models/ModalDescriptionEnum";
import ClientPurchases from "./ClientPurchases/ClientPurchases";
import { ProductSoldInit } from "../../models/ProductSoldType";
import ItemOption from "../ClientCardOption/ItemOption";
import { ItemOptionType } from "../../models/ClientOption";

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
  const { _id = null, firstName, lastName, email, purchaseHistory } = client;

  const [isActiveModal_PurchaseHistory, setIsActiveModal_PurchaseHistory] =
    useState<boolean>(false);
  const [isActiveModal_EditClient, setIsActiveModal_EditClient] = useState<boolean>(false);
  const [displayInputUrl, setDisplayInputUrl] = useState<boolean>(false);

  const { dispatch } = useDispatchHook();

  const openPurchaseHistory = () => {
    setIsActiveModal_PurchaseHistory(true);
  };

  const clientOptions = useMemo(
    () => [
      { icon: <HiOutlineBellAlert />, text: `Notifications`, action: () => {} },
      { icon: <HiOutlineCreditCard />, text: `Purchase History`, action: openPurchaseHistory },
    ],
    []
  );
  console.log(purchaseHistory);

  const openEditClientModal = useCallback(() => {
    setSelectedClientId(client._id ? client._id : "");
    dispatch(UiActions.setMode(InteractionsModeEnum.Edit));
    dispatch(UiActions.setEntity(EntityEnum.Clients));
    setIsActiveModal_EditClient(true);
  }, [dispatch, setSelectedClientId]);

  const getCheckboxEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayInputUrl(e.currentTarget.checked);
  };
  return (
    <div className={styles.ClientItem}>
      <Modal
        isActive={isActiveModal_EditClient}
        setIsActiveModal={setIsActiveModal_EditClient}
        children={
          <Form
            fields={fields}
            formikBag={formikBag}
            setIsActiveModal={setIsActiveModal_EditClient}
          />
        }
        title={ModalTitleEnum.EDIT_CLIENT}
        description={ModalDescriptionEnum.EDIT_CLIENT}
      />

      <Modal
        children={
          <ClientPurchases
            productsSold={[ProductSoldInit]}
            purchaseHistory={purchaseHistory}
            clientId={_id}
          />
        }
        isActive={isActiveModal_PurchaseHistory}
        setIsActiveModal={setIsActiveModal_PurchaseHistory}
        title={ModalTitleEnum.VIEW_PURCHASE_HISTORY}
        description={ModalDescriptionEnum.VIEW_PURCHASE_HISTORY}
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
        {clientOptions.map((option: ItemOptionType) => {
          return (
            <ItemOption
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
