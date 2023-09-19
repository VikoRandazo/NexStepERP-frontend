import { useFormik } from "formik";
import { InputField } from "../../../Elements/Input/InputField";
import { validationCreateProduct } from "./CreateProductValidation";
import instance from "../../../../api/axiosInstance";
import { ProductInitState } from "../../../../models/ProductType";
import { useEffect, useState } from "react";

export const useCreateProductComponent = () => {
    const [localImageUrl, setLocalImageUrl] = useState<string | null>(null);
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
    // { key: "imageUrl", type: "text", title: "Product Image", group: 1 },
    { key: "name", type: "text", title: "Product Title", group: 1 },
    { key: "description", type: "text", title: "Description", textarea: true, group: 1 },
    { key: "category", type: "text", title: "Category", group: 1 },
    { key: "stockQuantity", type: "text", title: "Quantity", group: 2 },
    { key: "manufacturer", type: "text", title: "Manufacturer", group: 2 },
    { key: "price", type: "text", title: "Price", group: 3 },
  ];

  const { handleChange, values, handleSubmit, errors, touched, handleBlur } = useFormik({
    initialValues: ProductInitState,
    validationSchema: validationCreateProduct,
    onSubmit: async () => {
      try {
        const response = await instance.post(`http://localhost:5000/products/new`, values);
        console.log(response.data);
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
      setLocalImageUrl(url);
    }
  };

  const removeImage = () => {
    setLocalImageUrl(null)
  }
  useEffect(() => {
    console.log(localImageUrl);
  }, [localImageUrl]);

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
    localImageUrl,
    removeImage
  };
};
