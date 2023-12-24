import React, { FC, useEffect } from "react";
import styles from "./Option.module.scss";
import { OptionType } from "../../../models/Elements/Option";

type OptionProps = {
  option: OptionType;
  isActive: boolean;
  onChange: (e: React.MouseEvent<HTMLLIElement>) => void;
  setSelected?: React.Dispatch<React.SetStateAction<string>>;
};

const Option: FC<OptionProps> = (props) => {
  const { option, isActive, setSelected, onChange } = props;
  const { id, value } = option;

  const handleOptionClick = (e: React.MouseEvent<HTMLLIElement>) => {
    if (setSelected && e.currentTarget.dataset.value) {
      const {value} = e.currentTarget.dataset
      setSelected(value);
    }

    onChange(e);
  };

  return (
    <li
      onClick={handleOptionClick}
      className={isActive ? `${styles.Option} ${styles.active}` : styles.Option}
      id={`${id}`}
      data-value={value}
    >
      {value}
    </li>
  );
};

export default Option;
