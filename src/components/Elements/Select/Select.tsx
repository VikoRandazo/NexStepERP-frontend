import React, { FC, useEffect } from "react";
import styles from "./Select.module.scss";
import Option from "../Option/Option";
import {
  HiXMark,
} from "react-icons/hi2";
import { OptionType } from "../../../models/Elements/Option";

type SelectProps = {
  name: string;
  isOpen: boolean;
  isSelected: OptionType;
  setIsSelected: React.Dispatch<React.SetStateAction<OptionType>>;
  options: OptionType[];
  placeholder: string;
  event: (e: React.MouseEvent<HTMLLIElement>) => void;
};

export const initSelectState = { id: 0, value: "", icon: <></> };

const Select: FC<SelectProps> = (props) => {
  const { name, isOpen, isSelected, setIsSelected, placeholder, event, options } = props;

  const initState: OptionType = { id: 0, value: placeholder };

  const handleClearSelection = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    setIsSelected(initState);
  };

  useEffect(() => {
    setIsSelected({ id: 0, value: placeholder });
  }, []);
  return (
    <div className={styles.Select}>
      <div className={styles.container}>
        <div className={styles.selection}>
          <span className={styles.icon}>{isSelected.icon ? isSelected.icon : null}</span>
          <span className={styles.value}>{isSelected.value}</span>
          {isSelected.value ? (
            <span className={styles.clearSelection} onClick={handleClearSelection}>
              <HiXMark />
            </span>
          ) : (
            <></>
          )}
        </div>
        {isOpen && (
          <div className={isOpen ? `${styles.options} ${styles.isOpen}` : styles.options}>
            {options.map((option: OptionType, i) => (
              <Option
                key={option.id}
                option={option}
                isSelected={isSelected}
                setIsSelected={setIsSelected}
                event={event}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
