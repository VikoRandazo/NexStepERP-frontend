import React, { FC, useEffect } from "react";
import styles from "./ProductForm.module.scss";
import { HiPlus, HiXMark } from "react-icons/hi2";
import { useProductForm } from "./useProductForm";
import Input from "../../../Elements/Input/Input";
import { InputField } from "../../../Elements/Input/InputField";
import BtnPrimary from "../../../Elements/Buttons/Btn-Primary/Btn-Primary";
import { BtnActionsTextEnum } from "../../../Elements/Buttons/BtnActionsText";
import BtnSecondary from "../../../Elements/Buttons/Btn-Secondary/Btn-Secondary";
import { ProductInitState } from "../../../../models/ProductType";
import { InteractionsModeEnum } from "../../../../models/shared/InteractionsMode";

interface ProductFormProps {}

const ProductForm: FC<ProductFormProps> = () => {
  const { formikBag, formControls, handlers } = useProductForm();
  const { values, errors, touched, FormikHandlers } = formikBag;
  const { handleBlur, handleChange, handleSubmit } = FormikHandlers;
  const {
    groupFields,
    removeImage,
    handleImageChange,
    mode,
    btnText,
    product = ProductInitState,
  } = formControls;
  const { handleCloseModal, handleChooseDescriptionCase } = handlers;

  return (
    <form onSubmit={handleSubmit} className={styles.ProductForm}>
      <header className={styles.header}>
        <h2>{mode} Product</h2>
        <p>{handleChooseDescriptionCase()}</p>
      </header>
      <div className={styles.main}>
        
        {values.imageUrl ? (
          <div className={styles.imageContainer}>
            <span className={styles.removeImage} onClick={removeImage}>
              <HiXMark />
            </span>
            <img src={values.imageUrl} alt={`imageUploaded`} />
          </div>
        ) : (
          <div className={styles.uploadImageContainer}>
            <input type="file" name="imageUrl" onChange={handleImageChange} />
            <HiPlus />
          </div>
        )}

        <hr className={styles.divider} />
        <div className={styles.fields}>
          {Object.keys(groupFields).map((groupKey) => (
            <div key={groupKey} className={styles[`group${groupKey}`]}>
              {groupFields[groupKey].map((field: InputField, i: number) => {
                return (
                  <Input
                    key={i}
                    field={field}
                    value={values[field.key]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched[field.key]}
                    textarea={field.textarea}
                    error={errors[field.key]}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.footer}>
        <BtnPrimary text={btnText} />
        <BtnSecondary text={BtnActionsTextEnum.CANCEL} action={handleCloseModal} />
      </div>
    </form>
  );
};

export default ProductForm;
