import React, { FC, useEffect } from "react";
import styles from "./Input.module.scss";
import { InputField } from "./InputField";
import Label from "../Label/Label";

interface InputProps {
  field: InputField;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Input: FC<InputProps> = ({ field, onChange }) => {
  const { key, type } = field;
  // const fields = [
  //   { key: "name", type: "text" },
  //   { key: "description", type: "text" },
  //   { key: "price", type: "number" },
  //   { key: "imageUrl", type: "url" },
  //   { key: "category", type: "text" },
  //   { key: "stockQuantity", type: "number" },
  //   { key: "manufacturer", type: "text" },
  // ];

  return (
    <div className={styles.Input}>
      <Label key={key} />
      <input key={key} type={type ? type : "text"} onChange={onChange} />;
    </div>
  );
};

export default Input;
