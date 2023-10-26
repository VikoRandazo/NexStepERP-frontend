import React, { FC, useEffect, useState } from "react";
import styles from "./Select.module.scss";
import Option from "../Option/Option";
import { OptionType } from "../../../models/Elements/Option";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
interface SelectProps {
  isActive: boolean;
  options: OptionType[];
  onChangeAction?: (...props: any) => void;
  optionEvent?: (e: React.MouseEvent<HTMLLIElement>) => void | null;
}

const Select: FC<SelectProps> = ({ options, isActive, onChangeAction, optionEvent }) => {
  const [selected, setSelected] = useState<string>(`None`);

  return (
    <div className={styles.selectContainer}>
      <span
        className={
          selected !== `None` ? `${styles.filterLable} ${styles.active}` : styles.filterLable
        }
      >
        <HiAdjustmentsHorizontal /> {selected !== `None` ? selected : null}
      </span>

      <ul className={isActive ? `${styles.Select} ${styles.active}` : `${styles.select}`}>
        {options.map((option, key) => {
          return (
            <Option
              key={key}
              option={option}
              isActive={isActive}
              setSelected={setSelected}
              optionEvent={optionEvent}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Select;
