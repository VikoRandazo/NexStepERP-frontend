import React, { FC, useEffect, useRef, useState } from "react";
import styles from "./Select.module.scss";
import Option from "../Option/Option";
import { OptionType } from "../../../models/Elements/Option";
interface SelectProps {
  isActive: boolean;
  options: OptionType[];
}

const Select: FC<SelectProps> = ({ options, isActive }) => {
  const ref = useRef<HTMLUListElement>(null);

  return (
    <ul ref={ref} className={isActive ? `${styles.Select} ${styles.active}` : `${styles.select}`}>
      {options.map((option, key) => {
        return <Option key={key} option={option} isActive={isActive} />;
      })}
    </ul>
  );
};

export default Select;

