import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./DataControl.module.scss";
import { isMoneySpentFilter, isDateFilter, FilterByEnum, FilterByProps } from "./TypeGuards";
import { date } from "yup";
import Select from "../Elements/Select/Select";
import { useSelect } from "../Elements/Select/SelectFunctionality";

export type DataControlProps =
  | { data: []; filterBy: `Date`; periodMonths: number }
  | { data: []; filterBy: `moneySpent`; amount: number };

const DataControl: FC<DataControlProps> = (props: DataControlProps) => {
  const [filterBy, setFilterBy] = useState<FilterByProps>(FilterByEnum.NONE);
  const [isOpenSelect, setIsOpenSelect] = useState(false);

  const filterDate = (data: [], periodMonths: number) => {
    const currentDate = new Date().getTime();
    const minDate = currentDate - periodMonths;
    return data.filter((itemDate) => itemDate > minDate);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;
    setFilterBy(value as FilterByEnum);
  };

  const renderFilterInputs = () => {
    switch (filterBy) {
      case FilterByEnum.DATE:
        return <input type="date" />;
      case FilterByEnum.MOENY_SPENT:
        return (
          <div className={styles.minMaxContainer}>
            <input type="number" placeholder="min $" name={"minAmount"} />
            <input type="number" placeholder="max $" name={"maxAmount"} />
          </div>
        );

      default:
        return null;
    }
  };

  const filterOptions = [
    { name: FilterByEnum.NONE, icon: null, action: () => {} },
    { name: FilterByEnum.DATE, icon: null, action: () => {} },
    { name: FilterByEnum.MOENY_SPENT, icon: null, action: () => {} },
  ];

  const { handleOpenSelectMenu } = useSelect(isOpenSelect, setIsOpenSelect);

  return (
    <div className={styles.DataControl}>
      <div className={styles.filter}>
        <h6>Filter by:</h6>
        <div className={styles.selectContainer}>
          <span className={styles.selectClass} onClick={handleOpenSelectMenu}>
            <Select isActive={isOpenSelect} options={filterOptions} />
          </span>
        </div>
        <select onChange={handleSelectChange}>
          <option value={""} selected>
            none
          </option>
          <option value={FilterByEnum.MOENY_SPENT}> Max Spent</option>
          <option value={FilterByEnum.DATE}> Date</option>
        </select>
        {renderFilterInputs()}
      </div>
      <div className={styles.search}>
        <input type="text" placeholder="Search" />
      </div>
    </div>
  );
};

export default DataControl;
