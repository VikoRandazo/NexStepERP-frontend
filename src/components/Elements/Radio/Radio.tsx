import React, { FC, SetStateAction, useEffect } from "react";
import styles from "./Radio.module.scss";
import { HiCheck, HiCheckBadge, HiCheckCircle } from "react-icons/hi2";
import { OptionType, RadioOptionType } from "../../../models/Elements/Option";

interface RadioProps {
  options: RadioOptionType[];
  selected: string;
  event: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Radio: FC<RadioProps> = ({ options, selected, event }) => {
  const handleChange = (e: React.MouseEvent<HTMLDivElement>) => {
    event(e);
  };

useEffect(() =>{
console.log(selected);

},[selected])

  return (
    <div className={styles.Radio}>
      <div className={styles.options}>
        {options.map(({ id, name, value }) => {
          return (
            <div className={styles.selection}>

            <div
              onClick={handleChange}
              key={id}
              className={selected === name ? `${styles.element} ${styles.isActive}` : styles.element}
              data-selected={selected === name}
              data-name={name}
              data-value={value}
              >
              {selected ? <HiCheckCircle /> : null}
            </div>

            <span className={styles.name}>{name}</span>
              
          </div>
          );
        })}
      </div>
    </div>
  );
};

export default Radio;
