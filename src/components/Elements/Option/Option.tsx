import React, { FC } from "react";
import styles from "./Option.module.scss";
import { OptionType } from "../../../models/Elements/Option";

interface OptionProps {
  option: OptionType;
  isActive: boolean;
  id?: string;
  onChange: (e: React.MouseEvent<HTMLLIElement>) => void;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

const Option: FC<OptionProps> = ({ option, isActive, id, onChange, setSelected }) => {
  const { name } = option;

  const handleOptionClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const { innerText } = e.currentTarget;
    setSelected(innerText);
    onChange(e)
  };

  return (
    <li
      onClick={handleOptionClick}
      className={isActive ? `${styles.Option} ${styles.active}` : styles.Option}
      id={id}
    >
      {name}
    </li>
  );
};

export default Option;
