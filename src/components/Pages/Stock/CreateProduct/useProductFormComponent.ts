import { useFormik } from "formik";
import { InputField } from "../../../Elements/Input/InputField";
import { validationProduct } from "./ProductValidation";
import instance from "../../../../api/axiosInstance";
import { ProductInitState, ProductType } from "../../../../models/ProductType";
import { useEffect, useState } from "react";

export const useProductFormComponent = (product: ProductType, mode: string) => {
  // {
  //   "name": "Test Product",
  //   "description": "This is a test product description.",
  //   "price": 99.99,
  //   "imageUrl": "http://example.com/test-product.jpg",
  //   "category": "Test Category",
  //   "stockQuantity": 100,
  //   "manufacturer": "Test Manufacturer",
  //   "purchasesAmount": 0
  // }

  const fields: InputField[] = [
    { key: "name", type: "text", title: "Product Title", group: 1 },
    { key: "description", type: "text", title: "Description", textarea: true, group: 1 },
    { key: "category", type: "text", title: "Category", group: 1 },
    { key: "stockQuantity", type: "text", title: "Quantity", group: 2 },
    { key: "manufacturer", type: "text", title: "Manufacturer", group: 2 },
    { key: "price", type: "text", title: "Price", group: 3 },
  ];

  const { handleChange, values, handleSubmit, errors, touched, handleBlur, setFieldValue } =
    useFormik({
      initialValues: ProductInitState,
      validationSchema: validationProduct,
      onSubmit: async () => {
        try {
          if (mode === `create`) {
            const response = await instance.post(`http://localhost:5000/products/new`, values);
            console.log(response.data);
          } else if (mode === `edit`) {
            // instead of all object required to pass the updated fields only
            const response = await instance.post(`http://localhost:5000/products/${product._id}`, values);
            console.log(response.data);

          } else {
            const response = await instance.post(`http://localhost:5000/products/findProduct`, product._id);
            console.log(response.data);
          }
        } catch (error) {
          console.log(error);
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

      setFieldValue(`imageUrl`, url);
    }
  };

  const removeImage = () => {
    setFieldValue(`imageUrl`, "");
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return {
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
  };
};
