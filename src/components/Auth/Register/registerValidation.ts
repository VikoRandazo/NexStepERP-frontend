import * as yup from "yup";

export const registerValidationSchema = yup.object().shape({
  firstName: yup.string().required(`Enter your first name`),
  lastName: yup.string().required(`Enter your last name`),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref(`password`)], `Passwords must match`)
    .required("Password Confirmation is required"),
});
