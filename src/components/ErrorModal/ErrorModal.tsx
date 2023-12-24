import React, { FC, ReactElement, useEffect, useState } from "react";
import styles from "./ErrorModal.module.scss";
import BtnSecondary from "../Elements/Buttons/Btn-Secondary/Btn-Secondary";
import BtnTransparent from "../Elements/Buttons/Btn-Transparent/Btn-Transparent";
import { useFormik } from "formik";
import {
  HiArrowDown,
  HiChatBubbleBottomCenter,
  HiExclamationTriangle,
  HiMiniCheckBadge,
  HiQuestionMarkCircle,
} from "react-icons/hi2";
import Form from "../Form/Form";
import { InputField } from "../Elements/Input/InputField";
import { appSettingsActions } from "../../store/slices/appSettings";
import { useDispatchHook } from "../../hooks/useDispatch";

type ErrorModalProps =
  | { error: string; type: "alert"; okBtnAction: (confirmed: boolean) => void }
  | {
      error: string;
      type: "prompt";
      okBtnAction: (prompt: string) => void;
      cancelBtnAction: () => void;
    }
  | {
      error: string;
      type: "confirm";
      okBtnAction: (confirmed: boolean) => void;
      cancelBtnAction: () => void;
    };

// Type guard for "alert" type
function isAlert(
  props: ErrorModalProps
): props is { error: string; type: "alert"; okBtnAction: (confirmed: boolean) => void } {
  return props.type === "alert";
}

// Type guard for "prompt" type
function isPrompt(props: ErrorModalProps): props is {
  error: string;
  type: "prompt";
  okBtnAction: (prompt: string) => void;
  cancelBtnAction: () => void;
} {
  return props.type === "prompt";
}

// Type guard for "confirm" type
function isConfirm(props: ErrorModalProps): props is {
  error: string;
  type: "confirm";
  okBtnAction: (confirmed: boolean) => void;
  cancelBtnAction: () => void;
} {
  return props.type === "confirm";
}

const ErrorModal: FC<ErrorModalProps> = (props) => {
  const [confirmed, setConfirmed] = useState<boolean>();
  const [icon, setIcon] = useState<ReactElement>(<></>);
  const { type, error } = props;

  const { dispatch } = useDispatchHook();
  const { values, handleChange, setFieldValue, handleSubmit } = useFormik({
    initialValues: { prompt: "" },
    onSubmit: () => {},
  });
  const formik = { values, handleChange, setFieldValue, handleSubmit };


  const fields: InputField[] = [
    {
      key: `prompt`,
      type: `text`,
      title: `Your prompt here`,
      group: 1,
      element: "input",
      event: () => {},
    },
  ];

  const handleSetIcon = () => {
    switch (type) {
      case "alert":
        setIcon(<HiExclamationTriangle />);
        break;
      case "confirm":
        setIcon(<HiQuestionMarkCircle />);
        break;
      case "prompt":
        setIcon(<HiChatBubbleBottomCenter />);
        break;

      default:
        break;
    }
  };


  const handleRenderActions = () => {
    if (isAlert(props)) {
      return (
        <BtnSecondary
          text={"ok"}
          icon={<HiMiniCheckBadge />}
          action={() => {
            props.okBtnAction(true);
          }}
      />
      );
    }
    if (isConfirm(props)) {
      return (
        <>
          <BtnSecondary
            text={"ok"}
            icon={<HiMiniCheckBadge />}
            action={() => {
              props.okBtnAction(true);
              props.cancelBtnAction()
            }}
          />
          <BtnTransparent
            text={"cancel"}
            icon={<></>}
            action={() => props.cancelBtnAction()}
          />
        </>
      );
    }
    if (isPrompt(props)) {
      return (
        <>
          <BtnSecondary
            text={"ok"}
            icon={<HiMiniCheckBadge />}
            action={() => {
              props.okBtnAction(values.prompt);
              props.cancelBtnAction()
            }}
          />
          <BtnTransparent
            text={"cancel"}
            icon={<></>}
            action={() => props.cancelBtnAction()}
          />
        </>
      );
    }
  };

  useEffect(() => {
    dispatch(appSettingsActions.setPageName(`ErrorModal`));
    handleSetIcon();
  }, []);
  return (
    <div className={styles.ErrorModal}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.content}>
        <div className={styles.text}>
          <span className={styles.errorMessage}>{error}</span>
        </div>
        {type === "prompt" ? (
          <div className={styles.prompt}>
            <Form fields={fields} formikBag={formik} />
          </div>
        ) : null}
      </div>
      <div className={styles.actions}>{handleRenderActions()}</div>
    </div>
  );
};

export default ErrorModal;
