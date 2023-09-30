import { FormikErrors, FormikTouched } from "formik";
import { ProductType } from "../ProductType";

export interface FormikBagType {
  values: ProductType;
  errors: FormikErrors<ProductType>;
  touched: FormikTouched<ProductType>;
  handlers: {
    handleBlur: any;
    handleChange: any;
    handleSubmit: any;
  };
}
