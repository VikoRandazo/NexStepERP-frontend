import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import instance from '../../../../api/axiosInstance';
import { ProductInitState, ProductType } from '../../../../models/ProductType';
import { validationProduct } from './ProductValidation';
import { InteractionsMode, InteractionsModeEnum } from '../../../../models/shared/InteractionsMode';
import { InputField } from '../../../Elements/Input/InputField';

export const useProductFormHook = (
  mode: InteractionsMode,
  product?: ProductType,
) => {
  const [btnText, setBtnText] = useState<string>('Action');

  const fields: InputField[] = [
    { key: "name", type: "text", title: "Product Title", group: 1 },
    { key: "description", type: "text", title: "Description", textarea: true, group: 1 },
    { key: "category", type: "text", title: "Category", group: 1 },
    { key: "stockQuantity", type: "text", title: "Quantity", group: 2 },
    { key: "manufacturer", type: "text", title: "Manufacturer", group: 2 },
    { key: "price", type: "text", title: "Price", group: 3 },
  ];

  const groupFields = fields.reduce((acc: any, field: any) => {
    acc[field.group] = acc[field.group] || [];
    acc[field.group].push(field);
    return acc;
  }, {});

  useEffect(() => {
    setBtnText(() => {
      switch (mode) {
        case InteractionsModeEnum.Create:
          return 'Create Product';
        case InteractionsModeEnum.Edit:
          return 'Update Product';
        case InteractionsModeEnum.ReadOnly:
          return 'Edit Product';
        default:
          return 'Action';
      }
    });
  }, [mode]);
  
  const { handleChange, values, handleSubmit, errors, touched, handleBlur, setFieldValue } = useFormik({
    initialValues: ProductInitState,
    validationSchema: validationProduct,
    onSubmit: async () => {
      try {
        let response;
        if (mode === InteractionsModeEnum.Create) {
          response = await instance.post('http://localhost:5000/products/new', values);
        } else if (mode === InteractionsModeEnum.Edit && product) {
          response = await instance.post(`http://localhost:5000/products/${product._id}`, values);
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      setFieldValue('imageUrl', url);
    }
  };

  const removeImage = () => {
    setFieldValue('imageUrl', '');
  };
  
  const formikBag = {
    values,
    errors,
    touched,
    handlers: { handleBlur, handleChange, handleSubmit },
  };

  const formControls = {
    removeImage,
    handleImageChange,
    btnText,
    groupFields
    
  };

  return { formikBag, formControls };
};
