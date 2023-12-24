import React, { FC } from "react";
import styles from "./NumberIncrementor.module.scss";

type NumberIncrementorProps =
  | {
      redux?: false;
      min: number;
      max: number;
      value: number;
      setValue: React.Dispatch<React.SetStateAction<number>>;
    }
  | {
      redux: true;
      min: number;
      max: number;
      value: number;
      actionPlus: () => void;
      actionMinus: () => void;
    };

const NumberIncrementor: FC<NumberIncrementorProps> = (props) => {
  const isRedux = props.redux === true;

  const handlePlus = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (props.value !== props.max) {
      if (isRedux) {
        props.actionPlus();
      } else {
        props.setValue((prev) => prev + 1);
      }
    }
  };

  const handleMinus = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (isRedux) {
      props.actionMinus();
    } else {
      props.setValue((prev) => prev - 1);
    }
  };
  return (
    <div className={styles.NumberIncrementor}>
      <button className={styles.minus} onClick={handleMinus}>
        -
      </button>
      <div className={styles.value}>{props.value}</div>
      <button className={styles.plus} onClick={handlePlus}>
        +
      </button>
    </div>
  );
};

export default NumberIncrementor;
