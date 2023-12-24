import React, { FC, useEffect } from "react";
import styles from "./Register.module.scss";
import { InputField } from "../../Elements/Input/InputField";
import Form from "../../Form/Form";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { HiPaperAirplane, HiMiniCheckBadge } from "react-icons/hi2";
import BtnSecondary from "../../Elements/Buttons/Btn-Secondary/Btn-Secondary";
import BtnTransparent from "../../Elements/Buttons/Btn-Transparent/Btn-Transparent";
import { appSettingsActions } from "../../../store/slices/appSettings";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { useDispatchHook } from "../../../hooks/useDispatch";
import { useAuth } from "../useAuth";

interface RegisterProps {}

const Register: FC<RegisterProps> = () => {
  const navigate = useNavigate();
  const { dispatch } = useDispatchHook();

  const { register } = useAuth();
  const { formik, handlers, utiles, states, setters } = register;

  const { fields } = utiles;
  const { handleRegisterUser } = handlers;
  const navigateLogin = () => {
    navigate(`/login`);
  };

  useEffect(() => {
    dispatch(appSettingsActions.setPageName(`Register`));
  }, []);

  return (
    <div className={styles.Register}>
      <div className={styles.container}>
        <div className={styles.main}>
          <Form fields={fields} formikBag={formik} />
        </div>

        <div className={styles.footer}>
          <div className={styles.actions}>
            <span>
              <BtnSecondary
                text={`Sign Up`}
                icon={<HiPaperAirplane />}
                action={handleRegisterUser}
              />
            </span>
            <span>
              <hr />
            </span>
            <BtnTransparent text={`Login`} icon={<HiMiniCheckBadge />} action={navigateLogin} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
