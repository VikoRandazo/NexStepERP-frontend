import React, { FC, ReactNode, useCallback, useEffect } from "react";
import styles from "./Modal.module.scss";
import { useDispatchHook } from "../../hooks/useDispatch";
import { UiActions } from "../../store/slices/ui";
import { useSelector } from "react-redux";
import { StoreRootTypes } from "../../store/store";

interface ModalProps {
  children:JSX.Element | null;
}

const Modal: FC<ModalProps> = ({ children }) => {
  const { dispatch } = useDispatchHook();

  const isOpenModal = useSelector((state: StoreRootTypes) => state.ui.modal.isOpen);

  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      dispatch(UiActions.setIsOpen(false));
    }
  };
  
  useEffect(() => {
    console.log(isOpenModal);
  }, []);

  return (
    <div className={isOpenModal ? `${styles.Modal} ${styles.active}` : styles.Modal}>
      <div onClick={closeModal} className={styles.layout}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
