import React, { FC, useEffect, useState } from "react";
import styles from "./Select.module.scss";
import Option from "../Option/Option";
import { OptionType } from "../../../models/Elements/Option";
import { HiAdjustmentsHorizontal, HiChevronDown } from "react-icons/hi2";
interface SelectProps {
  isActive: boolean;
  options: OptionType[];
  placeholder: string;
  name: string;
  onChangeAction?: (...props: any) => void;
  optionEvent?: (e: React.MouseEvent<HTMLLIElement>) => string | null;
  setFieldValue?: (field: string, value: any, shouldValidate?: boolean) => void;
}

const Select: FC<SelectProps> = ({
  options,
  isActive,
  placeholder,
  name,
  onChangeAction,
  optionEvent,
  setFieldValue
}) => {
  const [selected, setSelected] = useState<string>(`None`);

  return (
    <div className={styles.selectContainer}>
      <span
        className={
          selected !== `None` || isActive
            ? `${styles.filterLable} ${styles.active}`
            : styles.filterLable
        }
      >
        <HiAdjustmentsHorizontal />
        {selected !== `None` ? selected : `${placeholder} `} <HiChevronDown />
      </span>

      <ul className={isActive ? `${styles.Select} ${styles.active}` : `${styles.select}`}>
        {options.map((option, key) => {

          return (
            <Option
              key={key}
              name={name}
              option={option}
              isActive={isActive}
              setSelected={setSelected}
              optionEvent={optionEvent}
              setFieldValue={setFieldValue!}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Select;
