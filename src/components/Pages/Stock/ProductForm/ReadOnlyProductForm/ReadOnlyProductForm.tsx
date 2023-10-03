import React, { FC, useEffect } from 'react';
import styles from './ReadOnlyProductForm.module.scss';
import { ProductType } from '../../../../../models/ProductType';
import { FormikBagType } from "../../../../../models/shared/FormikBagType";
import { HiXMark, HiPlus, HiSparkles } from "react-icons/hi2";
import BtnPrimary from "../../../../Elements/Buttons/Btn-Primary/Btn-Primary";
import Input from "../../../../Elements/Input/Input";
import { InputField } from "../../../../Elements/Input/InputField";



interface ReadOnlyProductFormProps {
  product: ProductType
  formControls: any
}

const ReadOnlyProductForm: FC<ReadOnlyProductFormProps> = ({product, formControls}) => {
  const { removeImage, handleImageChange, groupFields, btnText } = formControls;

  useEffect(() => {
console.log(product);

  },[product])
  return (
    <form className={styles.CreateProductForm}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>Create a New Product</h2>
          <p className={styles.sectionExplain}>Lets go through some details of your new product</p>
        </div>
        <div className={styles.main}>
          <div className={styles.image}>
            {product.imageUrl ? (
              <div className={styles.imageContainer}>
                <img src={product.imageUrl} alt={`imageUploaded`} />
                <span className={styles.removeImage} >
                  <HiXMark />
                </span>
              </div>
            ) : (
              <div className={styles.uploadImageContainer}>
                <input type="file" name="imageUrl" />
                <HiPlus />
              </div>
            )}
          </div>
          <div className={styles.groups}>
            {Object.keys(groupFields).map((groupKey) => (
              <div key={groupKey} className={styles[`group${groupKey}`]}>
                {groupFields[groupKey].map((field: InputField, i: number) => (
                  // <Input
                  //   key={i}
                  //   field={field}
                  //   value={product[field.key]}
                  //   onChange={handleChange}
                  //   onBlur={handleBlur}
                  //   touched={touched[field.key]}
                  //   textarea={field.textarea}
                  //   error={errors[field.key]}
                    
                  // />
                  <h2 key={i}>{product[field.key]}</h2>
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

export default ReadOnlyProductForm;


