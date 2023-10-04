import React, { FC } from "react";
import styles from "./ProductForm.module.scss";
import { HiPlus, HiXMark } from "react-icons/hi2";
import { useProductForm } from "./useProductForm";
import Input from "../../../Elements/Input/Input";
import { InputField } from "../../../Elements/Input/InputField";
import { useSelector } from "react-redux";
import { StoreRootTypes } from "../../../../store/store";
import { ProductType } from "../../../../models/ProductType";
import { InteractionsMode, InteractionsModeEnum } from "../../../../models/shared/InteractionsMode";
import BtnPrimary from "../../../Elements/Buttons/Btn-Primary/Btn-Primary";
import { BtnActionsTextEnum } from "../../../Elements/Buttons/BtnActionsText";
import BtnSecondary from "../../../Elements/Buttons/Btn-Secondary/Btn-Secondary";
import { useDispatchHook } from "../../../../hooks/useDispatch";
import { UiActions } from "../../../../store/slices/ui";

export type ProductFormProps =
  | { mode: InteractionsModeEnum.Create }
  | { mode: InteractionsModeEnum.Edit | InteractionsModeEnum.ReadOnly; product: ProductType };

const ProductForm: FC<ProductFormProps> = (props) => {
  const mode = useSelector((state: StoreRootTypes) => state.ui.modal.mode);

  const formArgs = props.mode === InteractionsModeEnum.Create ? mode : props.product;

  const { formikBag, formControls, handlers } = useProductForm(formArgs);
  const { values, errors, touched, FormikHandlers } = formikBag;
  const { handleBlur, handleChange, handleSubmit } = FormikHandlers;
  const { groupFields, removeImage, handleImageChange } = formControls;
  const { handleCloseModal } = handlers;

  return (
    <form onSubmit={handleSubmit} className={styles.ProductForm}>
      <header className={styles.header}>
        
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
        )}{" "}
        <div className={styles.fields}>
          {Object.keys(groupFields).map((groupKey) => (
            <div key={groupKey} className={styles[`group${groupKey}`]}>
              {groupFields[groupKey].map((field: InputField, i: number) => (
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
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.footer}>
        <BtnPrimary text={BtnActionsTextEnum.CREATE} />
        <BtnSecondary text={BtnActionsTextEnum.CANCEL} action={handleCloseModal} />
      </div>
    </form>
  );
};

export default ProductForm;
