import React, { FC, useEffect, useRef } from "react";
import styles from "./Option.module.scss";
import { OptionType } from "../../../models/Elements/Option";
import { HiCheck } from "react-icons/hi2";

type OptionProps = {
  option: OptionType;
  event: (e: React.MouseEvent<HTMLLIElement>) => void;
  isSelected: OptionType;
  setIsSelected: React.Dispatch<React.SetStateAction<OptionType>>;
};

const Option: FC<OptionProps> = (props) => {
  const { option, setIsSelected, event, isSelected } = props;
  const { id, value } = option;


  const handleOptionClick = (e: React.MouseEvent<HTMLLIElement>) => {

    if (setIsSelected && e.currentTarget.dataset.value) {
      setIsSelected(option);
    }

    event(e);
  };



  return (
    <li onClick={handleOptionClick} className={styles.Option} id={`${id}`} data-value={value}>
      {option.icon ? <div className={styles.icon}>{option.icon}</div> : null}

      {value}

      {option.value === isSelected.value ? (
        <div className={styles.checkmark}>
          <HiCheck />
        </div>
      ) : null}
    </li>
  );
};

export default Option;
