import React, { FC, useEffect } from "react";
import styles from "./Select.module.scss";
import Option from "../Option/Option";
import { HiAdjustmentsHorizontal, HiChevronDown } from "react-icons/hi2";
import { OptionType } from "../../../models/Elements/Option";

type SelectProps = {
  name: string;
  isOpen: boolean;
  isSelected: string;
  setIsSelected?: React.Dispatch<React.SetStateAction<string>>;
  options: OptionType[];
  placeholder?: string;
  event: (e: React.MouseEvent<HTMLLIElement>) => void;
};

const Select: FC<SelectProps> = (props) => {
  const { name, isOpen, isSelected, setIsSelected, placeholder, event, options } = props;

  const handleOnChange = (e: React.MouseEvent<HTMLLIElement>) => {
    event(e);
  };


  return (
    <div className={styles.selectContainer}>
      <span
        className={
          props.isOpen
            ? `${styles.dropDown} ${styles.active}`
            : styles.dropDown
        }
      >
        <HiAdjustmentsHorizontal />
        {isSelected !== `None`
          ? isSelected
          : `${placeholder} `}{" "}
        <HiChevronDown />
      </span>

      <ul className={isOpen ? `${styles.Select} ${styles.active}` : `${styles.select}`}>
        {options.map((option, i) => {
          return (
            <Option
              key={`${i}${name}`}
              option={option}
              isActive={props.isOpen}
              onChange={handleOnChange}
              setSelected={setIsSelected}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Select;
