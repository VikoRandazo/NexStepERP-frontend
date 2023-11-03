import React, { FC } from "react";
import styles from "./Option.module.scss";
import { OptionType } from "../../../models/Elements/Option";

interface OptionProps {
  option: OptionType;
  isActive: boolean;
  name: string;
  id?: string;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  optionEvent?: (e: React.MouseEvent<HTMLLIElement>) => void;
}

const Option: FC<OptionProps> = ({
  option,
  isActive,
  name,
  id,
  setSelected,
  optionEvent,
  setFieldValue,
}) => {
  const { name: displayName, Icon, action } = option;

  const handleOptionClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const { innerText } = e.currentTarget;
setSelected(innerText)
    setFieldValue(id ? id : name, innerText);

    if (optionEvent) {
      optionEvent(e);
    }
    if (id) {
      console.log(id);
      
    }
    action();
  };

  return (
    <li
      onClick={handleOptionClick}
      className={isActive ? `${styles.Option} ${styles.active}` : `${styles.Option}`}
      id={id}
    >
      {Icon && <Icon />} {displayName}
    </li>
  );
};

export default Option;
