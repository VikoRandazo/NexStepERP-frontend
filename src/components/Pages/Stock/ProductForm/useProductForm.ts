import { useFormik } from "formik";
import { InputField } from "../../../Elements/Input/InputField";
import { ProductInitState, ProductType } from "../../../../models/ProductType";
import { validationProduct } from "./ProductFormValidation";
import {
  InteractionDescription,
  InteractionsModeEnum,
} from "../../../../models/shared/InteractionsMode";
import instance from "../../../../api/axiosInstance";
import { useDispatchHook } from "../../../../hooks/useDispatch";
import { UiActions } from "../../../../store/slices/ui";
import { useEffect, useState } from "react";
import { BtnActionsTextEnum } from "../../../Elements/Buttons/BtnActionsText";
import { useSelector } from "react-redux";
import { StoreRootTypes } from "../../../../store/store";

export const useProductForm = () => {
  const { dispatch } = useDispatchHook();

  const [btnText, setBtnText] = useState<string>(BtnActionsTextEnum.Action);
  const mode = useSelector((state: StoreRootTypes) => state.ui.modal.mode);
  const product: ProductType = useSelector((state: StoreRootTypes) => state.entities.stock.product);
  const isOpenModal = useSelector((state: StoreRootTypes) => state.ui.modal.isOpen);
  
  const fields: InputField[] = [
    { key: "name", type: "text", title: "Product Title", group: 1 },
    { key: "description", type: "text", title: "Description", textarea: true, group: 1 },
    { key: "category", type: "text", title: "Category", group: 2 },
    { key: "manufacturer", type: "text", title: "Manufacturer", group: 2 },
    { key: "stockQuantity", type: "text", title: "Quantity", group: 3 },
    { key: "price", type: "text", title: "Price", group: 3 },
  ];

  const {
    handleChange,
    values,
    handleSubmit,
    errors,
    touched,
    handleBlur,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: ProductInitState,
    validationSchema: validationProduct,
    onSubmit: async () => {
      try {
        let response;
        switch (mode) {
          case InteractionsModeEnum.Create:
            response = await instance.post("http://localhost:5000/products/new", values);
            break;

          case InteractionsModeEnum.Edit:
            response = await instance.post(`http://localhost:5000/products/${product._id}`, values);
            break;
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(UiActions.setIsOpen(false));
      }
    },
  });

  const groupFields = fields.reduce((acc: any, field: any) => {
    acc[field.group] = acc[field.group] || [];
    acc[field.group].push(field);

    return acc;
  }, {});

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setFieldValue("imageUrl", url);
      console.log(url);
    }
  };

  const removeImage = () => {
    setFieldValue("imageUrl", "");
  };

  const handleCloseModal = () => {
    dispatch(UiActions.setIsOpen(false));
  };

  useEffect(() => {
    setBtnText(() => {
      switch (mode) {
        case InteractionsModeEnum.Create:
          return "Create Product";
        case InteractionsModeEnum.Edit:
          return "Update Product";
        default:
          return "Action";
      }
    });
  }, [mode]);

  const handleChooseDescriptionCase = () => {
    switch (mode) {
      case InteractionsModeEnum.Create:
        return InteractionDescription.Create;

      case InteractionsModeEnum.Edit:
        return InteractionDescription.Edit;
    }
  };

  const formikBag = {
    values,
    errors,
    touched,
    FormikHandlers: { handleBlur, handleChange, handleSubmit },
  };

  const formControls = {
    removeImage,
    handleImageChange,
    groupFields,
    mode,
    product,
    btnText
  };

  const handlers = {
    handleCloseModal,
    handleChooseDescriptionCase,
  };

  useEffect(() => {
    if (mode === InteractionsModeEnum.Edit && product) {
        resetForm({ values: product });
    } else if (mode === InteractionsModeEnum.Create) {
        resetForm({values: ProductInitState});
    }
}, [mode, product, resetForm]);


useEffect(() => {
console.log(values);

},[values])
  return { formikBag, formControls, handlers };
};

