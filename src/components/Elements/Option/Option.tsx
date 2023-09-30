import React, { FC } from "react";
import styles from "./Option.module.scss";
import { OptionType } from "../../../models/Elements/Option";

interface OptionProps {
  option: OptionType;
  isActive: boolean;
}

const Option: FC<OptionProps> = ({ option, isActive }) => {
  const { name, icon, action } = option;

  const handleOptionClick = (e: React.MouseEvent) => {
    console.log(e);
    
    console.log("Option clicked:", name); // This will log which option was clicked
    action();
  };

  return (
    <li
      onClick={handleOptionClick}
      className={isActive ? `${styles.Option} ${styles.active}` : `${styles.Option}`}
    >
      {icon} {name}
    </li>
  );
};

export default Option;
