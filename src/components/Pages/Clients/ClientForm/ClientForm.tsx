import React, { FC, useEffect } from "react";
import styles from "./ClientForm.module.scss";
import { useClientForm } from "./useClientForm";
import { InputField, InputFieldKeys } from "../../../Elements/Input/InputField";
import Input from "../../../Elements/Input/Input";
import { CustomerType } from "../../../../models/CustomerType";
import BtnPrimary from "../../../Elements/Buttons/Btn-Primary/Btn-Primary";
import { BtnActionsTextEnum } from "../../../Elements/Buttons/BtnActionsText";
import BtnSecondary from "../../../Elements/Buttons/Btn-Secondary/Btn-Secondary";
import { HiSparkles } from "react-icons/hi2";
import { InteractionsModeEnum } from "../../../../models/shared/InteractionsMode";

type ClientFormProps =
  | { mode: InteractionsModeEnum.Edit; client: CustomerType }
  | { mode: InteractionsModeEnum.Create };

const isCreateMode = (props: ClientFormProps): props is { mode: InteractionsModeEnum.Create } => {
  return props.mode === InteractionsModeEnum.Create;
};

const isEditMode = (props: ClientFormProps): props is { mode: InteractionsModeEnum.Edit, client: CustomerType} => {
  return "client" in props;
};


const ClientForm: FC<ClientFormProps> = (props) => {

  const { formikBag, formControls, handlers, data } = useClientForm(props);
  const { fields } = data;
  const { mode } = formControls;
  const { handleChooseDescriptionCase, handleCloseModal } = handlers;
  const {
    handleChange,
    values,
    handleSubmit,
    errors,
    touched,
    handleBlur,
    setFieldValue,
    resetForm,
  } = formikBag;

  return (
    <form onSubmit={handleSubmit} className={styles.ClientForm}>
      <header className={styles.header}>
        <h2>{mode} Client</h2>
        <p>{handleChooseDescriptionCase()}</p>
      </header>
      <div className={styles.main}>
        <div className={styles.fieldsContainer}>
          {fields.map((field: InputField) => {
            return (
              <div className={`${styles["group" + field.group]} ${styles[field.key]}`}>
                <Input field={field} value={values[field.key]} onChange={handleChange} />
              </div>
            );
          })}
        </div>

        <div className={styles.footer}>
          <BtnSecondary text={BtnActionsTextEnum.CANCEL} action={handleCloseModal} />
          <BtnPrimary icon={<HiSparkles />} text={BtnActionsTextEnum.CREATE} action={handleSubmit}/>
        </div>
      </div>
    </form>
  );
};

export default ClientForm;
