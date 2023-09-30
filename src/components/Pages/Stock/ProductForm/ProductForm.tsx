import React, { FC, useEffect } from "react";
import styles from "./ProductForm.module.scss";
import Input from "../../../Elements/Input/Input";
import { useProductFormHook } from "./useProductFormHook";
import { InputField } from "../../../Elements/Input/InputField";
import BtnPrimary from "../../../Elements/Buttons/Btn-Primary/Btn-Primary";
import { HiPlus, HiSparkles, HiXMark } from "react-icons/hi2";
import { ProductType } from "../../../../models/ProductType";
import { InteractionsMode, InteractionsModeEnum } from "../../../../models/shared/InteractionsMode";
import ReadOnlyProductForm from "./ReadOnlyProductForm/ReadOnlyProductForm";
import CreateProductForm from "./CreateProductForm/CreateProductForm";
import EditProductForm from "./CreateProductForm/EditProductForm/EditProductForm";

interface ProductFormProps {
  product: ProductType;
  mode: `readOnly` | `edit` | `create`;
  setInteractionsMode: React.Dispatch<React.SetStateAction<InteractionsMode>>;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductForm: FC<ProductFormProps> = ({ product, mode, setInteractionsMode, setIsOpenModal }) => {
//  Close the modal from the productFormCreate/edit/readonly component
  const {
    fields,
    handleChange,
    handleSubmit,
    errors,
    touched,
    handleBlur,
    values,
    groupFields,
    handleImageChange,
    removeImage,
    btnText,
  } = useProductFormHook(product, mode);

  const formikBag = {
    values,
    errors,
    touched,
    handlers: { handleBlur, handleChange, handleSubmit },
  };

  const formControls = {
    removeImage,
    handleImageChange,
    groupFields,
    btnText,
  };

  const handleRenderCase = () => {
    if (mode === InteractionsModeEnum.ReadOnly) {
      return <ReadOnlyProductForm product={product} />;
    } else if (mode === InteractionsModeEnum.Create) {
      return <CreateProductForm formikBag={formikBag} formControls={formControls} />;
    } else if (mode === InteractionsModeEnum.Edit) {
      <EditProductForm />;
    }
  };

  useEffect(() => {
    handleRenderCase();
  }, [mode]);

  return <div className={styles.ProductForm}>{handleRenderCase()}</div>;
};

export default ProductForm;
