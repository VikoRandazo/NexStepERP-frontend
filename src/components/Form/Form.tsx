import React, { FC, useState, useMemo, useEffect } from "react";
import styles from "./Form.module.scss";
import { InteractionsModeEnum } from "../../models/shared/InteractionsMode";
import Input from "../Elements/Input/Input";
import { InputField } from "../Elements/Input/InputField";
import { StoreRootTypes } from "../../store/store";
import { useSelector } from "react-redux";
import { useForm } from "./useForm";
import BtnPrimary from "../Elements/Buttons/Btn-Primary/Btn-Primary";
import { HiSparkles } from "react-icons/hi"; // Corrected import path for the icon
import { BtnActionsTextEnum } from "../Elements/Buttons/BtnActionsText";
import BtnSecondary from "../Elements/Buttons/Btn-Secondary/Btn-Secondary";
import Select from "../Elements/Select/Select";
import { OptionType } from "../../models/Elements/Option";
import { useSelect } from "../Elements/Select/SelectFunctionality";
import categories from "../Pages/Stock/categories.json";
import countries from "../Pages/Clients/countries.json";
import Label from "../Elements/Label/Label";
import Img from "../Elements/Img/Img";
import { EntityEnum } from "../../models/EntityEnum";

interface FormProps {
  fields: InputField[];
  formikBag: any;
  selectedItem?: any;
  setIsActiveModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Form: FC<FormProps> = ({ fields, formikBag, setIsActiveModal, selectedItem }) => {
  const entity = useSelector((state: StoreRootTypes) => state.ui.modal.type);

  const { data, handlers, setters, states } = useForm(fields, styles, entity, setIsActiveModal);
  const { handleSubmit } = formikBag;
  const { groupedFields, buttonText } = data;
  const { isOpenSelect } = states;
  const { setIsOpenSelect } = setters;
  const { handleCloseModal, handleClassName } = handlers;
  const { handleOpenSelectMenu } = useSelect(isOpenSelect, setIsOpenSelect);

  const options: OptionType[] = useMemo(() => {
    const list = entity === EntityEnum.STOCK ? categories : countries;
    return list.map((item: string) => ({
      name: item,
      action: () => {},
    }));
  }, [entity]);

  return (
    <form className={styles.Form} onSubmit={handleSubmit}>
      <div className={styles.main}>
        <div className={styles.wrapper}>
          {Object.values(groupedFields).map((group: InputField[], index) => (
            <div key={index} className={handleClassName(index)}>
              {group.map((field: InputField, i) => {
                if (!field.hidden) {
                  switch (field.element) {
                    case "input":
                      return (
                        <span key={field.key} className={styles[field.key]}>
                          <Input
                            field={field}
                            value={
                              selectedItem ? selectedItem[field.key] : formikBag.values[field.key]
                            }
                            onChange={formikBag.handleChange}
                          />
                        </span>
                      );

                    case "select":
                      return (
                        <span
                          key={field.key}
                          className={styles[field.key]}
                          onClick={handleOpenSelectMenu}
                        >
                          <Label label={field.title} for={field.key} />
                          <Select
                            name={field.key}
                            isActive={isOpenSelect}
                            options={options}
                            placeholder={field.placeholder}
                            value={selectedItem && selectedItem[field.key]}
                          />
                        </span>
                      );

                    case "img":
                      return (
                        <span key={field.key} className={styles[field.key]}>
                          <Label label={field.title} for={field.key} />
                          <Img
                            url={formikBag.values[field.key] || ""}
                            alt={field.title}
                            formikChange={formikBag.handleChange}
                            setFieldValue={formikBag.setFieldValue}
                          />
                        </span>
                      );

                    default:
                      return null;
                  }
                }
              })}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.footer}>
        <BtnSecondary text={BtnActionsTextEnum.CANCEL} action={handleCloseModal} />
        <BtnPrimary icon={<HiSparkles />} text={buttonText} action={handleSubmit} />
      </div>
    </form>
  );
};

export default Form;
