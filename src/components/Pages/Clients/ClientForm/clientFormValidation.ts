import * as yup from "yup";

export const validationClient = yup.object().shape({
  name: yup
    .string()
    .required("*Product name is required")
    .min(2, "*Product name is too short")
    .max(50, "*Product name is too long"),

  description: yup
    .string()
    .min(10, "*Description is too short")
    .max(500, "*Description is too long"),

  price: yup.number().required("*Price is required").min(0.01, "*Price should be at least 0.01"),

  imageUrl: yup.string(),

  category: yup
    .string()
    .required("*Category is required")
    .min(2, "*Category is too short")
    .max(50, "*Category is too long"),

  stockQuantity: yup
    .number()
    .required("*Stock quantity is required")
    .min(0, "*Stock quantity should be at least 0"),

  manufacturer: yup
    .string()
    .required("*Manufacturer is required")
    .min(2, "*Manufacturer is too short")
    .max(100, "*Manufacturer is too long"),

  purchasesAmount: yup.number().min(0, "*Purchases amount should be at least 0"),
});
