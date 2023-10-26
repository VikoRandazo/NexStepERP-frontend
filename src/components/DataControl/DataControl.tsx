import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./DataControl.module.scss";
import { isMoneySpentFilter, isDateFilter, FilterByEnum, FilterByProps } from "./TypeGuards";
import { date } from "yup";
import Select from "../Elements/Select/Select";
import { useSelect } from "../Elements/Select/SelectFunctionality";
import { useDataControlHook } from "./useDataControlHook";
import { OptionType } from "../../models/Elements/Option";
import Input from "../Elements/Input/Input";
import { InputField } from "../Elements/Input/InputField";
import { useFormik } from "formik";
import BtnPrimary from "../Elements/Buttons/Btn-Primary/Btn-Primary";
import { useSelector } from "react-redux";
import { StoreRootTypes } from "../../store/store";
import Modal from "../Modal/Modal";
import ClientForm from "../Pages/Clients/ClientForm/ClientForm";
import { useDispatchHook } from "../../hooks/useDispatch";
import { UiActions } from "../../store/slices/ui";
import { BtnActionsTextEnum } from "../Elements/Buttons/BtnActionsText";
import { HiSparkles } from "react-icons/hi2";
import { ComponentCaseEnum } from "../../models/ComponentCase";
import { InteractionsModeEnum } from "../../models/shared/InteractionsMode";

export type DataControlProps =
  | { data: []; filterBy: `Date`; periodMonths: number; filterOptions: OptionType[] }
  | { data: []; filterBy: `moneySpent`; amount: number; filterOptions: OptionType[] };

const DataControl: FC<DataControlProps> = (props: DataControlProps) => {
  const { dispatch } = useDispatchHook();

  const [isOpenSelect, setIsOpenSelect] = useState(false);
  const [filterBy, setFilterBy] = useState<FilterByEnum>(FilterByEnum.NONE);
  const { handleOpenSelectMenu } = useSelect(isOpenSelect, setIsOpenSelect);
  const { states, formikBag } = useDataControlHook(props.data);
  const { handleChange, values } = formikBag;

  const currentPage = useSelector((state: StoreRootTypes) => state.appSettings.pageName);

  const search: InputField = { key: "search", type: "text", title: "search", group: 1 };
  const date: InputField = { key: "date", type: "date", title: "date", group: 1 };
  const fieldMin: InputField = { key: "min", type: "number", title: "min", group: 1 };
  const fieldMax: InputField = { key: "max", type: "number", title: "max", group: 1 };

  const renderFilterInputs = () => {
    switch (filterBy) {
      case FilterByEnum.DATE:
        return (
          <div className={styles.fieldsContainer}>
            <Input field={date} value={values.date} onChange={handleChange} />
          </div>
        );
      case FilterByEnum.MOENY_SPENT:
        return (
          <div className={styles.fieldsContainer}>
            <Input field={fieldMin} value={values.min} onChange={handleChange} />
            <p>to</p>
            <Input field={fieldMax} value={values.max} onChange={handleChange} />
          </div>
        );

      default:
        return null;
    }
  };

  const getOptionEvent = (e: React.MouseEvent<HTMLLIElement>) => {
    const { innerText } = e.currentTarget;
    setFilterBy(innerText as FilterByEnum);
  };

  const handleOpenModal = () => {
    dispatch(UiActions.setIsOpen(true));
    dispatch(UiActions.setModalType(ComponentCaseEnum.Client));
    dispatch(UiActions.setMode(InteractionsModeEnum.Create));
  };

  return (
    <div className={styles.DataControl}>
      <Modal children={<ClientForm mode={InteractionsModeEnum.Create} />} />
      <div className={styles.container}>
        <div className={styles.search}>
          <Input
            field={search}
            value={values.search}
            onChange={handleChange}
            placeholder={"Search Anything"}
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
              options={props.filterOptions}
            />

            <div
              className={
                filterBy !== FilterByEnum.NONE ? `${styles.fields} ${styles.active}` : styles.fields
              }
            ></div>
          </span>
          <div className={styles.renderedFields}>{renderFilterInputs()}</div>
        </div>
        <div className={styles.createEntity}>
          <BtnPrimary
            icon={<HiSparkles />}
            text={BtnActionsTextEnum.CREATE_DOCUMENT}
            action={handleOpenModal}
          />
        </div>
      </div>
    </div>
  );
};

export default DataControl;
