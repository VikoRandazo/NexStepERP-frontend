import React, { FC, useEffect, useState } from "react";
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
import Modal from "../../Modal/Modal";
import ErrorModal from "../../ErrorModal/ErrorModal";

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

  const [isOpenErrorModal, setIsOpenErrorModal] = useState<boolean>(false);

  const handleSetError = (error: string) => {
    const errorMessage = error;
    setIsOpenErrorModal(true);
    dispatch(appSettingsActions.setPageName(`ErrorModal`));
  };

  return (
    <div className={styles.Login}>
      <Modal
        children={
          <ErrorModal
            error={"hello what is youe age?"}
            type={"alert"}
            okBtnAction={(prompt) => {
              console.log(prompt);
              setIsOpenErrorModal(false);
            }}
          />
        }
        isActive={isOpenErrorModal}
        setIsActiveModal={setIsOpenErrorModal}
      />
      <div className={styles.container}>
        <div className={styles.main}>
          <Form fields={fields} formikBag={formik} />
        </div>

        <div className={styles.footer}>
          <div className={styles.actions}>
            <span>
              <BtnSecondary text={`Lets Go`} icon={<HiPaperAirplane />} action={handleSignIn} />
            </span>
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
            <GoogleLogin onSuccess={googleResponse} useOneTap={true} />
          </div>
        </div>
      </div>
      <button onClick={() => handleSetError("Enter Your Name")}>open error</button>
    </div>
  );
};

export default Login;
