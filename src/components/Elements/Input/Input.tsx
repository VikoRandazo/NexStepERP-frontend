import React, { FC, useEffect, useState } from "react";
import styles from "./Input.module.scss";
import { InputField } from "./InputField";
import Label from "../Label/Label";

interface InputProps<T> {
  field: InputField;
  value: T[keyof T] | string;
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  touched?: boolean;
  error?: string;
  disabled?: boolean;
  placeholder?: string;
  autoComplete?: string | undefined;
}

function isInput(field: InputField): field is InputField & { element: "input" } {
  return field.element === "input";
}

const Input: FC<InputProps<any>> = ({
  field,
  value,
  onChange,
  error,
  touched,
  onBlur,
  disabled,
  placeholder,
  autoComplete,
}) => {

  const { key } = field;
  const [focused, setFocused] = useState<boolean>(false);

  const handleFocus = () => setFocused(true);
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onBlur) {
      onBlur(e);
    }
    setFocused(false);
  };

  const handleClassName = () => {
    switch (error?.length !== 0) {
      case true:
        if (touched) {
          return styles.error;
        }
        break;
      case false:
        return styles.placeholder;

      default:
        return styles.placeholder;
    }
  };


  return (
    <div className={styles.Input}>
      {isInput(field) ? (
        <div className={styles.inputContainer}>
          <Label for={key as string} label={field.title} isFocused={focused} />
          <div className={styles.input}>
            {field.textarea ? (
              <textarea
                id={key as string}
                maxLength={1500}
                name={key as string}
                value={value}
                onChange={onChange}
                disabled={disabled}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            ) : (
              <input
                id={key as string}
                name={key as string}
                type={field.type ? field.type : "text"}
                value={value ? value : ""}
                onChange={onChange}
                onBlur={handleBlur}
                placeholder={placeholder ? placeholder : ""}
                disabled={disabled}
                onFocus={handleFocus}
                className={handleClassName()}
                autoComplete={autoComplete}
              />
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Input;
