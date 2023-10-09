import React, { FC, useEffect } from "react";
import styles from "./Input.module.scss";
import { InputField } from "./InputField";
import Label from "../Label/Label";

interface InputProps {
  field: InputField;
  value: string | number | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: (
    e: React.FocusEvent<any, Element>
  ) => void | ((fieldOrEvent: any) => (e: any) => void | void);
  touched?: boolean | undefined;
  error?: string;
  textarea?: boolean;
  disabled? : boolean
}

const Input: FC<InputProps> = ({ field, value, onChange, error, touched, onBlur, textarea, disabled }) => {
  const { key, type, title } = field;
  useEffect(() => {

  },[disabled])
  return (
    <div className={`${styles.Input}`}>
      <Label for={key} label={title} />
      {textarea ? (
        <textarea maxLength={1500} name={field.key} value={value} onChange={onChange} disabled={disabled}></textarea>
      ) : (
        <input
          key={key}
          type={type}
          name={key}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={touched ? error : error}
          disabled={disabled}
        />
      )}
    </div>
  );
};

export default Input;
