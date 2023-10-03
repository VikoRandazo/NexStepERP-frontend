import React, { FC } from "react";
import styles from "./CreateProductForm.module.scss";
import { FormikBagType } from "../../../../../models/shared/FormikBagType";
import { HiXMark, HiPlus, HiSparkles } from "react-icons/hi2";
import BtnPrimary from "../../../../Elements/Buttons/Btn-Primary/Btn-Primary";
import Input from "../../../../Elements/Input/Input";
import { InputField } from "../../../../Elements/Input/InputField";

interface CreateProductFormProps {
  formikBag: FormikBagType;
  formControls: any;
}

const CreateProductForm: FC<CreateProductFormProps> = ({ formikBag, formControls }) => {
  const { values, errors, touched, handlers } = formikBag;
  const { handleBlur, handleChange, handleSubmit } = handlers;
  const { removeImage, handleImageChange, groupFields, btnText } = formControls;
  
  if (!formikBag || !formControls) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className={styles.CreateProductForm}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Create a New Product</h2>
          <p className={styles.sectionExplain}>Lets go through some details of your new product</p>
        </div>
        <div className={styles.main}>
          <div className={styles.image}>
            {values.imageUrl ? (
              <div className={styles.imageContainer}>
                <img src={values.imageUrl} alt={`imageUploaded`} />
                <span className={styles.removeImage} onClick={removeImage}>
                  <HiXMark />
                </span>
              </div>
            ) : (
              <div className={styles.uploadImageContainer}>
                <input type="file" name="imageUrl" onChange={handleImageChange} />
                <HiPlus />
              </div>
            )}
          </div>
          <div className={styles.groups}>
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
          <BtnPrimary icon={<HiSparkles />} text={btnText} />
        </div>
      </div>
    </form>
  );
};

export default CreateProductForm;
