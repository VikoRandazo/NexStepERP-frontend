import React, { FC, useEffect } from "react";
import styles from "./Input.module.scss";
import { InputField } from "./InputField";
import Label from "../Label/Label";

interface InputProps {
  field: InputField;
  value: string | number | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur: (
    e: React.FocusEvent<any, Element>
  ) => void | ((fieldOrEvent: any) => (e: any) => void | void);
  touched: boolean | undefined;
  error?: string;
  textarea?: boolean;
}

const Input: FC<InputProps> = ({ field, value, onChange, error, touched, onBlur, textarea }) => {
  const { key, type } = field;

  return (
    <div className={styles.Input}>
      <Label for={key} label={key} />
      {textarea ? (
        <textarea maxLength={1500} name={field.key} value={value} onChange={onChange}></textarea>
      ) : (
        <input
          key={field.key}
          type={field.type}
          name={field.key}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={touched ? error : ""}
        />
      )}
    </div>
  );
};

export default Input;
