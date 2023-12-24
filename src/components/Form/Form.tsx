import React, { FC, useState, useMemo, useEffect, ReactElement } from "react";
import styles from "./Form.module.scss";
import Input from "../Elements/Input/Input";
import { InputField } from "../Elements/Input/InputField";
import { StoreRootTypes } from "../../store/store";
import { useSelector } from "react-redux";
import { useForm } from "./useForm";
import BtnPrimary from "../Elements/Buttons/Btn-Primary/Btn-Primary";
import { HiSparkles } from "react-icons/hi2";
import { BtnActionsTextEnum } from "../Elements/Buttons/BtnActionsText";
import BtnSecondary from "../Elements/Buttons/Btn-Secondary/Btn-Secondary";
import Select from "../Elements/Select/Select";
import { useSelect } from "../Elements/Select/useSelect";
import Img from "../Elements/Img/Img";
import Divider from "../Elements/Divider/Divider";

type FormProps = {
  fields: InputField[];
  formikBag: {
    handleSubmit: any;
    values: any;
    handleChange: any;
    setFieldValue: any;
    errors?: any;
    touched?: any;
    handleBlur?: any;
  };
  showFooter?: boolean;
  setIsActiveModal?: React.Dispatch<React.SetStateAction<boolean>>;
  customFormName?: string;
  footerConfig?: {
    btnPrimary?: { text: string; icon: ReactElement; action: () => void };
    btnSecondary?: { text: string; action: () => void };
  };
};

const Form: FC<FormProps> = ({
  fields,
  formikBag,
  setIsActiveModal,
  showFooter,
  customFormName,
  footerConfig,
}) => {
  const entity = useSelector((state: StoreRootTypes) => state.ui.modal.type);

  const { data, handlers, setters, states } = useForm(
    fields,
    styles,
    entity,
    setIsActiveModal,
    customFormName
  );
  const { handleSubmit } = formikBag;
  const { groupedFields, buttonText } = data;
  const { isOpenSelect, selectStates } = states;
  const { setIsOpenSelect } = setters;
  const { handleCloseModal, handleClassName, handleOpenSelect } = handlers;
  const { handleOpenSelectMenu } = useSelect(isOpenSelect, setIsOpenSelect);

  const handleChainedKey = (formikValues: any, key: string) => {
    const value = key.split(`.`).reduce((currentValue, currentKey) => {
      return currentValue ? currentValue[currentKey] : undefined;
    }, formikValues);

    return value;
  };

  useEffect(() => {
    console.log(formikBag.touched);
  }, [formikBag.touched]);

  return (
    <form className={styles.Form} onSubmit={handleSubmit}>
      <div className={styles.main}>
        <div className={styles.wrapper}>
          {Object.values(groupedFields).map((group: InputField[], index) => (
            <div key={index} className={handleClassName(index)}>
              {group.map((field: InputField, i) => {
                const checkIfChained = handleChainedKey(formikBag.values, field.key);
                switch (field.element) {
                  case "input":
                    return (
                      <span key={field.key} className={styles[field.key]}>
                        <Input
                          field={field}
                          value={checkIfChained}
                          onChange={formikBag.handleChange}
                          error={formikBag.errors[field.key]}
                          onBlur={formikBag.handleBlur}
                        />
                        <div className={styles.error}>
                          {formikBag.errors[field.key] && formikBag.touched[field.key]
                            ? formikBag.errors[field.key]
                            : null}
                        </div>
                      </span>
                    );

                  case "img":
                    return (
                      <span key={field.key} className={styles[field.key]}>
                        <Img
                          url={formikBag.values[field.key] || ""}
                          alt={field.key}
                          formikChange={formikBag.handleChange}
                          setFieldValue={formikBag.setFieldValue}
                          onFileSelect={field.event}
                        />
                      </span>
                    );

                  case "select":
                    return (
                      <span
                        key={field.key}
                        className={styles[field.key]}
                        onClick={() => handleOpenSelect(field.key)}
                      >
                        <Select
                          name={field.key}
                          isOpen={selectStates[field.key]}
                          isSelected={field.isSelectedState}
                          setIsSelected={field.setisSelectedState}
                          options={field.options}
                          placeholder={field.placeholder}
                          event={field.event}
                        />
                      </span>
                    );

                  case "radio":
                    return (
                      <span key={`${field.key}${i}`} className={styles[field.key]}>
                        {field.title ? <span>{field.title}</span> : null}

                        <input
                          type="radio"
                          name={field.key}
                          onChange={field.event}
                          value={field.value}
                        />
                      </span>
                    );

                  case "h5":
                    return (
                      <span className={styles[field.key]}>
                        <h5>{field.title}</h5>
                      </span>
                    );

                  case "h3":
                    return (
                      <span key={field.key} className={`${styles[field.key]} ${styles.subTitle}`}>
                        <h3>{field.title}</h3>
                      </span>
                    );
                  case "h2":
                    return (
                      <span key={field.key} className={`${styles[field.key]} ${styles.subTitle}`}>
                        <h2>{field.title}</h2>
                      </span>
                    );

                  case "secondaryButton":
                    return (
                      <span key={field.key} className={`${styles[field.key]} ${styles.subTitle}`}>
                        <BtnSecondary
                          text={`${field.innerText}`}
                          icon={field.icon && field.icon}
                          action={field.action}
                          type={field.type && field.type}
                        />
                      </span>
                    );
                  case "hr":
                    return (
                      <span
                        key={`${field.key}${field.group}`}
                        className={`${styles[field.key]} ${styles.subTitle}`}
                      >
                        <Divider text={field.title}/>
                      </span>
                    );

                  default:
                    return null;
                }
              })}
            </div>
          ))}
        </div>
      </div>
      {showFooter ? (
        <div className={styles.footer}>
          <BtnSecondary
            text={footerConfig?.btnSecondary?.text}
            action={footerConfig?.btnSecondary?.action}
          />

          <BtnPrimary
            icon={footerConfig?.btnPrimary?.icon}
            text={footerConfig?.btnPrimary?.text}
            action={footerConfig?.btnPrimary?.action}
          />
        </div>
      ) : (
        <></>
      )}
    </form>
  );
};

export default Form;
