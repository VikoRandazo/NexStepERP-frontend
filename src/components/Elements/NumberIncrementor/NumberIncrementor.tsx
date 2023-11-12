import React, { FC } from "react";
import styles from "./NumberIncrementor.module.scss";

interface NumberIncrementorProps {
  min: number;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  max: number;
}

const NumberIncrementor: FC<NumberIncrementorProps> = ({ min, value, setValue, max }) => {
  const handlePlus = () => {
    if (value !== max) {
      setValue((prev) => prev + 1);
    }
  };
  const handleMinus = () => {
    if (value !== min) {
      setValue((prev) => prev - 1);
    } else return;
  };
  return (
    <div className={styles.NumberIncrementor}>
      <button className={styles.minus} onClick={handleMinus}>
        -
      </button>
      <div className={styles.value}>{value}</div>
      <button className={styles.plus} onClick={handlePlus}>
        +
      </button>
    </div>
  );
};

export default NumberIncrementor;
