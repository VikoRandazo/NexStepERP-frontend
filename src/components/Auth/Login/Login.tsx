import React, { FC, useEffect } from "react";
import styles from "./Login.module.scss";
import Form from "../../Form/Form";
import BtnTransparent from "../../Elements/Buttons/Btn-Transparent/Btn-Transparent";
import { HiMiniCheckBadge, HiPaperAirplane } from "react-icons/hi2";
import BtnSecondary from "../../Elements/Buttons/Btn-Secondary/Btn-Secondary";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../useAuth";
import { useDispatchHook } from "../../../hooks/useDispatch";
import { appSettingsActions } from "../../../store/slices/appSettings";
import { GoogleLogin } from "@react-oauth/google";

interface LoginProps {}


const Login: FC<LoginProps> = () => {
  const navigate = useNavigate();
  const { dispatch } = useDispatchHook();
  const navigateRegister = () => {
    navigate(`/register`);
  };

  const { login } = useAuth();

  const { utiles, formik, states, setters, handlers, functions, googleAuth } = login;

  const { user } = states;

  const { fields } = utiles;
  const { handleSignIn } = handlers;

  const googleResponse = (response: any) => {
    console.log(response);
  };
  useEffect(() => {
    dispatch(appSettingsActions.setPageName(`Login`));
  }, []);

  return (
    <div className={styles.Login}>
      <div className={styles.container}>
        <div className={styles.main}>
          <Form fields={fields} formikBag={formik} />
        </div>

        <div className={styles.footer}>
          <div className={styles.actions}>
            <BtnSecondary text={`Lets Go`} icon={<HiPaperAirplane />} action={handleSignIn} />
            <span>
              <hr />
            </span>
            <BtnTransparent
              text={`Sign Up`}
              icon={<HiMiniCheckBadge />}
              action={navigateRegister}
            />
          </div>
          <div className={styles.googleLogin}>
            <GoogleLogin
              onSuccess={googleResponse}
              width={`300`}
              type={`standard`}
              useOneTap={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
