import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import styles from "./DataControl.module.scss";
import { FilterByEnum } from "./TypeGuards";
import Select from "../Elements/Select/Select";
import { useSelect } from "../Elements/Select/SelectFunctionality";
import { useDataControlHook } from "./useDataControlHook";
import { OptionType } from "../../models/Elements/Option";
import Input from "../Elements/Input/Input";
import { InputField } from "../Elements/Input/InputField";
import BtnPrimary from "../Elements/Buttons/Btn-Primary/Btn-Primary";
import Modal from "../Modal/Modal";
import { useDispatchHook } from "../../hooks/useDispatch";
import { BtnActionsTextEnum } from "../Elements/Buttons/BtnActionsText";
import { HiShoppingBag, HiSparkles } from "react-icons/hi2";
import { EntityEnum } from "../../models/EntityEnum";
import Form from "../Form/Form";
import { ModalTitleEnum } from "../../models/ModalTitleEnum";
import { ModalDescriptionEnum } from "../../models/ModalDescriptionEnum";
import BtnSecondary from "../Elements/Buttons/Btn-Secondary/Btn-Secondary";
import { StoreRootTypes } from "../../store/store";
import { useSelector } from "react-redux";
export interface DataControlProps<T> {
  data: T[];
  filterBy?: `Date`;
  filterOptions: OptionType[];
  fields: InputField[];
  formikbagClient: any;
}

const DataControl = <T,>({
  data,
  filterOptions,
  fields,
  formikbagClient,
}: DataControlProps<T>) => {
  const { dispatch } = useDispatchHook();

  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [filterBy, setFilterBy] = useState<FilterByEnum>(FilterByEnum.NONE);
  const [modalHeader, setModalHeader] = useState<{
    title: ModalTitleEnum;
    description: ModalDescriptionEnum;
  } | null>();

  const { handleOpenSelectMenu } = useSelect(isOpenSelect, setIsOpenSelect);
  const {
    states,
    setters,
    formikBag,
    handlers,
    data: filteredData,
  } = useDataControlHook(data as any);
  const { handleSearch } = filteredData;
  const { isActiveCreateModal, entity, isActiveNewOrderModal, newOrderFields } = states;
  const { setIsActiveCreateModal, setIsActiveNewOrderModal } = setters;
  const { handleOpenCreateModal, handleOpenNewOrderModal } = handlers;
  const search: InputField = { key: "search", type: "text", title: "search", group: 1 };

  
  const [isActiveSelectClient, setIsActiveSelectClient] = useState<boolean>(false)
  const clients = useSelector((state:StoreRootTypes) => state.entities.clients)

  const changeModalHeaderByEntity = () => {
    switch (entity) {
      case EntityEnum.Clients:
        setModalHeader({
          title: ModalTitleEnum.CREATE_CLIENT,
          description: ModalDescriptionEnum.CREATE_CLIENT,
        });
        break;

      case EntityEnum.STOCK:
        setModalHeader({
          title: ModalTitleEnum.CREATE_PRODUCT,
          description: ModalDescriptionEnum.CREATE_PRODUCT,
        });
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    changeModalHeaderByEntity();
  }, [entity]);

  return (
    <div className={styles.DataControl}>
      <Modal
        setIsActiveModal={setIsActiveCreateModal}
        isActive={isActiveCreateModal}
        title={modalHeader?.title}
        description={modalHeader?.description}
        children={
          <Form
            fields={fields}
            formikBag={formikbagClient}
            setIsActiveModal={setIsActiveCreateModal}
          />
        }
      />
      
      <div className={styles.container}>
        <div className={styles.search}>
          <Input
            field={search}
            value={formikBag.values.search}
            onChange={handleSearch}
            placeholder={"Search Anything"}
            autoComplete={"false"}
          />
        </div>
        <div className={styles.filter}>
          <span
            className={
              filterBy === FilterByEnum.NONE
                ? styles.selectContainer
                : `${styles.selectContainer} ${styles.active}`
            }
            onClick={handleOpenSelectMenu}
          >
            <div
              className={
                filterBy !== FilterByEnum.NONE ? `${styles.fields} ${styles.active}` : styles.fields
              }
            ></div>
          </span>
        </div>
        <div className={styles.createEntity}>
          <BtnPrimary
            icon={<HiSparkles />}
            text={`${BtnActionsTextEnum.CREATE} ${entity}`}
            action={handleOpenCreateModal}
          />
        </div>
      </div>
    </div>
  );
};

export default DataControl;
