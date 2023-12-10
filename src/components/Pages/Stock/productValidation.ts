import * as yup from 'yup';

export const productValidationSchema = yup.object().shape({
  id: yup.number().required('ID is required').integer('ID must be an integer'),
  name: yup.string().required('Name is required').trim(),
  description: yup.string().trim().nullable(),
  price: yup.number().required('Price is required').positive('Price must be a positive number'),
  imageUrl: yup.string()
  .trim()
  .matches(
      /^(\.\.\/)*assets\/images\/products\/[a-zA-Z0-9_\-]+\.(jpg|jpeg|png|gif)$/,
      'Invalid file path'
  )
  .nullable(),
category: yup.string().required('Category is required').trim(),
  stockQuantity: yup.number().required('Stock quantity is required').positive('Stock quantity must be a positive number').integer('Stock quantity must be an integer'),
  manufacturer: yup.string().trim().nullable(),
  purchasesAmount: yup.number().nullable(),
});

