import React, { FC } from "react";
import styles from "./Option.module.scss";
import { OptionType } from "../../../models/Elements/Option";

interface OptionProps {
  option: OptionType;
  isActive: boolean;
}

const Option: FC<OptionProps> = ({ option, isActive }) => {
  const {name, action} = option

  return (
    <li onClick={action} className={isActive ? `${styles.Option} ${styles.active}` : `${styles.Option}`}>
      {name}
    </li>
  );
};

export default Option;
