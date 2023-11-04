import React, { FC, useEffect, useMemo, useState } from "react";
import styles from "./Form.module.scss";
import { InteractionsModeEnum } from "../../models/shared/InteractionsMode";
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
import { OptionType } from "../../models/Elements/Option";
import { useSelect } from "../Elements/Select/SelectFunctionality";
import countries from "./../Pages/Clients/countries.json";
import Label from "../Elements/Label/Label";
interface FormProps {
  mode: InteractionsModeEnum;
  fields: InputField[];
  formikBag: any;
  setIsActiveModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectElementEvent?: (e: React.MouseEvent<HTMLLIElement>) => string;
}

const Form: FC<FormProps> = ({ mode, fields, formikBag, selectElementEvent, setIsActiveModal }) => {
  const entity = useSelector((state: StoreRootTypes) => state.ui.modal.type);

  const { data, handlers } = useForm(fields, styles, entity, setIsActiveModal);
  const { handleSubmit } = formikBag;
  const { groupedFields, buttonText } = data;
  const { handleCloseModal, handleClassName } = handlers;

  const [isOpenSelect, setIsOpenSelect] = useState<boolean>(false);
  const { handleOpenSelectMenu } = useSelect(isOpenSelect, setIsOpenSelect);

  const options: OptionType[] = useMemo(() => {
    return countries.countries.map((country: string) => ({
      name: country,
      action: () => {},
    }));
  }, []);
  console.log(fields);

  return (
    <form className={styles.Form} onSubmit={handleSubmit}>
      <div className={styles.header}>
        <h2>{`${mode} ${entity}`}</h2>
      </div>

      <div className={styles.main}>
        {Object.values(groupedFields).map((group: InputField[], index) => (
          <div key={index} className={handleClassName(index)}>
            {group.map((field: InputField, i) => {

              switch (field.element) {

                case "input":
                  return (
                    <span className={styles[field.key]}>
                      <Input
                        key={field.key}
                        field={field}
                        value={formikBag.values[field.key]}
                        onChange={formikBag.handleChange}
                      />
                    </span>
                  );

                case "select":
                  return (
                    <span className={styles[field.key]} onClick={handleOpenSelectMenu}>
                      <Label label={field.title} for={field.key} />
                      <Select
                        key={field.key}
                        name={field.key}
                        isActive={isOpenSelect}
                        options={options}
                        placeholder={"Choose Country"}
                        optionEvent={selectElementEvent}
                        setFieldValue={formikBag.setFieldValue}
                      />
                    </span>
                  );

                default:
                  break;
              }
            })}
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <BtnSecondary text={BtnActionsTextEnum.CANCEL} action={handleCloseModal} />
        <BtnPrimary icon={<HiSparkles />} text={buttonText} action={handleSubmit} />
      </div>
    </form>
  );
};
export default Form;
