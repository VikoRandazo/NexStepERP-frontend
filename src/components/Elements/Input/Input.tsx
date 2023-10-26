import React, { FC, useEffect, useState } from "react";
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
  disabled?: boolean;
  placeholder?: string;
}

const Input: FC<InputProps> = ({
  field,
  value,
  onChange,
  error,
  touched,
  onBlur,
  textarea,
  disabled,
  placeholder,
}) => {
  const { key, type, title } = field;
  const [focused, setFocused] = useState<boolean>(false);

  return (
    <div className={styles.Input}>
      <Label for={key} label={title} isFocused={focused} />
      {textarea ? (
        <textarea
          maxLength={1500}
          name={field.key}
          value={value}
          onChange={onChange}
          disabled={disabled}
        ></textarea>
      ) : (
        <input
          key={key}
          type={type}
          name={key}
          value={value}
          onChange={onChange}
          onBlur={(e) => {
            if (onBlur) onBlur(e);
            setFocused(false);
          }}
          placeholder={touched ? error : ""}
          disabled={disabled}
          onFocus={() => setFocused(true)}
        />
      )}
    </div>
  );
};

export default Input;
