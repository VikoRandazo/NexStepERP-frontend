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
import { useSelector } from "react-redux";
import { StoreRootTypes } from "../../store/store";
import Modal from "../Modal/Modal";
import { useDispatchHook } from "../../hooks/useDispatch";
import { UiActions } from "../../store/slices/ui";
import { BtnActionsTextEnum } from "../Elements/Buttons/BtnActionsText";
import { HiSparkles } from "react-icons/hi2";
import { EntityEnum } from "../../models/EntityEnum";
import { InteractionsModeEnum } from "../../models/shared/InteractionsMode";
import Form from "../Form/Form";
import { CustomerType } from "../../models/CustomerType";

export interface DataControlProps<T> {
  data: T[];
  filterBy: `Date`;
  periodMonths: number;
  filterOptions: OptionType[];
  fields: InputField[];
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  setFilteredData: React.Dispatch<React.SetStateAction<CustomerType[]>>;
}

const DataControl = <T,>({
  data,
  periodMonths,
  filterOptions,
  fields,
  handleSubmit,
  setFilteredData,
}: DataControlProps<T>) => {
  const { dispatch } = useDispatchHook();

  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [filterBy, setFilterBy] = useState<FilterByEnum>(FilterByEnum.NONE);
  const [entity, setEntity] = useState<EntityEnum>(EntityEnum.Clients);

  const currentPage = useSelector((state: StoreRootTypes) => state.appSettings.pageName);

  const { handleOpenSelectMenu } = useSelect(isOpenSelect, setIsOpenSelect);
  const {
    states,
    setters,
    formikBag,
    data: filteredData,
  } = useDataControlHook(data as any, setFilteredData);
  const { handleSearch } = filteredData;
  const { isActiveModal } = states;
  const { setIsActiveModal } = setters;
  const search: InputField = { key: "search", type: "text", title: "search", group: 1 };

  const getOptionEvent = (e: React.MouseEvent<HTMLLIElement>) => {
    const { innerText } = e.currentTarget;
    setFilterBy(innerText as FilterByEnum);
    return innerText;
  };

  const handleOpenModal = useCallback(() => {
    setIsActiveModal(true);
    dispatch(UiActions.setEntity(entity));
    dispatch(UiActions.setMode(InteractionsModeEnum.Create));
  }, [dispatch, entity]);

  const assignEntity = () => {
    switch (currentPage) {
      case EntityEnum.Clients:
        setEntity(currentPage);
        break;
      case EntityEnum.Products:
        setEntity(currentPage);
        break;
      case EntityEnum.Sales:
        setEntity(currentPage);
        break;

      default:
        break;
    }
  };
  useEffect(() => {
    assignEntity();
  }, []);

  return (
    <div className={styles.DataControl}>
      <Modal
        setIsActiveModal={setIsActiveModal}
        isActive={isActiveModal}
        children={
          <Form
            mode={InteractionsModeEnum.Create}
            fields={fields}
            formikBag={formikBag}
            setIsActiveModal={setIsActiveModal}
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
            <Select
              optionEvent={getOptionEvent}
              isActive={isOpenSelect}
              name={"filterOptions"}
              options={filterOptions}
              placeholder="Filter by"
            />

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
            action={handleOpenModal}
          />
        </div>
      </div>
    </div>
  );
};

export default DataControl;
