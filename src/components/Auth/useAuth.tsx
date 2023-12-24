import { useFormik } from "formik";
import { InputField } from "../Elements/Input/InputField";
import { useEffect, useState } from "react";
import { useDispatchHook } from "../../hooks/useDispatch";
import { appSettingsActions } from "../../store/slices/appSettings";
import instance from "../../api/axiosInstance";
import { loginValidationSchema } from "./Login/loginValidation";
import { userAuthActions } from "../../store/slices/auth";
import { registerValidationSchema } from "./Register/registerValidation";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  // XXXXXXXXX Login XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

  const { dispatch } = useDispatchHook();
  const navigate = useNavigate();
  // ===============================================================================
  // --------- States ------------------------------------------------------------
  // ===============================================================================

  const [user, setUser] = useState<any>();

  const loginFields: InputField[] = [
    {
      key: `LoginTitle`,
      title: `Welcome Back!`,
      group: 1,
      element: "h2",
    },
    {
      key: `email`,
      title: `Email Address`,
      group: 1,
      element: "input",
      event: (e: React.ChangeEvent<HTMLInputElement>) => {},
    },
    {
      key: `password`,
      title: `Password`,
      group: 1,
      element: "input",
      type:"password",
      event: (e: React.ChangeEvent<HTMLInputElement>) => {},
    },
    { key: `divider`, group: 1, element: "hr", title: `or register with` },
  ];

  // ===============================================================================
  // --------- Formik ------------------------------------------------------------
  // ===============================================================================

  const { handleChange, values, setFieldValue, handleSubmit, errors, handleBlur, touched } =
    useFormik({
      initialValues: { email: "", password: "" },
      validationSchema: loginValidationSchema,
      onSubmit: () => {},
    });
  const formik = { handleChange, values, setFieldValue, handleSubmit, errors, handleBlur, touched };

  // ===============================================================================
  // --------- handlers ------------------------------------------------------------
  // ===============================================================================
  const handleSignIn = async () => {
    try {
      const response = await instance.post(`/auth/login`, formik.values);
      console.log(response);
      if (response.data.user_verified) {
        const { access_token, user, user_verified } = response.data;

        const userVerified = { ...user, user_verified };
        dispatch(userAuthActions.token(access_token));
        dispatch(userAuthActions.setUser(userVerified));
        navigate(`/overview`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ===============================================================================
  // --------- Google oauth --------------------------------------------------------
  // ===============================================================================

  // ===============================================================================
  // --------- useEffects ------------------------------------------------------------
  // ===============================================================================

  useEffect(() => {
    dispatch(appSettingsActions.setPageName(`Login`));
  }, []);

  // ===============================================================================
  // --------- Register ------------------------------------------------------------
  // ===============================================================================
  // ===============================================================================
  // --------- Formik ------------------------------------------------------------
  // ===============================================================================

  const registerFormik = useFormik({
    initialValues: {},
    validationSchema: registerValidationSchema,
    onSubmit: () => {},
  });

  // ===============================================================================
  // --------- States --------------------------------------------------------------
  // ===============================================================================

  // ===============================================================================
  // --------- Utiles --------------------------------------------------------------
  // ===============================================================================
  const fields: InputField[] = [
    {
      key: `registerTitle`,
      title: `Sign Up`,
      group: 1,
      element: "h2",
    },
    {
      key: `firstName`,
      title: `First Name`,
      group: 2,
      element: "input",
      event: (e: React.ChangeEvent<HTMLInputElement>) => {},
    },
    {
      key: `lastName`,
      title: `Last Name`,
      group: 2,
      element: "input",
      event: (e: React.ChangeEvent<HTMLInputElement>) => {},
    },
    {
      key: `email`,
      title: `Email Address`,
      group: 3,
      element: "input",
      event: (e: React.ChangeEvent<HTMLInputElement>) => {},
    },
    {
      key: `password`,
      title: `Password`,
      type: `password`,
      group: 4,
      element: "input",
      event: (e: React.ChangeEvent<HTMLInputElement>) => {},
    },
    {
      key: `confirmPassword`,
      title: `Confirm Password`,
      type: `password`,
      group: 4,
      element: "input",
      event: (e: React.ChangeEvent<HTMLInputElement>) => {},
    },
    {
      key: `dividerEnd`,
      group: 5,
      element: "hr",
      title: `or login with`,
    },
  ];

  // ===============================================================================
  // --------- handlers ------------------------------------------------------------
  // ===============================================================================
  const handleRegisterUser = async () => {
    try {
      const response = await instance.post(`/auth/register`, registerFormik.values);
      console.log(response);

      if (response.data.access_token) {
        const { access_token, user, user_verified } = response.data;
        const userVerified = { ...user, user_verified };
        dispatch(userAuthActions.setUser(userVerified));
        dispatch(userAuthActions.token(access_token));
        navigate(`/overview`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    dispatch(userAuthActions.logOut());
  };

  useEffect(() => {
    console.log(touched);
  }, [touched]);

  return {
    login: {
      formik,
      utiles: {
        fields: loginFields,
      },
      states: { user },
      setters: {},
      handlers: { handleSignIn },
      functions: {},
      googleAuth: {},
    },
    register: {
      formik: registerFormik,
      utiles: { fields },
      states: {},
      setters: {},
      handlers: { handleRegisterUser, handleLogout },
      functions: {},
    },
  };
};
