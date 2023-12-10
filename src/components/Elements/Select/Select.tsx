import React, { FC, useEffect, useState } from "react";
import styles from "./Select.module.scss";
import Option from "../Option/Option";
import { OptionType } from "../../../models/Elements/Option";
import { HiAdjustmentsHorizontal, HiChevronDown } from "react-icons/hi2";
import { SelectPlaceHolderEnum } from "../../../models/SelectPlaceHolderEnum.";
interface SelectProps {
  name: string;
  isOpen: boolean;
  isSelected: string;
  setIsSelected: React.Dispatch<React.SetStateAction<string>>;
  options: OptionType[];
  value?: string;
  placeholder?: SelectPlaceHolderEnum;
  onChange: (e: React.MouseEvent<HTMLLIElement>) => void;
}

const Select: FC<SelectProps> = ({
  options,
  isOpen,
  isSelected,
  setIsSelected,
  placeholder,
  onChange,
}) => {
  
  const handleOnChange = (e: React.MouseEvent<HTMLLIElement>) => {
    onChange(e);
    
  };

  return (
    <div className={styles.selectContainer}>
      <span
        className={
          isSelected !== `None` || isOpen
            ? `${styles.dropDown} ${styles.active}`
            : styles.dropDown
        }
      >
        <HiAdjustmentsHorizontal />
        {isSelected !== `None` ? isSelected : `${placeholder} `} <HiChevronDown />
      </span>

      <ul className={isOpen ? `${styles.Select} ${styles.active}` : `${styles.select}`}>
        {options.map((option, key) => {
          return (
            <Option
              key={key}
              option={option}
              isActive={isOpen}
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
