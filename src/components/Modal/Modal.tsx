import React, { FC, ReactNode, useCallback, useEffect, useState } from "react";
import styles from "./Modal.module.scss";
import { useDispatchHook } from "../../hooks/useDispatch";
import { UiActions } from "../../store/slices/ui";
import { useSelector } from "react-redux";
import { StoreRootTypes } from "../../store/store";

interface ModalProps {
  title?: string;
  description?: string;
  children: JSX.Element | null;
  isActive: boolean;
  setIsActiveModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: FC<ModalProps> = ({ children, isActive, setIsActiveModal, title, description }) => {
  const { dispatch } = useDispatchHook();

  const isOpen = useSelector((state: StoreRootTypes) => state.ui.modal.isOpen);
  const closeModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget || isOpen === true) {
      setIsActiveModal(false);
      dispatch(UiActions.setIsOpen(false));
    }
  };

  return (
    <div className={isActive ? `${styles.Modal} ${styles.active}` : styles.Modal}>
      <div onClick={closeModal} className={styles.layout}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h4>{title}</h4>
            <p>{description}</p>
          </div>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
