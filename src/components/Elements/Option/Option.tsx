import React, { FC } from "react";
import styles from "./Option.module.scss";
import { OptionType } from "../../../models/Elements/Option";

interface OptionProps {
  option: OptionType;
  isActive: boolean;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  optionEvent?: (e: React.MouseEvent<HTMLLIElement>) => void;
}

const Option: FC<OptionProps> = ({ option, isActive, setSelected, optionEvent }) => {
  const { name, Icon, action } = option;

  const handleOptionClick = (e: React.MouseEvent<HTMLLIElement>) => {
    if (optionEvent) {
      optionEvent(e);
    }
    setSelected(e.currentTarget.innerText);
    action();
  };

  return (
    <li
      onClick={handleOptionClick}
      className={isActive ? `${styles.Option} ${styles.active}` : `${styles.Option}`}
    >
      {Icon && <Icon />} {name}
    </li>
  );
};

export default Option;
